# Étape 1 : Utilisation d'une image légère Node.js
FROM node:20-alpine

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./

# Installation des dépendances (y compris les devDependencies)
RUN npm install

# Copie du reste de l'application
COPY . .

# Exposition du port
EXPOSE 3333

# Commande de démarrage en mode développement avec Nodemon
CMD ["npm", "run", "dev"]
