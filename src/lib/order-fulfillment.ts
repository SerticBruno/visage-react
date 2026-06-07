import 'server-only';

import { supabase } from '@/lib/supabase';
import { markRecoveryConversionIfEligible } from '@/lib/abandoned-cart-events';

export type FulfillOrderResult =
  | { status: 'fulfilled'; orderId: string }
  | { status: 'already_fulfilled'; orderId: string };

type OrderItemRow = { product_id: string; quantity: number };

/**
 * Označava narudžbu kao plaćenu i smanjuje zalihe u products.quantity.
 * Idempotentno — preskače ako narudžba više nije pending/abandoned.
 */
export async function fulfillOrder(
  orderId: string,
  options?: { stripeSessionId?: string }
): Promise<FulfillOrderResult> {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('id, status, stripe_session_id')
    .eq('id', orderId)
    .single();

  if (orderError || !order) {
    throw new Error('Narudžba nije pronađena');
  }

  if (order.status !== 'pending' && order.status !== 'abandoned') {
    return { status: 'already_fulfilled', orderId };
  }

  const { data: orderItems, error: itemsError } = await supabase
    .from('order_items')
    .select('product_id, quantity')
    .eq('order_id', orderId);

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  if (!orderItems?.length) {
    throw new Error('Narudžba nema stavki');
  }

  await decrementStockForItems(orderItems);

  const paidAt = new Date().toISOString();
  const updatePayload: Record<string, string | null> = {
    status: 'paid',
    paid_at: paidAt,
    abandoned_at: null,
  };
  if (options?.stripeSessionId) {
    updatePayload.stripe_session_id = options.stripeSessionId;
  }

  const { data: updated, error: updateError } = await supabase
    .from('orders')
    .update(updatePayload)
    .eq('id', orderId)
    .in('status', ['pending', 'abandoned'])
    .select('id')
    .maybeSingle();

  if (updateError) {
    throw new Error(updateError.message);
  }

  if (!updated) {
    return { status: 'already_fulfilled', orderId };
  }

  await markRecoveryConversionIfEligible(orderId, paidAt);

  return { status: 'fulfilled', orderId };
}

async function decrementStockForItems(items: OrderItemRow[]): Promise<void> {
  for (const item of items) {
    const { error } = await supabase.rpc('decrement_stock', {
      p_product_id: item.product_id,
      p_quantity: item.quantity,
    });

    if (error) {
      throw new Error(
        `Nedovoljno zaliha za proizvod ${item.product_id}: ${error.message}`
      );
    }
  }
}

