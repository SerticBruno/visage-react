import 'server-only';

import { supabase } from '@/lib/supabase';
import { getProductsByIds, getProductQuantities } from '@/lib/products-db';
import { parsePriceCents } from '@/lib/price-utils';
import { calculateShippingCents, getShippingOption, type DeliveryMethod } from '@/lib/shipping';
import { calculateDiscountCents, resolvePromoCode } from '@/lib/promo-codes';
import { getSiteUrl } from '@/lib/site-url';
import type { Product } from '@/data/products';
import {
  isOrderReadyForDirectPayment,
  orderToCheckoutPrefill,
  type CheckoutPrefill,
} from '@/lib/order-checkout-readiness';

export type RecoveryPreviewItem = {
  productId: string;
  title: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
  image: string | null;
  available: number;
  inStock: boolean;
  product: Product | null;
};

export type RecoveryPreview =
  | { kind: 'paid'; orderId: string; redirectUrl: string }
  | { kind: 'cancelled' }
  | { kind: 'not_found' }
  | {
      kind: 'preview';
      orderId: string;
      customerName: string;
      deliveryLabel: string;
      subtotalCents: number;
      shippingCents: number;
      discountCents: number;
      totalCents: number;
      promoCode: string | null;
      hasStockIssues: boolean;
      needsCheckout: boolean;
      checkoutPrefill: CheckoutPrefill;
      items: RecoveryPreviewItem[];
    };

export async function getRecoveryPreview(token: string): Promise<RecoveryPreview> {
  const baseUrl = getSiteUrl();

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select(
      'id, status, customer_name, customer_email, customer_phone, delivery_method, shipping_address, notes, promo_code, subtotal_cents, shipping_cents, discount_cents, total_cents'
    )
    .eq('recovery_token', token)
    .maybeSingle();

  if (orderError || !order) {
    return { kind: 'not_found' };
  }

  if (order.status === 'paid' || order.status === 'completed') {
    return {
      kind: 'paid',
      orderId: order.id,
      redirectUrl: `${baseUrl}/narudzba/${order.id}/uspjeh`,
    };
  }

  if (order.status === 'cancelled') {
    return { kind: 'cancelled' };
  }

  const { data: orderItems, error: itemsError } = await supabase
    .from('order_items')
    .select('product_id, title, quantity, unit_price_cents')
    .eq('order_id', order.id);

  if (itemsError || !orderItems?.length) {
    return { kind: 'not_found' };
  }

  const productIds = orderItems.map((i) => i.product_id);
  const productMap = await getProductsByIds(productIds);
  const stockMap = await getProductQuantities(productIds);

  const items: RecoveryPreviewItem[] = orderItems.map((item) => {
    const liveProduct = productMap.get(item.product_id);
    const unitPriceCents = liveProduct
      ? parsePriceCents(liveProduct.price)
      : item.unit_price_cents;
    const available = stockMap.get(item.product_id) ?? 0;
    const inStock = available >= item.quantity;

    return {
      productId: item.product_id,
      title: liveProduct?.title ?? item.title,
      quantity: item.quantity,
      unitPriceCents,
      lineTotalCents: unitPriceCents * item.quantity,
      image: liveProduct?.image ?? null,
      available,
      inStock,
      product: liveProduct ?? null,
    };
  });

  const promo = resolvePromoCode(order.promo_code ?? undefined);
  const subtotalCents = items.reduce((s, i) => s + i.lineTotalCents, 0);
  const discountCents = promo ? calculateDiscountCents(subtotalCents, promo.percentOff) : 0;
  const shippingCents = calculateShippingCents(
    order.delivery_method as DeliveryMethod,
    subtotalCents
  );
  const totalCents = subtotalCents - discountCents + shippingCents;
  const delivery = getShippingOption(order.delivery_method as DeliveryMethod);
  const checkoutPrefill = orderToCheckoutPrefill(order);
  const needsCheckout = !isOrderReadyForDirectPayment(order);

  return {
    kind: 'preview',
    orderId: order.id,
    customerName: order.customer_name ?? '',
    deliveryLabel: delivery.label,
    subtotalCents,
    shippingCents,
    discountCents,
    totalCents,
    promoCode: order.promo_code ?? null,
    hasStockIssues: items.some((i) => !i.inStock),
    needsCheckout,
    checkoutPrefill,
    items,
  };
}
