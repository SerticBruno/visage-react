import { NextRequest, NextResponse } from 'next/server';
import { businessData } from '@/data/business';
import { createMailTransporter, isEmailConfigured } from '@/lib/email';
import { rowToProduct, type DbProductRow } from '@/lib/products-db';
import {
  buildSupplierOrderEmail,
  groupOrderLinesBySupplier,
  type GeneratedSupplierEmail,
  type SupplierOrderLine,
} from '@/lib/supplier-order-email';
import { createPurchaseOrdersFromGroups } from '@/lib/supplier-purchase-orders';
import { parseSuppliersConfig } from '@/lib/suppliers';
import { supabase } from '@/lib/supabase';

type OrderItemInput = { productId: string; orderQuantity: number };

function parseOrderItems(body: unknown): OrderItemInput[] | null {
  if (!body || typeof body !== 'object') return null;
  const items = (body as { items?: unknown }).items;
  if (!Array.isArray(items) || items.length === 0) return null;

  const parsed: OrderItemInput[] = [];
  for (const entry of items) {
    if (!entry || typeof entry !== 'object') return null;
    const row = entry as Record<string, unknown>;
    const productId = typeof row.productId === 'string' ? row.productId.trim() : '';
    const orderQuantity = Number(row.orderQuantity);
    if (!productId || !Number.isFinite(orderQuantity) || orderQuantity < 1) return null;
    parsed.push({ productId, orderQuantity: Math.floor(orderQuantity) });
  }

  return parsed;
}

async function buildOrderGroups(items: OrderItemInput[]) {
  const ids = [...new Set(items.map((i) => i.productId))];
  const { data, error } = await supabase.from('products').select('*').in('id', ids);
  if (error) throw error;

  const productMap = new Map(
    ((data ?? []) as DbProductRow[]).map((row) => [row.id, rowToProduct(row)])
  );

  const lines: SupplierOrderLine[] = [];
  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      return { error: `Proizvod ${item.productId} nije pronađen`, status: 404 as const };
    }

    lines.push({
      productId: product.id,
      title: product.title,
      marka: product.marka,
      sku: product.sku,
      volume: product.volume,
      orderQuantity: item.orderQuantity,
    });
  }

  return { groups: groupOrderLinesBySupplier(lines) };
}

function toGeneratedGroups(groups: ReturnType<typeof groupOrderLinesBySupplier>) {
  return groups.filter((g): g is GeneratedSupplierEmail => !g.missingSupplier);
}

export async function GET() {
  const suppliers = parseSuppliersConfig().map(({ marka, name, email, contactName }) => ({
    marka,
    name,
    email,
    contactName: contactName ?? null,
  }));

  return NextResponse.json({
    suppliers,
    emailConfigured: isEmailConfigured(),
    senderEmail: process.env.GMAIL_USER ?? null,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body?.action === 'send' ? 'send' : body?.action === 'create' ? 'create' : 'preview';
    const items = parseOrderItems(body);

    if (!items) {
      return NextResponse.json(
        { error: 'Odaberite barem jedan proizvod s količinom većom od 0' },
        { status: 400 }
      );
    }

    const built = await buildOrderGroups(items);
    if ('error' in built) {
      return NextResponse.json({ error: built.error }, { status: built.status });
    }

    const { groups } = built;

    if (action === 'preview') {
      return NextResponse.json({
        groups: groups.map((group) => {
          if (group.missingSupplier) {
            return {
              missingSupplier: true,
              marka: group.marka,
              items: group.items,
            };
          }

          return {
            missingSupplier: false,
            supplier: group.supplier,
            to: group.to,
            subject: group.subject,
            bodyText: group.bodyText,
            bodyHtml: group.bodyHtml,
            items: group.items,
          };
        }),
      });
    }

    const validGroups = toGeneratedGroups(groups);
    if (validGroups.length === 0) {
      return NextResponse.json(
        { error: 'Nijedan odabran proizvod nema konfiguriranog dobavljača' },
        { status: 400 }
      );
    }

    if (action === 'send') {
      const missing = groups.filter((g) => g.missingSupplier);
      if (missing.length > 0) {
        const marks = missing.map((g) => g.marka).join(', ');
        return NextResponse.json(
          { error: `Nedostaje email dobavljača za marke: ${marks}` },
          { status: 400 }
        );
      }

      if (!isEmailConfigured()) {
        return NextResponse.json(
          { error: 'Gmail nije konfiguriran (GMAIL_USER, GMAIL_APP_PASSWORD)' },
          { status: 503 }
        );
      }

      const transporter = createMailTransporter();
      const from = `${businessData.name} <${process.env.GMAIL_USER}>`;
      const sentAt = new Date().toISOString();
      const sent: { to: string; subject: string }[] = [];

      for (const group of validGroups) {
        const { subject, bodyText, bodyHtml } = buildSupplierOrderEmail(group.supplier, group.items);

        await transporter.sendMail({
          from,
          to: group.to,
          subject,
          text: bodyText,
          html: bodyHtml,
        });

        sent.push({ to: group.to, subject });
      }

      const { orders } = await createPurchaseOrdersFromGroups(validGroups, {
        emailSentAt: sentAt,
      });

      const skippedMarkas = groups
        .filter((g) => g.missingSupplier)
        .map((g) => g.marka);

      return NextResponse.json({
        ok: true,
        sent,
        orders,
        skippedMarkas,
      });
    }

    const { orders } = await createPurchaseOrdersFromGroups(validGroups);
    const skippedMarkas = groups.filter((g) => g.missingSupplier).map((g) => g.marka);
    return NextResponse.json({
      ok: true,
      orders,
      skippedMarkas,
    });
  } catch (err) {
    console.error('Supplier order email:', err);
    return NextResponse.json({ error: 'Greška pri generiranju ili slanju maila' }, { status: 500 });
  }
}
