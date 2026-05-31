import { NextResponse } from 'next/server';
import { getCatalogProducts } from '@/lib/products-db';

export const revalidate = 60;

export async function GET() {
  try {
    const products = await getCatalogProducts();
    return NextResponse.json({ products });
  } catch (err) {
    console.error('Public products API:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju kataloga' }, { status: 500 });
  }
}
