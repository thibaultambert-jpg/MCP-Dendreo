// Client HTTP minimal pour l'API Dendreo.
// À confirmer avec la doc API : mode d'authentification (en-tête vs paramètre) et format de pagination.

export class DendreoError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
  }
}

export type Query = Record<string, string | number | boolean | undefined>;

export class DendreoClient {
  private readonly baseUrl: string;

  constructor(slug: string, private readonly apiKey: string) {
    this.baseUrl = `https://pro.dendreo.com/${slug}/api/`;
  }

  static fromEnv(): DendreoClient {
    const slug = process.env.DENDREO_SLUG;
    const key = process.env.DENDREO_API_KEY;
    if (!slug || !key) throw new DendreoError("DENDREO_SLUG et DENDREO_API_KEY doivent être définis");
    return new DendreoClient(slug, key);
  }

  async get(endpoint: string, query: Query = {}): Promise<unknown> {
    if (!/^[a-z0-9_]+\.php$/i.test(endpoint)) {
      throw new DendreoError(`Endpoint invalide : ${endpoint}`);
    }
    const url = new URL(endpoint, this.baseUrl);
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
    const res = await fetch(url, {
      headers: { "X-Auth-API-Key": this.apiKey, Accept: "application/json" },
    });
    const text = await res.text();
    if (!res.ok) throw new DendreoError(`Dendreo ${res.status} : ${text.slice(0, 500)}`, res.status);
    try {
      return JSON.parse(text);
    } catch {
      throw new DendreoError(`Réponse non JSON : ${text.slice(0, 200)}`);
    }
  }
}
