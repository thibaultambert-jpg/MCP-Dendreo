// Jetons scellés (AES-256-GCM) : identifiants clients, codes, jetons d'accès et de rafraîchissement.
// Leur contenu est chiffré et authentifié : un client ne peut ni le lire ni le modifier, et
// chaque usage (« purpose ») a son propre contexte, si bien qu'un code ne peut pas servir de jeton d'accès.
import { createCipheriv, createDecipheriv, createHash, createHmac, hkdfSync, randomBytes, timingSafeEqual } from "node:crypto";

let cles: { chiffrement: Buffer; signature: Buffer } | undefined;

function cle() {
  const secret = process.env.OAUTH_SECRET ?? "";
  if (secret.length < 32) throw new Error("OAUTH_SECRET doit contenir au moins 32 caractères");
  cles ??= {
    chiffrement: Buffer.from(hkdfSync("sha256", secret, "mcp-dendreo", "seal-v1", 32)),
    signature: Buffer.from(hkdfSync("sha256", secret, "mcp-dendreo", "hmac-v1", 32)),
  };
  return cles;
}

export const b64url = (b: Buffer) => b.toString("base64url");
export const aleatoire = (octets = 32) => b64url(randomBytes(octets));
export const maintenant = () => Math.floor(Date.now() / 1000);

export type Scelle = { jti: string; exp?: number; [k: string]: unknown };

/** Scelle `data` pour l'usage `purpose`, valable `ttl` secondes (0 = sans expiration). */
export function sceller(purpose: string, data: Record<string, unknown>, ttl: number): string {
  const charge: Scelle = { ...data, jti: aleatoire(16), ...(ttl > 0 ? { exp: maintenant() + ttl } : {}) };
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", cle().chiffrement, iv);
  c.setAAD(Buffer.from(purpose));
  const ct = Buffer.concat([c.update(JSON.stringify(charge), "utf8"), c.final()]);
  return b64url(Buffer.concat([iv, ct, c.getAuthTag()]));
}

/** Ouvre un jeton scellé ; `undefined` s'il est invalide, falsifié, d'un autre usage ou expiré. */
export function ouvrir<T extends Scelle = Scelle>(purpose: string, jeton: unknown): T | undefined {
  if (typeof jeton !== "string" || jeton.length < 40 || jeton.length > 4096) return undefined;
  try {
    const brut = Buffer.from(jeton, "base64url");
    const iv = brut.subarray(0, 12);
    const tag = brut.subarray(brut.length - 16);
    const d = createDecipheriv("aes-256-gcm", cle().chiffrement, iv);
    d.setAAD(Buffer.from(purpose));
    d.setAuthTag(tag);
    const clair = Buffer.concat([d.update(brut.subarray(12, brut.length - 16)), d.final()]).toString("utf8");
    const charge = JSON.parse(clair) as T;
    if (typeof charge.exp === "number" && charge.exp < maintenant()) return undefined;
    return charge;
  } catch {
    return undefined;
  }
}

/** HMAC (secret dérivé d'OAUTH_SECRET) : secrets des clients confidentiels. */
export const hmac = (valeur: string) => b64url(createHmac("sha256", cle().signature).update(valeur).digest());

export const sha256b64url = (valeur: string) => b64url(createHash("sha256").update(valeur).digest());

export function egal(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
