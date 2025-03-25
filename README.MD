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
docker ps
docker exec -it id_du_container_backend sh
node ace migration:run
```

## Production
voici l'URL du site : http://92.112.192.183:4718

## Fonctionnement des pipelines
Chaque push sur github déclanche une pipeline comprenant 3 jobs :
1. test de lint et prettier
2. les tests (unitaire dans le backend)
3. le déploiement
    1. connection au server distant
    2. pull du repo
    3. rebuild des containers

En cas de problème se reférer au fichier .github\workflows\worklows.yml

---

## Difficultés rencontrées
- Première expérience avec **GitHub Actions**, **Dockerfile** et **docker-compose.yml**.
- Découverte du framework **AdonisJS** et **NEXT.JS**.
- Gestion des problèmes de **CORS**.
- Difficultés avec la base de données **SQLite 3**, qui est la BDD par défaut d'AdonisJS. Je suis donc passé sur **PostgreSQL**.
- Première mise en production d'un projet.
- Difficulté à faire tourner docker sur mon PC.

---

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
### Commande pour builder le projet
```sh
node ace build
```

---

## Auteurs
Développé par FAGOT Thomas.

---

## Contact
Pour toute question, n'hésitez pas à ouvrir une issue sur GitHub ou à me contacter directement.

Bon développement ! 🚀

