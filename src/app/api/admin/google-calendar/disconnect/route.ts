import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    await supabase.from('google_calendar_connections').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Google disconnect:', err);
    return NextResponse.json({ error: 'Greška pri odspajanju' }, { status: 500 });
  }
}
