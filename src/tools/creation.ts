import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DendreoClient, Row } from "../dendreo/client.js";
import { json, normalize } from "./util.js";

type Slot = { date: string; heure_debut: string; heure_fin: string };

const DATE = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const HORAIRES = /^\d{2}:\d{2}-\d{2}:\d{2}(;\d{2}:\d{2}-\d{2}:\d{2})*$/;

async function findModule(client: DendreoClient, formation: string): Promise<Row[]> {
  const fields = "id_module,intitule,numero_complet";
  let rows = await client.list("modules.php", { intitule: formation, fields });
  if (rows.length === 0) rows = await client.list("modules.php", { keywords: formation, fields });
  const exact = rows.filter((r) => normalize(r.intitule) === normalize(formation));
  return exact.length > 0 ? exact : rows;
}

async function findFormateur(client: DendreoClient, nomComplet: string): Promise<Row[]> {
  const fields = "id_formateur,nom,prenom,email_pro";
  const target = normalize(nomComplet);
  const seen = new Map<string, Row>();
  for (const token of nomComplet.split(/\s+/).filter((t) => t.length > 1)) {
    for (const r of await client.list("formateurs.php", { nom: token, fields })) {
      seen.set(String(r.id_formateur), r);
    }
  }
  const all = [...seen.values()];
  const exact = all.filter(
    (r) => normalize(`${r.prenom} ${r.nom}`) === target || normalize(`${r.nom} ${r.prenom}`) === target,
  );
  return exact.length > 0 ? exact : all;
}

function slotsFor(dates: string[], horaires: string): Slot[] {
  return [...dates].sort().flatMap((date) =>
    horaires.split(";").map((plage) => {
      const [heure_debut, heure_fin] = plage.split("-");
      return { date, heure_debut, heure_fin };
    }),
  );
}

const slotKey = (s: Slot) => `${s.date} ${s.heure_debut}-${s.heure_fin}`;

function slotOf(c: Row): Slot {
  const debut = String(c.date_debut);
  return { date: debut.slice(0, 10), heure_debut: debut.slice(11, 16), heure_fin: String(c.date_fin).slice(11, 16) };
}

