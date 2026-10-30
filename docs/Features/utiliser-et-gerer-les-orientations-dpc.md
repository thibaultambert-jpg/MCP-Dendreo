# Utiliser et gérer les Orientations DPC

Gérez les *Orientations du Développement Professionnel Continu* des professionnels de santé sur Dendreo.

**Attention** : selon ses exigences règlementaires, l'ANDPC n'accepte pas les Signatures électroniques de Dendreo, celles-ci devant être **qualifiées**. Ce niveau de sécurité **nécessite la vérification de l'identité du signataire en face à face**, par un tiers de confiance, ce qui n'est pas le cas sur Dendreo. Pour plus d'informations, consultez notre documentation [**Questions fréquentes - Signature électronique**](https://doc.dendreo.com/article/276-questions-frequentes).

## Activer l'option

Depuis la [configuration générale](https://pro.dendreo.com/redirect/configuration.php), dans la section ***Option DPC***, activez l'***Affichage des options DPC***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/64a7d6a70789fc4e36fecdf1/file-l2zlF0CE8o.png)

Une fois l'option activée, un nouveau sous-onglet ***Orientations DPC*** s'affiche sur vos Actions de Formation.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6893685ea76f967e8e812bfb/file-ZBNHSDEHWX.png)

## Renseigner les champs spécifiques au DPC

**Dans la configuration de votre compte**

Depuis la [Configuration générale](https://pro.dendreo.com/redirect/configuration.php), dans la section ***Options DPC***, renseignez **votre Identifiant DPC** que Dendreo peut alors afficher dans vos Modèles de documents grâce au tag associé.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/64a7d818f1f0f94744436d8d/file-biNrlRtkgs.png)

**Dans votre Catalogue de Formation**

Sur la fiche de vos Modules, dans la section ***DPC***, cochez la case ***Éligible DPC***, renseignez le ***Numéro de programme DPC*** de votre Module (transmis par l'ANDPC) puis indiquez la liste des ***Orientations par défaut (DPC)*** à ajouter automatiquement aux Actions de Formation que vous programmez depuis ce Module.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/689367641048b9580de8edf0/file-WzjkjroqfC.png)

**Sur la fiche de vos Actions de Formation**

Lorsqu'une Action de Formation programmée est composée d'un Module éligible au DPC, vous pouvez y renseigner les informations transmises par l'ANDPC :

- Le **Numéro de session** qui est rattaché à l'Action de Formation dans sa globalité ;
- Le **Numéro d'unité** à rattacher aux Modules de votre Action de Formation.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/689368971512d77362f01c2e/file-xUWxX1OT0Z.png)

**Sur la fiche d'un Participant ou Particulier**

Dans le CRM, sur la fiche de chaque Participant et Particulier, vous pouvez renseigner leurs informations DPC :

- ***Numéro ADELI (DPC)*** ;
- ***Numéro RPPS (DPC)*** ;
- ***Spécialité (DPC)*** ;
- ***Mode d'exercice dominant (DPC)***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/689368c2ee353f18bebe3549/file-qFFRadgItt.png)

**Sur le Catalogue Public**

Sur votre Catalogue Public, si vous proposez un Module de Formation éligible DPC, cette Formation est facilement identifiable grâce au badge ***DPC*** dédié ainsi qu'aux filtres de recherche ***Éligible DPC***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/689367fbee353f18bebe3546/file-Sf63vl5LJG.png)

## Générer les Documents liés au DPC

Afin de créer les documents appropriés, nous mettons à votre disposition plusieurs tags à utiliser dans vos Modèles de documents :

- {centre_of_identifiant_dpc} : votre identifiant ADPC renseigné en configuration générale
- {module_num_programme_dpc} : le numéro de programme renseigné sur la fiche de vos Modules
- {adf_num_session_dpc} : le numéro de session renseigné sur la fiche de vos Actions de Formation
- {adf_ogdpc_orientation} : l'orientation générale de l'ADF
- {participant_1_ogdpc_adeli} : le numéro ADELI du Participant 1
- {participant_1_ogdpc_rpps} : le numéro RPPS du Participant 1

Les tags {participant_ogdpc_orientations} et {participant_ogdpc_orientations_column} indiquent, pour chaque Participant, la liste des **Orientations générales** + la liste des **Orientations spéciales** pour ce Participant en fonction de la spécialité DPC que vous lui aurez attribuée.

Vous pouvez également utiliser les tags suivants pour remplir **intégralement** vos attestations DPC :

- {adf_programme_pluriannuel} : (Programme pluri-annuel / Programme non pluri-annuel)
- {adf_programme_pluriannuel_oui_non} : (Oui / Non)
- {adf_programme_pluriannuel_x} : (x / )
- {adf_en_cours} : (En cours / )
- {adf_en_cours_oui_non} : (Oui / Non)
- {adf_en_cours_x} : (x / )
- {adf_annees_civiles} : liste les années civiles sur lesquelles s'étend l'ADF

Faites une recherche sur l'[assistant de tagging](https://pro.dendreo.com/redirect/documents_types/tagging.php) afin de découvrir tous les tags correspondants.
