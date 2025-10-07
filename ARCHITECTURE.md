# Architecture applicative

Cette refonte adopte une approche monorepo et un découpage modulaire permettant de couvrir l'ensemble des fonctionnalités décrites dans les documents « Description globale des étapes du questionnaire » et « Tableau de bord JJ ».

## Vue d'ensemble

```mermaid
flowchart LR
  subgraph Front [Front – React/TypeScript]
    UI[Interfaces Questionnaire & Dashboard]
    State[State management (TanStack Query + Zustand)]
    UI --> State
  end
  subgraph Shared [Shared]
    Types[Types & schémas]
    Utils[Utils communs]
  end
  subgraph Server [Server – Node.js/Express]
    API[API REST + Webhooks]
    Prisma[(Prisma ORM)]
    Services[Domain services]
  end
  subgraph Data[PostgreSQL]
    DB[(jj_events)]
  end
  subgraph Tests [Tests]
    Unit[Vitest]
    E2E[Playwright]
    Contract[Supertest + OpenAPI]
  end

  UI -->|OpenAPI| API
  API --> Prisma --> DB
  UI -->|Types| Types
  API -->|Types| Types
  Tests --> UI
  Tests --> API
```

## Découpage par dossier

### `front/`

- **Stack** : Vite + React 18 + TypeScript, Tailwind CSS, shadcn/ui, React Router, TanStack Query, Zustand.
- **Organisation** :
  - `src/app` : routage, providers globaux (auth, query client, i18n).
  - `src/features/questionnaire` : wizard multi-étapes, validations, persistance locale.
  - `src/features/dashboard` : pages Agenda, Budget, Gantt, Stock, Prestataires, etc.
  - `src/components/ui` : librairie de composants sur shadcn/ui.
  - `src/lib` : helpers (API client, auth, i18n, form adapters).
- **I18n** : configuration i18next (FR/EN) + dictionnaires modulaires.
- **Tests** : Vitest + Testing Library + Playwright (orchestrés depuis `tests/`).

### `server/`

- **Stack** : Node.js 18, Express 5, Prisma, Zod, JWT, Nodemailer, BullMQ pour les tâches asynchrones.
- **Organisation** :
  - `src/app.ts` : instanciation Express, middleware (CORS, rate limiting, auth).
  - `src/config` : gestion de l'environnement, secrets, logger (Pino).
  - `src/modules/*` : séparation par domaine (events, questionnaire, staff, assets, budgets, auth, notifications).
  - `src/modules/**/dto.ts` : schémas Zod alignés sur ceux du dossier `shared/`.
  - `src/routes` : routing RESTful + documentation OpenAPI générée.
  - `src/jobs` : file BullMQ pour notifications/délais.
- **Prisma** : schéma modélisant événements, activités, ressources humaines, prestataires, budgets, stocks.
- **Sécurité** : JWT, RBAC (Admin, User, Provider), rate limiting (express-rate-limit), validation d'entrée systématique, audit Trail.

### `shared/`

- **Contenu** : types TypeScript, schémas Zod, constantes (listes de thèmes, disclaimers, catégories). Utilisé par le front et le back pour éviter les divergences.
- **Distribution** : workspace indépendant compilé en ESM/CJS via `tsup`.

### `tests/`

- **Unit tests** : Vitest pour les modules partagés et services front/back.
- **Integration tests** : Supertest ciblant l'API Express, base test Prisma.
- **End-to-end** : Playwright orchestrant le parcours Questionnaire + Dashboard.
- **CI** : GitHub Actions déclenchant lint, tests unitaires/intégration, analyse de sécurité (`npm audit`), build front/back.

## API & documentation

- Schémas OpenAPI générés automatiquement (zod-to-openapi) et publiés sur `/docs`.
- Convention RESTful :
  - `POST /api/events` pour créer un événement à partir du questionnaire.
  - `GET /api/events/:id` pour récupérer les données complètes.
  - Routes spécifiques pour le personnel, le matériel, les budgets, les prestataires, les notifications.
- Webhooks : support pour intégration météo et alertes externes.

## Données & persistance

- PostgreSQL hébergé (supabase/fly.io).
- Prisma migrations versionnées dans `server/prisma/migrations`.
- Sauvegarde automatique du questionnaire via une table `drafts` (JSONB + expiration).
- Caching applicatif via Redis (BullMQ + session store) – à provisionner.

## Sécurité & conformité

- Authentification JWT + refresh tokens, hashage bcrypt, rotation planifiée.
- RBAC basé sur les rôles (Admin, Utilisateur, Prestataire) + permissions spécifiques.
- Rate limiting, Helmet, CORS stricte.
- Journalisation des actions sensibles (modification budget, suppression prestataire).

## UX & design system

- Palette Tailwind personnalisée, composants shadcn/ui (Stepper, Tabs, DataTable).
- Wizard questionnaire avec sauvegarde auto (localStorage + API), validation par étape, disclaimers conditionnels.
- Dashboard responsive (desktop, tablette, mobile) avec support dark mode.

## Roadmap incrémentale

1. Mettre en place la base technique (dossiers, configs, CI, i18n).
2. Implémenter le questionnaire (wizard complet + persistance brouillon).
3. Développer les vues Dashboard (agenda, budget, Gantt, stock, prestataires, anticipation).
4. Connecter les exports (PDF/Excel) et notifications.
5. Finaliser la couverture de tests ≥ 80 % et préparer le déploiement.
