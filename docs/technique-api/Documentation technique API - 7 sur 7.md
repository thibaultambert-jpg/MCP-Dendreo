# Documentation technique API Dendreo (partie 7/7)

Source : https://developers.dendreo.com/ — Cette partie couvre : Checks, Administrateurs, Actions Commerciales, Convertir vers Particulier, Fichiers, Génération de Documents, Catalogue en ligne - Prochaines sessions, Opportunités, Etapes d'opportunité, Sources, Exports, Webhooks.

# Checks

## Modifier un check existant

```json
{
"id_check": "7",
"id_add": "0",
"id_edit": "0",
"id_checklist": "4",
"intitule": "première étape",
"done": "1"
}
```

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/checks.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_check | oui | L'id du check à modifier |
| intitule | non | L'intitule du check |
| done | non | Le status du check (0,1) |

## Créer un check pour une checklist existante

```json
{
"id_check": "8",
"id_add": "0",
"id_edit": "0",
"id_checklist": "4",
"intitule": "seconde étape",
"done": "0"
}
```

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/checks.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_checklist | oui | L'id de la checklist |
| intitule | oui | L'intitule du check |
| done | non | Le status du check (0,1) |

## Supprimer un check

```json
{
"status": "success",
"deleted": ["7", "8"]
}
```

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/checks.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_check | oui | L'id du check à supprimer, ou plusieurs ids séparés par des virgules : 7,8 |

La suppression est définitive : un check supprimé n'est pas récupérable depuis Dendreo. L'opération est donc tout ou rien — si l'un des ids envoyés n'est pas un entier, ou ne correspond à aucun check, aucune suppression n'est effectuée et la réponse liste les ids en cause.

Le paramètre `fields` n'a pas d'effet sur cette réponse, qui n'est pas une fiche mais un statut d'opération.

Les compteurs de la checklist (`checks_total` et `checks_done`) sont recalculés automatiquement.

Attention, supprimer un check ne le retire pas du modèle de checklist configuré dans Dendreo : s'il provient d'un modèle, il réapparaîtra à la prochaine application ou réinitialisation de ce modèle depuis Dendreo.

# Administrateurs

## Lister tous les administrateurs

```json
[
{
"id_administrateur": "1",
"id_add": "0",
"id_edit": "0",
"id_delete": "1",
"nom": "DUPONT",
"prenom": "Mathieu",
"email": "dupont@dendreo.com",
"login": "mdupont",
"date_derniere_connexion": "2017-06-26 14:33:21",
"niveau": "40",
"fonction": "",
"telephone": "",
"use_email": "0",
"use_signature": "0",
"photo": "https://public.dendreo.com/njsx266nmvpw4ylnnfxg4/media/l27tk4k5j8sc9qlfgffA9wstjvth24cr4j7ts9txl3zf1zkp3fyg4pj8",
"nom_complet": "Mathieu DUPONT"
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/administrateurs.php`

Il est possible de récupérer l'url de la `photo` de profil des administrateurs dans la réponse, en rajoutant `include=photo` à votre requête.

Exemple : `GET https://pro.dendreo.com/demo/api/administrateurs.php?include=photo`

## Afficher un administrateur

```json
[
{
"id_administrateur": "1",
"id_add": "0",
"id_edit": "0",
"id_delete": "1",
"nom": "DUPONT",
"prenom": "Mathieu",
"email": "dupont@dendreo.com",
"login": "mdupont",
"date_derniere_connexion": "2017-06-26 14:33:21",
"niveau": "40",
"fonction": "",
"telephone": "",
"use_email": "0",
"use_signature": "0",
"photo": "https://public.dendreo.com/njsx266nmvpw4ylnnfxg4/media/l27tk4k5j8sc9qlfgffA9wstjvth24cr4j7ts9txl3zf1zkp3fyg4pj8",
"nom_complet": "Mathieu DUPONT"
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/administrateurs.php?id=1`

Il est possible de récupérer l'url de la `photo` de profil de l'administrateur dans la réponse, en rajoutant `include=photo` à votre requête.

Exemple : `GET https://pro.dendreo.com/demo/api/administrateurs.php?id=1&include=photo`

# Actions Commerciales

