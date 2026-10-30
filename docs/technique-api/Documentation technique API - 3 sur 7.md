# Documentation technique API Dendreo (partie 3/7)

Source : https://developers.dendreo.com/ — Cette partie couvre : Participants, Tâches, Etapes, Centres de formation, Salles de formation.

# Participants

## Lister tous les participants

```json
[
{
"id_participant": "17",
"id_add": "0",
"id_edit": "0",
"id_delete": "0",
"civilite": "Mme",
"nom": "Duru ",
"prenom": "Françoise ",
"email": "",
"commentaires": "",
"portable": "",
"fonction": "Assistante RH",
"statut_bpf": "salarie",
"date_de_naissance": "0000-00-00",
"departement_naissance": "",
"adresse": "",
"code_postal": "",
"ville": "",
"pays_alpha2": "",
"pays": "",
"id_entreprise": "4",
"particulier": "0",
"id_externe": "",
"lmsuniversel_user_id": "",
"tslearning_user_id": "",
"moodle_user_id": "",
"thinkific_user_id": "",
"dokeos_user_id": "",
"global_visible": "1",
"id_contact": "",
"formateur_lie_id": "",
"responsable_type": "",
"responsable_id": "",
"newsletter_optin": "0",
"message_extranet": "",
"nom_naissance": "",
"pays_naissance_alpha2": "",
"pays_naissance": "",
"langue_principale": "",
"langues_secondaires": "",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1",
"extranet_url": "https://extranet.centredemo.com",
"id_centre_de_formation": "1,2",
"extranet_code": "012-345-678",
"extranet_autologin_url": "https://extranet.centredemo.com/autologin/012-345-678"
}
]
```

Il est possible de n'afficher que les participants appartenants à une entreprise en renseignant l'attribut `id_entreprise`.

Exemple : `GET https://pro.dendreo.com/demo/api/participants.php?id_entreprise=4`

