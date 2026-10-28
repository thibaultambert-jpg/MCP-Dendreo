import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DendreoClient } from "./dendreo/client.js";
import { registerGenericTools } from "./tools/generic.js";

export function createServer(): McpServer {
  const server = new McpServer({ name: "dendreo", version: "0.1.0" });
  const client = DendreoClient.fromEnv();
  registerGenericTools(server, client);
  return server;
}
