# Documentation technique API Dendreo (partie 2/7)

Source : https://developers.dendreo.com/ — Cette partie couvre : Formateurs, Entreprises, Contacts, Particuliers.

# Formateurs

## Lister tous les formateurs

```json
[
{
"id_formateur": "5",
"numero": "1",
"numero_complet": "",
"n_secu": "",
"civilite": "M.",
"nom": "Dupond",
"nom_jeune_fille": "",
"prenom": "Jacques",
"date_de_naissance": "1963-09-01",
"lieu_de_naissance": "LYON",
"nationalite": "Française",
"situation_familiale": "-",
"adresse": "33 rue Bichat",
"code_postal": "75006",
"ville": "PARIS",
"pays_alpha2" : "fr",
"pays" : "France",
"profession": "Formateur Professionnel d'Adultes",
"telephone_perso": "0676655443",
"telephone_pro": "0676655443",
"email_perso": "",
"email_pro": "contact@cformateur.fr",
"statut": "travailleur_independant",
"remu_horaire_par_defaut": "0.00",
"diplomes": "",
"contact_lie_id": "",
"participant_lie_ids": [],
"id_externe": "",
"id_centre_de_formation": "1,2",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1"
}
]
```

Accède à tous les formateurs présents sur Dendreo.

Il est possible de filtrer les formateurs via les paramètres suivants (vous pouvez faire plusieurs recherches d'un coup en séparant les keywords par des virgules) :

- `numero_complet` : Le numéro complet du formateur
- `nom` : Le nom du formateur
- `prenom` : Le prenom du formateur
- `email_pro` : L'adresse email professionnelle du formateur
- `telephone_perso` : Le numéro de téléphone personnel du formateur
- `telephone_pro` : Le numéro de téléphone professionnel du formateur
- `telephone` : Le numéro de téléphone personnel ou professionnel du formateur

Exemple : `GET https://pro.dendreo.com/demo/api/formateurs.php?numero_complet=FORM_2019001`

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/formateurs.php`

## Afficher un formateur

```json
{
"id_formateur": "5",
"numero": "1",
"numero_complet": "",
"n_secu": "",
"civilite": "M.",
"nom": "Dupond",
"nom_jeune_fille": "",
"prenom": "Jacques",
"date_de_naissance": "1963-09-01",
"lieu_de_naissance": "LYON",
"nationalite": "Française",
"situation_familiale": "-",
"adresse": "33 rue Bichat",
"code_postal": "75006",
"ville": "PARIS",
"pays_alpha2": "fr",
"pays": "France",
"profession": "Formateur Professionnel d'Adultes",
"telephone_perso": "0676655443",
"telephone_pro": "0676655443",
"email_perso": "",
"email_pro": "contact@cformateur.fr",
"statut": "travailleur_independant",
"remu_horaire_par_defaut": "0.00",
"diplomes": "",
"contact_lie_id": "",
"participant_lie_ids": [],
"id_externe": "",
"id_centre_de_formation": "1,2",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1"
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/formateurs.php?id=5`

Il est possible de récupérer l'url de la `photo` de profil du formateur dans la réponse, en rajoutant `include=photo` à votre requête.

Exemple : `GET https://pro.dendreo.com/demo/api/formateurs.php?id=5&include=photo`

## Ajouter / Editer un formateur

```json
{
"id_formateur": "5",
"id_add": "0",
"id_edit": "0",
"numero": "9",
"numero_complet": "FORM_2018009",
"numero_perso": "0",
"n_secu": "",
"civilite": "M.",
"nom": "Dupond",
"nom_jeune_fille": "",
"prenom": "Jacques",
"color": "",
"date_de_naissance": "1963-09-01",
"lieu_de_naissance": "LYON",
"nationalite": "Française",
"situation_familiale": "-",
"adresse": "33 rue Bichat",
"code_postal": "75006",
"ville": "PARIS",
"pays_alpha2": "fr",
"pays": "France",
"profession": "Formateur Professionnel d'Adultes",
"biographie_catalogue": "",
"telephone_perso": "0676655443",
"telephone_pro": "0676655443",
"email_perso": "",
"email_pro": "contact@cformateur.fr",
"statut": "Travailleur indépendant/gérant non salarié",
"statut_bpf": "Personne de votre organisme (CDI, CDD, occasionnel, bénévole)",
"mode_remu": "Horaire",
"remu_horaire_par_defaut": "0",
"key_uniq": "",
"contact_lie_id": "",
"participant_lie_id" : "",
"id_externe": "",
"id_centre_de_formation": "1,2",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1"
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_formateur | non | ID du Formateur (si vide -> ajout d'un nouveau Formateur, sinon -> édition) |
| nom | oui | Nom |
| prenom | oui | Prénom |
| civilite | non | Civilité (format vérifié) |
| date_de_naissance | non | Date de naissance (format "AAAA-MM-JJ" ou "JJ/MM/AAAA") |
| statut | non | travailleur_independant, cdi, cdd, occasionnel, benevoles, exterieur |
| statut_bpf | non | interieur, exterieur |
| centre_id | non | ID Centre de formation sur lequel statut_bpf interne s'applique (existence vérifiée) |
| mode_remu | non | Mode de rémunération : horaire, journalier |
| remu_horaire_par_defaut | non | Rémunération Horaire par défaut |
| remu_journaliere_par_defaut | non | Rémunération Journalière par défaut |
| n_secu | non | Numéro de sécurité sociale |
| num_da | non | Numéro de Déclaration d’Activité |
| lieu_de_naissance | non | Lieu de naissance |
| nationalite | non | Nationalité |
| situation_familiale | non | Situation familliale |
| adresse | non | Adresse (Rue) |
| code_postal | non | Code postal |
| ville | non | Ville |
| pays | non | Pays. Le libellé doit correspondre à un pays reconnu dans la norme ISO-3166 |
| pays_alpha2 | non | Code ISO-3166-2 du Pays |
| profession | non | Profession |
| biographie_catalogue | non | Biographie affichée sur le catalogue |
| telephone_perso | non | Téléphone perso |
| telephone_pro | non | Téléphone pro |
| email_perso | non | Email perso |
| email_pro | non | Email pro |
| contact_lie_id | non | ID du Contact lié (existence vérifiée et son Entreprise doit être identique à celle du Formateur) |
| participant_lie_id | non | ID du Participant lié (existence vérifiée et son Entreprise doit être identique à celle du Formateur. Ce Participant ne peut pas déjà être lié à un autre Formateur) |
| id_centre_de_formation | non | ID Centre de formation (existence vérifiée, possibilité de mettre des IDs séparés par une virgule) |
| langue_principale | non | Langue principale du Formateur (ISO 639-1) |
| langues_secondaires | non | Liste des langues secondaires du Formateur (existence vérifiée, codes ISO 639-1 séparés par des virgules) |
| competences_ids | non | ID des Compétences du Formateur, plusieurs ID possible (séparés par des virgules ex : 1,2,3) |
| competences_list | non | Label des Compétences du Formateur, plusieurs labels possible (séparés par des points-virgules ex : Management;Conseil;Informatique). Les Compétences seront créées si aucune correspondance exacte n'est trouvée |
| dispo_geo_ids | non | ID des Disponibilités géographiques du Formateur, plusieurs ID possible (séparés par des virgules ex : 1,2,3) |
| dispo_geo_list | non | Label des Disponibilités géographiques du Formateur, plusieurs labels possible (séparés par des points-virgules ex : Lyon;Marseille;Paris). Les Disponibilités géographiques seront créées si aucune correspondance exacte n'est trouvée |
| id_entreprise | non | Permet de rattacher le formateur à une Entreprise (Fournisseur) |
| entreprise_raison_sociale | non | Liaison avec l'entreprise via la raison sociale |
| entreprise_id_externe | non | Liaison avec l'entreprise via son id externe |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/formateurs.php`

## Supprimer un Formateur

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/formateurs.php?id=1`

`DELETE https://pro.dendreo.com/demo/api/formateurs.php?id_formateur=1,2,3`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id ou id_formateur | oui | ID Formateur (existence vérifiée) |

# Entreprises

## Lister toutes les entreprises

```json
[
{
"id_entreprise": "1375",
"numero": "1",
"numero_complet": "",
"numero_compte_client": "",
"siret": "1678637863 00013",
"raison_sociale": "EDF",
"appellation": "",
"sigle": "Entreprise privée",
"statut_juridique": "SARL",
"telephone": "04 76 76 54 53",
"fax": "04 67 65 53 64",
"site_internet": "",
"email_standard": "",
"adresse": "8 AVenue du Gal ",
"code_postal": "75002",
"ville": "Paris",
"pays_alpha2": "fr",
"pays": "France",
"facturation_raison_sociale": "",
"facturation_adresse": "",
"facturation_code_postal": "",
"facturation_ville": "",
"facturation_pays_alpha2": "",
"facturation_pays": "",
"mode_financement_par_defaut": "entreprise",
"nb_employes": "0",
"enjeu": "0",
"client": "0",
"fournisseur": "0",
"client_interne": "0",
"id_contact": "0",
"id_contact_secondaire": "0",
"commentaires": "",
"post_it_commercial": "",
"particulier": "0",
"id_externe": "",
"tva_formation": "",
"tva_frais": "",
"tva_hors_formation": "",
"num_tva_intra": "16786387 00013",
"id_centre_de_formation": "1,2",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1",
"ape_code": "3511Z",
"code_naf": {
"id_code_naf": "639",
"code_naf": "3511Z",
"intitule": "Production d'électricité"
}
}
]
```

Il est possible de filtrer les entreprises via les paramètres suivant :

`search` : La `raison_sociale` ou le `siret` de l'entreprise (recherche partielle)

Exemple : `GET https://pro.dendreo.com/demo/api/entreprises.php?search=EDF`

`numero_complet` : Le numéro complet de l'entreprise

Exemple : `GET https://pro.dendreo.com/demo/api/entreprises.php?numero_complet=ENT_2019001`

`particulier` : Filtrer pour avoir soit les Particuliers, soit les Entreprises (1 pour avoir uniquement les Particuliers, 0 pour avoir uniquement les Entreprises)

Exemple : `GET https://pro.dendreo.com/demo/api/entreprises.php?particulier=1`

`type` : Filtrer les entreprises :

- `nonclients` : qui ne sont ni Clientes, ni Fournisseurs
- `clients` : qui sont Clientes
- `fournisseurs` : qui sont Fournisseurs
- `supprimees` : désactivées

Exemple : `GET https://pro.dendreo.com/demo/api/entreprises.php?type=nonclients`

Il est possible d'afficher des statistiques supplémentaires en renseignant le paramètre `include` sur la valeur `stats`. Le retour ajoute "ca_facture" (chiffre d'affaire facturé), "ca_genere_formation" (chiffre d'affaire lié uniquement à la formation) et "recettes_with_previsionnal" (Recettes incluant prévisionnel),

Exemple : `GET https://pro.dendreo.com/demo/api/entreprises.php?include=stats`

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/entreprises.php`

## Afficher une entreprise

```json
{
"id_entreprise": "1375",
"numero": "1",
"numero_complet": "",
"numero_compte_client": "",
"siret": "1678637863 00013",
"raison_sociale": "EDF",
"appellation": "",
"sigle": "Entreprise privée",
"statut_juridique": "SARL",
"telephone": "04 76 76 54 53",
"fax": "04 67 65 53 64",
"site_internet": "",
"email_standard": "",
"adresse": "8 AVenue du Gal ",
"code_postal": "75002",
"ville": "Paris",
"pays_alpha2": "fr",
"pays": "France",
"facturation_raison_sociale": "",
"facturation_adresse": "",
"facturation_code_postal": "",
"facturation_ville": "",
"facturation_pays_alpha2": "",
"facturation_pays": "",
"mode_financement_par_defaut": "entreprise",
"nb_employes": "0",
"enjeu": "0",
"client": "0",
"fournisseur": "0",
"client_interne": "0",
"id_contact": "0",
"id_contact_secondaire": "0",
"commentaires": "",
"post_it_commercial": "",
"particulier": "0",
"id_externe": "",
"tva_formation": "",
"tva_frais": "",
"tva_hors_formation": "",
"num_tva_intra": "16786387 00013",
"id_centre_de_formation": "1,2",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1"
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/entreprises.php?id=1375`

## Ajouter / Editer une entreprise

Seule la présence de l'attribut `raison_sociale` est validée.

```json
{
"id_entreprise": "1375",
"numero": "1",
"numero_complet": "",
"numero_compte_client": "",
"numero_compte_client_auxiliaire": "",
"numero_comptable_adf": "",
"siret": "1678637863 00013",
"raison_sociale": "EDF",
"appellation": "",
"sigle": "Entreprise privée",
"statut_juridique": "SARL",
"telephone": "04 76 76 54 53",
"fax": "04 67 65 53 64",
"site_internet": "",
"email_standard": "",
"adresse": "8 Avenue du Gal ",
"code_postal": "75002",
"ville": "Paris",
"pays": "France",
"facturation_raison_sociale": "Facturation étrangère",
"facturation_adresse": "",
"facturation_code_postal": "",
"facturation_ville": "Utrech",
"facturation_pays_alpha2": "nl",
"mode_financement_par_defaut": "entreprise",
"nb_employes": "0",
"enjeu": "0",
"client": "0",
"fournisseur": "0",
"client_interne": "0",
"id_contact": "0",
"id_contact_secondaire": "0",
"commentaires": "",
"post_it_commercial": "",
"particulier": "0",
"id_externe": "",
"tva_formation": "",
"tva_frais": "",
"tva_hors_formation": "",
"num_tva_intra": "16786387 00013",
"id_centre_de_formation": "1,2",
"ical_url": "https://public.dendreo.com/demo/ical/nxlfbn57t75shd1q1h3flzsk5hwctyv77Anfhdxsl4tbhrjz8wb1"
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_entreprise | non | ID de l'Entreprise (si vide -> ajout d'une nouvelle Entreprise, sinon -> édition) |
| raison_sociale | oui | Raison sociale |
| siret | non | N° SIRET |
| num_tva_intra | non | N° TVA Intracommunautaire |
| num_tva_intra_auto | non | N° TVA Intracommunautaire automatique (1 ou 0), si 1, le numéro TVA sera généré automatiquement en fonction de la présence du SIRET, du pays_alpha2 = 'fr' et du Taux de TVA (formation) > 0% |
| numero_compte_client | non | N° Compte général |
| numero_compte_client_auxiliaire | non | N° compte tiers (auxiliaire) |
| appellation | non | Appellation |
| sigle | non | Sigle |
| statut_juridique | non | Statut juridique |
| telephone | non | Téléphone |
| fax | non | Fax |
| site_internet | non | Site internet |
| telephone | non | Téléphone |
| email_standard | non | Email standard |
| adresse | non | Adresse |
| code_postal | non | Code postal |
| ville | non | Ville |
| pays | non | Pays. Le libellé doit correspondre à un pays reconnu dans la norme ISO-3166 |
| pays_alpha2 | non | Code ISO-3166-2 du Pays |
| code_naf | non | Code Naf (alphanumerique, type 6201Z) |
| nb_employes | non | Nombre d'employés |
| commentaires | non | Commentaires |
| post_it_commercial | non | Texte du Post-it Actions Commerciales |
| id_administrateur | non | Commercial associé (existence vérifiée) |
| client | non | Client (1 ou 0) |
| fournisseur | non | Fournisseur (1 ou 0) |
| client_interne | non | Client interne (1 ou 0) |
| id_externe | non | ID externe (synchro) |
| facturation_raison_sociale | non | Raison sociale (facturation) |
| facturation_adresse | non | Adresse (facturation) |
| facturation_code_postal | non | Code postal (facturation) |
| facturation_ville | non | Ville (facturation) |
| facturation_pays | non | Pays (facturation). Le libellé doit correspondre à un pays reconnu dans la norme ISO-3166 |
| facturation_pays_alpha2 | non | Code ISO-3166 du Pays (facturation) |
| infos_adf | non | Rappel à afficher lors de la création d'une Opportunité, la programmation d’une formation ou à la réception d'une demande d'inscription pour ce client |
| entreprise_parente_id (ou id_entreprise_parente ou entreprise_id) | non | ID de l'Entreprise parente. Vous pouvez aussi utiliser : |
| entreprise_parente (ou entreprise_parente_raison_sociale) | non | Raison sociale de l'Entreprise parente, pour rechercher automatiquement un ID Entreprise parente |
| id_centre_de_formation | non | ID Centre de formation (existence vérifiée, possibilité de mettre des IDs séparés par une virgule) |
| delai_paiement | non | Délai de paiement ( 'reception'=> 'À réception', '5_j' => '5 jours', '10_j' => '10 jours', '15_j'=> '15 jours', '30_j'=> '30 jours', '30_j_fdm' => '30 jours fin de mois', '30_j_fdm_5' => '30 jours fin de mois le 5', '30_j_fdm_10' => '30 jours fin de mois le 10', '30_j_fdm_15' => '30 jours fin de mois le 15', 'fdm_30_j' => 'Fin de mois + 30 jours', '40_j' => '40 jours', '40_j_fdm' => '40 jours fin de mois', 'fdm_40_j' => 'Fin de mois + 40 jours', '45_j'=> '45 jours', '45_j_fdm' => '45 jours fin de mois', '45_j_fdm_15' => '45 jours fin de mois le 15', 'fdm_45_j' => 'Fin de mois + 45 jours', '50_j'=> '50 jours', '50_j_fdm' => '50 jours fin de mois', 'fdm_50_j' => 'Fin de mois + 50 jours', '60_j'=> '60 jours', '60_j_fdm' => '60 jours fin de mois', 'fdm_60_j' => 'Fin de mois + 60 jours', '90_j'=> '90 jours', '20_ms' => 'le 20 du mois suivant', 'manuel' => 'Manuel') |
| statut_bpf_participants_entreprise | non | Statut par défaut des participants de l'entreprise (salarie, agent_public, non_salarie, benevole, apprenti, autre, hors_bpf) |
| mode_financement_par_defaut | non | Mode de financement par défaut (entreprise, opca, public, public_client, sous_traitance) |
| has_chorus_pro_invoices | non | À déposer sur Chorus Pro ou non (1 ou 0) |
| tva_formation | non | Taux de TVA (formation) |
| tva_frais | non | Taux de TVA (frais annexes et recettes libres) |
| tva_hors_formation | non | Taux de TVA (hors formation) |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/entreprises.php`

## Supprimer une Entreprise

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/entreprises.php?id=1`

`DELETE https://pro.dendreo.com/demo/api/entreprises.php?id_entreprise=1,2,3`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id ou id_entreprise | oui | ID Entreprise (existence vérifiée) |

## Restaurer une Entreprise supprimée

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/entreprises.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id ou id_entreprise | oui | ID de l'Entreprise supprimée à restaurer |
| restore | oui | Doit valoir 1 |

# Contacts

## Lister tous les contacts

```json
[
{
"id_contact": "3",
"id_entreprise": "3",
"civilite": "Mme",
"nom": "Marue ",
"prenom": "",
"fonction": "Responsable Formation ",
"telephone_direct": "+33 01 02 03 04 05",
"portable": "",
"email": "maru@domaine.fr",
"particulier": "0",
"id_externe": "",
"id_centre_de_formation": "1,2",
"participant_lie_ids": [],
"formateur_lie_ids": []
}
]
```

Il est possible de n'afficher que les contacts appartenants à une entreprise en renseignant l'attribut `id_entreprise`. Il est aussi possible de filtrer les contacts sur les attributs `nom`, `email`, `telephone_direct` ou `portable` via l'argument `search` (recherche partielle).

Exemple : `GET https://pro.dendreo.com/demo/api/contacts.php?id_entreprise=3`

Il est également possible de n'afficher que les contacts d'un financeur externe en renseignant l'attribut `id_opca` (l'existence du financeur est vérifiée).

Exemple : `GET https://pro.dendreo.com/demo/api/contacts.php?id_opca=238`

Il est aussi possible de filtrer les contacts sur les attributs `nom` ou `email` ainsi que d'inclure les informations de l'entreprise via l'attribut `include`.

Exemple : `GET https://pro.dendreo.com/demo/api/contacts.php?include=entreprise`

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/contacts.php`

## Afficher un contact

```json
{
"id_contact": "3",
"id_entreprise": "3",
"civilite": "Mme",
"nom": "Marue ",
"prenom": "",
"fonction": "Responsable Formation ",
"telephone_direct": "+33 01 02 03 04 05",
"portable": "",
"email": "maru@domaine.fr",
"particulier": "0",
"id_externe": "",
"id_centre_de_formation": "1,2",
"participant_lie_ids": [],
"formateur_lie_ids": []
}
```

### Requête HTTP

`GET https://pro.dendreo.com/demo/api/contacts.php?id=3`

Il est possible de récupérer l'url de la `photo` de profil du contact dans la réponse, en rajoutant `include=photo` à votre requête.

Exemple : `GET https://pro.dendreo.com/demo/api/contacts.php?id=5&include=photo`

## Ajouter / Editer un contact

```json
{
"id_contact": "3",
"id_entreprise": "3",
"civilite": "Mme",
"nom": "Marue ",
"prenom": "",
"fonction": "Responsable Formation ",
"telephone_direct": "+33 01 02 03 04 05",
"portable": "",
"email": "maru@domaine.fr",
"particulier": "0",
"id_externe": "",
"id_centre_de_formation": "1,2",
"participant_lie_ids": [],
"formateur_lie_ids": []
}
```

### Rattacher le contact à une entreprise

Il existe trois façons de rattacher un contact à une entreprise qui sont évaluées dans l'ordre de préférence suivant :

- `id_entreprise` : l'existence est vérifiée
- `entreprise_raison_sociale` : une recherche est effectuée sur le champs `raison_sociale`, le premier résultat est pris en compte
- `entreprise_id_externe` : une recherche est effectuée sur le champs `id_externe`, seul un résultat exact est pris en compte

### Rattacher le contact à un financeur externe

Il est possible de rattacher un contact à un financeur externe (au lieu d'une entreprise) en renseignant l'attribut `id_opca` (l'existence du financeur est vérifiée, les financeurs désactivés sont acceptés).

Un contact ne peut pas être rattaché à la fois à une entreprise et à un financeur : une requête contenant un `id_opca` sur un contact lié à une entreprise (ou l'inverse) est rejetée.

Envoyer `id_opca=0` détache le contact de son financeur.

### Configurer le type de contact

Il est possible de choisir si ce contact sera le contact principal, secondaire, ou facturation de son entreprise.

Pour cela, ajoutez un des paramètres suivant à votre requête :

`contact_principal`: true

`contact_secondaire`: true

`contact_facturation`: true

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_contact | non | ID du Contact (si vide -> ajout d'un nouveau Contact, sinon -> édition) |
| id_entreprise | oui (sauf pour édition ou contact financeur) | ID Entreprise (existence vérifiée), indispensable pour rattacher le contact à une entreprise à sa création |
| id_opca | non | ID Financeur externe (existence vérifiée), pour rattacher le contact à un financeur au lieu d'une entreprise (exclusif avec le rattachement entreprise) |
| nom | oui | Nom |
| prenom | non | prénom |
| civilite | non | Civilité (format vérifié) |
| fonction | non | Fonction |
| telephone_direct | non | Téléphone direct |
| portable | non | Portable |
| email | non | Email |
| id_externe | non | ID Externe (synchro) |
| entreprise_raison_sociale | non | Liaison avec l'entreprise via la raison sociale |
| entreprise_id_externe | non | Liaison avec l'entreprise via son id externe |
| contact_principal | non | Contact principal de l'entreprise |
| contact_secondaire | non | Contact secondaire de l'entreprise |
| contact_facturation | non | Contact facturation de l'entreprise |
| langue_principale | non | Langue principale du Contact (ISO 639-1) |
| langues_secondaires | non | Liste des langues secondaires du Contact (existence vérifiée, codes ISO 639-1 séparés par des virgules) |
| participant_lie_id | non | ID du Participant lié (existence vérifiée et son Entreprise doit être identique à celle du Contact. Ce Participant ne peut pas déjà être lié à un autre Contact) |
| formateur_lie_id | non | ID du Formateur lié (existence vérifiée et son Entreprise doit être identique à celle du Contact. Ce Formateur ne peut pas déjà être lié à un autre Contact) |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/contacts.php`

## Transformer un Particulier en Entreprise + Contact + Participant

Il faut rajouter le paramètre suivant dans le corps de la requête POST : convert_to_entreprise_contact_participant=1

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/contacts.php`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_contact | oui | ID du Contact |
| convert_to_entreprise_contact_participant | oui | Paramètre à mettre à "1" pour effectuer la conversion |

## Supprimer un contact

Si le Contact appartient à un Particulier, sa suppression entraîne celle du Particulier complet : Contact, Entreprise et Participant associés.

### Requête HTTP

`DELETE https://pro.dendreo.com/demo/api/contacts.php?id=1`

`DELETE https://pro.dendreo.com/demo/api/contacts.php?id_contact=1,2,3`

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id ou id_contact | oui | ID contact entier, ou liste d'ID séparés par des virgules (les valeurs non entières et les ID inconnus ou déjà supprimés sont ignorés) |

# Particuliers

## Ajouter un particulier

L'ajout d'un particulier se fait sur la même URL qu'un contact avec la variable `particulier` égale à 1.

```json
{
"id_contact": "3",
"id_entreprise": "3",
"particulier": "1",
"civilite": "Mme",
"nom": "Marue",
"prenom": "Estelle",
"fonction": "Responsable Formation",
"telephone_direct": "+33 01 02 03 04 05",
"portable": "",
"email": "marue@domaine.fr",
"id_externe": "",
"id_participant": 5
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| particulier | oui | valeur égale à 1 sinon ajout d'un contact |
| civilite | non | Civilité (format vérifié) |
| nom | oui | Nom |
| prenom | oui | prénom |
| fonction | non | Fonction |
| telephone_direct | non | Téléphone direct |
| portable | non | Portable |
| email | non | Email |
| adresse | non | Adresse |
| code_postal | non | Code postal |
| ville | non | Ville |
| pays | non | Pays. Le libellé doit correspondre à un pays reconnu dans la norme ISO-3166 |
| pays_alpha2 | non | Code ISO-3166-2 du Pays |
| id_administrateur | non | Commercial associé (existence vérifiée) |
| statut_bpf | non | independant,cpf_autonome,recherche_emploi,hors_bpf |
| id_externe | non | ID Externe (synchro) |
| id_participant | non | ID du Participant crée |
| facturation_raison_sociale | non | Raison sociale (facturation) |
| facturation_adresse | non | Adresse (facturation) |
| facturation_code_postal | non | Code postal (facturation) |
| facturation_ville | non | Ville (facturation) |
| facturation_pays | non | Pays (facturation). Le libellé doit correspondre à un pays reconnu dans la norme ISO-3166 |
| facturation_pays_alpha2 | non | Code ISO-3166 du Pays (facturation) |
| langue_principale | non | Langue principale du Particulier (ISO 639-1) |
| langues_secondaires | non | Liste des langues secondaires du Particulier (existence vérifiée, codes ISO 639-1 séparés par des virgules) |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/contacts.php`

## Editer un particulier

```json
{
"id": "3",
"nom": "Marie",
"portable": "06 02 03 04 05",
"email": "marie@domaine.fr",
}
```

### Paramètres

| Intitulé | Obligatoire | Description |
| --- | --- | --- |
| id_entreprise ou id_contact ou id_participant | oui | ID de la fiche à modifier (Fournir un seul des ID au choix) |
| nom | non | Nom |
| prenom | non | prénom |
| civilite | non | Civilité (format vérifié) |
| fonction | non | Fonction |
| telephone_direct | non | Téléphone direct |
| portable | non | Portable |
| email | non | Email |
| id_externe | non | ID Externe (synchro) |
| adresse | non | Adresse |
| code_postal | non | Code postal |
| ville | non | Ville |
| pays | non | Pays. Le libellé doit correspondre à un pays reconnu dans la norme ISO-3166 |
| pays_alpha2 | non | Code ISO-3166-2 du Pays |
| facturation_pays | non | Pays de Facturation. Le libellé doit correspondre à un pays reconnu dans la norme ISO-3166 |
| facturation_pays_alpha2 | non | Code ISO-3166-2 du Pays de Facturation |
| id_administrateur | non | Commercial associé (existence vérifiée) |
| statut_bpf | non | independant,cpf_autonome,recherche_emploi,hors_bpf |
| langue_principale | non | Langue principale du Particulier (ISO 639-1) |
| langues_secondaires | non | Liste des langues secondaires du Particulier (existence vérifiée, codes ISO 639-1 séparés par des virgules) |

### Requête HTTP

`POST https://pro.dendreo.com/demo/api/particuliers.php`
