# Présentation des Webhooks

Dendreo dispose de **Webhooks** (*points d'ancrage web*) vous permettant de vous abonner à différentes actions effectuées sur votre compte et ainsi de déclencher des requêtes **HTTP POST** en **JSON** vers un service externe lorsqu'un **évènement spécifique** se produit sur Dendreo.

Un Webhook envoie donc **automatiquement** (contrairement à l'API) des données **en temps réel** depuis Dendreo vers d’autres logiciels dès qu'un événement spécifique se produit sur Dendreo.

## Définir une clé secrète

Utilisez la **clé secrète** fournie par Dendreo pour vérifier la **signature** envoyée dans le header afin de valider que l’information reçue suite à une action effectuée sur votre compte provient bien de Dendreo.

[![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6598116d5428390b5eedb9ed/file-rgkGj1q2mR.png)](https://s3.amazonaws.com/helpscout.net/docs/assets/59b2fb88042863033a1cb464/images/6598116d5428390b5eedb9ed/file-rgkGj1q2mR.png)

## Ajouter un Webhook

- Depuis la [page de configuration des Webhooks](https://pro.dendreo.com/redirect/webhooks), cliquez sur ***Ajouter un Webhook***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65f2c2f2c7af9d69c480afad/file-HD1Fi2mmAX.png)

- Commencez par éventuellement ajouter un titre à votre webhook.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a2ac77b6455b1debd1709d2/file-vK3ZxLtfYy.png)

- Indiquez ensuite l'**URL** à utiliser pour recevoir les Webhooks. Ainsi, dès que cette action sera déclenchée sur votre compte, l’URL sera appelée avec les paramètres nécessaires au traitement de votre côté.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a2ac8536455b1debd1709da/file-yJ6LqaIwJ2.png)

- Associez l'URL avec **un ou plusieurs événements spécifiques** (passés et à venir) en les sélectionnant dans la liste déroulante.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a2aca13fe2f2e4a043b594d/file-j6lwW0wVyB.gif)

Vous pouvez cocher la case **pour lier l'URL à l'ensemble des événements (existants et futurs) 🙌**

- Validez. Vous retrouvez alors tous les Webhooks ajoutés.

**À noter** : dans le cas d'un compte **multi-centres**, si un Webhook est ajouté **depuis un sous-centre**, le Webhook ne sera déclenché que pour les événements liés à ce sous-centre. Depuis un sous-centre, il n'est également pas possible de modifier ou supprimer les URL spécifiques à la vue globale.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65f2c25d27186a68700ff8f4/file-sgyykqL6oO.png)

Pictogrammes des Webhooks définis en vue globale (icône de mappemonde) et par sous-centre (icône de maison).

## Webhooks disponibles sur Dendreo

Les Webhooks disponibles pour le moment sont les suivants :

**Action commerciale**

- Une Action commerciale est créée
- Une Action commerciale est modifiée

**Action de Formation**

- Un Module est programmé dans une Action de Formation (LAM)
- Un Module est retiré d'une Action de Formation (LAM)
- L'Étape d'une Action de Formation est modifiée
- Un Créneau est créé
- Un Créneau est modifié (date, lieu, intitulé, etc.)
- Un Créneau est supprimé
- Un Participant est ajouté à une Action de Formation (LAP)
- Un Participant est supprimé d'une Action de Formation (LAP)
- Un Participant non identifié est identifié
- Un Participant est inscrit à un Module dans une Action de Formation (LMP)
- Un Participant est désinscrit d'un Module dans une Action de Formation (LMP)
- La présence d'un Participant à une Action de Formation a commencé (LAP)
- La présence d'un Participant à une Action de Formation complète est arrivée à 100% (LAP)
- La présence d'un Participant à un Module dans une Action de Formation a commencé (LMP)
- La présence d'un Participant à un Module dans une Action de Formation a été modifiée (LMP)
- La présence d'un Participant à un Module dans une Action de Formation est arrivée à 100% (LMP)
- Une évaluation pour un couple Participant/Module dans une Action de Formation est soumise (LMP)
- Le prix personnalisé d'un LMP est modifié
- Un questionnaire de Satisfaction est soumis
- Un Recueil des besoins est saisi ou mis à jour
- Un questionnaire d'Auto-positionnement pré-formation est saisi ou mis à jour
- Un questionnaire d'Auto-positionnement post-formation est saisi ou mis à jour
- Un Formateur est ajouté dans une Action de Formation (LAF)
- Un Formateur est supprimé d'une Action de Formation (LAF)
- Un Émargement est fait
- Une Action de Formation est créée
- Une Action de Formation est désactivée
- [Action personnalisée](https://doc.dendreo.com/article/630-ajouter-un-champ-personnalise) : *nom de votre action*

**Catalogue Public**

- Une Pré-inscription est réalisée depuis le Catalogue Public
- La case ***Inscription à la Newsletter*** est cochée lors d'une inscription au Catalogue Public

**Contact**

- Un Contact est créé
- Un Contact est désactivé

**Dendreo Live**

- Un utilisateur est entré dans un meeting Dendreo Live
- Un utilisateur a quitté un meeting Dendreo Live

**Devis**

- Un Devis est créé
- Le statut d'un Devis est modifié

**Document**

- Un document est signé
- Un document a été uploadé depuis l'Extranet Participant
- Un document a été uploadé depuis l'Extranet Formateur
- Un document a été uploadé depuis l'Extranet Entreprise

**Email**

- Un Email est envoyé

**Entreprise**

- Une Entreprise est créée
- Une Entreprise est désactivée

**Facture**

- Une Facture est créée

**Financement**

- Un Financement est créé

**Formateur**

- Une Facture Formateur est validée
- Un Formateur est créé
- Un Formateur est désactivé

**Module**

- Un Module est créé
- Un Module est désactivé

**Note de frais**

- Une note de frais est acceptée

**Opportunités**

- Une Opportunité est créée

**Participant**

- Un Participant est créé
- Un Participant est désactivé
- La valeur "newsletter" d'un Participant change

**Règlement**

- Un paiement Stripe a été reçu

**RSVP**

- Un RSVP est modifié pour un Participant
- Un RSVP est modifié pour un Formateur

**Salle de Formation**

- Une Salle de Formation est créée
- Une Salle de Formation est désactivée

**Suivi qualité (signalement ou suggestion)**

- Un ticket Suivi Qualité (signalement ou suggestion) est créé
- Un ticket Suivi Qualité (signalement ou suggestion) est modifié
- Un ticket Suivi Qualité (signalement ou suggestion) est désactivé

**To-do**

- Une To-do est créée
- Une To-do est modifiée
- Le statut d'une To-do est modifié

La fonctionnalité de Webhooks **s'enrichit au fur et à mesure de vos retours** ! Si vous avez besoin d'un évènement qui n'est pas encore proposé, [contactez le support](mailto:support@dendreo.com).

## Tester un Webhook

Pour vérifier le bon fonctionnement d'un Webhook et ajuster si besoin sa configuration, vous pouvez le tester/simuler en cliquant sur l'événement correspondant puis sur ***Tester ce Webhook***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65f2c50627186a68700ff8fc/file-Ksz5GPPAnX.png)

Une fenêtre s'ouvre alors, depuis laquelle vous retrouvez :

- L'URL liée au Webhook ;
- L'événement que vous êtes sur le point de tester ;
- Un exemple de l'événement que vous recevrez ;
- Le bouton ***Envoyer un Webhook test***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65f2c5f9909e484dba210353/file-lNasThs6zv.png)

**À noter** : si le serveur distant ne répond pas ou bien répond une erreur, un webhook est renvoyé 5 fois avec un délai plus long à chaque fois (~10sec puis ~1min puis ~15min puis ~2h30 puis ~24h).
