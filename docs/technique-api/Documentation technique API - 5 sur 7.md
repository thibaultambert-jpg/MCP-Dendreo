# Documentation technique API Dendreo (partie 5/7)

Source : https://developers.dendreo.com/ — Cette partie couvre : Réponses aux Questionnaires de Satisfaction, Entreprises liées, Intervention d'un Formateur, Intervention d'un Formateur par créneau, Programmation d'un module, Gérer les inscriptions aux modules, Gérer la présence des participants.

# Réponses aux Questionnaires de Satisfaction

## Lister les Réponses aux questionnaires

Accède à toutes les Réponses aux questionnaires de satisfaction en fonction d'un filtre.

Attention, au moins 1 filtre est obligatoire

Exemple : GET https://pro.dendreo.com/demo/api/reponses_questionnaire_satisfaction.php?id_action_de_formation=949

```json
[
{
"id_reponse_satisfaction": "146",
"date_add": "2022-12-19 14:49:40",
"date_edit": "2022-12-19 14:49:40",
"id_question_satisfaction": "4",
"intitule_question": "Qu\'avez-vous pensé de cette formation ?",
"id_lam": "1354",
"id_laf": "0",
"note": "5",
"amplitude_notation": "6",
"texte": "",
"question_liste_choix_id": "",
"subsubject_type": "",
"subsubject_id": "",
"owner_type": "Models\\Lap",
"owner_id": "4227",
"notation_normalise": "83",
"id_action_de_formation": "949",
"module": {
"id_module": "308",
"intitule": "Anglais",
"numero_complet": "MOD_2022006"
},
"participant": {
"id_participant": "2002",
"date_add": "2022-08-23 16:29:11",
"id_add": "0",
"date_edit": "2022-08-23 16:29:11",
"id_edit": "0",
"civilite": "Mme.",
"nom": "Lebreton",
"prenom": "Adrienne",
"..." :
}
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/reponses_questionnaire_satisfaction.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id ou id_reponse_satisfaction | non | ID de la réponse (séparé par des virgules) |
| id_question_satisfaction | non | Filtrer sur les l'ID du questionnaire (séparé par des virgules) |
| id_action_de_formation | non | Filtrer sur les l'ID des Actions de Formation (séparé par des virgules) |
| id_lam | non | Filtrer sur les l'ID des LAMs (séparé par des virgules) |
| id_module | non | Filtrer sur les l'ID des Modules (séparé par des virgules) |
| id_laf | non | Filtrer sur les l'ID du Staffing des Formateurs (séparé par des virgules) |
| id_formateur | non | Filtrer sur les l'ID des Formateurs (séparé par des virgules) |
| id_salle_de_formation | non | Filtrer sur les l'ID des Salles de Formation (séparé par des virgules) |

# Entreprises liées

## Lister toutes les Entreprises d'une Action De Formation

```json
[
{
"id_lae": "876",
"id_add": "0",
"date_add": "2019-10-08 14:18:52",
"id_edit": "0",
"date_edit": "2019-10-08 14:18:52",
"id_action_de_formation": "538",
"id_entreprise": "551",
"mode_financement": "entreprise",
"id_contact": "",
"entreprise": {
"id_entreprise": "551",
"numero": "6",
"numero_complet": "ENT_2019006",
"siret": "",
"raison_sociale": "Monnier",
"...":
}
},
{
"id_lae": "877",
"id_add": "0",
"date_add": "2019-10-08 14:19:15",
"id_edit": "0",
"date_edit": "2019-10-08 14:19:15",
"id_action_de_formation": "532",
"id_entreprise": "551",
"mode_financement": "entreprise",
"id_contact": "",
"entreprise": {
"id_entreprise": "551",
"numero": "6",
"numero_complet": "ENT_2019006",
"siret": "",
"raison_sociale": "Monnier",
"...":
}
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/laes.php?id_action_de_formation=532`

## Afficher un lien Action de Formation <-> Entreprise (Lae)

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/laes.php?id=877`

## Editer le Contact d'une Entreprise pour une Action De Formation

Il est possible de modifier le Contact associé à une Entreprise dans le cadre d'une Action De Formation particulière.

```json
{
"id_lae": "876",
"id_add": "0",
"date_add": "2019-10-08 14:18:52",
"id_edit": "0",
"date_edit": "2019-10-09 15:27:48",
"id_action_de_formation": "538",
"id_entreprise": "551",
"mode_financement": "entreprise",
"id_contact": "386",
"entreprise": {
"id_entreprise": "551",
"numero": "6",
"numero_complet": "ENT_2019006",
"siret": "",
"raison_sociale": "Monnier",
"...":
}
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_lae | oui | ID du lien Action de Formation <-> Entreprise |
| id_contact | oui | ID contact (existence vérifiée, même entreprise obligatoire) |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/laes.php`

# Intervention d'un Formateur

## Lister tous les Formateurs intervenants dans une Action de Formation

```json
[
{
"id_laf": "62",
"date_add": "2021-02-18 10:46:10",
"id_add": "2",
"date_edit": "2021-02-18 10:48:44",
"id_edit": "2",
"id_action_de_formation": "51",
"id_formateur": "8",
"referent": "1",
"statut": "travailleur_independant",
"statut_bpf": "interieur", //interieur, exterieur
"id_entreprise": "6",
"id_contact": "",
"participant_evaluation_mode": "",
"tva": "",
"formateur": {
"id_formateur": "8",
"date_add": "2021-02-17 15:26:06",
"id_add": "2",
"date_edit": "2022-01-20 10:26:08",
"id_edit": "0",
"id_delete": "0",
"user_id": "",
"anonyme": "0",
"numero": "4",
"numero_complet": "FORM_20210004",
"...": ""
}
},
"...": ""
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/lafs.php?id_action_de_formation=51`

Vous pouvez également inclure la liste des Budgets liés à ces interventions de Formateurs en ajoutant le paramètre `include=budgets`

## Lister toutes les interventions d'un Formateur

```json
[
{
"id_laf": "62",
"date_add": "2021-02-18 10:46:10",
"id_add": "2",
"date_edit": "2021-02-18 10:48:44",
"id_edit": "2",
"id_action_de_formation": "51",
"id_formateur": "8",
"referent": "1",
"statut": "travailleur_independant",
"statut_bpf": "interieur",
"id_entreprise": "6",
"id_contact": "",
"participant_evaluation_mode": "",
"tva": "",
"formateur": {
"id_formateur": "8",
"date_add": "2021-02-17 15:26:06",
"id_add": "2",
"date_edit": "2022-01-20 10:26:08",
"id_edit": "0",
"id_delete": "0",
"user_id": "",
"anonyme": "0",
"numero": "4",
"numero_complet": "FORM_20210004",
"...":
}
},
{
"id_laf": "64",
"date_add": "2021-03-12 15:27:36",
"id_add": "0",
"date_edit": "",
"id_edit": "0",
"id_action_de_formation": "55",
"id_formateur": "8",
"referent": "1",
"statut": "travailleur_independant",
"statut_bpf": "Personne extérieure (prestation de service, sous-traitance, honoraires)",
"id_entreprise": "6",
"id_contact": "",
"participant_evaluation_mode": "",
"tva": "20",
"formateur": {
"id_formateur": "8",
"date_add": "2021-02-17 15:26:06",
"id_add": "2",
"date_edit": "2022-01-20 10:26:08",
"id_edit": "0",
"id_delete": "0",
"user_id": "",
"anonyme": "0",
"numero": "4",
"numero_complet": "FORM_20210004",
"...":
}
},
"...":
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/lafs.php?id_formateur=8`

Vous pouvez également inclure la liste des Budgets liés à ces interventions de Formateurs en ajoutant le paramètre `include=budgets`

## Afficher le détail d'une intervention d'un Formateur

```json
{
"id_laf": "62",
"date_add": "2021-02-18 10:46:10",
"id_add": "2",
"date_edit": "2021-02-18 10:48:44",
"id_edit": "2",
"id_action_de_formation": "51",
"id_formateur": "8",
"referent": "1",
"statut": "travailleur_independant",
"statut_bpf": "interieur",
"id_entreprise": "6",
"id_contact": "",
"participant_evaluation_mode": "",
"tva": "",
"formateur": {
"id_formateur": "8",
"date_add": "2021-02-17 15:26:06",
"id_add": "2",
"date_edit": "2022-01-20 10:26:08",
"id_edit": "0",
"id_delete": "0",
"user_id": "",
"anonyme": "0",
"numero": "4",
"numero_complet": "FORM_20210004",
"...":
}
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/lafs.php?id=62`

Vous pouvez également inclure la liste des Budgets liés à ces interventions de Formateurs en ajoutant le paramètre `include=budgets`

## Créer une intervention pour un Formateur

Si la configuration `Staffer automatiquement un Formateur sur tous les Modules` est à "Oui", le Formateur sera automatiquement staffé sur tous les Créneaux de tous les Modules de l'Action de formation.

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_formateur | oui si pas id_entreprise_formateur | ID du Formateur |
| id_entreprise_formateur | oui si pas id_formateur | ID de l'entreprise sous-traitante |
| id_action_de_formation | oui | ID action de formation |
| autres | non | Tous les autres champs qui sont disponibles hormis "statut", "participant_evaluation_mode", "tva" et "id_entreprise" |
| remuneration_horaire | non | Par défaut, est appliquée sur l'ensemble de l'ADF, ou sur chacun des Lams si le champ "Rémunération de Formateurs par Module" de l'ADF est à "Oui" |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/lafs.php`

## Modifier une intervention d'un Formateur

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_laf | oui | ID du staffing de Formateur |
| autres | non | Tous les autres champs qui sont disponibles |
| remuneration_horaire | non | Par défaut, est appliquée sur l'ensemble de l'ADF, ou sur chacun des Lams si le champ "Rémunération de Formateurs par Module" de l'ADF est à "Oui" |

Attention, il n'est pas possible de modifier les champs : id_action_de_formation, id_formateur, statut, participant_evaluation_mode, tva et id_entreprise.

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/lafs.php`

## Supprimer l'intervention d'un Formateur

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_laf | oui | ID du staffing |

Attention, un staffing ne peut pas être supprimé si il y a un émargement ou une Facture associée !

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/lafs.php`

# Intervention d'un Formateur par créneau

## Lister les interventions des formateurs aux créneaux

Vous pouvez filtrer les résultats en fonction des paramètres suivants :

`id_action_de_formation`, `id_laf`, `id_creneau`, `id_formateur`, `id_module`, `id_lmf`

Il est possible d'ajouter à la réponse les informations du Formateur via le paramètre `include=formateur`.

Exemple : GET https://pro.dendreo.com/demo/api/lcfs.php?id_action_de_formation=330&include=formateur

Il est également possible d'afficher les données du Module :

Exemple : GET https://pro.dendreo.com/demo/api/lcfs.php?id_action_de_formation=330&include=module

Il est également possible d'afficher les données de l'Action de Formation :

Exemple : GET https://pro.dendreo.com/demo/api/lcfs.php?id_action_de_formation=330&include=formation

Enfin, si vous voulez encore plus de détail vous pouvez inclure les informations du créneau :

Exemple : GET https://pro.dendreo.com/demo/api/lcfs.php?id_action_de_formation=330&include=creneau

Vous pouvez aussi utiliser plusieurs paramètres conjointement : `include=formateur,module,...`

```json
[
{
"id_lcf": "971",
"date_add": "2022-06-03 16:23:40",
"id_add": "0",
"date_edit": "2022-06-10 13:24:44",
"id_edit": "0",
"id_creneau": "3386",
"id_laf": "248",
"id_lmf": "271",
"status": "1",
"nb_heures": "3.000",
"role_id": "",
"formateur_factures_id": "",
"invoiced_at": "",
"rsvp_uuid": "",
"rsvp_status": "",
"rsvp_sent_at": "",
"rsvp_notes": ""
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/lcfs.php?id_action_de_formation=330`

## Afficher l'intervention à un créneau pour un Formateur

```json
[
{
"id_lcf": "971",
"date_add": "2022-06-03 16:23:40",
"id_add": "0",
"date_edit": "2022-06-10 13:24:44",
"id_edit": "0",
"id_creneau": "3386",
"id_laf": "248",
"id_lmf": "271",
"status": "1",
"nb_heures": "3.000",
"role_id": "",
"formateur_factures_id": "",
"invoiced_at": "",
"rsvp_uuid": "",
"rsvp_status": "",
"rsvp_sent_at": "",
"rsvp_notes": ""
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/lcfs.php?id=971`

## Créer une intervention à un Créneau pour un Formateur

```json
[
{
"id_lcf": "971",
"date_add": "2022-06-03 16:23:40",
"id_add": "0",
"date_edit": "2022-06-10 13:24:44",
"id_edit": "0",
"id_creneau": "3386",
"id_laf": "248",
"id_lmf": "271",
"status": "1",
"nb_heures": "3.000",
"role_id": "",
"formateur_factures_id": "",
"invoiced_at": "",
"rsvp_uuid": "",
"rsvp_status": "",
"rsvp_sent_at": "",
"rsvp_notes": ""
}
]
```

### Paramètres

| Intitule | Obligatoire | Description |
| --- | --- | --- |
| id_creneau | oui | ID du Créneau (existence vérifiée) |
| id_laf | oui si ni id_formateur ni id_entreprise_formateur ne sont fournis | ID du lien Action de formation <-> Formateur au sein d'une Action De Formation (existence vérifiée) |
| id_formateur | oui si ni id_laf ni id_entreprise_formateur ne sont fournis | ID du Formateur (existence vérifiée). Le Formateur est staffé sur l'Action de formation si ce n'est pas déjà le cas. |
| id_entreprise_formateur | oui si ni id_laf ni id_formateur ne sont fournis | ID de l'Entreprise sous-traitante (existence vérifiée). Un Formateur anonyme pour l'entreprise sous-traitante est staffé sur l'Action de formation si ce n'est pas déjà le cas. Attention : zéro ou un seul Formateur anonyme de cette Entreprise doit être staffé, sinon il faut utiliser l'id_laf ou l'id_formateur correspondant. |
| status | non | Si mis à "1", le Lcf est staffé à 100% (nombre d'heure total du créneau). Si mis à "0", le Lcf est déstaffé (nombre d'heure = 0) |
| nb_heures | non | Est pris en compte seulement si "status" vaut "true". Défini le nombre d'heures à staffer (ne peut pas dépasser le nombre d'heures totales du Créneau) |
| date_facture | non | Déclarer un LCF comme déjà facturé |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/lcfs.php`

## Modifier une intervention à un Créneau pour un Formateur

```json
[
{
"id_lcf": "971",
"date_add": "2022-06-03 16:23:40",
"id_add": "0",
"date_edit": "2022-06-10 13:24:44",
"id_edit": "0",
"id_creneau": "3386",
"id_laf": "248",
"id_lmf": "271",
"status": "1",
"nb_heures": "3.000",
"role_id": "",
"formateur_factures_id": "",
"invoiced_at": "",
"rsvp_uuid": "",
"rsvp_status": "",
"rsvp_sent_at": "",
"rsvp_notes": "",
}
]
```

### Paramètres

| Intitule | Obligatoire | Description |
| --- | --- | --- |
| id_lcf | oui si au moins l'un des couples (id_creneau, id_laf) ou (id_creneau, id_formateur) ou (id_creneau, id_entreprise_formateur) n'est pas fourni | ID du Lcf (existence vérifiée) |
| id_creneau | oui si id_lcf n'est pas fourni | ID du lien Créneau <-> Formateur au sein d'une Action de formation (existence vérifiée) |
| id_laf | oui si id_lcf, id_formateur, id_entreprise_formateur ne sont pas fournis | ID du lien Action de formation <-> Formateur au sein d'une Action De Formation (existence vérifiée) |
| id_formateur | oui si id_lcf, id_laf, id_entreprise_formateur ne sont pas fournis | ID du Formateur (existence vérifiée). Le Formateur est staffé sur l'Action de formation si ce n'est pas déjà le cas. |
| id_entreprise_formateur | oui si id_lcf, id_laf, id_formateur ne sont pas fournis | ID de l'Entreprise sous-traitante (existence vérifiée). Un Formateur anonyme pour l'entreprise sous-traitante est staffé sur l'Action de formation si ce n'est pas déjà le cas. Attention : zéro ou un seul Formateur anonyme de cette Entreprise doit être staffé, sinon il faut utiliser l'id_laf ou l'id_formateur correspondant. |
| status | non | Si mis à "1", le Lcf est staffé à 100% (nombre d'heure total du créneau). Si mis à "0", le Lcf est déstaffé (nombre d'heure = 0) |
| nb_heures | non | Est pris en compte seulement si "status" vaut "true". Défini le nombre d'heures à staffer (ne peut pas dépasser le nombre d'heures totales du Créneau) |
| date_facture | non | Déclarer un LCF comme déjà facturé |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/lcfs.php`

# Programmation d'un module

## Afficher les programmations d'une action de formation

Sélectionnez l'Action de Formation via `id_action_de_formation`.

Exemple : GET https://pro.dendreo.com/demo/api/lams.php?id_action_de_formation=882

Vous pouvez aussi filtrer les résultats par Module :

Exemple : GET https://pro.dendreo.com/demo/api/lams.php?id_module=175

```json
[
{
"id_lam": "1195",
"date_add": "2023-04-25 16:31:24",
"id_add": "0",
"date_edit": "2023-04-26 10:53:55",
"id_edit": "0",
"id_action_de_formation": "882",
"id_module": "175",
"id_categorie_produit": "1",
"intitule": "Cours Laravel",
"date_debut": "2023-04-26 09:00:00",
"date_fin": "2023-04-27 17:00:00",
"duree": "50400",
"prix": "500.0000",
"prix_edof": "",
"prix_achat": "0.0000",
"id_shadow_lam": "0",
"dual_lam_id": "",
"quantite": "1.00",
"id_salle_de_formation": "0",
"duree_planifiee": "",
"mode_organisation": "presentiel",
"satisfaction_evaluable": "1",
"evaluation_evaluable": "1",
"duree_de_validite": "0",
"visible_on_cp_in_adf_mm": "0",
"dokeos_training_gate_id": "",
"master_lam_id": "",
"nb_participants_min": "1",
"nb_participants_max": "10",
"intitule_module": "Cours Laravel",
"description": "",
"formateurs": [
{
"id_laf": "750",
"id_lmf": "1066",
"id_formateur": "8",
"civilite": "M.",
"nom": "Banksto",
"prenom": "Arlen",
"email_pro": "arlen.bankston@lithespeed.com",
"email_perso": "",
"nb_heures": "7.000"
}
]
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/lams.php`

## Afficher une programmation

Exemple : GET https://pro.dendreo.com/demo/api/lams.php?id=1195

Le champ `id_salle_de_formation` correspond à la salle qui a été lié au Lam durant sa programmation, selon le contexte, cela peut être la Salle de l'Action de formation, la Salle par défaut du Module, ou une valeur vide. Cependant s'il y a des Créneaux sur le Lam, il est pertinent de récupérer les Salles liées à ces Créneaux, pour cela, il est possible d'ajouter le paramètre `include=lieux`.

Exemple : GET https://pro.dendreo.com/demo/api/lams.php?id=1195&include=lieux

Il est également possible d'ajouter à la réponse les informations des Participants via le paramètre `include=participants`.

Exemple : GET https://pro.dendreo.com/demo/api/lams.php?id=1195&include=participants

Il est également possible d'afficher les données du Module :

Exemple : GET https://pro.dendreo.com/demo/api/lams.php?id=1195&include=module

Des LMPs :

Exemple : GET https://pro.dendreo.com/demo/api/lams.php?id=1195&include=lmps

Ou des Créneaux :

Exemple : GET https://pro.dendreo.com/demo/api/lams.php?id=1195&include=creneaux

Vous pouvez aussi utiliser plusieurs paramètres conjointement : `include=participants,modules,...`

```json
[
{
"id_lam": "1195",
"date_add": "2023-04-25 16:31:24",
"id_add": "0",
"date_edit": "2023-04-26 10:53:55",
"id_edit": "0",
"id_action_de_formation": "882",
"id_module": "175",
"id_categorie_produit": "1",
"intitule": "Cours Laravel",
"date_debut": "2023-04-26 09:00:00",
"date_fin": "2023-04-27 17:00:00",
"duree": "50400",
"prix": "500.0000",
"prix_edof": "",
"prix_achat": "0.0000",
"id_shadow_lam": "0",
"dual_lam_id": "",
"quantite": "1.00",
"id_salle_de_formation": "0",
"duree_planifiee": "",
"mode_organisation": "presentiel",
"satisfaction_evaluable": "1",
"evaluation_evaluable": "1",
"duree_de_validite": "0",
"visible_on_cp_in_adf_mm": "0",
"dokeos_training_gate_id": "",
"master_lam_id": "",
"nb_participants_min": "1",
"nb_participants_max": "10",
"intitule_module": "Cours Laravel",
"description": "",
"formateurs": [
{
"id_laf": "750",
"id_lmf": "1066",
"id_formateur": "8",
"civilite": "M.",
"nom": "Banksto",
"prenom": "Arlen",
"email_pro": "arlen.bankston@lithespeed.com",
"email_perso": ""
}
],
"participants": [
{
"id_lap": "3911",
"id_lmp": "6246",
"id_participant": "707",
"civilite": "M.",
"nom": "Ababou",
"prenom": "Jamal",
"email": "jamalabadou@yahoo.com"
}
]
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/lams.php?id=474`

## Ajouter une programmation

```json
{
"id_lam": "197",
"id_action_de_formation": "330",
"id_module": "17",
"quantite": "0",
"prix": "0.00",
"prix_achat": "0.00",
"id_shadow_lam": "0"
}
```

### Option "Multi-Produits"

Par défaut, l'option "Multi-Produits" n'est pas activée sur Dendreo, tous les modules correspondent donc à de la formation.

Si l'option Multi-Produits est activée, et que vous souhaitez programmer un module qui n'est pas de la formation mais qui a l'option `hors_formation_dates` activée (produit ayant des dates), il faudra renseigner les paramètres `date_debut` et `date_fin`. Ces deux paramètres sont optionnels si le produit est réglé sur `hors_formation_dates` à 0.

Par ailleurs, si un produit a des dates ET si l'option `hors_formation_prix_par_jour` est désactivée (produit non configuré en tarification par jour), vous pouvez utiliser l'attribut `quantite`. Si `hors_formation_prix_par_jour` est réglé à 1 sur le produit, la quantité est automatiquement égale à la durée du produit en jours.

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_action_de_formation | oui | ID Action de Formation (existence vérifiée) |
| id_module | oui | ID Module (existence vérifiée) |
| date_debut | oui* | Date de début (format vérifié : "AAAA-MM-JJ") *Sauf en Multi-Produits, si l'option hors_formation_dates est désactivée sur le produit concerné |
| date_fin | non* | Date de fin (format vérifié : "AAAA-MM-JJ"). *Sauf en Multi-Produits, si l'option hors_formation_dates est activée sur le produit concerné. Vous pouvez également passer une date de fin pour un Module en planification progressive ou pour un Module e-learning |
| duree | non | Durée en heures. Permet de faire de la planification progressive |
| id_formateur | non | ID du Formateur à staffer (si non fourni, le Formateur par défaut du Module -s'il est défini- sera staffé. Renseignez la valeur null ou 0 pour ne pas staffer le Formateur par défaut du Module) |
| id_entreprise_formateur | non | ID de l'Entreprise sous-traitante à staffer (si non fourni, l'Entreprise sous-traitante par défaut du Module -si elle est définie- sera staffée. Renseignez la valeur null ou 0 pour ne pas staffer l'Entreprise sous-traitante par défaut du Module) |
| prix | non | Prix |
| prix_achat | non | Prix d'achat |
| quantite | non* | Quantité *Sauf si l'option hors_formation_prix_par_jour (tarification à la journée) est désactivée sur le module concerné |
| id_salle_de_formation | non | ID de la Salle. Si vide, la Salle programmée pour l'ADF sera utilisée, le cas échéant, ou alors la Salle par défaut du Module. |
| intitule | non | Intitulé surchargeant l'intitulé du Module |
| remuneration | non | Prix de rémunération du formateur par LAM (Nécessite que l'option "Rémunération des Formateurs par Module" soit active sur l'ADF et qu'un id_formateur et/ou id_entreprise_formateur soit également fourni) |
| num_unite_dpc | non | Numéro d'unité DPC : valeur modifiable si l'option "Affichage des options DPC sur les ADFs et Participants" est activé |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/lams.php`

## Ajouter une séance alternative

Permet de créer une séance alternative pour cette programmation . Sous reserve que l'option multi-séance soit activée sur votre compte et que cela concerne un Module de Formation (hors e-learning)

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_lam | oui | ID du Lam sur lequel on souhaite ajouter une séance alternative |
| create_shadow | oui | 1 ou true |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/lams.php`

## Supprimer une programmation

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/lams.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_lam | oui | ID Lam (existence vérifiée) |

# Gérer les inscriptions aux modules

Un Lmp représente le lien entre un Participant et un Module, au sein d'une Action De Formation

En d'autres termes, c'est un lien entre un Lap et un Lam

Note importante : tous les Lmp sont créés en même temps que les Laps. C'est à dire que dès qu'un Participant est ajouté à une Action de Formation (Lap), tous les Lmp relatifs aux Modules (Lam) sont créés.

- Lorsque l'Action de Formation ne comporte qu'un seul Module, le champ `status` est automatiquement réglé à 1.
- Lorsque l'Action de Formation comporte plusieurs Modules, le champ `status` est réglé en fonction de la configuration suivante sur Dendreo: `Inscrire automatiquement un Participant à tous les Modules`

## Lister les inscriptions des participants aux modules

Vous pouvez filtrer les résultats en fonction des paramètres suivants :

`id_action_de_formation`, `id_lap`, `id_lam`, `id_participant`, `id_module`

Il est possible d'ajouter à la réponse les informations du Participant via le paramètre `include=participant`.

Exemple : GET https://pro.dendreo.com/demo/api/lmps.php?id_action_de_formation=330&include=participant

Il est également possible d'afficher les données du Module :

Exemple : GET https://pro.dendreo.com/demo/api/lmps.php?id_action_de_formation=330&include=module

Si vous voulez encore plus de détail vous pouvez inclure les lcps (créneaux) :

Exemple : GET https://pro.dendreo.com/demo/api/lmps.php?id_action_de_formation=330&include=lcps

Enfin, il est également possible de consulter les évaluations des modules & des compétences associées :

Exemple : GET https://pro.dendreo.com/demo/api/lmps.php?id_action_de_formation=330&include=evaluation

Vous pouvez aussi utiliser plusieurs paramètres conjointement : `include=participant,module,...`

```json
[
{
"id_lmp": "3093",
"date_add": "2019-11-28 16:31:54",
"id_add": "0",
"date_edit": "2019-12-03 09:58:49",
"id_edit": "0",
"id_lam": "674",
"id_lap": "2356",
"status": "0",
"prix": "100.0000",
"prix_personnalise": "0",
"total_heures_presence": "0.000",
"total_heures_absence": "0.000",
"duree_de_validite": "",
"recyclage_id": "",
"custom_properties": "",
"lms_progression": "",
"lms_started_at": "",
"lms_last_access_at": "",
"lms_completed_at": "",
"duree_de_validite": "",
"lms_tempspasse": "",
"master_lmp_id": "",
"is_thinkific_conflicted": "0",
"moyenne_satisfaction": "",
"satisfaction_nb_avis": "0",
"satisfaction_nb_avis_chaud": "0",
"satisfaction_nb_avis_froid": "0",
"is_evaluated": "1",
"has_pre_auto_positionnements": "0",
"has_post_auto_positionnements": "0",
"evaluation_count": "1",
"budget": "",
"master_lmp": ""
},
{
"id_lmp": "3094",
"date_add": "2019-11-28 16:31:58",
"id_add": "0",
"date_edit": "2019-12-03 09:59:12",
"id_edit": "0",
"id_lam": "674",
"id_lap": "2357",
"status": "0",
"prix": "150.0000",
"prix_personnalise": "1",
"total_heures_presence": "4.000",
"total_heures_absence": "0.000",
"duree_de_validite": "",
"recyclage_id": "",
...
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/lmps.php?id_action_de_formation=330`

## Afficher une inscription à un module

```json
{
"id_lmp": "3093",
"date_add": "2019-11-28 16:31:54",
"id_add": "0",
"date_edit": "2019-12-03 09:58:49",
"id_edit": "0",
"id_lam": "674",
"id_lap": "2356",
"status": "0",
"prix": "100.0000",
"prix_personnalise": "0",
"total_heures_presence": "0.000",
"total_heures_absence": "0.000",
"duree_de_validite": "",
"recyclage_id": "",
...
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/lmps.php?id=3093`

## Modifier l'inscription d'un participant pour un module

```json
{
"id_lmp": "3932",
"date_add": "2022-12-02 10:52:58",
"id_add": "0",
"date_edit": "2022-12-02 10:52:59",
"id_edit": "0",
"id_lam": "1129",
"id_lap": "741",
"status": "1",
"prix": "100.0000",
"prix_personnalise": "0",
"total_heures_presence": "0.000",
"total_heures_absence": "0.000",
"recyclage_id": "44",
...
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_lmp | oui | ID du lien Participant <-> Module au sein d'une Action De Formation |
| inscription | non | 1 ou 0 |
| progression | non | Seulement pour le e-learning, progression en pourcentage |
| score | non | Seulement pour le e-learning, score (entier ou 2 decimales) |
| total_time_spent | non | Seulement pour le e-learning, temps passé en secondes |
| started_at | non | Seulement pour le e-learning, commencé le (format yyyy-mm-dd hh:mm:ss) |
| completed_at | non | Seulement pour le e-learning, complété le (format yyyy-mm-dd hh:mm:ss) |
| last_access_at | non | Seulement pour le e-learning, dernier accès le (format yyyy-mm-dd hh:mm:ss) |
| prix | non | Prix personnalisé pour ce Lmp (seulement en Inter et si l'option est activée) |
| validated | non | 1 ou 0 réussite ou non d'un Participant à un LMP |
| note | non | décimal |
| amplitude_notation | non | entier |
| appreciation | non | text |
| force_sync_lms | non | Si ce paramètre est à 1, alors en cas de Module e-learning avec synchronisation LMS, l'inscription sur la plateforme est faite immédiatement, au lieu d'être faite à la date de début de la formation. Notez que si la formation a déjà commencé, il est nécessaire de passer ce paramètre à 1 si vous souhaitez que l'inscription côté LMS soit faite automatiquement. |
| lms_no_mail | non | Si ce paramètre est à 1, alors en cas de Module e-learning avec synchronisation LMS, aucun mail n'est envoyé au Participant. |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/lmps.php`

# Gérer la présence des participants

Un LCP représente le lien entre le Créneau d'un Module de formation et un participant, au sein d'une Action De Formation

En d'autres termes, c'est un lien entre un Lap, un LMP et un Créneau

Note importante : tous les LCPs sont créés en même temps que les LAPs. C'est à dire que dès qu'un Participant est ajouté à une Action de Formation (LAP), tous les LMP relatifs aux Modules (LAM) sont créés et tous les LCP relatifs aux Créneaux de ces Modules également.

## Lister les présences des participants aux créneaux

Vous pouvez filtrer les résultats en fonction des paramètres suivants :

`id_action_de_formation`, `id_lap`, `id_creneau`, `id_participant`, `id_module`

Il est possible d'ajouter à la réponse les informations du Participant via le paramètre `include=participant`.

Exemple : GET https://pro.dendreo.com/demo/api/lcps.php?id_action_de_formation=330&include=participant

Il est également possible d'afficher les données du Module :

Exemple : GET https://pro.dendreo.com/demo/api/lcps.php?id_action_de_formation=330&include=module

Enfin, si vous voulez encore plus de détail vous pouvez inclure les informations du créneau :

Exemple : GET https://pro.dendreo.com/demo/api/lcps.php?id_action_de_formation=330&include=creneau

Vous pouvez aussi utiliser plusieurs paramètres conjointement : `include=participant,module,...`

```json
[
{
"id_lcp": "7483",
"date_add": "2012-12-18 17:33:19",
"id_add": "2",
"date_edit": "2019-02-06 17:55:39",
"id_edit": "2",
"id_creneau": "873",
"id_lmp": "1858",
"id_lap": "1607",
"presence": "1",
"total_heures_presence": "2.5",
"total_heures_absence": "0",
"justified": "0",
"justification": ""
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/lcps.php?id_action_de_formation=330`

## Afficher la présence à un créneau pour un participant

```json
{
"id_lcp": "7483",
"date_add": "2012-12-18 17:33:19",
"id_add": "2",
"date_edit": "2019-02-06 17:55:39",
"id_edit": "2",
"id_creneau": "873",
"id_lmp": "1858",
"id_lap": "1607",
"presence": "1",
"total_heures_presence": "2.5",
"total_heures_absence": "0",
"justified": "0",
"justification": ""
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/lcps.php?id=7483`

## Modifier la présence d'un participant pour un créneau

```json
{
"id_lcp":"13346",
"date_add":"2020-02-12 11:21:35",
"id_add":"0",
"date_edit":"2020-11-30 12:00:23",
"id_edit":"0",
"id_creneau":"2870",
"id_lmp":"3107",
"id_lap":"2366",
"presence":"1",
"total_heures_presence": "2.5",
"total_heures_absence": "0",
"justified":"0",
"justification":""
}
```

Pour effectuer la modification vous pouvez fournir soit :

- un id_lcp
- un id_creneau + id_lap
- un id_creneau + id_participant

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_lcp | oui si au moins l'un des couples id_creneau + id_lap ou id_creneau + id_participant n'est pas fourni | ID du lien Participant <-> Créneau au sein d'une Action De Formation |
| id_creneau | oui si id_lcp n'est pas fourni | ID du lien Créneau <-> Participant au sein d'une Action de formation (existence vérifiée) |
| id_lap | oui si id_participant n'est pas fourni | ID du lien Action de formation <-> Participant (existence vérifiée) |
| id_participant | oui si id_lap n'est pas fourni | ID du Participant (existence vérifiée) |
| presence | non | 1 ou 0 |
| duree | non | En cas de présence ou absence partielle. Durée en heures. Si non précisée, la durée complète du créneau sera prise en compte. |
| justified | non | 1 ou 0 selon si l'absence est justifiée ou non |
| justification | non | texte de justification de l'absence |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/lcps.php`

Pour indiquer un participant comme présent, renvoyer l'attribut presence à 1.

Pour indiquer une absence, renvoyer l'attribut justified à 1 pour une absence justifiée, 0 pour une absence non-justifiée.

Pour annuler l'enregistrement d'une présence/absence, refaire un appel avec l'attribut presence de la même valeur que son état actuel (1 pour présence, 0 pour absence).
