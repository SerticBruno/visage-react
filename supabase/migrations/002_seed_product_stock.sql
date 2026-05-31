-- Initial stock for catalog products (IDs match src/data/products.ts)
-- Re-run safe: upserts quantity to 15 for known products only.

INSERT INTO product_stock (product_id, quantity)
VALUES
  ('1', 15),   -- Energizing Cleanser
  ('2', 15),   -- Purifying Cleanser
  ('3', 15),   -- Bamboo Hydratonic
  ('4', 15),   -- Nutritive Scrub
  ('5', 15),   -- Purifying Scrub
  ('6', 15),   -- Total Recovery Cream
  ('7', 15),   -- Total Recovery Gel
  ('8', 15),   -- Radiance Daily Cream SPF30+
  ('9', 15),   -- Antiaging Eye Contour
  ('10', 15),  -- Radiance Eye Contour
  ('11', 15),  -- Radiance Ultimate Mesoserum
  ('12', 15),  -- Purifying Intensive Serum
  ('13', 15),  -- Purifying Cream
  ('14', 15),  -- Skin Architect Mesoserum
  ('15', 15),  -- Skin Architect krema
  ('16', 15),  -- Night Reverse Advanced Serum
  ('17', 15),  -- Glacier Pro Age Serum
  ('18', 15),  -- Glacier Pro Age Cream
  ('19', 15),  -- Retin Pro Age Serum
  ('20', 15),  -- Retin Pro Age Cream
  ('21', 15),  -- Unique Pro Age Serum
  ('22', 15),  -- Unique Pro Age krema
  ('23', 15),  -- Anti Hair-Loss Lotion
  ('24', 15),  -- DensiHair Boost Capsules
  ('25', 15),  -- Night Reverse Intensive Cream & Mask
  ('26', 15),  -- Anti-ageing + HA Ampule
  ('27', 15),  -- Radiance Ampule
  ('28', 15),  -- Sensitive Skin Ampule
  ('29', 15),  -- Purifying Ampule
  ('30', 15),  -- Lipo Proteoglycans Ampule
  ('31', 15),  -- Sun Shiel-D fluid
  ('32', 15),  -- Sun Shiel-d Tonirani Fluid SPF50+
  ('33', 15),  -- Sun Shiel-D Body & Facial Sprej SPF50+
  ('34', 15),  -- Vitaflash Ampule
  ('35', 15),  -- Profhilo Haenkenium
  ('36', 15),  -- Cleansing Gel with Salicylic Acid
  ('37', 15),  -- Micro-Exfoliating Honey Cleanser
  ('38', 15),  -- Vitamin Veil Cleanser
  ('39', 15),  -- Lipid Replacing Cleansing Gel
  ('40', 15),  -- Amandola Milk Cleanser
  ('41', 15),  -- Vitamin C Reversal Serum
  ('42', 15),  -- Licorice & Bearberry Brightening Mist
  ('43', 15),  -- Bright White Serum
  ('44', 15),  -- White Veil Brightener
  ('45', 15),  -- Light Day Sunscreen Broad Spectrum SPF37
  ('46', 15),  -- Serum 71
  ('47', 15),  -- Nighttime Repair
  ('48', 15),  -- Nighttime Repair Plus
  ('49', 15),  -- MeriStem serum
  ('50', 15),  -- Phito-Pep 1.6
  ('51', 15),  -- Revita-Cyte Complex
  ('52', 15),  -- Cyto-Comm
  ('53', 15),  -- Myo-Cyte Plus
  ('54', 15),  -- Post Peel Balm
  ('55', 15),  -- Chrono-Calm
  ('56', 15),  -- Tranquili-Cream
  ('57', 15),  -- Aloe & Calendula Calming Mist
  ('58', 15),  -- Rose-Ease Relief Cream
  ('emergency-eye-lift', 15),      -- Emergency Eye Lift
  ('full-circle-eye-repair', 15)   -- Full Circle Eye Repair
ON CONFLICT (product_id) DO UPDATE
SET quantity   = EXCLUDED.quantity,
    updated_at = NOW();
