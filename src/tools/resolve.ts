// Retrouve les objets Dendreo à partir de ce que l'utilisateur dit (nom, numéro, id).
import type { DendreoClient, Row } from "../dendreo/client.js";
import { normalize } from "./util.js";

/** Garde les correspondances exactes si elles existent, sinon celles qui contiennent la recherche, sinon tout. */
function best(rows: Row[], label: (r: Row) => string, query: string): Row[] {
  const q = normalize(query);
  const exact = rows.filter((r) => normalize(label(r)) === q);
  if (exact.length > 0) return exact;
  const partial = rows.filter((r) => normalize(label(r)).includes(q));
  return partial.length > 0 ? partial : rows;
}

const isId = (v: string | number) => /^\d+$/.test(String(v));

export async function findModule(client: DendreoClient, formation: string | number): Promise<Row[]> {
  const fields = "id_module,intitule,numero_complet";
  if (isId(formation)) return client.list("modules.php", { id: formation, fields });
  if (/^MOD_/i.test(String(formation))) return client.list("modules.php", { numero_complet: formation, fields });
  let rows = await client.list("modules.php", { intitule: formation, fields });
  if (rows.length === 0) rows = await client.list("modules.php", { keywords: formation, fields });
  return best(rows, (r) => String(r.intitule), String(formation));
}

export async function findFormateur(client: DendreoClient, formateur: string | number): Promise<Row[]> {
  const fields = "id_formateur,nom,prenom,email_pro";
  if (isId(formateur)) return client.list("formateurs.php", { id: formateur, fields });
  const nomComplet = String(formateur);
  const target = normalize(nomComplet);
  const seen = new Map<string, Row>();
  for (const token of nomComplet.split(/\s+/).filter((t) => t.length > 1)) {
    for (const r of await client.list("formateurs.php", { nom: token, fields })) {
      seen.set(String(r.id_formateur), r);
    }
  }
  const all = [...seen.values()];
  const exact = all.filter(
    (r) => normalize(`${r.prenom} ${r.nom}`) === target || normalize(`${r.nom} ${r.prenom}`) === target,
  );
  return exact.length > 0 ? exact : all;
}

export async function findEntreprise(client: DendreoClient, entreprise: string | number): Promise<Row[]> {
  const fields = "id_entreprise,raison_sociale,numero_complet";
  if (isId(entreprise)) return client.list("entreprises.php", { id: entreprise, fields });
  if (/^ENT_/i.test(String(entreprise))) return client.list("entreprises.php", { numero_complet: entreprise, fields });
  const rows = await client.list("entreprises.php", { search: entreprise, fields });
  return best(rows, (r) => String(r.raison_sociale), String(entreprise));
}

export async function findEtape(client: DendreoClient, etape: string | number): Promise<Row[]> {
  const rows = await client.list("etapes.php");
  if (isId(etape)) return rows.filter((r) => String(r.id_etape_process) === String(etape));
  return best(rows, (r) => String(r.intitule), String(etape));
}

export async function findSalle(client: DendreoClient, salle: string | number): Promise<Row[]> {
  const fields = "id_salle_de_formation,intitule,ville";
  if (isId(salle)) return client.list("salles_de_formation.php", { id: salle, fields });
  const rows = await client.list("salles_de_formation.php", { fields });
  return best(rows, (r) => String(r.intitule), String(salle));
}

/** Une session par id (ex. 365) ou numéro complet (ex. ADF_20260048). */
export async function findSession(client: DendreoClient, session: string | number, fields?: string): Promise<Row[]> {
  return isId(session)
    ? client.list("actions_de_formation.php", { id: session, fields })
    : client.list("actions_de_formation.php", { numero_complet: session, fields });
}

/** Résout un objet unique, ou renvoie l'erreur à afficher à l'utilisateur. */
export function single(rows: Row[], quoi: string): { row: Row } | { erreur: string; candidats: Row[] } {
  if (rows.length === 1) return { row: rows[0] };
  return {
    erreur: rows.length === 0 ? `${quoi} introuvable.` : `${quoi} ambigu : préciser l'id parmi les candidats.`,
    candidats: rows.slice(0, 15),
  };
}

/** Inscriptions (laps) d'une session, avec la fiche du participant. */
export function inscriptionsSession(client: DendreoClient, idAdf: string): Promise<Row[]> {
  return client.list("laps.php", { id_action_de_formation: idAdf, include: "participant" });
}

/** Retrouve une inscription par id_lap, id_participant, email ou « prénom nom ». */
export function findInscription(laps: Row[], query: string): Row[] {
  const q = normalize(query);
  if (isId(query)) {
    return laps.filter((l) => String(l.id_lap) === query || String(l.id_participant) === query);
  }
  const p = (l: Row) => (l.participant ?? {}) as Row;
  const byEmail = laps.filter((l) => normalize(p(l).email) === q);
  if (byEmail.length > 0) return byEmail;
  const exact = laps.filter(
    (l) => normalize(`${p(l).prenom} ${p(l).nom}`) === q || normalize(`${p(l).nom} ${p(l).prenom}`) === q,
  );
  if (exact.length > 0) return exact;
  return laps.filter((l) => normalize(`${p(l).prenom} ${p(l).nom}`).includes(q));
}
