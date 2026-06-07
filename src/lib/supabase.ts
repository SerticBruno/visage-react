import 'server-only';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
// Legacy: SUPABASE_SERVICE_ROLE_KEY - newer projects: SUPABASE_SECRET_KEY (sb_secret_…)
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Supabase nije konfiguriran: postavite SUPABASE_URL i SUPABASE_SERVICE_ROLE_KEY (ili SUPABASE_SECRET_KEY) u .env.local'
  );
}

// Server-only client - never expose service role key to the browser
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface DbOrder {
  id: string;
  stripe_session_id: string | null;
  status: string;
  delivery_method: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  shipping_address: Record<string, string>;
  subtotal_cents: number;
  shipping_cents: number;
  discount_cents: number;
  promo_code: string | null;
  total_cents: number;
  notes: string | null;
  created_at: string;
  paid_at: string | null;
}

export interface DbOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  title: string;
  quantity: number;
  unit_price_cents: number;
}

export interface DbClient {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  source: string;
  created_at: string;
  updated_at: string;
}

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
export type SyncSource = 'admin' | 'google';

export interface DbAppointment {
  id: string;
  client_id: string;
  treatment_id: string;
  treatment_title: string;
  price_cents: number;
  duration_minutes: number;
  starts_at: string;
  ends_at: string;
  status: AppointmentStatus;
  notes: string | null;
  google_event_id: string | null;
  google_calendar_id: string | null;
  last_synced_at: string | null;
  sync_source: SyncSource | null;
  created_at: string;
  updated_at: string;
}

export interface DbGoogleCalendarConnection {
  id: string;
  calendar_id: string;
  refresh_token: string;
  access_token: string | null;
  token_expiry: string | null;
  watch_channel_id: string | null;
  watch_resource_id: string | null;
  watch_expiration: string | null;
  sync_token: string | null;
  created_at: string;
  updated_at: string;
}
