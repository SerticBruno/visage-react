/**
 * Google Calendar integration helpers.
 * OAuth flow, push sync (admin → Google), and pull sync (Google → admin).
 */

import { supabase } from '@/lib/supabase';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface GoogleTokens {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
}

export interface GCalEvent {
  id: string;
  summary?: string;
  description?: string;
  start: { dateTime?: string; date?: string; timeZone?: string };
  end: { dateTime?: string; date?: string; timeZone?: string };
  status?: string;
  extendedProperties?: {
    private?: Record<string, string>;
  };
  updated?: string;
  etag?: string;
}

export type GoogleSyncResult = {
  imported: number;
  updated: number;
  cancelled: number;
  skipped: number;
};

const GOOGLE_IMPORT_TREATMENT_ID = 'google-import';

// ─── Token management ────────────────────────────────────────────────────────

function googleOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

export async function getConnection() {
  const { data, error } = await supabase
    .from('google_calendar_connections')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('getConnection:', error.message, error.code);
    return null;
  }
  return data;
}

export function isGoogleCalendarConnected(
  conn: Awaited<ReturnType<typeof getConnection>>
): boolean {
  if (!conn) return false;
  if (conn.refresh_token) return true;
  // Fallback: access token still valid (e.g. refresh_token not re-issued on re-auth)
  if (conn.access_token && conn.token_expiry) {
    return new Date(conn.token_expiry).getTime() > Date.now();
  }
  return false;
}

async function refreshAccessToken(conn: {
  id: string;
  refresh_token: string;
}): Promise<string | null> {
  const client = googleOAuthClient();
  if (!client) return null;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: client.clientId,
      client_secret: client.clientSecret,
      refresh_token: conn.refresh_token,
      grant_type: 'refresh_token',
    }),
  });

  if (!res.ok) {
    console.error('Google token refresh failed:', await res.text());
    return null;
  }
  const json = await res.json();

  const expiry = new Date(Date.now() + (json.expires_in ?? 3600) * 1000).toISOString();
  await supabase
    .from('google_calendar_connections')
    .update({ access_token: json.access_token, token_expiry: expiry })
    .eq('id', conn.id);

  return json.access_token as string;
}

async function getAccessToken(): Promise<string | null> {
  const conn = await getConnection();
  if (!conn) return null;

  const expiry = conn.token_expiry ? new Date(conn.token_expiry).getTime() : 0;
  if (conn.access_token && Date.now() < expiry - 60_000) {
    return conn.access_token;
  }

  if (!conn.refresh_token) {
    console.error('Google Calendar: no refresh_token on connection');
    return null;
  }

  return refreshAccessToken(conn);
}

/** Google expects local wall time + separate timeZone (not UTC ISO with Z). */
function formatGoogleDateTime(iso: string): string {
  const date = new Date(iso);
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Zagreb',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`;
}

function normalizeClient(
  clients: unknown
): { name: string; phone: string | null } | null {
  if (!clients) return null;
  if (Array.isArray(clients)) {
    const c = clients[0] as { name: string; phone: string | null } | undefined;
    return c ?? null;
  }
  return clients as { name: string; phone: string | null };
}

// ─── Calendar event helpers ──────────────────────────────────────────────────

