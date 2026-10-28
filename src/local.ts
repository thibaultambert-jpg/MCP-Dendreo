// Serveur HTTP local pour tester avant déploiement : npm run dev, puis http://localhost:3000/api/mcp?token=...
import { createServer as createHttpServer } from "node:http";
import { handleMcpRequest } from "./http.js";

const port = Number(process.env.PORT ?? 3000);
createHttpServer(async (req, res) => {
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);
  const raw = Buffer.concat(chunks).toString();
  await handleMcpRequest(req, res, raw ? JSON.parse(raw) : undefined);
}).listen(port, () => console.log(`MCP Dendreo sur http://localhost:${port}/api/mcp`));
