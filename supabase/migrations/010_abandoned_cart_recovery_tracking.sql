-- Recovery conversion timestamp and funnel event log

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS recovery_converted_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_orders_recovery_converted
  ON orders (recovery_converted_at DESC)
  WHERE recovery_converted_at IS NOT NULL;

CREATE TABLE IF NOT EXISTS abandoned_cart_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  event_type  TEXT NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT abandoned_cart_events_type_check CHECK (
    event_type IN (
      'email_sent',
      'recovery_link_opened',
      'recovery_checkout_started',
      'recovery_paid'
    )
  )
);

CREATE INDEX IF NOT EXISTS idx_abandoned_cart_events_order
  ON abandoned_cart_events (order_id, occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_abandoned_cart_events_type
  ON abandoned_cart_events (event_type, occurred_at DESC);
