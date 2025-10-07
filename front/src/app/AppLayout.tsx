import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

const navLinkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10';
const navLinkActive = 'bg-primary text-primary-foreground';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold tracking-tight text-primary">JJ Events Platform</div>
          <nav className="flex gap-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ''}`.trim()}
            >
              Tableau de bord
            </NavLink>
            <NavLink
              to="/questionnaire"
              className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ''}`.trim()}
            >
              Nouveau questionnaire
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
