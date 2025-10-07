import { useEffect, useMemo, useState } from 'react';
import { EventDraft } from 'jj-events-shared';

import { steps } from '../features/questionnaire/steps';
import { WizardDisclaimer, WizardStepId } from '../features/questionnaire/types';
import { WizardStepper } from '../features/questionnaire/components/WizardStepper';
import { WizardDisclaimers } from '../features/questionnaire/components/WizardDisclaimers';

const STORAGE_KEY = 'jj-events-platform:draft';

const today = new Date().toISOString().slice(0, 10);
const defaultDraft: EventDraft = {
  title: 'Nouvel événement',
  startDate: today,
  endDate: today,
  startTime: '18:00',
  endTime: '23:00',
  location: { label: '', latitude: null, longitude: null },
  objective: { description: '', category: 'Festif', profitable: false },
  theme: { keywords: [], categories: [] },
  audience: [],
  expectedAttendance: 0,
  venue: {
    type: 'Intérieur',
    indoor: {},
    outdoor: {},
    parking: {}
  },
  transports: [],
  infrastructures: {
    electricity: { available: false },
    water: { available: false },
    waste: { available: false },
    toilets: { available: false }
  },
  partners: [],
  riskAnalysis: {
    attendeeCount: 0,
    securityFileUploaded: false,
    evacuationPlanReady: false
  },
  activities: [],
  logistics: [],
  staff: [],
  marketingPlan: []
};

const loadInitialDraft = (): EventDraft => {
  if (typeof window === 'undefined') return defaultDraft;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultDraft;
  try {
    const parsed = JSON.parse(raw) as EventDraft;
    return { ...defaultDraft, ...parsed };
  } catch (error) {
    console.warn('Impossible de charger le brouillon local, réinitialisation.', error);
    return defaultDraft;
  }
};

export function QuestionnaireWizard() {
  const [draft, setDraft] = useState<EventDraft>(() => loadInitialDraft());
  const [currentStep, setCurrentStep] = useState<WizardStepId>('general-information');
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  const disclaimers = useMemo<WizardDisclaimer[]>(() => {
    const items: WizardDisclaimer[] = [];

    if (draft.expectedAttendance >= 1500 && draft.expectedAttendance < 5000) {
      items.push({
        id: 'attendance-1500',
        severity: 'warning',
        message:
          'Au-delà de 1 500 participants, un dispositif de sécurité renforcé et une coordination avec les autorités locales sont recommandés.'
      });
    }

    if (draft.expectedAttendance >= 5000) {
      items.push({
        id: 'attendance-5000',
        severity: 'danger',
        message:
          'Dossier sécurité obligatoire pour les événements de plus de 5 000 personnes. Veillez à téléverser l’ensemble des documents réglementaires.'
      });
      if (!draft.riskAnalysis.securityFileUploaded) {
        items.push({
          id: 'missing-security-file',
          severity: 'danger',
          message: 'Veuillez confirmer l’upload du dossier sécurité avant de valider le questionnaire.'
        });
      }
    }

    if (!draft.infrastructures.electricity.available) {
      items.push({
        id: 'electricity-disclaimer',
        severity: 'info',
        message:
          'Aucune alimentation électrique n’est renseignée. Pensez à prévoir des groupes électrogènes ou à vérifier la présence de prises.'
      });
    }

    if (!draft.marketingPlan.length) {
      items.push({
        id: 'marketing-plan',
        severity: 'info',
        message: 'Ajoutez au moins une action marketing pour assurer la promotion de votre événement.'
      });
    }

    return items;
  }, [draft]);

  const goToStep = (stepId: WizardStepId) => {
    setCurrentStep(stepId);
  };

  const goNext = () => {
    setCurrentStep((prev) => {
      const index = steps.findIndex((step) => step.id === prev);
      return index === steps.length - 1 ? prev : steps[index + 1].id;
    });
  };

  const goPrevious = () => {
    setCurrentStep((prev) => {
      const index = steps.findIndex((step) => step.id === prev);
      return index <= 0 ? prev : steps[index - 1].id;
    });
  };

  const handleChange = (updater: (draft: EventDraft) => EventDraft) => {
    setDraft((current) => updater({ ...current }));
  };

  const step = steps[currentIndex];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Questionnaire événement</h1>
        <p className="max-w-3xl text-sm text-slate-400">
          Ce wizard multi-étapes couvre l&apos;ensemble des informations demandées dans le cahier des charges : dates, lieux,
          prestataires, risques, logistique, budget et marketing. Les données sont sauvegardées automatiquement pour éviter toute
          perte de progression.
        </p>
      </div>
      <WizardStepper steps={steps} current={currentStep} onSelect={goToStep} />
      <WizardDisclaimers disclaimers={disclaimers} />
      <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
        <header className="space-y-1">
          <h2 className="text-xl font-semibold text-primary">{step.title}</h2>
          <p className="text-sm text-slate-400">{step.description}</p>
        </header>
        <div className="mt-6">
          {step.render({
            value: draft,
            onChange: handleChange,
            onNext: goNext,
            onPrevious: goPrevious,
            isFirst: currentIndex === 0,
            isLast: currentIndex === steps.length - 1
          })}
        </div>
      </section>
    </div>
  );
}
