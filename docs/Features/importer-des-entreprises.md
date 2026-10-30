# Importer des Entreprises

Avec Dendreo, vous avez la possibilité d'**importer en autonomie les informations d'Entreprises** pour éditer des fiches existantes ou ajouter de nouvelles fiches dans votre CRM. Vous pouvez copier-coller vos données en provenance d'un fichier Excel ou bien directement taper les informations manuellement.

La fonctionnalité d'import peut servir dans différents cas :

- **Vous avez reçu une liste** contenant potentiellement des Entreprises déjà existantes dans votre CRM et d'autres à créer. Copiez-les dans le tableau : **si une Entreprise avec une Raison sociale ou un N° SIRET identique existe déjà, sa fiche sera mise à jour** uniquement avec les nouvelles informations présentes dans cet import. Si vous souhaitez mettre à jour les informations déjà présentes sur la fiche CRM existante, cochez ***Écraser les informations existantes***.
- **Vous avez vous-même exporté la liste de vos Entreprises pour effectuer une mise à jour en masse** et disposez donc du champ ***ID Dendreo***. Dans ce cas, ce sera forcément **la fiche ayant cet ID qui sera mise à jour**. Par défaut, seules les nouvelles informations fournies seront ajoutées à la fiche existante. Si vous souhaitez mettre à jour les informations déjà présentes sur la fiche CRM existante, cochez ***Écraser les informations existantes***.

**À noter** : la fonctionnalité d'import est limitée à un traitement de 500 lignes à la fois.

## Accéder à l'interface de l'import

Depuis la liste des Entreprises de votre CRM, cliquez sur [***Import d'Entreprises***](https://pro.dendreo.com/redirect/entreprises/import).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/676031beff47ca61657fdaa1/file-vj946psute.png)

Copiez-collez ou renseignez manuellement les données dans le tableau d'import.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6760326ab3310477980d2b55/file-qfn9jwnuci.png)

Cliquez sur le bouton ***Importer*** pour effectuer l'import.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/676038c54f71c4165f9d3d66/file-2JVp0kTo92.png)

Si la fiche Entreprise de votre compte Dendreo est personnalisée avec des champs additionnels, le tableau d'import intègre alors une colonne pour chacun de ces champs. Si vous cochez ***Écraser les informations existantes***, cela écrase et met à jour les données déjà existantes dans votre base. Si vous ne le cochez pas, cela renseigne les champs vides et conserve les champs déjà renseignés.

**À noter** : si vous souhaitez copier/coller des informations depuis un fichier existant, veillez à utiliser le raccourci clavier : ***Ctrl + Maj + V*** ou ***Cmd + Maj + V*** sur Mac.

## Mettre à jour les données

Vous pouvez mettre à jour les données relatives aux Entreprises grâce à un import, en autonomie.

**À noter** : cette fonctionnalité est limitée à un traitement de 500 lignes à la fois.

- Si la colonne n'est pas déjà affichée dans votre tableau, cliquez sur ***Colonnes*** > ***ID Dendreo***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68beedd95bf7857ebfb18b33/file-ZzcOF44lbw.png)

La colonne ***ID Dendreo*** s'affiche alors dans le tableau.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68bef255c1f30516649f350c/file-Bql8dqFlRu.png)

- Exportez les données de vos Entreprises.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68beee31fac1976a43e1ae2d/file-62DeEuah24.png)

**Attention** : vous devez **obligatoirement** faire afficher la colonne ID Dendreo avant d'exporter le fichier.

- Ouvrez le fichier obtenu dans Excel et ajoutez les nouvelles informations à importer et mettre à jour.
- Sur la page d'[import des Entreprises](https://pro.dendreo.com/redirect/entreprises/import), **copiez-collez uniquement les nouvelles données** à importer dans les colonnes correspondantes, puis **ajoutez l'ID Dendreo de chaque Entreprise** dans la colonne ***Mise à jour***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68bef437c1f30516649f3524/file-ohbRSs5e4f.png)

**À noter** : en saisissant un ID dans cette colonne, vous désignez la fiche Entreprise existante à mettre à jour dans votre CRM, aucun autre contrôle ne sera fait.

- Cliquez sur le bouton ***Importer*** pour mettre à jour les données.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68838f92ccd8424661790851/file-fJg3a7bBHs.png)

## Vérifications et contraintes à respecter

Dendreo opère certaines vérifications lors de l'import, mais **vérifiez bien vos données avant d'importer**, certaines colonnes du tableau imposant de respecter une certaine nomenclature des données :

