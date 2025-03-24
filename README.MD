# EcoTask

## Description
**EcoTask** est une plateforme web de gestion de tâches dédiée aux petites entreprises cherchant à réduire leur empreinte écologique. L'objectif est d'aider les équipes à collaborer tout en suivant l'impact environnemental de leurs projets grâce à des fonctionnalités spécifiques, comme le calcul du bilan carbone des tâches.

## Fonctionnalités principales
- **Gestion des tâches** : CRUD des tâches avec détails (titre, description, responsable, échéance, priorité, bilan carbone calculé automatiquement).
- **Statistiques écologiques** : Tableau de bord affichant le total des émissions de CO₂ par projet et un graphique d'évolution.
- **Collaboration d’équipe** : Gestion des utilisateurs, avec visibilité des tâches par projet.

---

## Installation et mise en route

### Création du projet
```sh
git clone https://github.com/Thomas-FAGOT/eco-task.git
docker compose up
```

## Gestion des erreurs liées à `better-sqlite3`
Il m'est arrivé plusieurs fois d'avoir des erreurs avec `better-sqlite3`.
Dans ce cas pas de pannique, il suffit d'executer les commandes suivantes :
```sh
docker ps  # Récupérer l'ID du container du backend
docker exec -it <id_du_backend> sh
npm rebuild better-sqlite3
```

## Fonctionnement des pipelines
Chaque push sur github déclanche une pipeline comprenant les test de lint, les tests et le build de l'application.
En cas de problème se reférer au fichier .github\workflows\worklows.yml

## Commandes utiles
#### Création des fichiers de modèle et de migration
```sh
node ace make:model Task --migration
```
#### Modification et exécution des migrations
- Modifier le fichier de migration généré selon les besoins.
- Exécuter la migration :
```sh
node ace migration:run
```
#### Modification du modèle et création du contrôleur
- Modifier le modèle `Task`
- Générer le contrôleur :
```sh
node ace make:controller TasksController
```

---

## Difficultés rencontrées
- Première expérience avec **GitHub Actions**, **Dockerfile** et **docker-compose.yml**.
- Découverte du framework **AdonisJS**.
- Gestion des problèmes de **CORS**.
- Difficultés avec la base de données **SQLite 3**, qui est la BDD par défaut d'AdonisJS.
- Première mise en production d'un projet.
- Problème inexpliqué : **mon frontend ne veut pas s'ajouter à Git !** 🤔

---

## Commande pour builder le projet
```sh
node ace build
```

---

## Licence
Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus d’informations.

---

## Auteurs
Développé par [Ton Nom ou Ton Pseudo].

---

## Contribution
Les contributions sont les bienvenues ! Merci de suivre les bonnes pratiques de développement et d’ouvrir une issue avant de proposer une pull request.

---

## Contact
Pour toute question, n'hésitez pas à ouvrir une issue sur GitHub ou à me contacter directement.

Bon développement ! 🚀

