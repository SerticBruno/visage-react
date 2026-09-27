import { businessData } from '@/data/business';
import { DEFAULT_ANCHOR_DATE, parsePriceAmount, resolveAnchorDate } from '@/lib/anchorPrice';
import type { Product } from '@/data/products';
import type { PricingItem } from '@/data/pricing';
import type { ComboPackage } from '@/data/comboPackages';

export const CJENIK_FACILITY = {
  tipObjekta: 'salon',
  /** Address segment used in CSV filename (no underscores). */
  adresa: `${businessData.address.streetAddress} ${businessData.address.addressLocality}`,
  oznaka: 'U-01',
} as const;

/** Product category label for HOK "ROBA" cjenik (kozmetika / higijena). */
export const PRODUCT_CATEGORY_LABEL = 'kozmetika';

export type CjenikKind = 'products' | 'services';

export type CjenikManifestEntry = {
  kind: CjenikKind;
  filename: string;
  generatedAt: string;
  storageNumber: number;
};

export type CjenikManifest = {
  updatedAt: string;
  nextStorageNumber: number;
  entries: CjenikManifestEntry[];
  latestProducts: string | null;
  latestServices: string | null;
};

export function createEmptyManifest(): CjenikManifest {
  return {
    updatedAt: new Date().toISOString(),
    nextStorageNumber: 1,
    entries: [],
    latestProducts: null,
    latestServices: null,
  };
}

/** Format amount for CSV (e.g. 40 → "40.00"). Empty string stays empty. */
export function formatCsvAmount(price: string | undefined | null): string {
  if (price == null || String(price).trim() === '') return '';
  const n = parsePriceAmount(String(price));
  if (Number.isNaN(n)) return String(price).replace(/[^\d.,]/g, '').replace(',', '.');
  return n.toFixed(2);
}

/** Split volume like "200 ml" / "50ml" into neto + unit. */
export function parseNetQuantity(volume?: string): { neto: string; jedinica: string } {
  if (!volume?.trim()) return { neto: '', jedinica: '' };
  const m = volume.trim().match(/^([\d]+(?:[.,]\d+)?)\s*(.*)$/);
  if (!m) return { neto: '', jedinica: volume.trim() };
  return {
    neto: m[1].replace(',', '.'),
    jedinica: m[2].trim(),
  };
}

/** Unit price = MPC / neto quantity when both are numeric. */
export function formatUnitPrice(price: string, neto: string): string {
  const p = parsePriceAmount(price);
  const q = parseFloat(neto.replace(',', '.'));
  if (Number.isNaN(p) || Number.isNaN(q) || q === 0) return '';
  return (p / q).toFixed(4);
}

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toCsvRow(cells: string[]): string {
  return cells.map(csvEscape).join(',');
}

/** Zagreb wall-clock parts for filename timestamp. */
export function getZagrebDateParts(date: Date = new Date()): {
  dd: string;
  mm: string;
  yyyy: string;
  HH: string;
  mmTime: string;
} {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Zagreb',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(date).filter((p) => p.type !== 'literal').map((p) => [p.type, p.value])
  );
  return {
    dd: parts.day,
    mm: parts.month,
    yyyy: parts.year,
    HH: parts.hour,
    mmTime: parts.minute,
  };
}

export function buildCjenikFilename(
  storageNumber: number,
  date: Date = new Date()
): string {
  const { tipObjekta, adresa, oznaka } = CJENIK_FACILITY;
  const { dd, mm, yyyy, HH, mmTime } = getZagrebDateParts(date);
  const broj = String(storageNumber).padStart(3, '0');
  // HH-mm (not HH:mm) — colon is invalid on Windows filesystems
  return `${tipObjekta}_${adresa}_${oznaka}_${broj}_${dd}.${mm}.${yyyy}_${HH}-${mmTime}.csv`;
}

/**
 * ROBA cjenik — columns aligned with HOK summary (01.10.2026).
 * Sidrena 2.5.2025 left empty when using 10.9.2026 reference for all items.
 * Najniža u 30 dana / barkod left empty until those data exist.
 */
