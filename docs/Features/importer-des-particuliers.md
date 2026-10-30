# Importer des Particuliers

Avec Dendreo, vous avez la possibilité d'**importer en autonomie les informations de Particuliers** pour éditer des fiches existantes ou ajouter de nouvelles fiches dans votre CRM. Vous pouvez copier-coller vos données en provenance d'un fichier Excel ou bien directement taper les informations manuellement.

La fonctionnalité d'import peut servir dans différents cas :

- **Vous avez reçu une liste** contenant potentiellement des Particuliers déjà existants dans votre CRM et d'autres à créer. Copiez-les dans le tableau : **si un Particulier avec les mêmes nom, prénom et Email ou un N° SIRET identique existe déjà, sa fiche sera mise à jour** uniquement avec les nouvelles informations présentes dans cet import. Si vous souhaitez mettre à jour les informations déjà présentes sur la fiche CRM existante, cochez ***Écraser les informations existantes***.
- **Vous avez vous-même exporté la liste de vos Particuliers pour effectuer une mise à jour en masse** et disposez donc d'un des champs ***ID Entreprise***, ***ID Contact*** ou ***ID Participant***. Dans ce cas, ce sera forcément **la fiche ayant cet ID qui sera mise à jour**. Par défaut, seules les nouvelles informations fournies seront ajoutées à la fiche existante. Si vous souhaitez mettre à jour les informations déjà présentes sur la fiche CRM existante, cochez ***Écraser les informations existantes***.

**À noter** : un Particulier est une personne qui est à la fois Contact, Entreprise et Participant. En créant un Particulier, vous créez simultanément ces 3 fiches reliées entre elles dans Dendreo.

**À noter** : la fonctionnalité d'import est limitée à un traitement de 500 lignes à la fois.

## Accéder à l'interface de l'import

Depuis la liste des Entreprises, Particuliers ou Participants de votre CRM, cliquez sur [***Import de Particuliers***](https://pro.dendreo.com/redirect/entreprises/import-particuliers).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6760485c0cba961b9533e932/file-DeOOS8F4bc.png)

Depuis CRM > Participants

**À noter** : un Formateur peut être ajouté à votre CRM depuis l’interface d’import du CRM, et il peut être inscrit à une Action de Formation depuis l’interface d’import de l’Action de Formation.

Remplissez le tableau d'import avec les informations des différents Particuliers ou bien copiez-collez ces informations précédemment entrées dans [la matrice de saisie Excel](https://pro.dendreo.com/redirect/entreprises/export-modele-particulier).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/676049e5b3310477980d2b74/file-dgUYBaPYTW.png)

Cliquez sur le bouton ***Importer*** pour effectuer l'import.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6760495a0cba961b9533e934/file-NCFUKN3O5z.png)

Si vous cochez ***Écraser les informations existantes***, cela écrase et met à jour les données déjà existantes dans votre base. Si vous ne le cochez pas, cela renseigne les champs vides et conserve les champs déjà renseignés.

**À noter** : si vous souhaitez copier/coller des informations depuis un fichier existant, veillez à utiliser le raccourci clavier : ***Ctrl + Maj + V*** ou ***Cmd + Maj + V*** sur Mac.

## Mettre à jour les données

Vous pouvez mettre à jour les données relatives aux Particuliers grâce à un import, en autonomie.

- Si la colonne n'est pas déjà affichée dans votre tableau, cliquez sur ***Colonnes*** > ***ID Dendreo***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68beedd95bf7857ebfb18b33/file-ZzcOF44lbw.png)

La colonne ***ID Dendreo*** s'affiche alors dans le tableau.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68bef255c1f30516649f350c/file-Bql8dqFlRu.png)

- Exportez les données de vos Particuliers.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68beee31fac1976a43e1ae2d/file-62DeEuah24.png)

**Attention** : vous devez **obligatoirement** faire afficher la colonne ID Dendreo avant d'exporter le fichier.

