/**
 * Generates machine-readable price lists (CSV) into public/cjenici/.
 *
 * Usage:
 *   npx tsx scripts/generate-cjenik.ts [--type=products|services|all]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from '../src/data/products';
import { pricingData } from '../src/data/pricing';
import { comboPackages } from '../src/data/comboPackages';
import {
  buildCjenikFilename,
  buildProductsCsv,
  buildServicesCsv,
  createEmptyManifest,
  type CjenikKind,
  type CjenikManifest,
  type CjenikManifestEntry,
} from '../src/lib/cjenikExport';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public', 'cjenici');
const MANIFEST_PATH = path.join(OUT_DIR, 'index.json');
const ARCHIVE_DAYS = 30;

function parseTypeArg(): CjenikKind | 'all' {
  const arg = process.argv.find((a) => a.startsWith('--type='));
  const value = arg?.split('=')[1] ?? 'all';
  if (value === 'products' || value === 'services' || value === 'all') return value;
  console.error(`Unknown --type=${value}. Use products|services|all.`);
  process.exit(1);
}

function readManifest(): CjenikManifest {
  if (!fs.existsSync(MANIFEST_PATH)) return createEmptyManifest();
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')) as CjenikManifest;
  } catch {
    return createEmptyManifest();
  }
}

function pruneOldEntries(manifest: CjenikManifest, now: Date): CjenikManifest {
  const cutoff = now.getTime() - ARCHIVE_DAYS * 24 * 60 * 60 * 1000;
  const kept: CjenikManifestEntry[] = [];

  for (const entry of manifest.entries) {
    const t = Date.parse(entry.generatedAt);
    if (Number.isNaN(t) || t >= cutoff) {
      kept.push(entry);
    } else {
      const filePath = path.join(OUT_DIR, entry.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  }

  return { ...manifest, entries: kept };
}

function writeStableCopy(kind: CjenikKind, content: string) {
  const stable = kind === 'products' ? 'proizvodi.csv' : 'usluge.csv';
  fs.writeFileSync(path.join(OUT_DIR, stable), content, 'utf8');
}

function generate(kind: CjenikKind, manifest: CjenikManifest, now: Date): CjenikManifest {
  const storageNumber = manifest.nextStorageNumber;
  const filename = buildCjenikFilename(storageNumber, now);
  const content =
    kind === 'products'
      ? buildProductsCsv(products)
      : buildServicesCsv(pricingData, comboPackages);

  fs.writeFileSync(path.join(OUT_DIR, filename), content, 'utf8');
  writeStableCopy(kind, content);

  const entry: CjenikManifestEntry = {
    kind,
    filename,
    generatedAt: now.toISOString(),
    storageNumber,
  };

  const latestKey = kind === 'products' ? 'latestProducts' : 'latestServices';

  return {
    ...manifest,
    updatedAt: now.toISOString(),
    nextStorageNumber: storageNumber + 1,
    entries: [...manifest.entries, entry],
    [latestKey]: filename,
  };
}

function main() {
  const type = parseTypeArg();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const now = new Date();
  let manifest = pruneOldEntries(readManifest(), now);

  if (type === 'products' || type === 'all') {
    manifest = generate('products', manifest, now);
    console.log(`Wrote products CSV: ${manifest.latestProducts}`);
  }
  if (type === 'services' || type === 'all') {
    // Slight offset so services filename timestamp differs when both run
    const servicesNow = type === 'all' ? new Date(now.getTime() + 60_000) : now;
    manifest = generate('services', manifest, servicesNow);
    console.log(`Wrote services CSV: ${manifest.latestServices}`);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`Manifest updated (${manifest.entries.length} entries in archive window).`);
}

main();
