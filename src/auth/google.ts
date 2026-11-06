// Connexion Google (OpenID Connect) : le serveur MCP est un client Google avec un identifiant fixe.
import { baseUrl, domaineWorkspace } from "../config.js";
import { maintenant } from "./crypto.js";

const AUTORISATION = "https://accounts.google.com/o/oauth2/v2/auth";
const JETON = "https://oauth2.googleapis.com/token";
const EMETTEURS = new Set(["https://accounts.google.com", "accounts.google.com"]);

export const callbackGoogle = () => `${baseUrl()}/oauth/callback`;

export function urlConnexionGoogle(p: { state: string; nonce: string; codeChallenge: string }): string {
  const u = new URL(AUTORISATION);
  u.search = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    redirect_uri: callbackGoogle(),
    response_type: "code",
    scope: "openid email",
    state: p.state,
    nonce: p.nonce,
    code_challenge: p.codeChallenge,
    code_challenge_method: "S256",
    prompt: "select_account",
    ...(domaineWorkspace() ? { hd: domaineWorkspace()! } : {}),
  }).toString();
  return u.toString();
}

export type IdentiteGoogle = { email: string; hd?: string };

/**
 * Échange le code Google et vérifie le jeton d'identité. Reçu directement du endpoint de jeton
 * de Google en HTTPS, son émetteur est garanti par TLS (OpenID Connect Core, § 3.1.3.7) :
 * on contrôle l'émetteur, l'audience, l'expiration, le nonce et la vérification de l'email.
 */
export async function identiteGoogle(code: string, codeVerifier: string, nonce: string): Promise<IdentiteGoogle> {
  const res = await fetch(JETON, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: callbackGoogle(),
      grant_type: "authorization_code",
      code_verifier: codeVerifier,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  const corps = (await res.json().catch(() => ({}))) as { id_token?: string; error?: string };
  if (!res.ok || !corps.id_token) throw new Error(`Google a refusé l'échange du code (${corps.error ?? res.status})`);
  const partie = corps.id_token.split(".")[1];
  if (!partie) throw new Error("Jeton d'identité Google illisible");
  const c = JSON.parse(Buffer.from(partie, "base64url").toString("utf8")) as Record<string, unknown>;
  if (!EMETTEURS.has(String(c.iss))) throw new Error("Jeton Google : émetteur inattendu");
  const aud = Array.isArray(c.aud) ? c.aud : [c.aud];
  if (!aud.includes(process.env.GOOGLE_CLIENT_ID)) throw new Error("Jeton Google : audience inattendue");
  if (typeof c.exp !== "number" || c.exp < maintenant()) throw new Error("Jeton Google expiré");
  if (c.nonce !== nonce) throw new Error("Jeton Google : nonce invalide");
  if (c.email_verified !== true || typeof c.email !== "string") throw new Error("Adresse email Google non vérifiée");
  return { email: c.email.toLowerCase(), hd: typeof c.hd === "string" ? c.hd.toLowerCase() : undefined };
}
