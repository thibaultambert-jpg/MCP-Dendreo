// Clients OAuth : enregistrement dynamique (RFC 7591, sans base : l'identifiant est scellé)
// et Client ID Metadata Documents (client_id = URL HTTPS d'un document JSON).
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { hmac, ouvrir, sceller } from "./crypto.js";

export type Client = {
  client_id: string;
  client_name: string;
  redirect_uris: string[];
  /** "none" (client public, PKCE seul) ou secret partagé. */
  auth: "none" | "client_secret_post" | "client_secret_basic";
  /** Client ID Metadata Document : identité vérifiable par son nom de domaine. */
  cimd: boolean;
};

export class ErreurClient extends Error {
  constructor(readonly code: string, message: string) {
    super(message);
  }
}

const PREFIXE_DCR = "dcr_";

/** Redirect URI acceptée : HTTPS, ou http sur localhost (spécification MCP), sans fragment. */
export function redirectValide(uri: unknown): uri is string {
  if (typeof uri !== "string" || uri.length > 1000) return false;
  try {
    const u = new URL(uri);
    if (u.hash) return false;
    if (u.protocol === "https:") return true;
    return u.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(u.hostname);
  } catch {
    return false;
  }
}

const texte = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f]/g, "").trim().slice(0, max) : "");

/** Traite une requête d'enregistrement dynamique ; renvoie la réponse RFC 7591. */
export function enregistrer(meta: Record<string, unknown>): Record<string, unknown> {
  const uris = meta.redirect_uris;
  if (!Array.isArray(uris) || uris.length === 0 || uris.length > 10) throw new ErreurClient("invalid_redirect_uri", "redirect_uris requis (1 à 10)");
  for (const u of uris) if (!redirectValide(u)) throw new ErreurClient("invalid_redirect_uri", `redirect_uri refusée : ${String(u).slice(0, 200)}`);
  const auth = (meta.token_endpoint_auth_method ?? "none") as string;
  if (!["none", "client_secret_post", "client_secret_basic"].includes(auth)) {
    throw new ErreurClient("invalid_client_metadata", `token_endpoint_auth_method non pris en charge : ${auth}`);
  }
  const grants = (meta.grant_types as unknown[] | undefined) ?? ["authorization_code", "refresh_token"];
  if (!Array.isArray(grants) || grants.some((g) => g !== "authorization_code" && g !== "refresh_token")) {
    throw new ErreurClient("invalid_client_metadata", "grant_types acceptés : authorization_code, refresh_token");
  }
  const nom = texte(meta.client_name, 100) || "Application sans nom";
  const client_id = PREFIXE_DCR + sceller("client", { n: nom, r: uris, a: auth }, 0);
  return {
    client_id,
    client_id_issued_at: Math.floor(Date.now() / 1000),
    ...(auth !== "none" ? { client_secret: hmac(client_id), client_secret_expires_at: 0 } : {}),
    client_name: nom,
    redirect_uris: uris,
    token_endpoint_auth_method: auth,
    grant_types: grants,
    response_types: ["code"],
    ...(typeof meta.application_type === "string" ? { application_type: meta.application_type } : {}),
  };
}

/** Adresse IP privée, locale ou réservée (protection SSRF). */
function ipInterne(ip: string): boolean {
  if (isIP(ip) === 4) {
    const [a, b] = ip.split(".").map(Number);
    return a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224;
  }
  const v = ip.toLowerCase();
  if (v.startsWith("::ffff:")) return ipInterne(v.slice(7));
  return v === "::" || v === "::1" || v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe80") || v.startsWith("ff");
}

const cacheCimd = new Map<string, { client: Client; exp: number }>();

/** Récupère et valide un Client ID Metadata Document. */
async function chargerCimd(clientId: string): Promise<Client> {
  const cache = cacheCimd.get(clientId);
  if (cache && cache.exp > Date.now()) return cache.client;
  let url: URL;
  try {
    url = new URL(clientId);
  } catch {
    throw new ErreurClient("invalid_client", "client_id invalide");
  }
  if (url.protocol !== "https:" || url.pathname === "/" || url.hash || url.username || url.password || (url.port && url.port !== "443")) {
    throw new ErreurClient("invalid_client", "client_id : URL HTTPS avec un chemin attendue");
  }
  const hote = url.hostname.replace(/^\[|\]$/g, "");
  const adresses = isIP(hote) ? [hote] : (await lookup(hote, { all: true }).catch(() => [])).map((a) => a.address);
  if (adresses.length === 0 || adresses.some(ipInterne)) throw new ErreurClient("invalid_client", "hôte du client_id injoignable ou interne");

  const res = await fetch(url, { redirect: "error", headers: { Accept: "application/json" }, signal: AbortSignal.timeout(5000) }).catch(() => undefined);
  if (!res?.ok) throw new ErreurClient("invalid_client", "document de métadonnées du client inaccessible");
  const brut = await res.text();
  if (brut.length > 10_000) throw new ErreurClient("invalid_client", "document de métadonnées trop volumineux");
  let doc: Record<string, unknown>;
  try {
    doc = JSON.parse(brut);
  } catch {
    throw new ErreurClient("invalid_client", "document de métadonnées : JSON invalide");
  }
  if (doc.client_id !== clientId) throw new ErreurClient("invalid_client", "document de métadonnées : client_id différent de l'URL");
  const uris = doc.redirect_uris;
  if (!Array.isArray(uris) || uris.length === 0 || !uris.every(redirectValide)) throw new ErreurClient("invalid_client", "document de métadonnées : redirect_uris invalides");
  const nom = texte(doc.client_name, 100);
  if (!nom) throw new ErreurClient("invalid_client", "document de métadonnées : client_name manquant");
  const client: Client = { client_id: clientId, client_name: nom, redirect_uris: uris as string[], auth: "none", cimd: true };
  const maxAge = Number(/max-age=(\d+)/.exec(res.headers.get("cache-control") ?? "")?.[1] ?? 300);
  cacheCimd.set(clientId, { client, exp: Date.now() + Math.min(Math.max(maxAge, 60), 3600) * 1000 });
  return client;
}

/** Retrouve un client à partir de son client_id (enregistrement dynamique ou CIMD). */
export async function trouverClient(clientId: unknown): Promise<Client> {
  if (typeof clientId !== "string" || !clientId) throw new ErreurClient("invalid_client", "client_id manquant");
  if (clientId.startsWith(PREFIXE_DCR)) {
    const c = ouvrir<{ jti: string; n: string; r: string[]; a: Client["auth"] }>("client", clientId.slice(PREFIXE_DCR.length));
    if (!c) throw new ErreurClient("invalid_client", "client_id inconnu : réenregistrer le client");
    return { client_id: clientId, client_name: c.n, redirect_uris: c.r, auth: c.a, cimd: false };
  }
  if (clientId.startsWith("https://")) return chargerCimd(clientId);
  throw new ErreurClient("invalid_client", "client_id inconnu");
}
