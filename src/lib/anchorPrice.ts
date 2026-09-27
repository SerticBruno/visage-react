/** Default Croatian anchor (sidrena) price reference date. */
export const DEFAULT_ANCHOR_DATE = '2026-09-10';

/**
 * Format anchor date for display (Ministry recommendation: date only, no "sidrena").
 * Input: ISO `YYYY-MM-DD` → `10.9.2026.`
 */
export function formatAnchorDateLabel(isoDate: string = DEFAULT_ANCHOR_DATE): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) return isoDate;
  return `${day}.${month}.${year}.`;
}

/** e.g. "Cijena na 10.9.2026." */
export function formatAnchorPriceLabel(isoDate: string = DEFAULT_ANCHOR_DATE): string {
  return `Cijena na ${formatAnchorDateLabel(isoDate)}`;
}

/** Parse numeric amount from strings like "40 EUR" or "40,00 €". */
export function parsePriceAmount(price: string): number {
  const normalized = price.replace(/\s/g, '').replace(',', '.');
  const match = normalized.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : NaN;
}

export function resolveAnchorDate(anchorDate?: string): string {
  return anchorDate ?? DEFAULT_ANCHOR_DATE;
}
