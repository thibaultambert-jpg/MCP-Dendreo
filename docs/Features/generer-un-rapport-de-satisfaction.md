# Générer un rapport de Satisfaction

Vous avez la possibilité de générer un bilan statistique des notes de Satisfaction données par les Participants pour vos Actions de Formation et sur le Formateur.

Consultez cette documentation pour retrouver tous les tags qui vous permettront de créer les Modèles de documents relatifs aux Questionnaires de Satisfaction envoyés à vos Participants depuis Dendreo.

Pour plus d'informations sur les tags, notamment les tags pour les questions relatives à la Formation dans son ensemble et aux Salles, consultez notre [**documentation sur les Modèles de document**](https://doc.dendreo.com/article/326-introduction-aux-modeles-de-documents) !

## Documents par Action de Formation

Dans les documents par Action de Formation, vous pouvez générer un document vous présentant la Satisfaction générale de l'Action de Formation ou bien spécifique au Module et au Formateur.

### Satisfaction générale de l'Action de Formation

| Tag | Description |
| --- | --- |
| **{adf_moyenne_generale_satisfaction}** | Moyenne générale de satisfaction **sur l'ensemble des Participants de l'ADF** (sur 100 ou en %) |
| **{adf_moyenne_generale_satisfaction_bar}** | Idem, sous forme de barre de progression |
| **{adf_moyenne_generale_satisfaction_bar_400}** | Idem, avec réglage de la taille de la barre (en valeur absolue ou %) |
| **{adf_moyenne_satisfaction}** | Moyenne de satisfaction **sur les Participants dans le contexte du document** (sur 100 ou en %) |
| **{adf_moyenne_satisfaction_bar}** | Idem, sous forme de barre de progression |
| **{adf_moyenne_satisfaction_bar_400}** | Idem, avec réglage de la taille de la barre (en valeur absolue ou %) |

Si vous utilisez le tag {adf_moyenne_satisfaction} dans un document général sur l'Action de Formation, son résultat sera équivalent à {adf_moyenne_generale_satisfaction}.

En revanche, si vous utilisez {adf_moyenne_satisfaction} dans un document par Entreprise (***ADF*** > ***par Entreprise***), la moyenne de satisfaction sera **calculée uniquement pour les Participants de cette Entreprise**. Le résultat sera donc potentiellement différent de la moyenne générale pour tous les Participants de l'ADF.

Si vous utilisez {adf_moyenne_satisfaction} dans un document à destination d'un Participant (***ADF*** > ***par Participant***), la moyenne de satisfaction calculée **ne concernera alors que ce Participant** (le résultat sera alors équivalent au tag {participant_moyenne_adf_satisfaction).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/670e6bb96d43ca7b17b2be70/file-Efr53M4GIy.png)

| Tag | Description |
| --- | --- |
| **{adf_taux_reponse_satisfaction}** | Taux de réponses au Questionnaire, en % |
| **{adf_nb_participants_repondants_satisfaction}** | Nombre de participants ayant répondu au Questionnaire |
| **{adf_liste_participants_repondants_satisfaction}** | Liste des noms des Participants ayant répondu au Questionnaire de Satisfaction |
| **{adf_nb_participants_non_repondants_satisfaction}** | Nombre de participants n'ayant pas répondu au Questionnaire |
| **{adf_liste_participants_non_repondants_satisfaction}** | Liste des noms des Participants n'ayant pas répondu au Questionnaire de Satisfaction |

### Satisfaction au sujet d'un Module

