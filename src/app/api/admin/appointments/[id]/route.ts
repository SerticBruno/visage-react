import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { findTreatment, buildTreatmentSnapshot, computeEndsAt } from '@/lib/appointments';
import { syncAppointmentToGoogle, deleteGoogleEvent } from '@/lib/google-calendar';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from('appointments')
      .select(`*, clients (id, name, email, phone)`)
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Termin nije pronađen' }, { status: 404 });
    }
    return NextResponse.json({ appointment: data });
  } catch (err) {
    console.error('Admin get appointment:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju termina' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { treatment_id, starts_at, price_cents_override, notes, status } = body;

    const updates: Record<string, unknown> = { sync_source: 'admin' };

    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes?.trim() || null;

    if (treatment_id || starts_at) {
      // If treatment or time changed, recalculate
      const { data: existing } = await supabase
        .from('appointments')
        .select('treatment_id, duration_minutes, starts_at')
        .eq('id', id)
        .single();

      const resolvedStartsAt = starts_at ?? existing?.starts_at;

      if (treatment_id) {
        const treatment = findTreatment(treatment_id);
        if (!treatment) {
          return NextResponse.json({ error: 'Tretman nije pronađen' }, { status: 400 });
        }
        Object.assign(updates, buildTreatmentSnapshot(treatment, price_cents_override));
      } else if (price_cents_override !== undefined) {
        updates.price_cents = price_cents_override;
      }

      const durationMinutes =
        (updates.duration_minutes as number | undefined) ?? existing?.duration_minutes ?? 60;

      if (resolvedStartsAt) {
        updates.starts_at = resolvedStartsAt;
        updates.ends_at = computeEndsAt(resolvedStartsAt, durationMinutes);
      }
    } else if (price_cents_override !== undefined) {
      updates.price_cents = price_cents_override;
    }

    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
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

    let googleSync: 'ok' | 'skipped' | 'failed' = 'skipped';
    try {
      await syncAppointmentToGoogle(data);
      googleSync = 'ok';
    } catch (syncErr) {
      googleSync = 'failed';
      console.error('Google sync on update failed:', syncErr);
    }

    return NextResponse.json({ appointment: data, googleSync });
  } catch (err) {
    console.error('Admin update appointment:', err);
    return NextResponse.json({ error: 'Greška pri ažuriranju termina' }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch before delete to get google_event_id
    const { data: appt } = await supabase
      .from('appointments')
      .select('google_event_id, google_calendar_id')
      .eq('id', id)
      .single();

    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) throw error;

    if (appt?.google_event_id) {
      deleteGoogleEvent(appt.google_event_id, appt.google_calendar_id ?? 'primary').catch(
        (e) => console.error('Google delete failed (non-fatal):', e)
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Admin delete appointment:', err);
    return NextResponse.json({ error: 'Greška pri brisanju termina' }, { status: 500 });
  }
}
