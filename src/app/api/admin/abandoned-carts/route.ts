import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import {
  browseCartAbandonedCutoff,
  mapSnapshotItems,
} from '@/lib/cart-snapshot';

export async function GET() {
  try {
    const cutoff = browseCartAbandonedCutoff().toISOString();

    const { data: snapshots, error: snapshotsError } = await supabase
      .from('cart_snapshots')
      .select(
        'id, visitor_token, customer_email, customer_name, items, subtotal_cents, last_activity_at, created_at'
      )
      .eq('status', 'active')
      .lt('last_activity_at', cutoff)
      .order('last_activity_at', { ascending: false });

    if (snapshotsError) throw snapshotsError;

    const browseCarts = (snapshots ?? [])
      .map((s) => ({
        id: s.id,
        visitorToken: s.visitor_token,
        customerEmail: s.customer_email,
        customerName: s.customer_name,
        subtotalCents: s.subtotal_cents,
        lastActivityAt: s.last_activity_at,
        createdAt: s.created_at,
        items: mapSnapshotItems(s.items),
      }))
      .filter((s) => s.items.length > 0);

    const { data: orders, error } = await supabase
      .from('orders')
      .select(
        'id, customer_email, customer_name, customer_phone, total_cents, created_at, abandonment_email_count, recovery_token, delivery_method, abandoned_at, stripe_session_id'
      )
      .eq('status', 'abandoned')
      .not('stripe_session_id', 'is', null)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!orders?.length) {
      return NextResponse.json({ carts: [], browseCarts });
    }

    const orderIds = orders.map((o) => o.id);

    const { data: allItems, error: itemsError } = await supabase
      .from('order_items')
      .select('order_id, title, quantity, unit_price_cents')
      .in('order_id', orderIds);

    if (itemsError) throw itemsError;

    const itemsByOrder = new Map<
      string,
      { title: string; quantity: number; unitPriceCents: number }[]
    >();
    for (const item of allItems ?? []) {
      const list = itemsByOrder.get(item.order_id) ?? [];
      list.push({
        title: item.title,
        quantity: item.quantity,
        unitPriceCents: item.unit_price_cents,
      });
      itemsByOrder.set(item.order_id, list);
    }

    return NextResponse.json({
      browseCarts,
      carts: orders.map((o) => ({
        id: o.id,
        customerEmail: o.customer_email,
        customerName: o.customer_name,
        customerPhone: o.customer_phone,
        totalCents: o.total_cents,
        createdAt: o.created_at,
        abandonedAt: o.abandoned_at,
        deliveryMethod: o.delivery_method,
        emailsSent: o.abandonment_email_count ?? 0,
        hasRecoveryToken: !!o.recovery_token,
        items: itemsByOrder.get(o.id) ?? [],
      })),
    });
  } catch (err) {
    console.error('Admin abandoned carts:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju' }, { status: 500 });
  }
}
