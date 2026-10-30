# Documentation technique API Dendreo (partie 4/7)

Source : https://developers.dendreo.com/ — Cette partie couvre : Actions de Formation, Créneaux, Inscription d'un participant.

# Actions de Formation

## Lister toutes les Actions de Formation

```json
[
{
"id_action_de_formation": "37",
"id_centre_de_formation": "0",
"id_salle_de_formation": "0",
"numero": "1",
"numero_complet": "",
"numero_comptable": "",
"type": "intra",
"intitule": "Intitulé",
"description": "Description",
"mode_organisation" : "mode organisation",
"id_entreprise": "4",
"id_contact": "4",
"id_etape_process": "10",
"date_debut": "2016-01-20 09:00:00",
"date_fin": "2016-01-21 16:00:00",
"date_etape_realisation": "2016-01-23 16:21:44",
"date_etape_archivage": "2016-02-06 14:17:06",
"date_etape_echec": "0000-00-00 00:00:00",
"nb_participants_min": "0",
"nb_participants_max": "12",
"objectif": "autre",
"nature": "2",
"inscription_online": "1",
"include_in_bpf": "1",
"total_heures_participants": "14",
"total_participants": "10",
"categorie_module_id": "9",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1",
"pourcentage_planification": 70,
"emargements_url": "https://extranet-demo.dendreo.com/formations/PemelmMaKB"
}
]
```

Accède à toutes les actions de formation présentes sur Dendreo.

Il est possible d'afficher des données supplémentaires pour les actions de formation en renseignant le paramètre `include`.

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?include=stats,modules,participants,formateurs,entreprises,creneaux,visuel,salles,etapeProcess,recettes,preinscriptions`

Dans le cas de l'utilisation de `?include=modules`, si l'action de formation est constituée de modules composés, la liste des modules sera celle des modules simples composant ces modules et les informations du module parent seront présentes, pour chaque module, dans la clef `module_parent`.

Il est possible de filtrer les actions de formation via les paramètres suivant :

`nb_jours` : les actions de formation ajoutées et/ou modifiées sur les N derniers jours

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?nb_jours=3`

`type` : les actions de formation de type "inter", "intra" ou "hors_formation"

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?type=inter`

`id_entreprise` : les actions de formation INTRA liées à l'entreprise sélectionnée

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?type=intra&id_entreprise=38`

`id_module` : les actions de formation qui contiennent le module sélectionné

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?id_module=657`

`id_salle_de_formation` : les actions de formation qui ont au moins un lieu correspondant à cette salle

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?id_salle_de_formation=2`

`id_formateur` : les actions de formation qui ont ce formateur staffé à au moins 1 créneau

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?id_formateur=56`

`numero_complet` : l'action de formation portant ce numero complet

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?numero_complet=ADF_2019001`

`id_centre_de_formation` : les actions de formation qui sont rattachées à ce centre de formation

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?id_centre_de_formation=1`

`id_externe` : l'action de formation portant cet id externe

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?id_externe=1`

Il est enfin possible de filtrer les actions de formations sur les attributs `intitule` ou `numero_complet` via l'argument `search` (recherche partielle).

### Pré-inscriptions

