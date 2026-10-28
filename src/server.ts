import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DendreoClient } from "./dendreo/client.js";
import { registerCreationTools } from "./tools/creation.js";
import { registerGenericTools } from "./tools/generic.js";
import { registerInscriptionTools } from "./tools/inscriptions.js";
import { registerLectureTools } from "./tools/lecture.js";
import { registerPlanningTools } from "./tools/planning.js";
import { registerSessionTools } from "./tools/sessions.js";

export function createServer(): McpServer {
  const server = new McpServer({ name: "dendreo", version: "0.2.0" });
  const client = DendreoClient.fromEnv();
  registerSessionTools(server, client);
  registerLectureTools(server, client);
  registerCreationTools(server, client);
  registerInscriptionTools(server, client);
  registerPlanningTools(server, client);
  registerGenericTools(server, client);
  return server;
}
