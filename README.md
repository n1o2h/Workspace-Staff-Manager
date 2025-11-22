# Workspace Staff Manager -- README

##  Contexte du projet

Ce projet a pour objectif de gérer visuellement et dynamiquement
l'affectation des employés dans différentes zones d'un bâtiment.\
L'interface permet d'ajouter, visualiser, déplacer et supprimer des
employés sur un plan interactif, tout en respectant des règles métier
prédéfinies.

##  Objectifs généraux

-   Permettre l'ajout, le déplacement et la suppression d'employés via
    une interface graphique.
-   Respecter les règles métier selon le rôle (ex : seuls les
    réceptionnistes peuvent aller à la Réception).
-   Offrir une interface fluide, intuitive et responsive (PC, tablette,
    mobile).
-   Centraliser la gestion des données du personnel et leur position
    dans le bâtiment.
-   Sauvegarder automatiquement l'état de l'application dans le
    `localStorage`.

------------------------------------------------------------------------

##  User Stories

###  Côté Conception

-   En tant que concepteur, je vais m'assurer que l'interface soit
    intuitive et fluide pour l'utilisateur.
-   Je vais définir une palette cohérente et des icônes intuitives.
-   Je vais concevoir les versions Desktop et Mobile avec un design
    moderne (Flexbox, Grid, formes arrondies, boutons colorés).

### 💻 Côté Développement Front-End

-   Créer toute la structure HTML avec une sidebar affichant la liste
    des employés non assignés ("Unassigned Staff").
-   Développer une modale d'ajout d'employé avec :
    -   Nom\
    -   Rôle\
    -   Photo (URL)\
    -   Email\
    -   Téléphone\
    -   Expériences (formulaire dynamique)
-   Ajouter une prévisualisation de la photo.
-   Afficher un plan composé de 6 zones :
    1.  Salle de conférence\
    2.  Réception\
    3.  Salle des serveurs\
    4.  Salle de sécurité\
    5.  Salle du personnel\
    6.  Salle d'archives

###  Règles métier

-   Réception → uniquement les Réceptionnistes\
-   Salle des serveurs → uniquement les Techniciens IT\
-   Salle de sécurité → uniquement les Agents de sécurité\
-   Manager → accès partout\
-   Nettoyage → accès partout sauf Salle d'archives\
-   Autres rôles → accès libre sauf zones restreintes

### 🧩 Fonctionnalités dynamiques

-   Bouton "X" pour retirer un employé et le renvoyer dans "Unassigned".
-   Fiche détaillée d'un employé (photo, rôle, email, expériences,
    localisation).
-   Bouton "+" dans chaque zone pour ajouter un employé éligible.
-   Zones obligatoires → rouge pâle si vides.
-   Limitation du nombre d'employés par zone.
-   Interface responsive avec animations CSS.
-   Validation HTML/CSS via W3C.
-   Déploiement sur GitHub Pages ou Vercel
``` bash
    <[url-du-deploiement](https://n1o2h.github.io/Workspace-Staff-Manager/)>
```

###  Côté Scrum Master

-   Organisation via Trello, Jira ou GitHub Projects 
``` bash
<[url-du-trello](https://github.com/n1o2h/Workspace-Staff-Manager.git)>.

```
-   Gestion des branches Git (optionnel).
-   Présentation finale du projet.

------------------------------------------------------------------------

##  Tailles d'écrans gérées

### Portrait

-   1280px : Grand ordinateur

-   1024px -- 1279px : Petit ordinateur\

-   768px -- 1023px : Tablette\

-   \< 767px : Mobile

### Paysage

-   768px -- 1023px : Mobile paysage\
-   1024px -- 1279px : Tablette paysage

------------------------------------------------------------------------

##  Bonus (Optionnels)

-   Glisser-déposer des employés entre zones.
-   Bouton Edit pour modifier un employé.
-   Recherche et filtrage par nom ou rôle.
-   Sauvegarde automatique dans le localStorage.
-   Mode "Réorganisation automatique" intelligent.
-   Photo par défaut si aucune image fournie.

------------------------------------------------------------------------

##  Technologies utilisées

-   **HTML5**, **CSS3**, **JavaScript**
-   **BootstrapCSS**
-   **Json**
-   **LocalStorage**
-   **Git/GitHub**

------------------------------------------------------------------------

##  Installation

1.  Cloner le repo :

    ``` bash
    git clone <[url-du-repo](https://github.com/n1o2h/Workspace-Staff-Manager.git)>
    ```

2.  Ouvrir le projet dans VS Code.

3.  Lancer un Live Server.

------------------------------------------------------------------------