- Ouvrez le fichier obtenu dans Excel et ajoutez les nouvelles informations à importer et mettre à jour.
- Sur la page d'[import de Particuliers](https://pro.dendreo.com/redirect/entreprises/import-particuliers), **copiez-collez uniquement les nouvelles données** à importer dans les colonnes correspondantes, puis **ajoutez l'ID Dendreo de chaque Particulier** dans la colonne ***Mise à jour***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68bef1d2997dd4674f91c1c5/file-rR9S6vc2G6.png)

**À noter** : en saisissant un ID dans cette colonne, vous désignez la fiche Particulier existante à mettre à jour dans votre CRM, aucun autre contrôle ne sera fait.

- Cliquez sur le bouton ***Importer*** pour mettre à jour les données.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68838f92ccd8424661790851/file-fJg3a7bBHs.png)

## Vérifications et contraintes à respecter

Dendreo opère certaines vérifications lors de l'import, mais **vérifiez bien vos données avant d'importer**, certaines colonnes du tableau imposant de respecter une certaine nomenclature des données :

- Le champ ***ID Centre de Formation*** est facultatif : si vous ne le saisissez pas, le Particulier sera accessible pour l'ensemble de vos Centres.
- Vous pouvez rendre le Particulier visible dans un ou plusieurs Centres en séparant les [ID](https://pro.dendreo.com/redirect/config/centres-de-formation) par une virgule.
- Si fourni, le champ ***ID Entreprise*** doit correspondre à une Entreprise particulier existante.
- Si fourni, le champ ***ID Contact*** doit correspondre à un Contact particulier existant.
- Si fourni, le champ ***ID Participant*** doit correspondre à un Participant particulier existant.
- Le champ ***Civilité*** doit avoir pour valeur "M.", "Mme", "Dr", "Pr", "Me".
- Le champ ***Nom*** est obligatoire si l'***ID Entreprise***, ***ID Contact*** ou ***ID Participant*** est renseigné.
- Le champ ***Prénom*** est obligatoire si l'***ID Entreprise***, ***ID Contact*** ou ***ID Participant*** est renseigné.
- Le champ ***Email*** doit être valide.
- Le champ ***Newsletter*** doit avoir pour valeur "0" ou "1".
- Le champ ***Langue principale*** doit avoir pour valeur "Français", "Anglais", "Allemand", "Néerlandais", "Arabe", "Chinois", "Coréen", "Créole haïtien", "Danois", "Espagnol", "Finnois", "Hongrois", "Italien", "Japonais", "Norvégien", "Polonais", "Portugais", "Russe", "Suédois", "Tamoul", "Turc", "Wolof", "Langue des signes française", "fr", "en", "de", "nl", "ar", "zh", "ko", "ht", "da", "es", "fi", "hu", "it", "ja", "no", "pl", "pt", "ru", "sv", "ta", "tr", "wo", "fsl".
- Le champ ***Langues secondaires*** doit avoir pour valeur (séparées par des points-virgules) "Français", "Anglais", "Allemand", "Néerlandais", "Arabe", "Chinois", "Coréen", "Créole haïtien", "Danois", "Espagnol", "Finnois", "Hongrois", "Italien", "Japonais", "Norvégien", "Polonais", "Portugais", "Russe", "Suédois", "Tamoul", "Turc", "Wolof", "Langue des signes française", "fr", "en", "de", "nl", "ar", "zh", "ko", "ht", "da", "es", "fi", "hu", "it", "ja", "no", "pl", "pt", "ru", "sv", "ta", "tr", "wo", "fsl".
- Le champ ***Statut BPF*** doit avoir pour valeur "Non renseigné", "Indépendant", "Libéral", "Salarié" (CPF autonome ou auto-financement), "Individu agissant en tant que personne physique (étudiant, retraité, inactif, personne hors recherche d'emploi...)", "Personne en recherche d'emploi", "Apprenti", "Hors BPF", "-", "independant", "cpf_autonome", "individu", "recherche_emploi", "apprenti", "hors_bpf".
- Le champ ***Diplôme le plus élevé obtenu*** doit avoir pour valeur "Non renseigné", "Diplôme national du Brevet" ou "Sans diplôme", "Certificat de Qualification Professionnelle", "CAP" ou "BEP", ou "Diplôme ou titre à finalité professionnelle de niveau équivalent", "Baccalauréat (général, technologique ou professionnel)", ou "Diplôme ou titre à finalité professionnelle de niveau équivalent", "Diplôme ou titre à finalité professionnelle de niveau Bac+2 (DUT, BTS, DEUG)", "Diplôme ou titre à finalité professionnelle de niveau Bac+3 (Licence)" ou "Bac+4 (Maîtrise, Master 1)", "Diplôme ou titre à finalité professionnelle de niveau Bac+5 (Master, DEA, DESS, diplôme d'ingénieur)", "Diplôme ou titre à finalité professionnelle de niveau Bac+8 (Doctorat)", "sans", "cqp", "cap-bep", "bac", "bac+2", "bac+3", "bac+5", "bac+8".
- Le champ ***Date de naissance*** doit avoir la forme jj/mm/aaaa ou aaaa-mm-jj et contenir une date valide.
- Le champ ***Mode d'exercice dominant*** doit avoir pour valeur "Salarié", "Libéral", "Mixte", "Service de santé des armées", "Salarié d'un centre de santé conventionné", "salarie", "liberal", "mixte", "armee", "centre_conv".
- Le champ ***Client*** doit être de type 0/1, oui/non, etc.
- Un seul champ est nécessaire pour définir un pays : soit le champ ***Code***, soit le champ ***Libellé***. Si les deux sont fournis, seul le champ ***Code*** sera utilisé. Les champs ***Code Pays*** et ***Code Pays pour Facturation*** doivent être des codes ISO-3166 valides. Les champs ***Libellé Pays*** et ***Libellé Pays pour Facturation*** doivent correspondre à des noms de pays répertoriés dans la norme ISO-3166.
- Le champ ***Importance du client*** doit avoir pour valeur "très faible", "faible", "moyenne", "forte", "maximale".
- Le champ ***Mode de financement par défaut*** doit avoir pour valeur "entreprise", "OPCO", "CDC", "pouvoirs publics", "pouvoirs publics (client direct)", "sous-traitance", "opca", "public", "public_client", "sous_traitance".
- Les champs pour les taux de TVA doivent avoir pour valeur "0", "2.1", "2.5", "3", "3.7", "4", "5", "5.5", "6", "7.7", "8.1", "8.5", "10", "11", "13", "16", "17", "20", "21", "23".
- Le champ ***Délais de paiement*** doit avoir pour valeur "à réception", "10 jours", "15 jours", "30 jours", "30 jours fin de mois", "30 jours fin de mois le 10", "30 jours fin de mois le 15", "40 jours", "40 jours fin de mois", "45 jours", "45 jours fin de mois", "45 jours fin de mois le 15", "50 jours", "50 jours fin de mois", "60 jours", "60 jours fin de mois", "90 jours", "Manuel", "reception", "10_j", "15_j", "30_j", "30_j_fdm", "30_j_fdm_10", "30_j_fdm_15", "40_j", "40_j_fdm", "45_j", "45_j_fdm", "45_j_fdm_15", "50_j", "50_j_fdm", "60_j", "60_j_fdm", "90_j", "manuel".

**À noter** : Dendreo opère certaines vérifications pour détecter automatiquement les doublons de Particuliers déjà présents dans votre base de données. Ces doublons ne sont pas importés. Si Dendreo détecte des Particuliers déjà présents dans votre base de donnée (doublons), leurs informations additionnelles sont **mises à jour**, mais toute information déjà présente **n'est pas écrasée**.
