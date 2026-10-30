# Importer des Participants

Avec Dendreo, vous avez la possibilité d'**importer en autonomie les informations de Participants** pour éditer des fiches existantes ou ajouter de nouvelles fiches dans votre CRM. Vous pouvez copier-coller vos données en provenance d'un fichier Excel ou bien directement taper les informations manuellement.

- **Vous avez reçu une liste** contenant potentiellement des Participants déjà existants dans votre CRM et d'autres à créer. Copiez-les dans le tableau : **si un Participant avec les mêmes nom, prénom et email existe déjà dans l'Entreprise indiquée, sa fiche sera mise à jour** avec uniquement les nouvelles informations présentes dans cet import. Si vous souhaitez mettre à jour les informations déjà présentes sur la fiche CRM existante, cochez ***Écraser les informations existantes***.
- **Vous avez vous-même exporté la liste de vos Participants pour effectuer une mise à jour en masse** et disposez donc du champ ***ID Dendreo***. Dans ce cas, ce sera forcément **la fiche ayant cet ID qui sera mise à jour**. Par défaut, seules les nouvelles informations fournies seront ajoutées à la fiche existante. Si vous souhaitez mettre à jour les informations déjà présentes sur la fiche CRM existante, cochez ***Écraser les informations existantes***.

**À noter** : si un **homonyme** est détecté lors de l'import, la mise à jour est bloquée et une alerte vous invite à vérifier s’il s’agit d’un doublon ou d’un véritable homonyme. En cas d’homonymie avérée, attribuez simplement une adresse mail distincte à chaque Participant pour finaliser l’import.

**À noter** : la fonctionnalité d'import est limitée à un traitement de 500 lignes à la fois.

## Accéder à l'interface de l'import

Depuis la liste des Participants de votre CRM, cliquez sur [***Import de Participants***](https://pro.dendreo.com/redirect/participants/imports).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/676151b34653e31e923ce4bb/file-tFLfVyqadX.png)

Vous retrouvez la même interface depuis une Action de Formation INTRA, dans le menu ***Participants*** > ***Imports***. Avec cette méthode, Dendreo enregistre automatiquement les Participants dans votre CRM en les rattachant à l'Entreprise de l'INTRA concernée **ET** inscrit les Participants à l'Action de Formation.

Remplissez le tableau d'import avec les informations des différents Participants ou bien copiez-collez ces informations précédemment entrées dans [la matrice de saisie Excel](https://pro.dendreo.com/redirect/participants/export-modele).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/67615293b3310477980d2c1c/file-V1R7jMWmkc.png)

Cliquez sur le bouton ***Importer*** pour effectuer l'import.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/676152bbb3310477980d2c1d/file-H99dGUiRpZ.png)

Si vous cochez l'option ***Remplacer les Participants non identifiés***, Dendreo remplacera alors tout Participant anonyme déjà inscrit à cette ADF par un Participant identifié lors de l'import.

Si vous cochez ***Écraser les informations existantes***, cela écrase et met à jour les données déjà existantes dans votre base. Sinon, cela renseigne les champs vides et conserve ceux déjà renseignés.

**À noter** : si vous souhaitez copier/coller des informations depuis un fichier existant, veillez à utiliser le raccourci clavier : ***Ctrl + Maj + V*** ou ***Cmd + Maj + V*** sur Mac.

## Mettre à jour les données

Vous pouvez mettre à jour les données relatives aux Participants grâce à un import, en autonomie.

- Si la colonne n'est pas déjà affichée dans votre tableau, cliquez sur ***Colonnes*** > ***ID Dendreo***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68beedd95bf7857ebfb18b33/file-ZzcOF44lbw.png)

La colonne ***ID Dendreo*** s'affiche alors dans le tableau.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68bef5465bf7857ebfb18b78/file-Qkc39fGHLs.png)

- Exportez les données de vos Participants.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68beee31fac1976a43e1ae2d/file-62DeEuah24.png)

**Attention** : vous devez **obligatoirement** faire afficher la colonne ID Dendreo avant d'exporter le fichier.

- Ouvrez le fichier obtenu dans Excel et ajoutez les nouvelles informations à importer et mettre à jour.
- Sur la page d'[import des Participants](https://pro.dendreo.com/redirect/participants/imports), **copiez-collez uniquement les nouvelles données** à importer dans les colonnes correspondantes, et **ajoutez l'ID Dendreo de chaque Participant** dans la colonne ***Mise à jour***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68bef512fac1976a43e1ae70/file-eGq1x7Q0dN.png)

**À noter** : en saisissant un ID dans cette colonne, vous désignez la fiche Participant existante à mettre à jour dans votre CRM, aucun autre contrôle ne sera fait.

- Cliquez sur le bouton ***Importer*** pour mettre à jour les données.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68838f92ccd8424661790851/file-fJg3a7bBHs.png)

