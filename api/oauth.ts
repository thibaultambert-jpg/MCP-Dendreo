// Endpoints OAuth et métadonnées, atteints par les réécritures de vercel.json
// (/.well-known/oauth-*, /oauth/register|authorize|callback|token).
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleHttp } from "../src/http.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let body: unknown;
  try {
    body = req.body;
  } catch {
    body = undefined;
  }
  await handleHttp(req, res, body);
}
