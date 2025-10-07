import { WizardStep, WizardStepId } from '../types';

interface WizardStepperProps {
  steps: WizardStep[];
  current: WizardStepId;
  onSelect: (id: WizardStepId) => void;
}

export function WizardStepper({ steps, current, onSelect }: WizardStepperProps) {
  return (
    <ol className="flex flex-wrap gap-3">
      {steps.map((step, index) => {
        const isActive = step.id === current;
        return (
          <li key={step.id}>
            <button
              onClick={() => onSelect(step.id)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition ${
                isActive
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-slate-700 text-slate-400 hover:border-primary/60 hover:text-primary'
              }`}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current text-[10px]">
                {index + 1}
              </span>
              {step.title}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
