# Créer et personnaliser les Modèles d'Emails

Un **Modèle d'Email** est un Email type **configuré au préalable**, avec des contenus et pièces jointes dynamiques, que Dendreo pré-remplit automatiquement en fonction du contexte lorsque vous l'envoyez à vos interlocuteurs (Formateurs, Contacts, Participants, Entreprises, Sous-traitants, etc.).

Configurer votre bibliothèque de Modèles d'Emails vous permet de **gagner du temps** dans la gestion des informations et des documents que vous transmettez à l'ensemble de vos interlocuteurs.

Dans cet article, nous vous expliquons comment gérer votre **bibliothèque de Modèles d'Emails** ainsi que les étapes à suivre pour créer et modifier un Modèle d'Email depuis le menu ***Configuration*** > [***Modèles d'Emails***](https://pro.dendreo.com/redirect/config_modeles_mails_types.php).

À l'ouverture de votre compte Dendreo, vous disposez d'ores et déjà d'une **bibliothèque de Modèles d'Emails configurés par nos soins**. Vous pouvez directement les utiliser ou simplement vous en inspirer pour la création de vos propres Modèles !

## Créer un Modèle

### **Étape #1 - Ajouter un nouveau Modèle d'Email**

Depuis la [configuration des Emails](https://pro.dendreo.com/redirect/config_modeles_mails_types.php), cliquez sur le bouton ***Ajouter un Modèle d'Email*** situé en bas de chaque section afin d'initier la création d'un nouveau Modèle d'Email.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/67769ee67aa7755adceaea37/file-DlVImWzQ7R.png)

Vous pouvez **dupliquer un Modèle d'Email** en cliquant sur l'icône grise, à gauche de l'icône de crayon.

### **Étape #2 - Sélectionner la cible**

Cette étape consiste à sélectionner le **type de destinataire de l'Email** (Formateurs, Contacts, Participants, etc.) et le **contexte dans lequel vous souhaitez que soit envoyé l'Email** (au global de l'ADF, par Module ou Créneau d'une ADF, lors de la génération d'un Devis, à l'étape de la Facturation d'une ADF, etc.).

Choisir la bonne cible est **indispensable** pour que Dendreo pré-remplisse automatiquement la bonne adresse de destination lors de l'envoi de l'Email.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb28d91515e26e4a2f4bc1/file-Mg5Gottk7p.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65cb28d91515e26e4a2f4bc1/file-Mg5Gottk7p.png)

### **Étape #3 - Donner un nom au Modèle d'Email**

Dans le champ ***Intitulé***, renseignez le nom que vous souhaitez donner à votre Modèle. Cet intitulé n'est visible que par les utilisateurs de votre compte Dendreo et permet de retrouver facilement votre Modèle d'Email dans l'interface d'envoi des Emails.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65ca49481409b478491f5cb1/file-9LWWU8GWi0.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65ca49481409b478491f5cb1/file-9LWWU8GWi0.png)

### **Étape #4 - Choisir l'éventuelle Action système**

Associez une Action système à un Modèle d'Email, par exemple pour déclencher l'envoi d'un Email d'accusé de réception envoyé à un visiteur s'étant pré-inscrit à une Formation sur votre Catalogue Public, ou encore l'Envoi d'un Questionnaire de Satisfaction à la fin d'une Formation.

Chaque cible (définie précédemment) propose des Actions systèmes différentes.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb291f2cb21c6ca90d9624/file-gfRguOpkSk.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65cb291f2cb21c6ca90d9624/file-gfRguOpkSk.png)

**Attention** : si vous sélectionnez une Action système déjà utilisée dans un autre Modèle d'Email, une alerte s'affiche vous prévenant que si vous sauvegardez, l'Action système sera alors **réattribuée au nouveau Modèle**.

Pour plus d'informations, consultez la documentation [**Déclencher un Email par une Action système**](https://doc.dendreo.com/article/325-email-declenche-par-une-action-systeme).

### **Étape #5 - Définir les filtres de présences**

Dans le cas d'un **Modèle d'Email destiné aux Participants d'une Action de Formation**, vous pouvez restreindre son envoi en fonction du relevé de présence des Participants.

Par exemple, pour votre Modèle d'Email de fin de Formation dans lequel vous prévoyez l'envoi de l'attestation de Formation, vous pouvez définir un **filtre** pour que cet Email soit envoyé uniquement aux Participants ayant une **présence totale**, c'est-à-dire les Participants ayant été marqués présents à 100% de la Formation.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb2bf42cb21c6ca90d9627/file-t3PlckYNj6.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65cb2bf42cb21c6ca90d9627/file-t3PlckYNj6.png)

### **Étape #6 - Définir les éventuels destinataires dynamiques**

Dans le cas d'un Modèle d'Email de type **Entreprises ou Particuliers dans le contexte d'une Action de Formation**, vous avez la possibilité de définir un type de contact à qui adresser par défaut l'Email :

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6638e1a85027f87fcc6be36b/file-Mx5zgRZ8u6.png)

