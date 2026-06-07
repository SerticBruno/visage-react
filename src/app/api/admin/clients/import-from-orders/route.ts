import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * POST /api/admin/clients/import-from-orders
 * One-time (idempotent) import of existing order customers into the clients table.
 * Safe to call multiple times — uses email uniqueness to skip existing records.
 */
export async function POST() {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('customer_email, customer_name, customer_phone, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Deduplicate by email (keep most recent name/phone per email)
    const byEmail = new Map<
      string,
      { name: string; phone: string | null }
    >();

    for (const order of orders ?? []) {
      const email = order.customer_email.toLowerCase().trim();
      if (!byEmail.has(email)) {
        byEmail.set(email, {
          name: order.customer_name,
          phone: order.customer_phone ?? null,
        });
      }
    }

    let imported = 0;
    let skipped = 0;

    for (const [email, { name, phone }] of byEmail) {
      const { error: insertErr } = await supabase.from('clients').insert({
        name,
        email,
        phone,
        source: 'order_import',
      });

      if (insertErr) {
        if (insertErr.code === '23505') {
          skipped++;
        } else {
          throw insertErr;
        }
      } else {
        imported++;
      }
    }

    return NextResponse.json({
      ok: true,
      imported,
      skipped,
      total: byEmail.size,
    });
  } catch (err) {
    console.error('Import clients from orders:', err);
    return NextResponse.json({ error: 'Greška pri importu klijenata' }, { status: 500 });
  }
}
