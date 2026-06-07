import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Klijent nije pronađen' }, { status: 404 });
    }

    return NextResponse.json({ client: data });
  } catch (err) {
    console.error('Admin get client:', err);
    return NextResponse.json({ error: 'Greška pri učitavanju klijenta' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, email, phone, notes } = body;

    const updates: Record<string, unknown> = {};
    if (name !== undefined) updates.name = name.trim();
    if (email !== undefined) updates.email = email?.trim().toLowerCase() || null;
    if (phone !== undefined) updates.phone = phone?.trim() || null;
    if (notes !== undefined) updates.notes = notes?.trim() || null;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'Nema podataka za ažuriranje' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
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

    return NextResponse.json({ client: data });
  } catch (err) {
    console.error('Admin update client:', err);
    return NextResponse.json({ error: 'Greška pri ažuriranju klijenta' }, { status: 500 });
  }
}
