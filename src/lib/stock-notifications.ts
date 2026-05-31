import { supabase } from '@/lib/supabase';
import { createMailTransporter, isEmailConfigured } from '@/lib/email';
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
  if (!isEmailConfigured()) {
    console.warn('Stock notifications skipped: Gmail not configured');
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

  const transporter = createMailTransporter();
  const productUrl = `${getSiteUrl()}/katalog?product=${encodeURIComponent(productId)}`;
  const from = `VISAGE Studio <${process.env.GMAIL_USER}>`;

  for (const sub of subscriptions) {
    try {
      await transporter.sendMail({
        from,
        to: sub.email,
        subject: `${product.title} je opet na zalihama - VISAGE Studio`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
            <h1 style="font-size: 22px; margin-bottom: 4px;">Proizvod je opet dostupan!</h1>
            <p style="color: #555;">Dobar dan,</p>
            <p style="color: #555;">
              Proizvod <strong>${product.title}</strong> ponovno je na zalihama u VISAGE Studio webshopu.
            </p>
            <p style="margin: 24px 0;">
              <a href="${productUrl}" style="display: inline-block; background: #111827; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: 600;">
                Pogledaj proizvod
              </a>
            </p>
            <p style="font-size: 14px; color: #555;">
              Požurite — zalihe mogu biti ograničene.
            </p>
            <p style="font-size: 14px; color: #555;">
              Za pitanja pišite na <a href="mailto:info@visagestudio.hr">info@visagestudio.hr</a>.
            </p>
            <p style="margin-top: 32px; color: #888; font-size: 13px;">S poštovanjem,<br>Tim VISAGE Studio</p>
          </div>
        `,
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