## Vérifications et contraintes à respecter

Dendreo opère certaines vérifications lors de l'import, mais **vérifiez bien vos données avant d'importer**, certaines colonnes du tableau imposant de respecter une certaine nomenclature des données :

- Si le champ ***ID Dendreo Participant*** est renseigné, il désigne la fiche à mettre à jour, **aucun contrôle ne sera fait sur les nom et prénom**.
- Le champ ***Nom*** est obligatoire si le champ ***ID Dendreo Participant*** n'est pas renseigné.
- Le champ ***Prénom*** est obligatoire si l'***ID Participant*** est renseigné.
- Le champ ***Civilité*** doit avoir pour valeur "M.", "Mme", "Dr", "Pr", "Me".
- Le champ ***Email*** doit être valide.
- Le champ ***Newsletter*** doit avoir pour valeur "0" ou "1".
- Le champ ***Langue principale*** doit avoir pour valeur "Français", "Anglais", "Allemand", "Néerlandais", "Arabe", "Chinois", "Coréen", "Créole haïtien", "Danois", "Espagnol", "Finnois", "Hongrois", "Italien", "Japonais", "Norvégien", "Polonais", "Portugais", "Russe", "Suédois", "Tamoul", "Turc", "Wolof", "Langue des signes française", "fr", "en", "de", "nl", "ar", "zh", "ko", "ht", "da", "es", "fi", "hu", "it", "ja", "no", "pl", "pt", "ru", "sv", "ta", "tr", "wo", "fsl".
- Le champ ***Langues secondaires*** doit avoir pour valeur (séparées par des points-virgules) "Français", "Anglais", "Allemand", "Néerlandais", "Arabe", "Chinois", "Coréen", "Créole haïtien", "Danois", "Espagnol", "Finnois", "Hongrois", "Italien", "Japonais", "Norvégien", "Polonais", "Portugais", "Russe", "Suédois", "Tamoul", "Turc", "Wolof", "Langue des signes française", "fr", "en", "de", "nl", "ar", "zh", "ko", "ht", "da", "es", "fi", "hu", "it", "ja", "no", "pl", "pt", "ru", "sv", "ta", "tr", "wo", "fsl".
- Le champ ***Statut BPF*** doit avoir pour valeur "salarié", "agent public", "travailleur non salarié", "personne en recherche d'emploi", "bénévole", "apprenti", "autre (BPF)", "hors BPF", "salarie", "agent_public", "non_salarie", "recherche_emploi", "benevole", "apprenti", "autre", "hors_bpf".
- Le champ ***Diplôme le plus élevé obtenu*** doit avoir pour valeur "Non renseigné", "Diplôme national du Brevet" ou "Sans diplôme", "Certificat de Qualification Professionnelle", "CAP" ou "BEP", ou "Diplôme ou titre à finalité professionnelle de niveau équivalent", "Baccalauréat (général, technologique ou professionnel)", ou "Diplôme ou titre à finalité professionnelle de niveau équivalent", "Diplôme ou titre à finalité professionnelle de niveau Bac+2 (DUT, BTS, DEUG)", "Diplôme ou titre à finalité professionnelle de niveau Bac+3 (Licence)" ou "Bac+4 (Maîtrise, Master 1)", "Diplôme ou titre à finalité professionnelle de niveau Bac+5 (Master, DEA, DESS, diplôme d'ingénieur)", "Diplôme ou titre à finalité professionnelle de niveau Bac+8 (Doctorat)", "sans", "cqp", "cap-bep", "bac", "bac+2", "bac+3", "bac+5", "bac+8".
- Le champ ***Date de naissance*** doit avoir la forme jj/mm/aaaa ou aaaa-mm-jj et contenir une date valide.
- Le champ ***Mode d'exercice dominant*** doit avoir pour valeur "Salarié", "Libéral", "Mixte", "Service de santé des armées", "Salarié d'un centre de santé conventionné", "salarie", "liberal", "mixte", "armee", "centre_conv".
- Le champ ***Responsable hiérarchique (Type)*** doit avoir pour valeur "contact" ou "participant".
- Le champ ***Responsable hiérarchique (ID)*** doit être l'ID Dendreo du Contact ou Participant.
- Le champ ***Groupe*** doit avoir pour valeur "Groupe A", "Groupe B" ou "Groupe C".

Si la fiche Participant de votre compte Dendreo est personnalisée avec des champs additionnels, le tableau d'import intègrera une colonne pour chacun de ces champs.

**À noter** : Dendreo opère certaines vérifications pour détecter automatiquement les doublons de Participants déjà présents dans votre base de données. Ces doublons ne sont pas importés. Si Dendreo détecte des Participants déjà présents dans votre base de donnée (doublons), leurs informations additionnelles sont **mises à jour**, mais toute information déjà présente **n'est pas écrasée**.
