# Configurer l'envoi des Emails

Cette page vous explique comment paramétrer correctement les différentes options liées à l'envoi d'Emails depuis la [configuration des Emails](https://pro.dendreo.com/redirect/config_mails_types.php). Vous y découvrirez notamment les options disponibles pour envoyer des Emails depuis Dendreo, pour permettre à vos utilisateurs d'envoyer des Emails en leur nom ainsi que pour configurer une signature personnalisée.

**À noter** : seuls les utilisateurs ayant des droits d'accès ***administrateur*** sur Dendreo peuvent accéder à la configuration de l'envoi des Emails.

## Paramétrage général

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/682af3ae0ccaef064d52656a/file-ImkkZmW4gb.png)

- ***Préfixe des sujets d'emails*** : cette option permet d'ajouter un préfixe à tous les objets de vos Emails. Par exemple, si vous utilisez le préfixe ***[ OF ]***, vos Emails s'intituleront ***[OF] Votre attestation de formation***.
- ***Email de monitoring*** : cette option permet d'ajouter une adresse mail en copie cachée (CCI) de tous les Emails envoyés depuis Dendreo. Cela vous permet de conserver une copie de tous les Emails que vous envoyez depuis notre plateforme.

**Attention** : nous vous recommandons de modifier l'**Email de monitoring** configuré par défaut dès votre prise en main de Dendreo.

- ***Domaine d'envoi*** : cette option vous permet de modifier le domaine d'envoi afin d'autoriser Dendreo à envoyer des Emails avec votre propre nom de domaine.

**Attention** : nous vous recommandons de modifier vos paramètres de **domaine d'envoi** pour diminuer vos risques de retrouver vos Emails en spam chez vos destinataires. Pour plus d'informations, consultez la documentation [**Envoyer ses Emails depuis Dendreo avec un domaine d'envoi personnalisé**](https://doc.dendreo.com/article/114-envoyer-vos-emails-via-dendreo-avec-domaine-denvoi-personnalise).

## Paramètres d'expédition

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/682af3cfab31c91b0d66e78a/file-KmyxBj3fyC.png)

- ***Autoriser les utilisateurs de votre équipe à utiliser leurs noms et adresses emails*** : si vous autorisez cette option, les utilisateurs de votre équipe peuvent choisir d'envoyer des Emails en utilisant leur nom et adresse email propres (voir ci-dessous la section ***Configuration personnelle par utilisateur de votre équipe***). Si vous bloquez cette option ou que l'utilisateur choisit d'utiliser le paramétrage par défaut, le nom et l'adresse par défaut ci-dessous seront utilisés.
- ***Utiliser les adresses personnelles des utilisateurs de votre équipe par défaut*** : si vous forcez cette option à ***Oui*** pour tous les utilisateurs de votre équipe ou que l'un d'entre eux choisit d’utiliser ce paramétrage par défaut dans les options de son profil, son nom et adresse email seront utilisés par défaut. Dans le cas contraire, les paramètres ci-dessous seront utilisés.
- ***Expéditeur par défaut*** : nom et adresse email utilisés par défaut lorsqu’un utilisateur de votre équipe envoie un email depuis Dendreo et que vous ne lui avez pas activé l'option lui permettant d'utiliser son nom et son adresse email propres. Ce champ ***Expéditeur par défaut*** ne peut pas être vide, car Dendreo en a besoin pour envoyer des emails.

**À noter** : si votre destinataire décide de répondre à votre email, c'est cette adresse de retour qui sera utilisée, sauf si vous autorisez les utilisateurs de votre équipe à utiliser leur propre adresse email ci-dessus. Dans ce cas, ce sera l'adresse email de l'utilisateur qui sera utilisée en cas de réponse du destinataire. Notez que l'expéditeur par défaut ne peut pas être vide car Dendreo en a besoin pour envoyer des emails.

