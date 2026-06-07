import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.trim() ?? '';
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 200);

    let query = supabase
      .from('clients')
      .select('id, name, email, phone, notes, source, created_at, updated_at')
      .order('name');

    if (q) {
      // Supabase ilike filter across name/email/phone
      query = query.or(
        `name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`
      );
    }

    const { data, error } = await query.limit(limit);
    if (error) throw error;

    return NextResponse.json({ clients: data ?? [] });
  } catch (err) {
    console.error('Admin clients list:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju klijenata' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, notes, source = 'manual' } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Ime je obavezno' }, { status: 400 });
    }

    const emailNorm = email?.trim().toLowerCase() || null;

    const { data, error } = await supabase
      .from('clients')
      .insert({
        name: name.trim(),
        email: emailNorm,
        phone: phone?.trim() || null,
        notes: notes?.trim() || null,
        source,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Klijent s tim emailom već postoji' },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ client: data }, { status: 201 });
  } catch (err) {
    console.error('Admin create client:', err);
    return NextResponse.json({ error: 'Greška pri kreiranju klijenta' }, { status: 500 });
  }
}
