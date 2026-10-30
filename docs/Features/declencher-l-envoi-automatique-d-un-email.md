# Déclencher l’envoi automatique d’un Email

Découvrez comment fonctionnent les Automatismes permettant l’envoi de vos Emails sans **aucune intervention manuelle** des membres de votre Équipe. Cette fonctionnalité, complémentaire aux [Emails programmés](https://doc.dendreo.com/article/438-emails-programmes), **vous permet d’automatiser la communication par Email** avec vos Participants, vos Formateurs et vos Contacts. Dans cet article, vous apprendrez notamment comment paramétrer les filtres et les conditions s'appliquant à l'envoi automatique de vos Emails par Dendreo.

**Cas d'usage** *: pour m'assurer que tous mes Participants puissent répondre à mon questionnaire de satisfaction à froid, je décide de créer un Automatisme pour que mon Modèle d'Email dédié au Questionnaire de Satisfaction à froid soit envoyé automatiquement 90 jours après la date du dernier créneau programmé, pour toutes mes Actions de Formation confirmées et à tous les Participants ayant été marqués comme présents.*

**Attention** : pour le bon fonctionnement des Automatismes, **il est essentiel de veiller au bon tagging de vos Modèles d’Emails et de Documents**. Contrairement aux Emails programmés, avec les Automatismes, Dendreo programmera des ordres d'envoi sans que vous ayez pu prévisualiser le contenu des Emails. Par précaution, avant de les lier à un Automatisme, nous vous recommandons d’**effectuer systématiquement des envois manuels ou programmés** de vos Modèles d'Email pour vous assurer qu’ils fonctionnent correctement et que tous les cas d’usage sont bien gérés par les tags 🚨

## Avant-propos

La bonne prise en main des Automatismes implique que vous maîtrisiez les fonctionnalités suivantes :

- Le [fonctionnement général des Emails](https://doc.dendreo.com/article/142-envoi-demails-dendreo) qui vous explique comment envoyer des Emails manuellement ;
- Les [Emails programmés](https://doc.dendreo.com/article/438-emails-programmes) pour définir manuellement et à l'avance la date et l'heure d'envoi d'un Email ;
- Les [Modèles d'Email](https://doc.dendreo.com/article/57-configuration-modeles-emails-suivi) pour configurer le contenu des Emails envoyés automatiquement ;
- Les [Modèles de document](https://doc.dendreo.com/article/326-introduction-aux-modeles-de-documents) à ajouter en pièces jointes des Emails envoyés automatiquement ;
- Les [Tags](https://doc.dendreo.com/article/107-tagging-modeles-de-document-type-fichier) (et particulièrement les [Tags conditionnels](https://doc.dendreo.com/article/259-tags-conditionnels)) pour variabiliser le contenu des Emails envoyés.

## Principe général

Depuis la configuration de votre compte Dendreo, vous devez commencer par créer des Automatismes qu'il faudra obligatoirement lier à un Modèle d'Email de votre [bibliothèque d'Emails](https://pro.dendreo.com/redirect/config_modeles_mails_types.php) et configurer plusieurs paramètres qui définiront les critères de déclenchement d'envoi.

Une fois activé, un Automatisme s’applique sur **toutes les Actions de Formation** qui remplissent les critères de déclenchement, y compris les Actions de Formation passées, en cours ou futures, **dès lors que la date d’envoi calculée est dans le futur**. Il est cependant possible de désactiver un Automatisme pour une Action de Formation, en vous rendant directement sur celle-ci.

Comme avec les [Emails programmés](https://doc.dendreo.com/article/438-emails-programmes), pour toutes les Actions de Formation concernées par l'Automatisme, Dendreo programme des ordres d'envoi que vous pouvez consulter. Notez que **ces ordres peuvent être modifiés automatiquement** si de nouveaux paramètres sont ajoutés entre le moment où ils ont été créés et le moment où l'envoi des Emails a réellement lieu (par exemple dans le cas d'un changement de la date d'un Créneau, de l'ajout ou de la suppression d'un Participant, etc.).

Une fois les Emails envoyés automatiquement, vous retrouvez dans les logs l'**historique des Emails envoyés**, ainsi que tous ceux envoyés depuis votre compte, qu'ils aient été programmés ou envoyés manuellement.

**À noter** : l'expéditeur de l'Email automatisé est l'**expéditeur par défaut** indiqué dans la [configuration](https://pro.dendreo.com/redirect/config_mails_types.php).

Vous êtes alerté sur votre compte Dendreo en cas de changement d'étape, de mode d'organisation, de catégorie ou de dates dans l'Action de Formation, qui rendent compatibles ou non l'application de l'Automatisme (selon les filtres définis sur celui-ci). Ces notifications disparaissent sous 10 secondes.

## Limites actuelles

- Cette première version permet uniquement de créer des Automatismes pour des Emails à envoyer dans le contexte d'une Action de Formation.
- L'envoi d’un Email peut ne pas être **immédiat** et nécessiter **un certain délai**, que l’envoi soit programmé ou manuel. Par exemple, si vous souhaitez envoyer un Email à 8h55 pour une Formation commençant à 9h, il se peut que l’Email n'arrive pas à destination avant le début de la Formation. Il est donc essentiel de prendre ce critère en compte lors de l’envoi de vos Emails.
- Il n'est pas possible d'ajouter des pièces jointes dans les Modèles d'Emails et Automatismes qui ne sont pas préalablement déposées dans votre bibliothèque de [Modèles de documents](https://pro.dendreo.com/redirect/config/documents-types).

## Fonctionnement général

Découvrez ci-dessous comment ajouter un Automatisme, l'activer pour une Action de Formation, gérer les Automatismes depuis une ADF et gérer les Relances, ainsi que comment consulter les Emails programmés.

### Ajouter un Automatisme

Pour mettre en œuvre l'automatisation des Emails, il suffit de suivre les étapes ci-dessous :

- Depuis le menu [***Automatismes***](https://pro.dendreo.com/redirect/config/automatismes), cliquez sur ***Ajouter un Automatisme***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a8820328565417004fc53de/file-erURuCONiy.png)

- Dans le contexte d'un compte multi-centres, choisissez les **Centres de Formation** avec lesquels vous souhaitez partager l’Automatisme.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65c49d295d8fe340f348169b/file-psrQYD1lQh.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65c49d295d8fe340f348169b/file-psrQYD1lQh.png)

**À noter** : un Automatisme peut être créé soit depuis la vue globale, soit depuis un sous-centre spécifique. Cependant, un administrateur d’un sous-centre ne pourra éditer, désactiver ou supprimer un Automatisme que si celui-ci n’est partagé qu’avec le sous-centre de l’administrateur en question. Dans tous les cas, la désactivation de l’Automatisme pourra toujours se faire ADF par ADF.

- Sélectionnez **la cible** de l’Automatisme.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65c49934ddc6d10d8ab292ce/file-BDQHKpNqYx.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65c49934ddc6d10d8ab292ce/file-BDQHKpNqYx.png)

**À noter** : vous devez avoir paramétré au moins un Modèle d’Email pour la cible sélectionnée afin de pouvoir créer l’Automatisme.

- Définissez **le délai** souhaité pour le déclenchement de l’Automatisme, par exemple le début ou la fin d'une Action de Formation, d’un Module, du premier ou dernier Créneau synchrone pour le Participant, etc.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65c4994dddc6d10d8ab292cf/file-00YpKnlBdf.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65c4994dddc6d10d8ab292cf/file-00YpKnlBdf.png)

Les types de délai ***Début du premier Créneau synchrone pour le Participant*** ou ***Fin du dernier Créneau synchrone pour le Participant*** sont utiles notamment dans le cas d’une Action de Formation à [planification progressive](https://doc.dendreo.com/article/208-modules-planification-progressive-partielle) ou bien pour les Formations e-learning.

- Sélectionnez le **Modèle d’Email** à utiliser ainsi que les **filtres de présence, CC et destinataires dynamiques**.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6638e4445ae8353469c6b506/file-MstgjpxNoB.png)

**À noter** : le symbole de trombone signifie que le Modèle d'Email contient une pièce jointe.

Le filtre de présence déterminera la liste des destinataires, qui sera donc dynamique et dépendra de la **condition sélectionnée au moment de l'envoi**. Par exemple, si vous ajoutez des Participants à une ADF, ceux-ci seront ajoutés à la liste des destinataires s'ils remplissent la condition sélectionnée.

Le même comportement s'applique pour les **CC dynamiques** : la liste des CC sera dynamique et dépendra de la liste finale des destinataires sélectionnés **au moment de l'envoi**.

**À noter** : si vous ne définissez pas de destinataire dynamique, le Contact au moment de l'envoi de l'Email sera celui défini dans l'Action de Formation (***Emails*** > ***Entreprise***) pour chaque Entreprise. Par défaut, il s'agit du Contact de l'ADF, ou à défaut, du Contact Principal, ou encore de l'Email d'Entreprise si aucun Contact n'est défini pour une Entreprise.

- Ajustez les **conditions de déclenchement** en fonction de vos besoins spécifiques en sélectionnant les [Étapes des Actions de Formation](https://doc.dendreo.com/article/21-etapes-des-actions-de-formation), le mode d’organisation (présentiel, à distance, e-learning, etc.) ainsi que les Catégories de Modules selon la cible sélectionnée précédemment.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/66aa03f7d39e504a2aed20ba/file-3wVlHvcfFl.png)

Par défaut, toutes les Catégories sont sélectionnées dans le champ ***Catégories de Modules*** mais vous pouvez en décochez certaines selon votre besoin :

- En activant ***Toutes les catégories***, toutes les Formations liées à des Catégories de Module existantes et des futures Catégories créées seront concernées par cet Automatisme.
- En cochant ***Aucune catégorie***, même si l'Action de Formation n'a pas de Catégorie associée, l'ADF sera quand même concernée par cet Automatisme.

**Attention** : si la cible de l'Automatisme est ***Participants***, ***Formateurs*** ou ***Entreprises d'une ADF***, la condition ***Catégories de Modules*** s'applique sur la catégorie principale de l'Action de Formation. Si la cible de l'Automatisme est ***Modules*** ou ***Créneaux d'une ADF***, c'est la catégorie de chaque Module de l’Action de Formation qui s'applique.

**À noter** : le mode d’organisation (de l’ADF ou du Module) pris en compte dans les conditions de l’Automatisme dépend du **contexte de l’Automatisme**. Pour plus d’informations, consultez notre documentation [**Questions fréquentes - Automatismes**](https://doc.dendreo.com/article/560-questions-frequentes-automatisme).

- Cliquez sur ***Créer l’Automatisme***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65c4a9ff657300085963129f/file-jtsQheesAR.png)

- Modifiez ou supprimez un Automatisme en cliquant sur l’icône de corbeille ou de crayon.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65c4aa8555e4ed3089c15ad4/file-LklX7FaI9T.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65c4aa8555e4ed3089c15ad4/file-LklX7FaI9T.png)

**À noter** : vous ne pouvez modifier un Automatisme que depuis la [configuration des Automatismes](https://pro.dendreo.com/redirect/config/automatismes). Depuis une Action de Formation, vous ne pouvez pas modifier ou supprimer un Automatisme mais simplement l'activer ou le désactiver pour cette Action de Formation.

**Attention** : si vous **supprimez** un Automatisme, les **Emails programmés liés** sont également supprimés.

### Activer un Automatisme

Par défaut, lors de la création d’un Automatisme, ce dernier est automatiquement **inactif**. Vous pouvez l'activer en cochant la case dédiée lors de sa création ou depuis l’interface de gestion des Automatismes.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65c4aa14ddc6d10d8ab292e3/file-5Jf5muGJLm.png)

Bouton d'activation depuis la création de l'Automatisme

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65c4aacf5d8fe340f34816a9/file-bDNnstEFzi.png)

Bouton d'activation depuis la gestion des Automatismes

**À noter** : si le bouton ***Actif*** apparaît en orange, il y a un problème dans la configuration de votre Automatisme. Vérifiez alors tout son paramétrage : étapes, modes d'organisation, etc.

Vous pouvez également activer ou désactiver les Automatismes depuis les différentes interfaces de planification d’une Action de Formation : depuis l’Agenda, un Module, un Devis ou encore un dossier EDOF !

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65c6345c6573000859631404/file-WujciySpzq.png)

Gestion des Automatismes lors de la création d'une ADF depuis l'Agenda

Une fois l'Automatisme créé et activé, le système analyse les Actions de Formation déjà créées, les Modules, Créneaux etc. qui remplissent les conditions de déclenchement. Des **Emails programmés liés à cet Automatisme seront alors créés** dès lors que la date d'envoi calculée est dans le futur. Par exemple, dans le cas où l’Automatisme est paramétré pour se déclencher 7 jours avant le début d’une ADF, si vous programmez une ADF 3 jours avant son commencement, l’Automatisme ne se déclenchera donc pas : les ordres d’envoi des Emails programmés ne seront pas créés et les Emails ne seront donc pas envoyés.

**À noter** : si vous **désactivez** un Automatisme depuis la **configuration**, les **Emails programmés liés** sont également supprimés.

### Gérer les Automatismes depuis une Action de Formation

Au niveau de chaque Action de Formation, depuis le menu ***Automatismes***, vous pouvez gérer les règles d'envoi automatique applicables, avec la possibilité d'**activer** ou de **désactiver** ces règles par ADF.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a8820658565417004fc53e0/file-wQoM4iTxLS.png)

Lors de la programmation d'une Action de Formation, vous pouvez donc **désactiver certains Automatismes** pour gérer des exceptions selon vos besoins.

**À noter** : ce qui est défini dans l’Action de Formation **n’impacte pas la configuration générale**.

Si vous souhaitez nous suggérer le **développement d’un nouvel Automatisme**, n’hésitez pas à poster votre demande sur le [**portail utilisateurs**](https://portail.dendreo.com/) ! 🚀

### Consulter les Emails programmés

Plusieurs tableaux de bord sont disponibles pour retrouver les Emails automatiques en attente d'envoi.

- **Depuis l'interface dédiée**

Depuis la page des [Emails programmés](https://pro.dendreo.com/redirect/emails/programmation), vous pouvez visualiser les **ordres d’envoi** programmés liés à vos Automatismes pour suivre les Emails planifiés et vous assurer qu'ils correspondent bien aux attentes et aux besoins de communication.

Les Emails programmés liés à des Automatismes sont représentés par une icône ⚡️ :

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65c49bf4ddc6d10d8ab292d2/file-bzhgqdggdH.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65c49bf4ddc6d10d8ab292d2/file-bzhgqdggdH.png)

En survolant l'icône, consultez le détail de la date de déclenchement paramétrée en configuration :

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65c49c4a5d8fe340f348169a/file-uB5HXYNVTJ.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65c49c4a5d8fe340f348169a/file-uB5HXYNVTJ.png)

Si besoin, vous avez toujours la possibilité de créer des Emails programmés spécifiques pour une Action de Formation ou envoyer un Email à la demande depuis une Action de Formation.

- **Depuis une Action de Formation**

Pour retrouver tous les ordres liés à une Action de Formation, il suffit de vous rendre sur l'onglet ***Emails programmés*** de l'Action de Formation.

- **Depuis une fiche CRM**

Pour retrouver tous les ordres liés à un interlocuteur de votre CRM (Participant, Contact, Entreprise, Formateur, Salle, etc.), rendez-vous sur l'onglet ***Emails programmés*** de sa fiche.

**À noter** : les Emails programmés sont **automatiquement mis à jour** si les paramètres de l'ADF (dates, Étapes, mode d'organisation, etc.) sont modifiés. Les Emails programmés **évoluent** en fonction de différents événements pouvant survenir sur l'ADF, tels que l'ajout ou la suppression d'un Participant.

Pour plus d’informations, consultez la documentation [**Programmer l'envoi d'un Email**](https://doc.dendreo.com/article/438-emails-programmes).

### Gérer les relances

Pour gérer les relances, cochez ***Autoriser le renvoi de ce Modèle d’Email aux destinataires l’ayant déjà reçu*** depuis le Modèle d’Email.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/662b9b41e7511e33f36ea75e/file-uzkV57B4Hy.png)

Créez ainsi plusieurs Automatismes avec le même Modèle d’Email, à des temporalités différentes !

Par défaut et si vous ne cochez pas cette case, les destinataires ayant déjà reçu cet Email sont **retirés automatiquement de la liste des destinataires** : **dans le cas d'un Automatisme** ou d'un Email programmé avec filtre de destinataire dans le même contexte (même ADF, Module ou même Créneau par exemple), **les destinataires seront ignorés**.

**À noter** : dans le cas d'une relance basée sur un Modèle d'Email liés aux Questionnaires, les personnes ayant déjà répondu aux Questionnaires seront automatiquement exclus des destinataires des différents envois dans le contexte d'une Action de Formation.
