import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DendreoClient, Row } from "../dendreo/client.js";
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
  "nb_participants_max",
  "id_etape_process",
].join(",");

// La liste (INDEX) ne renvoie pas nb_participants_inscrits : on le lit via un SHOW multiple (?id=1,2,3).
async function withInscrits(client: DendreoClient, rows: Row[]): Promise<Row[]> {
  if (rows.length === 0) return rows;
  const details = await client.list("actions_de_formation.php", {
    id: rows.map((r) => r.id_action_de_formation).join(","),
    fields: "id_action_de_formation,nb_participants_inscrits,nb_participants_en_attente,nb_participants_max",
  });
  const byId = new Map(details.map((d) => [String(d.id_action_de_formation), d]));
  return rows.map((r) => ({ ...r, ...byId.get(String(r.id_action_de_formation)) }));
}

function summarize(rows: Row[]) {
  return rows
    .map((r) => ({
      id: r.id_action_de_formation,
      numero: r.numero_complet,
      intitule: r.intitule,
      type: r.type,
      date_debut: r.date_debut,
      date_fin: r.date_fin,
      inscrits: r.nb_participants_inscrits ?? r.total_participants,
      en_attente: r.nb_participants_en_attente,
      places_max: r.nb_participants_max,
    }))
    .sort((a, b) => String(a.date_debut).localeCompare(String(b.date_debut)));
}

export function registerSessionTools(server: McpServer, client: DendreoClient) {
  server.registerTool(
    "lister_sessions_a_venir",
    {
      title: "Lister les sessions à venir",
      description:
        "Liste les actions de formation (sessions) qui commencent à partir d'aujourd'hui, triées par date, " +
        "avec le nombre de participants inscrits et le nombre de places.",
      inputSchema: {
        jusqu_au: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .optional()
          .describe("Date limite de début (AAAA-MM-JJ), optionnelle"),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ jusqu_au }) => {
      const rows = await client.list("actions_de_formation.php", {
        started_after: today(),
        started_before: jusqu_au,
        fields: FIELDS,
      });
      return json(summarize(await withInscrits(client, rows)));
    },
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
      const rows = await client.list("actions_de_formation.php", {
        started_after: first,
        started_before: `${last} 23:59:59`,
        fields: FIELDS,
      });
      return json({ mois: first.slice(0, 7), sessions: summarize(await withInscrits(client, rows)) });
    },
  );
}
