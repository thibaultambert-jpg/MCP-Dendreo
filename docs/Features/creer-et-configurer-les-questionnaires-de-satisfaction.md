# Créer et configurer les Questionnaires de Satisfaction

Sur la page de [configuration des Questionnaires de Satisfaction](https://pro.dendreo.com/redirect/config/satisfaction), vous avez la possibilité de personnaliser l'ensemble de vos Questionnaires de Satisfaction en renseignant les questions qui seront ensuite utilisées pour générer dynamiquement les Questionnaires selon le contenu de vos Actions de Formation.

## Ajouter des questions

Vous pouvez créer des questions relatives à l'évaluation des cibles suivantes :

- Modules de Formation ;
- Formateurs (Questionnaire de satisfaction Participant) ;
- Lieux de la Formation (Salles) ;
- Action de Formation dans sa globalité ;
- Participants (Bilan Formateur)*.*

**Attention** : si vous n'ajoutez aucune question, le Questionnaire ne sera pas proposé sur les Extranets.

Pour chaque question, différents formats sont possibles :

- ***Notation*** qui se traduit par une note de 0 à l'amplitude de notation à paramétrer pour chaque question ;

**À noter** : vous devez ajouter des questions de type ***Notation*** pour calculer le **taux de Satisfaction**.

- ***Question ouverte***, c'est un champ texte dans lequel les participants peuvent répondre librement ;
- ***Question fermée*** qui permet aux Participants de répondre uniquement par ***Oui*** ou ***Non*** ;
- **Liste de choix et choix multiple** qui proposent de choisir une ou plusieurs valeurs prédéfinies.

Vous pouvez rendre les questions **obligatoires** (1), **apporter un commentaire** afin d'aiguiller le répondant dans sa réponse (2), **définir l'ordre d'affichage** sur le questionnaire (3) et le **prévisualiser** en cliquant sur le bouton dédié (4). Vous pouvez également définir des questions différentes selon le type de Salle (interne, externe, virtuelle, etc.).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6ae45c0c7a818bc1a43e0e78/file-yPMVhrQNqu.png)

**À noter** : il n'est pas possible de modifier l'ordre des blocs prédéfinis dans les Questionnaires de Satisfaction (évaluation de chaque Module, de chaque Formateur, etc.), mais vous pouvez réorganiser les questions à l'intérieur des blocs en modifiant leur ordre grâce aux flèches.

## Définir les messages à afficher

Dans cette section, **renseignez** **et mettez en forme** les contenus texte qui introduisant et clôturant vos questionnaires en fonction des destinataires (Participants ou Formateurs).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6ae45c4b105ad8b9d156c9f9/file-rowfORi3OL.png)

## Définir les paramètres généraux

Dans cette section, vous pouvez configurer les paramètres généraux suivants :