Il est aussi possible de filtrer les participants sur les attributs `nom`, `email` ou `date_de_naissance` (format `“AAAA-MM-JJ” ou “JJ/MM/AAAA”`) (via l'attribut `search` qui fera une recherche "OR" sur `email`, `nom` ou `date_de_naissance`). Si vous souhaitez chercher juste sur l'email ou le nom (ou faire une recherche "AND"), vous pouvez le faire via les attributs `email` ou `nom` en GET qui sont aussi acceptés (par exemple `participants.php?email=test@example.com&nom=dupont` pour chercher les participants ayant cet email ET ce nom). Vous pouvez aussi inclure les informations de l'entreprise via l'attribut `include`.

Exemple : `GET https://pro.dendreo.com/demo/api/participants.php?search=user@domain.tld`

Exemple : `GET https://pro.dendreo.com/demo/api/participants.php?include=entreprise`

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/participants.php`

## Afficher un participant

```json
{
"id_participant": "17",
"id_add": "0",
"id_edit": "0",
"id_delete": "0",
"civilite": "Mme",
"nom": "Duru ",
"prenom": "Françoise ",
"email": "",
"commentaires": "",
"portable": "",
"fonction": "Assistante RH",
"statut_bpf": "salarie",
"date_de_naissance": "0000-00-00",
"departement_naissance": "",
"adresse": "",
"code_postal": "",
"ville": "",
"pays_alpha2": "",
"pays": "",
"id_entreprise": "4",
"particulier": "0",
"id_externe": "",
"lmsuniversel_user_id": "",
"tslearning_user_id": "",
"moodle_user_id": "",
"thinkific_user_id": "",
"dokeos_user_id": "",
"global_visible": "1",
"id_contact": "",
"formateur_lie_id": "",
"responsable_type": "",
"responsable_id": "",
"newsletter_optin": "0",
"message_extranet": "",
"nom_naissance": "",
"pays_naissance_alpha2": "",
"pays_naissance": "",
"langue_principale": "",
"langues_secondaires": "",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1",
"extranet_url": "https://extranet.centredemo.com",
"extranet_code": "012-345-678",
"extranet_autologin_url": "https://extranet.centredemo.com/autologin/012-345-678"
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/participants.php?id=17`

ou

`GET https://pro.dendreo.com/demo/api/participants.php?code_extranet=123-456-789`

Il est possible de récupérer l'url de la `photo` de profil du participant dans la réponse, en rajoutant `include=photo` à votre requête.

Exemple : `GET https://pro.dendreo.com/demo/api/participants.php?id=5&include=photo`

Il est aussi possible de requêter directement les informations de l'entreprise, du contact principal de l'entreprise, et du contact secondaire de l'entreprise du ou des participants via l'attribut `include`.

Exemple : `GET https://pro.dendreo.com/demo/api/participants.php?id=12,14,28&include=entreprise,entreprise_contact,entreprise_contact_secondaire`

## Ajouter / Editer un participant

```json
{
"id_participant": "17",
"id_add": "0",
"id_edit": "0",
"id_delete": "0",
"civilite": "Mme",
"nom": "Duru ",
"prenom": "Françoise ",
"email": "",
"commentaires": "",
"portable": "",
"fonction": "Assistante RH",
"statut_bpf": "salarie",
"date_de_naissance": "0000-00-00",
"departement_naissance": "",
"adresse": "",
"code_postal": "",
"ville": "",
"pays_alpha2": "",
"pays": "",
"id_entreprise": "4",
"particulier": "0",
"id_externe": "",
"lmsuniversel_user_id": "",
"tslearning_user_id": "",
"moodle_user_id": "",
"thinkific_user_id": "",
"dokeos_user_id": "",
"global_visible": "1",
"id_contact": "",
"formateur_lie_id": "",
"responsable_type": "",
"responsable_id": "",
"newsletter_optin": "0",
"message_extranet": "",
"nom_naissance": "",
"pays_naissance_alpha2": "",
"pays_naissance": "",
"langue_principale": "",
"langues_secondaires": "",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1",
"extranet_url": "https://extranet.centredemo.com",
"id_centre_de_formation": "1,2",
"extranet_code": "012-345-678",
"extranet_autologin_url": "https://extranet.centredemo.com/autologin/012-345-678"
}
```

Attention, si votre Participant est un Particulier (personne en recherche d'emploi, indépendant, CPF Auotonme), vous ne devriez pas utiliser cet endpoint, mais plutôt l'endpoint Particuliers. [En savoir plus](https://doc.dendreo.com/article/62-entreprise-particuliers).

### Rattacher le participant à une entreprise

Il existe trois façons de rattacher un participant à une entreprise qui sont évaluées dans l'ordre de préférence suivant :

- `id_entreprise` : l'existence est vérifiée
- `entreprise_raison_sociale` : une recherche est effectuée sur le champs `raison_sociale`, le premier résultat est pris en compte
- `entreprise_id_externe` : une recherche est effectuée sur le champs `id_externe`, seul un résultat exact est pris en compte

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_participant | non | ID du Participant (si vide -> ajout d'un nouveau Participant, sinon -> édition) |
| id_entreprise | non | ID Entreprise (existence vérifiée) |
| nom | oui | Nom |
| prenom | oui | Prénom |
| civilite | non | Civilité (format vérifié) |
| fonction | non | Fonction |
| commentaires | non | Commentaires |
| portable | non | Portable |
| email | non | Email |
| date_de_naissance | non | Date de naissance (format "AAAA-MM-JJ" ou "JJ/MM/AAAA") |
| id_externe | non | ID Externe (synchro) |
| entreprise_raison_sociale | non | Liaison avec l'entreprise via la raison sociale |
| entreprise_id_externe | non | Liaison avec l'entreprise via son id externe |
| statut_bpf | non | Valeurs possibles : salarie, agent_public, non_salarie, recherche_emploi, benevole, apprenti, autre, hors_bpf. Pour un Participant Particulier : independant, individu, cpf_autonome, recherche_emploi, apprenti, hors_bpf. Une valeur absente de ces deux listes est refusée (erreur 422) |
| id_centre_de_formation | non | ID Centre de formation (existence vérifiée, possibilité de mettre des IDs séparés par une virgule) |
| id_contact | non | Liaison avec une fiche Contact (même personne, existence vérifiée, doit être de la même Entreprise) |
| formateur_lie_id | non | Liaison avec une fiche Formateur (même personne, existence vérifiée, doit être de la même Entreprise) |
| newsletter_optin | non | Accepte les newsletters |
| responsable_id | non | Liaison avec un Participant ou un Contact en tant que responsable hierarchique (existence vérifiée) |
| responsable_id_externe | non | Liaison avec un Participant ou un Contact en tant que responsable hierarchique (existence vérifiée) via son ID externe |
| responsable_type | non | Type du responsable hierarchique : participant ou contact |
| message_extranet | non | Message pour le Participant sur son accès extranet (au format HTML) |
| generer_code_extranet | non | Générer le code extranet immédiatement même si le Participant n'est encore inscrit à aucune Action de Formation |
| langue_principale | non | Langue principale du Participant (ISO 639-1) |
| langues_secondaires | non | Liste des langues secondaires du Participant (existence vérifiée, codes ISO 639-1 séparés par des virgules) |
| niveau_diplome | non | Valeurs possibles : sans, cqp, cap-bep, bac, bac+2, bac+3, bac+5, bac+8 |
| numero_compte_client | non | Numéro de compte client |
| numero_compte_client_auxiliaire | non | Numéro de compte client Auxiliaire |
| participant_commentaires | non | Commentaires liés au Participant (uniquement dans le cas d'un Particulier) |
| entreprise_commentaires | non | Commentaires liés a l'Entreprise (uniquement dans le cas d'un Particulier) |

Champs disponibles en modification uniquement

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| date_changement_entreprise_id | oui | Id de l'Entreprise concerné par la date de changement d'Entreprise |
| date_changement_entreprise | non | Date de changement d'Entreprise (format "AAAA-MM-JJ" ou "JJ/MM/AAAA") |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/participants.php`

## Supprimer un Participant

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/participants.php?id=1`

`DELETE https://pro.dendreo.com/demo/api/participants.php?id_participant=1,2,3`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id ou id_participant | oui | ID Participant (existence vérifiée) |

# Tâches

## Lister les tâches en attente sur les Extranets Participants

```json
[
{
"id_participant": "17",
"counts": {
"esignature": "2",
"esignature-doc": "2",
"satisfaction": {
"froid": "2",
"chaud": "1"
},
"auto-positionnement": {
"post": "4",
"pre": "1"
}
},
"taches": [
{
"type": "esignature",
"intitule": "Emargement électronique",
"id_adf": "462",
"id_lcp": "3249",
"creneau_date_debut": "2024-06-18 13:30:00",
"creneau_date_fin": "2024-06-18 15:30:00",
"url": "https://extranet.centredemo.com/participants/emargement/3249/create"
},
{
"type": "esignature-doc",
"intitule": "Signature électronique d'un document",
"id_media": "779",
"date": "2024-04-18 15:06:02",
"id_adf": "340",
"url": "https://extranet.centredemo.com/participants/signatures/4Ew07ZTbqmKmHYwVsluDHnNLohfslPe3/779/viewer"
},
{
"type": "satisfaction",
"intitule": "Questionnaire de Satisfaction",
"questionnaire_type": "Questionnaire à Chaud",
"id_adf": "462",
"id_lap": "1509",
"url": "https://extranet.centredemo.com/participants/gy60fzdfyu906wqmgd4n/satisfaction/1/edit"
},
{
"type": "satisfaction",
"intitule": "Questionnaire de Satisfaction",
"questionnaire_type": "Questionnaire à Froid",
"id_adf": "104",
"id_lap": "201",
"url": "https://extranet.centredemo.com/participants/3avkwbubvhxqmuyw02fg/satisfaction/2/edit"
},
{
"type": "auto-positionnement",
"intitule": "Questionnaire d'Auto-positionnement",
"positionnement_type": "Formulaire post-formation",
"id_adf": "339",
"id_lap": "303",
"url": "https://extranet.centredemo.com/participants/g543kl2ve2fehkuumlfc/post_formation/create"
},
{
"type": "auto-positionnement",
"intitule": "Questionnaire d'Auto-positionnement",
"positionnement_type": "Formulaire pré-formation",
"id_adf": "463",
"id_lap": "1514",
"url": "https://extranet.centredemo.com/participants/ne07pmtbje3frvbmuu9z/pre_formation/create"
}
]
}
]
```

Vous pouvez récupérer les tâches en attente sur les Extranets d'un ou plusieurs Participants.

`GET https://pro.dendreo.com/demo/api/taches.php?id=...`

L'un des paramètres `id` ou `code_extranet` est obligatoire :

- Le paramètre `id` peut contenir une liste d'ID de participants séparés par une virgule.
- Le paramètre `code_extranet` ne permet de récupérer qu'un seul participant.

Les différentes tâches en attente pour un Participant sont :

- Les émargements électroniques en cours (esignature)
- Les signatures électroniques en attente (esignature-doc)
- Les questionnaires de Satisfaction en attente (satisfaction)
- Les questionnaires d'Auto-positionnement en attente (auto-positionnement)

Il est possible de filtrer les tâches selon leur type, via l'attribut `types` en fournissant la liste des tâches séparées par une virgule.

Le paramètre `autologin=1` permet d'obtenir les URL avec l'autologin à l'extranet des Participants.

### Requêtes HTTP

Par ID d'un Participant :

`GET https://pro.dendreo.com/demo/api/taches.php?id=17`

Par ID d'un Participant avec autologin:

`GET https://pro.dendreo.com/demo/api/taches.php?id=17&autologin=1`

Liste de participants par IDs :

`GET https://pro.dendreo.com/demo/api/taches.php?id=17,18,19`

Par le code extranet d'un Participant :

`GET https://pro.dendreo.com/demo/api/taches.php?code_extranet=123-456-789`

Uniquement les emargements en cours et les documents à signer

Exemple : `GET https://pro.dendreo.com/demo/api/taches.php?id=17&types=esignature,esignature-doc`

# Etapes

## Lister toutes les étapes

```json
[
{
"id_etape_process": "2",
"intitule": "Réalisation",
"id_parent": "0",
"status": "1",
"ordre": "2",
"name": "real",
"cible": "intra"
}
]
```

Accède à toutes les étapes présentes sur Dendreo.

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/etapes.php`

## Afficher une étape

```json
{
"id_etape_process": "2",
"intitule": "Réalisation",
"id_parent": "0",
"status": "1",
"ordre": "2",
"name": "real",
"cible": "intra"
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/etapes.php?id=2`

# Centres de formation

## Lister tous les centres de formation

```json
[
{
"id_centre_de_formation": "1",
"raison_sociale": "Centre principal",
"nom_commercial": "Demo Formation"
}
]
```

Accède à tous les centres de formation présents sur Dendreo.

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/centres_de_formation.php`

## Afficher un centre de formation

```json
{
"id_centre_de_formation": "1",
"raison_sociale": "Centre principal",
"nom_commercial": "Demo Formation"
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/centres_de_formation.php?id=1`

# Salles de formation

## Lister toutes les salles de formation

```json
[
{
"id_salle_de_formation": "3",
"intitule": "Salle Einstein",
"color": "",
"status": "1",
"capacite_max": "20",
"adresse": "",
"code_postal": "",
"ville": "",
"pays_alpha2": "",
"pays": "",
"id_centre_de_formation": "1,2",
"lien_google_maps": "https://www.google.fr/maps",
"acces": "Porte extérieure : appuyer sur P",
"inside": "1",
"telephone": "01 23 45 67 89",
"email": "",
"accueil": "",
"nom_contact": "",
"commentaires_internes": "",
"no_conflits": "0",
"elearning": "0",
"url_connexion": "",
"emplacement_type": "CentresDeFormation",
"emplacement_id": "1",
"acces_handicapes": "1",
"acces_handicapes_desc": "Précisions sur l'accès aux personnes en situation de handicap",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1"
}
]
```

Accède à toutes les salles de formation présentes sur Dendreo.

L'emplacement de la salle peut être `CentresDeFormation` ou `Entreprise`. Dans les 2 cas, le champ `inside` peut être à 1 ou 0. Dans le cas où c'est une salle `elearning`, le champ `elearning` sera à 1, et le champ `inside` à 0.

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| inside | non | Permet de filtrer sur le champ "inside" (valeur : 0 ou 1) |
| emplacement_cible | non | Permet de filtrer sur le champ "Emplacement de la salle" (valeur : 'CentresDeFormation' ou 'Entreprise') |

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/salles_de_formation.php`

## Afficher une salle de formation

```json
{
"id_salle_de_formation": "4",
"intitule": "Salle Amandre",
"color": "",
"status": "1",
"capacite_max": "42",
"adresse": "",
"code_postal": "",
"ville": "",
"pays_alpha2": "",
"pays": "",
"id_centre_de_formation": "1,2",
"lien_google_maps": "",
"acces": "",
"inside": "1",
"telephone": "",
"email": "",
"accueil": "",
"nom_contact": "",
"commentaires_internes": "",
"no_conflits": "0",
"elearning": "0",
"url_connexion": "",
"emplacement_type": "CentresDeFormation",
"emplacement_id": "1",
"acces_handicapes": "1",
"acces_handicapes_desc": "Précisions sur l'accès aux personnes en situation de handicap",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1"
}
```

L'emplacement de la salle peut être `CentresDeFormation` ou `Entreprise`. Dans les 2 cas, le champ `inside` peut être à 1 ou 0. Dans le cas où c'est une salle `elearning`, le champ `elearning` sera à 1, et le champ `inside` à 0.

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/salles_de_formation.php?id=4`

## Ajouter une salle de formation

```json
{
"id_salle_de_formation": "4",
"intitule": "Salle Amandre",
"color": "",
"status": "1",
"capacite_max": "42",
"adresse": "",
"code_postal": "",
"ville": "",
"pays_alpha2": "",
"pays": "",
"id_centre_de_formation": "1,2",
"lien_google_maps": "",
"acces": "",
"inside": "1",
"telephone": "",
"email": "",
"accueil": "",
"nom_contact": "",
"commentaires_internes": "",
"no_conflits": "0",
"elearning": "0",
"url_connexion": "",
"emplacement_type": "CentresDeFormation",
"emplacement_id": "1",
"acces_handicapes": "1",
"acces_handicapes_desc": "Précisions sur l'accès aux personnes en situation de handicap",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1"
}
```

L'API ne gère que la création de Salles de formation, ni leur édition ni leur suppression. Un POST contenant un `id_salle_de_formation` renvoie une erreur `422` (Unprocessable Entity), et un `DELETE` une erreur `405` (Method Not Allowed) : l'édition et la suppression doivent se faire depuis Dendreo.

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| intitule | oui | Nom de la salle |
| emplacement_cible | oui | Emplacement de la salle ('cdf_outside', 'elearning', 'client', 'client_outside', 'interne' ou un id_centre_de_formation valide) |
| id_entreprise | oui si emplacement_cible = client ou client_outside | Entreprise lié à cette salle (existance vérifiée) |
| color | non | Couleur de la salle |
| id_centre_de_formation | non | Visiblité de la salle (possibilité de mettre des IDs séparés par une virgule) |
| capacite_max | non | Capaxité maximum de la salle |
| commentaires_internes | non | Commentaires internes de la salle |
| no_conflits | non | Détecter ou non les conflit de la salle (0 ou 1) |
| acces_handicapes | non | Accès aux personnes en situation de handicap (0 ou 1) |
| acces_handicapes_desc | non | Précisions sur l'accès aux personnes en situation de handicap |

Uniquement si `emplacement_cible` = `client_outside` ou `cdf_outside`

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| nom_contact | non | Nom du contact |
| adresse | non | Adresse de la salle |
| code_postal | non | Code postal de la salle |
| ville | non | Ville de la salle |
| pays | non | Pays. Le libellé doit correspondre à un pays reconnu dans la norme ISO-3166 |
| pays_alpha2 | non | Code ISO-3166-2 du Pays |
| telephone | non | Téléphone de la salle |
| email | non | Email de la salle (structure vérifiée) |
| lien_google_maps | non | Lien Google Maps |
| acces | non | Informations pratiques d'accès de la salle |
| accueil | non | Informations d'accueil de la salle |

Uniquement si `emplacement_cible` = `elearning`

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| url_connexion | non | Url de connexion de la salle |
