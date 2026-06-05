import { NextRequest, NextResponse } from 'next/server';
import {
  cancelPurchaseOrder,
  getPurchaseOrderById,
  receivePurchaseOrder,
} from '@/lib/supplier-purchase-orders';

function parseReceiveItems(body: unknown) {
  if (!body || typeof body !== 'object') return null;
  const items = (body as { items?: unknown }).items;
  if (!Array.isArray(items) || items.length === 0) return null;

  const parsed: { itemId: string; receivedQuantity: number }[] = [];
  for (const entry of items) {
    if (!entry || typeof entry !== 'object') return null;
    const row = entry as Record<string, unknown>;
    const itemId = typeof row.itemId === 'string' ? row.itemId.trim() : '';
    const receivedQuantity = Number(row.receivedQuantity);
    if (!itemId || !Number.isFinite(receivedQuantity) || receivedQuantity < 0) return null;
    parsed.push({ itemId, receivedQuantity: Math.floor(receivedQuantity) });
  }

  return parsed;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await getPurchaseOrderById(id);
    if (!order) {
      return NextResponse.json({ error: 'Narudžbenica nije pronađena' }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch (err) {
    console.error('Purchase order detail:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju narudžbenice' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const action = body?.action;

    if (action === 'cancel') {
      await cancelPurchaseOrder(id);
      const order = await getPurchaseOrderById(id);
      return NextResponse.json({ order });
    }

    if (action === 'receive') {
      const items = parseReceiveItems(body);
      if (!items) {
        return NextResponse.json(
          { error: 'Unesite primljene količine za sve stavke' },
          { status: 400 }
        );
      }

      const order = await receivePurchaseOrder(id, items);
      return NextResponse.json({ order });
    }

    return NextResponse.json({ error: 'Nepoznata akcija' }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Greška pri ažuriranju narudžbenice';
    console.error('Purchase order update:', err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