En ajoutant `include=preinscriptions` à votre requête, vous obtenez des compteurs sur les pré-inscriptions enregistrées depuis le Catalogue Public sur chaque Action de Formation, selon deux angles : le nombre de pré-inscriptions, et le nombre de participants qu'elles concernent. Les deux diffèrent, car une même pré-inscription peut porter sur plusieurs participants.

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?include=preinscriptions`

```json
{
"preinscriptions": {
"nb_preinscriptions": "9",
"nb_participants": "12",
"nb_preinscriptions_a_traiter": "3",
"nb_participants_a_traiter": "5",
"nb_preinscriptions_en_attente": "1",
"nb_participants_en_attente": "1",
"nb_preinscriptions_paiement_attente": "1",
"nb_participants_paiement_attente": "2",
"nb_preinscriptions_validees": "3",
"nb_participants_validees": "3",
"nb_preinscriptions_refusees": "1",
"nb_participants_refusees": "1"
}
}
```

Toutes ces clés sont regroupées dans l'objet `preinscriptions`, où `nb_participants` désigne les participants concernés par une pré-inscription, à ne pas confondre avec le `nb_participants` renvoyé à la racine par `include=participants`.

| Statut | Nombre de pré-inscriptions | Nombre de participants concernés |
| --- | --- | --- |
| Tous statuts confondus | nb_preinscriptions | nb_participants |
| À traiter | nb_preinscriptions_a_traiter | nb_participants_a_traiter |
| En attente de validation | nb_preinscriptions_en_attente | nb_participants_en_attente |
| En attente de paiement | nb_preinscriptions_paiement_attente | nb_participants_paiement_attente |
| Validées | nb_preinscriptions_validees | nb_participants_validees |
| Refusées | nb_preinscriptions_refusees | nb_participants_refusees |

### Attention, par défaut, seules les actions de formation de la dernière année sont retournées !

Mais, comme indiqué dans la section recherche/filtre, vous pouvez filtrer les Actions de Formation selon leur date de début ou de fin pour étendre cette sélection ou affiner votre recherche.

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?ended_after=2020-12-31`

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/actions_de_formation.php`

## Listing pour Catalogue public

Si vous souhaitez afficher un petit widget sur votre site web qui indique par exemple "Nos 3 prochaines sessions de formation", vous pouvez utiliser cet endpoint spécial qui a pour effet de vous retourner une liste pré-compilées de prochaines Actions de Formation.

Il ne s'agit pas exactement de l'objet Action de Formation, le retour est un mélange d'informations simples du Module, et de l'Action de Formation, ainsi que certaines infos concernant le prix, le remplissage et le lieux de la session.

Cet endpoint a l'avantage de filtrer automatiquement les Modules et Actions de Formation pour ne prendre en compte uniquement :

- les Modules qui sont présents dans votre Catalogue (pas les modules Hors Catalogue)
- les Modules des Actions de Formation qui sont configurées pour s'afficher sur votre Catalogue (automatique pour les Actions de Formation mono-Module, manuel pour les Actions de Formation multi-Module)
- les Modules des Actions de Formation dans le futur uniquement
- les Modules des Actions de Formation INTER uniquement (sauf réglage explicite différent)
- les Modules des Actions de Formation qui sont dans des étapes prévisionnelles uniquement (configurable)

Le résultat est donc identique à ce que notre option [Catalogue en ligne](https://www.dendreo.com/logiciel-de-gestion/catalogue-en-ligne/) affiche si vous l'utilisez.

```json
[
{
"intitule": "Intitule",
"date_debut": "2019-07-31 08:00:00",
"date_fin": "2019-07-31 17:00:00",
"id_action_de_formation": "193",
"id_lam": "112",
"id_module": "39",
"categorie": "Catégorie",
"slug_categorie": "https://pro.dendreo.com/demo/public/catalogue/categorie/1/categorie",
"remplissage": "2/5",
"total_participants": "2",
"nb_participants_max": "5",
"prix_formation": "100",
"prix_module": "300",
"slug": "https://pro.dendreo.com/demo/public/catalogue/formation/117/intitule/75",
"lieux": [
{
"intitule": "Salle 1",
"adresse": "4 rue du Test",
"ville": "Paris",
"code_postal": "75008",
"pays_alpha2": "fr",
"pays": "France",
"lien_google_maps": "",
"acces": "",
"telephone": "+33 01 02 03 04 05",
"email": "",
"accueil": "",
"nom_contact": ""
}
]
}
]
```

### Requête HTTP

Notez que l'endpoint n'est pas `actions_de_formation` !

`GET https://pro.dendreo.com/demo/api/catalogue_prochaines_sessions.php`

Il est possible de récupérer l'URL du `visuel` associé à chaque Module, dans la réponse, en rajoutant `include=visuel` à votre requête.

Exemple : `GET https://pro.dendreo.com/demo/api/catalogue_prochaines_sessions.php?include=visuel`

Il est possible de récupérer la moyenne de satisfaction associé à chaque Module, dans la réponse, en rajoutant `include=satisfaction` à votre requête.

Exemple : `GET https://pro.dendreo.com/demo/api/catalogue_prochaines_sessions.php?include=satisfaction`

Il est possible de récupérer les Créneaux dans la réponse, en rajoutant `include=creneaux` à votre requête.

Exemple : `GET https://pro.dendreo.com/demo/api/catalogue_prochaines_sessions.php?include=creneaux`

Il est possible de récupérer les Salles de chaque Créneaux dans la réponse, en rajoutant `include=creneaux,creneaux.salle` (les 2 sont nécessaires) à votre requête.

Exemple : `GET https://pro.dendreo.com/demo/api/catalogue_prochaines_sessions.php?include=creneaux,creneaux.salle`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| limit | non | Nombre d'Actions de Formation renvoyées (défaut: 10) |
| id_centre_de_formation | non | Id du centre de formation à afficher |
| id_module | non | Id du Module pour filtre |
| id_categorie | non | Id de la Catégorie pour filtre |
| show_inter_only | non | Si mis à "true", alors les Intra sont exclues |

