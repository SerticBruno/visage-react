-- Add popularity tracking columns to products table
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS popularity_score INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS sales_count      INTEGER NOT NULL DEFAULT 0;

-- Backfill sales_count from existing paid/fulfilled orders
UPDATE products p
SET sales_count = COALESCE(sub.total, 0)
FROM (
  SELECT oi.product_id, SUM(oi.quantity)::INTEGER AS total
  FROM order_items oi
  JOIN orders o ON o.id = oi.order_id
  WHERE o.status IN ('paid', 'processing', 'shipped', 'ready_for_pickup', 'completed')
  GROUP BY oi.product_id
) sub
WHERE p.id = sub.product_id;

-- Atomically increment sales_count on a product when an order is fulfilled
CREATE OR REPLACE FUNCTION increment_product_sales(p_product_id TEXT, p_quantity INTEGER)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE products
  SET sales_count = sales_count + p_quantity,
      updated_at  = NOW()
  WHERE id = p_product_id;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_products_popularity ON products((popularity_score + sales_count) DESC);
