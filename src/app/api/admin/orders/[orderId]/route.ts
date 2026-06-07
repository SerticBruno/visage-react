import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getShippingOption, type DeliveryMethod } from '@/lib/shipping';

const VALID_STATUSES = [
  'pending',
  'paid',
  'processing',
  'shipped',
  'ready_for_pickup',
  'completed',
  'cancelled',
  'abandoned',
] as const;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  try {
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: 'Narudžba nije pronađena' }, { status: 404 });
    }

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('id, product_id, title, quantity, unit_price_cents')
      .eq('order_id', orderId);

    if (itemsError) throw itemsError;

    const delivery = getShippingOption(order.delivery_method as DeliveryMethod);

    return NextResponse.json({
      order: {
        id: order.id,
        status: order.status,
        deliveryMethod: order.delivery_method,
        deliveryLabel: delivery.label,
        customerEmail: order.customer_email,
        customerName: order.customer_name,
        customerPhone: order.customer_phone,
        shippingAddress: order.shipping_address ?? {},
        subtotalCents: order.subtotal_cents,
        shippingCents: order.shipping_cents,
        discountCents: order.discount_cents ?? 0,
        promoCode: order.promo_code ?? null,
        totalCents: order.total_cents,
        notes: order.notes,
        createdAt: order.created_at,
        paidAt: order.paid_at,
      },
      items: (items ?? []).map((item) => ({
        id: item.id,
        productId: item.product_id,
        title: item.title,
        quantity: item.quantity,
        unitPriceCents: item.unit_price_cents,
        lineTotalCents: item.unit_price_cents * item.quantity,
      })),
    });
  } catch (err) {
    console.error('Admin order detail:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju narudžbe' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  try {
    const body = await req.json();
    const { status } = body as { status?: string };

    if (!status || !VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
      return NextResponse.json({ error: 'Neispravan status' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select('id, status')
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Narudžba nije pronađena' }, { status: 404 });
    }

    return NextResponse.json({ order: data });
  } catch (err) {
    console.error('Admin order update:', err);
    return NextResponse.json({ error: 'Greška pri ažuriranju narudžbe' }, { status: 500 });
  }
}
