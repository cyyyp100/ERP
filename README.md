# JJ Events Platform

Modernisation complète du projet questionnaire / dashboard décrite dans les documents métier fournis. Cette nouvelle base pose les fondations d'une application modulaire et typée bâtie sur React, Node.js, Prisma et une architecture monorepo.

## Structure du dépôt

```
front/   → Interface React + Tailwind + shadcn/ui (wizard + dashboard)
server/  → API Node.js/Express sécurisée avec Prisma (PostgreSQL)
shared/  → Modèles TypeScript et schémas de validation communs
tests/   → Jeux de tests unitaires, d'intégration et end-to-end
```

Des fichiers de documentation complètent la solution :

- `ARCHITECTURE.md` détaille les différents modules, la stack et les patterns.
- `DECISIONS.md` journalise les arbitrages techniques pris lors de la refonte.

## Mise en place de l'environnement local

### Prérequis

- Node.js **18.17.0** ou supérieur (Vite 5 et l'API Express utilisent les fonctionnalités Node récentes).
- npm 9+ (la configuration du monorepo repose sur les workspaces npm).
- Une base de données PostgreSQL accessible localement pour Prisma.

### Installation des dépendances

```bash
npm install
```

Cette commande installe les dépendances de l'ensemble des workspaces (`front`, `server`, `shared`, `tests`) et crée les liens symboliques internes (`jj-events-shared`).

### Configuration des variables d'environnement serveur

```bash
cp server/.env.example server/.env
# puis adapter DATABASE_URL, JWT_SECRET et PORT si nécessaire
```

Ensuite initialiser Prisma (nécessite une base PostgreSQL accessible) :

```bash
npm run prisma:generate --workspace server
```

### Lancement en développement

Construire au préalable les types partagés (utile pour les IDE et l'API) :

```bash
npm run build --workspace shared
```

Lancer les deux services dans deux terminaux distincts :

```bash
# Frontend Vite
npm run dev --workspace front

# API Express
npm run dev --workspace server
```

Le front est disponible sur `http://localhost:5173` et l'API REST sur `http://localhost:4000` (modifiez `PORT` dans `.env` si besoin).

Chaque workspace expose également des scripts utilitaires :

- `npm run build --workspaces` : build de production (front, server, shared, tests).
- `npm run lint --workspaces` : vérification statique (TypeScript côté front, ESLint côté API/partagé/tests).
- `npm run test --workspaces` : exécution des suites de tests (Vitest / Playwright).
- `npm run format --workspaces` : formatage automatique (Prettier).

### Mise à jour des dépendances

1. Vérifier les versions installées et celles disponibles :

   ```bash
   npm outdated --workspaces
   ```

2. Mettre à jour automatiquement les versions mineures/patch :

   ```bash
   npm update --workspaces
   ```

3. Pour une montée de version majeure ciblée (ex. front) :

   ```bash
   npm install <package>@latest --workspace front
   ```

4. Regénérer ensuite les artefacts nécessaires :

   ```bash
   npm run build --workspace shared
   npm run prisma:generate --workspace server
   ```

5. Relancer les serveurs de développement.

## Documents fonctionnels

Les PDF fournis à la racine du dépôt restent la référence pour les parcours métier. Ils sont pris en compte dans la modélisation initiale (types partagés, étapes du wizard, pages du dashboard) et seront implémentés progressivement.

## Prochaines étapes

- Connecter la base PostgreSQL via Prisma et générer le client.
- Implémenter l'ensemble des écrans décrits dans les documents.
- Ajouter la CI GitHub Actions (lint + tests + audit).
- Déployer le front sur Vercel et l'API sur Fly.io.
