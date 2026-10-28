# MCP-Dendreo

Serveur MCP qui permet à Claude (claude.ai) d'interroger l'API de Dendreo.

## Outils

Lecture :

| Outil | Rôle |
|---|---|
| `lister_sessions_a_venir` | Sessions qui commencent à partir d'aujourd'hui : inscrits, places, alerte sous le minimum |
| `formations_du_mois` | Sessions qui commencent dans un mois donné (mois courant par défaut) |
| `rechercher_sessions` | Recherche par formation, formateur, entreprise, type, étape, texte libre et période |
| `detail_session` | Fiche complète d'une session : modules, créneaux, formateurs, participants |
| `planning_formateur` | Créneaux d'un formateur sur une période, avec la session concernée |
| `rechercher_participant` | Participants par email, nom ou date de naissance, avec leurs formations |
| `catalogue` | Modules (durée, prix, formateurs aptes), formateurs, entreprises, salles, étapes |
| `dendreo_get` | Lecture brute de n'importe quelle ressource de l'API (exploration) |

Écriture (toutes en **simulation par défaut**, `dry_run=true` : rien n'est écrit sans confirmation) :

| Outil | Rôle |
|---|---|
| `creer_session` | Crée une session pour un module, sur des jours précis, avec formateur, étape, salle, entreprise INTRA, prix, places |
| `inscrire_participants` | Inscrit une liste de participants (créés dans le CRM s'ils n'existent pas), ignore les déjà inscrits, ajoute des non identifiés |
| `staffer_formateur` | Ajoute un formateur à une session (tous les créneaux ou certains jours), en remplaçant éventuellement un autre |
| `gerer_creneaux` | Ajoute, modifie ou décale des créneaux (un créneau émargé est refusé par Dendreo) |

`creer_session` enchaîne : `actions_de_formation.php` (avec `id_module` et `id_formateur`) → `lams.php` → alignement de `creneaux.php` sur les jours demandés (les créneaux générés par défaut hors de ces jours sont retirés) → `lcfs.php` pour staffer le formateur sur chaque créneau.

## Configuration

Variables d'environnement (voir `.env.example`) :

| Variable | Rôle |
|---|---|
| `DENDREO_SLUG` | identifiant de l'instance (`https://pro.dendreo.com/<slug>/api/`) |
| `DENDREO_API_KEY` | clé API Dendreo |
| `MCP_AUTH_TOKEN` | jeton secret exigé dans l'URL du connecteur (`?token=`) ou en `Authorization: Bearer` |

## Test en local

```bash
npm install
DENDREO_SLUG=... DENDREO_API_KEY=... MCP_AUTH_TOKEN=... npm run dev
npx @modelcontextprotocol/inspector   # URL : http://localhost:3000/api/mcp?token=...
```

## Déploiement (Vercel) et branchement à claude.ai

1. Importer le dépôt dans Vercel et renseigner les trois variables d'environnement.
2. Dans claude.ai : Paramètres > Connecteurs > Ajouter un connecteur personnalisé, URL :
   `https://<app>.vercel.app/api/mcp?token=<MCP_AUTH_TOKEN>`
