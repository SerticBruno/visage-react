/**
 * Seeds Supabase `products` from src/data/products.ts
 * Run: npx tsx scripts/seed-products.ts
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

function loadEnvLocal() {
  try {
    const content = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    /* .env.local optional when vars already exported */
  }
}

loadEnvLocal();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Postavite SUPABASE_URL i SUPABASE_SERVICE_ROLE_KEY u .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const DEFAULT_QUANTITY = 15;

async function main() {
  const { products } = await import('../src/data/products');
  const { productToRow } = await import('../src/lib/products-db');

  console.log(`Seeding ${products.length} products...`);

  const rows = products.map((p) =>
    productToRow({ ...p, id: p.id }, DEFAULT_QUANTITY, true)
  );

  const { error } = await supabase.from('products').upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }

  console.log('Done.');
}

main();
