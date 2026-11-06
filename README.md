# MCP-Dendreo

Serveur MCP qui permet à Claude (claude.ai) d'interroger l'API de Dendreo.

## Outils

Le serveur expose 66 outils regroupés par thème. Pour chaque thème, la **lecture** consulte Dendreo sans rien modifier ; l'**écriture** est toujours en **simulation par défaut** (`dry_run=true`) : l'outil montre ce qu'il ferait, et rien n'est écrit tant que l'utilisateur n'a pas confirmé. Un outil qui sait lire et écrire apparaît dans les deux tableaux.

### Sessions et planning

Lecture :

| Outil | Rôle |
|---|---|
| `rechercher_sessions` | Recherche par formation, formateur, entreprise, type, étape, texte libre et période (sans période = sessions à venir ; `mois` : un mois donné ; `limite`) |
| `detail_session` | Fiche complète d'une session : modules, créneaux, formateurs, participants |
| `conflits_planning` | Formateurs ou salles réservés sur deux créneaux qui se chevauchent |
| `entreprises_session` | Entreprises rattachées à une session et leur contact référent |
| `sessions_permanentes` | Sessions permanentes (entrées et sorties permanentes) d'un module |
| `prochaines_sessions_catalogue` | Sessions visibles sur le catalogue en ligne |
| `agenda` | Vue agenda d'une période par formateur (= planning d'un formateur), salle ou entreprise : créneaux, étape, remplissage |
| `occupation_salles` | Taux d'occupation des salles sur une période |
| `preinscriptions` | Sessions qui ont reçu des pré-inscriptions du catalogue public à traiter |

Écriture :

