import type { IncomingMessage, ServerResponse } from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import { configManquante, estLocal, limiteParMinute, originesAutorisees } from "./config.js";
import { autorisation, enregistrement, jeton, metadonneesRessource, metadonneesServeur, nonAutorise, retourGoogle, verifierJeton } from "./auth/oauth.js";
import { limiter } from "./auth/store.js";
import { createServer } from "./server.js";
import { CORS_PUBLIC, envoyerJson } from "./web.js";

/**
 * Origine acceptée (protection contre le DNS rebinding, exigée par la spécification Streamable HTTP) :
 * absente (client serveur à serveur), l'origine du serveur, claude.ai / claude.com, MCP_ALLOWED_ORIGINS,
 * et localhost quand le serveur tourne lui-même en local.
 */
function origineAcceptee(origine: string | undefined): boolean {
  if (!origine) return true;
  if (originesAutorisees().has(origine)) return true;
  if (!estLocal()) return false;
  try {
    return ["localhost", "127.0.0.1", "[::1]"].includes(new URL(origine).hostname);
  } catch {
    return false;
  }
}

// Mode sans état : un serveur et un transport par requête (adapté aux fonctions serverless).
export async function handleMcpRequest(req: IncomingMessage, res: ServerResponse, body?: unknown) {
  const origine = req.headers.origin;
  if (!origineAcceptee(origine)) {
    return envoyerJson(res, 403, { jsonrpc: "2.0", id: null, error: { code: -32600, message: "Origine non autorisée" } });
  }
  const cors: Record<string, string> = origine
    ? {
        "Access-Control-Allow-Origin": origine,
        Vary: "Origin",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id, Last-Event-ID",
        "Access-Control-Expose-Headers": "WWW-Authenticate, Mcp-Session-Id, MCP-Protocol-Version",
      }
    : {};
  if (req.method === "OPTIONS") return void res.writeHead(204, cors).end();
  for (const [k, v] of Object.entries(cors)) res.setHeader(k, v);

  if (configManquante().some((v) => v.startsWith("OAUTH_SECRET") || v === "ALLOWED_EMAILS")) {
    return envoyerJson(res, 500, { error: "server_error", error_description: "Connecteur mal configuré (OAUTH_SECRET, ALLOWED_EMAILS)" });
  }
  const utilisateur = await verifierJeton(req);
  if (!utilisateur) return nonAutorise(res, !!req.headers.authorization);

  const attente = await limiter("mcp", utilisateur.email, limiteParMinute());
  if (attente !== undefined) {
    return envoyerJson(res, 429, { jsonrpc: "2.0", id: null, error: { code: -32000, message: "Trop de requêtes : réessayer dans une minute." } }, { "Retry-After": String(attente) });
  }
  (req as IncomingMessage & { auth?: AuthInfo }).auth = {
    token: utilisateur.jeton,
    clientId: utilisateur.clientId,
    scopes: ["dendreo"],
    expiresAt: utilisateur.exp,
    extra: { email: utilisateur.email },
  };

  const server = createServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  res.on("close", () => {
    transport.close();
    server.close();
  });
  await server.connect(transport);
  await transport.handleRequest(req, res, body);
}

/** Route d'une requête : chemin d'origine, ou paramètre `route` posé par les réécritures de vercel.json. */
export function routeDe(url: string | undefined): string {
  const u = new URL(url ?? "/", "http://x");
  const p = u.pathname.replace(/\/+$/, "");
  if (p === "/api/mcp") return "mcp";
  if (p.startsWith("/.well-known/oauth-protected-resource")) return "prm";
  if (p.startsWith("/.well-known/oauth-authorization-server")) return "asm";
  const oauth = /^\/oauth\/([a-z]+)$/.exec(p)?.[1];
  if (oauth) return oauth;
  return u.searchParams.get("route") ?? "";
}

/** Point d'entrée unique : endpoint MCP et endpoints OAuth. */
export async function handleHttp(req: IncomingMessage, res: ServerResponse, body?: unknown) {
  const route = routeDe(req.url);
  try {
    switch (route) {
      case "mcp":
        return await handleMcpRequest(req, res, body);
      case "prm":
      case "asm":
        if (req.method === "OPTIONS") return void res.writeHead(204, CORS_PUBLIC).end();
        return envoyerJson(res, 200, route === "prm" ? metadonneesRessource() : metadonneesServeur(), { "Cache-Control": "public, max-age=300", ...CORS_PUBLIC });
      case "register":
        return await enregistrement(req, res, body);
      case "authorize":
        return await autorisation(req, res, body);
      case "callback":
        return await retourGoogle(req, res);
      case "token":
        return await jeton(req, res, body);
      default:
        return envoyerJson(res, 404, { error: "not_found" });
    }
  } catch (e) {
    console.error(JSON.stringify({ mcp_erreur: route, message: (e as Error).message }));
    if (!res.headersSent) envoyerJson(res, 500, { error: "server_error" });
    else res.end();
  }
}
