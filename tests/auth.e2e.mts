// Test de bout en bout du parcours OAuth (Google simulé) et du endpoint MCP : npm test
import { createServer } from "node:http";
const PORT = 3999;
Object.assign(process.env, {
  PUBLIC_URL: `http://localhost:${PORT}`, DENDREO_SLUG: "x", DENDREO_API_KEY: "y",
  GOOGLE_CLIENT_ID: "gid.apps.googleusercontent.com", GOOGLE_CLIENT_SECRET: "gsecret",
  OAUTH_SECRET: "s".repeat(40), ALLOWED_EMAILS: "Thibault.Ambert@wivoo.fr, autre@wivoo.fr", GOOGLE_WORKSPACE_DOMAIN: "wivoo.fr",
});
let googleEmail = "thibault.ambert@wivoo.fr", googleHd = "wivoo.fr", nonce = "";
const realFetch = globalThis.fetch;
globalThis.fetch = (async (u: any, init?: any) => {
  if (String(u).startsWith("https://oauth2.googleapis.com/token")) {
    const p = new URLSearchParams(String(init.body));
    if (p.get("client_secret") !== "gsecret" || !p.get("code_verifier")) return new Response('{"error":"bad"}', { status: 400 });
    const b = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
    const id = `${b({ alg: "RS256" })}.${b({ iss: "https://accounts.google.com", aud: "gid.apps.googleusercontent.com", exp: Math.floor(Date.now() / 1000) + 300, nonce, email: googleEmail, email_verified: true, hd: googleHd })}.sig`;
    return new Response(JSON.stringify({ id_token: id }), { status: 200, headers: { "content-type": "application/json" } });
  }
  return realFetch(u, init);
}) as typeof fetch;
const { handleHttp } = await import("../src/http.ts");
const srv = createServer(async (req, res) => {
  const ch: Buffer[] = []; for await (const c of req) ch.push(c as Buffer);
  const raw = Buffer.concat(ch).toString();
  await handleHttp(req, res, raw && (req.headers["content-type"] ?? "").includes("json") ? JSON.parse(raw) : raw || undefined);
}).listen(PORT, "127.0.0.1");
const B = `http://localhost:${PORT}`;
let ok = 0, ko = 0;
const check = (nom: string, cond: boolean, info?: unknown) => { cond ? ok++ : ko++; console.log(cond ? "✓" : "✗", nom, cond ? "" : JSON.stringify(info)?.slice(0, 300)); };
const f = (p: string, o: RequestInit = {}) => realFetch(p.startsWith("http") ? p : B + p, { redirect: "manual", ...o });
const crypto = await import("node:crypto");
const verifier = crypto.randomBytes(40).toString("base64url");
const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");
const MCP_HEADERS = { "Content-Type": "application/json", Accept: "application/json, text/event-stream" };
const init = JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-11-25", capabilities: {}, clientInfo: { name: "t", version: "1" } } });

