-- Full product catalog (replaces hardcoded src/data/products.ts + product_stock)

CREATE TABLE IF NOT EXISTS products (
  id                  TEXT PRIMARY KEY,
  title               TEXT NOT NULL,
  description         TEXT NOT NULL,
  preview_description TEXT,
  image               TEXT NOT NULL,
  price               TEXT NOT NULL,
  old_price           TEXT,
  marka               TEXT NOT NULL,
  product_type        TEXT,
  volume              TEXT,
  weight_grams        INTEGER,
  sku                 TEXT,
  quantity            INTEGER NOT NULL DEFAULT 0,
  is_popular          BOOLEAN NOT NULL DEFAULT FALSE,
  is_new              BOOLEAN NOT NULL DEFAULT FALSE,
  is_on_sale          BOOLEAN NOT NULL DEFAULT FALSE,
  is_limited          BOOLEAN NOT NULL DEFAULT FALSE,
  is_bestseller       BOOLEAN NOT NULL DEFAULT FALSE,
  is_for_day          BOOLEAN NOT NULL DEFAULT FALSE,
  is_for_night        BOOLEAN NOT NULL DEFAULT FALSE,
  is_recommended      BOOLEAN NOT NULL DEFAULT FALSE,
  is_set              BOOLEAN NOT NULL DEFAULT FALSE,
  image_needs_resize  BOOLEAN NOT NULL DEFAULT FALSE,
  link                TEXT,
  categories          JSONB NOT NULL DEFAULT '[]',
  skin_type           JSONB NOT NULL DEFAULT '[]',
  skin_concern        JSONB NOT NULL DEFAULT '[]',
  features            JSONB,
  active_ingredients  JSONB,
  application         JSONB,
  warnings            JSONB,
  indications         JSONB,
  tags                JSONB,
  benefits            JSONB,
  pro_tips            JSONB,
  published           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_marka ON products(marka);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(published);

-- Stock decrement on paid orders (uses products.quantity)
CREATE OR REPLACE FUNCTION decrement_stock(p_product_id TEXT, p_quantity INTEGER)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE products
  SET quantity = quantity - p_quantity,
      updated_at = NOW()
  WHERE id = p_product_id
    AND quantity >= p_quantity;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient stock for product %', p_product_id;
  END IF;
END;
$$;
