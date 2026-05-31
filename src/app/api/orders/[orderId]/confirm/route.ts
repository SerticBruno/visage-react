import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { fulfillOrder } from '@/lib/order-fulfillment';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  try {
    const body = await req.json();
    const sessionId = body?.session_id as string | undefined;

    if (!sessionId?.trim()) {
      return NextResponse.json({ error: 'Nedostaje session_id' }, { status: 400 });
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, status, stripe_session_id')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Narudžba nije pronađena' }, { status: 404 });
    }

    if (
      order.stripe_session_id &&
      order.stripe_session_id !== sessionId
    ) {
      return NextResponse.json({ error: 'Neispravna Stripe sesija' }, { status: 403 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.metadata?.order_id !== orderId) {
      return NextResponse.json({ error: 'Neispravna Stripe sesija' }, { status: 403 });
    }

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Plaćanje još nije potvrđeno' },
        { status: 402 }
      );
    }

    const result = await fulfillOrder(orderId, { stripeSessionId: sessionId });

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error('Order confirm error:', err);
    const message = err instanceof Error ? err.message : 'Greška pri potvrdi narudžbe';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
