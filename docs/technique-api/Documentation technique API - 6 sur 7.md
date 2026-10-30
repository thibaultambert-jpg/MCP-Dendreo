# Documentation technique API Dendreo (partie 6/7)

Source : https://developers.dendreo.com/ — Cette partie couvre : Évaluations des Participants, Souhaits des Participants, Financeurs (externes), Financements, Factures, Règlements, Export Comptable, Mails, Checklists.

# Évaluations des Participants

Les Évaluations se font à 2 niveaux :

- au niveau de chaque Module auquel le Participant est inscrit pour une ADF ([Lmp](https://developers.dendreo.com/#gerer-les-inscriptions-aux-modules))
- au niveau des Compétences de chaque Module auquel le Participant est inscrit pour une ADF

## Lister les Évaluations des Modules

Vous pouvez filtrer les résultats en fonction des paramètres suivants :

`id`, `id_lmp`, `id_action_de_formation`, `id_participant`, `id_module`

Il est possible d'ajouter à la réponse les informations du Participant via le paramètre `include=participant`.

Exemple : GET https://pro.dendreo.com/demo/api/evaluations.php?id_action_de_formation=330&include=participant

Il est également possible d'afficher les évaluations liées aux compétences :

Exemple : GET https://pro.dendreo.com/demo/api/evaluations.php?id_action_de_formation=293&include=competences,participant

```json
[
{
"id_lmp": "1369",
"id_action_de_formation": "293",
"id_module": "15",
"id_participant": "113",
"id": "107",
"evaluation_set_id": "204",
"evaluator_type": "Models\\Formateur",
"evaluator_id": "6",
"note": "12.00",
"amplitude_notation": "20",
"appreciation": "qsdqsd",
"validated": "1",
"created_at": "2022-12-02 10:40:07",
"created_by_type": "",
"created_by_id": "",
"updated_at": "2022-12-02 10:40:19",
"updated_by_type": "Models\\SuperAdministrateur",
"updated_by_id": "18",
"deleted_at": "",
"deleted_by_type": "",
"deleted_by_id": "",
"id_evaluation": "27398",
"evaluation_name": "Evaluation 2",
"rattrapage": "",
"rattrapage_original_evaluation_set_id": ""
"competences": [
{
"id": "16",
"label": "Comp A",
"evaluation": {
"id": "61",
"evaluator_type": "Models\\Formateur",
"evaluator_id": "6",
"note": "14.00",
"amplitude_notation": "20",
"appreciation": "qsdqsd",
"status": "non-acquis",
"created_at": "2022-12-02T09:40:10.000000Z",
"created_by_type": "Models\\SuperAdministrateur",
"created_by_id": "18",
"updated_at": "2022-12-02T09:40:16.000000Z",
"updated_by_type": "Models\\SuperAdministrateur",
"updated_by_id": "18"
}
},
{
"id": "17",
"label": "Comp B",
"evaluation": {
"id": "62",
"evaluator_type": "Models\\Formateur",
"evaluator_id": "6",
"note": "",
"amplitude_notation": "20",
"appreciation": "",
"status": "en-cours",
"created_at": "2022-12-02T09:40:17.000000Z",
"created_by_type": "Models\\SuperAdministrateur",
"created_by_id": "18",
"updated_at": "2022-12-02T09:40:17.000000Z",
"updated_by_type": "Models\\SuperAdministrateur",
"updated_by_id": "18"
}
}
],
"participant": {
"id_participant": "113",
"date_add": "2021-12-24 15:16:11",
"id_add": "0",
"date_edit": "2022-12-13 09:51:17",
"id_edit": "0",
"civilite": "M.",
"nom": "Adama",
"prenom": "Lee",
"email": "lee@adama.com",
"commentaires": "",
"infos_adf": "rddfg",
"portable": "0102030405",
"fonction": "CEO",
"statut_bpf": "salarie",
"niveau_diplome": "",
"date_de_naissance": "",
"ville_naissance": "",
"departement_naissance": "",
"adresse": "",
"code_postal": "",
"ville": "",
"pays_alpha2": "",
"pays": "",
"id_entreprise": "34",
"particulier": "0",
"catalogue_entreprise": "",
"catalogue_entreprise_adresse": "",
"catalogue_entreprise_cp": "",
"catalogue_entreprise_ville": "",
"ogdpc_adeli": "",
"ogdpc_rpps": "",
"id_externe": "",
"moodle_user_id": "",
"thinkific_user_id": "",
"dokeos_user_id": "1234",
"ogdpc_id_specialite": "0",
"mode_dexercice_dominant": "",
"global_visible": "1",
"id_contact": "0",
"responsable_type": "",
"responsable_id": "",
"newsletter_optin": "0",
"message_extranet": "",
"nom_naissance": "",
"pays_naissance_alpha2": "",
"pays_naissance": "",
"num_forprev": "",
"language_code": "en"
}
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/evaluations.php?id_action_de_formation=293`

## Ajouter l'Évaluation d'un Participant sur un Module ou sur une Compétence

```json
{
"id_lmp": "3931",
"id_action_de_formation": "293",
"id_module": "25",
"id_participant": "9",
"id": "111",
"evaluator_type": "",
"evaluator_id": "",
"note": "33.00",
"amplitude_notation": "38",
"appreciation": "Appréciation",
"validated": "1",
"created_at": "2022-12-29 11:56:27",
"created_by_type": "",
"created_by_id": "",
"updated_at": "2022-12-29 11:56:27",
"updated_by_type": "",
"updated_by_id": "",
"deleted_at": "",
"deleted_by_type": "",
"deleted_by_id": ""
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_lmp | oui | ID du lien Participant <-> Module au sein d'une ADF (Lmp) |
| id_action_de_formation | oui si id_lmp n'est pas fourni | ID de l'ADF concernée par l'évaluation |
| id_module | oui si id_lmp n'est pas fourni | ID du Module à évaluer |
| id_participant | oui si id_lmp n'est pas fourni | ID du Participant à évaluer |
| id_competence | non | entier, ID de la Compétence, si renseigné, l'évaluation se fera sur la Compétence sinon, sur le Module |
| id_formateur | non | entier, ID du formateur en charge de l'ADF ayant attribué l'évaluation |
| validated | non | 0 ou 1 pour la réussite ou non d'un Participant à un Module (Lmp) |
| status | non | "non-acquis", "acquis" ou "en-cours" pour l'acquisition ou non d'une Compétence |
| note | non | entier |
| amplitude_notation | non | entier |
| appreciation | non | text |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/evaluations.php`

## Modifier l'évaluation d'un participant sur un module ou sur une compétence

```json
{
"id_lmp": "1370",
"id_action_de_formation": "293",
"id_module": "15",
"id_participant": "9",
"id": "110",
"evaluator_type": "",
"evaluator_id": "",
"note": "33.00",
"amplitude_notation": "38",
"appreciation": "Appréciation",
"validated": "1",
"created_at": "2022-12-29 10:38:11",
"created_by_type": "",
"created_by_id": "",
"updated_at": "2022-12-29 11:47:37",
"updated_by_type": "Models\\SuperAdministrateur",
"updated_by_id": "27",
"deleted_at": "",
"deleted_by_type": "",
"deleted_by_id": ""
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_lmp | oui | ID du lien Participant <-> Module au sein d'une Action De Formation |
| id_action_de_formation | oui si id_lmp n'est pas fourni | ID de l'ADF concernée par l'évaluation |
| id_module | oui si id_lmp n'est pas fourni | ID du Module à évaluer |
| id_participant | oui si id_lmp n'est pas fourni | ID du Participant à évaluer |
| id_competence | non | ID de la Compétence, si renseigné, l'évaluation se fera sur la Compétence sinon, sur le Module |
| id_formateur | non | ID du formateur en charge de l'ADF ayant attribué l'évaluation |
| validated | non | 0 ou 1 pour la réussite ou non d'un Participant à un Module (Lmp) |
| status | non | "non-acquis", "acquis" ou "en-cours" pour l'acquisition ou non d'une Compétence |
| note | non | |
| amplitude_notation | non | |
| appreciation | non | |

ATTENTION, cet endpoint d'API va prochainement évoluer. Merci de contacter le support si vous souhaitez la mettre en place !

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/evaluations.php`

# Souhaits des Participants

Un Souhait est l'expression du désir ou du besoin d'un Participant (de sa part ou de la part de son Entreprise) de réaliser un Module de Formation. Il s'agit donc d'associer des Participants à des Modules de Formation, en notant éventuellement une date d'échéance avant laquelle la formation souhaitée doit être réalisée.

## Lister les Souhaits

```json
[
{
"id": "2",
"participant_id": "1491",
"module_id": "55",
"deadline_at": "2021-04-17 23:59:59",
"created_at": "2021-03-19 14:25:48",
"wished_at": "2021-03-19 14:25:48",
"created_by_id": "2",
"created_by_type": "administrateur",
"updated_at": "2021-03-19 14:26:57",
"commentaire": "",
"lmp_ids": "",
"participant": {
"id_participant": "1491",
"nom": "Sabot",
"prenom": "Ludovic",
"adresse": "",
"code_postal": "",
"ville": "",
"portable": "",
"email": "sabot.ludovic@gmail.com",
"id_entreprise": "219",
"entreprise": {
"id_entreprise": "219",
"raison_sociale": "Bouygues Telecom"
}
},
"module": {
"id_module": "55",
"intitule": "Allemand",
"intitule_court": "",
"numero_complet": "MOD_2015007",
"id_categorie_module": "9",
"categorie": {
"id_categorie_module": "9",
"intitule": "Secourisme"
}
}
}
]
```

Vous pouvez filtrer les résultats en fonction des paramètres suivants :

| Intitulé | Description |
| --- | --- |
| id | IDs des souhaits séparés par une virgule et sans espace |
| participant_id | ID de participant |
| module_id | ID du Module |
| commentaire | Extrait du commentaire |
| deadline_before | Date (YYYY-MM-DD), souhaité avant |
| deadline_after | Date (YYYY-MM-DD), souhaité après |
| date_add_before | Date (YYYY-MM-DD), souhaits créés avant |
| date_add_after | Date (YYYY-MM-DD), souhaits créés après |
| date_edit_before | Date (YYYY-MM-DD), souhaits édités avant |
| date_edit_after | Date (YYYY-MM-DD), souhaits édités après |
| created_by_id | Obligatoire si created_by_type |
| created_by_type | {'administrateur'}, Obligatoire si created_by_id |

Il est possible d'ajouter à la réponse les informations du Module, du Participant et/ou des formations suivies exauçant le Souhait, via le paramètre `include` avec respectivement pour valeur `module`, `participant`, `formation` et/ou `module_compose`, séparée par une virgule et sans espace.

S'il y a des champs personnalisés sur les Souhaits, ainsi que sur les Modules, les Participants et les Formations, alors ceux-ci seront inclus dans la réponse.

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/souhaits.php?module_id=55&include=participant,module`

## Ajouter le Souhait d'un Participant pour un Module de formation

```json
{
"participant_id": 1723,
"module_id": 6,
"commentaire": "Aurait besoin de renforcer ses compétences en langue anglaise. Souhaite s'inscrire sur une session en 2023, à distance.",
"deadline_at": "2023-12-31"
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| participant_id | oui | ID du Participant |
| module_id | oui | ID du Module |
| commentaire | non | Texte |
| deadline_at | non | Date (YYY-MM-DD) avant laquelle le souhait devrait être exaucé |
| decompose_mc | non | true ou false pour décomposer le module en plusieurs souhaits |

Il est possible de renseigner les Champs Personnalisés qui sont configurés sur les Souhaits.

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/souhaits`

## Modifier un Souhait

```json
{
"id": "3",
"module_id": "7",
"commentaire": "Aurait besoin de renforcer ses compétences en langue allemande. Souhaite s'inscrire sur une session en 2023, à distance.",
"deadline_at": "2023-10-01"
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id | oui | ID du Souhait |
| participant_id | non | ID du Participant |
| module_id | non | ID du Module |
| commentaire | non | Texte |
| deadline_at | non | Date (YYY-MM-DD) avant laquelle le souhait devrait être exaucé |
| decompose_mc | non | true ou false pour décomposer le module en plusieurs souhaits |

Il est possible de modifier les Champs Personnalisés qui sont configurés sur les Souhaits.

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/souhaits`

## Supprimer un Souhait

```json
{
"id": "2,3"
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id | oui | IDs des souhaits séparés par une virgule et sans espace |

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/souhaits`

# Financeurs (externes)

## Lister tous les financeurs

Il est possible de filtrer les financeurs sur l'attribut `raison_sociale` en GET.

Exemple : `GET https://pro.dendreo.com/demo/api/financeurs.php?raison_sociale=anfa`

```json
[
{
"id_opca": "2",
"opca": "1",
"raison_sociale": "AGEFOS-PME PACA",
"description": "FAF des petites et moyennes entreprises",
"cible": "",
"site_internet": "http://www.agefos-pme.org",
"adresse": "146 RUE PARADIS\r\nCS 30002",
"code_postal": "13294",
"ville": "MARSEILLE CEDEX 06",
"telephone": "0488445160",
"pays_alpha2": "fr",
"pays": "France"
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/financeurs.php`

## Afficher un financeur

```json
[
{
"id_opca": "2",
"opca": "1",
"raison_sociale": "AGEFOS-PME PACA",
"description": "FAF des petites et moyennes entreprises",
"cible": "",
"site_internet": "http://www.agefos-pme.org",
"adresse": "146 RUE PARADIS\r\nCS 30002",
"code_postal": "13294",
"ville": "MARSEILLE CEDEX 06",
"telephone": "0488445160",
"pays_alpha2": "fr",
"pays": "France"
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/financeurs.php?id=1`

# Financements

## Lister toutes les Financements

Accède à tous les financements présents sur Dendreo.

Il est possible d'afficher des données supplémentaires pour les Financements en renseignant le paramètre `include`.

En ajoutant `entreprise` (Entreprise bénéficiaire du Financement = lié à id_finance), `financeur` (Financeur du Financement = lié à id_financeur), `factures` (toutes les Factures liées à ce Financement), `lfps` (LFP = Lien Financement Participant), vous pouvez obtenir directement des informations supplémentaires sur les Financements.

La paramètre `lfps` vous donnera à la fois les LFPs, les LAPs liés à ces LFPs, et les Participants liés à ces LAPs.

Exemple : GET https://pro.dendreo.com/demo/api/financements.php?include=entreprise,financeur,factures,lfps

```json
[
{
"id_financement": "790",
"id_add": "0",
"id_edit": "0",
"id_delete": "0",
"id_action_de_formation": "39",
"type": "opca",
"categorie": "",
"id_finance": "522",
"id_financeur": "1",
"montant_finance": "2000",
"id_categorie_produit": "1",
"montant_finance_hors_formation": "0",
"montant_refacture": "0",
"numero_dossier": "",
"montant_total_finance": "2000",
"montant_total_facture": "2000",
"montant_total_paye": "0"
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/financements.php`

### Paramètres

Les paramètres acceptant plusieurs IDs peuvent être passés en chaîne (`?id_action_de_formation=1,2,3`) ou en tableau (`?id_action_de_formation[]=1&id_action_de_formation[]=2&id_action_de_formation[]=3`).

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_action_de_formation | non | Filtrer sur les Financements d'une ou plusieurs Actions de Formation |
| id_facture | non | Filtrer sur les Financements liés à une ou plusieurs Factures |
| id_lap | non | Filtrer sur les Financements liés à un ou plusieurs LAPs |
| id_participant | non | Filtrer sur les Financements liés à un ou plusieurs Participants |
| id_entreprise | non | Filtrer sur les Financements financés pour une ou plusieurs Entreprises |
| id_financeur | non | Filtrer sur les Financements à destination de ce Financeur (si type est également fourni) |
| type | non, oui si id_financeur | Un type est obligatoire pour rechercher par Financeur : entreprise (Entreprise, Particulier, Sous-traitance, Financeur public client) ou financeur_externe (OPCA ou Financeur public externe) |

## Afficher un Financement

```json
{
"id_financement": "790",
"id_add": "0",
"id_edit": "0",
"id_delete": "0",
"id_action_de_formation": "39",
"type": "opca",
"categorie": "",
"id_finance": "522",
"id_financeur": "1",
"montant_finance": "2000",
"id_categorie_produit": "1",
"montant_finance_hors_formation": "0",
"montant_refacture": "0",
"numero_dossier": "",
"montant_total_finance": "2000",
"montant_total_facture": "2000",
"montant_total_paye": "0"
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/financements.php?id=790`

## Supprimer un Financement

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/financements.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_financement | oui | ID Financement (existence vérifiée) |

# Factures

## Lister toutes les Factures émises

Accède à toutes les Factures présentes sur Dendreo.

Il est possible d'afficher des données supplémentaires pour les Factures en renseignant le paramètre `include`.

En ajoutant `financements` vous pouvez obtenir tous les financements associés à cette facture, et si vous avez ajouté ce paramètre vous pouvez aussi ajouter les paramètres `entreprise` (Entreprise bénéficiaire du Financement = lié à id_finance), `financeur` (Financeur du Financement = lié à id_financeur), `lfps` (LFP = Lien Financement Participant) pour obtenir des informations additionnels sur ces Financements, `details` pour avoir les différentes lignes composant la facture.

En ajoutant `reglements` vous pouvez obtenir tous les règlements associés à cette facture.

Exemple : GET https://pro.dendreo.com/demo/api/factures.php?include=financements,entreprise,financeur,factures,lfps,details,reglements

Il est possible de filtrer les factures via le paramètre suivant :

`numero_complet` : Le numéro complet de la facture

Exemple : `GET https://pro.dendreo.com/demo/api/factures.php?numero_complet=FA_2019001`

```json
[
{
"id_facture": "19",
"date_emission": "2026-01-09 10:42:59",
"date_paiement": "0000-00-00 00:00:00",
"date_operation": "2026-01-09",
"date_perte": "",
"numero": "1",
"numero_complet": "FA_2600001",
"numero_perso": "0",
"id_entreprise": "876",
"interne": "0",
"participant_id": "0",
"id_opca": "0",
"montant_total_ht": "320.00",
"montant_total_ttc": "384.00",
"montant_total_tva": "64.00",
"montant_paiements": "0.00",
"montant_paiements_en_attente": "0.00",
"siret": "",
"num_tva_intra": "",
"raison_sociale": "EDF",
"adresse": "28 rue Bigleuil",
"code_postal": "75006",
"ville": "Paris",
"pays_alpha2": "fr",
"pays": "France",
"remarque": "",
"id_parent": "0",
"id_avoir": "0",
"id_centre_de_formation": "0",
"date_echeance": "2026-02-01 23:59:59",
"delai_jour": "30_j",
"id_doc_type": "6",
"date_envoi": "",
"id_niveau_relance": "0",
"commentaires_niveau_relance": "",
"reference_paiement": "",
"bank_account_id": "0",
"date_relance_1": "",
"date_relance_2": "",
"date_export_reglement": "",
"statut_facturation": "validated",
"date_mise_demeure": "",
"submitted_to_chorus_pro": "",
"subscription_stripe_id": "",
"niveau_detail": "global",
"instruction_paiement": null,
"pourcentage_paiement": "0",
"last_export_comptable_id": "2",
"reference_acheteur": "",
"e_invoice_provider_id": "",
"e_invoice_external_id": "",
"e_invoice_status": "",
"e_invoice_external_status": "",
"e_invoice_external_error_reason": "",
"legal_scheme": null,
"legal_identifier": null,
"peppol_scheme": null,
"peppol_identifier": null,
"factur_x_generable" : "0",
"factur_x_pdf_generation_error_messages": [
"destinataire.raison_social",
"destinataire.pays_alpha2"
],
"public_url": "https://public.dendreo.com/demo/facture/...",
"date_export_vente": "",
"categorie_operation": "Prestations de services",
}
]
```

Il est aussi possible de récupérer toutes les factures d'une Action de formation via le paramètre suivant :

`id_action_de_formation` : L'ID d'une Action de formation

Exemple : `GET https://pro.dendreo.com/demo/api/factures.php?id_action_de_formation=566`

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/factures.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| date_emission | non | Filtrer sur la date d'émission (format vérifié : "AAAA-MM-JJ") |
| date_paiement | non | Filtrer sur la date de paiement (format vérifié : "AAAA-MM-JJ") |
| id_entreprise | non | Filtrer sur les factures à destination de cette entreprise |
| id_opca | non | Filtrer sur les factures à destination de ce Financeur (opca ou financeur public) |
| emission_after | non | Filtrer sur les dates d'émission supérieures ou égales à la date indiquée (format vérifié : "AAAA-MM-JJ") |
| emission_before | non | Filtrer sur les dates d'émission inférieures ou égales à la date indiquée (format vérifié : "AAAA-MM-JJ") |
| paiement_after | non | Filtrer sur les dates de paiement supérieures ou égales à la date indiquée (format vérifié : "AAAA-MM-JJ") |
| paiement_before | non | Filtrer sur les dates de paiement inférieures ou égales à la date indiquée (format vérifié : "AAAA-MM-JJ") |

## Afficher une Facture

```json
[
{
"id_facture": "19",
"date_emission": "2026-01-09 10:42:59",
"date_paiement": "0000-00-00 00:00:00",
"date_operation": "2026-01-09",
"date_perte": "",
"numero": "1",
"numero_complet": "FA_2600001",
"numero_perso": "0",
"id_entreprise": "876",
"interne": "0",
"participant_id": "0",
"id_opca": "0",
"montant_total_ht": "320.00",
"montant_total_ttc": "384.00",
"montant_total_tva": "64.00",
"montant_paiements": "0.00",
"montant_paiements_en_attente": "0.00",
"siret": "",
"num_tva_intra": "",
"raison_sociale": "EDF",
"adresse": "28 rue Bigleuil",
"code_postal": "75006",
"ville": "Paris",
"pays_alpha2": "fr",
"pays": "France",
"remarque": "",
"id_parent": "0",
"id_avoir": "0",
"id_centre_de_formation": "0",
"date_echeance": "2026-02-01 23:59:59",
"delai_jour": "30_j",
"id_doc_type": "6",
"date_envoi": "",
"id_niveau_relance": "0",
"commentaires_niveau_relance": "",
"reference_paiement": "",
"bank_account_id": "0",
"date_relance_1": "",
"date_relance_2": "",
"date_export_reglement": "",
"statut_facturation": "validated",
"date_mise_demeure": "",
"submitted_to_chorus_pro": "",
"subscription_stripe_id": "",
"niveau_detail": "global",
"instruction_paiement": null,
"pourcentage_paiement": "0",
"last_export_comptable_id": "2",
"reference_acheteur": "",
"e_invoice_provider_id": "",
"e_invoice_external_id": "",
"e_invoice_status": "",
"e_invoice_external_status": "",
"e_invoice_external_error_reason": "",
"legal_scheme": null,
"legal_identifier": null,
"peppol_scheme": null,
"peppol_identifier": null,
"factur_x_generable" : "0",
"factur_x_pdf_generation_error_messages": [
"destinataire.raison_social",
"destinataire.pays_alpha2"
],
"public_url": "https://public.dendreo.com/demo/facture/...",
"date_export_vente": "",
"categorie_operation": "Prestations de services",
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/factures.php?id=19`

Pour télécharger la facture, utilisez le lien contenu dans la propriété 'public_url'.

Vous pouvez ajouter les paramètres suivants à cette URL :

- pdf (0 ou 1) pour avoir le fichier original ou le fichier généré en pdf
- inline=1 pour que le fichier soit affiché 'inline', au lieu d'être téléchargé. Cela signifie qu'il apparaitra directement dans le navigateur client (sous reserve que ce dernier sache afficher les pdf par exemple)

Exemple : GET https://public.dendreo.com/demo/facture/82wr61vkha?pdf=1&inline=1

# Règlements

## Lister tous les Règlements

Accède à tous les Règlements présents sur Dendreo.

Exemple : GET https://pro.dendreo.com/demo/api/reglements.php

```json
[
{
"id": "372",
"facture_id": "3",
"emetteur_type": "entreprise",
"emetteur_id": "17",
"date": "2021-05-27 00:00:00",
"method": "",
"reference": "",
"amount": "1000.0000",
"comment": "",
"account_id": "1",
"created_at": "2021-05-19 11:16:02",
"updated_at": "2021-06-15 15:48:17",
"deleted_at": "",
"extra": "",
"external_payment": "0",
"inscription_id": "",
"num_dossier_cpf": "",
"date_prevision": "",
"refund_stripe_id": "",
"date_rattachement_facture": "2025-12-10 09:04:29",
"last_export_comptable_id": "",
"exported_at": ""
}
]
```

Il est aussi possible d'inclure les informations emetteur et facture sur les règlements via l'attribut include.

Exemple : `GET https://pro.dendreo.com/demo/api/reglements.php?include=emetteur,facture`

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/reglements.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id | non | ID du règlement (peut contenir plusieurs IDs séparés par des virgules) |
| facture_id | non | Filter sur un ID de Facture |
| date_before | non | Filtrer sur les dates de règlement inférieures ou égales à la date indiquée (format vérifié : "AAAA-MM-JJ") |
| date_after | non | Filtrer sur les dates de règlement supérieures ou égales à la date indiquée (format vérifié : "AAAA-MM-JJ") |

## Afficher un Règlement

```json
[
{
"id": "372",
"facture_id": "3",
"emetteur_type": "entreprise",
"emetteur_id": "17",
"date": "2021-05-27 00:00:00",
"method": "",
"reference": "",
"amount": "1000.0000",
"comment": "",
"account_id": "1",
"created_at": "2021-05-19 11:16:02",
"updated_at": "2021-06-15 15:48:17",
"deleted_at": "",
"extra": "",
"external_payment": "0",
"inscription_id": "",
"num_dossier_cpf": "",
"date_prevision": "",
"refund_stripe_id": "",
"date_rattachement_facture": "2025-12-10 09:04:29",
"last_export_comptable_id": "",
"exported_at": ""
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/reglements.php?id=372`

## Ajouter un Règlement

```json
{
"id": "372",
"facture_id": "3",
"date": "2021-05-27 00:00:00",
"exported_at": "",
"method": "",
"reference": "",
"amount": "1000.0000",
"account_id": "1",
"emetteur_type": "entreprise",
"emetteur_id": "17",
"created_at": "2021-05-19 11:16:02",
"updated_at": "2021-06-15 15:48:17",
"deleted_at": "",
"comment": ""
}
```

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/reglements.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| facture_id | non | ID Facture (existence vérifiée) |
| date | non | Date du règlement (format vérifié : "AAAA-MM-JJ") |
| amount | oui | Montant du règlement (numeric et différent de 0) |
| reference | non | Référence du règlement |
| method | non | Moyen de règlement (virement, cheque, prelevement, cb, paypal, especes, stripe, carte_cadeau, autre, cheque_ancv, cheque_formation (Belgique uniquement), paiement_plusieurs_fois) |
| account_id | non | ID Compte bancaire (existence vérifiée) |
| comment | non | Commentaire sur le règlement |
| num_dossier_cpf | non | Numéro de dossier CPF |
| emetteur_type | non | Type d'émetteur (entreprise, participant, opca) |
| emetteur_id | non | ID de l'émetteur (requis si emetteur_type est renseigné, existence vérifiée) |
| centre_id | non | ID du Centre de Formation (existence vérifiée) |

Concernant les champs `emetteur_type` et `emetteur_id`, seuls les Règlements sans `facture_id` ou `num_dossier_cpf` renseigné peuvent les utiliser.

Si `num_dossier_cpf` est renseigné, le règlement sera automatiquement rattaché à l'OPCA CPF.

Si `facture_id` est renseigné, le règlement sera automatiquement rattaché au destinataire de la Facture.

## Modifier un Règlement

```json
{
"id": "372",
"facture_id": "3",
"date": "2021-05-27 00:00:00",
"exported_at": "",
"method": "",
"reference": "",
"amount": "1000.0000",
"account_id": "1",
"emetteur_type": "entreprise",
"emetteur_id": "17",
"created_at": "2021-05-19 11:16:02",
"updated_at": "2021-06-15 15:48:17",
"deleted_at": "",
"comment": ""
}
```

Seuls les Règlements non exportés sont modifiables.

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/reglements.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id | oui | ID Règlement (existence vérifiée) |
| facture_id | non | ID Facture (existence vérifiée) |
| date | non | Date du règlement (format : "AAAA-MM-JJ", doit être après 2000-01-01) |
| amount | oui | Montant du règlement (numeric et différent de 0) |
| reference | non | Référence du règlement |
| method | non | Moyen de règlement (virement, cheque, prelevement, cb, paypal, especes, stripe, carte_cadeau, autre, cheque_ancv, cheque_formation (Belgique uniquement), paiement_plusieurs_fois) |
| account_id | non | ID Compte bancaire (existence vérifiée) |
| comment | non | Commentaire sur le règlement |
| num_dossier_cpf | non | Numéro de dossier CPF |
| emetteur_type | non | Type d'émetteur (entreprise, participant, opca) |
| emetteur_id | non | ID de l'émetteur (requis si emetteur_type est renseigné, existence vérifiée) |
| centre_id | non | ID du Centre de Formation (existence vérifiée) |

Concernant les champs `emetteur_type` et `emetteur_id`, la mise à jour ne pourra être effectuée que sur un règlement non lié à une Facture et sans num_dossier_cpf de renseigné.

Si `num_dossier_cpf` est renseigné, le règlement sera automatiquement rattaché à l'OPCA CPF.

## Supprimer un Règlement

Seuls les Règlements non exportés sont supprimables.

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/reglements.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id | oui | ID Règlement (existence vérifiée) |

# Export Comptable

## Télécharger un export comptable Ventes

Ce lien vous permet de déclencher le téléchargement automatique d'un fichier "export comptable de ventes" au format demandé en paramètre.

### Paramètres disponibles

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| format_export | oui | Correspond au format du fichier de sortie (formats disponibles : "ebp", "ebp_v2", "ebp_v3", "ebp_aux", "ebp_aux_txt", "generique", "generique_txt", "sage_pnm", "sage_50", "sage_x3", "cegid", "cegid_txt_ana", "cegid_csv_ana", "quadra", "quadra_analytics", "winbiz", "winfic", "louty", "cador_dorac") |
| journal | oui | Correspond au type d'export comptable : "ventes" pour le journal des ventes |
| factures | non | Liste des factures à exporter. Indiquez l'ID de chaque facture séparé par une virgule. (obligatoire si id_lot est vide) |
| id_lot | non | ID du lot à exporter (obligatoire si factures est vide). |
| numero_lot | non | Numéro complet du lot à exporter (obligatoire si factures et id_lot sont vides). |

### Exemple de Requête HTTP

`GET https://pro.dendreo.com/demo/api/export_comptable.php?format_export=sage_pnm&journal=ventes&factures=614,615,616`

Les IDs des factures sont récupérables via l'API des factures.

# Mails

## Logs des mails envoyé par Dendreo

```json
[
{
"id_mail": "1",
"cible": "",
"id_entite": "0",
"id_action_de_formation": "0",
"id_mail_type": "0",
"id_add": "0",
"date_add": "0000-00-00 00:00:00",
"from_email": "nom@domaine.fr",
"domain": "dendreo.com",
"title": "Intitule",
"http_response_code": "200",
"http_error_msg": "",
"destinataires": [
{
"id": "1",
"id_mail": "1",
"email": "nom@domaine.fr",
"type_destinataire": "to",
"event": "",
"code": "0",
"error": "",
"notification": "",
"reason": "",
"description": ""
},
{
"id": "2",
"id_mail": "1",
"email": "nom@domaine.fr",
"type_destinataire": "cc",
"event": "",
"code": "0",
"error": "",
"notification": "",
"reason": "",
"description": ""
}
]
},
]
```

Affiche la liste des emails envoyés par Dendreo

Exemple : `GET https://pro.dendreo.com/demo/api/emails.php`

Un email contient les données qui lui sont propre, ainsi qu'un tableau de destinataires.

Le champ `http_response_code` d'un email, définit s'il est bien parvenu à la plateforme d'emailing.

Ses valeurs possibles sont :

- **200** : l'email est bien parvenu à la plateforme d'emailing de Dendreo (Mailgun) pour être envoyé
- **autre ou vide** : une erreur est survenue.

Le champs `destinataires` contient un tableau de destinataires.

Chaque destinataire possède un email, un type de destinataire ('to', 'cc' ou 'bcc'), ainsi que des informations de statut.

Les valeurs possibles de `event` sont :

- `delivered`
- `dropped`
- `bounced`
- `complained`
- vide : status inconnu, l'email est encore en train d'être traité par la plateforme

Un destinataire ayant correctement reçu l'email doit donc associer un `http_response_code` à `200` et un `event` à `delivered`.

En cas d'erreur, les champs `http_error_msg`, `code`, `error`, `notification`, `reason` et `description` peuvent contenir des informations de diagnostique. Le champ le plus utile et explicite est en général `reason`.

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_action_de_formation | non | ID Action de formation (existence vérifiée) |
| to_email | non | Destinataire |
| http_response_code | non | Code de réponse de l'email |
| event | non | delivered, dropped, bounced, complained |
| offset | non | Pagination (affiche 100 résultats à partir de cette valeur) |

# Checklists

## Lister les Checklists suivant un type de cible

Pour les checklists de type `action_de_formation_inter`, `action_de_formation_intra`, `action_de_formation`, `lap`, `laf`, n'affiche que celles dont l'action de formation n'a pas été supprimée.

```json
[
{
"id_checklist": "4",
"id_add": "0",
"id_edit": "0",
"type_cible": "formateur",
"id_cible": "65",
"remarque": "Exemple de remarque",
"checks_total": "2",
"checks_done": "1",
"checks": [
{
"id_check": "7",
"id_add": "0",
"id_edit": "0",
"intitule": "première étape",
"done": "0"
},
{
"id_check": "8",
"id_add": "0",
"id_edit": "0",
"intitule": "deuxième étape",
"done": "1"
}
]
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/checklists.php?cible=formateur`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| cible | oui | Afficher toutes les checklists d'un type de cible (formateur, action_de_formation_inter, action_de_formation_intra, action_de_formation (inter et intra), lap, laf, module) |
| id_cible | non | Filtrer sur une ou plusieurs cibles particulières (id_cible=44,45,47) |
| include_deleted | non | Inclut les checklists des actions de formation supprimées. |

## Afficher une Checklist

```json
[
{
"id_checklist": "4",
"id_add": "0",
"id_edit": "0",
"type_cible": "formateur",
"id_cible": "65",
"remarque": "Exemple de remarque",
"checks_total": "2",
"checks_done": "1",
"checks": [
{
"id_check": "7",
"id_add": "0",
"id_edit": "0",
"intitule": "première étape",
"done": "0"
},
{
"id_check": "8",
"id_add": "0",
"id_edit": "0",
"intitule": "deuxième étape",
"done": "1"
}
]
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/checklists.php?id=4`
