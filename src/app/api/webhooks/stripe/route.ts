import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

export const config = {
  api: { bodyParser: false },
};

// Next.js App Router: disable body parsing so we can read raw bytes for Stripe signature verification
export async function POST(req: NextRequest) {
  const rawBody = await req.bytes();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (!orderId) {
      console.error('No order_id in session metadata');
      return NextResponse.json({ received: true });
    }

    // Fetch order items
    const { data: orderItems } = await supabase
      .from('order_items')
      .select('product_id, quantity')
      .eq('order_id', orderId);

    // Decrement stock atomically for each item
    if (orderItems) {
      for (const item of orderItems) {
        const { error } = await supabase.rpc('decrement_stock', {
          p_product_id: item.product_id,
          p_quantity: item.quantity,
        });
        if (error) {
          // Log but don't fail — stock may not be tracked for all products
          console.warn(`Stock decrement failed for ${item.product_id}:`, error.message);
        }
      }
    }

    // Mark order as paid
    const { data: order } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        stripe_session_id: session.id,
        paid_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .select()
      .single();

    // Send confirmation email
    if (order) {
      await sendConfirmationEmail(order, orderItems ?? []);
    }
  }

  return NextResponse.json({ received: true });
}

async function sendConfirmationEmail(
  order: Record<string, unknown>,
  items: { product_id: string; quantity: number }[]
) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const itemsHtml = items
      .map((i) => `<li>${i.product_id} × ${i.quantity}</li>`)
      .join('');

    const deliveryLabels: Record<string, string> = {
      boxnow: 'BoxNow paketomat',
      gls: 'GLS kućna dostava',
      pickup: 'Preuzimanje u studiju',
    };

    await transporter.sendMail({
      from: `VISAGE Studio <${process.env.GMAIL_USER}>`,
      to: order.customer_email as string,
      subject: `Potvrda narudžbe #${(order.id as string).slice(0, 8).toUpperCase()} — VISAGE Studio`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <h1 style="font-size: 22px; margin-bottom: 4px;">Hvala na narudžbi!</h1>
          <p style="color: #555;">Dragi/a ${order.customer_name},</p>
          <p style="color: #555;">Vaša narudžba je zaprimljena i plaćanje je potvrđeno.</p>
          
          <div style="background: #f9fafb; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0; font-weight: 600;">Narudžba #${(order.id as string).slice(0, 8).toUpperCase()}</p>
            <p style="margin: 0; color: #555; font-size: 14px;">Dostava: ${deliveryLabels[order.delivery_method as string] ?? order.delivery_method}</p>
          </div>

          <p style="font-size: 14px; color: #555;">Pripremamo vašu narudžbu. Obavijestit ćemo vas kada bude poslana.</p>
          <p style="font-size: 14px; color: #555;">Za sva pitanja kontaktirajte nas na <a href="mailto:info@visagestudio.hr">info@visagestudio.hr</a> ili +385 91 110 5020.</p>
          
          <p style="margin-top: 32px; color: #888; font-size: 13px;">S poštovanjem,<br>Tim VISAGE Studio</p>
        </div>
      `,
    });

    // Also notify the studio
    const studioRecipients = [
      process.env.GMAIL_USER,
      process.env.GMAIL_USER_2,
      process.env.GMAIL_USER_3,
    ].filter(Boolean);

    await transporter.sendMail({
      from: `VISAGE Studio <${process.env.GMAIL_USER}>`,
      to: studioRecipients as string[],
      subject: `Nova narudžba #${(order.id as string).slice(0, 8).toUpperCase()} — ${order.customer_name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2>Nova narudžba!</h2>
          <p><strong>Kupac:</strong> ${order.customer_name} (${order.customer_email})</p>
          <p><strong>Telefon:</strong> ${order.customer_phone ?? '—'}</p>
          <p><strong>Dostava:</strong> ${deliveryLabels[order.delivery_method as string] ?? order.delivery_method}</p>
          <p><strong>Adresa/Paketomat:</strong> ${JSON.stringify(order.shipping_address)}</p>
          <p><strong>Ukupno:</strong> ${((order.total_cents as number) / 100).toFixed(2)} EUR</p>
          <h3>Stavke:</h3>
          <ul>${itemsHtml}</ul>
          ${order.notes ? `<p><strong>Napomena:</strong> ${order.notes}</p>` : ''}
          <p>Order ID: ${order.id}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send confirmation email:', err);
  }
}
