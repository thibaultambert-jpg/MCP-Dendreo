import type { IncomingMessage, ServerResponse } from "node:http";
import { timingSafeEqual } from "node:crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "./server.js";

function authorized(req: IncomingMessage): boolean {
  const expected = process.env.MCP_AUTH_TOKEN;
  if (!expected) return false;
  const url = new URL(req.url ?? "/", "http://localhost");
  const bearer = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  const given = url.searchParams.get("token") ?? bearer ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Mode sans état : un serveur et un transport par requête (adapté aux fonctions serverless).
export async function handleMcpRequest(req: IncomingMessage, res: ServerResponse, body?: unknown) {
  if (!authorized(req)) {
    res.writeHead(401, { "Content-Type": "application/json" }).end(JSON.stringify({ error: "unauthorized" }));
    return;
  }
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  res.on("close", () => {
    transport.close();
    server.close();
  });
  await server.connect(transport);
  await transport.handleRequest(req, res, body);
}
