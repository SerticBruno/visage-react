import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
// Legacy: SUPABASE_SERVICE_ROLE_KEY — newer projects: SUPABASE_SECRET_KEY (sb_secret_…)
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Supabase nije konfiguriran: postavite SUPABASE_URL i SUPABASE_SERVICE_ROLE_KEY (ili SUPABASE_SECRET_KEY) u .env.local'
  );
}

// Server-only client — never expose service role key to the browser
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
