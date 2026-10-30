# MCP-Dendreo

Serveur MCP qui permet à Claude (claude.ai) d'interroger l'API de Dendreo.

## Outils

Les outils sont regroupés par thème. Pour chaque thème, la **lecture** consulte Dendreo sans rien modifier ; l'**écriture** est toujours en **simulation par défaut** (`dry_run=true`) : l'outil montre ce qu'il ferait, et rien n'est écrit tant que l'utilisateur n'a pas confirmé. Un outil qui sait lire et écrire apparaît dans les deux tableaux.

### Sessions et planning

Lecture :

| Outil | Rôle |
|---|---|
| `lister_sessions_a_venir` | Sessions qui commencent à partir d'aujourd'hui : inscrits, places, alerte sous le minimum |
| `formations_du_mois` | Sessions qui commencent dans un mois donné (mois courant par défaut) |
| `rechercher_sessions` | Recherche par formation, formateur, entreprise, type, étape, texte libre et période |
| `detail_session` | Fiche complète d'une session : modules, créneaux, formateurs, participants |
| `conflits_planning` | Formateurs ou salles réservés sur deux créneaux qui se chevauchent |
| `entreprises_session` | Entreprises rattachées à une session et leur contact référent |
| `sessions_permanentes` | Sessions permanentes (entrées et sorties permanentes) d'un module |
| `prochaines_sessions_catalogue` | Sessions visibles sur le catalogue en ligne |

Écriture :

| Outil | Rôle |
|---|---|
| `creer_session` | Crée une session pour un module, sur des jours précis, avec formateur, étape, salle, entreprise INTRA, prix, places, champs personnalisés |
| `dupliquer_session` | Recrée une session existante sur de nouvelles dates |
| `modifier_session` | Étape, intitulé, salle, places, responsable, commentaires, publication en ligne, émargement, champs personnalisés |
| `gerer_creneaux` | Ajoute, modifie ou décale des créneaux (un créneau émargé est refusé par Dendreo) |
| `entreprises_session` | Change le contact référent d'une entreprise pour la session |
| `sessions_permanentes` | Modifie prix, durée, ouverture ou garantie d'une session permanente |

`creer_session` enchaîne : `actions_de_formation.php` (avec `id_module` et `id_formateur`) → `lams.php` → alignement de `creneaux.php` sur les jours demandés (les créneaux générés par défaut hors de ces jours sont retirés) → `lcfs.php` pour staffer le formateur sur chaque créneau.

### Inscriptions

Lecture :

| Outil | Rôle |
|---|---|
| `rechercher_participant` | Participants par email, nom ou date de naissance, avec leurs formations |
| `inscription_modules` | Modules suivis par chaque participant d'une session multi-modules |
| `souhaits_formation` | Souhaits de formation par module ou participant (qui attend une session ?) |

Écriture :

| Outil | Rôle |
|---|---|
| `inscrire_participants` | Inscrit une liste de participants (créés dans le CRM s'ils n'existent pas), ignore les déjà inscrits, ajoute des non identifiés |
| `modifier_inscription` | Prix, n° de dossier CPF, suivi pédagogique, champs personnalisés d'une inscription |
| `transferer_inscription` | Déplace un participant vers une autre session |
| `annuler_inscription` | Désinscrit des participants (refusé si des présences sont saisies) |
| `inscription_modules` | Inscrit ou désinscrit un participant d'un module |
| `souhaits_formation` | Ajoute ou supprime des souhaits de formation |

### Formateurs

Lecture :

| Outil | Rôle |
|---|---|
| `planning_formateur` | Créneaux d'un formateur sur une période, avec la session concernée |
| `formateurs_disponibles` | Formateurs aptes à un module et libres aux dates voulues |

Écriture :

| Outil | Rôle |
|---|---|
| `staffer_formateur` | Ajoute un formateur à une session (tous les créneaux ou certains jours), en remplaçant éventuellement un autre |
| `retirer_formateur` | Déstaffe un formateur (certains jours ou toute la session) |

### Suivi pédagogique

Lecture :

| Outil | Rôle |
|---|---|
| `feuille_presence` | Présences/absences par participant et créneau, heures suivies, assiduité |
| `emargements_manquants` | Créneaux passés sans présence renseignée, pour une session ou une période |
| `taches_en_attente` | Émargements, signatures et questionnaires en attente sur l'extranet, avec les liens de relance |
| `evaluations_session` | Réussite par module, notes, compétences acquises |
| `satisfaction` | Synthèse des questionnaires de satisfaction par session, formateur ou formation |

Écriture :

| Outil | Rôle |
|---|---|
| `saisir_presences` | Marque présent ou absent (justifié ou non, partiel) sur des jours ou créneaux |
| `evaluer_participant` | Enregistre une évaluation de module ou de compétence |

### Catalogue

Lecture :

| Outil | Rôle |
|---|---|
| `catalogue` | Modules (durée, prix, formateurs aptes), formateurs, entreprises, salles, étapes |

### CRM et commercial

Lecture :

| Outil | Rôle |
|---|---|
| `fiche_entreprise` | Vue 360° : coordonnées, contacts, participants, formations, actions commerciales, opportunités |
| `actions_commerciales` | Échanges d'une entreprise ou d'un commercial, relances à venir |
| `opportunites` | Pipe commercial par étape ou entreprise, avec devis et sessions issues des devis |

Écriture :

| Outil | Rôle |
|---|---|
| `enregistrer_entreprise` | Crée ou met à jour une entreprise, avec détection des doublons (SIRET, raison sociale) |
| `enregistrer_contact` | Crée ou met à jour un contact d'entreprise (principal, secondaire, facturation) |
| `enregistrer_participant` | Crée ou met à jour un participant, retrouvé par id ou email |
| `convertir_en_particulier` | Convertit un participant ou une entreprise en particulier |
| `actions_commerciales` | Ajoute un compte rendu d'échange avec une date de relance |
| `opportunites` | Crée une opportunité pour une entreprise |

### Documents, fichiers et emails

Lecture :

| Outil | Rôle |
|---|---|
| `generer_document` | Génère convocation, convention, attestation… depuis un modèle Dendreo (un participant ou tous) et renvoie le fichier |
| `fichiers` | Fichiers d'une session ou d'une fiche (espace de stockage, partages) |
| `suivi_emails` | Emails envoyés par Dendreo et statut de chaque destinataire (délivré, rejeté…) |
| `checklist` | Avancement des checklists d'une session, d'un formateur ou d'un module |

Écriture :

| Outil | Rôle |
|---|---|
| `fichiers` | Dépose ou supprime des fichiers |
| `checklist` | Coche, décoche ou ajoute des points |

L'API Dendreo ne permet pas d'envoyer un email : l'envoi, la programmation et les automatismes restent dans Dendreo.

### Synthèses

Lecture :

| Outil | Rôle |
|---|---|
| `tableau_de_bord_session` | « Où en est la session ? » : remplissage, staffing, assiduité, tâches en attente, emails en échec, checklists, points d'attention |
| `relances_a_faire` | Participants à relancer sur une période (émargement, signature, questionnaire, email non délivré), avec les liens |

### Exploration

Lecture :

| Outil | Rôle |
|---|---|
| `dendreo_get` | Lecture brute de n'importe quelle ressource de l'API |

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
