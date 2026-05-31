import { NextRequest, NextResponse } from 'next/server';
import { subscribeToStockNotification } from '@/lib/stock-notifications';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productId = typeof body.productId === 'string' ? body.productId.trim() : '';
    const email = typeof body.email === 'string' ? body.email : '';

    if (!productId) {
      return NextResponse.json({ error: 'Proizvod nije naveden' }, { status: 400 });
    }

    if (!email.trim()) {
      return NextResponse.json({ error: 'Email adresa je obavezna' }, { status: 400 });
    }

    const result = await subscribeToStockNotification(productId, email);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      message: result.alreadySubscribed
        ? 'Već ste prijavljeni za obavijest za ovaj proizvod.'
        : 'Obavijestit ćemo vas čim proizvod bude opet na zalihama.',
    });
  } catch (err) {
    console.error('Stock notification subscribe API:', err);
    return NextResponse.json({ error: 'Greška pri prijavi' }, { status: 500 });
  }
}
