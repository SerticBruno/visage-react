import { NextResponse } from 'next/server';
import { listPurchaseOrders } from '@/lib/supplier-purchase-orders';

export async function GET() {
  try {
    const orders = await listPurchaseOrders();
    return NextResponse.json({ orders });
  } catch (err) {
    console.error('Purchase orders list:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju narudžbenica' }, { status: 500 });
  }
}
