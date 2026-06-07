import { NextResponse } from 'next/server';
import { syncGoogleCalendar, isGoogleCalendarConnected, getConnection } from '@/lib/google-calendar';

export async function POST() {
  try {
    const conn = await getConnection();
    if (!isGoogleCalendarConnected(conn)) {
      return NextResponse.json(
        { error: 'Google Calendar nije spojen' },
        { status: 400 }
      );
    }

    const result = await syncGoogleCalendar();
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error('Google calendar sync:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Greška pri sinkronizaciji' },
      { status: 500 }
    );
  }
}
