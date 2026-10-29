import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DendreoClient, Row } from "../dendreo/client.js";
import { findEntreprise, single } from "./resolve.js";
import { CHAMPS_PERSONNALISES, json, nomDe, normalize, today } from "./util.js";

const DATE = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const ENTREPRISE = z.string().describe("Raison sociale, numéro ENT_… ou id");

/** Garde les champs renseignés, sous leur nom Dendreo. */
function champs(map: Record<string, unknown>): Row {
  return Object.fromEntries(Object.entries(map).filter(([, v]) => v !== undefined));
}

/** Résultat commun des outils de création / mise à jour de fiche CRM. */
async function enregistrer(
  client: DendreoClient,
  endpoint: string,
  cleId: string,
  existant: Row | undefined,
  body: Row,
  dryRun: boolean,
  libelle: string,
) {
  const action = existant ? "mise_a_jour" : "creation";
  const recap = {
    action,
    fiche: libelle,
    ...(existant ? { [cleId]: existant[cleId], avant: Object.fromEntries(Object.keys(body).map((k) => [k, existant[k]])) } : {}),
    valeurs: body,
  };
  if (dryRun) return json({ dry_run: true, ...recap });
  const resultat = (await client.post(endpoint, existant ? { [cleId]: existant[cleId], ...body } : body)) as Row;
  return json({ ok: true, ...recap, [cleId]: resultat?.[cleId] ?? existant?.[cleId] });
}