let r = await f("/api/mcp", { method: "POST", headers: MCP_HEADERS, body: init });
check("401 sans jeton + WWW-Authenticate", r.status === 401 && /resource_metadata="http:\/\/localhost:3999\/\.well-known\/oauth-protected-resource\/api\/mcp"/.test(r.headers.get("www-authenticate") ?? ""), r.headers.get("www-authenticate"));
r = await f("/api/mcp?token=" + "s".repeat(40), { method: "POST", headers: MCP_HEADERS, body: init });
check("jeton dans l'URL ignoré", r.status === 401);
r = await f("/api/mcp", { method: "POST", headers: { ...MCP_HEADERS, Origin: "https://evil.example" }, body: init });
check("Origin invalide → 403", r.status === 403);
const prm = await (await f("/.well-known/oauth-protected-resource/api/mcp")).json();
check("PRM", prm.resource === B + "/api/mcp" && prm.authorization_servers[0] === B, prm);
const asm = await (await f("/.well-known/oauth-authorization-server")).json();
check("AS metadata S256", asm.code_challenge_methods_supported?.includes("S256") && asm.registration_endpoint === B + "/oauth/register", asm);
r = await f("/oauth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ redirect_uris: ["http://evil.com/cb"] }) });
check("redirect http non local refusée", r.status === 400);
const reg = await (await f("/oauth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_name: "Claude <script>", redirect_uris: ["https://claude.ai/api/mcp/auth_callback"] }) })).json();
check("enregistrement", typeof reg.client_id === "string" && !reg.client_secret, reg);
const RU = "https://claude.ai/api/mcp/auth_callback";
const authz = (extra: Record<string, string> = {}) => "/oauth/authorize?" + new URLSearchParams({ response_type: "code", client_id: reg.client_id, redirect_uri: RU, code_challenge: challenge, code_challenge_method: "S256", state: "xyz", resource: B + "/api/mcp", ...extra });
r = await f(authz({ redirect_uri: "https://claude.ai/autre" }));
check("redirect_uri différente → page d'erreur sans redirection", r.status === 400 && !r.headers.get("location"));
r = await f(authz({ code_challenge_method: "plain" }));
check("PKCE plain refusé → redirection erreur", r.status === 302 && r.headers.get("location")!.includes("error=invalid_request"));

async function parcours(email: string, hd = "wivoo.fr") {
  googleEmail = email; googleHd = hd;
  let r = await f(authz());
  const html = await r.text();
  const csrf = /__Host-mcp_csrf=([^;]+)/.exec(r.headers.get("set-cookie") ?? "")?.[1];
  const txn = /name="txn" value="([^"]+)"/.exec(html)?.[1];
  check("page de consentement (nom échappé, redirect affichée, anti-iframe)", r.status === 200 && html.includes("Claude &lt;script&gt;") && html.includes("claude.ai") && r.headers.get("x-frame-options") === "DENY" && !!csrf && !!txn);
  const r0 = await f("/oauth/authorize", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ txn: txn!, decision: "approuver" }) });
  check("consentement sans cookie CSRF refusé", r0.status === 400);
  r = await f("/oauth/authorize", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Cookie: `__Host-mcp_csrf=${csrf}`, Origin: B }, body: new URLSearchParams({ txn: txn!, decision: "approuver" }) });
  const g = new URL(r.headers.get("location") ?? "http://x");
  const sid = /__Host-mcp_state=([^;]+)/.exec(String(r.headers.get("set-cookie")))?.[1];
  check("redirection Google (hd, PKCE, nonce)", r.status === 302 && g.host === "accounts.google.com" && g.searchParams.get("hd") === "wivoo.fr" && g.searchParams.get("code_challenge_method") === "S256" && !!sid, r.headers.get("location"));
  nonce = g.searchParams.get("nonce")!;
  const cb = `/oauth/callback?code=gcode&state=${encodeURIComponent(g.searchParams.get("state")!)}`;
  const rSans = await f(cb);
  check("callback sans cookie d'état refusé", rSans.status === 400);
  r = await f(cb, { headers: { Cookie: `__Host-mcp_state=${sid}` } });
  return { r, cb, sid };
}
let { r: rcb, cb, sid } = await parcours("Thibault.Ambert@wivoo.fr".toLowerCase());
const back = new URL(rcb.headers.get("location") ?? "http://x");
check("retour au client avec code, state et iss", rcb.status === 302 && back.origin + back.pathname === RU && back.searchParams.get("state") === "xyz" && back.searchParams.get("iss") === B && !!back.searchParams.get("code"), rcb.headers.get("location"));
r = await f(cb, { headers: { Cookie: `__Host-mcp_state=${sid}` } });
check("état Google à usage unique", r.status === 400);
const code = back.searchParams.get("code")!;
const tok = (p: Record<string, string>) => f("/oauth/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(p) });
r = await tok({ grant_type: "authorization_code", code, client_id: reg.client_id, redirect_uri: RU, code_verifier: "a".repeat(43), resource: B + "/api/mcp" });
check("mauvais code_verifier refusé", r.status === 400);
r = await tok({ grant_type: "authorization_code", code, client_id: reg.client_id, redirect_uri: RU, code_verifier: verifier, resource: B + "/api/mcp" });
const t1 = await r.json();
check("échange du code", r.status === 200 && t1.token_type === "Bearer" && !!t1.refresh_token && r.headers.get("cache-control") === "no-store", t1);
r = await tok({ grant_type: "authorization_code", code, client_id: reg.client_id, redirect_uri: RU, code_verifier: verifier });
check("code rejoué refusé", r.status === 400);
const mcp = (t: string, body = init, extra: Record<string, string> = {}) => f("/api/mcp", { method: "POST", headers: { ...MCP_HEADERS, Authorization: `Bearer ${t}`, ...extra }, body });
r = await mcp(t1.access_token);
check("code rejoué → famille révoquée (jeton refusé)", r.status === 401);

// Nouveau parcours propre
({ r: rcb } = await parcours("autre@wivoo.fr"));
const code2 = new URL(rcb.headers.get("location")!).searchParams.get("code")!;
const t2 = await (await tok({ grant_type: "authorization_code", code: code2, client_id: reg.client_id, redirect_uri: RU, code_verifier: verifier })).json();
r = await mcp(t2.access_token);
check("initialize authentifié", r.status === 200, await r.clone().text());
r = await mcp(t2.access_token, init, { Origin: "https://claude.ai" });
check("Origin claude.ai acceptée + CORS", r.status === 200 && r.headers.get("access-control-allow-origin") === "https://claude.ai");
const call = JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "catalogue", arguments: { objet: "entreprises" } } });
const txt = await (await mcp(t2.access_token, call)).text();
check("erreur d'outil → isError:true", txt.includes('"isError":true'), txt);
const list = await (await mcp(t2.access_token, JSON.stringify({ jsonrpc: "2.0", id: 3, method: "tools/list" }))).text();
check("tools/list", list.includes("rechercher_sessions"));
const caps = await (await mcp(t2.access_token)).text();
check("listChanged non annoncé", !caps.includes('"listChanged":true'), caps);

