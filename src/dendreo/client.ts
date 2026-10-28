// Client HTTP minimal pour l'API Dendreo (https://developers.dendreo.com).
// Authentification par en-tête `Authorization: Token token="..."` (équivalent du paramètre `?key=`),
// ce qui évite que la clé apparaisse dans les URL et les logs.

export class DendreoError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
  }
}

export type Query = Record<string, string | number | boolean | undefined>;
export type Row = Record<string, unknown>;

const ENDPOINT = /^[a-z0-9_]+\.php$/i;

export class DendreoClient {
  private readonly baseUrl: string;

  constructor(slug: string, private readonly apiKey: string, baseUrl?: string) {
    this.baseUrl = baseUrl ?? `https://pro.dendreo.com/${slug}/api/`;
  }

  static fromEnv(): DendreoClient {
    const slug = process.env.DENDREO_SLUG;
    const key = process.env.DENDREO_API_KEY;
    if (!slug || !key) throw new DendreoError("DENDREO_SLUG et DENDREO_API_KEY doivent être définis");
    return new DendreoClient(slug, key, process.env.DENDREO_BASE_URL);
  }

  get(endpoint: string, query: Query = {}): Promise<unknown> {
    return this.request("GET", endpoint, query);
  }

  /** GET qui renvoie toujours un tableau (Dendreo renvoie un objet pour un id unique). */
  async list(endpoint: string, query: Query = {}): Promise<Row[]> {
    const data = await this.get(endpoint, query);
    if (Array.isArray(data)) return data as Row[];
    return data && typeof data === "object" ? [data as Row] : [];
  }

  post(endpoint: string, body: Row): Promise<unknown> {
    return this.request("POST", endpoint, {}, body);
  }

  delete(endpoint: string, query: Query): Promise<unknown> {
    return this.request("DELETE", endpoint, query);
  }

  private async request(method: string, endpoint: string, query: Query, body?: Row): Promise<unknown> {
    if (!ENDPOINT.test(endpoint)) throw new DendreoError(`Endpoint invalide : ${endpoint}`);
    const url = new URL(endpoint, this.baseUrl);
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
    const headers: Record<string, string> = {
      Authorization: `Token token="${this.apiKey}"`,
      Accept: "application/json",
    };
    if (body) headers["Content-Type"] = "application/json";
    const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
    const text = await res.text();
    if (!res.ok) {
      throw new DendreoError(`Dendreo ${method} ${endpoint} → ${res.status} : ${text.slice(0, 500)}`, res.status);
    }
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      throw new DendreoError(`Réponse non JSON de ${endpoint} : ${text.slice(0, 200)}`);
    }
  }
}
