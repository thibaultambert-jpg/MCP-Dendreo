# Programmer l'envoi d'un Email

Cette page présente la fonctionnalité des **Emails programmés** de Dendreo : le fonctionnement général, la programmation de l'envoi d'Emails, le suivi des Emails programmés pas encore envoyés, et différents cas d'usage pouvant avoir des incidences sur l'envoi d'un Email déjà programmé.

Les Emails programmés vous permettent :

- De définir manuellement la date et l'heure d'envoi d'un Email, par exemple pour tous les Participants d'une Action de Formation, ou pour un Formateur (éventuellement hors Action de Formation) ;
- De définir manuellement, dans le cadre d'une Action de Formation, le moment auquel envoyer un Email selon un événement (par exemple, trois jours avant l'heure de début d'une Action de Formation).

Cette fonctionnalité est complémentaire aux **Automatismes**. Pour aller plus loin, et découvrir le fonctionnement des Automatismes permettant l’envoi de vos Emails sans **aucune intervention manuelle**, consultez la documentation [**Déclencher l’envoi automatique d’un Email**](https://doc.dendreo.com/article/554-parametrer-l-envoi-automatique-des-emails).

**Attention** : l’envoi d’un Email peut ne pas être **immédiat** et nécessiter **un certain délai**, que l’envoi soit programmé ou manuel. Par exemple, si vous souhaitez envoyer un Email à 8h55 pour une Formation commençant à 9h, il se peut que l’Email n'arrive pas à destination avant le début de la Formation. Il est donc essentiel de prendre ce critère en compte lors de l’envoi de vos Emails.

## Avant-propos

La bonne prise en main de la fonctionnalité des Emails programmés implique que vous maîtrisiez les fonctionnalités suivantes :

- La [création des Modèles d'Emails](https://doc.dendreo.com/article/57-configuration-modeles-emails-suivi) qui sont utilisés pour programmer vos envois ;
- La [génération des Modèles de Documents](https://doc.dendreo.com/article/326-introduction-aux-modeles-de-documents) à ajouter en pièces jointes des Emails programmés ;
- Le [fonctionnement général des Emails](https://doc.dendreo.com/article/142-envoi-demails-dendreo) sur Dendreo.

L'utilisation des Emails programmés ne requiert **aucune configuration** : cette fonctionnalité est disponible **par défaut** sur votre compte sans activation préalable et sans coût supplémentaire.

## Principe général

Depuis l'interface d'envoi des Emails, au lieu de déclencher l'envoi immédiat d'un Email, Dendreo vous propose de **planifier son envoi dans le futur** en définissant à l'avance, au choix :

- La date et l'heure souhaitées, précisément ;
- La date et l'heure souhaitées de façon dynamique liée à un Événement.

Une fois programmés, l'Email et son contenu (destinataire, objet, corps du mail et pièces jointes) sont placés en file d'attente, et Dendreo déclenche automatiquement l'envoi au moment voulu.

Les Emails programmés sont particulièrement utiles si vous souhaitez :

- Optimiser la lecture de vos Emails en sélectionnant le moment idéal pour vos destinataires (par exemple programmer l'envoi d'un Email de rappel la veille du premier jour d'une Action de Formation) ;
- Avoir la garantie de communiquer les informations en temps voulu à vos interlocuteurs ;
- Gagner du temps dans la gestion de vos Emails depuis Dendreo.

L'envoi programmé d'un Email (ou de plusieurs emails dans le cas d'envoi groupé) est appelé un "**ordre**". Tous les ordres sont consultables et modifiables avant leur envoi.

## Fonctionnement général

Vous pouvez programmer l'envoi d'un Email soit en définissant une date heure d'envoi, soit en renseignant une période de temps à respecter avant ou après un certain événement pour déclencher l'envoi de l'Email.

#### Programmer l'envoi d'un Email à date et heure fixe

Depuis l'interface d'envoi des Emails, le bouton ***Envoi programmé*** vous permet de définir la date (le jour même ou dans le futur) et l'heure (au minimum 5 minutes dans le futur) de l'envoi :

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb43f11409b478491f5d89/file-kFSJXqxAoY.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65cb43f11409b478491f5d89/file-kFSJXqxAoY.png)

**À noter** : les jours et les heures d'envois programmés sont calculés en fonction du fuseau horaire de votre Organisme de Formation paramétré dans la [configuration de l'Agenda](https://pro.dendreo.com/redirect/config_agenda.php).

Lors de l'envoi de l'Email, vous serez alerté si vous ajoutez un Participant **sans adresse mail**.

#### Programmer l'envoi d'un Email à date et heure dynamique

Il est également possible, depuis l'interface d'envoi des Emails dans le cadre d'une ADF, de définir le moment de l'envoi grâce à un délai relatif à un Événement.

Cet Événement peut varier selon le destinataire de l'Email : début ou fin de l'ADF en général, début ou fin spécifiquement pour les Participants ou Formateurs concernés, début ou fin du Module, du Créneau, etc.

L'option ***Début de l'ADF*** correspond au premier jour de l'Action de Formation, alors que ***Début de l'ADF (Participant)*** correspond au premier jour d'inscription du Participant : l'ADF peut commencer le 26 janvier (***Début de l'ADF***) mais le Participant peut être inscrit seulement au second Module prévu le 1er février (***Début de l'ADF (Participant)***). La même logique s'applique pour les dates de fin.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb44421515e26e4a2f4bd7/file-KEZGwbUHah.png)

**À noter** : en sélectionnant des Événements type ***Début (Participant)***, ***Fin (Participant)*** ou ***Début (Formateur)***, la date d'envoi de l'Email dépend de l'inscription ou du staffing de chaque destinataire.

Les types de délai ***Début du premier Créneau synchrone pour le Participant*** ou ***Fin du dernier Créneau synchrone pour le Participant*** sont utiles notamment dans le cas d’une Action de Formation à [planification progressive](https://doc.dendreo.com/article/208-modules-planification-progressive-partielle) ou bien pour les Formations e-learning.

**À noter** : l'ordre avec date dynamique reste actif **jusqu'à un mois** après la fin de l'ADF. Ainsi, si vous ajoutez un Participant ou un Formateur **après que la date du dernier envoi soit passée** et dans le mois qui suit la fin de l'ADF, l'ordre est toujours actif et le Participant ou le Formateur est bien ajouté aux destinataires de l'Email.

#### Envoyer un Email programmé

Lorsque les conditions de planification sont atteintes, Dendreo envoie l'Email programmé. Plusieurs éléments de l'Email sont repris par Dendreo tels qu'ils étaient configurés au moment de la programmation, à savoir :

- **Les contenus** composant le corps de l'Email (les tags, les URL, la mise en forme du texte, les images, etc.) ;
- **Les pièces jointes** ajoutées (par défaut et/ou manuellement) ;
- **La demande de signature électronique** si elle a été activée (par défaut ou manuellement).

**À noter** : l'Étape d'une ADF (échec, annulée, etc.) n’annule pas la programmation de l’envoi d’un Email.

#### Insérer du contenu dynamique

Les contenus "dynamiques" de votre Modèle d'Email et/ou de documents joints qui sont alimentés par des tags, sont renseignés en fonction de l'information connue par Dendreo **au moment de l'envoi de l'Email**. Ainsi, certains éléments modifiés entre le moment de la programmation et l'envoi de l'Email sont pris en compte.

**Le filtre de présence déterminé sur le modèle d'Email à destination des Participants**

Le filtre de présence du Modèle d’Email est désormais rappelé au moment de l’envoi de l’Email, et peut être modifié. Ainsi, si vous avez programmé un envoi d'Email et qu'un filtre de présence a été sélectionné au moment de la programmation, ce filtre détermine la liste des destinataires, qui évolue selon le relevé de présence, jusqu’au moment de l’envoi de l'Email.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb4ad61515e26e4a2f4be1/file-JlyYVdj7Bf.png)

Pour un envoi d’Email groupé et programmé à l’attention des Participants, Formateurs ou Entreprises d’une Action de Formation, si vous sélectionnez l’ensemble des destinataires, le filtre ***Tous les Participants, Formateurs, Entreprises*** sera appliqué automatiquement. Ainsi, si vous ajoutez un Participant, un Formateur ou une Entreprise à l’ADF avant la date d’envoi du mail programmé, le destinataire sera automatiquement ajouté dans l'ordre d'envoi.

Lorsqu'un email est programmé, l'icône de calendrier apparaît dans l'onglet ***Emails*** d'une ADF. En survolant l'icône, un récapitulatif des destinataires et du Modèle d'email concerné s'affiche au survol.

**Les CC dynamiques**

Dans le champ ***CC*** vous retrouvez les **CC dynamiques** configurées dans le Modèle d'Email, que vous pouvez tout de même modifier.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb4afd1409b478491f5d94/file-JBYikpll2d.png)

**À noter** : si vous programmez cet Email avec un filtre pour un envoi ultérieur, la liste des CC sera dynamique et dépendra de la liste finale des destinataires au moment de l'envoi.

Depuis le tableau des [Emails programmés](https://pro.dendreo.com/redirect/emails/programmation), vous retrouvez les filtres précédemment définis.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb4b4f2cb21c6ca90d9653/file-o67ewAEuHV.png)

#### Consulter les Emails programmés en attente d'envoi

Plusieurs tableaux de bord sont disponibles pour retrouver les Emails programmés en attente d'envoi.

- **Depuis l'onglet Emails programmés**

Depuis le menu ***Reporting*** > [***Emails programmés***](https://pro.dendreo.com/redirect/emails/programmation), vous retrouvez la liste l'intégralité de vos ordres quel que soit le contexte (depuis une ADF, un Devis, une Facture, etc.) :

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/62c85911360964399e46ee9f/file-VYgxRglrib.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/62c85911360964399e46ee9f/file-VYgxRglrib.png)

- **Depuis une Action de Formation**

Pour retrouver tous les ordres liés à une Action de Formation, il suffit de vous rendre sur l'onglet ***Emails programmés*** de cette Action de Formation.

- **Depuis une fiche CRM**

Pour retrouver tous les ordres liés à un interlocuteur de votre CRM (Participant, Contact, Entreprise, Formateur, Salle, etc.), rendez-vous sur l'onglet ***Emails programmés*** de sa fiche.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a881ff6534a1e3b311bede2/file-0d3HaPYKs9.png)

#### Modifier et supprimer un Email programmé

Un Email programmé qui n'a pas encore été envoyé peut être modifié ou supprimé avant son envoi définitif. Il est possible de réaliser plusieurs modifications :

- Ajuster les contenus de l'Email (objet et corps) ;
- Ajouter ou supprimer des destinataires ;
- Ajouter ou supprimer des pièces jointes manuelles ;
- Activer ou révoquer la signature électronique d'une pièce jointe ;
- Modifier la date ou l'heure d'envoi de l'Email ;
- Supprimer l'ordre de programmation.

**Attention** : si vous avez modifié le Modèle d'Email depuis votre [bibliothèque d'Emails](https://pro.dendreo.com/redirect/config_modeles_mails_types.php), cette modification ne sera pas prise en compte pour un ordre déjà défini. Afin d'appliquer le nouveau Modèle d'Email, il est nécessaire de supprimer l'ordre de programmation et de le recommencer.

## Spécificités

Dès lors qu'un Email est programmé, certaines actions que vous êtes amené à réaliser sur votre compte Dendreo peuvent avoir des incidences sur le bon déroulé du process d'envoi d'Emails programmés.

Voici la liste des **actions et incidences liées** :

| **Action** | **Incidence sur les Emails programmés du contexte** |
| --- | --- |
| Suppression d'une Action de Formation | Suppression de TOUS les Emails programmés depuis la fiche de l'Action de Formation. |
| Suppression d'un Participant dans une Action de Formation | Retrait du Participant de la liste des destinataires de TOUS les Emails programmés depuis la fiche de l'Action de Formation (et suppression des Emails programmés depuis la fiche de l'Action de Formation, s'il en est l'unique destinataire). |
| Ajout d'un Participant dans une Action de Formation | Ajout du Participant à la liste des destinataires des Emails programmés depuis la fiche de l'Action de Formation sur lesquels un filtre de présence est appliqué, si le Participant répond à la condition de présence spécifiée. |
| Désinscription d'un Participant à un Module | Retrait du Participant de la liste des destinataires de TOUS les Emails programmés pour ce Module depuis la fiche de l'Action de Formation (et suppression des Emails programmés pour ce Module depuis la fiche de l'Action de Formation, s'il en est l'unique destinataire). S'il s'agissait du dernier, ou du seul Module auquel était inscrit le Participant, il est également exclus de la liste des destinataires de TOUS les autres Emails programmés depuis la fiche de l'Action de Formation. |
| Ajout d'un Formateur dans une Action de Formation | Ajout du Formateur à la liste des destinataires des Emails programmés depuis la fiche de l'Action de Formation pour lesquels les destinataires sont ***Tous les Formateurs***. |
| Suppression d'un Formateur staffé dans une Action de Formation | Retrait du Formateur de la liste des destinataires de TOUS les Emails programmés depuis la fiche de l'Action de Formation (et suppression des Emails programmés depuis la fiche de l'Action de Formation, s'il en est l'unique destinataire). |
| Ajout d'une Entreprise dans une Action de formation (par le biais d'une inscription) | Ajout du Contact de l'Entreprise à la liste des destinataires des Emails programmés depuis la fiche de l'Action de Formation pour lesquels les destinataires sont ***Toutes les Entreprises***. |
| Suppression du staffing d'un Formateur à un Module ou un Créneau | Retrait du Formateur de la liste des destinataires et CC des emails programmés pour ce Module ou ce Créneau. |
| Suppression d'un Module ou d'un Créneau | Suppression de TOUS les Emails programmés liés à ce Module ou ce Créneau. |
| Suppression d'une Fiche CRM | Suppression de TOUS les Emails programmés depuis la fiche CRM (ne sont pas supprimés les Emails programmés depuis la fiche d'une Action de Formation sur laquelle le Participant a été inscrit, ou le Formateur staffé, en amont de la suppression de sa fiche CRM). |
| Suppression d'une Salle | Suppression de TOUS les Emails programmés depuis la fiche de la Salle. |
| Suppression d'une Inscription au Catalogue Public | Suppression de TOUS les Emails programmés depuis l'interface de gestion des pré-inscriptions. |
| Suppression d'un Devis | Suppression de TOUS les Emails programmés depuis la fiche du Devis. |
| Suppression d'un Financement | Suppression de TOUS les Emails programmés concernant le Financement. |
| Suppression d'une Facture | Suppression de TOUS les Emails programmés concernant la Facture. |