| Outil | Rôle |
|---|---|
| `creer_session` | Crée une session pour un module, sur des jours précis, avec formateur, étape, salle, entreprise INTRA, prix, places, champs personnalisés |
| `dupliquer_session` | Recrée une session existante sur de nouvelles dates |
| `modifier_session` | Étape, intitulé, salle, places, responsable, commentaires, publication en ligne, émargement, champs personnalisés |
| `gerer_creneaux` | Ajoute, modifie ou décale des créneaux, définit la salle ou le lien visio d'un créneau (alerte si la capacité est inférieure aux inscrits) ; un créneau émargé est refusé par Dendreo |
| `entreprises_session` | Change le contact référent d'une entreprise pour la session |
| `sessions_permanentes` | Modifie prix, durée, ouverture ou garantie d'une session permanente |
| `planification_progressive` | Heures prévues et planifiées par module ; ajoute un module à une session existante ; crée une séance alternative |
| `supprimer_fiche` | Supprime une session (refusé s'il y a des inscrits, des présences ou des factures) ; voir aussi la partie CRM |

`creer_session` enchaîne : `actions_de_formation.php` (avec `id_module` et `id_formateur`) → `lams.php` → alignement de `creneaux.php` sur les jours demandés (les créneaux générés par défaut hors de ces jours sont retirés) → `lcfs.php` pour staffer le formateur sur chaque créneau.

### Inscriptions

Lecture :

| Outil | Rôle |
|---|---|
| `rechercher_participant` | Participants par email, nom ou date de naissance, avec leurs formations (les 10 plus récentes) |
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
| `formateurs_disponibles` | Formateurs aptes à un module et libres aux dates voulues |
| `suivi_rsvp` | Confirmations (Oui / Non / Peut-être) des formateurs créneau par créneau |

Écriture :

| Outil | Rôle |
|---|---|
| `staffer_formateur` | Ajoute un formateur ou une entreprise sous-traitante à une session (tous les créneaux ou certains jours), en remplaçant éventuellement un autre |
| `enregistrer_formateur` | Crée, modifie ou supprime une fiche formateur (statut, statut BPF, rémunération, n° de déclaration d'activité), avec détection des doublons |
| `staffer_formateur` (`retirer=true`) | Déstaffe un formateur (certains jours ou toute la session) |

### Suivi pédagogique

Lecture :

| Outil | Rôle |
|---|---|
| `feuille_presence` | Présences/absences par participant et créneau, heures suivies, assiduité |
| `emargements_manquants` | Créneaux passés sans présence renseignée, pour une session ou une période |
| `taches_en_attente` | Émargements, signatures et questionnaires en attente sur l'extranet, avec les liens de relance |
| `evaluations` | Réussite par module, notes, compétences acquises |
| `satisfaction` | Rapport de satisfaction par session, formateur ou formation : taux de réponse, non-répondants, moyennes par module et par formateur, détail par question, verbatims ; avec `seuil_pourcent` : appréciations négatives sur une période ; relance des non-répondants : `taches_en_attente` (types=satisfaction, autologin) |
| `emargements_manquants` (`controle=signatures`) | Créneaux passés où le formateur ou des participants n'ont pas signé |
| `controle_conformite_session` | Avant les attestations : présences manquantes, émargements non signés, participants éligibles |

Écriture :

| Outil | Rôle |
|---|---|
| `saisir_presences` | Marque présent ou absent (justifié ou non, partiel) sur des jours ou créneaux |
| `evaluations` (avec `participant`) | Enregistre une évaluation de module ou de compétence |

### Catalogue

Lecture :

| Outil | Rôle |
|---|---|
| `catalogue` | Modules (durée, prix, formateurs aptes), formateurs, entreprises, salles, étapes |
| `categories_modules` | Arborescence des catégories de modules et modules sans catégorie (invisibles au catalogue classé) |

Écriture :

| Outil | Rôle |
|---|---|
| `enregistrer_module` | Crée, modifie ou supprime un module : contenu pédagogique, durée, prix, catégorie, formateurs aptes, planning type |
| `categories_modules` | Crée ou modifie une catégorie de modules |
| `enregistrer_formateur` | Crée, modifie ou supprime une fiche formateur |
| `creer_salle` | Crée une salle interne, externe, virtuelle ou chez le client (l'API refuse la modification et la suppression) |

### CRM et commercial

Lecture :

| Outil | Rôle |
|---|---|
| `fiche_entreprise` | Vue 360° : coordonnées, contacts, participants, formations, actions commerciales, opportunités |
| `actions_commerciales` | Échanges d'une entreprise ou d'un commercial, relances à venir |
| `opportunites` | Pipe commercial par étape ou entreprise, avec devis et sessions issues des devis |
| `qualite_crm` | Doublons (SIRET, raison sociale), entreprises sans contact principal ou de facturation, participants sans email |

Écriture :

| Outil | Rôle |
|---|---|
| `enregistrer_entreprise` | Crée ou met à jour une entreprise, avec détection des doublons (SIRET, raison sociale) |
| `enregistrer_contact` | Crée ou met à jour un contact d'entreprise (principal, secondaire, facturation) |
| `enregistrer_participant` | Crée ou met à jour un participant, retrouvé par id ou email |
| `convertir_particulier` | `vers_particulier` : participant ou entreprise → particulier ; `vers_entreprise` : particulier → entreprise + contact + participant |
| `enregistrer_particulier` | Crée ou met à jour un particulier, retrouvé par id ou email |
| `importer_crm` | Import en masse d'entreprises, contacts, participants ou particuliers, avec dédoublonnage (SIRET, raison sociale, email) |
| `supprimer_fiche` | Supprime un participant, un contact, une entreprise ou une action commerciale, avec garde-fous ; `restaurer=true` restaure une entreprise |
| `actions_commerciales` | Ajoute un compte rendu d'échange avec une date de relance |
| `opportunites` | Crée une opportunité pour une entreprise |

### Documents, fichiers et emails

Lecture :

| Outil | Rôle |
|---|---|
| `generer_document` | Génère convocation, convention, attestation, facture, devis, document module × participant… depuis un modèle Dendreo et renvoie le fichier |
| `fichiers` | Fichiers d'une session ou d'une fiche (espace de stockage, partages) |
| `suivi_emails` | Emails envoyés par Dendreo et statut de chaque destinataire (délivré, rejeté…), filtres par statut, destinataire et période, pagination |
| `checklist` | Avancement des checklists d'une session, d'un formateur ou d'un module |

Écriture :

| Outil | Rôle |
|---|---|
| `fichiers` | Dépose ou supprime des fichiers (lien à une entité de la session, dépôt sans cible pour le tri par QR code, collections de partage) |
| `checklist` | Coche, décoche, ajoute, renomme ou supprime des points ; vue portefeuille des sessions INTER incomplètes |

L'API Dendreo ne permet pas d'envoyer un email : l'envoi, la programmation et les automatismes restent dans Dendreo.

### Hors de portée de l'API

Ces besoins ne sont pas réalisables par le serveur : envoi d'emails et invitations RSVP, configuration du compte (étapes, questionnaires, modèles de checklists, formulaires CRM), création et modification de financements, chiffres agrégés et télé-déclaration du BPF, réclamations, signature d'émargement, modification et suppression de salles, fusion de doublons, webhooks entrants.

### Finance et facturation

Lecture :

| Outil | Rôle |
|---|---|
| `factures` | Factures par session, entreprise, financeur ou période : montants, restant dû, échéance, statut, niveau de relance, lien PDF |
| `factures` (`vue=impayes`) | Factures échues non soldées, groupées par client ou financeur, avec le retard en jours |
| `reglements` | Règlements par facture ou période |
| `financements` | Qui finance quoi sur une session, une entreprise ou un financeur : financé, facturé, payé, participants concernés |
| `financeurs` | Recherche d'un financeur (OPCO…), ses factures et ses contacts |
| `bilan_financier_session` | CA prévu comparé au financé, au facturé et à l'encaissé ; alerte sur les sessions non facturées |
| `export_comptable` | Fichier d'export des ventes (Sage, EBP, Cegid, Quadra…) pour des factures ou un lot |

Écriture :

| Outil | Rôle |
|---|---|
| `reglements` | Saisit, modifie ou supprime un règlement (refusé s'il est déjà exporté en comptabilité) |
| `financements` | Supprime un financement (la création et la modification ne sont pas possibles via l'API) |

### Exports et indicateurs

Lecture :

| Outil | Rôle |
|---|---|
| `telecharger_export` | Télécharge n'importe quel export du menu Reporting de Dendreo sur une période (une soixantaine d'exports : activité, BPF, finance, qualité, clients) |
| `indicateurs_activite` | Sessions, stagiaires, heures-stagiaires, remplissage, CA facturé par mois, avec comparaison N / N-1 |
| `pilotage_adf` | Portefeuille de sessions par étape et type (INTER / INTRA) : inscrits, heures, financé, facturé, payé |

La liste des slugs d'export figure dans la description de `telecharger_export`.

### BPF, qualité et conformité

Lecture :

| Outil | Rôle |
|---|---|
| `controle_bpf` | Sessions exclues ou mal renseignées pour le BPF : case décochée, étape non confirmée, sans financement, présences manquantes, objectif ou spécialité vides |
| `qualite_crm` (`controle=statuts_bpf`) | Participants au statut BPF non renseigné, entreprises qui ressemblent à un financeur |
| `sous_traitance` | Intervenants extérieurs et financements de sous-traitance (cadres F-2 et G du BPF) |
| `dpc` | Modules éligibles DPC, sessions sans numéro DPC, participants sans ADELI / RPPS |

Écriture :

| Outil | Rôle |
|---|---|
| `sous_traitance` | Bascule le statut BPF d'un formateur d'une session entre intérieur et extérieur |

Les chiffres agrégés du BPF et la télé-déclaration restent dans Dendreo : les outils ne contrôlent que les données sources.

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
| `dendreo_get` | Lecture brute de n'importe quelle ressource de l'API (réponse tronquée au-delà de 12 000 caractères : passer `fields` et des filtres) |

## Économie de tokens

Les définitions des outils sont chargées dans chaque conversation et chaque réponse d'outil s'ajoute au contexte : le serveur limite les deux.

**Liste des outils** (`src/slim.ts`, appliqué à la réponse `tools/list`) :

- les consignes communes (simulation `dry_run`, format des ids et des dates) figurent une seule fois dans les instructions du serveur (`src/server.ts`), pas dans chaque outil ;
- les éléments techniques inutiles au modèle sont retirés du schéma annoncé : `$schema`, `additionalProperties: false`, `execution` par défaut, motifs des dates, `"type": "string"` à côté d'un `enum` ; les `$ref` sont remplacés par leur cible quand elle est plus courte ;
- la validation côté serveur reste complète (zod) : une valeur mal formée renvoie un message explicite, par exemple « format attendu AAAA-MM-JJ ».

**Réponses** (`src/tools/util.ts`) :

- JSON compact, sans les clés vides (`null`, `""`, dates `0000-00-00`) ;
- dates-heures raccourcies : `2026-10-01 09:30:00` → `2026-10-01 09:30`, `2026-10-01 00:00:00` → `2026-10-01` ;
- après une écriture, la réponse de Dendreo est réduite aux ids, numéro, statut, liens et erreurs ;
- les listes sont plafonnées (paramètre `limite`, 50 lignes par défaut) avec le total et un avertissement quand elles sont coupées.

## Configuration

Variables d'environnement (voir `.env.example`) :

| Variable | Rôle |
|---|---|
| `DENDREO_SLUG` | identifiant de l'instance (`https://pro.dendreo.com/<slug>/api/`) |
| `DENDREO_API_KEY` | clé API Dendreo |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | client OAuth Google (voir « Authentification ») |
| `ALLOWED_EMAILS` | emails autorisés à utiliser le connecteur, séparés par des virgules |
| `GOOGLE_WORKSPACE_DOMAIN` | optionnel : n'accepter que les comptes de ce domaine Google Workspace |
| `OAUTH_SECRET` | secret de chiffrement des jetons, 32 caractères minimum (`openssl rand -base64 48`) |
| `PUBLIC_URL` | adresse publique du serveur, ex. `https://mcp-dendreo.vercel.app` (sur Vercel, l'URL de production est utilisée si absente) |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | fortement recommandé en production : Redis Upstash (ou `KV_REST_API_URL` / `KV_REST_API_TOKEN`) |
| `MCP_RATE_LIMIT` | optionnel : requêtes MCP maximum par utilisateur et par minute (défaut 120) |
| `MCP_ALLOWED_ORIGINS` | optionnel : origines web supplémentaires autorisées sur `/api/mcp` |
| `MCP_MESURE` | optionnel : `0` désactive la mesure des réponses (voir ci-dessous) |

## Authentification

Le connecteur suit la [spécification d'autorisation MCP](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) : le serveur est à la fois la ressource protégée (`/api/mcp`) et son propre serveur d'autorisation OAuth 2.1, qui délègue l'identification à Google.

1. claude.ai appelle `/api/mcp` sans jeton : réponse `401` avec l'adresse des métadonnées (`/.well-known/oauth-protected-resource/api/mcp`).
2. claude.ai s'enregistre (`/oauth/register` ou Client ID Metadata Document) puis ouvre `/oauth/authorize` (PKCE S256 obligatoire).
3. Le serveur affiche sa propre page de consentement (nom de l'application, accès demandés, adresse de retour), puis redirige vers Google.
4. Au retour de Google (`/oauth/callback`), l'email doit être vérifié, appartenir au domaine `GOOGLE_WORKSPACE_DOMAIN` s'il est défini, **et figurer dans `ALLOWED_EMAILS`**. Sinon : page « Accès non autorisé ».
5. claude.ai échange le code (`/oauth/token`) contre un jeton d'accès d'une heure, lié au seul endpoint `/api/mcp`, et un jeton de rafraîchissement de 30 jours.

**Gérer les personnes autorisées** : modifier `ALLOWED_EMAILS` dans Vercel (Settings > Environment Variables) puis redéployer. La liste est relue à chaque requête : une personne retirée perd l'accès dès le redéploiement, même si elle était déjà connectée.

**Créer le client Google** (une fois) dans la [console Google Cloud](https://console.cloud.google.com/apis/credentials) du compte Workspace :

1. Écran de consentement OAuth : type d'utilisateur **Interne** (seuls les comptes de l'organisation peuvent se connecter), portées `openid` et `email`.
2. Identifiants > Créer > ID client OAuth > **Application Web**.
3. URI de redirection autorisée : `https://<app>.vercel.app/oauth/callback` (et `http://localhost:3000/oauth/callback` pour les tests).
4. Copier l'ID et le secret dans `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET`.

**Sécurité** :

- jetons opaques chiffrés (AES-256-GCM, clé dérivée d'`OAUTH_SECRET`), acceptés uniquement dans l'en-tête `Authorization: Bearer`, jamais dans l'URL ; la clé Dendreo n'est jamais transmise au client ;
- codes à usage unique (5 min), rotation des jetons de rafraîchissement : un code ou un jeton rejoué révoque toute la connexion ;
- page de consentement protégée (CSRF, cookies `__Host-`, `frame-ancestors 'none'`), état Google lié au navigateur et à usage unique ;
- en-tête `Origin` vérifié sur `/api/mcp` (403 si l'origine n'est pas autorisée) ;
- limitation de débit par utilisateur sur `/api/mcp` et par adresse IP sur les endpoints OAuth (réponse `429`).

Sans Redis, le serveur fonctionne mais l'usage unique, la révocation et la limitation de débit ne valent qu'au sein d'une instance Vercel : brancher Upstash Redis (Vercel > Storage) en production.

**Changer `OAUTH_SECRET`** invalide toutes les connexions et tous les enregistrements de clients : il faudra reconnecter le connecteur dans claude.ai.

## Mesure de la consommation

Chaque appel d'outil écrit une ligne dans les journaux, sans les arguments ni le contenu :

```json
{"mcp_outil":"factures","cars":5210,"tokens_estimes":1489,"ms":840}
```

Sur Vercel : projet > **Logs**, rechercher `mcp_outil`. Les outils qui reviennent souvent avec beaucoup de `tokens_estimes` sont ceux à alléger en priorité.

## Test en local

```bash
npm install
npm test   # parcours OAuth complet (Google simulé) et endpoint MCP
cp .env.example .env   # renseigner les variables, PUBLIC_URL=http://localhost:3000
set -a; . ./.env; set +a; npm run dev
npx @modelcontextprotocol/inspector   # URL : http://localhost:3000/api/mcp, puis « Open Auth Settings » > connexion OAuth
```

Le serveur local n'écoute que sur `127.0.0.1` (variable `HOST` pour changer).

## Déploiement (Vercel) et branchement à claude.ai

1. Importer le dépôt dans Vercel, renseigner les variables d'environnement et, de préférence, ajouter un stockage Upstash Redis (Storage).
2. Dans claude.ai : Paramètres > Connecteurs > Ajouter un connecteur personnalisé, URL : `https://<app>.vercel.app/api/mcp` (sans jeton).
3. Cliquer sur « Se connecter » : page de consentement du serveur, puis connexion Google avec un compte autorisé.

Les réécritures de `vercel.json` servent les métadonnées (`/.well-known/...`) et les endpoints `/oauth/*` depuis la fonction `api/oauth.ts`.