- ***Autoriser les utilisateurs de votre équipe à utiliser leur propre signature*** : si vous activez cette option, les utilisateurs de votre équipe peuvent choisir d'utiliser leur propre signature. Si l'utilisateur choisit de ne pas utiliser de signature personnelle, ou si vous bloquez cette option, la signature par défaut sera utilisée.
- ***Signature par défaut des emails*** : dans le cas où certains utilisateurs de votre équipe n'utilisent pas leur propre signature email, vous pouvez renseigner une **signature par défaut** que Dendreo appliquera automatiquement lorsqu'ils déclencheront l'envoi d'un Modèle d'Email.

**Attention** : l’envoi d’un Email peut ne pas être **immédiat** et nécessiter **un certain délai**, que l’envoi soit programmé ou manuel. Par exemple, si vous souhaitez envoyer un Email à 8h55 pour une Formation commençant à 9h, il se peut que l’Email n'arrive pas à destination avant le début de la Formation. Il est donc essentiel de prendre ce critère en compte lors de l’envoi de vos Emails.

## Configuration personnelle par utilisateur de votre équipe

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/682af520dfeec356fb331521/file-GFGWHpXNJZ.png)

Si le paramètre a été configuré (voir plus haut), depuis leur [Profil utilisateur](https://pro.dendreo.com/redirect/administrateurs/2/edit), chaque utilisateur de votre compte Dendreo peut paramétrer certaines options liées à la gestion d'emails via Dendreo :

- ***Utiliser mes informations personnelles (prénom, nom et adresse email) comme expéditeur par défaut lors de l'envoi d'emails via Dendreo*** : si l'utilisateur choisit ***Non***, le nom et l'adresse mail paramétrés par défaut en configuration seront utilisés. Si l'utilisateur choisit ***Oui***, c'est son nom et son mail qui seront utilisés pour les emails qu'il enverra et recevra les réponses potentielles directement sur sa messagerie.
- ***Utiliser une signature personnelle sur vos emails envoyés via Dendreo*** : si l'utilisateur choisit ***Non***, alors la signature email paramétrée par défaut en configuration générale sera utilisée. Si l'utilisateur choisit ***Oui***, alors l'éditeur de signature apparaît et il peut paramétrer sa signature personnelle.

## Paramètres d’expédition optionnels pour les Factures

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/682af40116179919edbffbdf/file-3YanDRm7Kl.png)

**À noter** : ce paramétrage n’est nécessaire que si vous utilisez Dendreo pour envoyer vos Factures. Si vous préférez garder les paramètres généraux par défaut pour l’envoi des Factures, vous avez la possibilité de laisser les cases vides.

- ***Expéditeur par défaut pour les emails concernant les Factures*** : si vous souhaitez utiliser un utilisateur ou un nom spécifique par défaut à chaque envoi de facture, vous pouvez renseigner le nom de l’expéditeur et son adresse mail qui apparaitra chez le destinataire (exemple : Service Comptabilité).

L’adresse mail doit déjà exister chez un des [comptes utilisateurs de votre équipe](https://pro.dendreo.com/redirect/administrateurs).

- ***Signature par défaut des emails contenant les Factures***
- ***Destinataire ajouté automatiquement en copie (CC) de tous les emails concernant les Factures*** : il est possible d’ajouter par défaut des destinataires qui seront en copie de l’ensemble des emails envoyés liés aux Factures en Copie.
- ***Destinataire ajouté automatiquement en copie cachée (BCC) de tous les emails concernant les Factures*** : il est possible d’ajouter par défaut des destinataires qui seront en copie de l’ensemble des emails envoyés liés aux Factures en Copie Cachée.

**À noter** : si vous souhaitez ajouter plusieurs destinataires **en copie**, il est nécessaire d’ajouter une virgule entre chaque adresse mail.

## Paramètres d'expédition optionnels pour la signature électronique

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/682af41b0aa5c64a0a08eda5/file-1SyP0q3To2.png)

- ***Envoyer également les pièces jointes dans l'email initial*** : si cette option est réglée sur ***Oui***, une copie PDF du document à signer est ajoutée en pièce jointe de l'Email lors de l'envoi d'un Email avec demande de [signature électronique](https://doc.dendreo.com/category/258-signature-electronique) activée. La signature électronique doit toujours se faire via le lien sécurisé.