## Afficher une Action de Formation

```json
{
"id_action_de_formation": "37",
"id_centre_de_formation": "0",
"id_salle_de_formation": "0",
"numero": "1",
"numero_complet": "",
"numero_comptable": "",
"type": "intra",
"intitule": "Intitulé",
"description": "Description",
"mode_organisation" : "mode organisation",
"id_entreprise": "4",
"id_contact": "4",
"id_etape_process": "10",
"date_debut": "2016-01-20 09:00:00",
"date_fin": "2016-01-21 16:00:00",
"date_etape_realisation": "2016-01-23 16:21:44",
"date_etape_archivage": "2016-02-06 14:17:06",
"date_etape_echec": "0000-00-00 00:00:00",
"lieu": "",
"nb_participants_min": "0",
"nb_participants_max": "12",
"objectif": "autre",
"nature": "2",
"inscription_online": "1",
"include_in_bpf": "1",
"total_heures_participants": "14",
"total_participants": "10",
"nb_participants_inscrits": "6",
"nb_participants_non_inscrits": "2",
"nb_participants_en_attente": "1",
"tva_formation": "10.00",
"tva_hors_formation": "20.00",
"tva_frais": "5.5",
"categorie_module_id": "9",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1",
"pourcentage_planification": 70,
"emargements_url": "https://extranet-demo.dendreo.com/formations/PemelmMaKB"
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/actions_de_formation.php?id=37`

Il est possible de récupérer l'url du `visuel` associé à l'action de formation dans la réponse, en rajoutant `include=visuel` à votre requête.

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?id=37&include=visuel`

Les compteurs de pré-inscriptions sont eux aussi disponibles sur une Action de Formation précise, en rajoutant `include=preinscriptions` à votre requête.

Exemple : `GET https://pro.dendreo.com/demo/api/actions_de_formation.php?id=37&include=preinscriptions`

## Ajouter / Editer une Action de Formation

Les validations effectuées sont dépendantes du `type` fourni.