**À noter** : les tags suivants ne fonctionnent que dans une boucle de Modules {#modules}{/modules} ou dans un document type généré par Module.

| Tag | Description |
| --- | --- |
| **{module_moyenne_generale_satisfaction}** | Moyenne générale de Satisfaction au Module **sur l'ensemble des Participants** dans Dendreo, toutes ADF confondues (sur 100 ou en %) |
| **{module_moyenne_generale_satisfaction_bar}** | Idem, sous forme de barre de progression |
| **{module_moyenne_generale_satisfaction_bar_350}** | Idem, avec réglage de la taille de la barre (en valeur absolue ou %) |
| **{module_moyenne_adf_satisfaction}** | Moyenne de Satisfaction au Module pour l'ADF, pour les Participants concernés (sur 100 ou en %) |
| **{module_moyenne_adf_satisfaction_bar}** | Idem, sous forme de barre de progression |
| **{module_moyenne_adf_satisfaction_bar_350}** | Idem, avec réglage de la taille de la barre (en valeur absolue ou %) |
| **{module_questions_notations_reponses}** | Nombre de réponses recueillies pour les Participants concernés (Participants ayant répondu) et composant la moyenne ci-dessus |

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/670e6bd744fbd7540103b58b/file-0LxM2zEYxL.png)

Comme pour {adf_moyenne_satisfaction}, le résultat du tag {module_moyenne_adf_satisfaction} et de ses variantes dépend du contexte du document (par ADF, par Entreprise ou par Participant) : il ne calcule la moyenne de satisfaction que pour les Participants concernés dans le contexte de la génération du document.

**Questions et réponses sur la Satisfaction du Module**

