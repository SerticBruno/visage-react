import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { parsePriceCents } from '@/lib/price-utils';
import { getShippingOption, DeliveryMethod } from '@/lib/shipping';
import { products } from '@/data/products';
import { getSiteUrl } from '@/lib/site-url';

interface LineItemRequest {
  productId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const baseUrl = getSiteUrl();

  try {
    const body = await req.json();
    const {
      items,
      customer,
      deliveryMethod,
      shippingAddress,
      notes,
    }: {
      items: LineItemRequest[];
      customer: { name: string; email: string; phone: string };
      deliveryMethod: DeliveryMethod;
      shippingAddress: Record<string, string>;
      notes?: string;
    } = body;

    if (!items?.length) {
      return NextResponse.json({ error: 'Košarica je prazna' }, { status: 400 });
    }

    const shippingOption = getShippingOption(deliveryMethod);

    // Resolve products server-side — never trust client-provided prices
    const resolvedItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Proizvod nije pronađen: ${item.productId}`);
      return {
        product,
        quantity: item.quantity,
        priceCents: parsePriceCents(product.price),
      };
    });

    const subtotalCents = resolvedItems.reduce(
      (sum, i) => sum + i.priceCents * i.quantity,
      0
    );
    const totalCents = subtotalCents + shippingOption.priceCents;

    // Check stock
    const { data: stockRows } = await supabase
      .from('product_stock')
      .select('product_id, quantity')
      .in(
        'product_id',
        resolvedItems.map((i) => i.product.id)
      );

    if (stockRows) {
      for (const item of resolvedItems) {
        const stock = stockRows.find((r) => r.product_id === item.product.id);
        if (stock && stock.quantity < item.quantity) {
          return NextResponse.json(
            { error: `Nedovoljno zaliha za: ${item.product.title}` },
            { status: 400 }
          );
        }
      }
    }

    // Create pending order in DB
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        status: 'pending',
        delivery_method: deliveryMethod,
        customer_email: customer.email,
        customer_name: customer.name,
        customer_phone: customer.phone,
        shipping_address: shippingAddress,
        subtotal_cents: subtotalCents,
        shipping_cents: shippingOption.priceCents,
        total_cents: totalCents,
        notes: notes ?? null,
      })
      .select('id')
      .single();

    if (orderError || !order) {
      console.error('Order insert error:', orderError);
      return NextResponse.json({ error: 'Greška pri kreiranju narudžbe' }, { status: 500 });
    }

    // Insert order items
    await supabase.from('order_items').insert(
      resolvedItems.map((i) => ({
        order_id: order.id,
        product_id: i.product.id,
        title: i.product.title,
        quantity: i.quantity,
        unit_price_cents: i.priceCents,
      }))
    );

    // Build Stripe line items
    const stripeLineItems = resolvedItems.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.product.title,
          description: item.product.volume ?? undefined,
          images: item.product.image.startsWith('/')
            ? [`${baseUrl}${item.product.image}`]
            : [item.product.image],
          metadata: { product_id: item.product.id },
        },
        unit_amount: item.priceCents,
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item if applicable
    if (shippingOption.priceCents > 0) {
      stripeLineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Dostava — ${shippingOption.label}`,
            description: shippingOption.estimatedDays,
            images: [],
            metadata: {},
          },
          unit_amount: shippingOption.priceCents,
        },
        quantity: 1,
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: customer.email,
      line_items: stripeLineItems,
      success_url: `${baseUrl}/narudzba/${order.id}/uspjeh?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      metadata: {
        order_id: order.id,
        delivery_method: deliveryMethod,
      },
      payment_intent_data: {
        metadata: { order_id: order.id },
      },
      locale: 'hr',
      phone_number_collection: { enabled: false },
    });

    // Save stripe session id on order
    await supabase
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout session error:', err);
    const message = err instanceof Error ? err.message : 'Interna greška servera';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