```json
{
"id_action_de_formation": "37",
"id_centre_de_formation": "0",
"id_salle_de_formation": "0",
"numero": "1",
"numero_complet": "",
"numero_comptable": "",
"type": "intra",
"intitule": "Intitulé",
"description": "Description",
"mode_organisation" : "mode organisation",
"id_entreprise": "4",
"id_contact": "4",
"id_etape_process": "10",
"date_debut": "2016-01-20 09:00:00",
"date_fin": "2016-01-21 16:00:00",
"date_etape_realisation": "2016-01-23 16:21:44",
"date_etape_archivage": "2016-02-06 14:17:06",
"date_etape_echec": "0000-00-00 00:00:00",
"lieu": "",
"nb_participants_min": "0",
"nb_participants_max": "12",
"objectif": "autre",
"nature": "2",
"inscription_online": "1",
"include_in_bpf": "1",
"total_heures_participants": "14",
"total_participants": "10",
"objectif_pedagogique": "Objectifs de la formation",
"modalites_pedagogiques": "Modalités pédagogiques",
"moyens_supports_pedagogiques": "Moyens et supports pédagogiques",
"public_vise": "Public visé",
"pre_requis": "Prérequis",
"infos_admission": "Informations sur l'admission",
"modalites_devaluation": "Modalités d’évaluation et de suivi",
"accessibilite": "Informations sur l'accessibilité",
"profil_formateurs": "Profil du / des Formateur(s)",
"nb_participants_inscrits": "6",
"nb_participants_non_inscrits": "2",
"nb_participants_en_attente": "1",
"categorie_module_id": "9",
"tva_formation": "10.00",
"tva_hors_formation": "20.00",
"tva_frais": "5.5"
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id | non | ID de l'Action de Formation (si vide -> ajout d'une nouvelle action de formation, sinon -> édition) |
| intitule | oui | Intitulé |
| intitule_court | non | Si non vide remplace l'Intitulé dans l'Agenda |
| type | oui | Type (inter ou intra, non disponible en édition) |
| include_in_bpf | oui | Booléen. Inclure dans le BPF, par défaut "1" |
| date_debut | oui | Date de début (format vérifié : "AAAA-MM-JJ" ou "AAAA-MM-JJ HH:MM:SS" , non disponible en édition) |
| date_fin | oui | (Obligatoire sauf si id_module est précisé) Date de fin (format vérifié : "AAAA-MM-JJ" ou "AAAA-MM-JJ HH:MM:SS", non disponible en édition) |
| id_module | non | Module à programmer directement dans l'ADF |
| has_dates_contractuelles | non | Booléen. Si non renseigné, la valeur de la configuration "Gestion des Dates par défaut" du centre sera utilisée. Permet de renseigner des dates de début et de fin sans indiquer d'id_module si sa valeur est à 1 |
| prix | non | Défini un prix personnalisé si id_module est également précisé |
| id_formateur | non | Permet de staffer automatiquement un Formateur si id_module est également précisé. Renseignez la valeur null ou 0 pour ne pas staffer le Formateur par défaut du Module (si renseigné) |
| id_entreprise_formateur | non | Permet de staffer automatiquement une Entreprise Sous-Traitante si id_module est également précisé. Renseignez la valeur null ou 0 pour ne pas staffer l'Entreprise Sous-Traitante par défaut du Module (si renseigné) |
| id_salle_de_formation | non | ID Salle de formation (existence vérifiée) |
| salle_client | non | Booléen. Si à "true", le paramètre id_entreprise doit être fourni et le type de l'Action de formation doit être "Intra". Une salle de formation interne au client sera récupérée ou créée et liée à l'Action de formation |
| id_centre_de_formation | non | ID Centre de formation (existence vérifiée, non disponible en édition) |
| id_entreprise | oui si (type = 'intra') | ID Entreprise (existence vérifiée, paramètre interdit si type = 'inter') |
| id_contact | non | ID Contact (existence vérifiée, paramètre interdit si type = 'inter') |
| id_externe_contact | non | ID Contact Externe (existence vérifiée, paramètre interdit si type = 'inter') |
| id_etape_process | non | ID Etape (existence vérifiée) |
| numero | non | Numéro |
| numero_complet | non | numero_complet |
| objectif_pedagogique | non | Objectif pédagoqique |
| modalites_pedagogiques | non | Modalités pédagogiques |
| moyens_supports_pedagogiques | non | Moyens et supports pédagogiques |
| public_vise | non | Public visé |
| pre_requis | non | Prérequis |
| infos_admission | non | Informations sur l'admission |
| modalites_devaluation | non | Modalités d'évaluation et de suivi |
| accessibilite | non | Informations sur l'accessibilité |
| profil_formateurs | non | Profil du / des Formateur(s) |
| categorie_module_id | non | Catégorie principale de l'ADF, correspond à un ID de Catégorie de Module (existence vérifiée) |
| nb_participants_min | non | Nombre minimum de participants |
| nb_participants_max | non | Nombre maximum de participants |
| id_responsable | non | Responsable Dendreo |
| id_commercial | non | Commercial rattaché à action de formation |
| mode_pricing | non | En ajout et en INTRA seulement. Valeurs : par_jour ou global |
| commentaires | non | Commentaires Internes |
| commentaires_agenda | non | Commentaires visibles sur l'agenda (disponible pour les Extranets) |
| esignature | non | Active ou non les émargements electroniques. Si absent, la configuration du centre sera utilisée. |
| remuneration_par_lmf | non | Active ou non l'option "Rémunération des Formateurs par Module" |
| objectif | non | Valeurs possibles : niveau12, niveau3, niveau4, niveau5, niveau2, cqp_sans, cqp_rs, cqp_non_rs, autres, bilan, accompagnement |
| nature | non | Valeurs possibles : 101 (Action de Formation), 102 (Bilan de compétences), 103 (Action permettant de faire valider les acquis de l'expérience), 104 (Action de Formation par apprentissage) |
| num_session_dpc | non | Numéro de session DPC : valeur modifiable si l'option "Affichage des options DPC sur les ADFs et Participants" est activé |
| tva_formation | non | Taux de TVA à appliquer sur la formation (doit faire partie des valeurs de tva autorisées) |
| tva_hors_formation | non | Taux de TVA à appliquer sur le hors formation (doit faire partie des valeurs de tva autorisées) |
| tva_frais | non | Taux de TVA à appliquer sur les frais (doit faire partie des valeurs de tva autorisées) |
| inscription_online | non | Booléen. Correspond au bouton "Catalogue Public (+EDOF) : Publier en ligne et accepter des inscriptions publiques" de l'interface. La valeur retournée en GET est forcée à 0 si l'étape (id_etape_process) n'est pas configurée comme prévisionnelle ou facturée. |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/actions_de_formation.php`

## Supprimer une Action de Formation

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/actions_de_formation.php?id=1`

`DELETE https://pro.dendreo.com/demo/api/actions_de_formation.php?id_action_de_formation=1,2,3`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id ou id_action_de_formation | oui | ID Action de Formation (existence vérifiée) |

