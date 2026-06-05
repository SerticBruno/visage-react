import { businessData } from '@/data/business';
import type { SupplierConfig } from '@/lib/suppliers';
import { getSuppliersMap } from '@/lib/suppliers';

export interface SupplierOrderLine {
  productId: string;
  title: string;
  marka: string;
  sku?: string;
  volume?: string;
  orderQuantity: number;
}

export interface GeneratedSupplierEmail {
  supplier: SupplierConfig;
  to: string;
  subject: string;
  bodyText: string;
  bodyHtml: string;
  items: SupplierOrderLine[];
  missingSupplier: false;
}

export interface UnassignedSupplierGroup {
  marka: string;
  items: SupplierOrderLine[];
  missingSupplier: true;
}

export type SupplierEmailGroup = GeneratedSupplierEmail | UnassignedSupplierGroup;

function formatLineItem(item: SupplierOrderLine, index: number): string {
  const parts = [`${index + 1}. ${item.title}`];
  if (item.sku) parts.push(`(šifra: ${item.sku})`);
  if (item.volume) parts.push(`(${item.volume})`);
  parts.push(`— ${item.orderQuantity} kom`);
  return parts.join(' ');
}

function buildGreeting(supplier: SupplierConfig): string {
  if (supplier.contactName) {
    return `Poštovani/a ${supplier.contactName},`;
  }
  return `Poštovani,`;
}

export function buildSupplierOrderEmail(
  supplier: SupplierConfig,
  items: SupplierOrderLine[]
): Pick<GeneratedSupplierEmail, 'subject' | 'bodyText' | 'bodyHtml'> {
  const subject = `Narudžba proizvoda — ${businessData.name}`;
  const greeting = buildGreeting(supplier);
  const lines = items.map((item, i) => formatLineItem(item, i));

  const bodyText = [
    greeting,
    '',
    'Molimo vas da nam dostavite sljedeće proizvode:',
    '',
    ...lines,
    '',
    'Hvala unaprijed.',
    businessData.name,
    businessData.email,
    businessData.telephone,
  ].join('\n');

  const listHtml = lines.map((line) => `<li style="margin-bottom: 6px;">${line}</li>`).join('');

  const bodyHtml = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.5;">
      <p>${greeting}</p>
      <p>Molimo vas da nam dostavite sljedeće proizvode:</p>
      <ol style="padding-left: 20px;">${listHtml}</ol>
      <p>Hvala unaprijed.<br/>
      <strong>${businessData.name}</strong><br/>
      <a href="mailto:${businessData.email}">${businessData.email}</a><br/>
      ${businessData.telephone}</p>
    </div>
  `.trim();

  return { subject, bodyText, bodyHtml };
}

export function groupOrderLinesBySupplier(lines: SupplierOrderLine[]): SupplierEmailGroup[] {
  const suppliersMap = getSuppliersMap();
  const byMarka = new Map<string, SupplierOrderLine[]>();

  for (const line of lines) {
    const key = line.marka.trim().toLowerCase();
    const bucket = byMarka.get(key) ?? [];
    bucket.push(line);
    byMarka.set(key, bucket);
  }

  const groups: SupplierEmailGroup[] = [];

  for (const [markaKey, items] of byMarka) {
    const supplier = suppliersMap.get(markaKey);
    if (!supplier) {
      groups.push({
        marka: items[0]?.marka ?? markaKey,
        items: items.sort((a, b) => a.title.localeCompare(b.title, 'hr')),
        missingSupplier: true,
      });
      continue;
    }

    const sorted = [...items].sort((a, b) => a.title.localeCompare(b.title, 'hr'));
    const { subject, bodyText, bodyHtml } = buildSupplierOrderEmail(supplier, sorted);

    groups.push({
      supplier,
      to: supplier.email,
      subject,
      bodyText,
      bodyHtml,
      items: sorted,
      missingSupplier: false,
    });
  }

  return groups.sort((a, b) => {
    const nameA = a.missingSupplier ? a.marka : a.supplier.name;
    const nameB = b.missingSupplier ? b.marka : b.supplier.name;
    return nameA.localeCompare(nameB, 'hr');
  });
}

export function buildMailtoUrl(to: string, subject: string, body: string): string {
  const params = new URLSearchParams();
  params.set('subject', subject);
  params.set('body', body);
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`;
}
