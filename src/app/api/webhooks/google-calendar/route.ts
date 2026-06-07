import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { syncGoogleCalendar } from '@/lib/google-calendar';

/**
 * Google Calendar push notification webhook.
 * Google sends a POST here whenever events change on the watched calendar.
 * We validate the channel, then run incremental sync.
 */
export async function POST(req: Request) {
  try {
    const channelId = req.headers.get('x-goog-channel-id');
    const resourceState = req.headers.get('x-goog-resource-state');

    // Ignore the initial sync message
    if (resourceState === 'sync') {
      return NextResponse.json({ ok: true });
    }

    // Validate channel ID matches our stored watch
    if (channelId) {
      const { data: conn } = await supabase
        .from('google_calendar_connections')
        .select('watch_channel_id')
        .limit(1)
        .single();

      if (!conn || conn.watch_channel_id !== channelId) {
        return NextResponse.json({ error: 'Unknown channel' }, { status: 403 });
      }
    }

    // Run incremental sync in the background (non-blocking response to Google)
    syncGoogleCalendar().catch((e) =>
      console.error('Incremental sync failed:', e)
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Google calendar webhook:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}
