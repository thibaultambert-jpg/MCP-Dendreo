# MCP-Dendreo

Serveur MCP qui permet à Claude (claude.ai) d'interroger l'API de Dendreo.

État : V1 en **lecture seule**, avec un outil générique `dendreo_get`. Les outils métier (participants, actions de formation, sessions, entreprises…) seront écrits à partir de la doc API.

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
