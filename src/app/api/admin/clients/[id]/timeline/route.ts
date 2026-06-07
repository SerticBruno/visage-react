import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch client first to get email for orders lookup
    const { data: client, error: clientErr } = await supabase
      .from('clients')
      .select('id, email')
      .eq('id', id)
      .single();

    if (clientErr || !client) {
      return NextResponse.json({ error: 'Klijent nije pronađen' }, { status: 404 });
    }

    // Fetch appointments for this client
    const { data: appointments, error: apptErr } = await supabase
      .from('appointments')
      .select(
        'id, treatment_title, price_cents, duration_minutes, starts_at, ends_at, status, notes, created_at'
      )
      .eq('client_id', id)
      .order('starts_at', { ascending: false });

    if (apptErr) throw apptErr;

    // Fetch webshop orders if client has an email
    let orders: unknown[] = [];
    if (client.email) {
      const { data: orderData, error: orderErr } = await supabase
        .from('orders')
        .select(
          'id, status, total_cents, subtotal_cents, shipping_cents, discount_cents, promo_code, created_at, paid_at'
        )
        .ilike('customer_email', client.email)
        .order('created_at', { ascending: false });

      if (orderErr) throw orderErr;
      orders = orderData ?? [];
    }

    const totalAppointmentsCents = (appointments ?? [])
      .filter((a) => a.status === 'completed')
      .reduce((sum, a) => sum + a.price_cents, 0);

    const totalOrdersCents = (orders as Array<{ total_cents: number; status: string }>)
      .filter((o) => !['pending', 'cancelled'].includes(o.status))
      .reduce((sum, o) => sum + o.total_cents, 0);

    return NextResponse.json({
      appointments: appointments ?? [],
      orders,
      stats: {
        totalAppointments: (appointments ?? []).length,
        completedAppointments: (appointments ?? []).filter((a) => a.status === 'completed').length,
        totalAppointmentsCents,
        totalOrdersCents,
        totalSpentCents: totalAppointmentsCents + totalOrdersCents,
      },
    });
  } catch (err) {
    console.error('Admin client timeline:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju timeline-a' }, { status: 500 });
  }
}