## Lister toutes les actions commerciales

```json
[
{
"id_action_commerciale": "105",
"date_add": "2022-04-19 10:53:00",
"id_add": "0",
"date_edit": "2022-04-27 10:17:04",
"id_edit": "0",
"date_action": "2022-04-19 00:00:00",
"id_categorie_ac": "1",
"compte_rendu": "...",
"date_relance": "2022-04-13 00:00:00",
"priorite": "1",
"devis_id": "",
"id_entreprise": "37",
"parent_id": "",
"commerciaux": [
{
"id_administrateur": "2",
"nom": "Ruiz",
"prenom": "Jose",
"nom_complet": "Jose Ruiz"
}
],
"interlocuteurs": [
{
"id_entreprise": "37",
"date_add": "2022-01-31 08:37:33",
"id_add": "0",
"date_edit": "2022-09-01 10:42:07",
"id_edit": "0",
"entreprise_id": "0",
"numero": "2",
"numero_complet": "ENT_2200002",
...
}
]
},
...
]
```

Il est possible de filtrer les actions commerciales via les paramètres suivant :

- `id_entreprise` : les actions commerciales liées à l'entreprise sélectionnée. Exemple : `GET https://pro.dendreo.com/demo/api/actions_commerciales.php?id_entreprise=3`
- `id_categorie_ac` : les actions commerciales de la catégorie sélectionnée. Exemple : `GET https://pro.dendreo.com/demo/api/actions_commerciales.php?id_categorie_ac=1`
- `commercial_id` : les actions commerciales rattachée à l'administrateur sélectionné. Exemple : `GET https://pro.dendreo.com/demo/api/actions_commerciales.php?commercial_id=19`
- `relance` : les actions commerciales qui ont une relance à venir (dans ce cas, les actions commerciales seront triées par date de relance les plus anciennes). Exemple : `GET https://pro.dendreo.com/demo/api/actions_commerciales.php?relance=1`

### Attention, les actions commerciales sont triées par date la plus récente, et retournées par série de 100. Vous devez utiliser le paramètre 'offset' pour récupérer les précédentes actions commerciales

