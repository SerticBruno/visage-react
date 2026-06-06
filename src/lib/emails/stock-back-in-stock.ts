type StockBackInStockEmailParams = {
  productTitle: string;
  productUrl: string;
};

export function buildStockBackInStockEmail({
  productTitle,
  productUrl,
}: StockBackInStockEmailParams): { subject: string; html: string } {
  const subject = `${productTitle} je opet na zalihama - VISAGE Studio`;

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <h1 style="font-size: 22px; margin-bottom: 4px;">Proizvod je opet dostupan!</h1>
      <p style="color: #555;">Dobar dan,</p>
      <p style="color: #555;">
        Proizvod <strong>${productTitle}</strong> ponovno je na zalihama u VISAGE Studio webshopu.
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
  `;

  return { subject, html };
}
