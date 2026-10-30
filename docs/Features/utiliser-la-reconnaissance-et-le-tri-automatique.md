# Utiliser la reconnaissance et le tri automatique

Pour **faciliter le tri et l'archivage des documents**, Dendreo vous propose un mécanisme permettant de **reconnaitre automatiquement un document provenant de Dendreo**, afin de pouvoir l'identifier, et le classer automatiquement en l'associant aux fiches auxquelles il est lié. Pour ce faire, Dendreo applique un **QR Code** sur tous les documents générés par Dendreo, qui lui permettra ensuite de reconnaitre ce document, **même si celui-ci a été imprimé et scanné ou photographié**.

Une fois que vos documents comportent un [QR Code](https://doc.dendreo.com/article/495-inserer-qr-code), vous pouvez les uploader sur Dendreo, et le logiciel tentera de reconnaitre automatiquement l'origine du document pour **le classer dans le bon espace de stockage**, et [éventuellement le relier à plusieurs fiches](https://doc.dendreo.com/article/165-espace-de-stockage). Lorsque vous uploadez de nouveaux documents dans l'Espace de Stockage, ceux-ci sont en **sur-brillance jaune** pendant quelques minutes pour vous aider à **les repérer plus facilement**.

**À noter** : pour assurer un bon fonctionnement, **chaque document doit contenir un seul QR Code**. Par exemple, vous ne pouvez pas uploader un document comportant 3 pages, avec 3 attestations de Formation différentes : Dendreo considérera ce document comme une seule attestation de Formation, et ne prendra en compte que le QR Code de la **première ou dernière page** (selon votre configuration) pour le reconnaitre et le classer. Si vous scannez des documents, ne regroupez donc pas plusieurs documents différents en un seul fichier PDF : il vous faut **envoyer plusieurs documents indépendants**.

**Attention** : si vous **scannez plusieurs fois votre document comportant un QR code** dans des imprimantes différentes ou même trop souvent, la qualité du QR Code se détériore et le QR Code peut ne plus être lisible par Dendreo.

## Uploader depuis la page d'Accueil

[Votre page d'accueil Dendreo](https://pro.dendreo.com/redirect/) dispose d'une section permettant d'y glisser-déposer un ou plusieurs documents depuis votre ordinateur. Ce document doit impérativement **comporter un QR Code** **généré par Dendreo** pour pouvoir être correctement traité.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6abe7024bd0193dcb268da89/file-hlmQcuYZGB.png)

- Si Dendreo reconnait bien le document, celui-ci sera automatiquement rangé dans l'**Espace de stockage de la bonne Action de Formation** (et associé éventuellement avec la bonne Entreprise, le bon Formateur ou le bon Participant, afin de retrouver ce Document également depuis leurs fiches dans l'onglet ***Documents liés dans des ADF***).
- Si Dendreo ne parvient pas à reconnaitre le document, un message d'erreur apparaitra et votre document ne sera pas sauvegardé. Tentez alors d'uploader manuellement le document au bon endroit.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6abe712abd0193dcb268da8f/file-Z7GBlrR87D.png)

**À noter** : si vous tentez d'uploader un document avec QR Code directement dans une mauvaise Action de Formation, Dendreo vous bloquera et vous alertera par une erreur.

## Uploader depuis un Email

Il est également possible d'envoyer vos documents comportant un QR code directement par Email ! Pour cela, une adresse mail unique privée est générée pour chaque Organisme. Vous pouvez trouver cette adresse mail directement sur la page d'accueil en cliquant sur Copier l'adresse, ou bien dans la [configuration de la GED](https://pro.dendreo.com/redirect/config/fichiers).

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/6abe7199bd0193dcb268da91/file-zWDRzUwdP9.png)

Depuis la page d'Accueil

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65fabdf944432440552f957e/file-QII5YyfxyP.png)

Depuis la configuration de la GED

Vous pouvez envoyer un ou plusieurs documents dans le même Email, et ces documents peuvent **appartenir à une ou plusieurs Actions de Formations différentes**.

Vous pouvez tout à fait faire suivre à Dendreo (forward) un Email qui vous a été envoyé par un Client, par exemple une Convention de Formation qu'un Client vous renvoie signée. Une fois votre Email traité, vous recevrez un email automatique de rapport de la part de Dendreo vous informant que les documents ont bien été ajoutés aux Actions de Formation (et Participants, Entreprises ou Formateurs) correspondants à votre requête. Dans le cas où le document n'a pas été correctement reconnu, vous recevrez également un retour vous indiquant qu'il y a eu une erreur lors de la reconnaissance.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65fabedf668a210c0c45d643/file-hgS2bu8dud.png)

Email de bonne réception des documents

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65fabeff4a2029187b347fde/file-xuFYNbGPCS.png)

Email informant d'une erreur

**Gardez votre adresse mail d'upload confidentielle !** Celle-ci ne doit pas être partagée publiquement, sous risque de laisser des personnes extérieures à votre Organisme uploader des documents sur Dendreo sans votre accord. En [configuration](https://pro.dendreo.com/redirect/config/fichiers), vous pouvez :

- Choisir de renommer les fichiers reçus avec le nom de leur Modèle ;
- Générer une nouvelle adresse email si vous le souhaitez (utile si vous avez diffusé par erreur votre adresse email d'upload confidentielle, et que vous souhaitez la désactiver) ;
- Ajuster les paramètres de notification de réception du rapport email de traitement des fichiers.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/59b2fb88042863033a1cb464/images/65fabf57668a210c0c45d645/file-4GETUX7Quq.png)

## Exemple pratique

Supposons que vous générez une Convention Entreprise avec l'Entreprise A, pour l'Action de Formation B. Vous envoyez ensuite cette Convention à l'Entreprise A (soit par courrier, soit par Email). Cette convention vous revient signée, soit par Email, soit par courrier.

Trois possibilités s'offrent alors à vous :

- Vous téléchargez la Convention qui vous a été renvoyée par Email puis vous l'uploadez sur la page d'accueil de Dendreo.
- Vous transférez l'Email du Client avec ses pièces jointes directement sur l'adresse d'upload Dendreo.
- Vous recevez par courrier la Convention : vous pouvez la scanner avec un scanner dédié ou une application mobile (comme Dropbox, qui permet de scanner des documents simplement en prenant des photos de ceux-ci), puis uploadez le PDF obtenu grâce à l'une des deux méthodes précédentes (sur l'Accueil de Dendreo, ou depuis l'envoi par Email).

Une fois la Convention uploadée selon l'une des trois méthodes ci-dessus, celle-ci se retrouvera **automatiquement stockée dans l'Espace de stockage** de la fiche de l'Action de Formation B, et sera liée également avec l'Entreprise A, ce qui vous permettra de retrouver celle-ci aussi depuis la fiche de l'Entreprise A (dans l'onglet ***Fichiers liés dans les ADF***, et non ***Espace de stockage***). Vous pouvez également uploader le document directement dans la bonne Action de Formation. Dans ce cas, le document sera automatiquement lié à la fiche Entreprise (ou autre) associée. Dans le cas où le document ne correspond pas à l'ADF dans laquelle vous essayez de l'uploader, un message d'erreur vous préviendra que la manipulation n'a pas fonctionné.
