import { describe, it, expect } from 'vitest';

import { EventDraftSchema } from 'jj-events-shared';

describe('shared schema', () => {
  it('valide un brouillon minimal', () => {
    const draft = EventDraftSchema.parse({
      title: 'Événement test',
      startDate: '2024-05-01',
      endDate: '2024-05-01',
      startTime: '18:00',
      endTime: '23:00',
      location: { label: 'Bordeaux', latitude: 44.8378, longitude: -0.5792 },
      objective: { description: 'Soirée test', category: 'Festif', profitable: true },
      theme: { keywords: ['test'], categories: ['Festival'] },
      audience: ['Adultes'],
      expectedAttendance: 1000,
      venue: { type: 'Intérieur', indoor: {}, outdoor: {}, parking: {} },
      transports: ['Tram'],
      infrastructures: {
        electricity: { available: true },
        water: { available: true },
        waste: { available: true },
        toilets: { available: true }
      },
      partners: [],
      riskAnalysis: { attendeeCount: 1000, securityFileUploaded: false, evacuationPlanReady: true },
      activities: [],
      logistics: [],
      staff: [],
      marketingPlan: []
    });

    expect(draft.title).toBe('Événement test');
  });
});
