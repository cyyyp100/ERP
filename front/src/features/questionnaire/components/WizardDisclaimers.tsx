import { WizardDisclaimer } from '../types';

const severityStyles: Record<WizardDisclaimer['severity'], string> = {
  info: 'border-sky-500/60 bg-sky-500/10 text-sky-200',
  warning: 'border-amber-500/60 bg-amber-500/10 text-amber-100',
  danger: 'border-rose-500/60 bg-rose-500/10 text-rose-100'
};

export function WizardDisclaimers({ disclaimers }: { disclaimers: WizardDisclaimer[] }) {
  if (!disclaimers.length) return null;

  return (
    <div className="space-y-3">
      {disclaimers.map((disclaimer) => (
        <div key={disclaimer.id} className={`rounded-md border px-4 py-3 text-sm ${severityStyles[disclaimer.severity]}`}>
          {disclaimer.message}
        </div>
      ))}
    </div>
  );
}
