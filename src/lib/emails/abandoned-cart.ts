type AbandonedCartItem = {
  title: string;
  quantity: number;
  unitPriceCents: number;
};

type AbandonedCartEmailParams = {
  customerName: string;
  recoveryUrl: string;
  items: AbandonedCartItem[];
  totalCents: number;
  sequenceNumber: 1 | 2;
  unsubscribeUrl: string;
};

function formatEur(cents: number): string {
  return (cents / 100).toLocaleString('hr-HR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  });
}

export function buildAbandonedCartEmail({
  customerName,
  recoveryUrl,
  items,
  totalCents,
  sequenceNumber,
  unsubscribeUrl,
}: AbandonedCartEmailParams): { subject: string; html: string } {
  const firstName = customerName.split(' ')[0];

  const subject =
    sequenceNumber === 1
      ? `${firstName}, zaboravili ste nešto u košarici – VISAGE Studio`
      : `Vaša VISAGE košarica još uvijek čeka`;

  const headingText =
    sequenceNumber === 1
      ? 'Niste dovršili narudžbu'
      : 'Vaša košarica još čeka na vas';

  const bodyText =
    sequenceNumber === 1
      ? `Primijetili smo da niste dovršili narudžbu. Vaši odabrani proizvodi su još dostupni — kliknite gumb ispod da nastavite tamo gdje ste stali.`
      : `Ovo je posljednji podsjetnik — zalihe se popunjavaju brzo i ne možemo garantirati dostupnost. Kliknite gumb ispod i dovršite narudžbu.`;

  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 14px;">
            ${item.title}
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #555; font-size: 14px; white-space: nowrap;">
            ${item.quantity} × ${formatEur(item.unitPriceCents)}
          </td>
        </tr>`
    )
    .join('');

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <h1 style="font-size: 22px; margin-bottom: 4px;">${headingText}</h1>
      <p style="color: #555;">Dragi/a ${firstName},</p>
      <p style="color: #555; line-height: 1.6;">${bodyText}</p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td style="padding-top: 12px; font-weight: 600; font-size: 15px;">Ukupno</td>
            <td style="padding-top: 12px; text-align: right; font-weight: 600; font-size: 15px; white-space: nowrap;">
              ${formatEur(totalCents)}
            </td>
          </tr>
        </tfoot>
      </table>

      <p style="margin: 28px 0;">
        <a
          href="${recoveryUrl}"
          style="display: inline-block; background: #111827; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;"
        >
          Nastavi s narudžbom
        </a>
      </p>

      <p style="font-size: 13px; color: #888; margin-top: 8px;">
        Link za nastavak narudžbe vrijedi 7 dana.
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />

      <p style="font-size: 13px; color: #888;">
        Primili ste ovaj email jer ste započeli narudžbu na VISAGE Studio webshopu.
        Za pitanja pišite na
        <a href="mailto:info@visagestudio.hr" style="color: #555;">info@visagestudio.hr</a>.
      </p>
      <p style="font-size: 12px; color: #aaa; margin-top: 8px;">
        <a href="${unsubscribeUrl}" style="color: #aaa;">Odjavi se od podsjetnika o košarici</a>
      </p>
    </div>
  `;

  return { subject, html };
}