const rt2 = await (await tok({ grant_type: "refresh_token", refresh_token: t2.refresh_token, client_id: reg.client_id })).json();
check("rafraîchissement", !!rt2.access_token && rt2.refresh_token !== t2.refresh_token, rt2);
r = await tok({ grant_type: "refresh_token", refresh_token: t2.refresh_token, client_id: reg.client_id });
check("jeton de rafraîchissement rejoué refusé", r.status === 400);
r = await mcp(rt2.access_token);
check("rejeu → famille révoquée", r.status === 401);

// Email non autorisé / domaine
({ r: rcb } = await parcours("intrus@wivoo.fr"));
check("email hors liste → 403", rcb.status === 403 && (await rcb.text()).includes("intrus@wivoo.fr"));
({ r: rcb } = await parcours("autre@wivoo.fr", "gmail.com"));
check("autre domaine Workspace → 403", rcb.status === 403);

// Email retiré de la liste après connexion
({ r: rcb } = await parcours("autre@wivoo.fr"));
const t3 = await (await tok({ grant_type: "authorization_code", code: new URL(rcb.headers.get("location")!).searchParams.get("code")!, client_id: reg.client_id, redirect_uri: RU, code_verifier: verifier })).json();
process.env.ALLOWED_EMAILS = "thibault.ambert@wivoo.fr";
check("email retiré → accès coupé immédiatement", (await mcp(t3.access_token)).status === 401);
process.env.ALLOWED_EMAILS = "autre@wivoo.fr";
process.env.MCP_RATE_LIMIT = "3";
const st: number[] = [];
for (let i = 0; i < 5; i++) st.push((await mcp(t3.access_token)).status);
check("limite de débit → 429", st.includes(429), st);
const t4 = await (await tok({ grant_type: "refresh_token", refresh_token: "x".repeat(60), client_id: reg.client_id })).json();
check("refresh falsifié refusé", t4.error === "invalid_grant", t4);
console.log(`\n${ok} réussis, ${ko} échoués`);
srv.close(); process.exit(ko ? 1 : 0);
