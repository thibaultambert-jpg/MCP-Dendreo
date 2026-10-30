# Importer des Participants cross Entreprises

Avec Dendreo, vous avez la possibilité d'importer en **autonomie** une liste de Participants cross Entreprises, c'est-à-dire de réaliser un seul import de Participants qui seront rattachés à plusieurs Entreprises.

**À noter** : l'import des Participants cross Entreprises n'est possible que pour les **Entreprises déjà existantes** dans votre CRM Dendreo. Pour ajouter des Participants de nouvelles Entreprises, vous devez d'abord [importer les Entreprises](https://doc.dendreo.com/article/287-importer-des-entreprises).

## Fonctionnement général

Afin de permettre à Dendreo de rattacher chaque Participant à la bonne Entreprise, il est indispensable de renseigner au moins un champ spécifique à chaque Entreprise. Il existe plusieurs champs disponibles :

- **ID de l'Entreprise** : correspond à un numéro unique (non modifiable) généré automatiquement par Dendreo lors de la création d'une Entreprise dans le CRM. Ce numéro est disponible dans l'affichage des colonnes du [CRM Entreprise](https://pro.dendreo.com/redirect/entreprises) : ***ID Dendreo***.
- **Numéro de l'Entreprise** : correspond au champ du ***Numéro complet*** de la fiche Entreprise. C'est un numéro pour lequel vous pouvez personnaliser la nomenclature et que Dendreo incrémente automatiquement. Il est disponible dans l'affichage des colonnes du [CRM Entreprise](https://pro.dendreo.com/redirect/entreprises) : ***ENT_0000000***.
- **SIRET de l'Entreprise** : correspond au champ ***Numéro d'identification d'Entreprise*** de la fiche Entreprise. Vous pouvez l'utiliser comme référence à condition que vous l'ayez renseigné au préalable sur la fiche de vos Entreprises pour lesquelles vous souhaitez importer des Participants.
- **Raison Sociale de l'Entreprise** : correspond au champ ***Raison sociale*** de la fiche Entreprise. Pour l'utiliser comme référence, il est recommandé de vérifier en amont qu'il n'y a pas de doublon d'Entreprise. Pour importer des Participants d'une Entreprise déjà existante dans votre CRM, la raison sociale ajoutée dans le tableau d'import devra être strictement identique à celle déjà présente. Sinon, Dendreo importera les Participants en créant une nouvelle Entreprise.
- **ID Externe de l'Entreprise** : correspond à un ID que vous avez potentiellement importé dans Dendreo lors de l'[import initial de données](https://doc.dendreo.com/article/150-import-initial-de-donnees). Par défaut, l'information n'est pas affichée dans le [CRM Entreprise](https://pro.dendreo.com/redirect/entreprises). Allez dans la [configuration de l'API](https://pro.dendreo.com/redirect/config_api.php) pour activer l'affichage.

## Importer les Participants

L'import des Participants cross Entreprises peut se faire depuis le CRM ou depuis une Action de Formation.

### Depuis le CRM

Pour réaliser l'import, rendez-vous sur l'interface d'[import de Participants](https://pro.dendreo.com/redirect/participants/imports). Copiez-collez les données à importer dans le tableau d'import en vérifiant bien leur véracité, puis cliquez sur ***Importer***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6717c1e06d43ca7b17b2c2c9/file-BQavaKgDmH.png)

### Depuis une Action de Formation

Dans une Action de Formation de type **INTER ou INTRA Groupe**, il est également possible de faire un import de Participants cross Entreprises. Sur la fiche de l'Action de Formation concernée, depuis l'onglet ***Import***, copiez-collez vos informations dans le tableau puis cliquez sur le bouton ***Importer***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/671b7128f539bb6e3c7c6d46/file-MRlDuLbHbc.png)

Si vous cochez l'option ***Remplacer les Participants non identifiés***, Dendreo remplacera automatiquement tout Participant anonyme déjà inscrit à cette ADF par un Participant identifié lors de l'import.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/671b71443a0b506883e52b17/file-w8KhiBRttU.png)

Si vous cochez ***Écraser les informations existantes***, les données seront écrasées et mises à jour avec celles déjà existantes. Sinon, les champs vides seront renseignés et les champs déjà renseignés conservés.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/671b7189f539bb6e3c7c6d48/file-mOGf81haFW.png)

Avec cette méthode, Dendreo enregistre automatiquement dans votre CRM les Participants en les rattachant à l'Entreprise de l'INTRA concernée ET inscrit les Participants à l'Action de Formation.

**À noter** : si la fiche Participant de votre compte Dendreo est personnalisée avec des champs additionnels, le tableau d'import intégrera une colonne pour chacun de ces champs.

**À noter** : si les Particuliers sont d'ores et déjà présents dans le CRM, il est possible depuis une Action de Formation d'importer une liste de Particuliers. Pour cela, dans le masque d'import, renseignez "Prénom Nom" dans la colonne ***Raison Sociale*** de l'Entreprise.

## Gérer les doublons

Dendreo opère certaines vérifications pour détecter automatiquement les doublons de Participants déjà présents dans votre base de données pour l'Entreprise concernée. Ces doublons ne seront pas importés.

Si Dendreo détecte des Participants déjà présents dans votre base de donnée (doublon), leurs informations additionnelles seront **mises à jour**, mais toute information déjà présente **ne sera pas écrasée**.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/671b73724d8d375180ed129b/file-A8YXn3Ney1.png)

**À noter** : si vous souhaitez copier-coller des informations depuis un fichier existant, veillez à utiliser le raccourci clavier ***Ctrl + Maj + V*** ou ***Cmd + Maj + V*** sur Mac.
