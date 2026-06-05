-- Narudžbenice prema dobavljačima (kreiranje iz admina, primitak robe, ažuriranje zaliha)

CREATE TABLE IF NOT EXISTS supplier_purchase_orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status          TEXT NOT NULL DEFAULT 'ordered'
                    CHECK (status IN ('ordered', 'received', 'cancelled')),
  supplier_name   TEXT NOT NULL,
  supplier_email  TEXT NOT NULL,
  supplier_marka  TEXT NOT NULL,
  email_subject   TEXT,
  email_body      TEXT,
  email_sent_at   TIMESTAMPTZ,
  ordered_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  received_at     TIMESTAMPTZ,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS supplier_purchase_order_items (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id UUID NOT NULL REFERENCES supplier_purchase_orders(id) ON DELETE CASCADE,
  product_id        TEXT NOT NULL REFERENCES products(id),
  product_title     TEXT NOT NULL,
  product_sku       TEXT,
  ordered_quantity  INTEGER NOT NULL CHECK (ordered_quantity > 0),
  received_quantity INTEGER CHECK (received_quantity IS NULL OR received_quantity >= 0),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (purchase_order_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_supplier_po_status ON supplier_purchase_orders(status);
CREATE INDEX IF NOT EXISTS idx_supplier_po_ordered_at ON supplier_purchase_orders(ordered_at DESC);
CREATE INDEX IF NOT EXISTS idx_supplier_po_items_order ON supplier_purchase_order_items(purchase_order_id);

CREATE OR REPLACE FUNCTION increment_stock(p_product_id TEXT, p_quantity INTEGER)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  IF p_quantity <= 0 THEN
    RETURN;
  END IF;

  UPDATE products
  SET quantity = quantity + p_quantity,
      updated_at = NOW()
  WHERE id = p_product_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product not found: %', p_product_id;
  END IF;
END;
$$;
