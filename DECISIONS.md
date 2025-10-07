# Journal des décisions

| Date | Décision | Justification |
| --- | --- | --- |
| 2024-05-09 | Adoption d'un monorepo npm workspaces (`front`, `server`, `shared`, `tests`). | Simplifie le partage de types, l'orchestration des scripts et la mise en place de la CI/CD. |
| 2024-05-09 | Stack front : React + Vite + Tailwind + shadcn/ui + TanStack Query + Zustand. | Répond aux besoins d'UX riche (wizard dynamique, dashboard) et fournit un design system moderne. |
| 2024-05-09 | Stack back : Express 5 + Prisma + Zod + PostgreSQL. | Permet une API typée, extensible et compatible avec les besoins (auth, notifications, budgets, stocks). |
| 2024-05-09 | Validation partagée via `shared/` (types + schémas Zod). | Évite la duplication de logique et garantit la cohérence entre front et back. |
| 2024-05-09 | Tests : Vitest (unit), Supertest (intégration), Playwright (E2E). | Couvre l'ensemble du parcours métier et alimente la CI GitHub Actions. |
