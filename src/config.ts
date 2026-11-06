// Configuration lue dans les variables d'environnement (voir .env.example).

/** Adresse publique du serveur, sans « / » final. Jamais déduite de l'en-tête Host (falsifiable). */
export function baseUrl(): string {
  const explicite = process.env.PUBLIC_URL?.trim();
  if (explicite) return explicite.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/** Identifiant de la ressource protégée (RFC 8707 / RFC 9728) : l'URL du endpoint MCP. */
export const resourceUrl = () => `${baseUrl()}/api/mcp`;

/** URL du document Protected Resource Metadata annoncé dans `WWW-Authenticate`. */
export const resourceMetadataUrl = () => `${baseUrl()}/.well-known/oauth-protected-resource/api/mcp`;

export const estLocal = () => /^http:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(baseUrl());

/** Liste séparée par des virgules, points-virgules ou espaces, en minuscules. */
function liste(v: string | undefined): string[] {
  return (v ?? "")
    .split(/[\s,;]+/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/** Emails autorisés à se connecter (relus à chaque appel : un email retiré perd l'accès au prochain appel). */
export const emailsAutorises = () => new Set(liste(process.env.ALLOWED_EMAILS));

/** Domaine Google Workspace exigé (claim `hd`), optionnel. */
export const domaineWorkspace = () => process.env.GOOGLE_WORKSPACE_DOMAIN?.trim().toLowerCase() || undefined;

export function emailAutorise(email: string | undefined): boolean {
  return !!email && emailsAutorises().has(email.trim().toLowerCase());
}

/** Origines web autorisées à appeler le endpoint MCP (en plus de l'origine du serveur). */
export function originesAutorisees(): Set<string> {
  const defaut = ["https://claude.ai", "https://claude.com"];
  const base = new URL(baseUrl()).origin;
  const supp = liste(process.env.MCP_ALLOWED_ORIGINS).map((o) => o.replace(/\/+$/, ""));
  return new Set([base, ...defaut, ...supp]);
}

/** Nombre maximal de requêtes MCP par utilisateur et par minute. */
export const limiteParMinute = () => {
  const n = Number(process.env.MCP_RATE_LIMIT ?? 120);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 120;
};

/** Variables obligatoires manquantes pour l'authentification. */
export function configManquante(): string[] {
  const manquantes: string[] = [];
  if (!process.env.GOOGLE_CLIENT_ID) manquantes.push("GOOGLE_CLIENT_ID");
  if (!process.env.GOOGLE_CLIENT_SECRET) manquantes.push("GOOGLE_CLIENT_SECRET");
  if ((process.env.OAUTH_SECRET ?? "").length < 32) manquantes.push("OAUTH_SECRET (32 caractères minimum)");
  if (emailsAutorises().size === 0) manquantes.push("ALLOWED_EMAILS");
  return manquantes;
}
