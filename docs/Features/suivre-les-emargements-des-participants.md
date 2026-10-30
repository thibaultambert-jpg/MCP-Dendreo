# Suivre les Émargements des Participants

En tant qu'Organisme de Formation, vous pouvez effectuer le suivi des Émargements électroniques des Participants depuis l'onglet ***Participants*** > ***Émargements*** de chacune de vos Actions de Formations.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/69e73ef8f5e4846e6c737d2d/file-CEQp2I09u7.png)

Depuis cette interface, vous pouvez :

- Naviguer entre les journées d'Émargement ;
- Identifier la liste des Participants ayant signé électroniquement les feuilles de présence ;
- Supprimer des signatures ;
- Vérifier que le Formateur a bien validé la signature des Émargements ;
- Créer une Prolongation de trois heures du délai des signatures ;
- Consulter l'historique des prolongations ;
- Consulter les preuves de traçabilité (piste d'audit) d’une feuille d’Émargement électronique ;
- Retrouver les codes d'accès des Participants (et accéder à leur [Extranet](https://doc.dendreo.com/article/220-extranet-participant) depuis un lien d'auto-login).

## Utiliser le relevé automatique des présences

Dès que l'Émargement électronique d'un Créneau est validé par le Formateur, Dendreo remplit le relevé des présences de l'Action de Formation concernée selon la signature ou l'absence de signature du Participant.

**Dans le cas où le Participant a signé**

Un Participant ayant signé électroniquement sera marqué comme présent au Créneau.

Sa présence ne peut pas être supprimée, à moins de supprimer préalablement son Émargement.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6787d9f00d82f5250c607dba/file-vZNYzJ5dbE.png)

**Dans le cas où le Participant n'a pas signé**

Un Participant n'ayant pas signé électroniquement sera marqué comme absent injustifié au Créneau.

Vous pourrez cependant renseigner un motif d'absence manuellement si nécessaire.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6787d9dac3601717f7d1df4a/file-l5cnKVcvsw.png)

## Modifier le relevé des présences

Lorsqu'un Émargement est réalisé, le relevé des présences se complète sur l'intégralité du Créneau. Cela signifie que Dendreo considère que le Participant a été présent à l'ensemble du Créneau.

Si ce n'est pas le cas, ou que vous souhaitez enregistrer un relevé de présence exact en comptabilisant un retard par exemple, il est possible de le faire dans l'onglet ***Relevé de présence***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6787dc65ad98cf53efde0aed/file-iZ06Zndo4d.gif)

## Générer les feuilles d'émargement

À partir du relevé automatique des présences, une fiche d'Émargement **reprenant l'ensemble les signatures électroniques** peut être générée à partir d'un [Modèle de Document dédié](https://doc.dendreo.com/article/328-gerer-vos-modeles-de-documents) et spécialement conçu pour afficher les Émargements électroniques. Nous vous proposons ces 3 Modèles déjà tagués :