# Créneaux

## Afficher les créneaux

Vous pouvez sélectionner les créneaux d'une seule Action de formation via l'attribut `id_action_de_formation`. De même vous pouvez sélectionner tous les créneaux d'un Lam (Lien Action de formation - Module) via l'attribut `id_lam` et tous les créneaux d'un Module (quelle que soit l'Action de formation) via l'attribut `id_module`.

Exemple : GET https://pro.dendreo.com/demo/api/creneaux.php?id_action_de_formation=12

Vous pouvez également inclure la liste des formateurs effectuant ces créneaux en ajoutant le paramètre `include=formateurs`

Exemple : GET https://pro.dendreo.com/demo/api/creneaux.php?id_action_de_formation=12&include=formateurs

Vous pouvez également inclure les replays Dendreo Live de ces créneaux en ajoutant le paramètre `include=replays` (détaillé plus bas)

Exemple : GET https://pro.dendreo.com/demo/api/creneaux.php?id_action_de_formation=12&include=replays

Vous pouvez également sélectionner les créneaux d'un seul Participant via l'attribut id_participant ou participant_id_externe en ajoutant le paramètre `id_participant=1912` ou `participant_id_externe=1912`

Exemple : GET https://pro.dendreo.com/demo/api/creneaux.php?id_participant=1912

Vous pouvez également sélectionner les créneaux d'un seul Formateur via l'attribut id_formateur ou formateur_id_externe en ajoutant le paramètre `id_formateur=1912` ou `formateur_id_externe=1912`

Exemple : GET https://pro.dendreo.com/demo/api/creneaux.php?id_formateur=1912

```json
[
{
"id_creneau": "864",
"id_add": "5",
"id_edit": "0",
"id_action_de_formation": "617",
"id_lam": "619",
"date_debut": "2017-01-10 10:00:00",
"date_fin": "2017-01-10 11:00:00",
"name": "",
"icon": "",
"id_salle_de_formation": "4",
"formation_presente": "1"
},
{
"id_creneau": "1544",
"id_add": "5",
"id_edit": "0",
"id_action_de_formation": "1297",
"id_lam": "1299",
"date_debut": "2017-01-11 10:00:00",
"date_fin": "2017-01-11 12:00:00",
"name": "",
"icon": "",
"id_salle_de_formation": "4",
"formation_presente": "0",
"url_connexion": "https://extranet-demo.dendreo.com/participants/liverooms/5",
"url_connexion_invite": "https://extranet-demo.dendreo.com/liverooms/xxxx"
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/creneaux.php`

## Afficher un créneau

```json
{
"id_creneau": "950",
"id_add": "5",
"id_edit": "0",
"id_action_de_formation": "617",
"id_lam": "619",
"date_debut": "2017-01-11 10:00:00",
"date_fin": "2017-01-11 12:00:00",
"name": "Théorie",
"icon": "star",
"id_salle_de_formation": "4",
"formation_presente": "1",
"url_connexion": "https://extranet-demo.dendreo.com/participants/liverooms/5",
"url_connexion_invite": "https://extranet-demo.dendreo.com/liverooms/xxxx"
"lcps": [
{
"id_lcp": "93",
"id_add": "0",
"id_edit": "0",
"id_creneau": "950",
"id_lmp": "28",
"id_lap": "25",
"presence": "1",
"justified": "0",
"justification": "",
"lap": {
"id_lap": "25",
"id_participant": "2",
"id_entreprise": "1",
"participant": {
"id_participant": "2",
"nom": "Duru",
"prenom": "Françoise",
"email": "",
"id_entreprise": "2",
"particulier": "0"
}
}
}
]
}
```

Vous pouvez inclure :

- la liste des formateurs effectuant ce créneau en ajoutant le paramètre `include=formateurs`
- la liste des participants (lcps) de ce créneau en ajoutant le paramètre `include=lcps`
- la liste des formateurs (lcfs) de ce créneau en ajoutant le paramètre `include=lcfs` (pour émargement formateur)
- le suivi pédagogique (suivi) de ce créneau en ajoutant le paramètre `include=suivi`
- les replays Dendreo Live de ce créneau en ajoutant le paramètre `include=replays`

```json
{
"id_creneau": "950",
"replays": [
{
"id": "12",
"id_creneau": "950",
"nom": "Matinée théorique",
"duree_secondes": "3612",
"date_add": "2017-01-11 12:05:44",
"visible": true,
"url": "https://xxxx.s3.eu-west-3.amazonaws.com/xxxx.mp4?X-Amz-Signature=xxxx"
}
]
}
```

