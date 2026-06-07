import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { renewWatch, syncGoogleCalendar } from '@/lib/google-calendar';

/**
 * OAuth callback — Google redirects here with ?code=...
 * We exchange the code for tokens, store them, then start a watch.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  if (error || !code) {
    return NextResponse.redirect(`${siteUrl}/admin/postavke?google_error=${error ?? 'no_code'}`);
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_CALENDAR_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.redirect(`${siteUrl}/admin/postavke?google_error=missing_env`);
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
      console.error('Google token exchange failed:', text);
      return NextResponse.redirect(`${siteUrl}/admin/postavke?google_error=token_exchange`);
    }

    const tokens = await tokenRes.json();
    const expiry = new Date(Date.now() + (tokens.expires_in ?? 3600) * 1000).toISOString();

    const { data: existing, error: fetchError } = await supabase
      .from('google_calendar_connections')
      .select('id, refresh_token')
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      console.error('google_calendar_connections fetch:', fetchError);
      // PGRST205 = table not found — migration not applied
      if (fetchError.code === 'PGRST205' || fetchError.message?.includes('does not exist')) {
        return NextResponse.redirect(`${siteUrl}/admin/postavke?google_error=table_missing`);
      }
      throw fetchError;
    }

    const tokenUpdates: Record<string, string | null> = {
      access_token: tokens.access_token,
      token_expiry: expiry,
      sync_token: null,
    };

    // Google only returns refresh_token on first consent — never overwrite with null
    if (tokens.refresh_token) {
      tokenUpdates.refresh_token = tokens.refresh_token;
    }

    if (existing) {
      const { error: updateError } = await supabase
        .from('google_calendar_connections')
        .update(tokenUpdates)
        .eq('id', existing.id);

      if (updateError) {
        console.error('google_calendar_connections update:', updateError);
        throw updateError;
      }

      if (!tokens.refresh_token && !existing.refresh_token) {
        return NextResponse.redirect(`${siteUrl}/admin/postavke?google_error=no_refresh_token`);
      }
    } else {
      if (!tokens.refresh_token) {
        return NextResponse.redirect(`${siteUrl}/admin/postavke?google_error=no_refresh_token`);
      }

      const { error: insertError } = await supabase.from('google_calendar_connections').insert({
        ...tokenUpdates,
        refresh_token: tokens.refresh_token,
        calendar_id: 'primary',
      });

      if (insertError) {
        console.error('google_calendar_connections insert:', insertError);
        if (insertError.code === 'PGRST205' || insertError.message?.includes('does not exist')) {
          return NextResponse.redirect(`${siteUrl}/admin/postavke?google_error=table_missing`);
        }
        throw insertError;
      }
    }

    renewWatch().catch((e) => console.error('Watch setup failed (non-fatal):', e));
    syncGoogleCalendar().catch((e) => console.error('Initial Google sync failed (non-fatal):', e));

    return NextResponse.redirect(`${siteUrl}/admin/postavke?google_connected=1`);
  } catch (err) {
    console.error('Google OAuth callback error:', err);
    return NextResponse.redirect(`${siteUrl}/admin/postavke?google_error=callback_failed`);
  }
}
