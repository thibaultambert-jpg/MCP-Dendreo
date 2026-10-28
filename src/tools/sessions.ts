import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DendreoClient, Query, Row } from "../dendreo/client.js";
import { findEntreprise, findEtape, findFormateur, findModule, single } from "./resolve.js";
import { json, monthBounds, today } from "./util.js";

const FIELDS = [
  "id_action_de_formation",
  "numero_complet",
  "intitule",
  "type",
  "date_debut",
  "date_fin",
  "nb_participants_inscrits",
  "total_participants",
  "nb_participants_min",
  "nb_participants_max",
  "id_etape_process",
  "id_entreprise",
].join(",");

const DATE = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

// La liste (INDEX) ne renvoie pas nb_participants_inscrits : on le lit via un SHOW multiple (?id=1,2,3).
async function withInscrits(client: DendreoClient, rows: Row[]): Promise<Row[]> {
  if (rows.length === 0) return rows;
  const details = await client.list("actions_de_formation.php", {
    id: rows.map((r) => r.id_action_de_formation).join(","),
    fields:
      "id_action_de_formation,nb_participants_inscrits,nb_participants_en_attente,nb_participants_min,nb_participants_max",
  });
  const byId = new Map(details.map((d) => [String(d.id_action_de_formation), d]));
  return rows.map((r) => ({ ...r, ...byId.get(String(r.id_action_de_formation)) }));
}

function summarize(rows: Row[]) {
  return rows
    .map((r) => {
      const inscrits = r.nb_participants_inscrits ?? r.total_participants;
      const min = Number(r.nb_participants_min ?? 0);
      return {
        id: r.id_action_de_formation,
        numero: r.numero_complet,
        intitule: r.intitule,
        type: r.type,
        date_debut: r.date_debut,
        date_fin: r.date_fin,
        inscrits,
        en_attente: r.nb_participants_en_attente,
        places_min: r.nb_participants_min,
        places_max: r.nb_participants_max,
        sous_minimum: min > 0 && Number(inscrits ?? 0) < min,
      };
    })
    .sort((a, b) => String(a.date_debut).localeCompare(String(b.date_debut)));
}

async function listSessions(client: DendreoClient, query: Query) {
  const rows = await client.list("actions_de_formation.php", { ...query, fields: FIELDS });
  return summarize(await withInscrits(client, rows));
}

export function registerSessionTools(server: McpServer, client: DendreoClient) {
  server.registerTool(
    "lister_sessions_a_venir",
    {
      title: "Lister les sessions à venir",
      description:
        "Liste les actions de formation (sessions) qui commencent à partir d'aujourd'hui, triées par date, " +
        "avec le nombre de participants inscrits, le nombre de places et une alerte si la session est sous le minimum.",
      inputSchema: {
        jusqu_au: DATE.optional().describe("Date limite de début (AAAA-MM-JJ), optionnelle"),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ jusqu_au }) => json(await listSessions(client, { started_after: today(), started_before: jusqu_au })),
  );

  server.registerTool(
    "formations_du_mois",
    {
      title: "Formations qui commencent dans le mois",
      description:
        "Liste les actions de formation dont la date de début tombe dans le mois demandé (mois courant par défaut).",
      inputSchema: {
        mois: z
          .string()
          .regex(/^\d{4}-\d{2}$/)
          .optional()
          .describe("Mois au format AAAA-MM, par défaut le mois courant"),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ mois }) => {
      const { first, last } = monthBounds(mois ?? today().slice(0, 7));
      const sessions = await listSessions(client, { started_after: first, started_before: `${last} 23:59:59` });
      return json({ mois: first.slice(0, 7), sessions });
    },
  );

  server.registerTool(
    "rechercher_sessions",
    {
      title: "Rechercher des sessions",
      description:
        "Recherche des actions de formation par formation (module), formateur, entreprise cliente, type, étape, " +
        "texte libre (intitulé ou numéro) et période de début. Sans période, cherche les sessions à partir d'aujourd'hui. " +
        "Indique pour chaque session les inscrits et si elle est sous le minimum de participants.",
      inputSchema: {
        recherche: z.string().optional().describe("Texte libre sur l'intitulé ou le numéro (ex. ADF_2026)"),
        formation: z.string().optional().describe("Module du catalogue : intitulé, numéro MOD_… ou id"),
        formateur: z.string().optional().describe("Formateur : prénom et nom, ou id"),
        entreprise: z.string().optional().describe("Entreprise cliente : raison sociale, numéro ENT_… ou id"),
        type: z.enum(["inter", "intra", "hors_formation"]).optional(),
        etape: z.string().optional().describe("Étape de l'ADF, ex. « Réalisation », « Prévisionnelle »"),
        debut_apres: DATE.optional().describe("Début à partir de (AAAA-MM-JJ), par défaut aujourd'hui"),
        debut_avant: DATE.optional().describe("Début au plus tard le (AAAA-MM-JJ)"),
      },
      annotations: { readOnlyHint: true },
    },
    async (args) => {
      const query: Query = {
        search: args.recherche,
        type: args.type,
        started_after: args.debut_apres ?? today(),
        started_before: args.debut_avant ? `${args.debut_avant} 23:59:59` : undefined,
      };
      const filtres: Record<string, unknown> = {};
      if (args.formation) {
        const r = single(await findModule(client, args.formation), "Formation");
        if (!("row" in r)) return json(r);
        query.id_module = String(r.row.id_module);
        filtres.formation = r.row.intitule;
      }
      if (args.formateur) {
        const r = single(await findFormateur(client, args.formateur), "Formateur");
        if (!("row" in r)) return json(r);
        query.id_formateur = String(r.row.id_formateur);
        filtres.formateur = `${r.row.prenom} ${r.row.nom}`;
      }
      if (args.entreprise) {
        const r = single(await findEntreprise(client, args.entreprise), "Entreprise");
        if (!("row" in r)) return json(r);
        query.id_entreprise = String(r.row.id_entreprise);
        filtres.entreprise = r.row.raison_sociale;
      }
      let idEtape: string | undefined;
      if (args.etape) {
        const r = single(await findEtape(client, args.etape), "Étape");
        if (!("row" in r)) return json(r);
        idEtape = String(r.row.id_etape_process);
        filtres.etape = r.row.intitule;
      }
      let rows = await client.list("actions_de_formation.php", { ...query, fields: FIELDS });
      // L'API ne documente pas de filtre par étape : on filtre ici.
      if (idEtape) rows = rows.filter((r) => String(r.id_etape_process) === idEtape);
      const sessions = summarize(await withInscrits(client, rows));
      return json({ filtres, nombre: sessions.length, sessions });
    },
  );
}
