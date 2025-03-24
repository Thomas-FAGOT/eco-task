# Étape 1 : Utilisation d'une image légère Node.js
FROM node:20-bullseye

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./

# Installation propre des dépendances (sans utiliser celles de l'hôte)
RUN npm ci --omit=dev

# Copie du reste de l'application
COPY . .

# Exposition du port
EXPOSE 3333

# Commande de démarrage en mode développement avec Nodemon
CMD ["npm", "run", "dev"]
