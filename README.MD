Les commandes que j'ai lancé pour créer mon projet : 
1. `npm init adonisjs@latest`
2. `cd eco-task-backend`
3. `node ace serve --hmr`

j'ai ajouté esLint et prettier :
- `npm run lint -- --fix`
- `npm run format`

Pour créer mon model et mon ficheir de migration pour Tasks : 
1. Créer les fichiers de model et de migration : `node ace make:model Task --migration`
2. Modifier le fichier de migration
3. Faire la migration : `node ace migration:run`
4. Modifier le modèle
5. Créer le controller : `node ace make:controller TasksController`




Pour la prod :
node ace build