Vous retrouvez également les destinataires dynamiques dans la [configuration des Automatismes](https://pro.dendreo.com/redirect/config_modeles_mails_types.php) ainsi que dans l'onglet ***Emails*** de l'Action de Formation depuis lequel vous pouvez définir un type de destinataire différent de celui sélectionné en configuration du Modèle, pour une Action de Formation spécifique.

**À noter** : si vous ne définissez pas de destinataire dynamique, le Contact au moment de l'envoi de l'Email sera celui défini dans l'Action de Formation (***Emails*** > ***Entreprise***) pour chaque Entreprise. Par défaut, il s'agit du Contact de l'ADF, ou à défaut, du Contact Principal, ou encore de l'Email d'Entreprise si aucun Contact n'est défini pour une Entreprise.

### **Étape #7 - Choisir les éventuelles CC/CCI par défaut et CC dynamiques**

Il vous est possible de choisir une ou plusieurs adresses mail à ajouter en **CC ou CCI par défaut**. Ainsi, l'adresse ajoutée sera en copie carbone (CC), ou copie carbone invisible (CCI) de tous les Emails envoyés par Dendreo et utilisant le Modèle d'Email en question.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb2c2d2cb21c6ca90d9628/file-GDluLv2kSk.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65cb2c2d2cb21c6ca90d9628/file-GDluLv2kSk.png)

Pour ajouter plusieurs adresses Emails, il est nécessaire de les **séparer par des virgules**.

**Attention** : les adresses ajoutées en **CC/CCI par défaut** dans ces Modèles d'Emails ne peuvent **pas être retirées** lors de l'envoi de cet Email.

Vous pouvez également ajouter des **CC dynamiques**. Ce filtre déterminera la liste des CC des destinataires concernés, qui sera donc dynamique et dépendra de la condition sélectionnée au moment de l'envoi.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb2cd51409b478491f5d70/file-lbArVfebpg.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65cb2cd51409b478491f5d70/file-lbArVfebpg.png)

Vous retrouvez ces filtres pré-selectionnés lors de l'envoi d'un Email.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb2e4e135998324525395c/file-2l434KxvdM.png)

### **Étape #8 - Renseigner l'objet de l'Email**

Dans le champ ***Titre du mail***, renseignez l'objet de l'Email tel que vous souhaitez qu'il soit vu par les destinataires de l'Email.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb2da82cb21c6ca90d9629/file-CEgV2IXp9V.png)

**À noter** : l'objet d'un Modèle d'Email peut être variabilisé avec [l'utilisation des tags](https://doc.dendreo.com/article/107-tagging-modeles-de-document-type-fichier).

### **Étape #9 - Saisir le contenu du corps de l'Email**

Cette étape consiste à saisir le contenu que vous souhaitez pouvoir être lu par les destinataires de l'Email. Plusieurs formats de contenus sont possibles :

- Les **contenus de type texte "dur"** qui seront systématiquement repris par Dendreo lors de la génération de l'Email quel que soit le contexte ;
- Les **contenus de type texte dynamiques** variabilisés automatiquement par Dendreo grâce aux tags ;
- Les **contenus de type image**.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb30061515e26e4a2f4bc5/file-GuLdHNJweU.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65cb30061515e26e4a2f4bc5/file-GuLdHNJweU.png)

Afin de variabiliser certains contenus dans le Modèle d'Email, les tags disponibles pour les Modèles d'Emails sont les mêmes que pour les Modèles de documents.

Pour plus d'informations sur les tags, consultez notre documentation [**Taguer un Modèle de document**](https://doc.dendreo.com/article/107-tagging-modeles-de-document-type-fichier).

Pour intégrer des images dans vos Modèles d'Emails, il convient de saisir le lien d'hébergement de celle-ci en utilisant la fonction ***Insérer/éditer une image*** des options de mise en forme.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65cb306b2cb21c6ca90d962d/file-1MzDRJ7pPW.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/65cb306b2cb21c6ca90d962d/file-1MzDRJ7pPW.png)

