import { buildStockBackInStockEmail } from '@/lib/emails/stock-back-in-stock';
import { isResendConfigured, sendEmail } from '@/lib/email';
import { supabase } from '@/lib/supabase';
import { getSiteUrl } from '@/lib/site-url';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export async function subscribeToStockNotification(
  productId: string,
  email: string
): Promise<{ ok: true; alreadySubscribed: boolean } | { ok: false; error: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!isValidEmail(normalizedEmail)) {
    return { ok: false, error: 'Unesite ispravnu email adresu' };
  }

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id, title, quantity, published')
    .eq('id', productId)
    .maybeSingle();

  if (productError || !product) {
    return { ok: false, error: 'Proizvod nije pronađen' };
  }

  if (product.published === false) {
    return { ok: false, error: 'Proizvod trenutno nije dostupan' };
  }

  if ((product.quantity ?? 0) > 0) {
    return { ok: false, error: 'Proizvod je već na zalihama' };
  }

  const { error: insertError } = await supabase.from('stock_notifications').insert({
    product_id: productId,
    email: normalizedEmail,
  });

  if (insertError) {
    if (insertError.code === '23505') {
      return { ok: true, alreadySubscribed: true };
    }
    console.error('Stock notification subscribe:', insertError);
    return { ok: false, error: 'Greška pri spremanju prijave' };
  }

  return { ok: true, alreadySubscribed: false };
}

export async function notifyStockSubscribers(productId: string): Promise<void> {
  if (!isResendConfigured()) {
    console.warn('Stock notifications skipped: Resend not configured');
    return;
  }

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id, title, quantity, published')
    .eq('id', productId)
    .maybeSingle();

  if (productError || !product || (product.quantity ?? 0) <= 0 || product.published === false) {
    return;
  }

  const { data: subscriptions, error: subsError } = await supabase
    .from('stock_notifications')
    .select('id, email')
    .eq('product_id', productId)
    .is('notified_at', null);

  if (subsError || !subscriptions?.length) return;

  const productUrl = `${getSiteUrl()}/katalog?product=${encodeURIComponent(productId)}`;
  const { subject, html } = buildStockBackInStockEmail({
    productTitle: product.title,
    productUrl,
  });

  for (const sub of subscriptions) {
    try {
      await sendEmail({
        to: sub.email,
        subject,
        html,
      });

      await supabase
        .from('stock_notifications')
        .update({ notified_at: new Date().toISOString() })
        .eq('id', sub.id);
    } catch (err) {
      console.error(`Failed to send stock notification to ${sub.email}:`, err);
    }
  }
}
