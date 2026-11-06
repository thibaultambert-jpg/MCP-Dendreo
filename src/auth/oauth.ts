// Serveur d'autorisation OAuth 2.1 du connecteur, conforme à la spécification MCP (autorisation) :
// métadonnées RFC 9728 / RFC 8414, enregistrement dynamique et CIMD, PKCE S256 obligatoire,
// consentement propre au serveur avant Google, code à usage unique, rotation des jetons de rafraîchissement.
//
// Parcours : client MCP → /oauth/authorize (page de consentement) → Google → /oauth/callback
// (email vérifié contre ALLOWED_EMAILS) → code → /oauth/token → jeton d'accès lié à /api/mcp.
import type { IncomingMessage, ServerResponse } from "node:http";
import { baseUrl, configManquante, domaineWorkspace, emailAutorise, resourceMetadataUrl, resourceUrl } from "../config.js";
import { CORS_PUBLIC, cookie, cookies, envoyerHtml, envoyerJson, ipClient, objetJson, parametres, rediriger } from "../web.js";
import { ErreurClient, type Client, enregistrer, trouverClient } from "./clients.js";
import { aleatoire, egal, hmac, maintenant, ouvrir, sceller, sha256b64url, type Scelle } from "./crypto.js";
import { identiteGoogle, urlConnexionGoogle } from "./google.js";
import { pageConsentement, pageErreur } from "./pages.js";
import { limiter, store } from "./store.js";

const SCOPE = "dendreo";
const DUREE = { transaction: 600, etat: 600, code: 300, acces: 3600, rafraichissement: 30 * 24 * 3600 };

type Transaction = Scelle & { cid: string; ru: string; st?: string; cc: string; csrf: string };
type EtatGoogle = Scelle & { cid: string; ru: string; st?: string; cc: string; sid: string; nonce: string; gv: string };
type Code = Scelle & { cid: string; ru: string; cc: string; email: string; fam: string };
export type JetonAcces = Scelle & { email: string; cid: string; aud: string; fam: string };
type JetonRafraichissement = Scelle & { email: string; cid: string; aud: string; fam: string };

export function metadonneesRessource() {
  return {
    resource: resourceUrl(),
    authorization_servers: [baseUrl()],
    bearer_methods_supported: ["header"],
    scopes_supported: [SCOPE],
    resource_name: "MCP Dendreo",
  };
}

