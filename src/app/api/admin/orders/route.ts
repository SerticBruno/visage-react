import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Real orders only — checkout attempts live in /admin/abandoned-carts
const COMPLETED_ORDER_STATUSES = [
  'paid',
  'processing',
  'shipped',
  'ready_for_pickup',
  'completed',
  'cancelled',
] as const;

export async function GET() {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(
        'id, status, delivery_method, customer_email, customer_name, customer_phone, subtotal_cents, shipping_cents, discount_cents, promo_code, total_cents, created_at, paid_at'
      )
      .in('status', [...COMPLETED_ORDER_STATUSES])
      .order('created_at', { ascending: false });

    if (error) throw error;

    const orderIds = (orders ?? []).map((o) => o.id);
    const itemCounts = new Map<string, number>();

    if (orderIds.length > 0) {
      const { data: items, error: itemsError } = await supabase
        .from('order_items')
        .select('order_id, quantity')
        .in('order_id', orderIds);

      if (itemsError) throw itemsError;

      for (const item of items ?? []) {
        itemCounts.set(item.order_id, (itemCounts.get(item.order_id) ?? 0) + item.quantity);
      }
    }

    return NextResponse.json({
      orders: (orders ?? []).map((order) => ({
        id: order.id,
        status: order.status,
        deliveryMethod: order.delivery_method,
        customerEmail: order.customer_email,
        customerName: order.customer_name,
        customerPhone: order.customer_phone,
        subtotalCents: order.subtotal_cents,
        shippingCents: order.shipping_cents,
        discountCents: order.discount_cents ?? 0,
        promoCode: order.promo_code ?? null,
        totalCents: order.total_cents,
        itemCount: itemCounts.get(order.id) ?? 0,
        createdAt: order.created_at,
        paidAt: order.paid_at,
      })),
    });
  } catch (err) {
    console.error('Admin orders list:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju narudžbi' }, { status: 500 });
  }
}
