import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getSiteUrl } from '@/lib/site-url';

/**
 * GET /api/unsubscribe?token=<recovery_token>
 *
 * Cancels any future abandoned-cart recovery emails for this order
 * by setting abandonment_email_count to the max value.
 * Redirects to a confirmation page.
 */
export async function GET(req: NextRequest) {
  const baseUrl = getSiteUrl();
  const token = req.nextUrl.searchParams.get('token');

  const confirmUrl = `${baseUrl}/odjava-podsjetnik`;

  if (!token) {
    return NextResponse.redirect(confirmUrl);
  }

  // Mark the order so no more recovery emails are sent
  await supabase
    .from('orders')
    .update({ abandonment_email_count: 99 })
    .eq('recovery_token', token);

  // Also expire the cart snapshot (Faza 2)
  await supabase
    .from('cart_snapshots')
    .update({ status: 'expired' })
    .eq('recovery_token', token)
    .eq('status', 'active');

  return NextResponse.redirect(confirmUrl);
}
