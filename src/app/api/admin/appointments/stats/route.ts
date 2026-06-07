import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)); // Monday
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();

    const [todayRes, weekRes, noShowRes] = await Promise.all([
      supabase
        .from('appointments')
        .select('id', { count: 'exact', head: true })
        .gte('starts_at', todayStart)
        .lt('starts_at', todayEnd)
        .not('status', 'in', '(cancelled,no_show)'),

      supabase
        .from('appointments')
        .select('id', { count: 'exact', head: true })
        .gte('starts_at', weekStart.toISOString())
        .lt('starts_at', weekEnd.toISOString())
        .not('status', 'in', '(cancelled,no_show)'),

      supabase
        .from('appointments')
        .select('id', { count: 'exact', head: true })
        .gte('starts_at', monthStart)
        .lt('starts_at', monthEnd)
        .eq('status', 'no_show'),
    ]);

    return NextResponse.json({
      today: todayRes.count ?? 0,
      thisWeek: weekRes.count ?? 0,
      noShowThisMonth: noShowRes.count ?? 0,
    });
  } catch (err) {
    console.error('Appointment stats:', err);
    return NextResponse.json({ error: 'Greška' }, { status: 500 });
  }
}
