import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { products } from '@/data/products';
import { getShippingOption, DeliveryMethod } from '@/lib/shipping';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  const sessionId = req.nextUrl.searchParams.get('session_id');

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select(
      'id, status, delivery_method, customer_name, subtotal_cents, shipping_cents, total_cents, stripe_session_id'
    )
    .eq('id', orderId)
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: 'Narudžba nije pronađena' }, { status: 404 });
  }

  if (sessionId && order.stripe_session_id && order.stripe_session_id !== sessionId) {
    return NextResponse.json({ error: 'Neispravan pristup narudžbi' }, { status: 403 });
  }

  const { data: rows, error: itemsError } = await supabase
    .from('order_items')
    .select('product_id, title, quantity, unit_price_cents')
    .eq('order_id', orderId);

  if (itemsError) {
    return NextResponse.json({ error: 'Greška pri učitavanju stavki' }, { status: 500 });
  }

  const delivery = getShippingOption(order.delivery_method as DeliveryMethod);

  const items = (rows ?? []).map((row) => {
    const product = products.find((p) => p.id === row.product_id);
    const description =
      product?.previewDescription ??
      (product?.description ? product.description.slice(0, 140) : null);

    return {
      productId: row.product_id,
      title: row.title,
      quantity: row.quantity,
      unitPriceCents: row.unit_price_cents,
      lineTotalCents: row.unit_price_cents * row.quantity,
      image: product?.image ?? null,
      marka: product?.marka ?? null,
      volume: product?.volume ?? null,
      description,
      imageNeedsResize: product?.imageNeedsResize ?? false,
    };
  });

  return NextResponse.json({
    order: {
      id: order.id,
      status: order.status,
      customerName: order.customer_name,
      deliveryMethod: order.delivery_method,
      deliveryLabel: delivery.label,
      subtotalCents: order.subtotal_cents,
      shippingCents: order.shipping_cents,
      totalCents: order.total_cents,
    },
    items,
  });
}
