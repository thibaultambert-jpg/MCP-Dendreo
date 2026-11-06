// Petits utilitaires HTTP (sans framework) partagés par les endpoints OAuth et MCP.
import type { IncomingMessage, ServerResponse } from "node:http";

export function envoyerJson(res: ServerResponse, statut: number, corps: unknown, entetes: Record<string, string> = {}) {
  res.writeHead(statut, { "Content-Type": "application/json", "Cache-Control": "no-store", ...entetes }).end(JSON.stringify(corps));
}

/**
 * En-têtes des pages HTML : pas de cache, pas d'iframe (clickjacking), aucun script.
 * `Referrer-Policy: same-origin` et non `no-referrer` : avec `no-referrer`, les navigateurs envoient
 * `Origin: null` à la validation du formulaire de consentement, que le contrôle d'origine refuserait.
 * Rien n'est transmis aux autres sites (lien de retour vers l'application).
 */
export function envoyerHtml(res: ServerResponse, statut: number, html: string, entetes: Record<string, string | string[]> = {}) {
  res
    .writeHead(statut, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "same-origin",
      "X-Content-Type-Options": "nosniff",
      ...entetes,
    })
    .end(html);
}

export function rediriger(res: ServerResponse, url: string, entetes: Record<string, string | string[]> = {}) {
  res.writeHead(302, { Location: url, "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", ...entetes }).end();
}

/** Paramètres d'un corps déjà lu (objet analysé par Vercel, ou chaîne brute) ou de la query string. */
export function parametres(corps: unknown): Record<string, string> {
  if (typeof corps === "string") {
    const t = corps.trim();
    if (t.startsWith("{")) {
      try {
        return parametres(JSON.parse(t));
      } catch {
        return {};
      }
    }
    return Object.fromEntries(new URLSearchParams(t));
  }
  if (corps instanceof URLSearchParams) return Object.fromEntries(corps);
  if (corps && typeof corps === "object") {
    return Object.fromEntries(Object.entries(corps).filter(([, v]) => typeof v === "string" || typeof v === "number").map(([k, v]) => [k, String(v)]));
  }
  return {};
}

/** Corps JSON en objet (Vercel l'a déjà analysé ; en local c'est une chaîne). */
export function objetJson(corps: unknown): Record<string, unknown> | undefined {
  if (typeof corps === "string") {
    try {
      corps = JSON.parse(corps);
    } catch {
      return undefined;
    }
  }
  return corps && typeof corps === "object" && !Array.isArray(corps) ? (corps as Record<string, unknown>) : undefined;
}

export function cookies(req: IncomingMessage): Record<string, string> {
  const out: Record<string, string> = {};
  for (const morceau of (req.headers.cookie ?? "").split(";")) {
    const i = morceau.indexOf("=");
    if (i > 0) out[morceau.slice(0, i).trim()] = decodeURIComponent(morceau.slice(i + 1).trim());
  }
  return out;
}

/** Cookie `__Host-` : Secure, HttpOnly, SameSite=Lax, Path=/, sans Domain. */
export function cookie(nom: string, valeur: string, maxAge: number): string {
  return `__Host-${nom}=${encodeURIComponent(valeur)}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

export function ipClient(req: IncomingMessage): string {
  const fwd = req.headers["x-forwarded-for"];
  const premiere = (Array.isArray(fwd) ? fwd[0] : fwd)?.split(",")[0]?.trim();
  return premiere || req.socket?.remoteAddress || "inconnue";
}

/** CORS ouvert pour les documents publics et les endpoints sans cookie (métadonnées, jeton, enregistrement). */
export const CORS_PUBLIC = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, MCP-Protocol-Version",
  "Access-Control-Max-Age": "600",
};
