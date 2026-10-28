import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleMcpRequest } from "../src/http.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await handleMcpRequest(req, res, req.body);
}
