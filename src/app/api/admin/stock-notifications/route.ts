import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export type AdminStockNotification = {
  id: string;
  email: string;
  productId: string;
  productTitle: string;
  productQuantity: number;
  createdAt: string;
  notifiedAt: string | null;
};

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('stock_notifications')
      .select(
        `
        id,
        email,
        product_id,
        created_at,
        notified_at,
        products ( title, quantity )
      `
      )
      .order('created_at', { ascending: false });

    if (error) throw error;

    const subscriptions: AdminStockNotification[] = (data ?? []).map((row) => {
      const product = (row.products as unknown) as { title: string; quantity: number } | null;
      return {
        id: row.id,
        email: row.email,
        productId: row.product_id,
        productTitle: product?.title ?? row.product_id,
        productQuantity: product?.quantity ?? 0,
        createdAt: row.created_at,
        notifiedAt: row.notified_at,
      };
    });

    const pendingCount = subscriptions.filter((s) => !s.notifiedAt).length;

    return NextResponse.json({ subscriptions, pendingCount });
  } catch (err) {
    console.error('Admin stock notifications list:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju pretplata' }, { status: 500 });
  }
}
