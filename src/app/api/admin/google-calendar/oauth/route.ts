import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.readonly',
].join(' ');

/**
 * GET  — redirect to Google OAuth consent screen
 * POST — handle callback code exchange (called by /api/admin/google-calendar/callback)
 */
export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_CALENDAR_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: 'Google OAuth nije konfiguriran (GOOGLE_CLIENT_ID, GOOGLE_CALENDAR_REDIRECT_URI)' },
      { status: 500 }
    );
  }

  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', SCOPES);
  url.searchParams.set('access_type', 'offline');
  url.searchParams.set('prompt', 'consent'); // Force refresh_token issuance

  return NextResponse.redirect(url.toString());
}

export async function POST(req: Request) {
  try {
    const { code, calendar_id = 'primary' } = await req.json();
    if (!code) {
      return NextResponse.json({ error: 'Nema auth koda' }, { status: 400 });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_CALENDAR_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.json({ error: 'Google OAuth nije konfiguriran' }, { status: 500 });
    }

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      throw new Error(`Token exchange failed: ${text}`);
    }

    const tokens = await tokenRes.json();
    const expiry = new Date(Date.now() + (tokens.expires_in ?? 3600) * 1000).toISOString();

    // Upsert — only one connection row
    const { data: existing } = await supabase
      .from('google_calendar_connections')
      .select('id')
      .limit(1)
      .single();

    if (existing) {
      await supabase
        .from('google_calendar_connections')
        .update({
          refresh_token: tokens.refresh_token,
          access_token: tokens.access_token,
          token_expiry: expiry,
          calendar_id,
          sync_token: null,
        })
        .eq('id', existing.id);
    } else {
      await supabase.from('google_calendar_connections').insert({
        refresh_token: tokens.refresh_token,
        access_token: tokens.access_token,
        token_expiry: expiry,
        calendar_id,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Google OAuth callback:', err);
    return NextResponse.json({ error: 'OAuth greška' }, { status: 500 });
  }
}