function buildEventBody(appt: {
  treatment_title: string;
  starts_at: string;
  ends_at: string;
  price_cents: number;
  notes: string | null;
  id: string;
  client_id: string;
  clients?: { name: string; phone: string | null } | null;
}): Omit<GCalEvent, 'id'> {
  const clientName = appt.clients?.name ?? 'Klijent';
  const price = (appt.price_cents / 100).toFixed(2).replace('.', ',') + ' EUR';

  return {
    summary: `${appt.treatment_title} — ${clientName}`,
    description: [
      `Tretman: ${appt.treatment_title}`,
      `Klijent: ${clientName}`,
      appt.clients?.phone ? `Telefon: ${appt.clients.phone}` : '',
      `Cijena: ${price}`,
      appt.notes ? `Napomene: ${appt.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
    start: { dateTime: formatGoogleDateTime(appt.starts_at), timeZone: 'Europe/Zagreb' },
    end: { dateTime: formatGoogleDateTime(appt.ends_at), timeZone: 'Europe/Zagreb' },
    extendedProperties: {
      private: {
        visage_appointment_id: appt.id,
        visage_client_id: appt.client_id,
      },
    },
  };
}

function parseEventSummary(summary: string): { treatment: string; clientName: string } {
  const normalized = summary.trim();
  const dashParts = normalized.split(' — ');
  if (dashParts.length >= 2) {
    return {
      treatment: dashParts[0].trim(),
      clientName: dashParts.slice(1).join(' — ').trim(),
    };
  }
  const hyphenParts = normalized.split(' - ');
  if (hyphenParts.length >= 2) {
    return {
      treatment: hyphenParts[0].trim(),
      clientName: hyphenParts.slice(1).join(' - ').trim(),
    };
  }
  return { treatment: normalized || 'Termin', clientName: 'Nepoznat klijent' };
}

function parseGoogleEventTimes(event: GCalEvent): { starts_at: string; ends_at: string; duration_minutes: number } | null {
  const tz = event.start.timeZone ?? 'Europe/Zagreb';

  if (event.start.dateTime && event.end.dateTime) {
    const start = new Date(event.start.dateTime);
    const end = new Date(event.end.dateTime);
    const durationMinutes = Math.max(15, Math.round((end.getTime() - start.getTime()) / 60_000));
    return {
      starts_at: start.toISOString(),
      ends_at: end.toISOString(),
      duration_minutes: durationMinutes,
    };
  }

  if (event.start.date) {
    // All-day event — default 09:00, 60 min
    const start = new Date(`${event.start.date}T09:00:00`);
    const end = event.end.date
      ? new Date(`${event.end.date}T10:00:00`)
      : new Date(start.getTime() + 60 * 60_000);
    return {
      starts_at: start.toISOString(),
      ends_at: end.toISOString(),
      duration_minutes: Math.max(60, Math.round((end.getTime() - start.getTime()) / 60_000)),
    };
  }

  void tz;
  return null;
}

async function findOrCreateClientByName(name: string): Promise<string> {
  const trimmed = name.trim() || 'Nepoznat klijent';
  const { data: existing } = await supabase
    .from('clients')
    .select('id')
    .ilike('name', trimmed)
    .limit(1)
    .maybeSingle();

  if (existing?.id) return existing.id;

  const { data: created, error } = await supabase
    .from('clients')
    .insert({ name: trimmed, source: 'google_import' })
    .select('id')
    .single();

  if (error) throw error;
  return created.id;
}

// ─── Push: admin → Google ────────────────────────────────────────────────────

export async function syncAppointmentToGoogle(appt: {
  id: string;
  client_id: string;
  treatment_title: string;
  starts_at: string;
  ends_at: string;
  price_cents: number;
  notes: string | null;
  google_event_id: string | null;
  google_calendar_id: string | null;
  clients?: unknown;
}): Promise<void> {
  const token = await getAccessToken();
  if (!token) {
    console.error('Google Calendar push skipped: no access token');
    throw new Error('Google Calendar nije spojen ili token nije valjan');
  }

  const conn = await getConnection();
  if (!conn) {
    throw new Error('Google Calendar veza nije pronađena');
  }

  const client = normalizeClient(appt.clients);
  const calId = encodeURIComponent(conn.calendar_id ?? 'primary');
  const eventBody = buildEventBody({ ...appt, clients: client });

  let googleEventId = appt.google_event_id;
  let method: 'POST' | 'PUT' = 'POST';
  let url = `https://www.googleapis.com/calendar/v3/calendars/${calId}/events`;

  if (googleEventId) {
    method = 'PUT';
    url = `${url}/${encodeURIComponent(googleEventId)}`;
  }

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventBody),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Google Calendar ${method} failed:`, res.status, text);
    throw new Error(`Google Calendar ${method} failed: ${res.status}`);
  }

  const json = await res.json();
  googleEventId = json.id as string;

  const { error: updateError } = await supabase
    .from('appointments')
    .update({
      google_event_id: googleEventId,
      google_calendar_id: conn.calendar_id ?? 'primary',
      last_synced_at: new Date().toISOString(),
    })
    .eq('id', appt.id);

  if (updateError) {
    console.error('Failed to save google_event_id:', updateError);
  }
}

export async function deleteGoogleEvent(
  googleEventId: string,
  calendarId = 'primary'
): Promise<void> {
  const token = await getAccessToken();
  if (!token) return;

  const calId = encodeURIComponent(calendarId);
  await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calId}/events/${googleEventId}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

// ─── Pull: Google → admin ─────────────────────────────────────────────────────

async function processGoogleEvent(
  event: GCalEvent,
  calendarId: string,
  result: GoogleSyncResult
): Promise<void> {
  const apptId = event.extendedProperties?.private?.visage_appointment_id;
  const times = parseGoogleEventTimes(event);

  // Match by our appointment id or google event id
  let existingId: string | null = apptId ?? null;
  if (!existingId && event.id) {
    const { data: byGoogleId } = await supabase
      .from('appointments')
      .select('id')
      .eq('google_event_id', event.id)
      .maybeSingle();
    existingId = byGoogleId?.id ?? null;
  }

  if (event.status === 'cancelled') {
    if (existingId) {
      await supabase
        .from('appointments')
        .update({
          status: 'cancelled',
          sync_source: 'google',
          last_synced_at: new Date().toISOString(),
        })
        .eq('id', existingId);
      result.cancelled++;
    } else {
      result.skipped++;
    }
    return;
  }

  if (!times) {
    result.skipped++;
    return;
  }

  if (existingId) {
    await supabase
      .from('appointments')
      .update({
        starts_at: times.starts_at,
        ends_at: times.ends_at,
        duration_minutes: times.duration_minutes,
        google_event_id: event.id,
        google_calendar_id: calendarId,
        sync_source: 'google',
        last_synced_at: new Date().toISOString(),
      })
      .eq('id', existingId);
    result.updated++;
    return;
  }

  // Import event created directly in Google Calendar
  const { treatment, clientName } = parseEventSummary(event.summary ?? 'Termin');
  const clientId = await findOrCreateClientByName(clientName);

  const { error: insertError } = await supabase.from('appointments').insert({
    client_id: clientId,
    treatment_id: GOOGLE_IMPORT_TREATMENT_ID,
    treatment_title: treatment,
    price_cents: 0,
    duration_minutes: times.duration_minutes,
    starts_at: times.starts_at,
    ends_at: times.ends_at,
    status: 'scheduled',
    notes: event.description?.trim() || null,
    google_event_id: event.id,
    google_calendar_id: calendarId,
    sync_source: 'google',
    last_synced_at: new Date().toISOString(),
  });

  if (insertError) {
    if (insertError.message?.includes('overlaps') || insertError.code === '23505') {
      result.skipped++;
      return;
    }
    throw insertError;
  }

  result.imported++;
}

export async function syncGoogleCalendar(): Promise<GoogleSyncResult> {
  const result: GoogleSyncResult = { imported: 0, updated: 0, cancelled: 0, skipped: 0 };

  const token = await getAccessToken();
  const conn = await getConnection();
  if (!token || !conn) {
    throw new Error('Google Calendar nije spojen');
  }

  const calId = conn.calendar_id ?? 'primary';
  const encodedCalId = encodeURIComponent(calId);

  async function fetchAndProcess(useSyncToken: boolean): Promise<void> {
    const url = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodedCalId}/events`
    );
    url.searchParams.set('singleEvents', 'true');

    if (useSyncToken && conn!.sync_token) {
      url.searchParams.set('syncToken', conn!.sync_token);
    } else {
      const timeMin = new Date(Date.now() - 30 * 86400_000).toISOString();
      const timeMax = new Date(Date.now() + 365 * 86400_000).toISOString();
      url.searchParams.set('timeMin', timeMin);
      url.searchParams.set('timeMax', timeMax);
    }

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 410 && useSyncToken) {
      await supabase
        .from('google_calendar_connections')
        .update({ sync_token: null })
        .eq('id', conn!.id);
      return fetchAndProcess(false);
    }

    if (!res.ok) {
      throw new Error(`Google events list failed: ${res.status} ${await res.text()}`);
    }

    const json = await res.json();
    const events: GCalEvent[] = json.items ?? [];

    for (const event of events) {
      try {
        await processGoogleEvent(event, calId, result);
      } catch (e) {
        console.error('Failed to process Google event:', event.id, e);
        result.skipped++;
      }
    }

    if (json.nextSyncToken) {
      await supabase
        .from('google_calendar_connections')
        .update({ sync_token: json.nextSyncToken })
        .eq('id', conn!.id);
    }
  }

  await fetchAndProcess(true);
  return result;
}

/** @deprecated Use syncGoogleCalendar */
export async function performIncrementalSync(): Promise<void> {
  await syncGoogleCalendar();
}

// ─── Watch channel management ─────────────────────────────────────────────────

export async function renewWatch(): Promise<void> {
  const token = await getAccessToken();
  const conn = await getConnection();
  if (!token || !conn) return;

  const channelId = crypto.randomUUID();
  const calId = encodeURIComponent(conn.calendar_id ?? 'primary');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calId}/events/watch`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: channelId,
        type: 'web_hook',
        address: `${siteUrl}/api/webhooks/google-calendar`,
        expiration: (Date.now() + 6 * 24 * 3600_000).toString(), // 6 days
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Watch setup failed: ${res.status} ${text}`);
  }

  const json = await res.json();
  await supabase
    .from('google_calendar_connections')
    .update({
      watch_channel_id: channelId,
      watch_resource_id: json.resourceId,
      watch_expiration: new Date(Number(json.expiration)).toISOString(),
    })
    .eq('id', conn.id);
}
