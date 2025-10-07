import { z } from 'zod';

import {
  AUDIENCE_TYPES,
  EVENT_OBJECTIVES,
  EVENT_THEMES,
  MARKETING_CHANNELS,
  TRANSPORT_OPTIONS,
  VENUE_TYPES
} from './constants/options';

export const EventObjectiveEnum = z.enum(EVENT_OBJECTIVES);
export const EventThemeEnum = z.enum(EVENT_THEMES);
export const AudienceTypeEnum = z.enum(AUDIENCE_TYPES);
export const VenueTypeEnum = z.enum(VENUE_TYPES);
export const TransportOptionEnum = z.enum(TRANSPORT_OPTIONS);
export const MarketingChannelEnum = z.enum(MARKETING_CHANNELS);

export const VenueDetailsSchema = z.object({
  type: VenueTypeEnum,
  indoor: z
    .object({
      area: z.number().min(0).nullable(),
      shape: z.string().nullable(),
      heating: z.boolean().default(false),
      erpCompliant: z.boolean().default(false),
      smokingArea: z.boolean().default(false),
      cateringArea: z.boolean().default(false)
    })
    .partial(),
  outdoor: z
    .object({
      area: z.number().min(0).nullable(),
      groundType: z.string().nullable(),
      shelter: z.boolean().default(false),
      vegetation: z.boolean().default(false)
    })
    .partial(),
  parking: z
    .object({
      area: z.number().min(0).nullable(),
      groundType: z.string().nullable(),
      distanceMeters: z.number().min(0).nullable(),
      shuttle: z.boolean().default(false),
      staff: z.number().min(0).nullable()
    })
    .partial()
});

export const InfrastructureSchema = z.object({
  electricity: z.object({ available: z.boolean(), notes: z.string().optional() }),
  water: z.object({ available: z.boolean(), notes: z.string().optional() }),
  waste: z.object({ available: z.boolean(), notes: z.string().optional() }),
  toilets: z.object({ available: z.boolean(), notes: z.string().optional() })
});

export const RiskAnalysisSchema = z.object({
  attendeeCount: z.number().min(0),
  securityFileUploaded: z.boolean().default(false),
  evacuationPlanReady: z.boolean().default(false)
});

export const BudgetItemSchema = z.object({
  label: z.string(),
  category: z.enum(['Logistique', 'Masse salariale', 'Prestataires', 'Marketing', 'Autre']),
  planned: z.number().min(0),
  actual: z.number().min(0).nullable()
});

export const StaffNeedSchema = z.object({
  role: z.string(),
  hourlyCost: z.number().min(0),
  quantity: z.number().min(0),
  hours: z.number().min(0)
});

export const MarketingPlanSchema = z.object({
  channel: MarketingChannelEnum,
  deadline: z.string(),
  notes: z.string().optional()
});

export const EventDraftSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.object({
    label: z.string(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable()
  }),
  objective: z.object({
    description: z.string(),
    category: EventObjectiveEnum,
    profitable: z.boolean()
  }),
  theme: z.object({
    keywords: z.array(z.string()),
    categories: z.array(EventThemeEnum)
  }),
  audience: z.array(AudienceTypeEnum),
  expectedAttendance: z.number().min(0),
  venue: VenueDetailsSchema,
  transports: z.array(TransportOptionEnum),
  infrastructures: InfrastructureSchema,
  partners: z.array(
    z.object({ name: z.string(), role: z.string(), cost: z.number().min(0), type: z.enum(['Prestataire', 'Partenaire']) })
  ),
  riskAnalysis: RiskAnalysisSchema,
  activities: z.array(
    z.object({
      name: z.string(),
      start: z.string(),
      end: z.string(),
      location: z.string().optional()
    })
  ),
  logistics: z.array(z.object({ label: z.string(), quantity: z.number().min(0), availableOnSite: z.boolean() })),
  staff: z.array(StaffNeedSchema),
  marketingPlan: z.array(MarketingPlanSchema)
});

export type EventDraft = z.infer<typeof EventDraftSchema>;
export type VenueDetails = z.infer<typeof VenueDetailsSchema>;
export type Infrastructure = z.infer<typeof InfrastructureSchema>;
export type RiskAnalysis = z.infer<typeof RiskAnalysisSchema>;
export type BudgetItem = z.infer<typeof BudgetItemSchema>;
export type StaffNeed = z.infer<typeof StaffNeedSchema>;
export type MarketingPlanItem = z.infer<typeof MarketingPlanSchema>;

export * from './constants/options';
