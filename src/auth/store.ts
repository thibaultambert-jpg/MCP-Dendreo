// Petit stockage clé-valeur à durée de vie : usage unique des codes, rotation des jetons de rafraîchissement,
// révocation, limitation de débit. Upstash Redis (API REST) si configuré, sinon mémoire du processus.
//
// En mémoire, les garanties ne valent que pour une instance : sur Vercel, plusieurs instances tournent
// en parallèle. Configurer Redis en production (voir README).

interface Store {
  /** Pose la clé si elle n'existe pas ; `false` si elle existait déjà (déjà utilisée). */
  poserSiAbsent(cle: string, ttl: number): Promise<boolean>;
  existe(cle: string): Promise<boolean>;
  /** Incrémente un compteur qui expire `ttl` secondes après sa création. */
  incrementer(cle: string, ttl: number): Promise<number>;
}

class StoreMemoire implements Store {
  private readonly m = new Map<string, { v: number; exp: number }>();
  private nettoyer() {
    if (this.m.size < 5000) return;
    const t = Date.now();
    for (const [k, e] of this.m) if (e.exp <= t) this.m.delete(k);
  }
  private lire(cle: string) {
    const e = this.m.get(cle);
    if (e && e.exp <= Date.now()) {
      this.m.delete(cle);
      return undefined;
    }
    return e;
  }
  async poserSiAbsent(cle: string, ttl: number) {
    this.nettoyer();
    if (this.lire(cle)) return false;
    this.m.set(cle, { v: 1, exp: Date.now() + ttl * 1000 });
    return true;
  }
  async existe(cle: string) {
    return !!this.lire(cle);
  }
  async incrementer(cle: string, ttl: number) {
    this.nettoyer();
    const e = this.lire(cle) ?? { v: 0, exp: Date.now() + ttl * 1000 };
    e.v += 1;
    this.m.set(cle, e);
    return e.v;
  }
}

class StoreUpstash implements Store {
  constructor(private readonly url: string, private readonly token: string) {}
  private async appel(chemin: string, corps: unknown): Promise<unknown> {
    const res = await fetch(`${this.url.replace(/\/+$/, "")}${chemin}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(corps),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`Redis : HTTP ${res.status}`);
    return res.json();
  }
  async poserSiAbsent(cle: string, ttl: number) {
    const r = (await this.appel("/", ["SET", `mcp:${cle}`, "1", "NX", "EX", String(Math.max(1, ttl))])) as { result: unknown };
    return r.result === "OK";
  }
  async existe(cle: string) {
    const r = (await this.appel("/", ["EXISTS", `mcp:${cle}`])) as { result: number };
    return r.result === 1;
  }
  async incrementer(cle: string, ttl: number) {
    const r = (await this.appel("/pipeline", [
      ["SET", `mcp:${cle}`, "0", "NX", "EX", String(Math.max(1, ttl))],
      ["INCR", `mcp:${cle}`],
    ])) as { result: unknown }[];
    return Number(r[1]?.result ?? 0);
  }
}

let instance: Store | undefined;

export function store(): Store {
  if (instance) return instance;
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (url && token) instance = new StoreUpstash(url, token);
  else {
    if (process.env.VERCEL) console.warn("mcp_auth: pas de Redis configuré, stockage en mémoire (garanties limitées à une instance)");
    instance = new StoreMemoire();
  }
  return instance;
}

/** Pour les tests : remplace le stockage. */
export function reinitialiserStore(s?: Store) {
  instance = s;
}

/** Limitation de débit par fenêtre d'une minute ; renvoie le nombre de secondes à attendre si dépassé. */
export async function limiter(seau: string, id: string, max: number): Promise<number | undefined> {
  const fenetre = Math.floor(Date.now() / 60_000);
  const n = await store().incrementer(`rl:${seau}:${id}:${fenetre}`, 70);
  return n > max ? 60 - (Math.floor(Date.now() / 1000) % 60) : undefined;
}
