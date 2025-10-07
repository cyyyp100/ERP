import { ReactNode } from 'react';
import { z } from 'zod';
import { EventDraftSchema, EventDraft } from 'jj-events-shared';

export type WizardStepId =
  | 'general-information'
  | 'audience'
  | 'venue'
  | 'logistics'
  | 'risk'
  | 'staff'
  | 'marketing'
  | 'summary';

export interface WizardStep {
  id: WizardStepId;
  title: string;
  description: string;
  render: (args: WizardStepRenderProps) => ReactNode;
}

export interface WizardStepRenderProps {
  value: EventDraft;
  onChange: (updater: (draft: EventDraft) => EventDraft) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const EventDraftValidator = EventDraftSchema.superRefine((value, ctx) => {
  if (value.startDate > value.endDate) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'La date de fin doit être postérieure à la date de début.' });
  }
});

export type WizardDisclaimer = {
  id: string;
  severity: 'info' | 'warning' | 'danger';
  message: string;
};
