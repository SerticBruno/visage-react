-- Product stock table
CREATE TABLE IF NOT EXISTS product_stock (
  product_id TEXT PRIMARY KEY,
  quantity   INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE,
  status            TEXT NOT NULL DEFAULT 'pending',
  -- pending | paid | processing | shipped | ready_for_pickup | completed | cancelled
  delivery_method   TEXT NOT NULL,
  -- boxnow | gls | pickup
  customer_email    TEXT NOT NULL,
  customer_name     TEXT NOT NULL,
  customer_phone    TEXT,
  shipping_address  JSONB NOT NULL DEFAULT '{}',
  -- For BoxNow: { locker_id, locker_name, locker_address }
  -- For GLS: { street, city, zip, country }
  -- For pickup: {}
  subtotal_cents    INTEGER NOT NULL DEFAULT 0,
  shipping_cents    INTEGER NOT NULL DEFAULT 0,
  total_cents       INTEGER NOT NULL DEFAULT 0,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at           TIMESTAMPTZ
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id      TEXT NOT NULL,
  title           TEXT NOT NULL,
  quantity        INTEGER NOT NULL DEFAULT 1,
  unit_price_cents INTEGER NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- Atomically decrement stock, returns error if insufficient
CREATE OR REPLACE FUNCTION decrement_stock(p_product_id TEXT, p_quantity INTEGER)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE product_stock
  SET quantity = quantity - p_quantity,
      updated_at = NOW()
  WHERE product_id = p_product_id
    AND quantity >= p_quantity;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient stock for product %', p_product_id;
  END IF;
END;
$$;
