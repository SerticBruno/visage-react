/** Minutes without cart activity before a snapshot appears in admin as browse-abandoned. */
export const BROWSE_CART_ABANDONED_AFTER_MINUTES = 1;

export function browseCartAbandonedCutoff(): Date {
  return new Date(Date.now() - BROWSE_CART_ABANDONED_AFTER_MINUTES * 60 * 1000);
}

export type CartSnapshotItemRow = {
  product_id?: string;
  title: string;
  quantity: number;
  unit_price_cents: number;
};

export function mapSnapshotItems(
  items: unknown
): { title: string; quantity: number; unitPriceCents: number }[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter(
      (item): item is CartSnapshotItemRow =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as CartSnapshotItemRow).title === 'string'
    )
    .map((item) => ({
      title: item.title,
      quantity: item.quantity,
      unitPriceCents: item.unit_price_cents,
    }));
}
