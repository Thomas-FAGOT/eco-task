# Étape 1 : Utilisation d'une image Node.js légère
FROM node:20-alpine

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./

# Installation des dépendances (inclut devDependencies)
RUN npm install

# Copie du reste de l'application
COPY . .

# Exposition du port (Next.js tourne sur 3000 par défaut)
EXPOSE 3000

# Commande de démarrage en mode développement
CMD ["npm", "run", "dev"]
