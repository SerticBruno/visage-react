export function getProductStock(product: { quantity?: number }): number | null {
  return product.quantity ?? null;
}

export function isInStock(product: { quantity?: number }): boolean {
  const stock = getProductStock(product);
  if (stock === null) return true;
  return stock > 0;
}

export function canAddToCart(
  product: { quantity?: number },
  currentCartQty: number,
  addQty = 1
): boolean {
  const stock = getProductStock(product);
  if (stock === null) return true;
  return currentCartQty + addQty <= stock;
}