export function buildProductsCsv(products: Product[]): string {
  const header = toCsvRow([
    'NAZIV PROIZVODA',
    'ŠIFRA PROIZVODA',
    'MARKA PROIZVODA',
    'NETO KOLIČINA',
    'JEDINICA MJERE',
    'MALOPRODAJNA CIJENA',
    'CIJENA ZA JEDINICU MJERE',
    'MPC ZA VRIJEME POSEBNOG OBLIKA PRODAJE',
    'NAJNIŽA CIJENA U POSLJEDNIH 30 DANA',
    'SIDRENA CIJENA NA 2.5.2025',
    'SIDRENA CIJENA NA 10.9.2026',
    'BARKOD',
    'KATEGORIJA PROIZVODA',
    'Dostupno ili nedostupno',
  ]);

  const rows = products.map((p) => {
    const onSale = Boolean(p.isOnSale && p.oldPrice);
    // Regular MP: if on sale, oldPrice is the regular shelf price
    const regularPrice = onSale && p.oldPrice ? p.oldPrice : p.price;
    const salePrice = onSale ? p.price : '';
    const { neto, jedinica } = parseNetQuantity(p.volume);
    const anchorIso = resolveAnchorDate(p.anchorDate);
    const anchorMay2025 = anchorIso === '2025-05-02' ? formatCsvAmount(p.anchorPrice) : '';
    const anchorSep2026 =
      anchorIso === '2025-05-02' ? '' : formatCsvAmount(p.anchorPrice);

    return toCsvRow([
      p.title,
      p.id,
      p.marka ?? '',
      neto,
      jedinica,
      formatCsvAmount(regularPrice),
      formatUnitPrice(regularPrice, neto),
      formatCsvAmount(salePrice),
      '', // najniža u 30 dana — nemamo povijest
      anchorMay2025,
      anchorSep2026,
      '', // barkod
      PRODUCT_CATEGORY_LABEL,
      'Dostupno',
    ]);
  });

  return `\uFEFF${[header, ...rows].join('\n')}\n`;
}

function specialSaleLabel(item: {
  isLimited?: boolean;
  isPackage?: boolean;
}): string {
  if (item.isPackage) return 'Paket';
  if (item.isLimited) return 'Limitirano';
  return '';
}

/**
 * Usluge cjenik — columns aligned with HOK summary (01.10.2026).
 */
export function buildServicesCsv(
  pricingItems: PricingItem[],
  comboPackages: ComboPackage[] = []
): string {
  const header = toCsvRow([
    'Šifra usluge',
    'Naziv usluge',
    'Jedinica mjere',
    'Aktualna cijena (EUR)',
    'Dodatna ili sidrena cijena na datum 10.09.2026. (EUR)',
    'Poseban oblik prodaje (akcija, sniženje + naziv posebnog oblika prodaje)',
    'Najniža cijena u posljednih 30 dana',
    'Napomena',
  ]);

  const serviceRows = pricingItems.map((item) => {
    const special = specialSaleLabel(item);
    return toCsvRow([
      item.id,
      item.title,
      item.duration ?? 'tretman',
      formatCsvAmount(item.price),
      formatCsvAmount(item.anchorPrice),
      special,
      '', // najniža u 30 dana
      item.description ?? '',
    ]);
  });

  const pricingIds = new Set(pricingItems.map((i) => i.id));
  const comboRows = comboPackages
    .filter((c) => !pricingIds.has(c.id))
    .map((c) =>
      toCsvRow([
        c.id,
        c.title,
        'paket',
        formatCsvAmount(c.price),
        formatCsvAmount(c.anchorPrice),
        'Kombinirani paket',
        '',
        c.description ?? '',
      ])
    );

  return `\uFEFF${[header, ...serviceRows, ...comboRows].join('\n')}\n`;
}

export { DEFAULT_ANCHOR_DATE };
