import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DendreoClient } from "../dendreo/client.js";
import { json } from "./util.js";

// Outil de lecture générique, en attendant les outils métier écrits à partir de la doc API.
export function registerGenericTools(server: McpServer, client: DendreoClient) {
  server.registerTool(
    "dendreo_get",
    {
      title: "Lire une ressource Dendreo",
      description:
        "Appel GET en lecture seule sur l'API Dendreo. `endpoint` est le fichier de ressource " +
        "(ex. participants.php, entreprises.php, actions_de_formation.php) ; `params` sont les filtres de requête.",
      inputSchema: {
        endpoint: z.string().describe("Ressource Dendreo, ex. participants.php"),
        params: z
          .record(z.union([z.string(), z.number(), z.boolean()]))
          .optional()
          .describe("Paramètres de requête, ex. { id_participant: 42 }"),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ endpoint, params }) => {
      const data = await client.get(endpoint, params);
      return json(data);
    },
  );
}
