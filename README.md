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

## Premiers pas

1. **Installer les dépendances** :

   ```bash
   npm install
   ```

2. **Lancer le front** :

   ```bash
   npm run dev
   ```

3. **Lancer l'API** :

   ```bash
   npm run dev --workspace server
   ```

Chaque workspace dispose de scripts additionnels (`build`, `lint`, `test`, `format`).

## Documents fonctionnels

Les PDF fournis à la racine du dépôt restent la référence pour les parcours métier. Ils sont pris en compte dans la modélisation initiale (types partagés, étapes du wizard, pages du dashboard) et seront implémentés progressivement.

## Prochaines étapes

- Connecter la base PostgreSQL via Prisma et générer le client.
- Implémenter l'ensemble des écrans décrits dans les documents.
- Ajouter la CI GitHub Actions (lint + tests + audit).
- Déployer le front sur Vercel et l'API sur Fly.io.
