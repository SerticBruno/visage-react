import { businessData } from '@/data/business';
import { getFreeShippingThresholdLabel } from '@/lib/shipping';

/**
 * Podaci o prodavatelju za zakonske stranice (Zakon o zaštiti potrošača, OG na daljinu).
 * Popunite OIB i pravni oblik u .env.local — vidi .env.example.
 */
export const legalSeller = {
  tradeName: businessData.name,
  /** Pun pravni naziv (npr. obrt ili d.o.o.) */
  legalName:
    process.env.NEXT_PUBLIC_SELLER_LEGAL_NAME?.trim() ||
    'VISAGE Studio, obrt za kozmetičke i estetske usluge',
  oib: process.env.NEXT_PUBLIC_SELLER_OIB?.trim() || '',
  mbs: process.env.NEXT_PUBLIC_SELLER_MBS?.trim() || '',
  court: process.env.NEXT_PUBLIC_SELLER_COURT?.trim() || '',
  shareCapital: process.env.NEXT_PUBLIC_SELLER_SHARE_CAPITAL?.trim() || '',
  responsiblePerson: process.env.NEXT_PUBLIC_SELLER_RESPONSIBLE_PERSON?.trim() || '',
  email: businessData.email,
  phone: businessData.telephone,
  phoneDisplay: '091 110 50 20',
  address: businessData.address,
  addressLines: [
    businessData.address.streetAddress,
    `${businessData.address.postalCode} ${businessData.address.addressLocality}`,
    'Hrvatska',
  ],
  url: businessData.url,
};

export const LEGAL_LAST_UPDATED = '31. svibnja 2026.';

export const legalPaths = {
  privacy: '/privatnost',
  cookies: '/kolacici',
  termsOfSale: '/uvjeti-kupnje',
  generalTerms: '/opci-uvjeti',
  delivery: '/uvjeti-dostave',
  returns: '/povrat-i-reklamacije',
  seller: '/podaci-o-prodavatelju',
} as const;

export function formatSellerAddress(): string {
  return legalSeller.addressLines.join(', ');
}

export function sellerIdentBlock(): string {
  const lines = [legalSeller.legalName];
  if (legalSeller.oib) lines.push(`OIB: ${legalSeller.oib}`);
  if (legalSeller.mbs) lines.push(`MBS: ${legalSeller.mbs}`);
  if (legalSeller.court) lines.push(`Sud registra: ${legalSeller.court}`);
  if (legalSeller.shareCapital) lines.push(`Temeljni kapital: ${legalSeller.shareCapital}`);
  lines.push(formatSellerAddress());
  lines.push(`E-mail: ${legalSeller.email}`);
  lines.push(`Telefon: ${legalSeller.phoneDisplay}`);
  return lines.join('\n');
}

export const freeShippingThresholdLabel = getFreeShippingThresholdLabel();
