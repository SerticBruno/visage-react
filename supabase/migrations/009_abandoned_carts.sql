-- Abandoned cart tracking: recovery tokens, audit emails, and cart snapshots

-- Extend orders table with abandonment fields
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS recovery_token         TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS abandoned_at           TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS abandonment_email_count INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS recovered_at           TIMESTAMPTZ;

-- Efficient partial index for cron queries (only pending orders)
CREATE INDEX IF NOT EXISTS idx_orders_pending_created
  ON orders (created_at)
  WHERE status = 'pending';

-- Audit log for sent recovery emails; UNIQUE prevents duplicate sends per sequence
CREATE TABLE IF NOT EXISTS abandoned_cart_emails (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  sequence_number SMALLINT NOT NULL,
  sent_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resend_id       TEXT,
  UNIQUE (order_id, sequence_number)
);

CREATE INDEX IF NOT EXISTS idx_abandoned_cart_emails_order
  ON abandoned_cart_emails (order_id);

-- Cart snapshots for pre-checkout abandonment tracking (Faza 2)
CREATE TABLE IF NOT EXISTS cart_snapshots (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_token       TEXT NOT NULL,
  customer_email      TEXT,
  customer_name       TEXT,
  items               JSONB NOT NULL DEFAULT '[]',
  -- [{product_id, quantity, title, unit_price_cents}]
  subtotal_cents      INTEGER NOT NULL DEFAULT 0,
  last_activity_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  converted_order_id  UUID REFERENCES orders(id),
  recovery_token      TEXT UNIQUE,
  status              TEXT NOT NULL DEFAULT 'active',
  -- active | converted | expired
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Only one active snapshot per visitor
CREATE UNIQUE INDEX IF NOT EXISTS idx_cart_snapshots_active_visitor
  ON cart_snapshots (visitor_token) WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_cart_snapshots_email
  ON cart_snapshots (customer_email) WHERE customer_email IS NOT NULL AND status = 'active';

CREATE INDEX IF NOT EXISTS idx_cart_snapshots_activity
  ON cart_snapshots (last_activity_at) WHERE status = 'active';