Exemple : `GET https://pro.dendreo.com/demo/api/actions_commerciales.php?offset=500`

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/actions_commerciales.php`

## Afficher une action commerciale

```json
{
"id_action_commerciale": "105",
"date_add": "2022-04-19 10:53:00",
"id_add": "0",
"date_edit": "2022-04-27 10:17:04",
"id_edit": "0",
"date_action": "2022-04-19 00:00:00",
"id_categorie_ac": "1",
"intitule_categorie_ac": "Relance simple",
"compte_rendu": "...",
"date_relance": "2022-04-13 00:00:00",
"priorite": "1",
"devis_id": "",
"id_entreprise": "37",
"parent_id": "",
"commerciaux": [
{
"id_administrateur": "2",
"nom": "Ruiz",
"prenom": "Jose",
"nom_complet": "Jose Ruiz"
}
],
"interlocuteurs": [
{
"id_entreprise": "37",
"date_add": "2022-01-31 08:37:33",
"id_add": "0",
"date_edit": "2022-09-01 10:42:07",
"id_edit": "0",
"entreprise_id": "0",
"numero": "2",
"numero_complet": "ENT_2200002",
...
}
]
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/actions_commerciales.php?id=1`

## Ajouter / Editer une action commerciale

```json
{
"id_action_commerciale": "40",
"id_add": "1",
"date_action": "2018-09-26 14:14:42",
"id_categorie_ac": "2",
"id_contact": "25,35",
"participant_prenom_nom": "Michel Blanc",
"priorite": "3",
"commercial_id": "21,14",
"compte_rendu": "En attente du bon de commande pour formation ScrumMaster. A relancer si rien sous une huitaine.",
"date_relance": "2018-10-20",
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id | non | ID de l'action commercial (si vide -> ajout d'une nouvelle action commerciale, sinon -> édition) |
| id_entreprise | non | IDs des entreprises rattachées à cette action commerciale (possibilité de passer 'entreprise_raison_sociale' au lieu de 'id_entreprise') |
| id_contact | non | IDs des contacts rattachés à cette action commerciale (possibilité de passer 'contact_prenom_nom' au lieu de 'id_contact') |
| id_participant | non | IDs des participants rattachés à cette action commerciale (possibilité de passer 'participant_prenom_nom' au lieu de 'id_participant') |
| id_formateur | non | IDs des formateurs rattachés à cette action commerciale (possibilité de passer 'formateur_prenom_nom' au lieu de 'id_formateur') |
| commercial_id | oui | IDs des administrateurs auteur de cette action commerciale |
| date_action | non | Date au format AAAA-MM-JJ (Si vide prendra la date du jour) |
| date_relance | non | Date au format AAAA-MM-JJ |
| id_categorie_ac | non | ID de catégorie (Si vide en mode ajout, prendra la valeur de la configuration par défaut) |
| priorite | non | Priorité de l'action commerciale (0,1,2) |

Une action commerciale DOIT être rattachée à un interlocuteur : entreprise, contact, ou participant. Plusieurs valeurs peuvent être renseignées, celles-ci doivent être séparées par des virgules. Pour ajouter une action commerciale à un particulier, vous devez envoyer l'id_entreprise de celui-ci.

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/actions_commerciales.php`

## Supprimer une Action Commerciale

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/actions_commerciales.php?id=1`

`DELETE https://pro.dendreo.com/demo/api/actions_commerciales.php?id_action_commerciale=1,2,3`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id ou id_action_commerciale | oui | ID Action Commerciale (existence vérifiée) |

# Convertir vers Particulier

Exemple de réponse

```json
{
"status":"success"
}
```

Vous pouvez convertir un Participant en Particulier si :

- Il n'a pas d'Entreprise ou est le seul dans son Entreprise
- Si il a une Entreprise, celle-ci doit avoir 0 ou 1 Contact associé

Vous pouvez convertir une Entreprise en Particulier si :

- Elle a 0 ou 1 seul Contact associé
- Elle a 0 ou 1 seul Participant associé

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/convert_particulier.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_entreprise | oui (sauf si id_participant fourni) | ID Entreprise (existence vérifiée) |
| id_participant | oui (sauf si id_entreprise fourni) | ID Participant (existence vérifiée) |

# Fichiers

## Afficher un fichier

```json
{
"id": "1",
"collection_name": "avatar",
"name": "sample",
"mime_type": "image/jpeg",
"size": "20461",
"created_at": "2018-10-26 12:44:49",
"updated_at": "2018-10-26 12:44:49",
"deleted_at": "",
"id_add": "1",
"id_edit": "0",
"public_url": "",
"cible": "formateur",
"id_cible": "59",
"entite_liee": {
"Entreprise": {
"id_entreprise": "482",
"id_add": "2",
"id_edit": "0",
"numero": "8",
"numero_complet": "ENT_2018001",
"...":
}
}
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/fichiers.php?id=1`

## Rechercher un fichier

Il est possible de rechercher les fichiers d'une 'collection', au sein d'une 'cible'.

Si le paramètre 'collection_name' est omis, les fichiers de l'espace de stockage seront retournés par défaut (Se reporter au tableau de correspondance cible/collection plus bas).

Exemple : `GET https://pro.dendreo.com/demo/api/fichiers.php?cible=action-de-formation&id_cible=1&collection_name=visuel`

Il est ensuite possible de filtrer les fichiers via les paramètres suivant :

`id_doc_type` : les fichiers uploadés via QR Code qui ont été reconnus comme étant ce modèle de document

Exemple : `GET https://pro.dendreo.com/demo/api/fichiers.php?cible=action-de-formation&id_cible=1&id_doc_type=2`

`id_formateur` : les fichiers 'liés' à un Formateur au sein d'une Action de formation

Exemple : `GET https://pro.dendreo.com/demo/api/fichiers.php?cible=action-de-formation&id_cible=1&id_formateur=2`

`id_entreprise` : les fichiers 'liés' à une Entreprise au sein d'une Action de formation

Exemple : `GET https://pro.dendreo.com/demo/api/fichiers.php?cible=action-de-formation&id_cible=1&id_entreprise=2`

`id_participant` : les fichiers 'liés' à un Participant au sein d'une Action de formation

Exemple : `GET https://pro.dendreo.com/demo/api/fichiers.php?cible=action-de-formation&id_cible=1&id_participant=2`

`id_module` : les fichiers 'liés' à un Module au sein d'une Action de formation

Exemple : `GET https://pro.dendreo.com/demo/api/fichiers.php?cible=action-de-formation&id_cible=1&id_module=2`

Pour les entites Entreprise, Formateur, Participant et Module, vous pouvez obtenir la liste de tous les fichiers liés dans les ADFs en utilsant la collection `fichiers_lies_adf`

Exemple : `GET https://pro.dendreo.com/demo/api/fichiers.php?cible=formateur&id_cible=1&collection_name=fichiers_lies_adf`

## Filtre avancé sur les cibles

Si vous choisissez de lister tous les fichiers d'un type de cible par exemple :

`GET https://pro.dendreo.com/demo/api/fichiers.php?cible=participant`

Vous pouvez alors filtrer sur un objet relatif à cette cible, exemple, l'Entreprise d'un Participant :

`GET https://pro.dendreo.com/demo/api/fichiers.php?cible=participant&filter_cible[entreprise]=1`

## Ajouter un fichier

```json
{
"id": "1",
"collection_name": "avatar",
"name": "sample",
"mime_type": "image/jpeg",
"size": "20461",
"created_at": "2018-10-30 15:17:06",
"updated_at": "2018-10-30 15:17:06",
"deleted_at": "",
"id_add": "1",
"id_edit": "0",
"cible": "formateur",
"id_cible": "59",
"chemin": "Répertoire/Sous_repertoire",
"entite_liee_type": "formateur",
"entite_liee_id": "1234",
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| file | oui | Fichier à envoyer (est attendu un fichier en POST multipart/form-data) |
| cible | non | Type de la cible à laquelle rattacher le fichier (ex: formateur) |
| id_cible | non | ID de la cible à laquelle rattacher le fichier |
| collection | non | Le nom de la collection à laquelle associer le fichier (voir tableau ci-dessous) |
| chemin | non | Permet de placer le fichier dans un répertoire (voire sous-répertoires). Le(s) répertoire(s) seront créés si besoin. |
| entite_liee_type | non | Permet de lier le fichier à un élément de l'ADF, parmi les types suivants : entreprise, participant, formateur et module |
| entite_liee_id | non | Permet de lier le fichier à un élément de l'ADF, en conjonction avec entite_liee_type |

Si un des paramètres cible, id_cible, ou collection est omis, alors Dendreo tentera de reconnaitre le fichier par l'intermédiaire du QR Code (si disponible avec votre abonnement).

Le paramètre 'chemin' ne peut être utilisé qu'avec la cible 'action-de-formation' et la collection 'docsaved'.

Les paramètres 'entite_liee_type' et 'entite_liee_id' doivent être utilisés ensemble. Ils ne peuvent être utilisés qu'avec la cible 'action-de-formation' et la collection 'docsaved' ou 'signature'. Dand le cas où vous souhaitez ajouter une demande de signature dans une ADF, il faut utiliser la cible 'action-de-formation' ET l'entite liée (cad le signataire)

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/fichiers.php`

## Liste des cibles et collection_name correspondants

Voici la liste des correspondances entre cible et collection possibles :

| cible | collection | commentaire |
| --- | --- | --- |
| action-de-formation | visuel, docssaved, signature | |
| action-de-formation | partage_adf_participants | à utiliser avec id_cible = id ADF, permet d'obtenir les fichiers mis à disposition pour "Tous les Participants" |
| action-de-formation | partage_adf_formateurs | à utiliser avec id_cible = id ADF, permet d'obtenir les fichiers mis à disposition pour "Tous les Formateurs" |
| action-de-formation | partage_adf_entreprises | à utiliser avec id_cible = id ADF, permet d'obtenir les fichiers mis à disposition pour "Toutes les Entreprises" |
| formateur | avatar, docssaved, signature, partage_formateur | |
| contact | avatar, signature | |
| participant | avatar, docssaved, signature, partage_participant | |
| module | visuel, presentation, docssaved | |
| module | partage_module_public | à utiliser avec id_cible = id module, permet d'obtenir les fichiers mis à disposition pour "Public - Participants" d'un Module |
| module | partage_module_formateurs | à utiliser avec id_cible = id module, permet d'obtenir les fichiers mis à disposition pour "Privé - Formateurs" d'un Module |
| entreprise | logo, docssaved, signature, partage_entreprise | |
| salle-de-formation | image_map, pdf_map | |
| centre-de-formation | logo, image_map, pdf_map, header, footer, cgv, reglement_interieur, centre_signature, docssaved, partage_cdf_formateurs, partage_cdf_entreprises, partage_cdf_participants | |
| doctype | docstype | |
| expense | expense | |
| formateur-facture | formateur_facture | à utiliser avec id_cible = id de la facture formateur, permet d'obtenir la liste des fichiers associés à une facture de frais pedagogique |
| laf | partage_laf | à utiliser avec id_cible = id du LAF, permet d'obtenir les fichiers pour 1 Formateur identifié dans 1 ADF |
| lap | partage_lap, partage_lap_prive | à utiliser avec id_cible = id du LAP permet d'obtenir les fichiers pour 1 Participant identifié dans 1 ADF |
| lae | partage_lae | à utiliser avec id_cible = id du LAE permet d'obtenir les fichiers pour 1 Entreprise identifié dans 1 ADF |
| salle | partage_salle_public | à utiliser avec id_cible = id salle_de_formation, permet d'obtenir les fichiers mis à disposition pour "Public - Participants" d'une Salle de Formation |
| devis | signature | à utiliser avec id_cible = id devis, permet d'obtenir les devis signés |

La collection 'docssaved' correspond à l'espace de stockage. Vous pouvez y ajouter plusieurs fichiers.

La collection 'expense' correspond aux justificatifs des notes de frais. Vous pouvez également y ajouter plusieurs fichiers.

Toutes les autres collections sont des fichiers 'uniques' c'est à dire que l'ajout d'un nouveau fichier écrasera celui qui serait déjà présent.

Vous pouvez également avoir d'autres collections relatives aux Champs personnalisés de type fichier. Dans ce cas, le nom de la collection sera le 'Nom technique' du champ personnalisé, disponible dans votre interface d'administration Dendreo

## Supprimer un Fichier

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/fichiers.php?id=1`

`DELETE https://pro.dendreo.com/demo/api/fichiers.php?id_fichier=1,2,3`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id ou id_fichier | oui | ID du fichier (existence vérifiée) |

# Génération de Documents

Cet endpoint vous permet de générer (publiposter) un document à partir d'un modèle de document existant sur Dendreo, et de le télécharger au format natif (.docx, .odt, .xlsx) ou PDF.

**Le header 'Content-Disposition' renvoyé est 'attachment'**

## Action De Formation

`GET https://pro.dendreo.com/demo/api/documents.php?m=adf`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_doc_type | oui | ID du Modèle de Document à utiliser |
| id_adf | oui | ID de l'Action De Formation |
| generate | non | 1 pour générer le Document, 0 pour télécharger le Modèle de Document |
| pdf | non | 1 pour la version pdf, 0 pour la version word du document |

## Entreprises d'une Action De Formation

`GET https://pro.dendreo.com/demo/api/documents.php?m=adf_entreprise`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_doc_type | oui | ID du Modèle de Document à utiliser |
| id_adf | oui | ID de l'Action De Formation |
| id_lae | oui | ID du Lae (Lien entre l'Action De Formation et une Entreprise) |
| generate | non | 1 pour générer le Document, 0 pour télécharger le Modèle de Document |
| pdf | non | 1 pour la version pdf, 0 pour la version word du document |

## Participants d'une Action De Formation

`GET https://pro.dendreo.com/demo/api/documents.php?m=adf_participant`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_doc_type | oui | ID du Modèle de Document à utiliser |
| id_adf | oui | ID de l'Action De Formation |
| id_lap | oui | ID du Lap (Lien entre l'Action De Formation et un Participant) |
| generate | non | 1 pour générer le Document, 0 pour télécharger le Modèle de Document |
| pdf | non | 1 pour la version pdf, 0 pour la version word du document |

## Formateurs d'une Action De Formation

`GET https://pro.dendreo.com/demo/api/documents.php?m=adf_formateur`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_doc_type | oui | ID du Modèle de Document à utiliser |
| id_adf | oui | ID de l'Action De Formation |
| id_laf | oui | ID du Laf (Lien entre l'Action De Formation et un Formateur) |
| generate | non | 1 pour générer le Document, 0 pour télécharger le Modèle de Document |
| pdf | non | 1 pour la version pdf, 0 pour la version word du document |

## Modules d'une Action De Formation

`GET https://pro.dendreo.com/demo/api/documents.php?m=adf_module`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_doc_type | oui | ID du Modèle de Document à utiliser |
| id_adf | oui | ID de l'Action De Formation |
| id_lam | oui | ID du Lam (Lien entre l'Action De Formation et un Module) |
| generate | non | 1 pour générer le Document, 0 pour télécharger le Modèle de Document |
| pdf | non | 1 pour la version pdf, 0 pour la version word du document |

## Modules + Participants d'une Action De Formation

`GET https://pro.dendreo.com/demo/api/documents.php?m=adf_module_participant`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_doc_type | oui | ID du Modèle de Document à utiliser |
| id_adf | oui | ID de l'Action De Formation |
| id_lmp | oui | ID du Lmp (Lien entre le Module et le Participant au sein de cette Action de Formation) |
| generate | non | 1 pour générer le Document, 0 pour télécharger le Modèle de Document |
| pdf | non | 1 pour la version pdf, 0 pour la version word du document |

## Facture

`GET https://pro.dendreo.com/demo/api/documents.php?m=facture`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_doc_type | oui | ID du Modèle de Document à utiliser |
| id_facture | oui | ID de la Facture |
| generate | oui | 1 pour générer la Facture |
| pdf | oui | 1 pour la version pdf |

## Module (hors contexte d'une ADF)

`GET https://pro.dendreo.com/demo/api/documents.php?m=module`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_doc_type | oui | ID du Modèle de Document à utiliser |
| id_module | oui | ID du Module |
| generate | non | 1 pour générer le Document, 0 pour télécharger le Modèle de Document |
| pdf | non | 1 pour la version pdf, 0 pour la version word du document |

## Entreprise (hors contexte d'une ADF)

`GET https://pro.dendreo.com/demo/api/documents.php?m=entreprise`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_doc_type | oui | ID du Modèle de Document à utiliser |
| id_entreprise | oui | ID de l'Entreprise |
| generate | non | 1 pour générer le Document, 0 pour télécharger le Modèle de Document |
| pdf | non | 1 pour la version pdf, 0 pour la version word du document |

## Participant (hors contexte d'une ADF)

`GET https://pro.dendreo.com/demo/api/documents.php?m=participant`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_doc_type | oui | ID du Modèle de Document à utiliser |
| id_participant | oui | ID du Participant |
| generate | non | 1 pour générer le Document, 0 pour télécharger le Modèle de Document |
| pdf | non | 1 pour la version pdf, 0 pour la version word du document |

## Formateur (hors contexte d'une ADF)

`GET https://pro.dendreo.com/demo/api/documents.php?m=formateur`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_doc_type | oui | ID du Modèle de Document à utiliser |
| id_formateur | oui | ID du Formateur |
| generate | non | 1 pour générer le Document, 0 pour télécharger le Modèle de Document |
| pdf | non | 1 pour la version pdf, 0 pour la version word du document |

## Devis

`GET https://pro.dendreo.com/demo/api/documents.php?m=devis`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_doc_type | oui | ID du Modèle de Document à utiliser |
| id_devis | oui | ID du Devis |
| generate | non | 1 pour générer le Document, 0 pour télécharger le Modèle de Document |
| pdf | non | 1 pour la version pdf, 0 pour la version word du document |

# Catalogue en ligne - Prochaines sessions

[Cliquez ici](https://developers.dendreo.com/#listing-pour-catalogue-public)

# Opportunités

## Lister toutes les Opportunités

Accède à toutes les Opportunités présentes sur Dendreo.

Il est possible de filtrer sur certaines opportunités si l'on connait leur `id`.

Exemple : `GET https://pro.dendreo.com/demo/api/opportunites.php?id=1`

Vous pouvez également filtrer sur une étape (opportunite_etape_id)

Exemple : `GET https://pro.dendreo.com/demo/api/opportunites.php?etape=4`

Ou sur un id de devis

Exemple : `GET https://pro.dendreo.com/demo/api/opportunites.php?id_devis=2`

Ou sur un id de centre de formation

Exemple : `GET https://pro.dendreo.com/demo/api/opportunites.php?id_centre_de_formation=2`

Ou sur un id d'entreprise

Exemple : `GET https://pro.dendreo.com/demo/api/opportunites.php?id_entreprise=2`

Il est possible d'afficher la liste des Devis par Opportunité en renseignant le paramètre `include` sur la valeur `devis`.

Exemple : `GET https://pro.dendreo.com/demo/api/opportunites.php?include=devis`

Il est aussi possible d'afficher les devis avec les modules rattachés à ces derniers en renseignant le paramètre `include` sur la valeur `devis_modules`.

Exemple : `GET https://pro.dendreo.com/demo/api/opportunites.php?include=devis_modules`

Pour retrouver les Actions de Formation programmées à partir des devis, renseignez le paramètre `include` sur la valeur `devis_formations` : chaque devis expose alors la liste `formations` des ID d'ADF qui lui sont liées. Les valeurs peuvent se combiner.

Exemple : `GET https://pro.dendreo.com/demo/api/opportunites.php?include=devis_modules,devis_formations`

```json
{
"id": "1",
"opportunite_etape_id": "4",
"numero": "1",
"numero_complet": "OPP_2020001",
"numero_perso": "0",
"entreprise_id": "570",
"assigned_to": "26",
"contact_id": "393",
"created_by": "",
"edited_by": "",
"commentaires_internes": "",
"description": "test",
"closed_at": "",
"lost_at": "",
"deleted_at": "",
"created_at": "2020-02-04 11:48:36",
"updated_at": "2020-02-04 11:58:58",
"id_centre_de_formation": "1",
"source_id": "1",
"devis": [
{
"id": "1",
"opportunite_id": "1",
"parent_id": "",
"numero_complet": "DEVIS_2020001",
"numero_perso": "0",
"numero": "1",
"numero_auto": "1",
"locked_at": "2020-02-04 11:58:58",
"sent_at": "",
"accepted_at": "2020-02-04 11:58:58",
"declined_at": "",
"created_by": "",
"edited_by": "",
"doc_type_id": "70",
"linked": "",
"formation_id": "",
"type": "inter",
"pricing": "par_participant",
"participants": "1",
"mode_participants": "global",
"remarques": "",
"commentaires_internes": "",
"deleted_at": "",
"created_at": "2020-02-04 11:48:36",
"updated_at": "2020-02-04 11:58:58",
"modules": [
{
"id_module": "233",
"intitule": "Test",
"numero_complet": "MOD_2020011",
"id_externe": "",
"id_categorie_module": "117"
}
],
"formations": [
{
"id_action_de_formation": "5421"
}
]
}
]
}
```

## Ajouter une Opportunité

```json
{
"id": "65",
"opportunite_etape_id": "2",
"numero": "9",
"numero_complet": "OPP_2020009",
"numero_perso": "0",
"entreprise_id": "600",
"assigned_to": "33",
"contact_id": "425",
"created_by": "0",
"edited_by": "0",
"commentaires_internes": "",
"description": "",
"closed_at": "",
"lost_at": "",
"deleted_at": "",
"created_at": "2020-03-17 14:02:43",
"updated_at": "2020-03-17 14:02:43",
"id_centre_de_formation": "1",
"devis": [
{
"id": "85",
"opportunite_id": "65",
"parent_id": "",
"numero_complet": "DEVIS_2020009",
"numero_perso": "0",
"numero": "9",
"numero_auto": "1",
"locked_at": "",
"sent_at": "",
"accepted_at": "",
"declined_at": "",
"created_by": "0",
"edited_by": "0",
"doc_type_id": "70",
"linked": "",
"formation_id": "",
"type": "inter",
"pricing": "par_participant",
"participants": "1",
"mode_participants": "global",
"remarques": "",
"commentaires_internes": "",
"deleted_at": "",
"created_at": "2020-03-17 14:02:43",
"updated_at": "2020-03-17 14:02:43"
}
]
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_entreprise | oui | ID de l'entreprise pour cette opportunité |
| id_administrateur | non | ID du Commercial |
| id_contact | non | ID du contact dans l'entreprise |
| id_etape | non | ID de l'étape initiale pour cette opportunité (Probabilité de succès) |
| id_source | non | ID de la source |
| description | non | Champ texte de description |
| commentaires_internes | non | Champ texte de commentaires internes |
| id_centre_de_formation | non | Obligatoire si vous avez l'option multi-centres |
| numero | non | Numéro personnalisé de l'opportunité (si vide, il est généré automatiquement) |
| numero_complet | non | Numéro complet personnalisé de l'opportunité (si vide, il est généré automatiquement selon le format de numérotation configuré) |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/opportunites.php`

# Etapes d'opportunité

## Lister toutes les étapes des opportunités

```json
[
"id": "1",
"name": "Lead",
"order": "0",
"success_chance": "25",
"deleted_at": "",
"created_at": "2018-05-17 12:24:20",
"updated_at": "2022-08-03 06:25:46",
"color": "f9c98f",
"status": "1"
]
```

Accède à toutes les étapes des opportunités présentes sur Dendreo.

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/opportunite_etapes.php`

## Afficher une étape d'opportunité

```json
{
"id": "2",
"name": "Négociation",
"order": "1",
"success_chance": "50",
"deleted_at": "",
"created_at": "2018-05-17 12:24:20",
"updated_at": "2018-11-26 09:21:29",
"color": "f6e67d",
"status": "1"
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/opportunite_etapes.php?id=2`

# Sources

## Lister toutes les sources

```json
[
{
"id": "1",
"name": "Campagne Marketing",
"status": "1",
"order": "0"
},
{
"id": "2",
"name": "Salons",
"status": "1",
"order": "3"
}
]
```

Accède à toutes les sources présentes sur Dendreo.

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/sources.php`

## Afficher une source

```json
{
"id": "1",
"name": "Campagne Marketing",
"status": "1",
"order": "0"
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/sources.php?id=2`

## Afficher plusieurs sources

```json
[
{
"id": "1",
"name": "Campagne Marketing",
"status": "1",
"order": "0"
},
{
"id": "2",
"name": "Salons",
"status": "1",
"order": "3"
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/sources.php?id=1,2`

# Exports

## Télécharger un Export

Ce lien vous permet de déclencher le téléchargement automatique d'un fichier d'Export Dendreo au format demandé en paramètre.

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/exports.php`

### Paramètres disponibles

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| nom_export | oui | Correspond au nom de l'export à télécharger (slug) |
| date_debut | oui | Date de début des données à exporter (format vérifié : "AAAA-MM-JJ") |
| date_fin | oui | Date de fin des données à exporter (format vérifié : "AAAA-MM-JJ") |
| type | non | Correspond au type du fichier de sortie (formats disponibles : csv, xls, xlsx). Fichier XLS par défaut |
| delimiter | non | Correspond au délimiteur du fichier CSV Formats disponibles : `,`, `\|`, `:`, `;` Format par défaut : `,` Attention, le paramètre est ignoré si le type est différent de csv. |

Exemple : `GET https://pro.dendreo.com/demo/api/exports.php?nom_export=creneaux&date_debut=2021-01-01&date_fin=2021-12-31&type=csv`

### Où trouver le slug pour le paramètre nom_export ?

Le slug pour chaque export se trouve sur l'infobulle de chaque export dans le menu "Exports" de Dendreo. Ou vous pouvez aussi le trouver dans la description de chaque export.

![export_slug_description.png](https://developers.dendreo.com/images/export_slug_description-8db95337.png)

![export_slug_infobulle.png](https://developers.dendreo.com/images/export_slug_infobulle-d6aa87c8.png)

# Webhooks

La documentation sur les Webhooks proposés par Dendreo est disponible ici : [https://doc.dendreo.com/article/545-presentation-webhooks](https://doc.dendreo.com/article/545-presentation-webhooks)
