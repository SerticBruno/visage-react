/**
 * Parse a display price string like "40 EUR" into integer cents.
 * Used server-side when building Stripe line items.
 */
export function parsePriceCents(price: string): number {
  const match = price.match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return 0;
  const amount = parseFloat(match[1].replace(',', '.'));
  return Math.round(amount * 100);
}

/** Format a product price string like "40 EUR" for catalog cards ("40 €"). */
export function formatProductCardPrice(price: string): string {
  return price.replace(/\s*EUR\s*$/i, ' €');
}

/** Format integer cents back to a display string like "40,00 EUR" */
export function formatPrice(cents: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