Un créneau peut avoir plusieurs replays (un enregistrement par démarrage de la salle virtuelle), d'où un tableau. Seuls les replays dont le fichier n'a pas été supprimé (automatiquement après la période de rétention configurée, ou manuellement) sont retournés, y compris ceux masqués sur les extranets.

Le champ `visible` indique si le replay est affiché sur les extranets (`true`) ou masqué (`false`).

L'`url` est un lien de téléchargement direct du fichier `.mp4`, **valable 24 heures**. Elle est donc à consommer pour rapatrier le fichier, et non à stocker en base ou à publier telle quelle : passé ce délai, il faut rappeler l'endpoint pour obtenir une nouvelle url. Le champ `nom` est l'intitulé donné au replay dans Dendreo ; il est vide tant que personne ne l'a renseigné.

Le champ `duree_secondes` est mesuré lors de la transcription IA du replay : il vaut `null` si l'option n'est pas active, ou si la transcription n'a pas encore été produite.

Un `lcp` est le lien entre un `creneau` et un `lap`, puis le `lap`, fait le lien avec le `participant` à proprement parlé. Dans le `lcp` vous avez accès aux variables concernant les présences, et l'émargement dans "emargement_count" (vaut 1 si signature, 0 si absence de signature)

Un `lcf` est le lien entre un `creneau` et un `laf`, puis le `laf`, fait le lien avec le `formateur` à proprement parlé. Dans le `lcf` vous avez accès à l'émargement dans "emargement_count" (vaut 1 si signature, 0 si absence de signature)

Exemple : GET https://pro.dendreo.com/demo/api/creneaux.php?id=950&include=lcps

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/creneaux.php?id=950`

## Ajouter / Editer un Créneau

```json
{
"id_lam": "120",
"date_debut": "2021-07-21 13:30:00",
"date_fin": "2021-07-21 17:45:00",
"name": "Intitulé du créneau",
"id_salle_de_formation": "",
"date_edit": "2021-07-21 14:51:11",
"date_add": "2021-07-21 14:51:11",
"id_creneau": "328",
"id_add": "0",
"id_edit": "0"
}
```

Pour ajouter un Créneau vous avez le choix entre 3 solutions :

- Fournir directement `id_lam`
- Fournir `id_action_de_formation` ET `id_module`
- Fournir `id_externe_action_de_formation` ET `id_externe_module`

Dans les deux derniers cas, la première paire Action de Formation/Module sera prise en compte au cas où il y aurait plusieurs fois le même Module au sein d'une même Action de Formation.

Pour editer un Créneau :

- Fournir directement `id`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id | non | ID du Créneau (si vide -> ajout d'un nouveau Créneau, sinon -> édition du Créneau existant) |
| id_lam | oui | Obligatoire sauf si id_action_de_formation ET id_module sont fournis ou id_externe_action_de_formation ET id_externe_module sont fournis |
| id_action_de_formation ou id_module | oui | Obligatoire sauf si id_lam, id_externe_action_de_formation ou id_externe_module sont fournis |
| id_externe_action_de_formation ou id_externe_module | oui | Obligatoire sauf si id_lam, id_action_de_formation ou id_module |
| date | oui | format AAAA-MM-JJ |
| heure_debut | oui | format HH:MM |
| heure_fin | oui | format HH:MM (doit être sur un interval de 5 minutes pleines) |
| name | non | intitule spécifique du Créneau |
| id_salle_de_formation | non | id d'une Salle (existence vérifiée). Obligatoire si url_participants est renseignée |
| url_participants | non | URL de connexion pour les Participants (si la Salle est une Salle virtuelle) |
| url_formateurs | non | URL de connexion pour les Formateurs (si la Salle est une Salle virtuelle et que url_participants est renseignée) |
| delete_absence | non | Booléen. Si 1, supprime les absences et émargements formateur |
| suivi | non | Contenu du suivi pédagogique |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/creneaux.php`

## Supprimer un ou plusieurs Créneaux

Vous pouvez supprimer un ou plusieurs créneaux en spécifiant leur(s) identifiant(s) via le paramètre `id` (ou `id_creneau`). Les identifiants peuvent être fournis sous forme d’une liste séparée par des virgules.

Exemples :

- `DELETE https://pro.dendreo.com/demo/api/creneaux.php?id=328`
- `DELETE https://pro.dendreo.com/demo/api/creneaux.php?id=328,329`
- `DELETE https://pro.dendreo.com/demo/api/creneaux.php?id_creneau=328`

Contraintes :