export function registerCreationTools(server: McpServer, client: DendreoClient) {
  server.registerTool(
    "creer_session",
    {
      title: "Créer une session de formation",
      description:
        "Crée une action de formation (session) pour un module du catalogue, sur des jours précis, avec un formateur staffé " +
        "sur tous les créneaux. Par défaut dry_run=true : rien n'est écrit, l'outil renvoie ce qui serait créé. " +
        "Montrer ce récapitulatif à l'utilisateur et ne relancer avec dry_run=false qu'après sa confirmation explicite.",
      inputSchema: {
        formation: z.string().describe("Intitulé du module de formation, ex. « Product Builder »"),
        formateur: z.string().describe("Prénom et nom du formateur, ex. « Clément Brottier »"),
        dates: z.array(DATE).min(1).describe("Jours de formation (AAAA-MM-JJ), pas forcément consécutifs"),
        horaires: z
          .string()
          .regex(HORAIRES)
          .default("09:00-12:30;13:30-17:00")
          .describe("Plages horaires de chaque jour, ex. 09:00-12:30;13:30-17:00"),
        type: z.enum(["inter", "intra"]).default("inter").describe("inter (multi-entreprises) ou intra (une entreprise)"),
        id_entreprise: z.number().int().optional().describe("Obligatoire si type=intra"),
        intitule: z.string().optional().describe("Intitulé de la session, par défaut celui du module"),
        id_module: z.number().int().optional().describe("À fournir si plusieurs modules correspondent"),
        id_formateur: z.number().int().optional().describe("À fournir si plusieurs formateurs correspondent"),
        dry_run: z.boolean().default(true).describe("true = simulation sans écriture"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async (args) => {
      if (args.type === "intra" && !args.id_entreprise) {
        return json({ erreur: "id_entreprise est obligatoire pour une session intra" });
      }

      const modules = args.id_module
        ? await client.list("modules.php", { id: args.id_module, fields: "id_module,intitule,numero_complet" })
        : await findModule(client, args.formation);
      const formateurs = args.id_formateur
        ? await client.list("formateurs.php", { id: args.id_formateur, fields: "id_formateur,nom,prenom,email_pro" })
        : await findFormateur(client, args.formateur);

      if (modules.length !== 1 || formateurs.length !== 1) {
        return json({
          erreur: "Formation ou formateur introuvable ou ambigu : préciser id_module / id_formateur.",
          modules_trouves: modules,
          formateurs_trouves: formateurs,
        });
      }
      const [module] = modules;
      const [formateur] = formateurs;
      const slots = slotsFor(args.dates, args.horaires);
      const dates = slots.map((s) => s.date);
      const adf: Row = {
        type: args.type,
        intitule: args.intitule ?? module.intitule,
        include_in_bpf: 1,
        date_debut: dates[0],
        date_fin: dates[dates.length - 1],
        id_module: module.id_module,
        id_formateur: formateur.id_formateur,
        ...(args.id_entreprise ? { id_entreprise: args.id_entreprise } : {}),
      };

      const plan = {
        module,
        formateur,
        action_de_formation: adf,
        creneaux: slots.map(slotKey),
      };
      if (args.dry_run) {
        return json({ dry_run: true, message: "Rien n'a été créé. Relancer avec dry_run=false après confirmation.", ...plan });
      }

      // À partir d'ici l'ADF existe : on renvoie l'état partiel plutôt que de lever une erreur.
      const journal: string[] = [];
      const created = (await client.post("actions_de_formation.php", adf)) as Row;
      const idAdf = created.id_action_de_formation;
      journal.push(`ADF créée : id ${idAdf} (${created.numero_complet ?? ""})`);
      try {
        const lams = await client.list("lams.php", { id_action_de_formation: String(idAdf) });
        const lam = lams.find((l) => String(l.id_module) === String(module.id_module)) ?? lams[0];
        if (!lam) throw new Error("aucune programmation (lam) trouvée pour le module");

        // Dendreo peut générer un planning par défaut : on l'aligne exactement sur les jours demandés.
        const wanted = new Set(slots.map(slotKey));
        const existing = await client.list("creneaux.php", { id_action_de_formation: String(idAdf) });
        const kept = new Set<string>();
        const extra: Row[] = [];
        for (const c of existing) {
          const key = slotKey(slotOf(c));
          if (wanted.has(key) && !kept.has(key)) kept.add(key);
          else extra.push(c);
        }
        if (extra.length > 0) {
          await client.delete("creneaux.php", { id: extra.map((c) => c.id_creneau).join(",") });
          journal.push(`Créneaux par défaut retirés : ${extra.map((c) => slotKey(slotOf(c))).join(", ")}`);
        }
        for (const s of slots.filter((s) => !kept.has(slotKey(s)))) {
          await client.post("creneaux.php", { id_lam: lam.id_lam, ...s });
          journal.push(`Créneau ajouté : ${slotKey(s)}`);
        }

        const creneaux = await client.list("creneaux.php", { id_action_de_formation: String(idAdf) });
        const staffed = new Set(
          (await client.list("lcfs.php", { id_action_de_formation: String(idAdf), id_formateur: String(formateur.id_formateur) }))
            .filter((l) => String(l.status) === "1")
            .map((l) => String(l.id_creneau)),
        );
        for (const c of creneaux.filter((c) => !staffed.has(String(c.id_creneau)))) {
          await client.post("lcfs.php", { id_creneau: c.id_creneau, id_formateur: formateur.id_formateur, status: 1 });
        }
        journal.push(`Formateur ${formateur.prenom} ${formateur.nom} staffé sur ${creneaux.length} créneau(x)`);
        return json({ ok: true, id_action_de_formation: idAdf, journal, creneaux: creneaux.map((c) => slotKey(slotOf(c))) });
      } catch (e) {
        journal.push(`Erreur : ${(e as Error).message}`);
        return json({ ok: false, id_action_de_formation: idAdf, journal, message: "Session créée mais incomplète : vérifier dans Dendreo." });
      }
    },
  );
}
