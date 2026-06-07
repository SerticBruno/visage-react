import 'server-only';

import { supabase } from '@/lib/supabase';

export const ABANDONED_CART_EVENT_TYPES = [
  'email_sent',
  'recovery_link_opened',
  'recovery_checkout_started',
  'recovery_paid',
] as const;

export type AbandonedCartEventType = (typeof ABANDONED_CART_EVENT_TYPES)[number];

export type RecoveryFunnelStats = {
  emailsSent: number;
  linkOpened: number;
  checkoutStarted: number;
  converted: number;
  conversionRate: number | null;
};

export type OrderRecoveryTracking = {
  lastEmailSentAt: string | null;
  linkOpenedAt: string | null;
  checkoutStartedAt: string | null;
  convertedAt: string | null;
  stage: 'none' | 'email_sent' | 'link_opened' | 'checkout_started' | 'converted';
};

/** Fire-and-forget audit log for abandoned cart recovery funnel. */
export async function logAbandonedCartEvent(
  orderId: string,
  eventType: AbandonedCartEventType
): Promise<void> {
  const { error } = await supabase.from('abandoned_cart_events').insert({
    order_id: orderId,
    event_type: eventType,
    occurred_at: new Date().toISOString(),
  });

  if (error) {
    console.error(`abandoned_cart_events insert (${eventType}):`, error.message);
  }
}

/**
 * Marks recovery conversion when order was paid after a reminder email was sent.
 */
export async function markRecoveryConversionIfEligible(
  orderId: string,
  paidAt: string
): Promise<boolean> {
  const { data: email, error: emailError } = await supabase
    .from('abandoned_cart_emails')
    .select('sent_at')
    .eq('order_id', orderId)
    .order('sent_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (emailError || !email) return false;

  if (new Date(paidAt).getTime() <= new Date(email.sent_at).getTime()) {
    return false;
  }

  const { data: updated, error: updateError } = await supabase
    .from('orders')
    .update({ recovery_converted_at: paidAt })
    .eq('id', orderId)
    .is('recovery_converted_at', null)
    .select('id')
    .maybeSingle();

  if (updateError) {
    console.error('recovery_converted_at update:', updateError.message);
    return false;
  }

  if (!updated) return false;

  await logAbandonedCartEvent(orderId, 'recovery_paid');
  return true;
}

function uniqueOrderCount(rows: { order_id: string }[] | null): number {
  return new Set((rows ?? []).map((r) => r.order_id)).size;
}

export async function getRecoveryFunnelStats(): Promise<RecoveryFunnelStats> {
  const [
    { data: emailRows },
    { data: openedRows },
    { data: checkoutRows },
    { count: convertedCount },
  ] = await Promise.all([
    supabase.from('abandoned_cart_emails').select('order_id'),
    supabase
      .from('abandoned_cart_events')
      .select('order_id')
      .eq('event_type', 'recovery_link_opened'),
    supabase
      .from('abandoned_cart_events')
      .select('order_id')
      .eq('event_type', 'recovery_checkout_started'),
    supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .not('recovery_converted_at', 'is', null),
  ]);

  const emailsSent = uniqueOrderCount(emailRows);
  const linkOpened = uniqueOrderCount(openedRows);
  const checkoutStarted = uniqueOrderCount(checkoutRows);
  const converted = convertedCount ?? 0;
  const conversionRate =
    emailsSent > 0 ? Math.round((converted / emailsSent) * 1000) / 10 : null;

  return {
    emailsSent,
    linkOpened,
    checkoutStarted,
    converted,
    conversionRate,
  };
}

function resolveRecoveryStage(input: {
  convertedAt: string | null;
  checkoutStartedAt: string | null;
  linkOpenedAt: string | null;
  lastEmailSentAt: string | null;
}): OrderRecoveryTracking['stage'] {
  if (input.convertedAt) return 'converted';
  if (input.checkoutStartedAt) return 'checkout_started';
  if (input.linkOpenedAt) return 'link_opened';
  if (input.lastEmailSentAt) return 'email_sent';
  return 'none';
}

export async function getRecoveryTrackingByOrderIds(
  orderIds: string[]
): Promise<Map<string, OrderRecoveryTracking>> {
  const result = new Map<string, OrderRecoveryTracking>();
  if (!orderIds.length) return result;

  const [
    { data: emails },
    { data: events },
    { data: orders },
  ] = await Promise.all([
    supabase
      .from('abandoned_cart_emails')
      .select('order_id, sent_at')
      .in('order_id', orderIds)
      .order('sent_at', { ascending: false }),
    supabase
      .from('abandoned_cart_events')
      .select('order_id, event_type, occurred_at')
      .in('order_id', orderIds)
      .in('event_type', [
        'recovery_link_opened',
        'recovery_checkout_started',
        'recovery_paid',
      ]),
    supabase
      .from('orders')
      .select('id, recovered_at, recovery_converted_at')
      .in('id', orderIds),
  ]);

  for (const id of orderIds) {
    result.set(id, {
      lastEmailSentAt: null,
      linkOpenedAt: null,
      checkoutStartedAt: null,
      convertedAt: null,
      stage: 'none',
    });
  }

  for (const row of emails ?? []) {
    const current = result.get(row.order_id);
    if (!current || current.lastEmailSentAt) continue;
    current.lastEmailSentAt = row.sent_at;
  }

  for (const row of events ?? []) {
    const current = result.get(row.order_id);
    if (!current) continue;

    if (row.event_type === 'recovery_link_opened') {
      if (!current.linkOpenedAt || row.occurred_at < current.linkOpenedAt) {
        current.linkOpenedAt = row.occurred_at;
      }
    }
    if (row.event_type === 'recovery_checkout_started') {
      if (!current.checkoutStartedAt || row.occurred_at < current.checkoutStartedAt) {
        current.checkoutStartedAt = row.occurred_at;
      }
    }
    if (row.event_type === 'recovery_paid') {
      current.convertedAt = row.occurred_at;
    }
  }

  for (const row of orders ?? []) {
    const current = result.get(row.id);
    if (!current) continue;

    if (row.recovery_converted_at) {
      current.convertedAt = row.recovery_converted_at;
    }
    if (row.recovered_at) {
      if (!current.checkoutStartedAt || row.recovered_at < current.checkoutStartedAt) {
        current.checkoutStartedAt = row.recovered_at;
      }
    }
    current.stage = resolveRecoveryStage(current);
  }

  return result;
}

export async function getRecentRecoveryConversions(limit = 20) {
  const { data: orders, error } = await supabase
    .from('orders')
    .select(
      'id, customer_email, customer_name, total_cents, recovery_converted_at, paid_at, abandonment_email_count'
    )
    .not('recovery_converted_at', 'is', null)
    .order('recovery_converted_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (orders ?? []).map((o) => ({
    id: o.id,
    customerEmail: o.customer_email,
    customerName: o.customer_name,
    totalCents: o.total_cents,
    convertedAt: o.recovery_converted_at,
    paidAt: o.paid_at,
    emailsSent: o.abandonment_email_count ?? 0,
  }));
}
