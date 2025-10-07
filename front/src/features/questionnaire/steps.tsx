import { ChangeEvent } from 'react';
import {
  AUDIENCE_TYPES,
  EVENT_OBJECTIVES,
  EVENT_THEMES,
  MARKETING_CHANNELS,
  TRANSPORT_OPTIONS,
  VENUE_TYPES,
  EventDraft
} from 'jj-events-shared';

import { WizardStep } from './types';

const numberInput = (value: number | null | undefined) => (value ?? '').toString();

const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
  const parsed = Number(event.target.value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const steps: WizardStep[] = [
  {
    id: 'general-information',
    title: 'Informations générales',
    description: 'Dates, objectifs et thématiques de votre événement.',
    render: ({ value, onChange, onNext }) => (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Titre de l&apos;événement</span>
            <input
              value={value.title}
              onChange={(e) => onChange((draft) => ({ ...draft, title: e.target.value }))}
              className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-slate-300">Date de début</span>
              <input
                type="date"
                value={value.startDate}
                onChange={(e) => onChange((draft) => ({ ...draft, startDate: e.target.value }))}
                className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-slate-300">Date de fin</span>
              <input
                type="date"
                value={value.endDate}
                onChange={(e) => onChange((draft) => ({ ...draft, endDate: e.target.value }))}
                className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-slate-300">Heure de début</span>
              <input
                type="time"
                value={value.startTime}
                onChange={(e) => onChange((draft) => ({ ...draft, startTime: e.target.value }))}
                className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-slate-300">Heure de fin</span>
              <input
                type="time"
                value={value.endTime}
                onChange={(e) => onChange((draft) => ({ ...draft, endTime: e.target.value }))}
                className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
              />
            </label>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Lieu</span>
            <input
              value={value.location.label}
              onChange={(e) =>
                onChange((draft) => ({
                  ...draft,
                  location: { ...draft.location, label: e.target.value }
                }))
              }
              placeholder="Recherchez avec Google Maps"
              className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Objectif principal</span>
            <select
              value={value.objective.category}
              onChange={(e) =>
                onChange((draft) => ({
                  ...draft,
                  objective: { ...draft.objective, category: e.target.value as EventDraft['objective']['category'] }
                }))
              }
              className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
            >
              {EVENT_OBJECTIVES.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Description</span>
            <textarea
              value={value.objective.description}
              onChange={(e) =>
                onChange((draft) => ({
                  ...draft,
                  objective: { ...draft.objective, description: e.target.value }
                }))
              }
              rows={3}
              className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
            />
          </label>
          <div className="flex items-center gap-3">
            <input
              id="profitable"
              type="checkbox"
              checked={value.objective.profitable}
              onChange={(e) =>
                onChange((draft) => ({
                  ...draft,
                  objective: { ...draft.objective, profitable: e.target.checked }
                }))
              }
              className="h-4 w-4 rounded border-slate-700 bg-slate-900"
            />
            <label htmlFor="profitable" className="text-sm text-slate-300">
              Événement lucratif
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-sm text-slate-300">Thèmes</span>
          <div className="flex flex-wrap gap-2">
            {EVENT_THEMES.map((theme) => {
              const checked = value.theme.categories.includes(theme);
              return (
                <label key={theme} className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      onChange((draft) => ({
                        ...draft,
                        theme: {
                          ...draft.theme,
                          categories: e.target.checked
                            ? [...draft.theme.categories, theme]
                            : draft.theme.categories.filter((item) => item !== theme)
                        }
                      }))
                    }
                  />
                  <span className="text-xs uppercase tracking-wide text-slate-300">{theme}</span>
                </label>
              );
            })}
          </div>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Mots-clés</span>
          <input
            value={value.theme.keywords.join(', ')}
            onChange={(e) =>
              onChange((draft) => ({
                ...draft,
                theme: {
                  ...draft.theme,
                  keywords: e.target.value
                    .split(',')
                    .map((keyword) => keyword.trim())
                    .filter(Boolean)
                }
              }))
            }
            placeholder="ex: networking, VIP, lancement"
            className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
          />
        </label>
        <div className="flex justify-end">
          <button onClick={onNext} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Continuer
          </button>
        </div>
      </div>
    )
  },
  {
    id: 'audience',
    title: 'Public et capacité',
    description: 'Profil des participants, taille prévue et transports.',
    render: ({ value, onChange, onNext, onPrevious }) => (
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-sm text-slate-300">Types de public</span>
          <div className="flex flex-wrap gap-2">
            {AUDIENCE_TYPES.map((audience) => {
              const checked = value.audience.includes(audience);
              return (
                <label key={audience} className="inline-flex items-center gap-2 rounded-md border border-slate-800 px-3 py-1">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      onChange((draft) => ({
                        ...draft,
                        audience: e.target.checked
                          ? [...draft.audience, audience]
                          : draft.audience.filter((item) => item !== audience)
                      }))
                    }
                  />
                  <span className="text-xs uppercase tracking-wide text-slate-300">{audience}</span>
                </label>
              );
            })}
          </div>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Nombre de participants prévu</span>
          <input
            type="number"
            min={0}
            value={numberInput(value.expectedAttendance)}
            onChange={(event) =>
              onChange((draft) => ({
                ...draft,
                expectedAttendance: handleNumberChange(event)
              }))
            }
            className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
          />
        </label>
        <div className="space-y-2">
          <span className="text-sm text-slate-300">Transports</span>
          <div className="flex flex-wrap gap-2">
            {TRANSPORT_OPTIONS.map((transport) => {
              const checked = value.transports.includes(transport);
              return (
                <label key={transport} className="inline-flex items-center gap-2 rounded-md border border-slate-800 px-3 py-1">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      onChange((draft) => ({
                        ...draft,
                        transports: e.target.checked
                          ? [...draft.transports, transport]
                          : draft.transports.filter((item) => item !== transport)
                      }))
                    }
                  />
                  <span className="text-xs uppercase tracking-wide text-slate-300">{transport}</span>
                </label>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={onPrevious} className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300">
            Retour
          </button>
          <button onClick={onNext} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Continuer
          </button>
        </div>
      </div>
    )
  },
  {
    id: 'venue',
    title: 'Lieu et infrastructures',
    description: 'Paramétrer les informations sur le lieu, le parking et les infrastructures.',
    render: ({ value, onChange, onNext, onPrevious }) => (
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-sm text-slate-300">Type de lieu</span>
          <div className="flex gap-2">
            {VENUE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => onChange((draft) => ({ ...draft, venue: { ...draft.venue, type } }))}
                className={`rounded-md border px-3 py-2 text-sm transition ${
                  value.venue.type === type ? 'border-primary text-primary' : 'border-slate-700 text-slate-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Superficie (m²)</span>
            <input
              type="number"
              min={0}
              value={numberInput(value.venue.indoor?.area ?? value.venue.outdoor?.area ?? null)}
              onChange={(event) =>
                onChange((draft) => ({
                  ...draft,
                  venue: {
                    ...draft.venue,
                    indoor: { ...draft.venue.indoor, area: handleNumberChange(event) },
                    outdoor: { ...draft.venue.outdoor, area: handleNumberChange(event) }
                  }
                }))
              }
              className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Type de sol</span>
            <input
              value={value.venue.outdoor?.groundType ?? ''}
              onChange={(e) =>
                onChange((draft) => ({
                  ...draft,
                  venue: { ...draft.venue, outdoor: { ...draft.venue.outdoor, groundType: e.target.value } }
                }))
              }
              className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Parking (distance en mètres)</span>
            <input
              type="number"
              min={0}
              value={numberInput(value.venue.parking?.distanceMeters ?? null)}
              onChange={(event) =>
                onChange((draft) => ({
                  ...draft,
                  venue: {
                    ...draft.venue,
                    parking: { ...draft.venue.parking, distanceMeters: handleNumberChange(event) }
                  }
                }))
              }
              className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
            />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {['electricity', 'water', 'waste', 'toilets'].map((key) => (
            <label key={key} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={(value.infrastructures as Record<string, { available: boolean }>)[key]?.available ?? false}
                onChange={(event) =>
                  onChange((draft) => ({
                    ...draft,
                    infrastructures: {
                      ...draft.infrastructures,
                      [key]: {
                        ...((draft.infrastructures as Record<string, { available: boolean }>)[key] ?? { available: false }),
                        available: event.target.checked
                      }
                    }
                  }))
                }
                className="h-4 w-4 rounded border-slate-700 bg-slate-900"
              />
              <span className="text-sm capitalize text-slate-300">{key}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-between">
          <button onClick={onPrevious} className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300">
            Retour
          </button>
          <button onClick={onNext} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Continuer
          </button>
        </div>
      </div>
    )
  },
  {
    id: 'logistics',
    title: 'Prestataires et logistique',
    description: 'Déclarez les partenaires, les ressources matérielles et les activités clés.',
    render: ({ value, onChange, onNext, onPrevious }) => (
      <div className="space-y-6">
        <div className="space-y-3">
          <header className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-200">Prestataires & partenaires</span>
            <button
              onClick={() =>
                onChange((draft) => ({
                  ...draft,
                  partners: [
                    ...draft.partners,
                    { name: 'Nouveau partenaire', role: 'À définir', cost: 0, type: 'Prestataire' }
                  ]
                }))
              }
              className="text-sm text-primary hover:underline"
            >
              + Ajouter
            </button>
          </header>
          <div className="space-y-2">
            {value.partners.map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="grid gap-2 rounded-md border border-slate-800 p-3 text-sm">
                <input
                  value={partner.name}
                  onChange={(event) =>
                    onChange((draft) => {
                      const partners = [...draft.partners];
                      partners[index] = { ...partners[index], name: event.target.value };
                      return { ...draft, partners };
                    })
                  }
                  className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1"
                />
                <input
                  value={partner.role}
                  onChange={(event) =>
                    onChange((draft) => {
                      const partners = [...draft.partners];
                      partners[index] = { ...partners[index], role: event.target.value };
                      return { ...draft, partners };
                    })
                  }
                  className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1"
                />
                <input
                  type="number"
                  min={0}
                  value={numberInput(partner.cost)}
                  onChange={(event) =>
                    onChange((draft) => {
                      const partners = [...draft.partners];
                      partners[index] = { ...partners[index], cost: handleNumberChange(event) };
                      return { ...draft, partners };
                    })
                  }
                  className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <header className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-200">Logistique & matériel</span>
            <button
              onClick={() =>
                onChange((draft) => ({
                  ...draft,
                  logistics: [...draft.logistics, { label: 'Nouveau besoin', quantity: 0, availableOnSite: false }]
                }))
              }
              className="text-sm text-primary hover:underline"
            >
              + Ajouter
            </button>
          </header>
          <div className="space-y-2">
            {value.logistics.map((logistic, index) => (
              <div key={`${logistic.label}-${index}`} className="grid gap-2 rounded-md border border-slate-800 p-3 text-sm">
                <input
                  value={logistic.label}
                  onChange={(event) =>
                    onChange((draft) => {
                      const logistics = [...draft.logistics];
                      logistics[index] = { ...logistics[index], label: event.target.value };
                      return { ...draft, logistics };
                    })
                  }
                  className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1"
                />
                <input
                  type="number"
                  min={0}
                  value={numberInput(logistic.quantity)}
                  onChange={(event) =>
                    onChange((draft) => {
                      const logistics = [...draft.logistics];
                      logistics[index] = { ...logistics[index], quantity: handleNumberChange(event) };
                      return { ...draft, logistics };
                    })
                  }
                  className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1"
                />
                <label className="inline-flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={logistic.availableOnSite}
                    onChange={(event) =>
                      onChange((draft) => {
                        const logistics = [...draft.logistics];
                        logistics[index] = { ...logistics[index], availableOnSite: event.target.checked };
                        return { ...draft, logistics };
                      })
                    }
                  />
                  Disponible sur site
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={onPrevious} className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300">
            Retour
          </button>
          <button onClick={onNext} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Continuer
          </button>
        </div>
      </div>
    )
  },
  {
    id: 'risk',
    title: 'Analyse des risques',
    description: 'Téléversement des documents et seuils de sécurité.',
    render: ({ value, onChange, onNext, onPrevious }) => (
      <div className="space-y-6">
        <p className="text-sm text-slate-300">
          Les événements de plus de <strong>1 500 personnes</strong> nécessitent une étude renforcée. Au-delà de{' '}
          <strong>5 000 personnes</strong>, le dossier sécurité devient obligatoire.
        </p>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Nombre de participants</span>
          <input
            type="number"
            min={0}
            value={numberInput(value.riskAnalysis.attendeeCount)}
            onChange={(event) =>
              onChange((draft) => ({
                ...draft,
                riskAnalysis: { ...draft.riskAnalysis, attendeeCount: handleNumberChange(event) }
              }))
            }
            className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
          />
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={value.riskAnalysis.securityFileUploaded}
            onChange={(event) =>
              onChange((draft) => ({
                ...draft,
                riskAnalysis: { ...draft.riskAnalysis, securityFileUploaded: event.target.checked }
              }))
            }
          />
          Dossier sécurité téléchargé (> 5 000 participants)
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={value.riskAnalysis.evacuationPlanReady}
            onChange={(event) =>
              onChange((draft) => ({
                ...draft,
                riskAnalysis: { ...draft.riskAnalysis, evacuationPlanReady: event.target.checked }
              }))
            }
          />
          Plan d&apos;évacuation validé
        </label>
        <div className="flex justify-between">
          <button onClick={onPrevious} className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300">
            Retour
          </button>
          <button onClick={onNext} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Continuer
          </button>
        </div>
      </div>
    )
  },
  {
    id: 'staff',
    title: 'Main-d’œuvre',
    description: 'Planifiez les ressources humaines pour la préparation et le jour J.',
    render: ({ value, onChange, onNext, onPrevious }) => (
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-200">Besoins en personnel</span>
          <button
            onClick={() =>
              onChange((draft) => ({
                ...draft,
                staff: [...draft.staff, { role: 'Nouveau poste', hourlyCost: 0, quantity: 1, hours: 4 }]
              }))
            }
            className="text-sm text-primary hover:underline"
          >
            + Ajouter
          </button>
        </header>
        <div className="space-y-3">
          {value.staff.map((item, index) => (
            <div key={`${item.role}-${index}`} className="grid gap-2 rounded-md border border-slate-800 p-3 text-sm">
              <input
                value={item.role}
                onChange={(event) =>
                  onChange((draft) => {
                    const staff = [...draft.staff];
                    staff[index] = { ...staff[index], role: event.target.value };
                    return { ...draft, staff };
                  })
                }
                className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1"
              />
              <div className="grid grid-cols-3 gap-2">
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400">Taux horaire (€)</span>
                  <input
                    type="number"
                    min={0}
                    value={numberInput(item.hourlyCost)}
                    onChange={(event) =>
                      onChange((draft) => {
                        const staff = [...draft.staff];
                        staff[index] = { ...staff[index], hourlyCost: handleNumberChange(event) };
                        return { ...draft, staff };
                      })
                    }
                    className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400">Nombre</span>
                  <input
                    type="number"
                    min={0}
                    value={numberInput(item.quantity)}
                    onChange={(event) =>
                      onChange((draft) => {
                        const staff = [...draft.staff];
                        staff[index] = { ...staff[index], quantity: handleNumberChange(event) };
                        return { ...draft, staff };
                      })
                    }
                    className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400">Heures</span>
                  <input
                    type="number"
                    min={0}
                    value={numberInput(item.hours)}
                    onChange={(event) =>
                      onChange((draft) => {
                        const staff = [...draft.staff];
                        staff[index] = { ...staff[index], hours: handleNumberChange(event) };
                        return { ...draft, staff };
                      })
                    }
                    className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button onClick={onPrevious} className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300">
            Retour
          </button>
          <button onClick={onNext} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Continuer
          </button>
        </div>
      </div>
    )
  },
  {
    id: 'marketing',
    title: 'Plan marketing',
    description: 'Choisissez vos canaux de communication et leurs deadlines.',
    render: ({ value, onChange, onNext, onPrevious }) => (
      <div className="space-y-6">
        <div className="space-y-3">
          <header className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-200">Actions marketing</span>
            <button
              onClick={() =>
                onChange((draft) => ({
                  ...draft,
                  marketingPlan: [
                    ...draft.marketingPlan,
                    { channel: MARKETING_CHANNELS[0], deadline: new Date().toISOString().slice(0, 10) }
                  ]
                }))
              }
              className="text-sm text-primary hover:underline"
            >
              + Ajouter
            </button>
          </header>
          <div className="space-y-2">
            {value.marketingPlan.map((item, index) => (
              <div key={`${item.channel}-${index}`} className="grid gap-2 rounded-md border border-slate-800 p-3 text-sm">
                <select
                  value={item.channel}
                  onChange={(event) =>
                    onChange((draft) => {
                      const marketingPlan = [...draft.marketingPlan];
                      marketingPlan[index] = { ...marketingPlan[index], channel: event.target.value as (typeof MARKETING_CHANNELS)[number] };
                      return { ...draft, marketingPlan };
                    })
                  }
                  className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1"
                >
                  {MARKETING_CHANNELS.map((channel) => (
                    <option key={channel}>{channel}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={item.deadline}
                  onChange={(event) =>
                    onChange((draft) => {
                      const marketingPlan = [...draft.marketingPlan];
                      marketingPlan[index] = { ...marketingPlan[index], deadline: event.target.value };
                      return { ...draft, marketingPlan };
                    })
                  }
                  className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={onPrevious} className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300">
            Retour
          </button>
          <button onClick={onNext} className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Continuer
          </button>
        </div>
      </div>
    )
  },
  {
    id: 'summary',
    title: 'Récapitulatif',
    description: 'Vérifiez toutes les informations avant validation.',
    render: ({ value, onPrevious }) => (
      <div className="space-y-6">
        <section className="rounded-md border border-slate-800 p-4">
          <h3 className="text-lg font-semibold text-primary">Synthèse</h3>
          <p className="mt-2 text-sm text-slate-300">
            Ce récapitulatif illustre la structure de données qui sera envoyée à l&apos;API. Chaque section du questionnaire sera
            enrichie pour couvrir l&apos;intégralité du cahier des charges.
          </p>
          <pre className="mt-4 max-h-96 overflow-auto rounded bg-slate-900 p-4 text-xs text-slate-200">
            {JSON.stringify(value, null, 2)}
          </pre>
        </section>
        <div className="flex justify-between">
          <button onClick={onPrevious} className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300">
            Retour
          </button>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Valider l&apos;événement (à venir)
          </button>
        </div>
      </div>
    )
  }
];
