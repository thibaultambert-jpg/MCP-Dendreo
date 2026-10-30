# Associer une Action système à un Modèle d'Email

Lors de la configuration d'un Modèle d'Email, vous pouvez associer des Actions système permettant d'automatiser certains comportements liés au Modèle d'Email concerné. Dans cette documentation, nous vous détaillons le fonctionnement général de ces Actions systèmes, comment les associer à vos Modèles d'Emails, ainsi qu'un **récapitulatif complet de toutes les Actions systèmes disponibles** sur votre compte 🙌

## Principe général

Sur Dendreo, il faut distinguer deux **types d'Actions système** :

- Les Actions système qui **déclenchent automatiquement l'envoi d'un Email** suite à une action réalisée par un membre de votre équipe (par exemple : l'envoi d'un Email lors de la validation ou du refus d'une Pré-inscription du Catalogue Public) ou un événement qui a eu lieu sur votre compte (par exemple : l'envoi automatique d'un accusé de réception à un Participant suite à sa réponse au Questionnaire de Satisfaction à chaud) ;
- Les Actions système qui **adaptent automatiquement le contenu de l'Email**, en générant le contenu du corps de l'Email (par exemple l'envoi de l'Email de relance des Factures en attente de paiement depuis une fiche CRM), les bonnes URL de redirection (par exemple l'envoi du Questionnaire de Satisfaction aux Participants) ou les pièces jointes (par exemple l'envoi de l'Email de relances de règlement d'une Facture).

**Attention** : un profil ***administrateur*** sur Dendreo est requis pour créer ou modifier des Modèles d'Emails et ainsi leur ajouter des Actions système. Pour plus d'informations, consultez notre documentation [**Créer et personnaliser les Modèles d'Emails**](https://doc.dendreo.com/article/57-configuration-modeles-emails-suivi).

**À noter** : les Actions système dans Dendreo sont prédéfinies par nos soins, vous pouvez les associer à un Modèle d'Email mais vous ne pouvez pas les modifier ou en créer de nouvelles.

## Associer une Action système à un Modèle d'Email

Pour ajouter une Action système à un Modèle d'Email, suivez les étapes ci-dessous :

- Depuis [la page de configuration des Modèles d'Emails](https://pro.dendreo.com/redirect/config_modeles_mails_types.php), créez un nouveau Modèle en cliquant sur ***Ajouter un Modèle d'Email*** ou éditez un Modèle existant en cliquant sur l'icône de crayon.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/66fbae6f15d0b822330649a7/file-pzI8n6CSkv.png)

- Paramétrez votre Modèle en lui affectant l'Action système souhaitée depuis la liste déroulante.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65c4e31265730008596312d8/file-LBmSuFGRuc.png)

**Attention** : si vous sélectionnez une Action système déjà utilisée dans un autre Modèle d'Email, une alerte s'affiche vous prévenant que si vous sauvegardez, l'Action système sera alors réattribuée au nouveau Modèle.

- Complétez les options du Modèle : l'intitulé, le corps et les éventuelles pièces jointes.
- Cliquez sur ***Ajouter*** pour enregistrer le Modèle créé ou modifié.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/660d051d8f8fca7f5efd39af/file-EQMy40wQXA.png)

Pour plus d'informations, consultez la documentation [**Créer et personnaliser les Modèles d'Emails**](https://doc.dendreo.com/article/57-configuration-modeles-emails-suivi).

## Récapitulatif des Actions systèmes

**Actions systèmes qui déclenchent l'envoi automatique d'un Email**

| **Cible** | **Action système** | **Résultat** |
| --- | --- | --- |
| Participants (dans une ADF) | *Accusé de réception d'un Questionnaire de Satisfaction* | Envoie un Email d'accusé de réception au Participant **une fois le Questionnaire de Satisfaction complété**. |
| Formateurs (dans une ADF) | *Accusé de réception d'un Questionnaire Formateur* | Envoie un Email d'accusé de réception au Formateur **une fois le Bilan Formateur complété**. |
| Invitations RSVP | *Annulation d'invitation RSVP pour les Formateurs et Participants* | Envoie un Email au Formateur ou au Participant le prévenant que la Formation est annulée **suite à la suppression de l'ADF**. |
| Inscription Catalogue Public | *Accusé de réception d'une inscription Participant sur le Catalogue Public* | Envoie un accusé de réception au Participant **suite à sa pré-inscription à une ADF** sur le Catalogue Public. |
| Inscription Catalogue Public | *Accusé de réception d'une inscription Particulier sur le Catalogue Public* | Envoie un accusé de réception au Particulier **suite à sa pré-inscription à une ADF** sur le Catalogue Public. |
| Inscription Catalogue Public | *Accusé de réception d'une inscription Participant(s) par un Responsable Formation sur le Catalogue Public* | Envoie un accusé de réception au Contact (Responsable Formation) **suite à sa demande d'inscription d'un ou plusieurs Participants** de son organisation sur le Catalogue Public. |
| Inscription Catalogue Public | *Accusé de réception d'une demande INTRA sur le Catalogue Public* | Envoie un accusé de réception au Contact (Responsable Formation) **suite à sa demande de Formation INTRA** sur le Catalogue Public. |
| Inscription Catalogue Public | *Notification administrateur d'une inscription Catalogue Public* | Notifie par Email l'administrateur Dendreo **suite à une nouvelle demande réalisée depuis le Catalogue Public**. |
| Modules > Participants d'une ADF | *Envoi du Questionnaire de Satisfaction à chaud à chaque fin de Module* | Envoie une notification au Participant à la fin de chaque Module pour répondre au Questionnaire de Satisfaction à chaud si, dans le cas d'une ADF multi-modules, la [configuration](https://pro.dendreo.com/redirect/config/satisfaction) ***Rendre disponibles les Questionnaires au fur et à mesure de la complétion des Modules*** est activée. |
| Modules > Participants d'une ADF | *Accusé de réception d'un Questionnaire Participant (Module)* | Envoie un accusé de réception au Participant après avoir complété son Questionnaire à la fin d'un Module. |
| Modules > Formateurs d'une ADF | *Envoi du Bilan Formateur à chaque fin de Module* | Envoie une notification au Formateur à la fin de chaque Module pour répondre au Bilan Formateur si, dans le cas d'une ADF multi-modules, la [configuration](https://pro.dendreo.com/redirect/config/satisfaction) ***Rendre disponibles les Questionnaires au fur et à mesure de la complétion des Modules*** est activée. |
| Modules > Formateurs d'une ADF | *Accusé de réception d'un Bilan Formateur (Module)* | Envoie un accusé de réception au Formateur après avoir complété son Bilan Formateur à la fin d'un Module. |
| Questionnaires | *Notification d'envoi de réponse à un Questionnaire* | Notifie par Email qu'un répondant a bien complété son Questionnaire, avec le lien vers ses réponses. |
| Questionnaires | *Partage de correction d'un Questionnaire* | Notifie par Email le Participant du partage de la correction et de ses résultats au Questionnaire si la case ***Notifier automatiquement le répondant lorsque ses résultats seront disponibles*** est cochée lors du partage des résultats. |

**Actions systèmes qui adaptent automatiquement le contenu de l'Email**

| **Cible** | **Action système** | **Résultat** |
| --- | --- | --- |
| Participants (dans une ADF) | *Envoi du Questionnaire de Satisfaction* | Génère l'URL du Questionnaire de Satisfaction du Participant **si le tag {lien} est présent dans le Modèle**. [Retire de la liste](https://doc.dendreo.com/article/623-comment-relancer-participants) des destinataires ajoutés par défaut les Participants ayant déjà répondu au Questionnaire. |
| Participants (dans une ADF) | *Envoi du Questionnaire de Satisfaction (à froid)* | Génère l'URL du Questionnaire de Satisfaction (à froid) du Participant **si le tag {lien} est présent dans le Modèle**. [Retire de la liste](https://doc.dendreo.com/article/623-comment-relancer-participants) des destinataires ajoutés par défaut les Participants ayant déjà répondu au Questionnaire. |
| Participants (dans une ADF) | *Envoi du formulaire pré-formation* | Sélectionne automatiquement le Modèle d'Email lié à l'Action système **lorsque vous cliquez sur le bouton dédié depuis l'onglet *Auto-positionnement***. [Retire de la liste](https://doc.dendreo.com/article/623-comment-relancer-participants) des destinataires ajoutés par défaut les Participants ayant déjà répondu au formulaire. |
| Participants (dans une ADF) | *Envoi du formulaire post-formation* | Sélectionne automatiquement le Modèle d'Email lié à l'Action système **lorsque vous cliquez sur le bouton dédié depuis l'onglet *Auto-positionnement***. [Retire de la liste](https://doc.dendreo.com/article/623-comment-relancer-participants) des destinataires ajoutés par défaut les Participants ayant déjà répondu au formulaire. |
| Participants (dans une ADF) | *Invitation d'un Participant à son Extranet, dans le cadre d'une ADF* | Génère l'URL d'auto-login à l'Extranet du Participant **si le tag {lien} est présent dans le Modèle.** |
| Formateurs (dans une ADF) | *Envoi du Questionnaire Formateur* | Génère l'URL du Bilan Formateur **si le tag {lien} est présent dans le Modèle**. |
| Formateurs (dans une ADF) | *Envoi d'une Consultation à un Formateur* | Sélectionne automatiquement le Modèle d'Email lié à l'Action système lors de la création d'une [consultation de Formateurs](https://doc.dendreo.com/article/738-consultation-formateurs) depuis une Action de Formation après avoir cliqué sur ***Envoyer à X Formateurs***. |
| Formateurs (dans une ADF) | *Relance d'une Consultation à un Formateur* | Sélectionne automatiquement le Modèle d'Email lié à l'Action système lorsque vous cliquez sur ***Relancer*** depuis l'interface d'une [consultation](https://doc.dendreo.com/article/738-consultation-formateurs) afin de relancer un Formateur n'ayant pas encore répondu. |
| Formateurs (dans une ADF) | *Refus d'une candidature Formateur sur une Consultation* | Sélectionne automatiquement le Modèle d'Email lié à l'Action système lorsque vous cochez l'option ***Notifier le(s) Formateur(s) refusé(s) par Email*** après avoir cliqué sur le bouton de validation ou refus d'une candidature Formateur à une [consultation](https://doc.dendreo.com/article/738-consultation-formateurs). |
| Formateurs (dans une ADF) | *Validation d'une candidature Formateur sur une Consultation* | Sélectionne automatiquement le Modèle d'Email lié à l'Action système lorsque vous cochez l'option ***Notifier le Formateur accepté par Email*** après avoir cliqué sur le bouton de validation d'une candidature Formateur à une [consultation](https://doc.dendreo.com/article/738-consultation-formateurs). |
| Factures | *Facture : envoi initial (Client)* | Ajoute la Facture en pièce jointe de l'Email à destination d'une Entreprise ou d'un Particulier. Une fois l'Email envoyé, la date d'envoi s'affiche dans les colonnes dédiées du [tableau de suivi des Factures](https://doc.dendreo.com/article/101-suivi-de-vos-factures). |
| Factures | *Facture : envoi initial (Financeur externe)* | Ajoute la Facture en pièce jointe de l'Email à destination d'un Financeur externe. Une fois l'Email envoyé, la date d'envoi s'affiche dans les colonnes dédiées du [tableau de suivi des Factures](https://doc.dendreo.com/article/101-suivi-de-vos-factures). |
| Factures | *Facture : envoi Duplicata* | Sélectionne le Modèle d'Email contenant cette Action système en cliquant sur l'enveloppe dans la colonne ***Envoi Duplicata*** présente dans le tableau des Factures, et ajoute le Duplicata en pièce jointe de l'Email. |
| Factures | *Facture : 1ère relance (Client)* | Ajoute la Facture en pièce jointe de l'Email à destination d'une Entreprise ou d'un Particulier. Une fois l'Email envoyé, la date d'envoi s'affiche dans les colonnes dédiées du [tableau de suivi des Factures](https://doc.dendreo.com/article/101-suivi-de-vos-factures). |
| Factures | *Facture : 1ère relance (Financeur externe)* | Ajoute la Facture en pièce jointe de l'Email à destination d'un Financeur Externe. Une fois l'Email envoyé, la date d'envoi s'affiche dans les colonnes dédiées du [tableau de suivi des Factures](https://doc.dendreo.com/article/101-suivi-de-vos-factures). |
| Factures | *Facture : 2ème relance (Client)* | Ajoute la Facture en pièce jointe de l'Email à destination d'une Entreprise ou d'un Particulier. Une fois l'Email envoyé, la date d'envoi s'affiche dans les colonnes dédiées du [tableau de suivi des Factures](https://doc.dendreo.com/article/101-suivi-de-vos-factures). |
| Factures | *Facture : 2ème relance (Financeur externe)* | Ajoute la Facture en pièce jointe de l'Email à destination d'un Financeur Externe. Une fois l'Email envoyé, la date d'envoi s'affiche dans les colonnes dédiées du [tableau de suivi des Factures](https://doc.dendreo.com/article/101-suivi-de-vos-factures). |
| Factures Formateurs (frais pédagogiques) | *Facture Formateur à transmettre* | Sélectionne automatiquement le Modèle d'Email lié à l'Action système **lorsque vous envoyez un Email depuis l'étape *En attente de saisie* de l'interface de gestion des Frais pédagogiques**. |
| Factures Formateurs (frais pédagogiques) | *Facture Formateur validée* | Sélectionne automatiquement le Modèle d'Email lié à l'Action système comme Email de confirmation **lorsque vous validez une Facture Formateur depuis l'étape *À valider* de l'interface de gestion des Frais pédagogiques**. |
| Factures Formateurs (frais pédagogiques) | *Facture Formateur refusée* | Sélectionne automatiquement le Modèle d'Email lié à l'Action système comme Email de confirmation **lorsque vous refusez une Facture Formateur depuis l'étape *À valider* de l'interface de gestion des Frais pédagogiques**. |
| Factures Formateurs (frais pédagogiques) | *Facture Formateur mise en paiement* | Sélectionne automatiquement le Modèle d'Email lié à l'Action système comme Email de confirmation **lorsque vous indiquez qu'une Facture Formateur est mise en paiement depuis l'étape *Validée* de l'interface de gestion des Frais pédagogiques**. |
| Participants (fiche individuelle) | *Factures en attente de paiement - Participant* | Liste toutes les Factures impayées à destination du Participant, et ajoute les Factures en pièce jointe. |
| Participants (fiche individuelle) | *Facture(s) échue(s) : mise en demeure* | Liste toutes les Factures impayées à destination du Participant arrivées à échéance, et ajoute les Factures en pièce jointe. |
| Participants (fiche individuelle) | *Invitation d'un Participant à son Extranet* | Génère l'URL d'auto-login à l'Extranet du Participant **si le tag {lien} est présent dans le Modèle.** |
| Entreprises / Particuliers (fiche individuelle) | *Factures en attente de paiement* | Liste toutes les Factures impayées, et ajoute les Factures en pièce jointe. |
| Entreprises / Particuliers (fiche individuelle) | *Facture(s) échue(s) : mise en demeure* | Liste toutes les Factures impayées arrivées à échéance, et ajoute les Factures en pièce jointe. |
| Invitations RSVP | *Invitation RSVP pour les Formateurs* | Envoie une Invitation RSVP au Formateur pour un Créneau de Formation **lorsque vous cliquez sur le bouton d'invitation depuis l'onglet *Formateurs* d'une ADF**. |
| Invitations RSVP | *Invitation RSVP pour les Participants* | Envoie une Invitation RSVP au Participant pour un Créneau de Formation **lorsque vous cliquez sur le bouton d'invitation depuis l'onglet *Invitations et Présences* d'une ADF**. |
| Inscription Catalogue Public | *Validation d'une inscription Participant sur le Catalogue Public* | Sélectionne automatiquement le Modèle d'Email confirmant au Participant la validation de son inscription à une ADF. |
| Inscription Catalogue Public | *Refus d'une inscription Participant sur le Catalogue Public* | Sélectionne automatiquement le Modèle d'Email informant le Participant du refus de son inscription à une ADF. |
| Inscription Catalogue Public | *Validation d'une inscription Particulier sur le Catalogue Public* | Sélectionne automatiquement le Modèle d'Email confirmant au Particulier la validation de son inscription à une ADF. |
| Inscription Catalogue Public | *Refus d'une inscription Particulier sur le Catalogue Public* | Sélectionne automatiquement le Modèle d'Email informant le Particulier du refus de son inscription à une ADF. |
| Inscription Catalogue Public | *Validation d'une inscription Participant(s) par un Responsable Formation sur le Catalogue Public* | Sélectionne automatiquement le Modèle d'Email confirmant au Contact (Responsable Formation) la validation de sa demande d'inscription d'un ou plusieurs Participants de son organisation. |
| Inscription Catalogue Public | *Refus d'une inscription Participant(s) par un Responsable Formation sur le Catalogue Public* | Sélectionne automatiquement le Modèle d'Email informant le Contact (Responsable Formation) du refus de sa demande d'inscription d'un ou de plusieurs Participants de son organisation. |
| Inscription Catalogue Public | *Refus d'une demande d'INTRA sur le Catalogue Public* | Sélectionne automatiquement le Modèle d'Email informant le Contact (Responsable Formation) du refus de sa demande d'INTRA. |
| Questionnaires | *Envoi d'un Questionnaire à une fiche CRM* | Sélectionne automatiquement le Modèle d'Email demandant à la cible (Participant, Formateur ou Contact) de remplir son Questionnaire. |
| Questionnaires | *Envoi d'un Questionnaire dans le cadre d'une ADF* | Sélectionne automatiquement le Modèle d'Email demandant à la cible (Participant, Formateur ou Contact) de remplir son Questionnaire lié à l'ADF. |