export function registerCrmTools(server: McpServer, client: DendreoClient) {
  server.registerTool(
    "fiche_entreprise",
    {
      title: "Fiche complète d'une entreprise",
      description:
        "Vue d'ensemble d'une entreprise cliente : coordonnées, chiffre d'affaires, contacts, salariés participants, " +
        "formations passées et à venir, dernières actions commerciales et opportunités en cours.",
      inputSchema: { entreprise: ENTREPRISE },
      annotations: { readOnlyHint: true },
    },
    async (args) => {
      const r = single(await findEntreprise(client, args.entreprise), "Entreprise");
      if (!("row" in r)) return json(r);
      const id = String(r.row.id_entreprise);
      const [[ent], contacts, participants, laps, actions, opportunites] = await Promise.all([
        client.list("entreprises.php", { id, include: "stats" }),
        client.list("contacts.php", { id_entreprise: id }),
        client.list("participants.php", { id_entreprise: id, fields: "id_participant,prenom,nom,email,fonction" }),
        client.list("laps.php", { id_entreprise: id }),
        client.list("actions_commerciales.php", { id_entreprise: id }),
        client.list("opportunites.php", { id_entreprise: id }),
      ]);
      const adfIds = [...new Set(laps.map((l) => String(l.id_action_de_formation ?? "")))].filter((id) => /^\d+$/.test(id));
      const adfs = adfIds.length
        ? await client.list("actions_de_formation.php", {
            id: adfIds.join(","),
            fields: "id_action_de_formation,numero_complet,intitule,date_debut,date_fin",
          })
        : [];
      const inscritsParAdf = new Map<string, number>();
      for (const l of laps) inscritsParAdf.set(String(l.id_action_de_formation), (inscritsParAdf.get(String(l.id_action_de_formation)) ?? 0) + 1);
      const formation = (a: Row) => ({
        session: `${a.numero_complet} — ${a.intitule}`,
        du: String(a.date_debut).slice(0, 10),
        au: String(a.date_fin).slice(0, 10),
        participants: inscritsParAdf.get(String(a.id_action_de_formation)),
      });
      const tri = [...adfs].sort((a, b) => String(b.date_debut).localeCompare(String(a.date_debut)));
      const e = ent ?? r.row;
      return json({
        entreprise: {
          id,
          raison_sociale: e.raison_sociale,
          numero: e.numero_complet,
          siret: e.siret || undefined,
          adresse: [e.adresse, e.code_postal, e.ville].filter(Boolean).join(" ") || undefined,
          telephone: e.telephone || undefined,
          email: e.email_standard || undefined,
          client: e.client,
          fournisseur: e.fournisseur,
          ca_facture: e.ca_facture,
          commentaires: e.commentaires || undefined,
        },
        contacts: contacts.map((c) => ({
          id_contact: c.id_contact,
          nom: nomDe(c),
          fonction: c.fonction || undefined,
          email: c.email || undefined,
          telephone: c.telephone_direct || c.portable || undefined,
          principal: String(c.contact_principal) === "1" || undefined,
        })),
        participants: participants.map((p) => ({ id_participant: p.id_participant, nom: nomDe(p), email: p.email || undefined })),
        formations_a_venir: tri.filter((a) => String(a.date_fin).slice(0, 10) >= today()).reverse().map(formation),
        formations_passees: tri.filter((a) => String(a.date_fin).slice(0, 10) < today()).slice(0, 20).map(formation),
        actions_commerciales: actions
          .filter((a) => String(a.id_entreprise ?? id) === id)
          .slice(0, 10)
          .map((a) => ({
            date: String(a.date_action).slice(0, 10),
            compte_rendu: a.compte_rendu,
            relance: a.date_relance ? String(a.date_relance).slice(0, 10) : undefined,
            commerciaux: ((a.commerciaux ?? []) as Row[]).map((c) => c.nom_complet),
          })),
        opportunites: opportunites
          .filter((o) => String(o.entreprise_id) === id && !o.closed_at && !o.lost_at)
          .map((o) => ({ numero: o.numero_complet, description: o.description || undefined, etape: o.opportunite_etape_id })),
      });
    },
  );

  server.registerTool(
    "enregistrer_entreprise",
    {
      title: "Créer ou mettre à jour une entreprise",
      description:
        "Crée une entreprise dans le CRM, ou met à jour la fiche existante. La fiche existante est retrouvée par " +
        "`entreprise` (raison sociale, ENT_… ou id) ou par SIRET, pour éviter les doublons. " +
        "Par défaut dry_run=true : rien n'est écrit. Ne relancer avec dry_run=false qu'après confirmation explicite.",
      inputSchema: {
        entreprise: z.string().optional().describe("Fiche à mettre à jour (sinon création)"),
        raison_sociale: z.string().optional().describe("Obligatoire en création"),
        siret: z.string().optional(),
        adresse: z.string().optional(),
        code_postal: z.string().optional(),
        ville: z.string().optional(),
        pays: z.string().optional(),
        telephone: z.string().optional(),
        email_standard: z.string().optional(),
        site_internet: z.string().optional(),
        code_naf: z.string().optional(),
        nb_employes: z.number().int().optional(),
        client: z.boolean().optional(),
        fournisseur: z.boolean().optional().describe("Fournisseur / sous-traitant"),
        id_administrateur: z.number().int().optional().describe("Commercial associé"),
        entreprise_parente: z.string().optional().describe("Raison sociale de l'entreprise mère (groupe)"),
        commentaires: z.string().optional(),
        champs_personnalises: CHAMPS_PERSONNALISES,
        dry_run: z.boolean().default(true),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async (args) => {
      let existant: Row | undefined;
      if (args.entreprise) {
        const r = single(await findEntreprise(client, args.entreprise), "Entreprise");
        if (!("row" in r)) return json(r);
        [existant] = await client.list("entreprises.php", { id: String(r.row.id_entreprise) });
      } else {
        const doublons = [
          ...(args.siret ? await client.list("entreprises.php", { siret: args.siret.replace(/\s/g, "") }) : []),
          ...(args.raison_sociale
            ? (await client.list("entreprises.php", { search: args.raison_sociale, fields: "id_entreprise,raison_sociale,numero_complet,siret,ville" }))
                .filter((e) => normalize(e.raison_sociale) === normalize(args.raison_sociale))
            : []),
        ];
        if (doublons.length) {
          return json({
            erreur: "Une entreprise semblable existe déjà : passer `entreprise` pour la mettre à jour.",
            existantes: doublons.map((e) => ({ id_entreprise: e.id_entreprise, raison_sociale: e.raison_sociale, siret: e.siret, ville: e.ville })),
          });
        }
        if (!args.raison_sociale) return json({ erreur: "La raison sociale est obligatoire en création." });
      }
      const body = champs({
        raison_sociale: args.raison_sociale ?? existant?.raison_sociale,
        siret: args.siret?.replace(/\s/g, ""),
        adresse: args.adresse,
        code_postal: args.code_postal,
        ville: args.ville,
        pays: args.pays,
        telephone: args.telephone,
        email_standard: args.email_standard,
        site_internet: args.site_internet,
        code_naf: args.code_naf,
        nb_employes: args.nb_employes,
        client: args.client === undefined ? undefined : args.client ? 1 : 0,
        fournisseur: args.fournisseur === undefined ? undefined : args.fournisseur ? 1 : 0,
        id_administrateur: args.id_administrateur,
        entreprise_parente: args.entreprise_parente,
        commentaires: args.commentaires,
        ...args.champs_personnalises,
      });
      return enregistrer(client, "entreprises.php", "id_entreprise", existant, body, args.dry_run, String(body.raison_sociale));
    },
  );

  server.registerTool(
    "enregistrer_contact",
    {
      title: "Créer ou mettre à jour un contact d'entreprise",
      description:
        "Crée un contact (interlocuteur RH, formation, achats…) dans une entreprise, ou met à jour un contact existant " +
        "retrouvé par son id ou son email. Peut le définir comme contact principal, secondaire ou de facturation. " +
        "Par défaut dry_run=true : rien n'est écrit.",
      inputSchema: {
        entreprise: ENTREPRISE.optional().describe("Entreprise du contact (obligatoire en création)"),
        id_contact: z.string().optional().describe("Contact à mettre à jour"),
        nom: z.string().optional(),
        prenom: z.string().optional(),
        civilite: z.string().optional().describe("M. ou Mme."),
        fonction: z.string().optional(),
        email: z.string().email().optional(),
        telephone_direct: z.string().optional(),
        portable: z.string().optional(),
        role: z.enum(["principal", "secondaire", "facturation"]).optional(),
        champs_personnalises: CHAMPS_PERSONNALISES,
        dry_run: z.boolean().default(true),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async (args) => {
      let idEntreprise: unknown;
      if (args.entreprise) {
        const r = single(await findEntreprise(client, args.entreprise), "Entreprise");
        if (!("row" in r)) return json(r);
        idEntreprise = r.row.id_entreprise;
      }
      let existant: Row | undefined;
      if (args.id_contact) {
        [existant] = await client.list("contacts.php", { id: args.id_contact });
        if (!existant) return json({ erreur: "Contact introuvable." });
      } else if (args.email) {
        const found = await client.list("contacts.php", { email: args.email });
        existant = found.find((c) => !idEntreprise || String(c.id_entreprise) === String(idEntreprise));
      }
      if (!existant && (!idEntreprise || !args.nom)) return json({ erreur: "En création, l'entreprise et le nom sont obligatoires." });
      const body = champs({
        ...(existant ? {} : { id_entreprise: idEntreprise }),
        nom: args.nom ?? existant?.nom,
        prenom: args.prenom,
        civilite: args.civilite,
        fonction: args.fonction,
        email: args.email,
        telephone_direct: args.telephone_direct,
        portable: args.portable,
        ...(args.role ? { [`contact_${args.role}`]: 1 } : {}),
        ...args.champs_personnalises,
      });
      return enregistrer(client, "contacts.php", "id_contact", existant, body, args.dry_run, `${args.prenom ?? existant?.prenom ?? ""} ${body.nom}`.trim());
    },
  );

  server.registerTool(
    "enregistrer_participant",
    {
      title: "Créer ou mettre à jour un participant",
      description:
        "Crée un participant (stagiaire) dans le CRM ou met à jour sa fiche, retrouvée par id ou email (un seul " +
        "email par participant dans Dendreo). Par défaut dry_run=true : rien n'est écrit.",
      inputSchema: {
        id_participant: z.string().optional().describe("Participant à mettre à jour"),
        email: z.string().email().optional(),
        nom: z.string().optional(),
        prenom: z.string().optional(),
        civilite: z.string().optional(),
        entreprise: ENTREPRISE.optional(),
        fonction: z.string().optional(),
        portable: z.string().optional(),
        date_de_naissance: DATE.optional(),
        statut_bpf: z.enum(["salarie", "agent_public", "non_salarie", "benevole", "autre"]).optional(),
        niveau_diplome: z.enum(["sans", "cqp", "cap-bep", "bac", "bac+2", "bac+3", "bac+5", "bac+8"]).optional(),
        commentaires: z.string().optional(),
        champs_personnalises: CHAMPS_PERSONNALISES,
        dry_run: z.boolean().default(true),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async (args) => {
      let idEntreprise: unknown;
      if (args.entreprise) {
        const r = single(await findEntreprise(client, args.entreprise), "Entreprise");
        if (!("row" in r)) return json(r);
        idEntreprise = r.row.id_entreprise;
      }
      let existant: Row | undefined;
      if (args.id_participant) {
        [existant] = await client.list("participants.php", { id: args.id_participant });
        if (!existant) return json({ erreur: "Participant introuvable." });
      } else if (args.email) {
        const found = await client.list("participants.php", { email: args.email });
        if (found.length > 1) return json({ erreur: "Plusieurs fiches avec cet email : préciser id_participant.", fiches: found.map((p) => ({ id: p.id_participant, nom: nomDe(p) })) });
        existant = found[0];
      }
      if (!existant && (!args.nom || !args.prenom)) return json({ erreur: "En création, le nom et le prénom sont obligatoires." });
      const body = champs({
        nom: args.nom ?? existant?.nom,
        prenom: args.prenom ?? existant?.prenom,
        email: args.email,
        civilite: args.civilite,
        id_entreprise: idEntreprise,
        fonction: args.fonction,
        portable: args.portable,
        date_de_naissance: args.date_de_naissance,
        statut_bpf: args.statut_bpf,
        niveau_diplome: args.niveau_diplome,
        commentaires: args.commentaires,
        ...args.champs_personnalises,
      });
      const avertissement =
        existant && idEntreprise && String(existant.id_entreprise) !== String(idEntreprise)
          ? "Changement d'entreprise : les inscriptions passées gardent l'entreprise d'origine."
          : undefined;
      const res = await enregistrer(client, "participants.php", "id_participant", existant, body, args.dry_run, `${body.prenom} ${body.nom}`);
      if (avertissement && res.content[0]?.type === "text") {
        res.content[0].text = JSON.stringify({ avertissement, ...JSON.parse(res.content[0].text) }, null, 2);
      }
      return res;
    },
  );

  server.registerTool(
    "convertir_en_particulier",
    {
      title: "Convertir en particulier",
      description:
        "Convertit un participant (ou une entreprise) en particulier, par exemple pour une formation financée en CPF. " +
        "Conditions Dendreo : le participant est seul dans son entreprise et celle-ci a au plus un contact ; une " +
        "entreprise convertie a au plus un contact et un participant. Par défaut dry_run=true.",
      inputSchema: {
        id_participant: z.string().optional(),
        entreprise: ENTREPRISE.optional(),
        dry_run: z.boolean().default(true),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async (args) => {
      let idEntreprise: string | undefined;
      const bloquants: string[] = [];
      let fiche: string | undefined;
      if (args.id_participant) {
        const [p] = await client.list("participants.php", { id: args.id_participant });
        if (!p) return json({ erreur: "Participant introuvable." });
        fiche = nomDe(p);
        idEntreprise = p.id_entreprise && String(p.id_entreprise) !== "0" ? String(p.id_entreprise) : undefined;
      } else if (args.entreprise) {
        const r = single(await findEntreprise(client, args.entreprise), "Entreprise");
        if (!("row" in r)) return json(r);
        idEntreprise = String(r.row.id_entreprise);
        fiche = String(r.row.raison_sociale);
      } else {
        return json({ erreur: "Préciser id_participant ou entreprise." });
      }
      if (idEntreprise) {
        const [contacts, participants] = await Promise.all([
          client.list("contacts.php", { id_entreprise: idEntreprise, fields: "id_contact" }),
          client.list("participants.php", { id_entreprise: idEntreprise, fields: "id_participant" }),
        ]);
        if (contacts.length > 1) bloquants.push(`L'entreprise a ${contacts.length} contacts (1 maximum).`);
        if (participants.length > 1) bloquants.push(`L'entreprise a ${participants.length} participants (1 maximum).`);
      }
      const body = args.id_participant ? { id_participant: args.id_participant } : { id_entreprise: idEntreprise };
      const recap = { fiche, ...(bloquants.length ? { bloquants } : {}) };
      if (args.dry_run || bloquants.length) return json({ dry_run: args.dry_run, ...recap });
      return json({ ok: true, ...recap, resultat: await client.post("convert_particulier.php", body) });
    },
  );

  server.registerTool(
    "actions_commerciales",
    {
      title: "Actions commerciales",
      description:
        "Journal commercial : `lister` les échanges d'une entreprise ou d'un commercial, ou les relances à venir ; " +
        "`ajouter` un compte rendu d'échange avec une date de relance. Ajout en dry_run=true par défaut.",
      inputSchema: {
        action: z.enum(["lister", "ajouter"]).default("lister"),
        entreprise: ENTREPRISE.optional(),
        commercial_id: z.string().optional().describe("Id de l'administrateur commercial (voir dendreo_get administrateurs.php)"),
        relances_a_venir: z.boolean().optional().describe("Lister uniquement les actions avec une relance à venir"),
        id_contact: z.string().optional(),
        id_participant: z.string().optional(),
        compte_rendu: z.string().optional(),
        date_action: DATE.optional().describe("Défaut : aujourd'hui"),
        date_relance: DATE.optional(),
        priorite: z.number().int().min(0).max(2).optional(),
        dry_run: z.boolean().default(true),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async (args) => {
      let entreprise: Row | undefined;
      if (args.entreprise) {
        const r = single(await findEntreprise(client, args.entreprise), "Entreprise");
        if (!("row" in r)) return json(r);
        entreprise = r.row;
      }
      if (args.action === "lister") {
        const rows = await client.list("actions_commerciales.php", {
          id_entreprise: entreprise ? String(entreprise.id_entreprise) : undefined,
          commercial_id: args.commercial_id,
          relance: args.relances_a_venir ? 1 : undefined,
        });
        return json({
          nombre: rows.length,
          actions: rows.map((a) => ({
            id: a.id_action_commerciale,
            date: String(a.date_action).slice(0, 10),
            relance: a.date_relance ? String(a.date_relance).slice(0, 10) : undefined,
            priorite: a.priorite,
            compte_rendu: a.compte_rendu,
            commerciaux: ((a.commerciaux ?? []) as Row[]).map((c) => c.nom_complet),
            interlocuteurs: ((a.interlocuteurs ?? []) as Row[]).map((i) => i.raison_sociale ?? nomDe(i)),
          })),
        });
      }
      if (!args.commercial_id) return json({ erreur: "commercial_id est obligatoire (auteur de l'action)." });
      if (!entreprise && !args.id_contact && !args.id_participant) {
        return json({ erreur: "Rattacher l'action à une entreprise, un contact ou un participant." });
      }
      const body = champs({
        commercial_id: args.commercial_id,
        id_entreprise: entreprise?.id_entreprise,
        id_contact: args.id_contact,
        id_participant: args.id_participant,
        compte_rendu: args.compte_rendu,
        date_action: args.date_action ?? today(),
        date_relance: args.date_relance,
        priorite: args.priorite,
      });
      if (args.dry_run) return json({ dry_run: true, action_commerciale: body });
      return json({ ok: true, resultat: await client.post("actions_commerciales.php", body) });
    },
  );

  server.registerTool(
    "opportunites",
    {
      title: "Opportunités commerciales",
      description:
        "Pipe commercial : `lister` les opportunités ouvertes (par étape ou entreprise) avec leurs devis et les sessions " +
        "issues de ces devis ; `creer` une opportunité pour une entreprise (dry_run=true par défaut).",
      inputSchema: {
        action: z.enum(["lister", "creer"]).default("lister"),
        entreprise: ENTREPRISE.optional(),
        etape: z.string().optional().describe("Étape (intitulé ou id), ex. « Négociation »"),
        inclure_fermees: z.boolean().default(false),
        description: z.string().optional(),
        id_contact: z.string().optional(),
        id_administrateur: z.string().optional().describe("Commercial en charge"),
        source: z.string().optional().describe("Source (intitulé ou id)"),
        dry_run: z.boolean().default(true),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async (args) => {
      const [etapes, sources] = await Promise.all([client.list("opportunite_etapes.php"), client.list("sources.php")]);
      const trouve = (rows: Row[], q: string) =>
        rows.find((r) => String(r.id) === q || normalize(r.name) === normalize(q));
      const libelleEtape = (id: unknown) => {
        const e = etapes.find((x) => String(x.id) === String(id));
        return e ? `${e.name} (${e.success_chance ?? "?"} %)` : id;
      };
      let entreprise: Row | undefined;
      if (args.entreprise) {
        const r = single(await findEntreprise(client, args.entreprise), "Entreprise");
        if (!("row" in r)) return json(r);
        entreprise = r.row;
      }
      const etape = args.etape ? trouve(etapes, args.etape) : undefined;
      if (args.etape && !etape) return json({ erreur: "Étape inconnue.", etapes: etapes.map((e) => e.name) });

      if (args.action === "lister") {
        const rows = await client.list("opportunites.php", {
          id_entreprise: entreprise ? String(entreprise.id_entreprise) : undefined,
          opportunite_etape_id: etape ? String(etape.id) : undefined,
          include: "devis,devis_formations",
        });
        const filtrees = rows.filter(
          (o) =>
            (!entreprise || String(o.entreprise_id) === String(entreprise.id_entreprise)) &&
            (!etape || String(o.opportunite_etape_id) === String(etape.id)) &&
            (args.inclure_fermees || (!o.closed_at && !o.lost_at)),
        );
        return json({
          nombre: filtrees.length,
          opportunites: filtrees.map((o) => ({
            id: o.id,
            numero: o.numero_complet,
            etape: libelleEtape(o.opportunite_etape_id),
            id_entreprise: o.entreprise_id,
            description: o.description || undefined,
            creee_le: String(o.created_at).slice(0, 10),
            statut: o.lost_at ? "perdue" : o.closed_at ? "gagnée/fermée" : "ouverte",
            devis: ((o.devis ?? []) as Row[]).map((d) => ({
              numero: d.numero_complet,
              accepte: Boolean(d.accepted_at),
              sessions: ((d.formations ?? []) as Row[]).map((f) => f.id_action_de_formation),
            })),
          })),
        });
      }
      if (!entreprise) return json({ erreur: "L'entreprise est obligatoire pour créer une opportunité." });
      const source = args.source ? trouve(sources, args.source) : undefined;
      const body = champs({
        id_entreprise: entreprise.id_entreprise,
        id_contact: args.id_contact,
        id_administrateur: args.id_administrateur,
        id_etape: etape?.id,
        id_source: source?.id,
        description: args.description,
      });
      if (args.dry_run) return json({ dry_run: true, entreprise: entreprise.raison_sociale, opportunite: body });
      return json({ ok: true, resultat: await client.post("opportunites.php", body) });
    },
  );
}