- Un créneau ne peut pas être supprimé s'il n'est pas éditable, c'est-à-dire :
  - Des présences ou absences ont été renseignées pour ce créneau
  - Des factures de frais pédagogiques existent pour ce créneau
- Si au moins un créneau de la liste n'est pas éditable, aucun créneau n'est supprimé.

Codes de réponse :

- 200 : Suppression effectuée. Le corps de la réponse peut être vide.
- 422 : Requête non traitable si un ou plusieurs créneaux ne sont pas éditables.
- 404 : Paramètre `id`/`id_creneau` manquant ou vide.

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id (ou id_creneau) | oui | Identifiant du(des) Créneau(x) à supprimer |

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/creneaux.php`

# Inscription d'un participant

## Afficher les inscriptions d'une action de formation

Attention, la sélection d'une action de formation, via `id_action_de_formation`, `id_participant`, `id_entreprise` ou `num_dossier_cpf` est obligatoire.

Il est possible d'enrichir la réponse de l'API avec diverses informations supplémentaires grâce au paramètre `include`.

Vous pouvez ainsi :

- ajouter les détails du participant via `include=participant` (exemple : GET https://pro.dendreo.com/demo/api/laps.php?id_entreprise=371&include=participant)
- enrichir les informations de l'inscription d'un participant avec les modules via `include=lmps` (exemple : GET https://pro.dendreo.com/demo/api/laps.php?id_entreprise=371&include=lmps)
- combiner plusieurs inclusions comme `include=lmps,participant` (exemple : GET https://pro.dendreo.com/demo/api/laps.php?id_entreprise=371&include=lmps,participant)
- accéder à plus de détails en incluant les créneaux avec `include=lcps` (exemple : GET https://pro.dendreo.com/demo/api/laps.php?id_entreprise=371&include=lcps)
- accéder au suivi pédagogique lié au participant avec `include=suivi` (exemple : GET https://pro.dendreo.com/demo/api/laps.php?id_entreprise=371&include=suivi)

Chaque inscription retournée inclut également le champ `duree_jours_formation`, qui correspond au nombre de jours distincts de formation suivis par le Participant (calculé à partir des créneaux des Modules auxquels il est inscrit).

```json
[
{
"id_lap": "950",
"id_action_de_formation": "330",
"id_entreprise": "170",
"id_participant": "0",
"satisfaction_status": "0",
"status": "1",
"source": "dendreo",
"inscription_lmp": "1",
"id_groupe": "1",
"duree_jours_formation": 3,
"lmps": [
{
"id_lmp": "182",
"id_lam": "799",
"status": "1",
"prix": "670.00",
"prix_personnalise": "1",
"total_heures_presence": "0.00"
}
],
"participant" : {
"id_participant": "17",
"id_add": "0",
"id_edit": "0",
"id_delete": "0",
"civilite": "Mme",
"nom": "Duru",
"prenom": "Françoise"
...
}
}
]
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/laps.php?id_action_de_formation=330`

## Afficher une inscription

```json
{
"id_lap": "950",
"id_action_de_formation": "330",
"id_entreprise": "170",
"id_participant": "0",
"satisfaction_status": "0",
"status": "1",
"source": "dendreo",
"inscription_lmp": "1",
"id_groupe": "1",
"lmps": [
{
"id_lmp": "182",
"id_lam": "799",
"status": "1",
"prix": "670.00",
"prix_personnalise": "1",
"total_heures_presence": "0.00"
}
],
"participant" : {
"id_participant": "17",
"id_add": "0",
"id_edit": "0",
"id_delete": "0",
"civilite": "Mme",
"nom": "Duru",
"prenom": "Françoise"
...
}
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/laps.php?id=950`

## Afficher toutes les inscriptions d'un Participant

Il est possible d'afficher l'ensemble des inscriptions d'un Participant sur l'ensemble des Actions de Formation en indiquant uniquement l'`id_participant`.

Exemple : GET https://pro.dendreo.com/demo/api/laps.php?id_participant=117

Il est également possible d'enrichir les informations de chaque inscription d'un Participant via le paramètre `include=lmps` afin de voir le détail des Modules (via l'`id_lam`) auxquels le Participant est inscrit pour chaque Action de Formation. Mais aussi d'ajouter les informations de l'action de formation via le paramètre `include=action_de_formation` pour récupérer par exemple son intitulé, son type, ses dates de début et de fin, ou son étape.

Exemple : GET https://pro.dendreo.com/demo/api/laps.php?id_participant=117&include=lmps

```json
{
"id_lap": "950",
"id_action_de_formation": "330",
"id_entreprise": "170",
"id_participant": "117",
"satisfaction_status": "0",
"status": "1",
"source": "dendreo",
"inscription_lmp": "1",
"id_groupe": "1",
"lmps": [
{
"id_lmp": "182",
"id_lam": "799",
"status": "1",
"prix": "670.00",
"prix_personnalise": "1",
"total_heures_presence": "0.00"
}
],
"participant" : {
"id_participant": "117",
"id_add": "0",
"id_edit": "0",
"id_delete": "0",
"civilite": "Mme",
"nom": "Duru",
"prenom": "Françoise"
...
}
},
{
"id_lap": "992",
"id_action_de_formation": "451",
"id_entreprise": "170",
"id_participant": "117",
"satisfaction_status": "0",
"status": "1",
"source": "dendreo",
"inscription_lmp": "1",
"id_groupe": "1",
"lmps": [
{
"id_lmp": "234",
"id_lam": "832",
"status": "1",
"prix": "670.00",
"prix_personnalise": "1",
"total_heures_presence": "0.00"
}
],
"participant" : {
"id_participant": "117",
"id_add": "0",
"id_edit": "0",
"id_delete": "0",
"civilite": "Mme",
"nom": "Duru",
"prenom": "Françoise"
...
}
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/laps.php?id_participant=117`

## Ajouter / Editer une Inscription

Il est par ailleurs possible d'ajouter un Participant "Non identifié" (à renseigner ultérieurement dans Dendreo) en ne renseignant pas l'`id_participant` (En Inter, un id_entreprise est requis). Pour ajouter ajouter plusieurs participants non identifiés d'un coup, utilisez le paramètre `nb_participants_anonymes`. Quand une entreprise a déjà des participants non identifiés et que vous souhaitez en ajouter d'autres, vous devez spécifier obligatoirement `nb_participants_anonymes` et l'`id_entreprise`.

```json
{
"id_lap": "950",
"id_action_de_formation": "330",
"id_entreprise": "170",
"id_participant": "0",
"satisfaction_status": "0",
"status": "1",
"source": "dendreo",
"inscription_lmp": "1",
"id_groupe": "1",
"total_heures_presence": "3",
"presence_percent": "42.86",
"total_heures_absence": "4",
"absence_percent": "57.14",
"presence": "INC.",
"duree_jours_formation": 3
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_lap | non | ID du Lap (si vide -> inscription du Participant à l'ADF, sinon -> édition de l'inscription existante) |
| id_action_de_formation | oui | ID action de formation (existence vérifiée) |
| id_participant | non | ID participant (existence vérifiée, entreprise vérifiée) |
| id_entreprise | non | sauf si id_participant non fourni en Inter : ID entreprise (existence vérifiée) |
| num_dossier_cpf | non | Numéro de dossier CPF |
| id_groupe | non | ID du groupe auquel rattacher le Lap |
| prix | non | Prix personnalisé par Participant (Valable uniquement dans le cas où l'action de formation ne contient qu'un seul Module) |
| nb_participants_anonymes | non | Permet d'ajouter des Participants anonymes (ne pas préciser id_participant dans ce cas) |

### Autres paramètres optionnels

| Intitulé | Description |
| --- | --- |
| marquer_present | Si vaut "true", le Participant est marqué présent à tous les créneaux déjà passés |
| disable_inscription_auto | Si ce paramètre est à 1, alors le Lap est ajouté mais il n'est pas inscrit aux Modules de formation |
| force_sync_lms | Si ce paramètre est à 1, alors en cas de Module e-learning avec synchronisation LMS, l'inscription sur la plateforme est faite immédiatement, au lieu d'être faite à la date de début de la formation. Notez que si la formation a déjà commencé, il est nécessaire de passer ce paramètre à 1 si vous souhaitez que l'inscription côté LMS soit faite automatiquement. Ce paramètre n'est pris en compte qu'à la création de l'Inscription. |
| lms_no_mail | Si ce paramètre est à 1, alors en cas de Module e-learning avec synchronisation LMS, aucun mail n'est envoyé au Participant. Ce paramètre n'est pris en compte qu'à la création de l'Inscription. |
| suivi | Contenu du suivi pédagogique de l'inscription (un suivi par Lap : un Participant inscrit à deux actions de formation a deux suivis distincts). Remplace le contenu du suivi existant ; une valeur vide vide ce contenu, et ne crée pas de suivi s'il n'en existe pas encore. Quand un suivi est enregistré, la réponse le contient dans le champ suivi. |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/laps.php`

## Supprimer une Inscription

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/laps.php?id_lap=1,2,3`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_lap | oui | ID Lap (existence vérifiée) |
