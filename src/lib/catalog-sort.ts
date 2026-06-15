import type { Product } from '@/data/products';
import { parsePriceCents } from '@/lib/price-utils';

export type CatalogSortOption =
  | 'popularity'
  | 'price-asc'
  | 'price-desc'
  | 'title-asc'
  | 'title-desc'
  | 'newest';

export const CATALOG_SORT_LABELS: Record<CatalogSortOption, string> = {
  popularity: 'Popularnost',
  'price-asc': 'Cijena: najniža',
  'price-desc': 'Cijena: najviša',
  'title-asc': 'Naziv A–Ž',
  'title-desc': 'Naziv Ž–A',
  newest: 'Najnovije',
};

function effectivePopularity(p: Product): number {
  return (p.popularityScore ?? 0) + (p.salesCount ?? 0);
}

export function sortProducts(products: Product[], sortBy: CatalogSortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'popularity':
      sorted.sort((a, b) => {
        const diff = effectivePopularity(b) - effectivePopularity(a);
        return diff !== 0 ? diff : a.title.localeCompare(b.title, 'hr');
      });
      break;
    case 'price-asc':
      sorted.sort((a, b) => parsePriceCents(a.price) - parsePriceCents(b.price));
      break;
    case 'price-desc':
      sorted.sort((a, b) => parsePriceCents(b.price) - parsePriceCents(a.price));
      break;
    case 'title-asc':
      sorted.sort((a, b) => a.title.localeCompare(b.title, 'hr'));
      break;
    case 'title-desc':
      sorted.sort((a, b) => b.title.localeCompare(a.title, 'hr'));
      break;
    case 'newest':
      sorted.sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      });
      break;
  }

  return sorted;
}
