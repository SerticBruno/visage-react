import { NextRequest, NextResponse } from 'next/server';
import { sendManualAbandonedCartReminder } from '@/lib/abandoned-cart';

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json() as { orderId?: string };

    if (!orderId) {
      return NextResponse.json({ error: 'orderId je obavezan' }, { status: 400 });
    }

    await sendManualAbandonedCartReminder(orderId);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Greška pri slanju podsjetnika';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
