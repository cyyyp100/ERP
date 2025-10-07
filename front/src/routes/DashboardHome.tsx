import { Link } from 'react-router-dom';

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Tableau de bord</h1>
        <p className="text-slate-400">
          Vue synthétique des événements, du personnel, du matériel et du budget. Les modules détaillés seront implémentés au fur
          et à mesure.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-primary">Questionnaire</h2>
          <p className="mt-2 text-sm text-slate-400">
            Démarrer un nouvel événement et compléter le wizard multi-étapes avec sauvegarde automatique et validations.
          </p>
          <Link to="/questionnaire" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
            Ouvrir le questionnaire →
          </Link>
        </article>
        <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-primary">Roadmap</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-400">
            <li>Agenda global avec échéances et météo.</li>
            <li>Suivi budgétaire et alertes de dépassement.</li>
            <li>Gantt jour J et semaine précédente.</li>
            <li>Gestion des prestataires, stocks et notifications.</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
