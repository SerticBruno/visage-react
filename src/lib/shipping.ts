import { formatPrice } from '@/lib/price-utils';

export type DeliveryMethod = 'boxnow' | 'gls' | 'pickup';

export interface ShippingOption {
  id: DeliveryMethod;
  label: string;
  description: string;
  priceCents: number;
  estimatedDays: string;
}

/** Besplatna dostava (BoxNow/GLS) iznad ovog iznosa proizvoda. Promijeni u .env.local:
 *  NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_EUR=30 */
export function getFreeShippingThresholdCents(): number {
  const raw = process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_EUR ?? '30';
  const eur = parseFloat(raw);
  return Math.round((Number.isFinite(eur) && eur >= 0 ? eur : 30) * 100);
}

export function qualifiesForFreeShipping(subtotalCents: number): boolean {
  return subtotalCents >= getFreeShippingThresholdCents();
}

export function getAmountUntilFreeShippingCents(subtotalCents: number): number {
  return Math.max(0, getFreeShippingThresholdCents() - subtotalCents);
}

export function getFreeShippingThresholdLabel(): string {
  return formatPrice(getFreeShippingThresholdCents());
}

/** Cijena dostave za odabrani način, uzimajući u obzir prag besplatne dostave. */
export function calculateShippingCents(
  deliveryMethod: DeliveryMethod,
  subtotalCents: number
): number {
  const option = getShippingOption(deliveryMethod);
  if (option.id === 'pickup') return 0;
  if (qualifiesForFreeShipping(subtotalCents)) return 0;
  return option.priceCents;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'boxnow',
    label: 'BoxNow paketomat',
    description: 'Dostava u BoxNow paketomat po vašem izboru',
    priceCents: 500, // 5.00 EUR
    estimatedDays: '2-4 radna dana',
  },
  {
    id: 'gls',
    label: 'GLS kućna dostava',
    description: 'Dostava na vašu adresu',
    priceCents: 500, // 5.00 EUR
    estimatedDays: '2-4 radna dana',
  },
  {
    id: 'pickup',
    label: 'Preuzimanje u studiju',
    description: 'Ulica Stjepana i Antuna Radića 49, Sisak - besplatno',
    priceCents: 0,
    estimatedDays: 'po dogovoru',
  },
];

export function getShippingOption(id: DeliveryMethod): ShippingOption {
  return SHIPPING_OPTIONS.find((o) => o.id === id) ?? SHIPPING_OPTIONS[2];
}