Pour plus d'informations, consultez notre documentation [**Insérer une image dans un Modèle d'Email**](https://doc.dendreo.com/article/126-inserer-une-image-dans-un-modele-email-signature).

**Attention** : il est indispensable que l'image soit **hébergée sur un espace de stockage public** afin que les destinataires de votre Email puissent les voir.

### **Étape #10 - Ajouter des pièces jointes au Modèle d'Email**

Vos Modèles d'Emails peuvent contenir des **pièces jointes** sélectionnées parmi vos [Modèles de documents](https://pro.dendreo.com/redirect/documents-types) que Dendreo génère "à la volée" et intègre automatiquement en pièce jointe de l'Email lors de l'envoi. Par exemple, vous pouvez créer un Modèle d'Email à destination de vos Participants et le configurer pour que Dendreo intègre automatiquement en pièce jointe votre Modèle d'attestation au format PDF.

Pour tous les Modèles de documents que vous ajoutez en pièce jointe de votre Modèle d'Email, vous pouvez activer par défaut la demande de signature électronique.

Pour plus d'informations, consultez notre documentation [**Signature électronique de document**](https://doc.dendreo.com/article/274-faire-une-demande-de-signature-electronique).

Vous pouvez sélectionner l'option ***Envoyer le Duplicata de Facture au lieu de la Facture initiale*** pour choisir le Document à utiliser en pièce-jointe.

Vous pouvez également paramétrer le partage automatique par défaut des documents en pièces jointes.

Pour plus d'informations, consultez [**Partager les pièces jointes d'un Email sur les Espaces de stockage**](https://doc.dendreo.com/article/500-partager-un-document-dans-l-espace-de-stockage-depuis-l-envoi-d-un-email).

**À noter** : dans le contexte d'une Action de Formation, si votre document type en pièce jointe fait plus de 10 documents (par exemple des Attestations, Certificats, Participants), ils seront regroupés **dans une seule pièce jointe au format zip**.

**Attention** : les pièces jointes disponibles pour chaque type de Modèle d'Email dépendent de la cible destinataire de l'Email sélectionnée à l'étape #1.

### **Étape #11 - Gérer les relances**

Pour gérer les relances, cochez ***Autoriser le renvoi de ce Modèle d’Email aux destinataires l’ayant déjà reçu*** depuis le Modèle d’Email.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/662b9b41e7511e33f36ea75e/file-uzkV57B4Hy.png)

Par défaut et si vous ne cochez pas cette case, les destinataires ayant déjà reçu cet Email sont **retirés automatiquement de la liste des destinataires** : **dans le cas d'un** [**Automatisme**](https://doc.dendreo.com/article/554-parametrer-l-envoi-automatique-des-emails) ou d'un [Email programmé](https://doc.dendreo.com/article/438-emails-programmes) avec filtre de destinataire dans le même contexte (même ADF, Module ou même Créneau par exemple), **les destinataires seront ignorés**.

Pour plus d'informations, consultez notre documentation [**Déclencher l’envoi automatique d’un Email**](https://doc.dendreo.com/article/554-parametrer-l-envoi-automatique-des-emails).

## Gérer ses Modèles

### **Définir l'ordre des Modèles d'Email**

Modifiez l'ordre des Modèles d'Email pour les trier selon ce qui correspond le mieux à votre fonctionnement (ordre alphabétique, importance, etc.) en cliquant sur la flèche de gauche pour déplacer chaque Modèle.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/685aabc2ab9c4f115fa90b16/file-oXCXDUDwPS.gif)

Cela impactera ensuite l'affichage de l'ordre des Modèles dans les listes déroulantes, par exemple depuis une fiche CRM ou encore dans l'onglet ***Emails*** d'une Action de Formation si vous envoyez un Email à un Participant, un Formateur ou un Contact dans le cadre d'une Action de Formation.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/685aae03511c194f2366a2d9/file-lb8GA7MlMS.png)

Affichage des Modèles dans l'onglet Emails d'une ADF

Pour plus d'informations, consultez notre documentation [**Envoyer un Email depuis une ADF**](https://doc.dendreo.com/article/142-envoi-demails-dendreo).

### **Gérer les Modèles d'Email par centre**

Si vous utilisez la fonctionnalité multi-centres, vous pouvez activer/désactiver des Modèles d'Emails pour seulement certains de vos Centres de Formation en cliquant sur l'icône de maison.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/611e5781b55c2b04bf6dfeea/file-HgwBZGXed4.gif)

### Désactiver un Modèle

Vous avez la possibilité de masquer un Modèle d'Email spécifique en décochant l'option ci-dessous.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/695f7d2fc4a2551329186ff7/file-mHbo6m34Wt.png)

Le Modèle ne sera plus visible depuis l'interface d'envoi d'un Email mais pourra être réactivé à tout moment.

**À noter** : vous ne pouvez pas désactiver un Modèle d'Email [déjà programmé](https://doc.dendreo.com/article/438-emails-programmes), lié à une [Action système](https://doc.dendreo.com/article/325-email-declenche-par-une-action-systeme) ou bien à un [Automatisme](https://doc.dendreo.com/article/554-parametrer-l-envoi-automatique-des-emails).

Pour plus de visibilité dans vos Modèles d'Email, vous pouvez également masquer les Modèles désactivés.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/695f7e62591e880f73750b81/file-NZtZmqh0J0.png)

Ce paramètre est sauvegardé, vous n'avez pas besoin besoin de le cocher à chaque passage sur cette page. Vous pouvez tout de même le décocher à tout moment.

### Supprimer un Modèle

Pour supprimer **définitivement** un Modèle, entrez en modification de celui-ci puis cliquez sur ***Supprimer***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/695f7db9813e0c002a12d460/file-EOwcroTa8m.png)
