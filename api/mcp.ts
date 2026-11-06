import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleMcpRequest } from "../src/http.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let body: unknown;
  try {
    body = req.body;
  } catch {
    res.status(400).json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
    return;
  }
  await handleMcpRequest(req, res, body);
}
