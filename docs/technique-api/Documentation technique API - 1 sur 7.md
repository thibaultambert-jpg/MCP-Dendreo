# Documentation technique API Dendreo (partie 1/7)

Source : https://developers.dendreo.com/ — Cette partie couvre : Introduction, Fonctionnement général, Catégories de Module, Types de produit, Modules/Produits, Sessions Permanentes.

# Introduction

[Dendreo](https://www.dendreo.com/) est un logiciel de gestion performant pour centres de formation exigeants !

Vous pouvez créer un compte d'essai de 14 jours sur notre site internet.

# Fonctionnement général

## Authentification

Nous proposons une authentification par token. Le token peut être communiqué de deux manières différentes :

- un paramètre POST ou GET sur la clef `key` (ex: `?key=123456`)
- dans header "Authorization" (ex: `Token token="123456"`)

![](https://developers.dendreo.com/images/exemple_token-9bacc03b.png)

Vous pouvez retrouver vos clés d'API [ici](https://pro.dendreo.com/redirect/api).

L'absence de ce token ou l'utilisation d'un token invalide, entrainera une erreur `401` (Unauthorized).

Attention, l'URL de l'API dépend de votre URL de connexion. Dans les exemples ci-dessous, les URLs sont fournies pour le compte `demo`.

**Exemple** : https://pro.dendreo.com/**demo**/api/entreprises.php

## Permissions

La gestion de clés d'API multiple vous permet de leur attribuer des droits spécifiques de lecture (GET) et d'écriture (POST, PUT et DELETE) indépendamment sur chaque point d'entrée.

L'absence de permissions sur un point d'entrée entrainera une erreur 401 (Unauthorized).

## Formats

### Requêtes

Deux stratégies sont proposées pour les requêtes liées à la création ou la mise à jour d'un élément :

- l'usage de `form-data`

![](https://developers.dendreo.com/images/create_form_data-7ce5714f.png)

- l'usage d'un payload JSON (nécessite de préciser en header `Content-Type: application/json`)

![](https://developers.dendreo.com/images/create_payload_json-bf4ebfaa.png)

### Réponses

Seul le format JSON est proposé actuellement.

## Erreurs

```json
{
"status": "failure",
"errors": [
"Une raison sociale est obligatoire (raison_sociale est vide)"
]
}
```

Quand des attributs sont validés par l'API (présence, format, existence), si aucune erreur n'est détectée, un statut `200` (Success) ou `201` (Created) sera retourné par l'API.

Dans le cas contraire, un statut `422` (Unprocessable Entity) sera retourné accompagné des messages d'erreurs associés aux validations qui ont échouée.

## Throttling

L'API de Dendreo impose les limites suivantes :

- Burst : 100 requêtes max par période de 10 secondes
- Mensuelle : dépend de votre niveau d'abonnement
- Quotidienne : 100 000 requêtes max par jour, quel que soit votre limite mensuelle

En cas de dépassement, vous recevrez une erreur 429 - HTTP_TOO_MANY_REQUESTS.

## Cache

Sur certains endpoint, le retour peut contenir des urls pointant vers des ressources du type https://public.dendreo.com/xxxx/media/

Les ressources servies par les URL de ce type sont mises en cache pendant 1h.

Si vous effectuez un nouvel appel à l'API, l'url retournée sera différente, donc une nouvelle version du fichier sera servie.

## Types de requêtes

L'API de Dendreo suit les conventions REST. Les requêtes de lecture se décomposent en deux types :

| Type | Description | Exemple d'URL | Réponse |
| --- | --- | --- | --- |
| INDEX | Liste ou recherche d'objets (sans ID spécifique) | GET /api/entreprises.php | Tableau d'objets |
| SHOW | Affichage d'un objet spécifique (avec ID) | GET /api/entreprises.php?id=12 | Objet unique |

Ces deux types de requêtes supportent des paramètres différents (voir sections ci-dessous).

## Requêtes multiples (SHOW)

```json
[
{
"id_entreprise": "3",
"raison_sociale": "EDF"
},
{
"id_entreprise": "4",
"raison_sociale": "Peugeot"
}
]
```

Il est possible de requêter plusieurs objets spécifiques en une seule requête `GET`, en mettant plusieurs `id` à la suite, séparés par des virgules

Exemple : `GET https://pro.dendreo.com/demo/api/contacts.php?id=12,14,16`

Pour les objets de type : Entreprise, Contact, Participant, Formateur et Action De Formation il est possible d'utiliser `id_externe` à la place de `id`

Exemple : `GET https://pro.dendreo.com/demo/api/entreprises.php?id_externe=externe_12,externe_14,externe_16`

Notez qu'il est possible d'utiliser `id` ou `id_objet`, par exemple `id` ou `id_contact` pour afficher un contact particulier :

Exemple : `GET https://pro.dendreo.com/demo/api/contacts.php?id=12`

Exemple : `GET https://pro.dendreo.com/demo/api/contacts.php?id_contact=12`

### Paramètre fields (INDEX et SHOW)

Pour toutes les requêtes de lecture (liste ou détail), il est possible de restreindre les champs retournés en renseignant le paramètre `fields`. Cela permet de réduire la taille de la réponse et d'améliorer les performances.

**Exemple INDEX (liste)** - Retourne uniquement les champs demandés pour chaque entreprise : `GET https://pro.dendreo.com/demo/api/entreprises.php?fields=id_entreprise,raison_sociale`

```json
[
{ "id_entreprise": "3", "raison_sociale": "EDF" },
{ "id_entreprise": "4", "raison_sociale": "Peugeot" }
]
```

**Exemple SHOW (détail)** - Retourne uniquement les champs demandés pour le contact spécifié : `GET https://pro.dendreo.com/demo/api/contacts.php?id=12&fields=id_contact,nom,prenom,email`

```json
{
"id_contact": "12",
"nom": "Dupont",
"prenom": "Marie",
"email": "marie.dupont@example.com"
}
```

**Exemple avec plusieurs champs** (séparés par des virgules, sans espaces) :

```
GET /api/participants.php?fields=id_participant,nom,prenom,telephone,email
GET /api/actions_de_formation.php?fields=id_action_de_formation,numero,libelle,date_debut,date_fin
```

Il est aussi possible d'inclure dans la réponse des éléments liés en les indiquant dans le paramètre "include".

Exemple : `GET https://pro.dendreo.com/demo/api/contacts.php?include=entreprise`

Enfin, certains attributs sont cachés par défaut mais vous pouvez les afficher avec le paramètre `show`. Ces champs champs sont notamment `date_add`, `date_edit` et `date_delete`.

Exemple : `GET https://pro.dendreo.com/demo/api/contacts.php?id=12&show=date_edit,date_delete`

## Édition

La plupart du temps il est possible, d'éditer les objets en envoyant simplement une requête `POST` (ou `PUT`) et en précisant un identifiant déjà existant via le paramètre `id` ou `id_objet` (ex. `id_participant`).

*L'endpoint Particulier est un cas spécifique : la création se fait via l'endpoint Contacts et l'édition via l'endpoint Particuliers.*

## Suppression

Il est également souvent possible de supprimer les objets en envoyant une requête `DELETE` sur un objet identifié par son ID.

## Recherche/filtre (INDEX uniquement)

Lors des requêtes de type **INDEX** (liste/recherche sans ID spécifique), il est possible de filtrer les résultats en indiquant une clef de recherche dans le paramètre `search`.

Exemple : `GET https://pro.dendreo.com/demo/api/entreprises.php?search=EDF`

Les champs sur lesquels cette recherche est effectuée sont précisés pour chaque objet.

Certains objets proposent de filtrer les résultats de recherche par date d'ajout et d'édition: `nb_jours`, `created_after`, `created_before`, `updated_after`, `updated_before`

le format de date est : `YYYY-MM-DD` (= 'YYYY-MM-DD 00:00:00' ou `YYYY-MM-DD hh:mm:ss`)

Et retournera les objets dont la `date_add` ou `date_edit` est "inférieur ou égale" ou "supérieur ou égale" à la date donnée.

Ces parametres peuvent être cumulés.

Les objets sur lesquels ce filtre est disponible sont : `ActionDeFormation`, `Creneaux`, `Contact`, `Facture`, `Financement`, `Entreprise`, `Formateur`, `Participant`, `Opportunité`, `Module`, `Lam`, `Lap`, `Lmp` et les `Fichiers`.

Pour les objets `ActionDeFormation`, `Lam` et `Creneaux` vous pouvez filtrer sur la date de début ou de fin: `started_after`, `started_before`, `ended_after`, `ended_before`

le format de date est : `YYYY-MM-DD` (= `YYYY-MM-DD 00:00:00` ou `YYYY-MM-DD hh:mm:ss`)

Et retournera les objets dont la `date_debut` ou `date_fin` est "inférieur ou égale" ou "supérieur ou égale" à la date donnée.

Ces parametres peuvent être cumulés.

# Catégories de Module

## Lister toutes les Catégories de Module

Une Catégorie de Module correspond à un système de classification des Modules de formation qui constituent le Catalogue.

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/categories_module.php`

```json
[
{
"id_categorie_module": "1",
"date_add": "2011-09-29 16:47:36",
"id_add": "1",
"date_edit": "2021-09-24 15:40:08",
"id_edit": "0",
"intitule": "Management",
"description": "",
"color": "",
"status": "1",
"order": "0",
"id_parent": "",
"deleted_at": ""
},
{
"id_categorie_module": "3",
"date_add": "2021-02-18 07:59:59",
"id_add": "0",
"date_edit": "2022-02-15 10:30:42",
"id_edit": "0",
"intitule": "Cuisine",
"description": "",
"color": "",
"status": "1",
"order": "1",
"id_parent": "",
"deleted_at": ""
},
]
```

## Afficher une catégorie de Module

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/categories_module.php?id=8`

```json
{
"id_categorie_module": "8",
"date_add": "2022-09-02 15:46:16",
"id_add": "0",
"date_edit": "2022-09-02 15:46:19",
"id_edit": "0",
"intitule": "Cuisine végétarienne",
"description": "",
"color": "",
"status": "1",
"order": "2",
"id_parent": "3",
"deleted_at": ""
}
```

## Ajouter / Editer une catégorie de Module

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_categorie_module | non | ID de la Catégorie (si vide -> création d'une nouvelle Catégorie, sinon -> édition de la Catégorie existante) |
| intitule | oui | Intitulé de la catégorie |
| description | non | Description de la catégorie |
| color | non | Si non vide remplace la couleur dans l'Agenda |
| status | non | Booléen : 1 Catégorie active, 0 Catégorie désactivée |
| order | non | Ordre d'affichage (entier) |
| id_parent | non | ID de la Catégorie parent |

```json
{
"id_categorie_module": "10",
"date_add": "2023-01-05T10:39:05.000000Z",
"id_add": "0",
"date_edit": "2023-01-05T10:39:05.000000Z",
"id_edit": "0",
"intitule": "Ma catégorie de module",
"description": "Description de ma catégorie de module",
"color": "7866FF",
"status": "0",
"order": "1",
"id_parent": "3",
"deleted_at": ""
}
```

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/categories_module.php`

# Types de produit

## Lister tous les types de produit

Lorsque le mode "Multi-Produits" est activé, Dendreo est capable de gérer différents Produits autres que de la formation. Vous pouvez ajouter différents types de Produits à votre Catalogue, puis utiliser ces Produits au sein de vos Actions de Formation. Vous pouvez même réaliser des Actions Hors Formation, c'est à dire des Actions ne comportant aucun Module de formation.

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/categories_produit.php`

```json
[
{
"id_categorie_produit": "1",
"date_add": "2021-07-18 17:20:45",
"id_add": "0",
"date_edit": "",
"id_edit": "0",
"intitule": "Formation",
"color": "1b86d8",
"status": "1"
},
{
"id_categorie_produit": "2",
"date_add": "2021-09-16 10:33:18",
"id_add": "0",
"date_edit": "",
"id_edit": "0",
"intitule": "Licences",
"color": "",
"status": "1"
}
]
```

## Afficher un type de produit

Un type de produit supprimé est traité comme inexistant : la lecture d'un seul id renvoie `[]`, et il est absent de la réponse en lecture de plusieurs ids.

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/categories_produit.php?id=2`

```json
{
"id_categorie_produit": "2",
"date_add": "2021-09-16 10:33:18",
"id_add": "0",
"date_edit": "",
"id_edit": "0",
"intitule": "Licences",
"color": "",
"status": "1"
}
```

# Modules/Produits

Par défaut, Dendreo permet de programmer de la formation. Il existe cependant une option appelée "Multi-Produits" qui permet d'associer d'autres produits (modules) à une action de formation.

La catégorie de Produit par défaut (`id_categorie_produit` = 1) correspond à de la formation. Un module avec un `id_categorie_produit` différent de 1 est donc considéré comme un produit autre que de la formation.

## Lister tous les Modules de formation

```json
[
{
"id_module": "4",
"id_categorie_produit": "1",
"intitule": "[Demo] Les Bases Du Management",
"include_in_bpf": "1",
"numero": "4",
"numero_complet": "MOD_2014004",
"numero_comptable": "",
"description": "Les bases du management",
"prix": "1000.00",
"prix_intra": "0.0000",
"prix_edof": "0.0000",
"prix_inter_category_1": "0.0000",
"prix_intra_category_1": "0.0000",
"prix_achat": "0.0000",
"duree_heures": "4.00",
"duree_jours": "1.00",
"id_formacode": "0",
"id_specialite": "2",
"id_formateur": "0",
"id_categorie_module": "1",
"nb_participants_min": "0",
"nb_participants": "0",
"objectif": "",
"public_vise": "",
"pre_requis": "",
"intitules": "",
"id_salle_de_formation": "0",
"moyens_pedago": "",
"id_centre_de_formation": "1,2",
"objectif_par_defaut": "autres",
"formateurs_aptes": [
{
"id_formateur": "5",
"date_add": "2012-05-10 10:53:30",
"id_add": "1",
"date_edit": "2021-09-13 09:20:03",
"id_edit": "0",
"user_id": "9300",
"anonyme": "0",
"numero": "1",
"numero_complet": "FORM_2012001",
"numero_perso": "0",
"n_secu": "000",
"civilite": "Mme",
"nom": "Skapa",
"nom_jeune_fille": "",
"prenom": "Petra",
"color": "",
"date_de_naissance": "",
"lieu_de_naissance": "",
"nationalite": "Française",
"situation_familiale": "marie",
"adresse": "",
"code_postal": "",
"ville": "",
"profession": "",
"invisible_catalogue": "0",
"biographie_catalogue": "",
"telephone_perso": "",
"telephone_pro": "",
"email_perso": "",
"email_pro": "",
"statut": "Travailleur indépendant\/gérant non salarié",
"statut_bpf": "Personne de votre organisme (CDI, CDD, occasionnel, bénévole)",
"mode_remu": "Horaire",
"remu_horaire_par_defaut": "0.0000",
"adeli_rpps": "",
"key_uniq": "cd66ec97913376e2f9f3e6b34a9b1f66",
"id_externe": "",
"global_visible": "1",
"id_entreprise": "",
"message_extranet": "",
"infos_adf": "",
"num_da": "",
"siret": "",
"diplomes": "",
"nom_commercial": "",
"responsable_dequipe_id": "",
"tva": "",
"centre_id": "0",
"pivot": {
"id_module": "69",
"id_formateur": "5"
}
}
],
"competences_requises": [
{
"id": "15",
"label": "Management",
"badge_type": "competences",
"evaluable": "",
"created_at": "2018-03-01 10:25:26",
"updated_at": "2021-11-05 19:29:30",
"deleted_at": "",
"pivot": {
"badgeable_id": "4",
"badge_id": "15",
"badgeable_type": "Models\\Module"
}
}
],
"orientations": [
{
"id_orientation_ogdpc": "1",
"intitule": "Orientation DPC exemple",
"numero": "1"
}
]
}
]
```

Accède à tous les modules de formation présents sur Dendreo.

Il est possible de filtrer les Modules via les paramètres suivants :

`numero_complet` : Le numéro complet du Module

Exemple : `GET https://pro.dendreo.com/demo/api/modules.php?numero_complet=MOD_2019001`

`intitule` : L'intitulé du Module (ou intitulé court)

Exemple : `GET https://pro.dendreo.com/demo/api/modules.php?intitule=Excel`

- `id_categorie_module` : ID de categorie du Module
- `id_formateur` : ID du Formateur par défaut

Exemple : `GET https://pro.dendreo.com/demo/api/modules.php?id_categorie_module=12`

- `catalogue` : 0/1 si le module est présent ou non dans le catalogue public
- `eligible_cpf` : 0/1 si le module est éligible au CPF

Exemple : `GET https://pro.dendreo.com/demo/api/modules.php?catalogue=1`

- `keywords` : des mots-clés à rechercher parmi les intitulés, descriptions et différents champs du module, telle que pour la recherche sur le catalogue public.

Il est aussi possible d'inclure les informations `formateurs_aptes`, `competences_requises` ou `certification_complete_code` sur les modules via l'attribut `include`.

Exemple : `GET https://pro.dendreo.com/demo/api/modules.php?include=formateurs_aptes`

Exemple : `GET https://pro.dendreo.com/demo/api/modules.php?include=competences_requises`

Exemple : `GET https://pro.dendreo.com/demo/api/modules.php?include=certification_complete_code`

`certification_complete_code` permet d'obtenir les informations liées à la Certification (Code RS / RNCP / CPF / CertifInfo)

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/modules.php`

## Afficher un module de formation

```json
{
"id_module": "4",
"id_externe": "",
"catalogue": "1",
"id_categorie_produit": "1",
"intitule": "[Demo] Les Bases Du Management",
"intitule_court": "BM",
"slug": "les-bases-du-management",
"color": "",
"include_in_bpf": "1",
"numero": "4",
"numero_complet": "MOD_2014004",
"numero_comptable": "",
"description": "Les bases du management",
"description_meta": "",
"hors_formation_dates": "0",
"hors_formation_prix_par_jour": "0",
"prix": "1000.0000",
"prix_intra": "2000.0000",
"prix_edof": "0.0000",
"prix_inter_category_1": "0.0000",
"prix_intra_category_1": "0.0000",
"prix_achat": "0.0000",
"duree_heures": "4.00",
"duree_jours": "1.00",
"id_formacode": "0",
"id_specialite": "2",
"id_formateur": "0",
"id_entreprise_formateur": "0",
"id_categorie_module": "1",
"nb_participants_min": "0",
"nb_participants": "0",
"objectif": "",
"public_vise": "",
"pre_requis": "",
"profil_formateurs": "",
"id_salle_de_formation": "0",
"modalites_devaluation": "",
"moyens_supports_pedagogiques": "",
"modalites_pedagogiques": "",
"id_centre_de_formation": "1,2",
"duree_de_validite": "0",
"id_responsable": "0",
"eligible_cpf": "0",
"code_certifinfo": "",
"mode_organisation": "presentiel",
"duree_planning_type": "907200",
"duree_plage_jours": "38",
"commentaires_devis": "",
"type_parcours_id": "1",
"objectif_general_id": "0",
"niveau_entree_id": "0",
"codes_modalites_admission": [
"99999"
],
"points_forts": "",
"eligible_dpc": "0",
"mention_a_partir_de": "0",
"nouveaute": "0",
"cache_note_moyenne": "0",
"moyenne_satisfaction": "100",
"satisfaction_nb_avis": "1",
"satisfaction_nb_total": "1",
"document_presentation_url": "",
"visuel_url": "",
"objectif_par_defaut": "autres",
"actions_de_formation_programmees": [
{
"id_action_de_formation": "132",
"intitule": "[Demo] Les Bases Du Management",
"date_debut": "2016-09-02 09:00:00",
"date_fin": "2016-09-02 17:00:00"
}
],
"competences_list": [
"word",
"excel"
],
"public_url_catalogue": "https://catalogue-demo.dendreo.test/formation/4/formation-les-bases-du-management",
"formateurs_aptes": [
{
"id_formateur": "5",
"date_add": "2012-05-10 10:53:30",
"id_add": "1",
"date_edit": "2021-09-13 09:20:03",
"id_edit": "0",
"user_id": "9300",
"anonyme": "0",
"numero": "1",
"numero_complet": "FORM_2012001",
"numero_perso": "0",
"n_secu": "000",
"civilite": "Mme",
"nom": "Skapa",
"nom_jeune_fille": "",
"prenom": "Petra",
"color": "",
"date_de_naissance": "",
"lieu_de_naissance": "",
"nationalite": "Française",
"situation_familiale": "marie",
"adresse": "",
"code_postal": "",
"ville": "",
"profession": "",
"invisible_catalogue": "0",
"biographie_catalogue": "",
"telephone_perso": "",
"telephone_pro": "",
"email_perso": "",
"email_pro": "",
"statut": "Travailleur indépendant\/gérant non salarié",
"statut_bpf": "Personne de votre organisme (CDI, CDD, occasionnel, bénévole)",
"mode_remu": "Horaire",
"remu_horaire_par_defaut": "0.0000",
"adeli_rpps": "",
"key_uniq": "cd66ec97913376e2f9f3e6b34a9b1f66",
"id_externe": "",
"global_visible": "1",
"id_entreprise": "",
"message_extranet": "",
"infos_adf": "",
"num_da": "",
"siret": "",
"diplomes": "",
"nom_commercial": "",
"responsable_dequipe_id": "",
"tva": "",
"centre_id": "0",
"pivot": {
"id_module": "69",
"id_formateur": "5"
}
}
],
"competences_requises": [
{
"id": "15",
"label": "Management",
"badge_type": "competences",
"evaluable": "",
"created_at": "2018-03-01 10:25:26",
"updated_at": "2021-11-05 19:29:30",
"deleted_at": "",
"pivot": {
"badgeable_id": "4",
"badge_id": "15",
"badgeable_type": "Models\\Module"
}
}
],
"orientations": [
{
"id_orientation_ogdpc": "1",
"intitule": "Orientation DPC exemple",
"numero": "1"
}
]
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/modules.php?id=4`

`GET https://pro.dendreo.com/demo/api/modules.php?id_module=4`

Il est possible de récupérer l'url du `visuel` associé au module dans la réponse, en rajoutant `include=visuel` à votre requête.

Exemple : `GET https://pro.dendreo.com/demo/api/modules.php?id=4&include=visuel`

Il est aussi possible d'inclure les informations `formateurs_aptes`, `competences_requises` ou `certification_complete_code` sur les modules via l'attribut `include`.

Exemple : `GET https://pro.dendreo.com/demo/api/modules.php?include=formateurs_aptes`

Exemple : `GET https://pro.dendreo.com/demo/api/modules.php?include=competences_requises`

Exemple : `GET https://pro.dendreo.com/demo/api/modules.php?include=certification_complete_code`

`certification_complete_code` permet d'obtenir les informations liées à la Certification (Code RS / RNCP / CPF / CertifInfo)

Notez que les `actions_de_formation_programmees` retournées pour un Module sont uniquement les Actions de Formation dans une étape de type "prévisionnelle" (cela exclue donc les formations en cours de réalisation ou terminées).

Le champ `orientations` (orientations DPC associées au module) n'est présent dans la réponse que si l'option "Affichage des options DPC sur les ADFs et Participants" est activée sur votre compte.

## Ajouter / Editer un Module de formation

```json
{
"id_module": "91",
"date_add": "2023-01-06 17:46:56",
"id_add": "0",
"date_edit": "2023-01-06 17:46:56",
"id_edit": "0",
"id_delete": "0",
"id_externe": "",
"lms_custom_url": "",
"catalogue": "1",
"intitule": "Mon nouveau Module",
"intitule_court": "",
"slug": "mon-nouveau-module",
"color": "",
"id_categorie_produit": "1",
"include_in_bpf": "1",
"numero": "91",
"numero_complet": "MOD_2023091",
"numero_perso": "0",
"numero_comptable": "",
"langue": "FR",
"description": "",
"description_meta": "",
"hors_formation_dates": "1",
"hors_formation_prix_par_jour": "1",
"prix": "0.0000",
"prix_intra": "0.0000",
"prix_edof": "",
"prix_inter_category_1": "0.0000",
"prix_intra_category_1": "0.0000",
"prix_achat": "0.0000",
"duree_heures": "18.000",
"duree_jours": "2",
"id_formacode": "0",
"id_specialite": "0",
"id_formateur": "0",
"id_entreprise_formateur": "",
"id_categorie_module": "",
"nb_participants_min": "0",
"nb_participants": "0",
"objectif": "",
"public_vise": "",
"pre_requis": "",
"profil_formateurs": "",
"id_salle_de_formation": "0",
"id_orientation_ogdpc": "0",
"color_adf_par_defaut": "",
"objectif_par_defaut": "autres",
"modalites_devaluation": "",
"moyens_supports_pedagogiques": "",
"infos_admission": "",
"accessibilite": "",
"modalites_pedagogiques": "",
"global_visible": "1",
"duree_de_validite": "",
"infos_adf": "",
"id_responsable": "",
"eligible_cpf": "0",
"code_cpf_id": "",
"mode_organisation": "presentiel",
"duree_planning_type": "64800",
"duree_plage_jours": "2",
"commentaires_devis": "",
"type_parcours_id": "1",
"objectif_general_id": "",
"niveau_entree_id": "0",
"codes_modalites_admission": "",
"points_forts": "",
"eligible_dpc": "0",
"mention_a_partir_de": "0",
"nouveaute": "0",
"formation_prioritaire": "0",
"cache_note_moyenne": "1",
"cache_taux_reussite": "1",
"moyenne_satisfaction_init": "",
"ponderation_satisfaction_init": "",
"date_satisfaction_init": "",
"taux_reussite_evaluation_init": "",
"ponderation_evaluation_init": "",
"date_evaluation_init": "",
"frais_certif_inclus": "1",
"frais_anpec": "",
"detail_frais_anpec": "",
"catalogue_order": "76",
"satisfaction_evaluable": "1",
"evaluation_evaluable": "1",
"code_certifinfo": "",
"catalogue_limited_visibility": "0",
"stripe_catalogue_public_payment_strategy": "",
"stripe_catalogue_public_module_help_text": "",
"code_certification_id": "",
"is_master_module": "0",
"code_analytique": "",
"orientations": [
{
"id_orientation_ogdpc": "1",
"intitule": "Orientation DPC exemple",
"numero": "1"
}
]
}
```

### Précisions concernant le planning d'un Module de formation

Les champs `duree_jours` et `duree_plage_jours` servent si vous faites de la planification progressive, c'est-à-dire lorsque vous connaissez la durée totale du Module, mais pas encore son planning.

Si vous connaissez déjà le planning type de votre Module, vous avez 5 solutions :

- ne renseigner aucun paramètre spécifique et votre Module prendra la durée d'une 'journée type' (définie en configuration)
- passer uniquement le paramètre `import_jours` = X et votre Module aura un planning contenant X jours d'une durée égale à la 'journée type'
- passer les paramètres `import_jours` = X et `import_duree` = Y et votre Module aura un planning contenant X jours d'une durée de Y heures chacun (en mode durée)
- passer les paramètres `import_jours` = X et `import_creneaux` avec la valeur `default_config` et votre Module aura un planning contenant X jours, chaque jour contenant le ou les Créneaux par défaut (définis en configuration)
- passer les paramètres `import_jours` = X et `import_creneaux` sous la forme `08:30-11:00;14:30-16:50` et votre Module aura un planning contenant X jours, chaque jour contenant le ou les Créneaux correspondant aux horaires précisés

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id (ou id_module) | non | ID du Module de formation (si vide -> ajout d'un nouveau Module au Catalogue, sinon -> édition du Module existant) |
| id_centre_de_formation | non | ID Centre de formation (existence vérifiée), plusieurs ID possible (séparés par des virgules ex : 1,2,3) |
| intitule | oui | Intitulé du Module |
| intitule_court | non | Intitulé court du Module |
| include_in_bpf | non | Module inclus dans le BPF : 1 ou 0 |
| catalogue | non | Module affiché sur le Catalogue : 1 ou 0 |
| eligible_cpf | non | Éligibilité CPF : 1 ou 0 |
| mode_organisation | non | Mode d'organisation (valeurs possibles : presentiel, elearning_sync, mixte, elearning_async, stage) |
| import_creneaux | non | Créneaux du Module de formation (si renseigné, prend le dessus sur import_duree) ex : 09:00-12:00;14:30-18:00 ou default_config (prendra la configuration par défaut de vos Créneaux) |
| import_duree | non | Durée en heures (si import_creneaux non renseigné) |
| duree_heures | non | Durée en heures (si import_duree non renseigné) |
| duree_plage_jours_elearning | non | Si mode_organisation = elearning_async uniquement. Si non renseigné, prend la valeur de la configuration de vos Modules du champ "Durée en jours par défaut" |
| import_jours | non | Durée (en nombre de jours) du Module |
| prix | non | Prix INTER |
| prix_intra | non | Prix INTRA |
| prix_inter_category_1 | non | Prix Adhérents INTER |
| prix_intra_category_1 | non | Prix Adhérents INTRA |
| prix_achat | non | Prix achat (hors-formation uniquement) |
| id_formateur | non | ID du Formateur (existence et visibilité sur les centers de formation vérifiées) staffé par défault |
| id_entreprise_formateur | non | ID de l'Entreprise sous-traitante (existence et visibilité sur les centers de formation vérifiées) staffée par défault |
| formateurs | non | ID Formateurs aptes à réaliser ce Module de formation, plusieurs ID possible (séparés par des virgules ex : 1,2,3) |
| eligible_dpc | non | Éligibilité DPC : 1 ou 0 |
| competences_ids | non | ID des compétences (Objectifs à atteindre par les stagiaires), plusieurs ID possible (séparés par des virgules ex : 1,2,3) |
| competences_list | non | Intitulé des compétences, plusieurs intitulés possible (séparés par des point-virgules ex: Compétences n°1;Compétences n°2) |
| competences_requises_ids | non | Id des compétences requises par les formateurs, plusieurs ID possible (séparés par des virgules ex : 5,6) |
| competences_requises | non | Intitulé des compétences requises par les formateurs, plusieurs intitulés possible (séparés par des point-virgules ex : Compétences requises n°1;Compétences requises n°2) |
| id_specialite | non | ID Spécialité (si renseigné, prend le dessus sur specialite_code) |
| specialite_code | non | Code Spécialité (si id_specialite non renseigné) |
| id_categorie_module | non | ID Catégorie (si renseigné, prend le dessus sur categorie_module_intitule) |
| categorie_module_intitule | non | Intitulé Catégorie (si id_categorie_module non renseigné) |
| codes_modalites_admission | non | Modalités d'admission |
| points_forts | non | Points forts (limite de 254 caractères) |
| certification_code | non | Code de certification (Si eligible_cpf = 1) ex: RS5355, CPF5355, RNCP5355, CERTIFINFO5355 |
| formacode | non | Formacode |
| nb_participants_min | non | Nombre minimum de Participants |
| nb_participants | non | Nombre maximum de Participants |
| public_vise | non | Public visé |
| pre_requis | non | Prérequis |
| infos_admission | non | Informations sur l'admission |
| modalites_pedagogiques | non | Modalités pédagogiques |
| moyens_supports_pedagogiques | non | Moyens et supports pédagogiques |
| modalites_devaluation | non | Modalités d'évaluation et de suivi |
| accessibilite | non | Informations sur l'accessibilité |
| objectif | non | Objectifs de la formation |
| description | non | Description / contenu |
| profil_formateurs | non | Profil du / des Formateur(s) |
| duree_plage_jours_elearning | non | Période d'ouverture |
| num_programme_dpc | non | Numéro de programme DPC : valeur modifiable si l'option "Affichage des options DPC sur les ADFs et Participants" est activé |
| nouveaute | non | Nouveauté ? : 1 ou 0 |
| catalogue_limited_visibility | non | Restreindre la visibilité de ce Module sur le Catalogue Public (1 = cochée, 0 = décochée) |
| objectif_par_defaut | non | Objectif qui sera attribué lors de la programmation du module en formation. Valeurs autorisées: accompagnement,autres,bilan,cqp_non_rs,cqp_rs,cqp_sans,niveau12,niveau2,niveau3,niveau4,niveau5 |
| orientations_dpc | non | Orientations par défaut (DPC) - Eligibilité DPC doit être cochée pour faire apparaître l'orientation par défaut (séparés par des virgules ex : 645,658,685) |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/modules.php`

Le champ `orientations` (orientations DPC associées au module) n'est présent dans la réponse que si l'option "Affichage des options DPC sur les ADFs et Participants" est activée sur votre compte.

## Supprimer un Module

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/modules.php?id=1`

`DELETE https://pro.dendreo.com/demo/api/modules.php?id_module=1,2,3`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id ou id_module | oui | ID Module (existence vérifiée) |

# Sessions Permanentes

## Lister toutes les Sessions Permanentes

Accède à toutes les Sessions Permanentes présentes sur Dendreo.

Exemple : GET https://pro.dendreo.com/demo/api/sessions_permanentes.php

```json
[
{
"id": "39",
"salle_de_formation_id": "73",
"module_id": "320",
"responsable_id": "",
"mode_pricing": "forfaitaire",
"rythmes": [
"1"
],
"prix": "1800.0000",
"duree": "0",
"garantie": "0",
"active": "1",
"url_edof": "",
"created_at": "2022-10-18 16:44:51",
"updated_at": "2022-11-24 10:43:56",
"deleted_at": "",
"id_centre_de_formation": "0",
"pre_requis": "",
"visible_cp": "0"
},
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/sessions_permanentes.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id ou id_session_permanente | non | ID des sessions (séparé par des virgules) |
| id_module ou module_id | non | ID du Module (séparé par des virgules) |

## Afficher une Session Permanente

```json
{
"id": "39",
"salle_de_formation_id": "73",
"module_id": "320",
"responsable_id": "",
"mode_pricing": "forfaitaire",
"rythmes": [
"1"
],
"prix": "1800.0000",
"duree": "0",
"garantie": "0",
"active": "1",
"url_edof": "",
"created_at": "2022-10-18 16:44:51",
"updated_at": "2022-11-24 10:43:56",
"deleted_at": "",
"id_centre_de_formation": "0",
"pre_requis": "",
"visible_cp": "0"
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/sessions_permanentes.php?id=372`

## Ajouter une Session Permanente

```json
{
"id": "44",
"salle_de_formation_id": "69",
"module_id": "314",
"responsable_id": "",
"mode_pricing": "forfaitaire",
"rythmes": "",
"prix": "1700.0000",
"duree": "0",
"garantie": "0",
"active": "1",
"url_edof": "",
"created_at": "2022-12-20 14:59:18",
"updated_at": "2022-12-20 14:59:18",
"deleted_at": "",
"id_centre_de_formation": "0",
"pre_requis": "",
"visible_cp": "0"
}
```

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/sessions_permanentes.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id | oui | ID Session Permanente |
| salle_de_formation_id | oui | ID de la salle de formation (existence vérifiée) |
| id_module | oui | ID du Module (existence vérifiée) |
| id_centre_de_formation | non | ID du Centre de formation |
| mode_pricing | non | Mode de pricing ('forfaitaire' (default) ou 'assiduite') |
| prix | non | Prix |
| duree | non | Durée en heures, |
| rythmes | non | Rythmes de la formation () ('1' => 'En journée','2' => 'En soirée','3' => 'En semaine','4' => 'Le week-end','5' => 'Temps plein','6' => 'Temps partiel','7' => 'Plusieurs rythmes possibles') |
| id_responsable | non | ID du Responsable Administrateur (existence vérifiée) |
| active | non | Session ouverte (booléen) |
| garantie | non | Session garantie (booléen) |
| pre_requis | non | Prérequis (format HTML) |
| url_edof | non | URL de l'Action (optionnel) |

## Modifier une Session Permanente

```json
{
"id": "44",
"salle_de_formation_id": "69",
"module_id": "314",
"responsable_id": "",
"mode_pricing": "forfaitaire",
"rythmes": "",
"prix": "1200.0000",
"duree": "0",
"garantie": "0",
"active": "1",
"url_edof": "",
"created_at": "2022-12-20 14:59:18",
"updated_at": "2022-12-20 15:02:45",
"deleted_at": "",
"id_centre_de_formation": "0",
"pre_requis": "",
"visible_cp": "0"
}
```

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/sessions_permanentes.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id | non | ID Session Permanente |
| salle_de_formation_id | non | ID de la salle de formation (existence vérifiée) |
| id_centre_de_formation | non | ID du Centre de formation |
| mode_pricing | non | Mode de pricing ('forfaitaire' (default) ou 'assiduite') |
| prix | non | Prix |
| duree | non | Durée en heures, |
| rythmes | non | Rythmes de la formation () ('1' => 'En journée','2' => 'En soirée','3' => 'En semaine','4' => 'Le week-end','5' => 'Temps plein','6' => 'Temps partiel','7' => 'Plusieurs rythmes possibles') |
| id_responsable | non | ID du Responsable Administrateur (existence vérifiée) |
| active | non | Session ouverte (booleen) |
| garantie | non | Session garantie (booleen) |
| pre_requis | non | Prérequis (format HTML) |
| url_edof | non | URL de l'Action (optionnel) |

## Supprimer une Session Permanente

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/sessions_permanentes.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id | oui | ID Session Permanente (existence vérifiée) |
