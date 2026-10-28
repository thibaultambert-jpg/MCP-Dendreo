import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export function json(data: unknown): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}

/** Date du jour au format AAAA-MM-JJ, fuseau Europe/Paris. */
export function today(): string {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" });
}

/** Premier et dernier jour d'un mois AAAA-MM. */
export function monthBounds(month: string): { first: string; last: string } {
  const [y, m] = month.split("-").map(Number);
  const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const mm = String(m).padStart(2, "0");
  return { first: `${y}-${mm}-01`, last: `${y}-${mm}-${String(lastDay).padStart(2, "0")}` };
}

/** Comparaison insensible à la casse et aux accents. */
export function normalize(s: unknown): string {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Ajoute n jours à une date AAAA-MM-JJ. */
export function addDays(date: string, n: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Sépare « AAAA-MM-JJ HH:MM:SS » en date et heure HH:MM. */
export function splitDateTime(value: unknown): { date: string; heure: string } {
  const s = String(value ?? "");
  return { date: s.slice(0, 10), heure: s.slice(11, 16) };
}
