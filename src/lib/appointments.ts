import { pricingData, PricingItem } from '@/data/pricing';
import { parsePriceCents } from '@/lib/price-utils';

/** Parse duration strings like "20 min", "45 min", "1h", "1.5h" to minutes. */
export function parseDurationMinutes(duration: string | undefined): number {
  if (!duration) return 60;
  const lower = duration.toLowerCase().trim();
  const hourMatch = lower.match(/^(\d+(?:\.\d+)?)\s*h/);
  if (hourMatch) return Math.round(parseFloat(hourMatch[1]) * 60);
  const minMatch = lower.match(/(\d+)\s*min/);
  if (minMatch) return parseInt(minMatch[1], 10);
  return 60;
}

/** Find a pricing item by id; returns null if not found. */
export function findTreatment(treatmentId: string): PricingItem | null {
  return pricingData.find((p) => p.id === treatmentId) ?? null;
}

/**
 * Compute the end time for an appointment given a start ISO string and duration.
 */
export function computeEndsAt(startsAt: string, durationMinutes: number): string {
  const d = new Date(startsAt);
  d.setMinutes(d.getMinutes() + durationMinutes);
  return d.toISOString();
}

/** Build the full treatment snapshot for an appointment. */
export function buildTreatmentSnapshot(treatment: PricingItem, priceCentsOverride?: number) {
  return {
    treatment_id: treatment.id,
    treatment_title: treatment.title,
    price_cents: priceCentsOverride ?? parsePriceCents(treatment.price),
    duration_minutes: parseDurationMinutes(treatment.duration),
  };
}

/** Status labels in Croatian. */
export const APPOINTMENT_STATUS_LABELS: Record<string, string> = {
  scheduled: 'Zakazano',
  confirmed: 'Potvrđeno',
  completed: 'Završeno',
  cancelled: 'Otkazano',
  no_show: 'Nije došla',
};

export const APPOINTMENT_STATUS_COLORS: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
  no_show: 'bg-orange-100 text-orange-800',
};

/** Calendar event colors (react-big-calendar) */
export const APPOINTMENT_EVENT_COLORS: Record<string, string> = {
  scheduled: '#3b82f6',
  confirmed: '#22c55e',
  completed: '#6b7280',
  cancelled: '#ef4444',
  no_show: '#f97316',
};