Afin de retourner les valeurs du questionnaire, il vous faut utiliser notre [système de tags de boucle](https://doc.dendreo.com/article/7-modeles-de-documents-les-tags-boucle).

**À noter** : les moyennes pour chaque question et les réponses affichées dépendent du contexte du document (par ADF, Entreprise ou Participant). Dendreo ne calcule la moyenne de satisfaction et n'affiche les réponses que des Participants concernés dans le contexte de la génération du document.

**Pour les questions de type notation**, effectuez la boucle avec :

- {#module_questions_notations} {/module_questions_notations}
- ou {##module_questions_notations}

Les tags disponibles dans la boucle sont :

| Tag | Description |
| --- | --- |
| **{module_question_notation_intitule}** | Intitulé de la question |
| **{module_question_notation_moyenne_satisfaction}** | Moyenne des notes données à cette question, pour les Participants concernés (sur 100 ou en %) |
| **{module_question_notation_moyenne_satisfaction_bar}** | Idem, sous forme de barre de progression |
| **{module_question_notation_moyenne_satisfaction_bar_300}** | Idem, avec réglage de la taille de la barre (en valeur absolue ou %) |
| **{module_question_notation_reponses}** | Nombre de réponses à cette question, pour les Participants concernés |

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/670e765b44fbd7540103b59e/file-ewezRBRgKz.png)

**Pour une boucle de tableau**, effectuez la boucle avec :

- {#module_question_notation_reponses} {/module_question_notation_reponses}
- ou {##module_question_notation_reponses}

Les tags disponibles dans la boucle sont :

| Tag | Description |
| --- | --- |
| **{module_question_notation_intitule}** | Intitulé de la question |
| **{module_question_notation_reponse_participant}** | Nom du participant lié à cette réponse |
| **{module_question_notation_reponse_note}** | Note donnée par le Participant |
| **{module_question_notation_reponse_amplitude}** | Amplitude de la note |
| **{module_question_notation_reponse_note_normalisee}** | Note normalisée sur 100 (% ou /100) |

**Pour les questions ouvertes**, effectuez la boucle avec :

- {#module_questions_ouvertes} {/module_questions_ouvertes}
- ou {##module_questions_ouvertes}

Les tags disponibles dans la boucle sont :

| Tag | Description |
| --- | --- |
| **{module_question_ouverte_intitule}** | Intitulé de la question |
| **{module_question_ouverte_reponses}** | Nombre de réponses reçues à cette question, pour les Participants concernés |

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/670e7cc91198281bd8609fae/file-GWgXhpN5rg.png)

**Pour une boucle de tableau**, effectuez la boucle avec :

- {#module_question_ouverte_reponses} {/module_question_ouverte_reponses}
- ou {##module_question_ouverte_reponses}

Les tags disponibles dans la boucle sont :

| Tag | Description |
| --- | --- |
| **{module_question_ouverte_reponse_participant}** | Nom du Participant ayant donné cette réponse |
| **{module_question_ouverte_reponse_texte}** | Réponse (texte) du Participant |

### Satisfaction au sujet d'un Formateur

**À noter** : les tags suivants ne fonctionnent que dans une boucle {#formateurs} {/formateurs} ou dans un document type généré par Formateur.

| Tag | Description |
| --- | --- |
| **{formateur_moyenne_generale_satisfaction}** | Moyenne de Satisfaction du Formateur **sur l'ensemble des Participants** dans Dendreo, toutes ADF confondues (sur 100 ou en %) |
| **{formateur_moyenne_generale_satisfaction_bar}** | Idem, sous forme de barre de progression |
| **{formateur_moyenne_generale_satisfaction_bar_350}** | Idem, avec réglage de la taille de la barre (en valeur absolue ou %) |
| **{formateur_moyenne_adf_satisfaction}** | Moyenne de Satisfaction du Formateur pour cette ADF, pour les Participants concernés (sur 100 ou en %) |
| **{formateur_moyenne_adf_satisfaction_bar}** | Idem, sous forme de barre de progression |
| **{formateur_moyenne_adf_satisfaction_bar_350}** | Idem, avec réglage de la taille de la barre (en valeur absolue ou %) |
| **{formateur_questions_notations_reponses}** | Nombre de réponses recueillies pour les Participants concernés (nombres de participants ayant répondu) et composant la moyenne ci-dessus. |

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/670e80578af27b34842c027c/file-0j4ROAKucD.png)

Comme pour {adf_moyenne_satisfaction}, le résultat du tag {formateur_moyenne_adf_satisfaction} et de ses variantes dépend du contexte du document (par ADF, Entreprise ou Participant) : il ne calcule la moyenne de Satisfaction que pour les Participants concernés dans le contexte de la génération du document.

**Questions et réponses sur la Satisfaction du Formateur**

Vous pouvez utilisez les mêmes tags disponibles pour les Modules en remplaçant module par formateur.

**À noter** : les moyennes pour chaque question et les réponses affichées dépendent du contexte du document (par ADF, Entreprise ou Participant). Dendreo ne calcule la moyenne de satisfaction et n'affiche les réponses que des Participants concernés dans le contexte de la génération du document.

**Pour les questions de type notation**, effectuez la boucle avec :

- {#formateur_questions_notations} {/formateur_questions_notations}
- ou {##formateur_questions_notations}

Les tags disponibles dans la boucle sont :

| Tag | Description |
| --- | --- |
| **{formateur_question_notation_intitule}** | Intitulé de la question |
| **{formateur_question_notation_moyenne_satisfaction}** | Moyenne des notes données à cette question, pour les Participants concernés (sur 100 ou en %) |
| **{formateur_question_notation_moyenne_satisfaction_bar}** | Idem, sous forme de barre de progression |
| **{formateur_question_notation_moyenne_satisfaction_bar_300}** | Idem, avec réglage de la taille de la barre (en valeur absolue ou %) |
| **{formateur_question_notation_reponses}** | Nombre de réponses à cette question, pour les Participants concernés |

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/670e856244fbd7540103b5b1/file-8XgcmUi0Ol.png)

**Pour une boucle de tableau**, effectuez la boucle avec :

- {#formateur_question_notation_reponses} {/formateur_question_notation_reponses}
- ou {##formateur_question_notation_reponses}

Les tags disponibles dans la boucle sont :

| Tag | Description |
| --- | --- |
| **{formateur_question_notation_intitule}** | Intitulé de la question |
| **{formateur_question_notation_reponse_participant}** | Nom du Participant lié à cette réponse |
| **{formateur_question_notation_reponse_note}** | Note donnée par le Participant |
| **{formateur_question_notation_reponse_amplitude}** | Amplitude de la note |
| **{formateur_question_notation_reponse_note_normalisee}** | Note normalisée sur 100 (% ou /100) |

**Pour les questions ouvertes**, effectuez la boucle avec :

- {#formateur_questions_ouvertes} {/formateur_questions_ouvertes}
- ou {##formateur_questions_ouvertes}

Les tags disponibles dans la boucle sont :

| Tag | Description |
| --- | --- |
| **{formateur_question_ouverte_intitule}** | Intitulé de la question |
| **{formateur_question_ouverte_reponses}** | Nombre de réponses reçues à cette question, pour les Participants concernés |

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/670e84ec6d43ca7b17b2be90/file-FtE9YCDMOP.png)

**Pour une boucle de tableau**, effectuez la boucle avec :

- {#formateur_question_ouverte_reponses} {/formateur_question_ouverte_reponses}
- ou {##formateur_question_ouverte_reponses}

Les tags disponibles dans la boucle sont :

| Tag | Description |
| --- | --- |
| **{formateur_question_ouverte_reponse_participant}** | Nom du Participant ayant donné cette réponse |
| **{formateur_question_ouverte_reponse_texte}** | Réponse (texte) du Participant |

## Document par ADF > Entreprise

Utilisez directement tous les tags détaillés ci-dessus à l'exception des tags contenant moyenne_generale dans un document à destination d'une Entreprise : tous les résultats retournés par Dendreo ne concerneront automatiquement que les Participants de l'Entreprise concernée.

## Document par ADF > Participant

Utilisez directement tous les tags détaillés ci-dessus à l'exception des tags contenant moyenne_generale dans un document à destination d'un Participant : tous les résultats retournés par Dendreo ne concerneront automatiquement que le Participant concerné.

Il est également possible de reconstruire l'intégralité du Questionnaire de Satisfaction complété par un Participant grâce aux tags ci-dessous. Ceux-ci permettent notamment de boucler uniquement sur les Formateurs et Modules évalués par le Participant, plutôt que sur tous les Modules et Formateurs de l'Action de Formation, ce qui est utile dans le cas d'une ADF multi-modules où les Participants n'assistent pas à tous les Modules et ne voient pas forcément tous les Formateurs.

**À noter** : les tags suivants ne fonctionnent que dans une boucle {#participants} {/participants} ou dans un document à destination d'un Participant.

### Satisfaction générale du Participant sur toutes les ADF

| Tag | Description |
| --- | --- |
| **{participant_moyenne_generale_satisfaction}** | Moyenne générale de Satisfaction du Participant sur l'ensemble des ADF dans Dendreo (sur 100 ou en %) |
| **{participant_moyenne_generale_satisfaction_bar}** | Idem, sous forme de barre de progression |
| **{participant_moyenne_generale_satisfaction_bar_350}** | Idem, avec réglage de la taille de la barre |

### Satisfaction générale du Participant sur cette ADF

| Tag | Description |
| --- | --- |
| **{participant_moyenne_adf_satisfaction}** | Moyenne de Satisfaction du Participant sur cette session (sur 100 ou en %) |
| **{participant_moyenne_adf_satisfaction_bar_350}** | Idem, sous forme de barre de progression, avec réglage de la taille de la barre |

### Satisfaction du Participant sur les Modules de cette ADF

Effectuez la boucle avec {#participant_satisfaction_modules} {/participant_satisfaction_modules}.

| Tag | Description |
| --- | --- |
| **{participant_satisfaction_module}** | Intitulé du Module évalué |
| **{participant_satisfaction_module_moyenne_satisfaction}** | Moyenne de Satisfaction du Participant quant au Module sur cette session (sur 100 ou en %) |
| **{participant_satisfaction_module_moyenne_satisfaction_bar_300}** | Idem, sous forme de barre de progression, avec réglage de la taille de la barre |

**Questions et réponses sur la Satisfaction du Module**

**Pour les questions de type notation**, effectuez la boucle avec :

- {#participant_satisfaction_module_reponses_notations} {/participant_satisfaction_module_reponses_notations}
- ou {##participant_satisfaction_module_reponses_notations}

Les tags disponibles dans la boucle sont :

| Tag | Description |
| --- | --- |
| **{participant_satisfaction_module_reponse_notation_question}** | Enoncé de la question de Satisfaction à propos du Module |
| **{participant_satisfaction_module_reponse_notation_note}** | Note donnée par le Participant |
| **{participant_satisfaction_module_reponse_notation_amplitude}** | Amplitude de la note possible |
| **{participant_satisfaction_module_reponse_notation_bar_250}** | Idem, sous forme de barre de progression, avec réglage de la taille de la barre |
| **{participant_satisfaction_module_reponse_notation_note_normalisee}** | Equivalence de la note donnée par le Participant sous forme de pourcentage |

**Pour les questions ouvertes**, effectuez la boucle avec :

- {#participant_satisfaction_module_reponses_ouvertes} {/participant_satisfaction_module_reponses_ouvertes}
- ou {##module_questions_ouvertes}

Les tags disponibles dans la boucle sont :

| Tag | Description |
| --- | --- |
| **{participant_satisfaction_module_reponse_ouverte_question}** | Enoncé de la question de satisfaction à propos du Module |
| **{participant_satisfaction_module_reponse_ouverte_texte}** | Réponse donnée par le Participant |

### Satisfaction du Participant quant aux Formateurs rencontrés sur l'ADF

**À noter** : les tags suivants ne fonctionnent que dans une boucle {#participant_satisfaction_formateurs} {/participant_satisfaction_formateurs}. Cette boucle permet de n'afficher que les formateurs ayant effectivement donné cours au Participant.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/670f73ce44628317ef90547b/file-urRcUWZztY.png)

| Tag | Description |
| --- | --- |
| **{participant_satisfaction_formateur}** | Nom du formateur évalué dans cette boucle |
| **{participant_satisfaction_formateur_moyenne_satisfaction}** | Moyenne de Satisfaction du Participant quant au Formateur sur cette session(sur 100 ou en %) |
| **{participant_satisfaction_formateur_moyenne_satisfaction_bar_300}** | Idem, sous forme de barre de progression, avec réglage de la taille de la barre |

**Questions et réponses à propos du Formateur**

**Pour les questions de type notation**, effectuez la boucle avec :

- {#participant_satisfaction_formateur_reponses_notations} {/participant_satisfaction_formateur_reponses_notations}
- ou {##participant_satisfaction_formateur_reponses_notations}

Les tags disponibles dans la boucle sont :

| Tag | Description |
| --- | --- |
| **{participant_satisfaction_formateur_reponse_notation_question}** | Enoncé de la question de Satisfaction à propos du Formateur |
| **{participant_satisfaction_formateur_reponse_notation_note}** | Note donnée par le Participant |
| **{participant_satisfaction_formateur_reponse_notation_amplitude}** | Amplitude de la note possible |
| **{participant_satisfaction_formateur_reponse_notation_bar_250}** | Idem, sous forme de barre de progression, avec réglage de la taille de la barre |
| **{participant_satisfaction_formateur_reponse_notation_note_normalisee}** | Equivalence de la note donnée par le Participant sous forme de pourcentage |

**Pour les questions ouvertes**, effectuez la boucle avec :

- {#participant_satisfaction_formateur_reponses_ouvertes} {/participant_satisfaction_formateur_reponses_ouvertes}
- ou {##participant_satisfaction_formateur_reponses_ouvertes}

Les tags disponibles dans la boucle sont :

| Tag | Description |
| --- | --- |
| **{participant_satisfaction_formateur_reponse_ouverte_question}** | Enoncé de la question de satisfaction à propos du Formateur |
| **{participant_satisfaction_formateur_reponse_ouverte_texte}** | Réponse donnée par le Participant |

## Document par Module

Vous pouvez également générer un document par Module directement sur la fiche de chaque Module (indépendamment de chaque Action de Formation). Un exemple est donné sur [cet article](https://doc.dendreo.com/article/79-questionnaire-satisfaction).

Les tags sont globalement les mêmes, sauf que les tags relatifs aux questions ouvertes ne sont pas disponibles, et que vous avez en plus accès aux tags spécifiques suivants dans ce contexte :

| Tag | Description |
| --- | --- |
| **{module_nb_participants_repondants_satisfaction}** | Nombre de Participants ayant suivi ce Module et répondu à un questionnaire |
| **{module_nb_participants_non_repondants_satisfaction}** | Nombre de Participants ayant suivi ce Module et n'ayant pas répondu à un questionnaire |
| **{module_taux_reponse_satisfaction}** | Rapport du nombre de Participants ayant suivi ce Module et répondu à un questionnaire / Nombre total de Participants ayant suivi ce Module |
