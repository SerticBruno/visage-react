import { NextResponse } from 'next/server';
import { getConnection, isGoogleCalendarConnected } from '@/lib/google-calendar';

export async function GET() {
  try {
    const conn = await getConnection();
    return NextResponse.json({
      connected: isGoogleCalendarConnected(conn),
      calendar_id: conn?.calendar_id ?? null,
      watch_expiration: conn?.watch_expiration ?? null,
      has_refresh_token: Boolean(conn?.refresh_token),
    });
  } catch (err) {
    console.error('Google calendar status:', err);
    return NextResponse.json({ connected: false });
  }
}