- [Feuille d'Émargement par jour](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/attachments/5e79403e2c7d3a7e9ae9a2ac/Mode%CC%80le-ge%CC%81ne%CC%81ral---Emargement_jour_portrait_Signature_Electronique-(1)-(1).docx)
- [Feuille d'Émargement par semaine](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/attachments/5e7940482c7d3a7e9ae9a2ad/Mode%CC%80le-ge%CC%81ne%CC%81ral---Emargement_semaine_portrait_signature_electronique_V2-(1).docx)
- [Feuille d'Émargement par Participant](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/attachments/5e79405104286364bc971f93/Mode%CC%80le-ge%CC%81ne%CC%81ral---Emargement_Participant_jour_portrait_Signature_Electronique-(2)-(1).docx)

**À noter** : un Modèle de feuille d'Émargement conçu pour fonctionner avec l'Émargement électronique fonctionne aussi très bien si vous n'utilisez pas l'Émargement électronique. Les signatures ne seront simplement pas remplies automatiquement, et la piste d'audit n’apparaîtra pas !

Pour réaliser votre Modèle de feuille d'Émargement avec les signatures électroniques, nous vous proposons une liste de tags que vous pouvez utiliser selon votre besoin :

**Feuille d'Émargement par jour**

| **Tag** | **Contexte du tag** | **Résultat attendu** |
| --- | --- | --- |
| *{adf_jour_creneau_participant_esignature}*<br>*{adf_jour_i_creneau_j_participant_k_esignature}* | Boucle de jours {adf_jours}<br>Boucle de Participants par jour {adf_jour_participants} | Affiche la signature électronique du Participant K sur le Créneau J du jour I de l'ADF |
| *{adf_jour_creneau_formateur_esignature}*<br>*{adf_jour_i_creneau_j_formateur_k_esignature}* | Boucle de jours {adf jours}<br>Boucle de Formateurs par jour {adf jour_formateurs} | Affiche la signature électronique du Formateur K sur le Créneau J du jour I de l'ADF |

**Feuille d'Émargement par semaine**

| **Tag** | **Contexte du tag** | **Résultat attendu** |
| --- | --- | --- |
| *{adf_semaine_participant_jour_ creneau_esignature}*<br>*{adf_semaine_i_participant_j_jour _k_creneau_l_esignature}* | Boucle de Participants par semaine {adf_semaine_participants} | Affiche la signature électronique du Participant J sur le Créneau L du jour K de la semaine I de l'ADF |
| *{adf_semaine_formateur_jour_ creneau_esignature}*<br>*{adf_semaine_i_formateur_j_jour _k_creneau_l_esignature}* | Boucle de Formateurs par semaine {adf_semaine_formateurs} | Affiche la signature électronique du Formateur J sur le Créneau I du jour K de la semaine I de l'ADF |

**Feuille d'Émargement par Participant**

| **Tag** | **Contexte du tag** | **Résultat attendu** |
| --- | --- | --- |
| *{participant_jour_creneau _esignature}*<br>*{participant_i_jour_j_creneau_k _esignature}* | Document par Participant ou Boucle de Participants {participants}<br>Boucle de "jours Participant" (jours d'inscription d'un Participant) {participant_jours} | Affiche la signature électronique du Participant I sur le Créneau K du jour J de l'ADF |
| *{participant jour_creneau_formateur _esignature}*<br>*{participant_i_jour_j_creneau_k_formateur _esignature}* | Document par Participant ou Boucle de Participants {participants}<br>Boucle de "jours Participant" (jours d'inscription d'un Participant) {participant_jours} | Affiche la signature électronique du Formateur sur le Créneau K du jour J de l'ADF du Participant I |

**À noter** : les tags affichant les signatures électroniques sont des **tags d'image**. Il est recommandé de définir la taille de l'image de la signature en définissant un niveau de largeur, par exemple {adf_jour_creneau_formateur_esignature_100}. Consultez [**Taguer un Modèle de document**](https://doc.dendreo.com/article/107-tagging-modeles-de-document-type-fichier).

Une fois le Modèle de Document mis en place sur votre compte Dendreo, générez les feuilles d'Émargement depuis une Action de Formation spécifique, dans l'onglet ***Documents***.

Depuis la rubrique ***Génération des Documents relatifs aux Participants***, retrouvez le Modèle concerné, sélectionnez les personnes pour qui générer le document, puis cliquez sur le format souhaité (Word ou PDF).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/67891fdcadae8e492833f42f/file-tQjQi1EeRk.png)

Pour faciliter la génération du document, vous pouvez également filtrer sur des dates spécifiques.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/678920acfea89162338ebcd9/file-K5Bwbk8kvz.png)

## Consulter la piste d'audit

Pour chaque Action de Formation ayant des signatures électroniques, il existe une preuve de traçabilité présentée sous la forme d'une **piste d'audit**. Ce document liste l'ensemble de l'activité de signature électronique sur l'Action de Formation et atteste de son authenticité.

Dendreo agit en tant que “tiers de confiance” et est garant de la conformité du processus d’Émargement électronique en application du décret 2017-382 du 22 mars 2017 relatif aux justificatifs d’assiduité d’une personne en Formation. Vous retrouvez cette piste d'audit dans l'onglet ***Émargements*** de chaque ADF.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/678934506ca7af37b511ad04/file-sFZdB77iru.png)

Dans cette piste d'audit, vous retrouverez par Créneau les informations suivantes :

**Pour les Participants signataires**

- Nom et prénom
- Le jour et l'heure de chaque signature
- L'adresse IP de connexion lors de sa signature
- Une copie de la signature
- Un cadenas attestant que la signature est authentique (hash d'inaltérabilité)

**Pour les Formateurs**

- Nom et prénom
- Le jour et l'heure de chaque validation
- L'adresse IP de connexion lors de sa validation
- Une copie de la signature
- Un cadenas attestant que la signature est authentique (hash d'inaltérabilité)

**Pour les prolongations**

- La date et l'heure de la demande de prolongation
- Le motif de la demande prolongation
- L'auteur de la demande de prolongation
- L'adresse IP de la personne ayant fait la prolongation

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/678934ecfea89162338ebd54/file-x2O0uNKT9f.png)
