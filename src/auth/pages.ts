// Pages HTML du parcours de connexion (consentement, erreurs).
import type { Client } from "./clients.js";

export const echapper = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function gabarit(titre: string, corps: string): string {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${echapper(titre)}</title><style>
:root{color-scheme:light dark;--fond:#f6f6f4;--carte:#fff;--texte:#1d1d1b;--doux:#5f5f5a;--bord:#ddddd8;--accent:#1f5fbf;--alerte:#9a3412}
@media (prefers-color-scheme:dark){:root{--fond:#161615;--carte:#20201f;--texte:#ececea;--doux:#a5a5a0;--bord:#3a3a37;--accent:#7aa7ff;--alerte:#fdba74}}
body{margin:0;background:var(--fond);color:var(--texte);font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:520px;margin:48px auto;padding:0 16px}.carte{background:var(--carte);border:1px solid var(--bord);border-radius:12px;padding:24px}
h1{font-size:1.3rem;margin:0 0 12px}p,li{color:var(--doux)}strong,code{color:var(--texte)}code{word-break:break-all;font-size:.9em}
ul{padding-left:20px}.alerte{color:var(--alerte)}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}
button,a.bouton{font:inherit;padding:10px 18px;border-radius:8px;border:1px solid var(--bord);background:transparent;color:var(--texte);cursor:pointer;text-decoration:none}
button.principal{background:var(--accent);border-color:var(--accent);color:#fff}
</style></head><body><main><div class="carte">${corps}</div></main></body></html>`;
}

export function pageConsentement(p: { client: Client; redirectUri: string; txn: string; serveur: string }): string {
  const { client, redirectUri } = p;
  const hote = new URL(redirectUri).host;
  const local = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(hote);
  const identite = client.cimd
    ? `<p>Identité de l'application publiée par le domaine <strong>${echapper(new URL(client.client_id).host)}</strong>.</p>`
    : `<p>Nom déclaré par l'application lors de son enregistrement (non vérifié) : vérifier l'adresse de retour ci-dessous.</p>`;
  return gabarit(
    "Connexion au MCP Dendreo",
    `<h1>Autoriser « ${echapper(client.client_name)} » ?</h1>
<p>Cette application demande à utiliser le serveur MCP Dendreo (<code>${echapper(p.serveur)}</code>) en votre nom.</p>
${identite}
<p>Accès demandé :</p>
<ul><li><strong>Dendreo</strong> : lecture et écriture des données de l'organisme via les outils du serveur (les écritures sont simulées tant que vous ne les confirmez pas).</li>
<li><strong>Google</strong> : votre adresse email (<code>openid email</code>), pour vérifier que vous faites partie des personnes autorisées.</li></ul>
<p>Après la connexion, l'accès sera transmis à :<br><code>${echapper(redirectUri)}</code><br>Hôte : <strong>${echapper(hote)}</strong></p>
${local ? `<p class="alerte">Attention : cette adresse pointe vers votre propre ordinateur (localhost). N'acceptez que si vous venez de lancer vous-même cette application.</p>` : ""}
<form method="post" action="/oauth/authorize"><input type="hidden" name="txn" value="${echapper(p.txn)}">
<div class="actions"><button class="principal" name="decision" value="approuver">Continuer avec Google</button>
<button name="decision" value="refuser">Refuser</button></div></form>`,
  );
}

export function pageErreur(titre: string, message: string, retour?: string): string {
  return gabarit(
    titre,
    `<h1>${echapper(titre)}</h1><p>${echapper(message)}</p>${retour ? `<div class="actions"><a class="bouton" href="${echapper(retour)}">Retourner à l'application</a></div>` : ""}`,
  );
}
