export interface PromoCode {
  code: string;
  label: string;
  percentOff: number;
}

const PROMO_CODES: Record<string, PromoCode> = {
  CIRCADIAVISAGE: {
    code: 'CIRCADIAVISAGE',
    label: 'Circadia Visage (−10%)',
    percentOff: 10,
  },
  CIRCADIAVISAGEVIP: {
    code: 'CIRCADIAVISAGEVIP',
    label: 'Circadia Visage VIP (−15%)',
    percentOff: 15,
  },
};

export function normalizePromoCode(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, '');
}

export function resolvePromoCode(input: string | undefined | null): PromoCode | null {
  if (!input?.trim()) return null;
  return PROMO_CODES[normalizePromoCode(input)] ?? null;
}

export function calculateDiscountCents(subtotalCents: number, percentOff: number): number {
  if (subtotalCents <= 0 || percentOff <= 0) return 0;
  return Math.round((subtotalCents * percentOff) / 100);
}
