import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type CustomerAgg = {
  email: string;
  name: string;
  phone: string | null;
  orderCount: number;
  totalSpentCents: number;
  lastOrderAt: string;
};

export async function GET() {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('customer_email, customer_name, customer_phone, total_cents, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const byEmail = new Map<string, CustomerAgg>();

    for (const order of orders ?? []) {
      const email = order.customer_email.toLowerCase();
      const existing = byEmail.get(email);

      if (existing) {
        existing.orderCount += 1;
        existing.totalSpentCents += order.total_cents;
        if (order.created_at > existing.lastOrderAt) {
          existing.lastOrderAt = order.created_at;
          existing.name = order.customer_name;
          existing.phone = order.customer_phone;
        }
      } else {
        byEmail.set(email, {
          email: order.customer_email,
          name: order.customer_name,
          phone: order.customer_phone,
          orderCount: 1,
          totalSpentCents: order.total_cents,
          lastOrderAt: order.created_at,
        });
      }
    }

    const customers = [...byEmail.values()].sort(
      (a, b) => new Date(b.lastOrderAt).getTime() - new Date(a.lastOrderAt).getTime()
    );

    return NextResponse.json({ customers });
  } catch (err) {
    console.error('Admin customers list:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju kupaca' }, { status: 500 });
  }
}
