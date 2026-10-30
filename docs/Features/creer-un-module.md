# Créer un Module

Cette page vous permet de découvrir la procédure permettant de créer un Module et ainsi enrichir votre [Catalogue de Formations](https://pro.dendreo.com/redirect/modules) pour pouvoir créer par la suite vos Actions de Formation.

**À noter** : cet article ne concerne que la création de **Modules simples**. Il est également possible de créer des "lots" regroupant plusieurs Modules (pour la gestion synchrone/asynchrone par exemple). Si vous souhaitez créer un Module Composé, consultez [notre documentation](https://doc.dendreo.com/article/459-modules-composes).

## Avant-propos

Comme pour l'ensemble des fonctionnalités de Dendreo, vous pouvez configurer certaines **données par défaut** depuis [l'interface de configuration](https://pro.dendreo.com/redirect/config/modules). Une fois ces valeurs par défaut définies (public visé, modalités pédagogiques, nombre de Participants minimum et maximum, etc.), la configuration s'applique et les champs concernés se renseignent automatiquement sur la fiche de chaque nouveau Module créé.

Vous pouvez notamment configurer un planning de Formation type par défaut : cela s'avère particulièrement utile si la plupart de vos Formations se déroulent de la même manière (sur 2 jours par exemple).

Plusieurs éléments sont disponibles dans votre espace de configuration dédié aux Modules afin de faciliter la gestion de votre Catalogue de Formations :

- Les [informations par défaut](https://pro.dendreo.com/redirect/config/modules)
- Les [Compétences](https://pro.dendreo.com/redirect/config/modules/competences)
- Les [Catégories](https://pro.dendreo.com/redirect/config/modules/categories)
- Les [Recyclages](https://pro.dendreo.com/redirect/config/modules/recyclages)

## Fonctionnement général

Depuis la page de votre [Catalogue de Formations](https://pro.dendreo.com/redirect/modules), cliquez sur ***Ajouter*** > ***Ajouter un Module de Formation***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a439b9e0c66223cfc66c12/file-3pHlF9kuZy.png)

**À noter** : si vous avez de nombreux Modules à ajouter dans Dendreo, vous ne pouvez pas réaliser d'import de Modules via un fichier CSV en autonomie. Seul l'[import initial](https://doc.dendreo.com/article/150-import-initial-de-donnees), inclus dans les frais de mise en service lors de la souscription à Dendreo, est pris en charge. Des imports supplémentaires de Modules peuvent être effectués, mais ils seront facturés en tant que prestation additionnelle.

### Informations générales

Dans la section ***Informations générales*** de la fiche de création du Module, configurez les champs suivants :

- ***Intitulé*** : ce champ est obligatoire, il vous permet d'attribuer un nom à votre Module.
- ***Couleurs dans l'Agenda des ADF programmées depuis ce Module*** : ajoutez le code de la couleur souhaitée ou sélectionnez-la directement dans l'encadré. La couleur choisie sera appliquée aux Créneaux dans votre Agenda. Si vous laissez le champ vide, une couleur sera fixée aléatoirement.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a43a3d732de83363bef223/file-ZlQTZMIJbK.png)

### Classification

Dans la section ***Classification*** de la fiche de création du Module, configurez les champs suivants :

- ***Mode d'organisation*** : ce champ vous permet de définir la manière dont se déroule le Module au cours de la Formation. Plusieurs options sont disponibles :

- ***Présentiel*** : il est constitué de Créneaux, en présence physique ;
- ***À distance*** : il est constitué de Créneaux, en classe virtuelle ou par téléphone. Il fonctionne comme le présentiel, à la différence que cela compte comme de la FOAD (Formation Ouverte À Distance) ;
- ***Mixte (en présentiel / à distance)*** : en sélectionnant le mode d'organisation Mixte, vous pouvez avoir un seul Module utilisé à la fois pour des Formations en présentiel et à distance. C'est à l'étape de programmation de l'Action de Formation que vous choisissez le mode souhaité, en sélectionnant une salle soit virtuelle (pour le mode à distance) soit physique (pour le mode en présentiel) ;
- [***E-learning***](https://doc.dendreo.com/article/200-creer-un-module-e-learning) : il n'a pas de Créneaux (Formation asynchrone) mais une simple plage de dates d'ouverture durant laquelle les Participants ont accès à une plateforme LMS. Il compte également comme de la FOAD ;
- ***Stage en Entreprise*** : il est constitué de Créneaux, mais pour un stagiaire au sein d'une Entreprise. Avec ce mode, Dendreo classera votre Module obligatoirement en **Hors catalogue**.

**À noter** : dans le cas d'un Module mixte, vous pouvez programmer une [**Formation en Duplex**](https://doc.dendreo.com/article/330-module-en-duplex-presentiel-distanciel-simultane) grâce avec un seul et unique Module mixte **simultanément**. Vous pouvez aussi programmer une Formation en présentiel et distanciel mais pas au même moment (avec plusieurs Créneaux d'un même Module).

- [***Catégorie***](https://doc.dendreo.com/article/140-categories-de-modules) : choisissez la catégorie ou sous-catégorie du Module. Si vous utilisez la fonctionnalité du [Catalogue Public](https://doc.dendreo.com/article/188-introduction-au-catalogue-public), cela permettra de classer les différents Modules sur votre page d'accueil.
- ***Spécialité de la formation (code NSF)*** : il s'agit de la spécialité qui servira à la génération de votre [BPF](https://doc.dendreo.com/article/31-introduction-au-bilan-pedagogique-et-financier) lorsque vous programmez des Actions de Formation à partir de ce Module. Elle se trouve dans l'encadré F-4. Ce champ est obligatoire pour le [**Passeport de prévention**](https://doc.dendreo.com/article/739-gerer-passeport-de-prevention-sur-dendreo).
- ***Domaines de la Formation (Formacode)*** : vous pouvez sélectionner 5 valeurs maximum. Ce champ est obligatoire pour le [**Passeport de prévention**](https://doc.dendreo.com/article/739-gerer-passeport-de-prevention-sur-dendreo).
- ***Inclure dans le BPF*** : cochez cette case si vous souhaitez que les Actions de Formation dérivées de ce Module soient automatiquement incluses dans votre Bilan Pédagogique et Financier.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a3bcefbece6e76ef30137ba/file-EzJ0vMVHdd.png)

- [***Module inclus dans la Satisfaction***](https://doc.dendreo.com/article/79-questionnaire-satisfaction) : déterminez ici si vous souhaitez recueillir la Satisfaction des Participants pour ce Module. Le cas échéant, Dendreo calculera la moyenne de Satisfaction pour ce Module. Il est également possible d'**initialiser une note de Satisfaction**.
- ***Module inclus dans les Évaluations*** : ce champ vous permet de déterminer si vous souhaitez que les Formateurs puissent évaluer les Participants aux Actions de Formation contenant ce Module sur les Compétences de ce dernier. Le cas échéant, Dendreo agrègera les notes sous forme d'un **taux de réussite** pour le Module concerné. Taux de réussite que vous pourrez, dans le cas où vous disposez de cette option, afficher sur votre [Catalogue Public](https://doc.dendreo.com/article/188-introduction-au-catalogue-public). Il est également possible d'**initialiser un taux de réussite**.
- ***Cacher la Satisfaction sur le Catalogue Public pour ce Module*** : sélectionnez ***Oui*** pour la masquer.
- ***Cacher le taux de réussite sur le Catalogue Public pour ce Module*** : sélectionnez ***Oui*** pour le masquer.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a43bb7bed8932d50b94860/file-mX0UKv4LS6.png)

### Certification et réglementaire

Cette rubrique vous permet d'indiquer la certification professionnelle de votre Module et de compléter les champs des [blocs de compétences](https://doc.dendreo.com/article/207-export-edof-mon-compte-formation) ou du [Passeport de prévention](https://doc.dendreo.com/article/739-gerer-passeport-de-prevention-sur-dendreo) si votre Module est concerné.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6aa96476c24eab6c0dff0d7e/file-PnaDqbiwAi.png)

En effet, si vous sélectionnez une certification RNCP, vous retrouvez une nouvelle section ***Blocs de compétences*** contenant la liste des compétences liées à cette Formation, par défaut complétée depuis [France Compétences](https://www.francecompetences.fr/) mais que vous pouvez modifier si besoin.

Complétez également le champ ***Sur EDOF, les blocs de compétences pourront être personnalisés au niveau de chaque dossier*** : ce réglage permettra à terme de pouvoir modifier les blocs de compétences pour un dossier spécifique (par Participant). Notez cependant qu'EDOF a prévu cette option mais ne l'a pas encore implémentée. Vous pouvez tout de même la régler ici en prévision.

Si la certification ne contient aucune compétence sur [France Compétences](https://www.francecompetences.fr/), le champ est désactivé.

Renseignez ensuite si votre Module est concerné par la [déclaration au Passeport de prévention](https://doc.dendreo.com/article/739-gerer-passeport-de-prevention-sur-dendreo).

Pour plus d'informations, consultez [**Exporter son Catalogue de Formations Dendreo vers EDOF**](https://doc.dendreo.com/article/207-export-edof-mon-compte-formation).

### Prix

Cette rubrique vous permet d'indiquer à Dendreo les prix à pré-remplir lorsque vous planifierez ce Module dans une Action de Formation INTER ou INTRA, et spécifiquement pour les Entreprise de catégorie ***Adhérent***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a43c60732de83363bef22c/file-uaLF6RiEYU.png)

**À noter** : si vous souhaitez appliquer un **prix différent** à votre Module selon son **mode d’organisation** (par exemple un prix A quand il est en présentiel et un prix B quand il est en distanciel), vous devez créer pour cela **deux Modules différents**.

### Valeurs par défaut

Cette rubrique vous permet d'indiquer à Dendreo les éléments à pré-remplir lorsque vous planifierez ce Module dans une Action de Formation, comme la Salle dans laquelle se déroule généralement l'Action de Formation, le Formateur qui l'anime ou encore le nombre minimum et maximum de Participants.

L'objectif ici est de vous faire **gagner du temps**. Toutefois, dans le cas où vous indiquez une valeur par défaut sur la fiche du Module, il vous sera toujours possible de la **modifier au cas par cas dans le contexte d'une ADF**.

Vous pouvez notamment définir un ***Responsable par défaut*** au niveau de votre Module, ce qui renseignera automatiquement le responsable Dendreo indiqué précédemment lors de la planification d'une Action de Formation contenant ce Module.

Vous pouvez également définir un ***Objectif par défaut*** spécifiquement pour le Module : celui-ci écrasera alors l'objectif indiqué dans la [**configuration de vos Actions de Formation**](https://pro.dendreo.com/redirect/config/actions-de-formation) > rubrique ***Général*** > champ ***Objectif par défaut***. Si vous ne renseignez pas d'objectif par défaut au niveau du Module, c'est celui renseigné dans la configuration des Actions de Formation qui s'appliquera.

Vous retrouvez également la ***Durée de validité*** du Module dans le cadre du [**Recyclage**](https://doc.dendreo.com/article/366-les-recyclages).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68e91e76f4fb6158cfa6e1ba/file-dBKcebdSgJ.png)

### Critères Formateurs

Dans cette rubrique, renseignez les informations vous permettant de faire appel à l'Assistant de choix lorsque vous souhaiterez [staffer un ou plusieurs Formateurs](https://doc.dendreo.com/article/83-staffing-des-formateurs-intervenants-sur-mes-formations) sur une Action de Formation. Notez que cette information peut répondre au Critère n°5 de Qualiopi afin de démontrer à votre auditeur l'adéquation entre les Formations que vous proposez ainsi que les compétences de votre équipe pédagogique.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a44774bed8932d50b94895/file-SeIhheWOHJ.png)

### **Compétences Participants**

Dans cette rubrique, renseignez les éléments que le Formateur pourra évaluer pour chaque Participant de l'Action de Formation ainsi que des [compétences](https://doc.dendreo.com/article/393-introduction-a-l-evaluation-des-competences) sur lesquelles les Participants pourront s'auto-positionner avant et après la Formation. Vous pouvez ajouter des compétences à la volée ou rattacher l'une des compétences définies depuis [votre page de configuration](https://pro.dendreo.com/redirect/config/modules/competences).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a44796e0c66223cfc66c51/file-yymTbGAJ2l.png)

### CPF

Dans cette rubrique, renseignez toutes les informations ci-dessous si votre Formation est éligible au CPF et que vous souhaitez l'inclure dans l'export XML Dendreo pour synchronisation avec [EDOF](https://www.of.moncompteformation.gouv.fr/espace-public/).

Cochez ***Éligible CPF*** si votre Module est concerné, et sélectionnez les ***Modalités d'admission***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a3bcfa8e7f59a923654a384/file-HW9tae8QEr.png)

### Catalogue Public

- ***Gestion du Catalogue*** : définissez si vous souhaitez que ce Module soit **présent ou absent** de votre Catalogue. Cela vous permet notamment d'avoir des Formations privées que vous ne proposez pas par défaut au public comme une Formation sur mesure par exemple. Dans le cas où vous utilisez le [Catalogue Public](https://doc.dendreo.com/article/188-introduction-au-catalogue-public), les [Modules absents du Catalogue](https://doc.dendreo.com/article/154-hors-catalogue) n'apparaîtront pas sur ce dernier.
- [***Auto-validation des Pré-inscriptions Catalogue Public possible***](https://doc.dendreo.com/article/559-auto-validation-des-pre-inscriptions) : automatisez la validation des Pré-inscriptions provenant de votre Catalogue Public en définissant des critères et conditions spécifiques depuis la [gestion des Pré-inscriptions](https://pro.dendreo.com/redirect/config/inscriptions/gestion).
- ***Points forts*** : indiquez une phrase d'accroche courte pour promouvoir votre Formation.
- ***Slug (fin d'URL sur le Catalogue Public)*** : cette option est réglée automatiquement mais vous pouvez la customiser. Elle a pour effet de changer une partie du texte de l'URL de vos pages Formation sur le Catalogue Public.
- ***Description de la page*** : cette option vous permet de customiser la [meta description](https://www.wikiwand.com/fr/Meta_description) de chaque page de Formation. Si vous ne renseignez rien, Dendreo insère une meta description automatique par défaut.
- ***Restreindre la visibilité de ce Module sur le Catalogue Public*** : choisissez de rendre ce Module visible sur votre Catalogue Public uniquement depuis une URL spécifique. Cela vous permet par exemple de réserver la consultation de ce Module uniquement à certains de vos clients.
- ***Préfixer les prix de la mention "À partir de"*** : cette option permet d’afficher "*à partir de*" devant les tarifs INTER et INTRA sur votre Catalogue Public.
- ***Nouveauté*** : en cochant cette mention, un badge ***Nouveauté*** s’affiche à côté du nom de votre nouveau Module. Il n’y pas de limite dans le temps et nous vous invitons à **décocher cette mention** lorsque vous estimez que la Formation n'est plus une nouveauté. Vous pouvez également filtrer les éléments du Catalogue Public par nouveauté depuis la colonne de droite.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a4499ae9b72b53dab65ef4/file-fouTjvrSHl.png)

Renseignez ensuite les informations liées au [**Paiement en ligne**](https://doc.dendreo.com/article/346-presentation-generale-paiement-ligne-stripe) sur votre Module, notamment la **Stratégie de paiement Stripe** pour les Particuliers et Entreprises, avec un éventuel texte d'information.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a449e881885e4ca3207d39/file-fZkuWyvW6I.png)

### Descriptif

- ***Description / contenu*** : les différents champs relatifs à la description du Module ont toute leur importance puisque ce sont eux qui vont constituer le contenu pédagogique de votre Module. Ces informations apparaîtront dans le Programme de Formation et seront également affichées sur le [Catalogue Public](https://doc.dendreo.com/article/188-introduction-au-catalogue-public).
- ***Modalités pédagogiques*** : indiquez un descriptif des méthodes pédagogiques de la Formation.
- ***Moyens et supports pédagogiques*** : indiquez un descriptif des ressources pédagogiques mises à disposition des stagiaires.

**À noter** : les champs relatifs au contenu pédagogique du Module doivent respecter une certaine mise en forme. Il n'est notamment pas possible de mettre plusieurs niveaux de puces dans les textes formatés. Dans le cas où vous effectuez un copier/coller depuis un autre support, nous vous invitons à vérifier que la mise en forme HTML est correcte. Vous pouvez y accéder en cliquant sur le bouton ***Source*** en haut à droite du champ. D'autre part, si vous proposez des Modules de Formation éligibles au CPF et que vous souhaitez utiliser l'[**Export EDOF**](https://doc.dendreo.com/article/207-export-edof-mon-compte-formation), il convient de respecter le nombre de caractères maximal mentionné par Dendreo.

- ***Informations sur l'admission*** : précisez éventuellement le processus d’admission.
- ***Modalités d'évaluation et de suivi*** : indiquez un descriptif des procédures d'évaluation des connaissances.
- ***Informations sur l'accessibilité*** : indiquez les moyens matériels et humains mis en œuvre pour les personnes en situation de handicap, les modalités et supports de formation et d’évaluation adaptés, la sensibilisation des intervenants, etc.
- ***Public visé***, ***Prérequis***, ***Objectifs de la Formation***, et ***Profil du Formateur***.
- ***Visuel*** : glissez-déposez une image d'illustration, notamment pour le Catalogue public et pour les Extranets. Si vous n'uploadez pas d'illustration par Module, vos Formations peuvent aussi toutes hériter de l'illustration de leur [catégorie](https://doc.dendreo.com/article/140-categories-de-modules). Nous recommandons d'utiliser la résolution d'image la plus élevée possible.
- ***Document de présentation PDF*** : vous pouvez uploader un programme PDF déjà réalisé par Module ici, ou mettre en place un Modèle de document qui sera pré-rempli automatiquement à partir des informations de cette fiche, et que vous pouvez rendre disponible au téléchargement sur votre Catalogue Public.

Notre assistant IA peut renseigner automatiquement le contenu pédagogique sur la fiche de votre Module à partir d'un programme PDF. De cette façon, le processus de saisie des informations est grandement simplifié. Pour plus d'informations, consultez notre documentation [**Pré-remplir un Module à partir d’un PDF avec l'assistant IA**](https://doc.dendreo.com/article/601-utiliser-assistant-intelligence-artificielle-preremplissage-pdf).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a44a2be0c66223cfc66c62/file-ryNBWWvsFk.png)

### **Durée et planning de Formation type**

**Utiliser un planning type (mode automatique)**

Si vous réalisez d'une manière générale la Formation sur le même format (par exemple : 4 demi-journées), votre Module doit alors rester en **mode automatique**. La durée du Module sera calculée en faisant la somme des Créneaux que vous aurez ajoutés dans votre planning de Formation type.

Le planning type permet de faciliter la programmation des Actions de Formation par la suite. Définissez les Créneaux par défaut constituant le planning type de votre Formation avec un intitulé et le nombre d'heures par jour, voire les horaires exacts de la Formation, si celles-ci sont fixes. Vous pouvez également définir des intervalles de "pause" (en nombre de jours) entre les Créneaux de Formation.

**À noter** : les intervalles que vous ajoutez ne tiennent pas compte des éventuels jours de fermeture de votre Centre. Si votre Formation doit se dérouler le même jour sur deux semaines et que votre centre est fermé les samedi et dimanche, alors il vous faut renseigner 6 jours d'intervalle (et non 7).

La durée du Module viendra se calculer automatiquement en faisant la somme des Créneaux renseignés dans le planning type. Même si vous créez un planning type pour votre Module, il vous sera toujours possible de l'adapter pour chaque ADF, au cas par cas. L'idée est d'avoir un découpage des Créneaux par défaut.

**Exemple de planning** : *vous réalisez une Formation sur 2 jours de 9h à 12h30 puis de 13h30 à 17h mais il peut arriver que vous rajoutiez un Créneau de 30 minutes pour certains de vos clients*.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a44ba2e9b72b53dab65f00/file-zQdBU5l3jx.png)

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/5dd2d5cb2c7d3a7e9ae41507/file-dExQRGd2V6.png)

En **mode automatique**, la durée de la Formation correspond à **la somme des Créneaux saisis** dans le planning type et est mise à jour automatiquement si vous modifiez les Créneaux. C'est le mode historique sur Dendreo.

**Utilisation de la durée (mode progressif)**

Si vous connaissez la **durée totale** de votre Formation mais que celle-ci n'est jamais découpée de la même manière, il faut créer un [**Module à planification progressive**](https://doc.dendreo.com/article/208-modules-planification-progressive-partielle). Il convient également d'utiliser le mode progressif si votre Module contient un nombre d'heures à planifier en autonomie entre les Formateurs et les Participants.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a44b4d81885e4ca3207d43/file-K5zbMNwRoS.png)

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/5dd2d5a12c7d3a7e9ae41503/file-CYFNJLNOWI.png)

En mode **planification progressive**, la durée de la Formation correspond à celle que **vous configurez manuellement**, à moins que la somme des Créneaux qui composeront le Module ne la dépasse. Vous pouvez remplir partiellement le planning type, ou l'ignorer.

### **Réglages spécifiques**

Dans cette rubrique, retrouvez les derniers paramètres à régler pour votre Module :

- ***Rappel à afficher lors de la programmation du Module*** : une fenêtre contenant un texte rouge s'affichera lors de la programmation de ce Module dans une Action de Formation.
- ***Thème de Formation***.
- ***Commentaire par défaut sur les lignes de Devis incluant ce Module***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a44c55e9b72b53dab65f02/file-miCtEpT2Ku.png)

## Dupliquer un Module

Depuis la fiche du Module (et pas depuis l'interface de modification de cette fiche !), cliquez sur ***Dupliquer*** pour dupliquer le Module si besoin. Cela dupliquera tout le contenu du Module mais pas les liens avec les Actions de Formation existantes. Vous pouvez également choisir de dupliquer les fichiers présents dans l'Espace de stockage du Module.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a3bd5f61ff1363dd6deb64f/file-05aR8cSfi8.png)

**Attention** : votre Module sera dupliqué, mais un nouveau numéro lui sera attribué. Si vous utilisez des numéros complets personnalisés, vérifiez qu'il correspond à vos attentes.

## Désactiver un Module

Pour supprimer un Module de votre Catalogue, rendez-vous sur l'interface de modification du Module puis cliquez sur ***Autres options*** > ***Désactiver***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a3bd9d0d78991c5c1ac6123/file-QUxEm47DtU.png)

Le Module ne sera pas supprimé définitivement : vous pouvez ensuite le retrouver dans le tableau listant l'ensemble des [Modules désactivés](https://pro.dendreo.com/redirect/modules/supprimes) et ainsi le restaurer si besoin.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a3be0f62039b55877aae233/file-cqpcrm5L20.png)
