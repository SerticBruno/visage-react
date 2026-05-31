import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { productToRow, rowToProduct, type DbProductRow, type ProductInput } from '@/lib/products-db';
import type { Product } from '@/data/products';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('title', { ascending: true });

    if (error) throw error;

    return NextResponse.json({
      products: ((data ?? []) as DbProductRow[]).map((row) => ({
        ...rowToProduct(row),
        quantity: row.quantity,
        published: row.published,
      })),
    });
  } catch (err) {
    console.error('Admin products list:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju proizvoda' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      quantity = 0,
      published = true,
      ...productFields
    }: Product & { quantity?: number; published?: boolean } = body;

    if (!id?.trim() || !productFields.title?.trim()) {
      return NextResponse.json({ error: 'ID i naziv su obavezni' }, { status: 400 });
    }

    const row = productToRow(
      { id: id.trim(), ...(productFields as ProductInput) },
      Math.max(0, Number(quantity) || 0),
      !!published
    );

    const { data, error } = await supabase.from('products').insert(row).select().single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Proizvod s tim ID-om već postoji' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({
      product: { ...rowToProduct(data), quantity: data.quantity },
    });
  } catch (err) {
    console.error('Admin product create:', err);
    return NextResponse.json({ error: 'Greška pri dodavanju proizvoda' }, { status: 500 });
  }
}
