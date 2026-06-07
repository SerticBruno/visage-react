import 'server-only';

import { supabase } from '@/lib/supabase';
import { sendEmail, isResendConfigured } from '@/lib/email';
import { buildAbandonedCartEmail } from '@/lib/emails/abandoned-cart';
import { getSiteUrl } from '@/lib/site-url';
import { logAbandonedCartEvent } from '@/lib/abandoned-cart-events';

type OrderItemRow = {
  title: string;
  quantity: number;
  unit_price_cents: number;
};

/**
 * Sends a recovery email manually (called from admin panel on button click).
 */
export async function sendManualAbandonedCartReminder(orderId: string): Promise<void> {
  if (!isResendConfigured()) {
    throw new Error('Resend nije konfiguriran (RESEND_API_KEY nedostaje)');
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select(
      'id, customer_email, customer_name, total_cents, recovery_token, abandonment_email_count, status'
    )
    .eq('id', orderId)
    .single();

  if (error || !order) throw new Error('Narudžba nije pronađena');
  if (order.status !== 'abandoned' && order.status !== 'pending') {
    throw new Error('Narudžba nije napuštena košarica');
  }
  if (!order.recovery_token) throw new Error('Narudžba nema recovery token');

  const { data: items } = await supabase
    .from('order_items')
    .select('title, quantity, unit_price_cents')
    .eq('order_id', orderId);

  if (!items?.length) throw new Error('Narudžba nema stavki');

  const baseUrl = getSiteUrl();
  const recoveryUrl = `${baseUrl}/checkout/nastavi?token=${order.recovery_token}`;
  const unsubscribeUrl = `${baseUrl}/api/unsubscribe?token=${order.recovery_token}`;

  const { subject, html } = buildAbandonedCartEmail({
    customerName: order.customer_name,
    recoveryUrl,
    items: (items as OrderItemRow[]).map((i) => ({
      title: i.title,
      quantity: i.quantity,
      unitPriceCents: i.unit_price_cents,
    })),
    totalCents: order.total_cents,
    sequenceNumber: 1,
    unsubscribeUrl,
  });

  const { id: resendId } = await sendEmail({
    to: order.customer_email,
    subject,
    html,
  });

  // Log the sent email — upsert so re-sends overwrite the timestamp
  await supabase.from('abandoned_cart_emails').upsert(
    {
      order_id: orderId,
      sequence_number: 1,
      sent_at: new Date().toISOString(),
      resend_id: resendId,
    },
    { onConflict: 'order_id,sequence_number' }
  );

  await supabase
    .from('orders')
    .update({ abandonment_email_count: order.abandonment_email_count + 1 })
    .eq('id', orderId);

  await logAbandonedCartEvent(orderId, 'email_sent');
}
