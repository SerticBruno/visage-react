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

export function getRemainingStock(stock: number | null, cartQty: number): number | null {
  if (stock === null) return null;
  return Math.max(0, stock - cartQty);
}

export function getMaxQtyMessage(
  stock: number,
  remaining: number,
  cartQty: number
): string {
  if (remaining <= 0) {
    return cartQty >= stock
      ? 'Već imate maksimalnu količinu u košarici'
      : 'Nema više na zalihi';
  }
  if (cartQty > 0) return `Možete dodati najviše ${remaining} kom`;
  return `Maksimalno ${stock} kom na zalihi`;
}
