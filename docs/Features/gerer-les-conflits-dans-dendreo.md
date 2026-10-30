# Gérer les conflits dans Dendreo

Sur votre compte Dendreo, vous disposez d'une fonctionnalité de gestion des conflits qui vérifie la disponibilité de toutes les ressources impliquées dans les Formations mises en place par votre Organisme de Formation.

Des alertes visuelles sont placées sur les pages concernées pour vous permettre d'identifier et de résoudre rapidement les problèmes liés aux dates, Salles, Participants, Formateurs, Entreprises et Administrateurs.

Cette automatisation permet un **gain de temps considérable** sur la vérification des plannings et réduit le stress et les erreurs de programmation.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/69dfa6bc7e124f31cd77d6b3/file-TF50IPX4su.png)

## Fonctionnement général

Lorsque vous programmez une Action de Formation, différents types de conflit peuvent se créer :

- [**Des conflits de dates**](https://pro.dendreo.com/redirect/conflits/dates) : si l'Action de Formation se trouve sur un jour de fermeture de votre Organisme de Formation ou si un [événement libre](https://doc.dendreo.com/article/510-creer-et-configurer-un-type-d-evenement-libre) n'a aucune personne assignée ;
- [**Des conflits de Salles**](https://pro.dendreo.com/redirect/conflits/salles) : si une Salle est utilisée pour plusieurs Créneaux de Formation en même temps ;
- [**Des conflits de Participants**](https://pro.dendreo.com/redirect/conflits/inscriptions) : si un Participant est inscrit à plusieurs Créneaux de Formation ou événements libres en même temps ;
- [**Des conflits de Formateurs**](https://pro.dendreo.com/redirect/conflits/staffing) : si un Formateur est staffé sur plusieurs Créneaux de Formation ou événements libres en même temps, ou s'il est staffé sur un Créneau où il est indisponible ;
- [**Des conflits d'Entreprises**](https://pro.dendreo.com/redirect/conflits/evenements/entreprises) : si une Entreprise est ajoutée à plusieurs événements libres en même temps ;
- [**Des conflits d'Administrateurs**](https://pro.dendreo.com/redirect/conflits/evenements/administrateurs) : si un Administrateur est associé à plusieurs événements en même temps.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/69dfa8e13877d055c496e92e/file-2tqTKj0vYj.png)

Vous pouvez accéder à chacun de ces types de conflits en dehors du contexte d'une ADF spécifique depuis leur interface dédiée dans le menu ***Agenda*** > [***Conflits***](https://pro.dendreo.com/redirect/conflits/dates).

## Consulter les conflits

Vous pouvez retrouver vos conflits à différents endroits de votre compte Dendreo :

- **Depuis l'interface des conflits** : sur la page de chaque type de conflit, vous pouvez consulter le récapitulatif de l'ensemble des conflits **futurs** de ce type (Date, Salle, Administrateurs, etc.) ;
- **Dans une fiche CRM** : dans l'onglet ***Conflits*** de chaque fiche CRM, vous retrouvez l'ensemble des conflits spécifiquement pour ce Formateur, ce Participant, cette Entreprise ou cette Salle spécifique.
- **Dans l'Agenda** : lorsque deux Actions de Formation ou événements libres sont en conflit, ils apparaissent en rouge dans votre Agenda calendrier. En les survolant, vous retrouvez le type de conflit rencontré.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/67dc2feffb9a227465c05289/file-OFJFY33jx0.png)

Vue de plusieurs conflits depuis l'Agenda calendrier

- **Dans une Action de Formation** : depuis l'onglet ***Résumé*** d'une Action de Formation, des encadrés rouges vous alertent sur les conflits futurs pour cette Action de Formation, et vous invitent à les régler si besoin. En cas de conflit, les intitulés des Salles, Participants et/ou Formateurs apparaissent en rouge dans leurs onglets dédiés (si aucun conflit, les intitulés sont bleus). Vous retrouvez le détail de ces conflits dans l'onglet ***Conflits*** de l'Action de Formation.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/67dc3015d07900089b5b1f2f/file-Xt8FeHCjUf.png)

**À noter** : sur le tableau listant toutes vos Actions de Formation, si l'une de celle-ci contient au moins un conflit, son intitulé apparaît en rouge dans le tableau (si aucun conflit, les intitulés sont bleus).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6a8efc37a5cf0d76476f9bca/file-Vh8zHq1c1f.png)

## Gérer ses conflits

Pour chaque type de conflit rencontré, plusieurs actions sont réalisables :

- Accédez aux deux Actions de Formation ou événements libres concernés ;
- Cliquez sur l'icône d'œil pour afficher l'Agenda de la semaine à la date du conflit et éventuellement déplacer le Créneau de Formation ou l'événement en conflit en le glissant-déposant sur un autre horaire.
- Cliquez sur l'icône de cloche pour désactiver l'alerte du conflit.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/67dc30adfb9a227465c05294/file-HPr9e0ahSv.png)

Exemple de conflit de Salles

**À noter** : si vous désactivez le conflit, celui-ci sera tout de même toujours visible sur la page du type de conflit concerné, mais il sera grisé et vous ne serez plus alerté avec des encadrés et pastilles rouges.

Une fois la source du conflit identifiée, il vous suffit de la corriger depuis l'Action de Formation, l'Agenda ou la fiche CRM concernée. Nous vous conseillons d'ouvrir les éléments en conflit sur plusieurs onglets différents afin de vérifier la coïncidence des dates ou horaires, et ainsi effectuer la modification.

## Configurer la vérification des conflits

Vous pouvez choisir de désactiver la vérification des conflits pour les Salles, les Formateurs et les Participants inscrits/staffés simultanément à plusieurs Créneaux de Formation.

Pour cela, depuis la [configuration de l'Agenda](https://pro.dendreo.com/redirect/config_agenda.php), dans la rubrique ***Vérifications des conflits***, mettez à ***Non*** les types de conflits que vous souhaitez désactiver. Une fois désactivée, cette vérification ne se fera plus.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/67e664589935550bd599fc35/file-eUIvztKrh5.png)

Si vous souhaitez réactiver la vérification plus tard, vous pourrez simplement remettre l'option sur ***Oui***.

**À noter** : pour une Salle, cochez l'option ***Ne pas détecter de conflits pour cette Salle*** depuis l'interface de modification ou création de la fiche si vous souhaitez l'exclure de la détection des conflits.
