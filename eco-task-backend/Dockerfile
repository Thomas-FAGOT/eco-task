# Étape 1 : Build de l'application
FROM node:20-alpine AS builder

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm ci

# Copie du reste de l'application
COPY . .

# Compilation du TypeScript
RUN npm run build

# Étape 2 : Image finale plus légère
FROM node:20-alpine

# Définition du répertoire de travail
WORKDIR /app

# Copie uniquement les fichiers nécessaires
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Installation des dépendances en mode production uniquement
RUN npm ci --only=production

# Définition des variables d'environnement
ENV HOST=0.0.0.0
ENV PORT=3333
ENV NODE_ENV=production

# Exposition du port
EXPOSE 3333

# Commande de démarrage
CMD ["node", "ace", "serve"]
