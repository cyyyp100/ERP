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

## Prérequis

- Node.js >= 18.17 (npm >= 9)
- PostgreSQL 14+

## Installation & mise à jour des dépendances

1. Installez (ou mettez à jour) toutes les dépendances depuis la racine du dépôt :

   ```bash
   npm install
   ```

   Cette commande déclenche automatiquement la compilation du package `shared` et la génération du client Prisma via le hook `postinstall`.

2. Pour contrôler les versions et planifier des mises à jour futures :

   ```bash
   npm outdated --workspaces
   ```

   Puis modifiez les `package.json` concernés et relancez `npm install`.

3. Validez que tout compile après une mise à jour :

   ```bash
   npm run lint --workspaces
   npm run test --workspaces
   npm run build --workspaces
   ```

## Configuration de l'environnement

1. Copiez l'exemple de variables d'environnement pour l'API :

   ```bash
   cp server/.env.example server/.env
   ```

2. Ajustez `DATABASE_URL` avec vos identifiants PostgreSQL et `JWT_SECRET` avec une clé forte.

3. Initialisez la base (création + migrations) :

   ```bash
   npm run prisma:migrate --workspace server -- --name init
   ```

   Vous pouvez répéter cette commande à chaque évolution du schéma Prisma.

## Lancement en local

1. Assurez-vous que PostgreSQL est démarré et accessible selon l'URL définie dans `.env` (ex. via Docker : `docker run --name jj-events-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres:15`).
2. Dans un premier terminal, démarrez l'API :

   ```bash
   npm run dev:server
   ```

3. Dans un second terminal, lancez l'interface React :

   ```bash
   npm run dev:front
   ```

4. (Optionnel) Si vous modifiez souvent les schémas partagés, lancez la compilation incrémentale :

   ```bash
   npm run dev:shared
   ```

L'application front est accessible sur [http://localhost:5173](http://localhost:5173) et l'API répond sur [http://localhost:4000](http://localhost:4000).

Chaque workspace dispose également de scripts additionnels (`build`, `lint`, `test`, `format`).

## Documents fonctionnels

Les PDF fournis à la racine du dépôt restent la référence pour les parcours métier. Ils sont pris en compte dans la modélisation initiale (types partagés, étapes du wizard, pages du dashboard) et seront implémentés progressivement.

## Prochaines étapes

- Connecter la base PostgreSQL via Prisma et générer le client.
- Implémenter l'ensemble des écrans décrits dans les documents.
- Ajouter la CI GitHub Actions (lint + tests + audit).
- Déployer le front sur Vercel et l'API sur Fly.io.
