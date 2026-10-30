# Plan d'évolution du MCP Dendreo

> Propositions de nouvelles actions, établies à partir de la documentation technique de l'API (`docs/technique-api/`, 7 parties) et des 70 fiches fonctionnelles (`docs/Features/`), comparées aux 45 outils existants (`src/tools/*.ts`).
>
> **Statut : proposition, non exécutée.**

---

## Sommaire

1. [Constats](#1-constats)
2. [Exports et indicateurs](#2-exports-et-indicateurs)
3. [Finance et facturation](#3-finance-et-facturation)
4. [BPF, qualité et conformité](#4-bpf-qualité-et-conformité)
5. [Satisfaction, suivi et agenda](#5-satisfaction-suivi-et-agenda)
6. [Catalogue en écriture](#6-catalogue-en-écriture)
7. [CRM, imports et nettoyage](#7-crm-imports-et-nettoyage)
8. [Hors de portée de l'API](#8-hors-de-portée-de-lapi)
9. [Mise en œuvre](#9-mise-en-œuvre)
10. [Vérification](#10-vérification)

---

## 1. Constats

**Endpoints documentés jamais utilisés par le MCP**

`exports.php` · `factures.php` · `reglements.php` · `financements.php` · `financeurs.php` · `export_comptable.php` · `categories_module.php` · `categories_produit.php` · `centres_de_formation.php` · `particuliers.php`

**Écritures documentées non exploitées**

| Ressource | Opérations disponibles |
|---|---|
| `modules.php` | POST (création / modification), DELETE |
| `formateurs.php` | POST, DELETE |
| `salles_de_formation.php` | POST (création seule) |
| `actions_de_formation.php` | DELETE |
| `entreprises.php` | DELETE, restauration |
| `contacts.php` / `participants.php` | DELETE, conversion particulier → entreprise |
| `checks.php` | DELETE, renommage |
| `lams.php` | ajout d'un module à une session, séance alternative (`create_shadow`) |

**Champs ignorés aujourd'hui**

`emargement_count` (lcfs / lcps) · `rsvp_*` (lcfs) · `include=preinscriptions` · `entite_liee_*` (fichiers) · `include_in_bpf`, `statut_bpf`, champs DPC

---

## 2. Exports et indicateurs

> Le gisement le plus rentable : `exports.php` donne accès à ~60 exports Dendreo sans aucun développement côté Dendreo.

| Outil | Type | Besoin métier | API | Source doc |
|---|---|---|---|---|
| `telecharger_export` | Lecture | Récupérer n'importe quel export du menu Reporting sur une période | `exports.php` (`nom_export`, `date_debut`, `date_fin`, `type`, `delimiter`) | `presentation-des-exports.md` |
| `indicateurs_activite` | Synthèse | Stagiaires, heures-stagiaires, CA facturé / prévisionnel, remplissage, comparaison N / N-1 | exports `creneaux-participants`, `ca-facture-par-mois`, `actions-de-formation-date-fin`, `budgets-adfs` | `presentation-des-indicateurs.md` |
| `pilotage_adf` | Synthèse | Récapitulatif du portefeuille INTER / INTRA par étape : inscrits, heures, facturé, financé, payé, marge | `actions_de_formation`, `etapes`, `factures`, `financements` | `piloter-ses-actions-de-formation.md` |

**Slugs d'export recensés** (à exposer dans la description de l'outil)

| Domaine | Slugs |
|---|---|
| Activité | `actions-de-formation`, `actions-de-formation-date-fin`, `creneaux`, `creneaux-participants`, `creneaux-participants-all`, `conflits`, `events`, `occupation-salles`, `a-d-f-et-salles-par-jour` |
| Modules / participants | `modules`, `modules-adfs`, `modules-participants`, `participants-adfs`, `participants-formes`, `participants-formes-par-module`, `participants-par-module`, `participants-uniques-par-annee`, `participants-par-ajout`, `participants-avec-entreprise`, `newsletter` |
| Formateurs | `creneaux-formateurs`, `interventions-formateurs`, `modules-realises-par-les-formateurs`, `notes-de-frais` |
| BPF | `bpf-financements`, `bpf-formateurs`, `b-p-f-formations-sous-traitees`, `bpf-participants`, `bpf-participants-sous-traitance`, `bpf-participants-specialites` |
| Finance | `budgets-adfs`, `c-a-facture-par-maison-mere`, `c-a-encaisse-par-mois`, `ca-facture-par-destinataire`*, `ca-facture-par-mois`, `ca-facture-par-mois-par-adf`, `ca-facture-par-entreprise`*, `analyse-delais-paiement`*, `factures`, `facture-avec-marge`, `factures-detail`, `factures-adf`, `production-commerciaux` |
| Qualité | `checklists-adfs`, `checklists-fiches-formateurs`, `checklists-interventions-formateurs`, `competences-participants`, `evaluations`, `auto-positionnement`, `moyenne-ap-par-adf`, `quiz`, `quiz-notes-globales`, `satisfaction-formateur`, `satisf-formateur-par-participant`, `export-satisfaction-participant`, `invitations-rsvp`, `log-emails` |
| Clients | `contacts`, `entreprises-clientes`*, `entreprises-clientes-emails`, `entreprises-clients-et-formations`* |

\* slug tronqué dans la doc, à confirmer dans Dendreo (colonne « Nom de l'Export via API »).

---

## 3. Finance et facturation

| Outil | Type | Besoin métier | API |
|---|---|---|---|
| `factures` | Lecture | Factures par session, entreprise, financeur ou période ; restant dû, échéance, statut, lien PDF | `factures.php` (`include=financements,reglements`, `emission_after/before`, `public_url`) |
| `impayes` | Synthèse | Factures échues non soldées, groupées par client / financeur, avec niveau de relance | `factures.php` |
| `reglements` | Lecture + écriture | Lister, saisir, modifier ou supprimer un règlement (si non exporté) | `reglements.php` GET / POST / DELETE |
| `financements` | Lecture + suppression | Qui finance quoi sur une session (OPCO, entreprise, CPF), montants financé / facturé / payé, participants concernés | `financements.php` (`include=lfps,financeur,entreprise`) |
| `financeurs` | Lecture | Recherche d'un financeur, ses factures et ses contacts | `financeurs.php`, `factures?id_opca=`, `contacts?id_opca=` |
| `bilan_financier_session` | Synthèse | CA prévu (prix des inscriptions) vs facturé vs encaissé ; sessions non facturées | `laps`, `factures`, `financements`, `reglements` |
| `export_comptable` | Lecture | Fichier d'export ventes (Sage, EBP, Cegid, Quadra…) d'une liste de factures ou d'un lot | `export_comptable.php` |
| `generer_document` *(enrichi)* | Lecture | Générer une facture, un devis, un document module × participant | `documents.php` `m=facture`, `m=devis`, `m=adf_module_participant` |

---

## 4. BPF, qualité et conformité

| Outil | Type | Besoin métier | API | Source doc |
|---|---|---|---|---|
| `controle_bpf` | Lecture | Sessions d'un exercice exclues ou mal renseignées pour le BPF : étape non confirmée, « inclure dans le BPF » décoché, sans financement, présences manquantes, objectif / spécialité vides | `actions_de_formation`, `etapes`, `financements`, `lcps`, `modules`, `lafs` | `fonctionnement-general-du-bpf.md`, `alimenter-le-bpf-dans-dendreo.md` |
| `controle_statuts_bpf` | Lecture | Participants au statut BPF « non renseigné », entreprises qui ressemblent à un financeur (France Travail, OPCO) | `participants.statut_bpf`, `entreprises`, `financements?include=lfps` | `presentation-des-financeurs-externes.md` |
| `sous_traitance` | Lecture + écriture | Cadres F-2 / G : formateurs extérieurs, entreprise sous-traitante staffée ; bascule interne / externe sur une session | `lafs` (`statut_bpf`, `id_entreprise_formateur`), `financements.type` | `gerer-la-sous-traitance-dans-le-bpf.md` |
| `dpc` | Lecture + écriture partielle | Modules éligibles DPC, sessions sans numéro DPC, participants sans ADELI / RPPS | `modules`, `actions_de_formation.num_session_dpc`, `lams.num_unite_dpc`, `participants.ogdpc_*` | `utiliser-et-gerer-les-orientations-dpc.md` |
| `qualite_crm` | Lecture | Doublons (SIRET, raison sociale, email), entreprises sans contact principal / facturation, participants sans email | `entreprises`, `contacts`, `participants` | `presentation-des-entreprises-et-particuliers.md` |
| `controle_conformite_session` | Lecture | Avant de générer les attestations : présences manquantes, émargements non validés, étape, salles → liste des participants éligibles | `lcps`, `lcfs`, `creneaux`, `etapes`, `laps` | `restreindre-la-generation-de-documents…presence….md` |
| `validation_emargements` | Lecture | Créneaux passés où le formateur ou des participants n'ont pas signé (option de `emargements_manquants`) | `creneaux?include=lcfs,lcps`, `emargement_count` | `faire-valider-les-emargements-par-les-formateurs.md` |

Évolution liée : `staffer_formateur` accepte une entreprise sous-traitante (`id_entreprise_formateur`).

---

## 5. Satisfaction, suivi et agenda

| Outil | Type | Besoin métier | API | Source doc |
|---|---|---|---|---|
| `satisfaction` *(enrichi)* | Lecture | Rapport complet : taux de réponse, non-répondants, moyennes par module / formateur / salle, détail par question, verbatims | `reponses_questionnaire_satisfaction.php` × `laps` | `generer-un-rapport-de-satisfaction.md` |
| `appreciations_negatives` | Lecture | Notes sous un seuil et commentaires sur une période, pour le plan d'amélioration | `reponses_questionnaire_satisfaction.php` | `analyser-les-appreciations-et-reclamations.md` |
| `relancer_satisfaction` | Lecture | Non-répondants aux questionnaires à chaud / à froid avec leur lien autologin | `taches.php?types=satisfaction&autologin=1` | `recueillir-la-satisfaction-des-participants…md` |
| `suivi_rsvp` | Lecture | Confirmations des formateurs (Oui / Non / Peut-être) créneau par créneau | `lcfs.rsvp_status`, `rsvp_sent_at`, `rsvp_notes` | `envoyer-une-invitation-rsvp.md` |
| `suivi_emails` *(enrichi)* | Lecture | Emails en échec sur une période (bounced, dropped, complained), filtre destinataire, pagination | `emails.php` (`event`, `to_email`, `offset`), export `log-emails` | `suivre-l-envoi-des-emails.md` |
| `agenda` | Lecture | Vue période par formateur, salle ou entreprise : créneaux, étape, remplissage, séquence | `creneaux`, `lcfs`, `actions_de_formation` | `presentation-de-l-agenda.md` |
| `occupation_salles` | Lecture | Taux d'occupation des salles | export `occupation-salles` ou `creneaux` | `configurer-l-agenda.md` |

---

## 6. Catalogue en écriture

| Outil | Type | Besoin métier | API | Source doc |
|---|---|---|---|---|
| `enregistrer_module` | Écriture | Créer / modifier un module : contenu pédagogique, prix, catégorie, formateurs aptes, planning type ; suppression | `modules.php` POST (`import_jours`, `import_creneaux`, `import_duree`…) / DELETE | `creer-un-module.md` |
| `categories_modules` | Lecture + écriture | Arborescence des catégories, création, modules sans catégorie (invisibles au catalogue public) | `categories_module.php`, `modules.php` | `classifier-les-modules-par-categories.md` |
| `enregistrer_formateur` | Écriture | Créer / modifier une fiche formateur (statut, statut BPF, rémunération, n° DA), détection de doublons | `formateurs.php` POST / DELETE | `presentation-des-formateurs.md` |
| `creer_salle` | Écriture | Créer une salle interne, externe, virtuelle ou chez le client (l'API refuse modification et suppression) | `salles_de_formation.php` POST, `centres_de_formation.php` | `creer-une-nouvelle-salle-de-formation.md` |
| `gerer_creneaux` *(enrichi)* | Écriture | Salle ou lien visio par créneau, passage présentiel → distanciel, alerte capacité < inscrits | `creneaux.php` (`id_salle_de_formation`, `url_participants`, `url_formateurs`) | `definir-le-lieu-d-une-formation.md` |
| `planification_progressive` | Lecture + écriture | Programmer un module sans créneaux, suivre heures prévues vs planifiées ; ajouter un module à une session existante ; séance alternative | `lams.php` POST (`duree`, `create_shadow`), `lcfs.nb_heures` | `programmer-une-formation-a-planification-progressive.md` |

---

## 7. CRM, imports et nettoyage

| Outil | Type | Besoin métier | API |
|---|---|---|---|
| `importer_crm` | Écriture | Import en masse d'entreprises, contacts, participants, particuliers depuis une liste, avec les règles de dédoublonnage de Dendreo, simulation puis exécution | `entreprises`, `contacts`, `participants`, `particuliers` |
| `enregistrer_particulier` | Écriture | Créer / modifier un particulier directement | `particuliers.php` |
| `convertir_particulier_en_entreprise` | Écriture | Transformer un particulier en entreprise + contact + participant | `contacts.php` (`convert_to_entreprise_contact_participant=1`) |
| `preinscriptions` | Lecture | Sessions avec des pré-inscriptions catalogue à traiter | `actions_de_formation?include=preinscriptions` |
| `supprimer_session` | Écriture | Suppression avec garde-fous (refus si inscrits ou présences) | `actions_de_formation.php` DELETE |
| `supprimer_fiche` / `restaurer_entreprise` | Écriture | Supprimer participant, contact, entreprise ; restaurer une entreprise ; supprimer une action commerciale | DELETE `participants`, `contacts`, `entreprises`, `actions_commerciales` ; POST restauration |
| `checklist` *(enrichi)* | Écriture | Supprimer / renommer un point, vue portefeuille des sessions incomplètes | `checks.php` DELETE / POST, `checklists.php?cible=action_de_formation_inter` |
| `fichiers` *(enrichi)* | Écriture | Lier un document à une entité, dépôt sans cible pour tri automatique par QR code, nouvelles collections (lap, laf, lae, salle, module) | `fichiers.php` (`entite_liee_type`, `entite_liee_id`, `id_doc_type`) |

> Toutes les écritures restent en **simulation par défaut** (`dry_run=true`), comme les outils existants.

---

## 8. Hors de portée de l'API

Ces besoins apparaissent dans les fiches fonctionnelles mais **ne sont pas réalisables** :

- **Emails** : envoi manuel, programmé ou automatique, invitations RSVP, modèles, habillage (l'API ne fait que lire les logs).
- **Configuration du compte** : étapes (visibilité, couleurs), questionnaires de satisfaction, modèles de checklists, formulaires CRM et champs additionnels, arborescence de l'espace de stockage, QR code des documents.
- **Financements** : création ou modification (lecture et suppression uniquement).
- **BPF** : chiffres agrégés des cadres C à G et télé-déclaration (on ne peut que contrôler les données sources).
- **Qualité** : réclamations (tickets), indicateurs Qualiopi tels quels (à recalculer depuis les exports).
- **Émargement** : signature, prolongation, suppression d'une signature.
- **Salles** : modification et suppression.
- **Divers** : fusion de doublons, webhooks entrants, abonnement iCal, duplication native de module.

---

## 9. Mise en œuvre

**Ordre proposé** : Exports → Finance → BPF / qualité → Satisfaction / suivi → Catalogue → CRM / nettoyage, un commit par bloc sur la branche `claude/relaxed-curie-pmfhfe`.

**Préalable** : fusionner `origin/main` dans la branche de travail pour récupérer `docs/Features/`.

**Nouveaux fichiers**

| Fichier | Contenu |
|---|---|
| `src/tools/exports.ts` | Exports et indicateurs |
| `src/tools/finance.ts` | Factures, règlements, financements, export comptable |
| `src/tools/qualite.ts` | BPF, conformité, qualité CRM, émargements |
| `src/tools/catalogue.ts` | Modules, catégories, formateurs, salles |

Les enrichissements vont dans les fichiers existants (`suivi.ts`, `documents.ts`, `gestion.ts`, `crm.ts`, `planning.ts`), et chaque module est enregistré dans `src/server.ts`.

**Code à réutiliser**

| Élément | Emplacement |
|---|---|
| `client.list / get / post / delete / upload` | `src/dendreo/client.ts` |
| `json`, `single` | `src/tools/util.ts` |
| `findSession` et résolveurs | `src/tools/resolve.ts` |
| Motif `dry_run=true` par défaut | `src/tools/gestion.ts`, `src/tools/crm.ts` |
| Renvoi de fichier (exports, export comptable) | `generer_document` dans `src/tools/documents.ts` |

**Documentation** : mise à jour du `README.md` (nouvelles sections Finance, Exports, BPF / qualité ; tableaux Catalogue, CRM, Sessions complétés).

---

## 10. Vérification

1. `npm run build` sans erreur après chaque bloc.
2. `npm run dev` puis `npx @modelcontextprotocol/inspector` sur `http://localhost:3000/api/mcp?token=…`.
3. Appel de chaque outil de lecture sur l'instance réelle.
4. Écritures testées **uniquement en `dry_run=true`**, contrôle du récapitulatif renvoyé.
5. Vérification des 5 slugs d'export tronqués dans la doc.
