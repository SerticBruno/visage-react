-- Back-in-stock email subscriptions

CREATE TABLE IF NOT EXISTS stock_notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notified_at TIMESTAMPTZ,
  UNIQUE (product_id, email)
);

CREATE INDEX IF NOT EXISTS idx_stock_notifications_pending
  ON stock_notifications (product_id)
  WHERE notified_at IS NULL;
