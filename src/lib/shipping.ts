export type DeliveryMethod = 'boxnow' | 'gls' | 'pickup';

export interface ShippingOption {
  id: DeliveryMethod;
  label: string;
  description: string;
  priceCents: number;
  estimatedDays: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'boxnow',
    label: 'BoxNow paketomat',
    description: 'Dostava u BoxNow paketomat po vašem izboru',
    priceCents: 500, // 5.00 EUR
    estimatedDays: '2–4 radna dana',
  },
  {
    id: 'gls',
    label: 'GLS kućna dostava',
    description: 'Dostava na vašu adresu',
    priceCents: 500, // 5.00 EUR
    estimatedDays: '2–4 radna dana',
  },
  {
    id: 'pickup',
    label: 'Preuzimanje u studiju',
    description: 'Ulica Stjepana i Antuna Radića 49, Sisak — besplatno',
    priceCents: 0,
    estimatedDays: 'po dogovoru',
  },
];

export function getShippingOption(id: DeliveryMethod): ShippingOption {
  return SHIPPING_OPTIONS.find((o) => o.id === id) ?? SHIPPING_OPTIONS[2];
}
