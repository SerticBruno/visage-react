import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { findTreatment, buildTreatmentSnapshot, computeEndsAt } from '@/lib/appointments';
import { syncAppointmentToGoogle } from '@/lib/google-calendar';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const clientId = searchParams.get('client_id');
    const status = searchParams.get('status');

    let query = supabase
      .from('appointments')
      .select(
        `id, client_id, treatment_id, treatment_title, price_cents, duration_minutes,
         starts_at, ends_at, status, notes, google_event_id, created_at, updated_at,
         clients (id, name, email, phone)`
      )
      .order('starts_at');

    if (from) query = query.gte('starts_at', from);
    if (to) query = query.lte('starts_at', to);
    if (clientId) query = query.eq('client_id', clientId);
    if (status) query = query.eq('status', status);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ appointments: data ?? [] });
  } catch (err) {
    console.error('Admin appointments list:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju termina' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      client_id,
      treatment_id,
      starts_at,
      notes,
      status = 'scheduled',
      price_cents_override,
    } = body;

    if (!client_id || !treatment_id || !starts_at) {
      return NextResponse.json(
        { error: 'Klijent, tretman i datum su obavezni' },
        { status: 400 }
      );
    }

    const treatment = findTreatment(treatment_id);
    if (!treatment) {
      return NextResponse.json({ error: 'Tretman nije pronađen' }, { status: 400 });
    }

    const snapshot = buildTreatmentSnapshot(treatment, price_cents_override);
    const ends_at = computeEndsAt(starts_at, snapshot.duration_minutes);

    const { data, error } = await supabase
      .from('appointments')
      .insert({
        client_id,
        starts_at,
        ends_at,
        notes: notes?.trim() || null,
        status,
        sync_source: 'admin',
        ...snapshot,
      })
      .select(`*, clients (id, name, email, phone)`)
      .single();

    if (error) {
      if (error.message?.includes('overlaps')) {
        return NextResponse.json(
          { error: 'Termin se preklapa s postojećim terminom' },
          { status: 409 }
        );
      }
      throw error;
    }

    // Push to Google Calendar if connected (fire and forget)
    syncAppointmentToGoogle(data).catch((e) =>
      console.error('Google sync failed (non-fatal):', e)
    );

    return NextResponse.json({ appointment: data }, { status: 201 });
  } catch (err) {
    console.error('Admin create appointment:', err);
    return NextResponse.json({ error: 'Greška pri kreiranju termina' }, { status: 500 });
  }
}
