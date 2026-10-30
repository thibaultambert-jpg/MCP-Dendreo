# Programmer une Formation à planification progressive

Avec Dendreo, vous pouvez programmer des Formations à **planification progressive** : ce sont des Formations pour lesquelles **vous ne connaissez pas l'intégralité du planning au début de la session,** dont les dates de toutes les sessions ne sont pas encore déterminées. Vous pouvez connaître uniquement une **date de démarrage,** **une** **date de fin** **et un** **nombre d'heures de Formation**.

Les dates et heures des différents Créneaux seront définies au fur et à mesure, dans l'Action de Formation.

Si vous n'avez pas encore créé de Modules dans Dendreo, consultez notre [**documentation dédiée**](https://doc.dendreo.com/article/74-catalogue-modules-formation-produits-hors-formation).

## Avant-propos

- Les Modules avec une planification progressive sont compatibles avec les Modules **présentiels,** à **distance synchrone** (se comportant comme du présentiel, c'est-à-dire avec des Créneaux fixes) ou **mixtes** (mélange de présentiel et de distanciel).
- Les Modules avec une planification progressive se différencient par leur **durée.** En effet, vous renseignez **directement** **un nombre d'heures et de jours** de Formation, **sans renseigner de planning type**, contrairement aux Modules classiques pour lesquels la durée est calculée automatiquement par Dendreo à partir du nombre de Créneaux renseigné dans le planning type.
- Dans le cas d'une Action de Formation composée d'un Module avec une planification progressive, les Formateurs staffés sur ce Module peuvent (si la configuration en place le permet), en autonomie depuis leur Extranet, modifier la date, les heures et le lieu d'un Créneau déjà programmé ou passé et/ou planifier un nouveau Créneau dans le futur en renseignant la date, les heures et le lieu. Pour en savoir plus, consultez notre documentation dédiée à la [**Configuration des Extranets Formateurs**](https://doc.dendreo.com/article/249-configuration-extranet-formateur?preview=5e9584a32c7d3a7e9aeae3c2).

## Créer un Module à planification progressive

Les Modules à planification progressive sont gérés directement depuis votre [**Catalogue de Formations**](https://pro.dendreo.com/redirect/modules). Comme un Module classique, il convient de renseigner les champs des différentes sections. La particularité se gère dans les sections ***Durée*** et ***Planning type***.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a32903f1cd5d5b4146a2f1/file-IJN0llH3x4.png)

Par défaut, Dendreo configure votre Module en cours de création en mode "classique", mais vous avez ensuite le choix entre deux options :

- **Renseigner le planning type (les journées types, intervalles éventuels, et Créneaux)** : les champs de Durée (en heures, et période en jours) se mettront automatiquement à jour pour refléter le planning type de la Formation que vous configurez. C'est le fonctionnement historique de Dendreo, aussi appelé mode "classique" ou "automatique".

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/5dd2d5cb2c7d3a7e9ae41507/file-dExQRGd2V6.png)

En **mode automatique**, la durée de la Formation correspond à **la somme des Créneaux saisis** dans le planning type et est mise à jour automatiquement si vous modifiez les Créneaux. C'est le mode historique sur Dendreo.

- **Définir tout de suite la durée de la Formation en termes de nombres d'heures et période en jours** : vous pouvez vous arrêter là et ne pas définir de planning type. De fait, vous venez de créer un Module à planification progressive. Vous pouvez également faire le choix de remplir partiellement le planning type en définissant par exemple les 100 premières heures sur une Formation de 300 heures. Tant que vous ne remplissez pas l'intégralité du planning type au point de retomber sur le nombre d'heures défini préalablement, votre Module restera en mode "planification progressive". Il repassera automatiquement en mode "automatique" si votre planning type atteint ou dépasse la durée initialement renseignée.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/5dd2d5a12c7d3a7e9ae41503/file-CYFNJLNOWI.png)

En mode **planification progressive**, la durée de la Formation correspond à celle que **vous configurez manuellement**, à moins que la somme des Créneaux qui composeront le Module ne la dépasse. Vous pouvez remplir partiellement le planning type, ou l'ignorer.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/68a32972e2d35b594eaa5ae5/file-UpKfnwWiTk.png)

## Programmer un Module à planification progressive

Les Modules à planification progressive se programment comme n'importe quel Module. Cependant, les champs **Durée en heures**, **Date de début** et **Date de fin** de la Formation vous seront proposés dans la fenêtre de programmation.

Ceux-ci sont pré-remplis à partir des valeurs renseignées sur la fiche Module, mais **vous pouvez ajuster celles-ci pour chaque Action de Formation, afin de les personnaliser si vous le souhaitez**.

Si vous souhaitez programmer un Module à planification progressive dont le planning type et/ou la durée est à 0 heure, vous devez le placer dans l'Agenda sur une journée entière.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a882595b930fa0fc62d0059/file-Akg7i4w9jv.gif)

**À noter** : il est également possible de définir une planification progressive sur un Module qui ne l'est habituellement pas, directement depuis une Action de Formation. Pour plus d'informations, consultez la documentation [**Je souhaite programmer mon ADF mais n'ai pas encore les dates des Créneaux**](https://doc.dendreo.com/article/562-definir-planification-progressive-depuis-action-de-formation).

## Suivre la progression de la Formation

Au sein d'une Action de Formation, Dendreo vous affiche automatiquement des barres de progression pour l'ADF, et par Module à planification progressive, afin de vous aider à faire le suivi des heures planifiées en Créneaux et des heures prévues que vous devez encore planifier. Au fur et à mesure que vous ajoutez des Créneaux sur les Modules de votre Action de Formation, Dendreo mettra à jour les jauges de progression.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/645ca73901ee45572cca86cd/file-nKFUidEIa4.png)

## Modifier le planning des Formateurs

Si vous ajoutez un Formateur à un Module à planification progressive dans votre ADF, Dendreo comptabilise automatiquement son temps de Formation **à partir de la durée totale du Module,** et c'est cette durée qui est utilisée pour le Budget rémunération de votre Formateur. Ceci permet donc d'avoir un Budget prévisionnel complet en termes de coûts pédagogiques, même si les Créneaux de Formation n'ont pas encore été définis.

Dans le cas où vous souhaitez modifier son temps de Formation sur le Module à planification progressive, vous avez alors deux options :

1. Gérer son nombre d'heures de Formation depuis l'outil de [**staffing par Créneau**](https://doc.dendreo.com/article/83-staffing-des-formateurs-intervenants-sur-mes-formations) :

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660ec641ef6cd1080a2ea79b/file-Dw7KWsp15B.png)

2. Modifier manuellement son nombre d'heures d'intervention au niveau du [**staffing par Module**](https://doc.dendreo.com/article/83-staffing-des-formateurs-intervenants-sur-mes-formations) :

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660ec67adac5c26585fc5dc8/file-WosyjEBeWX.png)

Notez cependant quelques particularités dans le cas où vous souhaitez modifier le nombre d'heures d'intervention au niveau du Module :

- Le nombre d'heures renseigné dans ***Staffing par Module*** peut être supérieur (mais ne peut pas être inférieur) à la somme des heures déjà renseignées pour ce Formateur dans la partie ***Staffing par Créneau & Invitation***. Par conséquent, même si vous n'avez pas encore saisi l'intégralité des Créneaux, mais que vous connaissez les Formateurs qui seront concernés par ces Créneaux, vous pouvez alors saisir le nombre d'heures d'intervention attendu pour ces Formateurs sur ce Module.
- Le nombre d'heures ne peut pas dépasser la durée du Module à planification progressive.

**À noter** : si toutes les heures d'intervention d'un Formateur prévues sur un Module ne sont pas encore affectées à des Créneaux, et que vous ajoutez des nouveaux Créneaux, alors les heures à affecter du Formateur seront utilisées pour remplir les heures d'intervention de ces Créneaux. Cette logique est de mise dans la limite des heures initialement affectées à ce Formateur pour ce Module.

**Par exemple** : *votre Module dure 20h, avec pour l'instant 7h planifiées pour le Formateur Pierre. Vous savez que sur ce Module, le Formateur Pierre a besoin de 10h : vous indiquez donc 10h sur le total du staffing de Pierre sur ce Module. Si vous planifiez un nouveau Créneau de 2h sur ce Module, Dendreo "utilisera" 2 des 3h non encore affectées du Formateur Pierre. Si vous planifiez à nouveau un Créneau de 2h, l'heure restante disponible du Formateur Pierre sera utilisée (staffing partiel), puis toute autre planification de Créneau n'affectera plus le staffing de Pierre.*

## Définir le Budget des INTRA en prix par jour

Dans le cas des Actions de Formation INTRA avec un mode de pricing par jour, le montant des recettes liées à un Module à planification progressive sera basé sur la durée totale du Module (en heures) **divisée par le nombre d'heures que dure votre journée type** (réglable en configuration générale), ce qui permettra de calculer un "équivalent durée jours" à partir de la durée en heures.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6228fe0dc1e53608cf9e691d/file-M8LCHMMibM.png)

Ce même mode de calcul est également utilisé pour les Devis INTRA en pricing par jour dans lesquels vous incluez des Modules à planification progressive.

## Remplir le Questionnaire de Satisfaction

Les Participants et Formateurs peuvent répondre à leur [**Questionnaire de Satisfaction**](https://doc.dendreo.com/article/242-recueil-des-avis) en se connectant à leur Extranet ou en cliquant sur le lien dans un Email que vous leur avez envoyé.

**À noter** : les Questionnaires de Satisfaction à chaud peuvent être disponibles **avant la fin du dernier Créneau**, mais seulement le **jour-même** de ce dernier Créneau, et si **au moins les 90%** de la durée de la Formation ont déjà été effectués.
