// Serveur HTTP local pour tester avant déploiement : npm run dev, puis http://localhost:3000/api/mcp
// N'écoute que sur 127.0.0.1 (recommandation de la spécification pour un serveur local) ; HOST pour changer.
import { createServer as createHttpServer } from "node:http";
import { handleHttp } from "./http.js";

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "127.0.0.1";
createHttpServer(async (req, res) => {
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);
  const raw = Buffer.concat(chunks).toString();
  let body: unknown = raw || undefined;
  if (raw && (req.headers["content-type"] ?? "").includes("application/json")) {
    try {
      body = JSON.parse(raw);
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" }).end(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }));
      return;
    }
  }
  await handleHttp(req, res, body);
}).listen(port, host, () => console.log(`MCP Dendreo sur http://${host === "127.0.0.1" ? "localhost" : host}:${port}/api/mcp`));
