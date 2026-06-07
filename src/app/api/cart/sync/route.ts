import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { supabase } from '@/lib/supabase';
import { parsePriceCents } from '@/lib/price-utils';

interface SyncItem {
  productId: string;
  title: string;
  quantity: number;
  price: string;
}

interface SyncBody {
  visitorToken: string;
  items: SyncItem[];
  subtotalCents?: number;
  customerEmail?: string;
  customerName?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as SyncBody;
    const { visitorToken, items, customerEmail, customerName } = body;

    if (!visitorToken) {
      return NextResponse.json({ error: 'visitorToken je obavezan' }, { status: 400 });
    }

    // Empty cart — mark active snapshot as expired
    if (!items?.length) {
      await supabase
        .from('cart_snapshots')
        .update({ status: 'expired' })
        .eq('visitor_token', visitorToken)
        .eq('status', 'active');

      return NextResponse.json({ ok: true });
    }

    const subtotalCents = items.reduce(
      (sum, i) => sum + parsePriceCents(i.price) * i.quantity,
      0
    );

    const snapshotItems = items.map((i) => ({
      product_id: i.productId,
      title: i.title,
      quantity: i.quantity,
      unit_price_cents: parsePriceCents(i.price),
    }));

    // Upsert: one active snapshot per visitor_token
    const { data: existing } = await supabase
      .from('cart_snapshots')
      .select('id, recovery_token')
      .eq('visitor_token', visitorToken)
      .eq('status', 'active')
      .maybeSingle();

    if (existing) {
      await supabase
        .from('cart_snapshots')
        .update({
          items: snapshotItems,
          subtotal_cents: subtotalCents,
          last_activity_at: new Date().toISOString(),
          ...(customerEmail ? { customer_email: customerEmail.toLowerCase().trim() } : {}),
          ...(customerName ? { customer_name: customerName } : {}),
        })
        .eq('id', existing.id);
    } else {
      await supabase.from('cart_snapshots').insert({
        visitor_token: visitorToken,
        items: snapshotItems,
        subtotal_cents: subtotalCents,
        last_activity_at: new Date().toISOString(),
        recovery_token: randomUUID(),
        status: 'active',
        ...(customerEmail ? { customer_email: customerEmail.toLowerCase().trim() } : {}),
        ...(customerName ? { customer_name: customerName } : {}),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Cart sync error:', err);
    return NextResponse.json({ error: 'Sync nije uspio' }, { status: 500 });
  }
}
