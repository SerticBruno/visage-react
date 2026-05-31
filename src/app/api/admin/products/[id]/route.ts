import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { productToRow, rowToProduct, type ProductInput } from '@/lib/products-db';
import { notifyStockSubscribers } from '@/lib/stock-notifications';
import type { Product } from '@/data/products';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'Proizvod nije pronađen' }, { status: 404 });
  }

  return NextResponse.json({
    product: { ...rowToProduct(data), quantity: data.quantity, published: data.published },
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const {
      quantity,
      published,
      ...productFields
    }: Partial<Product> & { quantity?: number; published?: boolean } = body;

    const { data: existing, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (fetchError || !existing) {
      return NextResponse.json({ error: 'Proizvod nije pronađen' }, { status: 404 });
    }

    const merged = {
      ...rowToProduct(existing),
      ...productFields,
      id,
    };

    const row = productToRow(
      merged as ProductInput & { id: string },
      quantity !== undefined ? Math.max(0, Number(quantity) || 0) : existing.quantity,
      published !== undefined ? !!published : existing.published
    );

    const { data, error } = await supabase
      .from('products')
      .update({ ...row, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    const previousQty = existing.quantity ?? 0;
    const newQty = data.quantity ?? 0;
    if (previousQty <= 0 && newQty > 0) {
      notifyStockSubscribers(id).catch((err) =>
        console.error('Stock notification dispatch failed:', err)
      );
    }

    return NextResponse.json({
      product: { ...rowToProduct(data), quantity: data.quantity, published: data.published },
    });
  } catch (err) {
    console.error('Admin product update:', err);
    return NextResponse.json({ error: 'Greška pri spremanju proizvoda' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