export function metadonneesServeur() {
  const b = baseUrl();
  return {
    issuer: b,
    authorization_endpoint: `${b}/oauth/authorize`,
    token_endpoint: `${b}/oauth/token`,
    registration_endpoint: `${b}/oauth/register`,
    scopes_supported: [SCOPE],
    response_types_supported: ["code"],
    response_modes_supported: ["query"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    token_endpoint_auth_methods_supported: ["none", "client_secret_post", "client_secret_basic"],
    code_challenge_methods_supported: ["S256"],
    client_id_metadata_document_supported: true,
    authorization_response_iss_parameter_supported: true,
  };
}

/** Redirection vers le client avec le résultat (RFC 9207 : `iss` toujours présent). */
function versClient(redirectUri: string, params: Record<string, string | undefined>): string {
  const u = new URL(redirectUri);
  for (const [k, v] of Object.entries({ ...params, iss: baseUrl() })) if (v !== undefined) u.searchParams.set(k, v);
  return u.toString();
}

/** `resource` (RFC 8707) : absent, ou égal à l'URL du endpoint MCP (ou à la racine du serveur). */
const ressourceValide = (r: string | undefined) => !r || [resourceUrl(), baseUrl(), `${baseUrl()}/`].includes(r);

function erreurConfig(res: ServerResponse): boolean {
  const manquantes = configManquante();
  if (!manquantes.length) return false;
  envoyerHtml(res, 500, pageErreur("Connecteur mal configuré", `Variables d'environnement manquantes : ${manquantes.join(", ")}.`));
  return true;
}

async function tropDeRequetes(req: IncomingMessage, res: ServerResponse, seau: string, max: number): Promise<boolean> {
  const attente = await limiter(seau, ipClient(req), max);
  if (attente === undefined) return false;
  envoyerJson(res, 429, { error: "too_many_requests", error_description: "Trop de requêtes, réessayer plus tard." }, { "Retry-After": String(attente), ...CORS_PUBLIC });
  return true;
}

// ---------- Enregistrement dynamique (RFC 7591) ----------

export async function enregistrement(req: IncomingMessage, res: ServerResponse, corps: unknown) {
  if (req.method === "OPTIONS") return void res.writeHead(204, CORS_PUBLIC).end();
  if (req.method !== "POST") return envoyerJson(res, 405, { error: "invalid_request" }, { Allow: "POST", ...CORS_PUBLIC });
  if (await tropDeRequetes(req, res, "register", 20)) return;
  const meta = objetJson(corps);
  if (!meta) return envoyerJson(res, 400, { error: "invalid_client_metadata", error_description: "Corps JSON attendu" }, CORS_PUBLIC);
  try {
    envoyerJson(res, 201, enregistrer(meta), CORS_PUBLIC);
  } catch (e) {
    const err = e instanceof ErreurClient ? e : new ErreurClient("invalid_client_metadata", (e as Error).message);
    envoyerJson(res, 400, { error: err.code, error_description: err.message }, CORS_PUBLIC);
  }
}

// ---------- Autorisation : page de consentement, puis Google ----------

export async function autorisation(req: IncomingMessage, res: ServerResponse, corps: unknown) {
  if (erreurConfig(res)) return;
  if (await tropDeRequetes(req, res, "authorize", 30)) return;
  if (req.method === "POST") return consentement(req, res, corps);
  if (req.method !== "GET") return envoyerJson(res, 405, { error: "invalid_request" }, { Allow: "GET, POST" });

  const q = Object.fromEntries(new URL(req.url ?? "/", "http://x").searchParams);
  // Client et redirect_uri d'abord : tant qu'ils ne sont pas validés, on n'y redirige jamais.
  let client: Client;
  try {
    client = await trouverClient(q.client_id);
  } catch (e) {
    return envoyerHtml(res, 400, pageErreur("Application inconnue", (e as Error).message));
  }
  const redirectUri = q.redirect_uri ?? (client.redirect_uris.length === 1 ? client.redirect_uris[0] : undefined);
  if (!redirectUri || !client.redirect_uris.includes(redirectUri)) {
    return envoyerHtml(res, 400, pageErreur("Adresse de retour refusée", "La redirect_uri ne correspond pas exactement à celles enregistrées pour cette application."));
  }
  const erreur = (error: string, description: string) => rediriger(res, versClient(redirectUri, { error, error_description: description, state: q.state }));
  if (q.response_type !== "code") return erreur("unsupported_response_type", "response_type=code attendu");
  if (!q.code_challenge || q.code_challenge_method !== "S256" || !/^[A-Za-z0-9_-]{43}$/.test(q.code_challenge)) {
    return erreur("invalid_request", "PKCE obligatoire : code_challenge avec code_challenge_method=S256");
  }
  if (!ressourceValide(q.resource)) return erreur("invalid_target", `resource attendu : ${resourceUrl()}`);

  // Jeton anti-CSRF : cookie aléatoire + sa copie scellée dans le formulaire (double soumission).
  const csrf = aleatoire();
  const txn = sceller("txn", { cid: client.client_id, ru: redirectUri, st: q.state, cc: q.code_challenge, csrf }, DUREE.transaction);
  envoyerHtml(res, 200, pageConsentement({ client, redirectUri, txn, serveur: resourceUrl() }), {
    "Set-Cookie": cookie("mcp_csrf", csrf, DUREE.transaction),
  });
}

async function consentement(req: IncomingMessage, res: ServerResponse, corps: unknown) {
  const origine = req.headers.origin;
  if (origine && origine !== new URL(baseUrl()).origin) return envoyerHtml(res, 403, pageErreur("Requête refusée", "Origine inattendue."));
  const p = parametres(corps);
  const txn = ouvrir<Transaction>("txn", p.txn);
  const csrf = cookies(req)["__Host-mcp_csrf"];
  if (!txn || !csrf || !egal(csrf, txn.csrf)) {
    return envoyerHtml(res, 400, pageErreur("Demande expirée", "Relancer la connexion depuis l'application."));
  }
  const effacerCsrf = cookie("mcp_csrf", "", 0);
  if (p.decision !== "approuver") {
    return rediriger(res, versClient(txn.ru, { error: "access_denied", error_description: "Accès refusé par l'utilisateur", state: txn.st }), { "Set-Cookie": effacerCsrf });
  }
  // Consentement donné : l'état Google et son cookie ne sont créés qu'à partir d'ici.
  const sid = aleatoire();
  const nonce = aleatoire();
  const gv = aleatoire(48);
  const state = sceller("gstate", { cid: txn.cid, ru: txn.ru, st: txn.st, cc: txn.cc, sid, nonce, gv }, DUREE.etat);
  rediriger(res, urlConnexionGoogle({ state, nonce, codeChallenge: sha256b64url(gv) }), {
    "Set-Cookie": [effacerCsrf, cookie("mcp_state", sid, DUREE.etat)],
  });
}

// ---------- Retour de Google ----------

export async function retourGoogle(req: IncomingMessage, res: ServerResponse) {
  if (erreurConfig(res)) return;
  if (await tropDeRequetes(req, res, "callback", 30)) return;
  const q = Object.fromEntries(new URL(req.url ?? "/", "http://x").searchParams);
  const etat = ouvrir<EtatGoogle>("gstate", q.state);
  const sid = cookies(req)["__Host-mcp_state"];
  const effacer = { "Set-Cookie": cookie("mcp_state", "", 0) };
  if (!etat || !sid || !egal(sid, etat.sid) || !(await store().poserSiAbsent(`state:${etat.jti}`, DUREE.etat))) {
    return envoyerHtml(res, 400, pageErreur("Connexion expirée ou invalide", "Relancer la connexion depuis l'application."), effacer);
  }
  const refus = (description: string) => versClient(etat.ru, { error: "access_denied", error_description: description, state: etat.st });
  if (q.error || !q.code) return rediriger(res, refus("Connexion Google annulée"), effacer);

  let email: string;
  try {
    const id = await identiteGoogle(q.code, etat.gv, etat.nonce);
    const domaine = domaineWorkspace();
    if (domaine && id.hd !== domaine) {
      return envoyerHtml(res, 403, pageErreur("Compte refusé", `Seuls les comptes Google Workspace du domaine ${domaine} sont acceptés.`, refus("Domaine non autorisé")), effacer);
    }
    email = id.email;
  } catch (e) {
    console.warn(JSON.stringify({ mcp_auth: "echec_google", raison: (e as Error).message }));
    return envoyerHtml(res, 502, pageErreur("Échec de la connexion Google", (e as Error).message, refus("Échec de la connexion Google")), effacer);
  }
  if (!emailAutorise(email)) {
    console.warn(JSON.stringify({ mcp_auth: "email_refuse" }));
    return envoyerHtml(res, 403, pageErreur("Accès non autorisé", `L'adresse ${email} n'est pas dans la liste des personnes autorisées à utiliser ce connecteur. Demander à l'administrateur de l'ajouter.`, refus("Email non autorisé")), effacer);
  }
  const code = sceller("code", { cid: etat.cid, ru: etat.ru, cc: etat.cc, email, fam: aleatoire(16) }, DUREE.code);
  rediriger(res, versClient(etat.ru, { code, state: etat.st }), effacer);
}

// ---------- Endpoint de jeton ----------

function erreurJeton(res: ServerResponse, error: string, description: string, statut = 400) {
  envoyerJson(res, statut, { error, error_description: description }, { Pragma: "no-cache", ...CORS_PUBLIC, ...(statut === 401 ? { "WWW-Authenticate": 'Basic realm="oauth"' } : {}) });
}

/** Authentifie le client à l'endpoint de jeton (public : client_id seul ; confidentiel : secret). */
async function authentifierClient(req: IncomingMessage, p: Record<string, string>): Promise<Client> {
  let clientId = p.client_id;
  let secret = p.client_secret;
  const basic = /^Basic\s+(.+)$/i.exec(req.headers.authorization ?? "")?.[1];
  if (basic) {
    const [id, s] = Buffer.from(basic, "base64").toString("utf8").split(":");
    clientId = decodeURIComponent(id ?? "");
    secret = decodeURIComponent(s ?? "");
  }
  const client = await trouverClient(clientId);
  if (client.auth !== "none" && (!secret || !egal(secret, hmac(client.client_id)))) throw new ErreurClient("invalid_client", "Authentification du client échouée");
  return client;
}

async function emettreJetons(res: ServerResponse, email: string, cid: string, fam: string) {
  const aud = resourceUrl();
  envoyerJson(
    res,
    200,
    {
      access_token: sceller("access", { email, cid, aud, fam }, DUREE.acces),
      token_type: "Bearer",
      expires_in: DUREE.acces,
      refresh_token: sceller("refresh", { email, cid, aud, fam }, DUREE.rafraichissement),
      scope: SCOPE,
    },
    { Pragma: "no-cache", ...CORS_PUBLIC },
  );
}

const familleRevoquee = (fam: string) => store().existe(`revoque:${fam}`);
const revoquerFamille = (fam: string) => store().poserSiAbsent(`revoque:${fam}`, DUREE.rafraichissement);

export async function jeton(req: IncomingMessage, res: ServerResponse, corps: unknown) {
  if (req.method === "OPTIONS") return void res.writeHead(204, CORS_PUBLIC).end();
  if (req.method !== "POST") return erreurJeton(res, "invalid_request", "POST attendu", 405);
  if (configManquante().length) return erreurJeton(res, "server_error", "Connecteur mal configuré", 500);
  if (await tropDeRequetes(req, res, "token", 60)) return;
  const p = parametres(corps);
  let client: Client;
  try {
    client = await authentifierClient(req, p);
  } catch (e) {
    return erreurJeton(res, "invalid_client", (e as Error).message, 401);
  }
  if (!ressourceValide(p.resource)) return erreurJeton(res, "invalid_target", `resource attendu : ${resourceUrl()}`);

  if (p.grant_type === "authorization_code") {
    const code = ouvrir<Code>("code", p.code);
    if (!code || code.cid !== client.client_id) return erreurJeton(res, "invalid_grant", "Code invalide ou expiré");
    if (p.redirect_uri !== code.ru) return erreurJeton(res, "invalid_grant", "redirect_uri différente de celle de l'autorisation");
    if (!p.code_verifier || !/^[A-Za-z0-9._~-]{43,128}$/.test(p.code_verifier) || !egal(sha256b64url(p.code_verifier), code.cc)) {
      return erreurJeton(res, "invalid_grant", "code_verifier PKCE invalide");
    }
    // Usage unique : un code rejoué révoque aussi les jetons déjà émis avec lui.
    if (!(await store().poserSiAbsent(`code:${code.jti}`, DUREE.code + 60))) {
      await revoquerFamille(code.fam);
      return erreurJeton(res, "invalid_grant", "Code déjà utilisé");
    }
    if (!emailAutorise(code.email)) return erreurJeton(res, "invalid_grant", "Utilisateur non autorisé");
    return emettreJetons(res, code.email, client.client_id, code.fam);
  }

  if (p.grant_type === "refresh_token") {
    const rt = ouvrir<JetonRafraichissement>("refresh", p.refresh_token);
    if (!rt || rt.cid !== client.client_id || rt.aud !== resourceUrl()) return erreurJeton(res, "invalid_grant", "Jeton de rafraîchissement invalide ou expiré");
    if (await familleRevoquee(rt.fam)) return erreurJeton(res, "invalid_grant", "Jeton révoqué");
    // Rotation : chaque jeton de rafraîchissement ne sert qu'une fois ; une réutilisation révoque toute la famille.
    const restant = Math.max(60, (rt.exp ?? maintenant()) - maintenant());
    if (!(await store().poserSiAbsent(`refresh:${rt.jti}`, restant))) {
      await revoquerFamille(rt.fam);
      return erreurJeton(res, "invalid_grant", "Jeton de rafraîchissement déjà utilisé : connexion révoquée");
    }
    if (!emailAutorise(rt.email)) return erreurJeton(res, "invalid_grant", "Utilisateur non autorisé");
    return emettreJetons(res, rt.email, client.client_id, rt.fam);
  }

  erreurJeton(res, "unsupported_grant_type", "grant_type accepté : authorization_code ou refresh_token");
}

// ---------- Validation des jetons d'accès (endpoint MCP) ----------

export type Utilisateur = { email: string; clientId: string; jeton: string; exp?: number };

/**
 * Valide le jeton `Authorization: Bearer` : scellé par ce serveur, non expiré, émis pour ce endpoint (audience),
 * famille non révoquée, et email toujours présent dans ALLOWED_EMAILS. Le jeton n'est jamais accepté dans l'URL.
 */
export async function verifierJeton(req: IncomingMessage): Promise<Utilisateur | undefined> {
  const brut = /^Bearer\s+(\S+)$/i.exec(req.headers.authorization ?? "")?.[1];
  const t = ouvrir<JetonAcces>("access", brut);
  if (!brut || !t || t.aud !== resourceUrl() || !emailAutorise(t.email)) return undefined;
  if (await familleRevoquee(t.fam)) return undefined;
  return { email: t.email, clientId: t.cid, jeton: brut, exp: t.exp };
}

/** Réponse 401 avec l'emplacement des métadonnées (RFC 9728) pour déclencher la connexion. */
export function nonAutorise(res: ServerResponse, invalide: boolean, entetes: Record<string, string> = {}) {
  const www = `Bearer resource_metadata="${resourceMetadataUrl()}", scope="${SCOPE}"${invalide ? ', error="invalid_token"' : ""}`;
  envoyerJson(res, 401, { error: invalide ? "invalid_token" : "unauthorized" }, { "WWW-Authenticate": www, ...entetes });
}
