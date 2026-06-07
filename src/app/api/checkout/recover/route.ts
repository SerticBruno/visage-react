import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { getProductsByIds, getProductQuantities } from '@/lib/products-db';
import { parsePriceCents } from '@/lib/price-utils';
import { calculateShippingCents, getShippingOption, type DeliveryMethod } from '@/lib/shipping';
import { calculateDiscountCents, resolvePromoCode } from '@/lib/promo-codes';
import { getSiteUrl } from '@/lib/site-url';
import { getRecoveryPreview } from '@/lib/recovery-order';

/** Preview abandoned order for recovery landing page */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Token nije naveden' }, { status: 400 });
  }

  try {
    const preview = await getRecoveryPreview(token);

    if (preview.kind === 'not_found') {
      return NextResponse.json({ error: 'Neispravni ili istekli link' }, { status: 404 });
    }

    if (preview.kind === 'cancelled') {
      return NextResponse.json({ error: 'Ova narudžba je otkazana' }, { status: 410 });
    }

    if (preview.kind === 'paid') {
      return NextResponse.json({ redirect: preview.redirectUrl });
    }

    return NextResponse.json({
      order: {
        id: preview.orderId,
        customerName: preview.customerName,
        deliveryLabel: preview.deliveryLabel,
        subtotalCents: preview.subtotalCents,
        shippingCents: preview.shippingCents,
        discountCents: preview.discountCents,
        totalCents: preview.totalCents,
        promoCode: preview.promoCode,
        hasStockIssues: preview.hasStockIssues,
      },
      items: preview.items.map(({ product: _p, ...item }) => item),
      cartItems: preview.items
        .filter((i) => i.product)
        .map((i) => ({
          product: i.product,
          quantity: i.inStock ? i.quantity : Math.min(i.quantity, i.available),
        })),
    });
  } catch (err) {
    console.error('Recovery preview error:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju' }, { status: 500 });
  }
}

/** Create Stripe session for direct payment (optional fast path) */
export async function POST(req: NextRequest) {
  const baseUrl = getSiteUrl();

  try {
    const { token } = (await req.json()) as { token?: string };

    if (!token) {
      return NextResponse.json({ error: 'Token nije naveden' }, { status: 400 });
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(
        'id, status, customer_email, customer_name, customer_phone, delivery_method, shipping_address, promo_code, notes, recovery_token'
      )
      .eq('recovery_token', token)
      .maybeSingle();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Neispravni ili istekli link za nastavak' }, { status: 404 });
    }

    if (order.status === 'paid' || order.status === 'completed') {
      return NextResponse.json({ redirect: `${baseUrl}/narudzba/${order.id}/uspjeh` });
    }

    if (order.status === 'cancelled') {
      return NextResponse.json({ error: 'Ova narudžba je otkazana i ne može se nastaviti' }, { status: 410 });
    }

    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('product_id, title, quantity, unit_price_cents')
      .eq('order_id', order.id);

    if (itemsError || !orderItems?.length) {
      return NextResponse.json({ error: 'Narudžba nema stavki' }, { status: 400 });
    }

    const productIds = orderItems.map((i) => i.product_id);
    const productMap = await getProductsByIds(productIds);
    const stockMap = await getProductQuantities(productIds);

    const resolvedItems = orderItems.map((item) => {
      const liveProduct = productMap.get(item.product_id);
      const livePriceCents = liveProduct
        ? parsePriceCents(liveProduct.price)
        : item.unit_price_cents;
      return {
        product_id: item.product_id,
        title: liveProduct?.title ?? item.title,
        quantity: item.quantity,
        priceCents: livePriceCents,
        available: stockMap.get(item.product_id) ?? 0,
      };
    });

    const outOfStock = resolvedItems.filter((i) => i.available < i.quantity);
    if (outOfStock.length > 0) {
      const names = outOfStock.map((i) => i.title).join(', ');
      return NextResponse.json(
        { error: `Nedovoljno zaliha za: ${names}. Pregledajte košaricu prije plaćanja.` },
        { status: 409 }
      );
    }

    const promo = resolvePromoCode(order.promo_code ?? undefined);
    const subtotalCents = resolvedItems.reduce((s, i) => s + i.priceCents * i.quantity, 0);
    const discountCents = promo ? calculateDiscountCents(subtotalCents, promo.percentOff) : 0;
    const shippingCents = calculateShippingCents(order.delivery_method as DeliveryMethod, subtotalCents);
    const totalCents = subtotalCents - discountCents + shippingCents;

    await supabase
      .from('orders')
      .update({
        subtotal_cents: subtotalCents,
        discount_cents: discountCents,
        shipping_cents: shippingCents,
        total_cents: totalCents,
        status: 'pending',
      })
      .eq('id', order.id);

    for (const item of resolvedItems) {
      await supabase
        .from('order_items')
        .update({ unit_price_cents: item.priceCents, title: item.title })
        .eq('order_id', order.id)
        .eq('product_id', item.product_id);
    }

    const shippingOption = getShippingOption(order.delivery_method as DeliveryMethod);
    const stripeLineItems = resolvedItems.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.title,
          metadata: { product_id: item.product_id },
        },
        unit_amount: item.priceCents,
      },
      quantity: item.quantity,
    }));

    if (shippingCents > 0) {
      stripeLineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Dostava - ${shippingOption.label}`,
            metadata: { product_id: 'shipping' },
          },
          unit_amount: shippingCents,
        },
        quantity: 1,
      });
    }

    let stripeDiscounts: { coupon: string }[] | undefined;
    if (discountCents > 0 && promo) {
      const coupon = await stripe.coupons.create({
        amount_off: discountCents,
        currency: 'eur',
        duration: 'once',
        name: promo.code,
      });
      stripeDiscounts = [{ coupon: coupon.id }];
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      wallet_options: { link: { display: 'never' } },
      customer_email: order.customer_email,
      line_items: stripeLineItems,
      ...(stripeDiscounts ? { discounts: stripeDiscounts } : {}),
      success_url: `${baseUrl}/narudzba/${order.id}/uspjeh?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/nastavi?token=${encodeURIComponent(token)}`,
      metadata: {
        order_id: order.id,
        delivery_method: order.delivery_method,
        ...(promo ? { promo_code: promo.code } : {}),
      },
      payment_intent_data: { metadata: { order_id: order.id } },
      locale: 'hr',
      phone_number_collection: { enabled: false },
    });

    await supabase
      .from('orders')
      .update({
        status: 'abandoned',
        stripe_session_id: session.id,
        recovered_at: new Date().toISOString(),
        abandoned_at: new Date().toISOString(),
      })
      .eq('id', order.id);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Recovery checkout error:', err);
    const message = err instanceof Error ? err.message : 'Interna greška servera';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