- Si le champ ***ID Dendreo*** est renseigné, il désigne la fiche à mettre à jour, **aucun contrôle ne sera fait sur la Raison sociale ni le SIRET**.
- Le champ ***ID Centre de Formation*** est facultatif, si vous ne le saisissez pas, l'Entreprise sera accessible pour l'ensemble de vos Centres. Vous pouvez rendre l'Entreprise visible dans un ou plusieurs Centres en séparant les [ID](https://pro.dendreo.com/redirect/config/centres-de-formation) par une virgule.
- Le champ ***Raison sociale*** est obligatoire si le champ ***ID Dendreo*** n'est pas renseigné.
- Le champ ***Numéro*** correspond au compteur personnalisable lors de la création d'une Entreprise. Si vous ne le saisissez pas, le prochain nouvel élément créé sur cette période aura le numéro 50 (*ENT_2400050*).
- Le champ ***Client*** doit être de type 0/1, oui/non, etc.
- Le champ ***Fournisseur*** doit être de type 0/1, oui/non, etc.
- Le champ ***Email*** doit être valide.
- Un seul champ est nécessaire pour définir un pays : soit le champ ***Code***, soit le champ ***Libellé***. Si les deux sont fournis, seul le champ ***Code*** sera utilisé. Les champs ***Code Pays*** et ***Code Pays pour Facturation*** doivent être des codes ISO-3166 valides. Les champs ***Libellé Pays*** et ***Libellé Pays pour Facturation*** doivent correspondre à des noms de pays répertoriés dans la norme ISO-3166.
- Le champ ***Mode de rémunération Formateurs*** doit avoir pour valeur "horaire" ou "journalier".
- Le champ ***Importance du client*** doit avoir pour valeur "très faible", "faible", "moyenne", "forte", "maximale".
- Le champ ***Statut BPF*** doit avoir pour valeur "non renseigné", "salarié", "agent public", "travailleur non salarié", "personne en recherche d'emploi", "bénévole", "apprenti", "autre (BPF)", "hors BPF", "-", "salarie", "agent_public", "non_salarie", "recherche_emploi", "benevole", "apprenti", "autre", "hors_bpf".
- Le champ ***Mode de financement par défaut*** doit avoir pour valeur "entreprise", "OPCO", "CDC", "pouvoirs publics", "pouvoirs publics (client direct)", "sous-traitance", "opca", "public", "public_client", "sous_traitance".
- Les champs pour les taux de TVA doivent avoir pour valeur "0", "2.1", "2.5", "3", "3.7", "4", "5", "5.5", "6", "7.7", "8.1", "8.5", "10", "11", "13", "16", "17", "20", "21", "23".
- Le champ ***Délais de paiement*** doit avoir pour valeur "à réception", "10 jours", "15 jours", "30 jours", "30 jours fin de mois", "30 jours fin de mois le 10", "30 jours fin de mois le 15", "40 jours", "40 jours fin de mois", "45 jours", "45 jours fin de mois", "45 jours fin de mois le 15", "50 jours", "50 jours fin de mois", "60 jours", "60 jours fin de mois", "90 jours", "Manuel", "reception", "10_j", "15_j", "30_j", "30_j_fdm", "30_j_fdm_10", "30_j_fdm_15", "40_j", "40_j_fdm", "45_j", "45_j_fdm", "45_j_fdm_15", "50_j", "50_j_fdm", "60_j", "60_j_fdm", "90_j", "manuel".
- Le champ ***Code APE*** ne doit être constitué que du code, pas de l'intitulé complet.

**À noter** : Dendreo opère certaines vérifications pour **détecter automatiquement les doublons** d'Entreprises déjà présentes dans votre base de données. Ces doublons ne sont pas importés, mais les éventuelles informations additionnelles ne sont donc pas mises à jour.

## Spécificités liées au multi-centres

Dans le cas où votre compte Dendreo comporte plusieurs sous-centres, pour réaliser l'import d'Entreprises, vous devez **obligatoirement renseigner le champ** ***ID Centre de Formation*** qui permet de rattacher l'Entreprise à un sous-centre lors de l'import.

Vous avez alors 2 solutions pour importer une Entreprise :

- Pour importer une Entreprise dans un seul sous-centre, renseignez l'ID du sous-centre concerné ;
- Pour importer une Entreprise dans TOUS les centres de votre compte, renseignez la valeur **0**.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/676039fcb3310477980d2b5e/file-uiZO7PXGoH.png)

Pour retrouver l'ID d'un sous-centre, rendez-vous dans la [configuration des Centres de Formation](https://pro.dendreo.com/redirect/centres_de_formation.php) **depuis la vue globale**. Vous retrouvez l'ID de chaque Centre dans la colonne ***ID*** du tableau.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/653677099362491a4094adf4/file-ht2RZ8ZrEU.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/653677099362491a4094adf4/file-ht2RZ8ZrEU.png)