- ***Réglage par défaut des questions de type notation*** : vous permet de définir l'affichage par défaut des notes au moment où le Participant commence à répondre ;
- ***Bloquer l'édition des réponses déjà répondues (sauf pour les administrateurs)*** : en désactivant cette option, dans le cas des Actions de Formation multi-modules, les Participants peuvent modifier les réponses des questions auxquelles ils ont déjà répondu pour les Modules précédents ;
- ***Période de calcul des moyennes de satisfaction*** ***ET de taux de réussite (x derniers mois)*** : par défaut, la période de calcul est de 12 mois, mais vous pouvez choisir la période de calcul que vous souhaitez. Ce réglage a aussi un effet sur le calcul des notes lorsque vous [initialisez une Satisfaction sur vos Modules](https://doc.dendreo.com/article/289-initialiser-note-satisfaction-existante-module).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6ae45e7bc977b69184bb89da/file-4TJBd66kKz.png)

**À noter** : le nom du Formateur staffé sur l'Action de Formation est systématiquement affiché sur le Questionnaire de Satisfaction, vous ne pouvez pas masquer ce nom. Cependant, si un Formateur sous-traitant est staffé sur l'Action de Formation, seule le nom de l'Entreprise sous-traitante apparaît.

### Paramètres des questionnaires Participants

Dans cette section, vous pouvez configurer les paramètres spécifiques aux Questionnaires Participants :

- ***Évaluation des Formateurs*** : vous permet de définir la gestion de l'évaluation des Formateurs, à savoir soit pour l'Action de Formation dans son ensemble, soit Module par Module si un Formateur intervient sur plusieurs Modules de votre Action de Formation ;
- ***Rendre disponibles les Questionnaires au fur et à mesure de la complétion des Modules*** : en activant cette option, dans le cas des Actions de Formation multi-modules, les Participants peuvent répondre au Questionnaire à chaud à la fin de chaque Module ;
- ***Délai, avant la fin du dernier Créneau, à partir duquel rendre le Questionnaire à chaud disponible sur les Extranets Participants*** : vous permet de définir le délai d'affichage du Questionnaire à chaud sur l’Extranet de vos Participants avant la fin du dernier Créneau de l'Action de Formation ;
- ***Délai avant d’afficher le Questionnaire à froid sur les Extranets Participants*** ***(en mois)*** : vous permet de définir le délai d’affichage du Questionnaire à froid sur l’Extranet de vos Participants après la date de fin de l'Action de Formation ;
- ***Délai après lequel le Questionnaire à froid n’est plus affiché sur les Extranets Participants (en mois)*** : vous permet de définir le délai de disponibilité du Questionnaire à froid sur les Extranets Participants. Après ce délai, le Questionnaire disparaitra automatiquement pour ne pas polluer l'interface de vos Participants avec de très vieux Questionnaires (utile notamment lors de l'[import de données initial](https://doc.dendreo.com/article/150-import-initial-de-donnees)).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6ae45ee30a5ebf5c5ad18063/file-A26nRHaEQD.png)

**À noter** : le Questionnaire de Satisfaction reste disponible 7 jours sur la page d'accueil de l'Extranet Participants. Passé ce délai, le Questionnaire ne sera disponible sur l'Extranet que depuis la page de l'Action de Formation, sans limite de temps.

### Paramètres des Bilans Formateurs

Dans cette section, vous pouvez configurer les paramètres spécifiques au Bilan Formateur :

- ***Évaluation des Participants*** *:* vous permet de définir la gestion de l'évaluation des Participants, à savoir soit au global de l'Action de Formation soit Module par Module dans le cas des ADF multi-modules ;
- ***Rendre disponibles les Questionnaires au fur et à mesure de la complétion des Modules*** : en activant cette option, dans le cas des Actions de Formation multi-modules, les Formateurs peuvent répondre au Bilan Formateur à la fin de chaque Module.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6ae46074c977b69184bb89e1/file-ePyqcBKys9.png)

### Paramètres des notifications

Dans cette section, vous pouvez définir et paramétrer des notifications spécifiques à vos Questionnaires :

- ***Email administrateur à alerter lorsqu'un Questionnaire est soumis*** : vous permet de renseigner l'adresse Email vers laquelle Dendreo enverra les Emails d'alerte dès lors qu'un Participant répond à un Questionnaire ou qu'un Formateur répond à un Bilan Formateur. Laissez vide pour ne pas envoyer de notification. Renseignez plusieurs adresses mail en les espaçant d'une virgule.
- ***Recevoir les notifications seulement si une note est en dessous ou égale au seuil suivant (en %)*** : vous permet de définir un seuil de note à partir duquel vous souhaitez activer l'envoi de l'Email administrateur activé précédemment (pour n'être alerté que des problèmes). Si au moins une des notes du Questionnaire renseigné par un Participant est inférieure au seuil défini, vous serez alors notifié ;
- ***Envoyer un Email d'accusé de réception au Participant ayant répondu à un Questionnaire*** : vous permet d'activer l'envoi d'un email d'accusé de réception aux Participants qui répondent à vos Questionnaires. Configurez d'abord un Modèle d'Email avec l'action système ***Accusé de réception d'un Questionnaire*** ;
- ***Envoyer un email d'accusé de réception au Formateur ayant répondu à un Questionnaire*** : vous permet d'activer l'envoi d'un email d'accusé de réception aux Formateurs qui répondent au Bilan Formateur. Configurez d'abord un Modèle d'Email avec l'action système [***Accusé de réception d'un Questionnaire***](https://doc.dendreo.com/article/325-email-declenche-par-une-action-systeme) ;
- ***Avertir aussi le Responsable de l’Action de Formation (si défini)*** : en plus d’alerter l’administrateur en charge des Questionnaires de Satisfaction, il est possible de prévenir le Responsable (Dendreo) lorsqu’il est renseigné au niveau de l’Action de Formation.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6ae46103c977b69184bb89e3/file-eWmxuG5sHk.png)

## Désactiver les Questionnaires

Depuis cette section, vous pouvez **désactiver** la fonctionnalité des Questionnaires de Satisfaction sur l'intégralité de votre compte Dendreo (utile si vous utilisez un autre système que celui intégré dans Dendreo).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6ae464ce246fe720137fbb32/file-xCZhixdwAe.png)

## Configurer les Questionnaires par sous-centre

Avec votre compte multi-centres, vous avez la possibilité de personnaliser les Questionnaires de Satisfaction par sous-centre plutôt que d’utiliser un Questionnaire global applicable à tous.

Cette option est particulièrement utile pour les Organismes de Formations composés de sous-centres ayant des **activités** ou des [**langues différentes**](https://doc.dendreo.com/article/547-presentation-multilingue), offrant ainsi la possibilité d'effectuer une analyse de Satisfaction adaptée aux particularités de chaque sous-centre.

Cette fonctionnalité n’est pas activée par défaut, il vous faut donc tout d’abord vous rendre **depuis la vue globale** dans la [configuration du multi-centres](https://pro.dendreo.com/redirect/config/centres-de-formation) : sélectionnez ensuite ***Oui*** à ***Autoriser la personnalisation des Questionnaires de Satisfaction par Centre de Formation***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6ae465164ddfd65faa2e4a19/file-5htfcsWd1o.png)

Une fois l’option activée, rendez-vous dans la [configuration des Questionnaires de Satisfaction](https://pro.dendreo.com/redirect/config/satisfaction) depuis la **vue spécifique à chaque sous-centre**. Dans les onglets des différents Questionnaires, cliquez sur ***Utiliser un Questionnaire personnalisé pour ce Centre de Formation***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6ae465c30a5ebf5c5ad18076/file-XzkjAC2MWU.png)

Si vous souhaitez finalement revenir à un Questionnaire commun à tous les sous-centres, cliquez sur ***Utiliser le Questionnaire global***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6ae465a54ddfd65faa2e4a1b/file-msHjs7GOKa.png)

**À noter** : toute modification apportée au Questionnaire global telle que l'ajout de questions, ne se **répercute pas automatiquement** sur les Questionnaires personnalisés des sous-centres. Il vous faut ainsi appliquer ces modifications à la main sur les Questionnaires personnalisés.
