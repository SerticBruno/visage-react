import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { getProductsByIds, getProductQuantities } from '@/lib/products-db';
import { parsePriceCents } from '@/lib/price-utils';
import { calculateShippingCents, getShippingOption, type DeliveryMethod } from '@/lib/shipping';
import { calculateDiscountCents, resolvePromoCode } from '@/lib/promo-codes';
import { getSiteUrl } from '@/lib/site-url';
import { getRecoveryPreview } from '@/lib/recovery-order';
import { logAbandonedCartEvent } from '@/lib/abandoned-cart-events';
import {
  isOrderReadyForDirectPayment,
  buildShippingAddress,
} from '@/lib/order-checkout-readiness';

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

    await logAbandonedCartEvent(preview.orderId, 'recovery_link_opened');

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
        needsCheckout: preview.needsCheckout,
      },
      checkoutPrefill: preview.checkoutPrefill,
      checkoutUrl: `${getSiteUrl()}/checkout?recover=${encodeURIComponent(token)}`,
      items: preview.items.map(
        ({ productId, title, quantity, unitPriceCents, lineTotalCents, image, available, inStock }) => ({
          productId,
          title,
          quantity,
          unitPriceCents,
          lineTotalCents,
          image,
          available,
          inStock,
        })
      ),
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

/** Create Stripe session for recovery, or redirect to checkout if data is incomplete */
export async function POST(req: NextRequest) {
  const baseUrl = getSiteUrl();

  try {
    const body = (await req.json()) as {
      token?: string;
      customer?: { name: string; email: string; phone: string };
      deliveryMethod?: DeliveryMethod;
      shippingAddress?: Record<string, string>;
      notes?: string;
      promoCode?: string;
    };
    const { token } = body;

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

    let activeOrder = order;

    if (body.customer) {
      const deliveryMethod = body.deliveryMethod ?? (order.delivery_method as DeliveryMethod);
      const promo = resolvePromoCode(body.promoCode ?? order.promo_code ?? undefined);
      const shippingAddress =
        body.shippingAddress ??
        buildShippingAddress(deliveryMethod, {
          street: str(order.shipping_address, 'street'),
          city: str(order.shipping_address, 'city'),
          zip: str(order.shipping_address, 'zip'),
          boxnowLockerId: str(order.shipping_address, 'locker_id'),
          boxnowLockerName: str(order.shipping_address, 'locker_name'),
          boxnowLockerAddress: str(order.shipping_address, 'locker_address'),
        });

      const { data: updated, error: updateCustomerError } = await supabase
        .from('orders')
        .update({
          customer_name: body.customer.name.trim(),
          customer_email: body.customer.email.toLowerCase().trim(),
          customer_phone: body.customer.phone.trim(),
          delivery_method: deliveryMethod,
          shipping_address: shippingAddress,
          notes: body.notes?.trim() || order.notes,
          promo_code: promo?.code ?? (body.promoCode?.trim() ? body.promoCode.trim() : order.promo_code),
        })
        .eq('id', order.id)
        .select(
          'id, status, customer_email, customer_name, customer_phone, delivery_method, shipping_address, promo_code, notes, recovery_token'
        )
        .single();

      if (updateCustomerError || !updated) {
        return NextResponse.json({ error: 'Greška pri spremanju podataka' }, { status: 500 });
      }

      activeOrder = updated;
    }

    if (!isOrderReadyForDirectPayment(activeOrder)) {
      return NextResponse.json({
        redirect: `${baseUrl}/checkout?recover=${encodeURIComponent(token)}`,
      });
    }

    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('product_id, title, quantity, unit_price_cents')
      .eq('order_id', activeOrder.id);

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

    const promo = resolvePromoCode(activeOrder.promo_code ?? undefined);
    const subtotalCents = resolvedItems.reduce((s, i) => s + i.priceCents * i.quantity, 0);
    const discountCents = promo ? calculateDiscountCents(subtotalCents, promo.percentOff) : 0;
    const shippingCents = calculateShippingCents(activeOrder.delivery_method as DeliveryMethod, subtotalCents);
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
      .eq('id', activeOrder.id);

    for (const item of resolvedItems) {
      await supabase
        .from('order_items')
        .update({ unit_price_cents: item.priceCents, title: item.title })
        .eq('order_id', activeOrder.id)
        .eq('product_id', item.product_id);
    }

    const shippingOption = getShippingOption(activeOrder.delivery_method as DeliveryMethod);
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
      customer_email: activeOrder.customer_email,
      line_items: stripeLineItems,
      ...(stripeDiscounts ? { discounts: stripeDiscounts } : {}),
      success_url: `${baseUrl}/narudzba/${activeOrder.id}/uspjeh?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/nastavi?token=${encodeURIComponent(token)}`,
      metadata: {
        order_id: activeOrder.id,
        delivery_method: activeOrder.delivery_method,
        ...(promo ? { promo_code: promo.code } : {}),
      },
      payment_intent_data: { metadata: { order_id: activeOrder.id } },
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
      .eq('id', activeOrder.id);

    await logAbandonedCartEvent(activeOrder.id, 'recovery_checkout_started');

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Recovery checkout error:', err);
    const message = err instanceof Error ? err.message : 'Interna greška servera';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function str(address: Record<string, unknown> | null, key: string): string {
  const value = address?.[key];
  return typeof value === 'string' ? value : '';
}
