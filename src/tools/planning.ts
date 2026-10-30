import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DendreoError, type DendreoClient, type Row } from "../dendreo/client.js";
import { findEntreprise, findFormateur, findSession, single } from "./resolve.js";
import { addDays, json, splitDateTime } from "./util.js";

const DATE = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const HEURE = z.string().regex(/^\d{2}:\d{2}$/);

const slotLabel = (c: Row) => {
  const d = splitDateTime(c.date_debut);
  return `${d.date} ${d.heure}-${splitDateTime(c.date_fin).heure}`;
};

/** Message lisible pour les refus Dendreo sur un créneau. */
function explain(e: unknown): string {
  const msg = (e as Error).message;
  return e instanceof DendreoError && e.status === 422
    ? `refusé par Dendreo (créneau probablement émargé ou facturé) : ${msg}`
    : `erreur : ${msg}`;
}

export function registerPlanningTools(server: McpServer, client: DendreoClient) {
  server.registerTool(
    "staffer_formateur",
    {
      title: "Staffer un formateur sur une session",
      description:
        "Ajoute un formateur à une action de formation et l'affecte à tous ses créneaux ou à certains jours. " +
        "Peut remplacer un autre formateur sur ces créneaux (il en est déstaffé). " +
        "Par défaut dry_run=true : rien n'est écrit. Ne relancer avec dry_run=false qu'après confirmation explicite.",
      inputSchema: {
        session: z.string().describe("Id de l'action de formation ou numéro complet (ADF_…)"),
        formateur: z.string().optional().describe("Formateur à staffer : prénom et nom, ou id (ou utiliser entreprise_sous_traitante)"),
        entreprise_sous_traitante: z.string().optional().describe("Entreprise sous-traitante à staffer à la place d'un formateur (raison sociale, ENT_… ou id) : ajoutée à la session, sans créneaux"),
        jours: z.array(DATE).optional().describe("Limiter à ces jours (AAAA-MM-JJ). Par défaut tous les créneaux"),
        remplace: z.string().optional().describe("Formateur à retirer de ces créneaux : prénom et nom, ou id"),
        dry_run: z.boolean().default(true),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async (args) => {
      const s = single(await findSession(client, args.session, "id_action_de_formation,numero_complet,intitule"), "Session");
      if (!("row" in s)) return json(s);
      if (args.entreprise_sous_traitante) {
        const e = single(await findEntreprise(client, args.entreprise_sous_traitante), "Entreprise sous-traitante");
        if (!("row" in e)) return json(e);
        const idE = String(e.row.id_entreprise);
        const existants = await client.list("lafs.php", { id_action_de_formation: String(s.row.id_action_de_formation) });
        const dejaLa = existants.some((l) => String(l.id_entreprise_formateur) === idE);
        const recap = { session: `${s.row.numero_complet} — ${s.row.intitule}`, entreprise_sous_traitante: e.row.raison_sociale, deja_staffee: dejaLa };
        if (args.dry_run || dejaLa) return json({ dry_run: args.dry_run, ...recap });
        await client.post("lafs.php", { id_action_de_formation: s.row.id_action_de_formation, id_entreprise_formateur: idE });
        return json({ ok: true, ...recap });
      }
      if (!args.formateur) return json({ erreur: "Préciser formateur ou entreprise_sous_traitante." });
      const f = single(await findFormateur(client, args.formateur), "Formateur");
      if (!("row" in f)) return json(f);
      let ancien: Row | undefined;
      if (args.remplace) {
        const a = single(await findFormateur(client, args.remplace), "Formateur à remplacer");
        if (!("row" in a)) return json(a);
        ancien = a.row;
      }
      const idAdf = String(s.row.id_action_de_formation);
      const idF = String(f.row.id_formateur);

      const [lafs, creneaux, lcfs] = await Promise.all([
        client.list("lafs.php", { id_action_de_formation: idAdf }),
        client.list("creneaux.php", { id_action_de_formation: idAdf }),
        client.list("lcfs.php", { id_action_de_formation: idAdf }),
      ]);
      const cibles = args.jours ? creneaux.filter((c) => args.jours!.includes(splitDateTime(c.date_debut).date)) : creneaux;
      const staffe = (idCreneau: unknown, idFormateur: string) =>
        lcfs.some(
          (l) => String(l.id_creneau) === String(idCreneau) && String(l.status) === "1" &&
            (String(l.id_formateur ?? "") === idFormateur ||
              lafs.some((laf) => String(laf.id_laf) === String(l.id_laf) && String(laf.id_formateur) === idFormateur)),
        );
      const aAjouterSurAdf = !lafs.some((l) => String(l.id_formateur) === idF);
      const aStaffer = cibles.filter((c) => !staffe(c.id_creneau, idF));
      const aRetirer = ancien ? cibles.filter((c) => staffe(c.id_creneau, String(ancien!.id_formateur))) : [];

      const recap = {
        session: `${s.row.numero_complet} — ${s.row.intitule}`,
        formateur: `${f.row.prenom} ${f.row.nom}`,
        ajout_sur_la_session: aAjouterSurAdf,
        creneaux_a_staffer: aStaffer.map(slotLabel),
        ...(ancien ? { retire: `${ancien.prenom} ${ancien.nom}`, creneaux_a_destaffer: aRetirer.map(slotLabel) } : {}),
        ...(cibles.length === 0 ? { avertissement: "Aucun créneau ne correspond aux jours demandés." } : {}),
      };
      if (args.dry_run) return json({ dry_run: true, ...recap });

      const journal: string[] = [];
      if (aAjouterSurAdf) {
        await client.post("lafs.php", { id_action_de_formation: idAdf, id_formateur: idF });
        journal.push("Formateur ajouté à la session");
      }
      for (const c of aStaffer) {
        try {
          await client.post("lcfs.php", { id_creneau: c.id_creneau, id_formateur: idF, status: 1 });
          journal.push(`${slotLabel(c)} : staffé`);
        } catch (e) {
          journal.push(`${slotLabel(c)} : ${explain(e)}`);
        }
      }
      for (const c of aRetirer) {
        try {
          await client.post("lcfs.php", { id_creneau: c.id_creneau, id_formateur: ancien!.id_formateur, status: 0 });
          journal.push(`${slotLabel(c)} : ${ancien!.prenom} ${ancien!.nom} déstaffé`);
        } catch (e) {
          journal.push(`${slotLabel(c)} : ${explain(e)}`);
        }
      }
      return json({ ...recap, journal });
    },
  );

  server.registerTool(
    "gerer_creneaux",
    {
      title: "Ajouter, modifier ou décaler des créneaux",
      description:
        "Modifie le planning d'une action de formation : ajouter des créneaux, modifier la date, les heures ou l'intitulé " +
        "de créneaux existants, ou décaler des créneaux d'un nombre de jours. Un créneau émargé ne peut pas être modifié. " +
        "Par défaut dry_run=true : rien n'est écrit. Ne relancer avec dry_run=false qu'après confirmation explicite.",
      inputSchema: {
        session: z.string().describe("Id de l'action de formation ou numéro complet (ADF_…)"),
        ajouter: z
          .array(z.object({ date: DATE, heure_debut: HEURE, heure_fin: HEURE, intitule: z.string().optional() }))
          .optional(),
        modifier: z
          .array(
            z.object({
              id_creneau: z.string(),
              date: DATE.optional(),
              heure_debut: HEURE.optional(),
              heure_fin: HEURE.optional(),
              intitule: z.string().optional(),
            }),
          )
          .optional()
          .describe("Créneaux à modifier (id visible avec detail_session)"),
        decaler_jours: z.number().int().optional().describe("Décale de N jours (négatif = avancer)"),
        decaler_ids: z.array(z.string()).optional().describe("Créneaux à décaler. Par défaut tous ceux de la session"),
        id_lam: z.string().optional().describe("Module (programmation) des nouveaux créneaux si la session en a plusieurs"),
        dry_run: z.boolean().default(true),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async (args) => {
      const s = single(await findSession(client, args.session, "id_action_de_formation,numero_complet,intitule"), "Session");
      if (!("row" in s)) return json(s);
      const idAdf = String(s.row.id_action_de_formation);
      const creneaux = await client.list("creneaux.php", { id_action_de_formation: idAdf });
      const byId = new Map(creneaux.map((c) => [String(c.id_creneau), c]));

      let idLam = args.id_lam;
      if (args.ajouter?.length && !idLam) {
        const lams = await client.list("lams.php", { id_action_de_formation: idAdf });
        if (lams.length !== 1) {
          return json({
            erreur: "La session contient plusieurs modules : préciser id_lam.",
            modules: lams.map((l) => ({ id_lam: l.id_lam, intitule: l.intitule ?? l.intitule_module })),
          });
        }
        idLam = String(lams[0].id_lam);
      }

      type Op = { quoi: string; body: Row };
      const ops: Op[] = [];
      for (const a of args.ajouter ?? []) {
        ops.push({
          quoi: `ajout ${a.date} ${a.heure_debut}-${a.heure_fin}`,
          body: { id_lam: idLam, date: a.date, heure_debut: a.heure_debut, heure_fin: a.heure_fin, ...(a.intitule ? { name: a.intitule } : {}) },
        });
      }
      const inconnus: string[] = [];
      // Dendreo exige date + heures à chaque édition : on complète avec les valeurs actuelles.
      const edit = (c: Row, patch: { date?: string; heure_debut?: string; heure_fin?: string; intitule?: string }) => {
        const d = splitDateTime(c.date_debut);
        const body: Row = {
          id: c.id_creneau,
          date: patch.date ?? d.date,
          heure_debut: patch.heure_debut ?? d.heure,
          heure_fin: patch.heure_fin ?? splitDateTime(c.date_fin).heure,
          ...(patch.intitule !== undefined ? { name: patch.intitule } : {}),
        };
        return { quoi: `${slotLabel(c)} → ${body.date} ${body.heure_debut}-${body.heure_fin}`, body };
      };
      for (const m of args.modifier ?? []) {
        const c = byId.get(m.id_creneau);
        if (c) ops.push(edit(c, m));
        else inconnus.push(m.id_creneau);
      }
      if (args.decaler_jours) {
        const ids = args.decaler_ids ?? creneaux.map((c) => String(c.id_creneau));
        for (const id of ids) {
          const c = byId.get(id);
          if (c) ops.push(edit(c, { date: addDays(splitDateTime(c.date_debut).date, args.decaler_jours) }));
          else inconnus.push(id);
        }
      }

      const recap = {
        session: `${s.row.numero_complet} — ${s.row.intitule}`,
        operations: ops.map((o) => o.quoi),
        ...(inconnus.length ? { creneaux_introuvables: inconnus } : {}),
      };
      if (args.dry_run || ops.length === 0) return json({ dry_run: args.dry_run, ...recap });

      const journal: string[] = [];
      for (const o of ops) {
        try {
          await client.post("creneaux.php", o.body);
          journal.push(`${o.quoi} : ok`);
        } catch (e) {
          journal.push(`${o.quoi} : ${explain(e)}`);
        }
      }
      return json({ ...recap, journal, rappel: "Vérifier le staffing des formateurs sur les créneaux ajoutés (staffer_formateur)." });
    },
  );
}
