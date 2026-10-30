# Personnaliser l'habillage des Emails

Par défaut, Dendreo met à votre disposition un template pour l'habillage de vos Emails. Ce template reprend la **couleur dominante** et le **logo** paramétrés dans la [configuration générale](https://pro.dendreo.com/redirect/configuration.php) de votre compte.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660d18d8f8a6115b43e5aad0/file-RTDd1N2yhg.png)

Options relatives au logo et à la couleur dominante

**À noter** : il n'y a pas de dimension minimum ou maximum requise pour le logo.

## Modifier le template

Vous pouvez cependant modifier ce template selon votre besoin, depuis la [configuration des Emails](https://pro.dendreo.com/redirect/config_mails_types.php).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660d247450568305fcb28dd1/file-G1fugqELS9.png)

**Attention** : la configuration/modification du template devant être réalisée depuis l'éditeur HTML, des **connaissances en HTML** sont donc recommandées !

Cliquez sur l'icône ci-dessous pour accéder à l'éditeur HTML.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660d257450568305fcb28dd3/file-vhtnwggBz7.png)

Éditez le code HTML et n'oubliez pas d'**enregistrer vos modifications**.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660d289850568305fcb28dd7/file-VJgd0F4tTc.png)

**Attention** : il est **impératif** d'inclure le tag ***{email}*** à l'emplacement du contenu de l'Email, sinon vos Emails seront vides ! Notez également que toute signature éventuelle sera automatiquement rajoutée au contenu de ***{email}***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660d294733a24a257be3c805/file-a3dZZuPNQ4.png)

### Template utilisé par défaut par Dendreo

```html
<table class="body dendreo-content" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f7fafc;" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; margin: 0 auto; max-width: 600px; padding: 0 !important;"> <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 600px; padding: 10px;"><!-- START CENTERED WHITE CONTAINER --> <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 8px; border-top: 4px solid {centre_of_couleur_dominante};"> <!-- START MAIN CONTENT AREA --> <tbody> <tr> <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 32px;"> <table style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td style="color: #1a202c; font-weight: bold; font-family: sans-serif; font-size: 20px; vertical-align: top;">{?centre_logo}{centre_logo_150}{/centre_logo}{?centre_logo=}{centre_raison_sociale}{/centre_logo}</td> </tr> <tr> <td align="center" height="20">&nbsp;</td> </tr> <tr> <td height="1"> <table style="width: 20% !important;" width="20%" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td style="background-color: #e2e8f0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule: exactly; line-height: 1px;" align="left" valign="top" width="100%" height="1"><!--[if gte mso 15]>&nbsp;<![endif]--></td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" height="8">&nbsp;</td> </tr> <tr> <td style="font-family: sans-serif; color: #2d3748; font-size: 15px; line-height: 1.5; vertical-align: top;">{email}</td> </tr> </tbody> </table> </td> </tr> <!-- END MAIN CONTENT AREA --></tbody> </table> <!-- END CENTERED WHITE CONTAINER --></div> </td> </tr> </tbody> </table>
```
