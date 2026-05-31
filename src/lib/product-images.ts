export const PRODUCT_IMAGES_BUCKET = 'product-images';

const MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
]);

export function getProductImagePublicUrl(storagePath: string): string {
  const base = process.env.SUPABASE_URL?.replace(/\/$/, '');
  if (!base) throw new Error('SUPABASE_URL nije postavljen');
  return `${base}/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/${storagePath}`;
}

export function validateProductImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return 'Dozvoljeni formati: JPEG, PNG, WebP, GIF';
  }
  if (file.size > MAX_BYTES) {
    return 'Maksimalna veličina datoteke je 5 MB';
  }
  return null;
}

export function buildProductImageStoragePath(
  productId: string | undefined,
  originalName: string
): string {
  const folder = (productId?.trim() || 'misc').replace(/[^a-zA-Z0-9_-]/g, '-');
  const ext = originalName.includes('.')
    ? originalName.slice(originalName.lastIndexOf('.')).toLowerCase()
    : '.webp';
  const safeExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext) ? ext : '.webp';
  const slug = originalName
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  const name = slug || 'image';
  return `${folder}/${Date.now()}-${name}${safeExt}`;
}
