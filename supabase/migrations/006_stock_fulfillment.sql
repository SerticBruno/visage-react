-- Osiguraj da decrement_stock koristi products.quantity i uskladi legacy product_stock

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

-- Ako su zalihe ostale u staroj product_stock tablici, prebaci u products
UPDATE products p
SET quantity = ps.quantity,
    updated_at = NOW()
FROM product_stock ps
WHERE p.id = ps.product_id
  AND ps.quantity > p.quantity;
