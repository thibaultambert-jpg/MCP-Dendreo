# Importer des Contacts

Avec Dendreo, vous avez la possibilité d'**importer en autonomie les informations de Contacts** pour éditer des fiches existantes ou ajouter de nouvelles fiches dans votre CRM. Vous pouvez copier-coller vos données en provenance d'un fichier Excel ou bien directement taper les informations manuellement.

La fonctionnalité d'import peut servir dans différents cas :

- **Vous avez reçu une liste** contenant potentiellement des Contacts déjà existants dans votre CRM et d'autres à créer. Copiez-les dans le tableau : **si un Contact avec les mêmes nom et prénom existe déjà dans l'Entreprise indiquée, sa fiche sera mise à jour** avec uniquement les nouvelles informations présentes dans cet import. Si vous souhaitez mettre à jour les informations déjà présentes sur la fiche CRM existante, cochez ***Écraser les informations existantes.***
- **Vous avez vous-même exporté la liste de vos Contacts pour effectuer une mise à jour en masse** et disposez donc du champ ***ID Dendreo Contact***. Dans ce cas, **ce sera forcément la fiche ayant cet ID qui sera mise à jour**. Par défaut, seules les nouvelles informations fournies seront ajoutées à la fiche existante. Si vous souhaitez mettre à jour les informations déjà présentes sur la fiche CRM existante, cochez ***Écraser les informations existantes***.

**À noter** : la fonctionnalité d'import est limitée à un traitement de 500 lignes à la fois.

## **Accéder à l'interface de l'import**

Depuis la liste des Contacts de votre CRM, cliquez sur [***Import***](https://pro.dendreo.com/redirect/contacts/imports).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68838f87af64236627767fc9/file-27W4pdBjvB.png)

Copiez-collez ou renseignez manuellement les données dans le tableau d'import.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68838f8dccd8424661790850/file-YAENhC6SmJ.png)

Cliquez sur le bouton ***Importer*** pour effectuer l'import.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68838f92ccd8424661790851/file-fJg3a7bBHs.png)

Si vous cochez ***Écraser les informations existantes***, les données déjà existantes dans votre base sont écrasées et mises à jour. Sinon, cela renseigne les champs vides et conserve les champs déjà renseignés.

**À noter** : si vous souhaitez copier/coller des informations depuis un fichier existant, veillez à utiliser le raccourci clavier : ***Ctrl + Maj + V*** ou ***Cmd + Maj + V*** sur Mac.

## Mettre à jour les données

Vous pouvez mettre à jour les données relatives aux Contacts de votre CRM grâce à un import, en autonomie.

- Si la colonne n'est pas déjà affichée dans votre tableau, cliquez sur ***Colonnes*** > ***ID Dendreo***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68beedd95bf7857ebfb18b33/file-ZzcOF44lbw.png)

La colonne ***ID Dendreo*** s'affiche alors dans le tableau.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68beedfc7f1dbe419d37a733/file-GWpyW73dKP.png)

- Exportez les données de vos Contacts.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68beee31fac1976a43e1ae2d/file-62DeEuah24.png)

**Attention** : vous devez **obligatoirement** faire afficher la colonne ID Dendreo avant d'exporter le fichier.

- Ouvrez le fichier obtenu dans Excel et ajoutez les nouvelles informations à importer et mettre à jour.
- Sur la page d'[import de Contacts](https://pro.dendreo.com/redirect/contacts/imports), **copiez-collez uniquement les nouvelles données** à importer dans les colonnes correspondantes, puis **ajoutez l'ID Dendreo de chaque Contact** dans la colonne ***Mise à jour***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68beef50c1f30516649f34ff/file-s6LBi3QscZ.png)

**À noter** : en saisissant un ID dans cette colonne, vous désignez la fiche Contact existante à mettre à jour dans votre CRM, aucun autre contrôle ne sera fait.

- Cliquez sur le bouton ***Importer*** pour mettre à jour les données.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68838f92ccd8424661790851/file-fJg3a7bBHs.png)

## **Vérifications et contraintes à respecter**

Dendreo opère certaines vérifications lors de l'import, mais **vérifiez bien vos données avant d'importer**, certaines colonnes du tableau imposant de respecter une certaine nomenclature des données :

- En cas d'ajout, au moins 1 des champs ***ID Dendreo Entreprise***, ***Numéro***, ***SIRET***, ***Raison Sociale*** ou ***ID Externe*** **doit être renseigné** pour identifier l'Entreprise ;
- Si le champ ***ID Dendreo Contact*** est renseigné, il désigne la fiche à mettre à jour et **aucun contrôle ne sera fait sur les nom et prénom** ;
- Le champ ***Civilité*** doit avoir l'une des valeurs suivantes : M., Mme, Dr, Pr, Me ;
- Le champ ***Prénom*** est obligatoire si l'ID Dendreo du Contact n'est pas renseigné ;
- Le champ ***Nom*** est obligatoire si l'ID Dendreo du Contact n'est pas renseigné ;
- Le champ ***Email*** doit être valide ;
- Le champ ***Abonné à la Newsletter*** doit contenir l'une des valeurs suivantes : 0, 1 ;
- Le champ ***Langue principale*** doit être un code [**ISO-639-1**](https://fr.wikipedia.org/wiki/Liste_des_codes_ISO_639-1) valide, ou son libellé ;
- Le champ ***Langues secondaires*** doit être un ou des codes [**ISO-639-1**](https://fr.wikipedia.org/wiki/Liste_des_codes_ISO_639-1) valides, ou leurs libellés (valeurs séparées par des points-virgules) ;
- Le champ ***Rôle*** doit contenir une ou plusieurs des valeurs suivantes : principal, secondaire, facturation.

**À noter** : Dendreo détecte automatiquement les doublons de Participants déjà présents dans votre base de données. Ces doublons ne sont pas importés. Si Dendreo détecte des Participants déjà présents dans votre base de donnée (doublons), leurs informations additionnelles sont **mises à jour**, mais toute information déjà présente **n'est pas écrasée**.
