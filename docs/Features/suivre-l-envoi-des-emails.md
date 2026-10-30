# Suivre l'envoi des Emails

Une fois un Email envoyé depuis votre compte Dendreo, vous pouvez facilement vous assurer de la **bonne réception par le destinataire**. Cette page vous explique comment suivre et contrôler **les statuts d'envoi de vos Emails** et comment interpréter les icônes liées à ces statuts.

Il est possible de suivre les différents statuts d'envoi de vos Emails afin de détecter les erreurs éventuelles grâce à un système d'icônes. Chaque icône correspond à un statut spécifique :

| ![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660c00478f8fca7f5efd38e5/file-sMz9AAwNxS.png) | Email non envoyé, aucune action effectuée | ![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660c012e7c483540738bc2c1/file-h88VT6fZdR.png) | Email envoyé et a priori bien reçu par le destinataire |
| --- | --- | --- | --- |
| ![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660c001933a24a257be3c715/file-XALTrsAWRa.png) | Email envoyé et actuellement en transit, statut non connu | ![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660c00ed50568305fcb28cee/file-QGI5gBLshs.png) | Email envoyé et ouvert par **au moins un** des destinataires |
| ![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660bffedf8a6115b43e5a9f2/file-gClPorLEci.png) | Email envoyé mais sans envoi effectif (envoi hors Dendreo par exemple) | ![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660c051ff8a6115b43e5a9fb/file-qdRB9Edv4K.png) | Email en erreur (nécessite d'être renvoyé) |

**À noter** : si l'envoi d'un Email ne fonctionne pas, un Email d'erreur est envoyé à l'expéditeur de l'Email, soit à l'adresse personnelle de l'expéditeur si l'Email a été envoyé avec l'adresse de l'utilisateur, soit à l'adresse d'expédition par défaut du compte Dendreo.

## Depuis la fiche d'une Action de Formation

Depuis l'onglet ***Emails*** de votre Action de Formation, vous pouvez retrouver :

- Le **nombre total d'Emails envoyés** par Participant parmi l'ensemble des Modèles d'Email ;
- Le **nombre total d'Emails ouverts** par Participant parmi l'ensemble des Modèles d'Email ;
- Le **statut d'envoi** de chaque Modèle d'Email envoyé par destinataire.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660c1ab950568305fcb28d0d/file-zef6IYZste.png)

## Depuis les logs d'Emails

Depuis la [page des logs d'Emails](https://pro.dendreo.com/redirect/config/emails/logs) de votre compte Dendreo, vous retrouvez l'historique et le statut d'envoi des 500 derniers Emails envoyés. Sur cette page, vous pouvez :

- Consulter le contenu des Emails ainsi que les pièces jointes qu'ils contiennent ;
- Cliquer sur l'objet d'un Email pour voir un aperçu de l'Email ;
- Renvoyer un Email, qu'il ait bien été envoyé initialement ou pas.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a5500efccc4eabb36cbbc50/file-lf7pkzT36O.png)

**À noter** : si vous renvoyez un Email, il contiendra exactement le même contenu et les mêmes pièces jointes qui avaient été générées lors du premier envoi. Les mêmes adresses email seront utilisées.

Depuis cette page, utilisez les différents filtres de recherche mis à votre disposition pour consulter plus efficacement les Emails envoyés, en filtrant notamment sur la période, ou en affichant uniquement les erreurs.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660c2262f8a6115b43e5aa1b/file-8vxzv43HaI.png)

## Points d'attention

- Il n'est pas possible de savoir précisément quel destinataire a ouvert l'Email.
- Ne vous fiez pas entièrement à l'icône d'enveloppe ouverte : en effet, il faut que le destinataire ait accepté l’affichage des images de l’expéditeur sur sa boite mail pour que l'Email soit considéré comme ouvert.
- Les pièces jointes envoyées dans vos Emails peuvent ne pas être récupérées à l'identique si vos Modèles de documents ont été modifiés entre-temps. Nous vous recommandons de [configurer l'**Email de monitoring**](https://doc.dendreo.com/article/77-configuration-emails) pour conserver une copie conforme de tous vos Emails, tels que vos Participants les reçoivent.
- L’envoi d’un Email peut ne pas être **immédiat** et nécessiter **un certain délai**, que l’envoi soit programmé ou manuel. Par exemple, si vous souhaitez envoyer un Email à 8h55 pour une Formation commençant à 9h, il se peut que l’Email n'arrive pas à destination avant le début de la Formation. Il est donc essentiel de prendre ce critère en compte lors de l’envoi de vos Emails.
