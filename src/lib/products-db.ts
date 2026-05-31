import { supabase } from '@/lib/supabase';
import type { Product, ProTip } from '@/data/products';

export interface DbProductRow {
  id: string;
  title: string;
  description: string;
  preview_description: string | null;
  image: string;
  price: string;
  old_price: string | null;
  marka: string;
  product_type: string | null;
  volume: string | null;
  weight_grams: number | null;
  sku: string | null;
  quantity: number;
  is_popular: boolean;
  is_new: boolean;
  is_on_sale: boolean;
  is_limited: boolean;
  is_bestseller: boolean;
  is_for_day: boolean;
  is_for_night: boolean;
  is_recommended: boolean;
  is_set: boolean;
  image_needs_resize: boolean;
  link: string | null;
  categories: string[];
  skin_type: string[];
  skin_concern: string[];
  features: string[] | null;
  active_ingredients: string[] | null;
  application: string[] | null;
  warnings: string[] | null;
  indications: string[] | null;
  tags: string[] | null;
  benefits: string[] | null;
  pro_tips: ProTip[] | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export type ProductInput = Omit<Product, 'id'> & { quantity?: number; published?: boolean };

function parseJsonArray<T>(value: unknown): T[] | undefined {
  if (value == null) return undefined;
  if (Array.isArray(value)) return value as T[];
  return undefined;
}

export function rowToProduct(row: DbProductRow): Product {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    previewDescription: row.preview_description ?? undefined,
    categories: row.categories ?? [],
    marka: row.marka,
    productType: row.product_type ?? undefined,
    skinType: row.skin_type ?? [],
    skinConcern: row.skin_concern ?? [],
    image: row.image,
    price: row.price,
    oldPrice: row.old_price ?? undefined,
    weightGrams: row.weight_grams ?? undefined,
    sku: row.sku ?? undefined,
    isPopular: row.is_popular || undefined,
    isNew: row.is_new || undefined,
    isOnSale: row.is_on_sale || undefined,
    isLimited: row.is_limited || undefined,
    isBestseller: row.is_bestseller || undefined,
    isForDay: row.is_for_day || undefined,
    isForNight: row.is_for_night || undefined,
    isRecommended: row.is_recommended || undefined,
    isSet: row.is_set || undefined,
    features: parseJsonArray<string>(row.features),
    volume: row.volume ?? undefined,
    activeIngredients: parseJsonArray<string>(row.active_ingredients),
    application: parseJsonArray<string>(row.application),
    warnings: parseJsonArray<string>(row.warnings),
    indications: parseJsonArray<string>(row.indications),
    tags: parseJsonArray<string>(row.tags),
    proTips: parseJsonArray<ProTip>(row.pro_tips),
    link: row.link ?? undefined,
    benefits: parseJsonArray<string>(row.benefits),
    imageNeedsResize: row.image_needs_resize || undefined,
  };
}

export function productToRow(
  product: ProductInput & { id: string },
  quantity: number,
  published: boolean
): Omit<DbProductRow, 'created_at' | 'updated_at'> {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    preview_description: product.previewDescription ?? null,
    image: product.image,
    price: product.price,
    old_price: product.oldPrice ?? null,
    marka: product.marka,
    product_type: product.productType ?? null,
    volume: product.volume ?? null,
    weight_grams: product.weightGrams ?? null,
    sku: product.sku ?? null,
    quantity,
    is_popular: !!product.isPopular,
    is_new: !!product.isNew,
    is_on_sale: !!product.isOnSale,
    is_limited: !!product.isLimited,
    is_bestseller: !!product.isBestseller,
    is_for_day: !!product.isForDay,
    is_for_night: !!product.isForNight,
    is_recommended: !!product.isRecommended,
    is_set: !!product.isSet,
    image_needs_resize: !!product.imageNeedsResize,
    link: product.link ?? null,
    categories: product.categories ?? [],
    skin_type: product.skinType ?? [],
    skin_concern: product.skinConcern ?? [],
    features: product.features ?? null,
    active_ingredients: product.activeIngredients ?? null,
    application: product.application ?? null,
    warnings: product.warnings ?? null,
    indications: product.indications ?? null,
    tags: product.tags ?? null,
    benefits: product.benefits ?? null,
    pro_tips: product.proTips ?? null,
    published,
  };
}

export async function getProducts(options?: { includeUnpublished?: boolean }): Promise<Product[]> {
  let query = supabase.from('products').select('*').order('title', { ascending: true });

  if (!options?.includeUnpublished) {
    query = query.eq('published', true);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data as DbProductRow[]).map(rowToProduct);
}

export async function getProductById(
  id: string,
  options?: { includeUnpublished?: boolean }
): Promise<Product | null> {
  let query = supabase.from('products').select('*').eq('id', id);

  if (!options?.includeUnpublished) {
    query = query.eq('published', true);
  }

  const { data, error } = await query.maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return rowToProduct(data as DbProductRow);
}

export async function getProductsWithStock(): Promise<(Product & { quantity: number })[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('published', true)
    .order('title', { ascending: true });

  if (error) throw new Error(error.message);

  return (data as DbProductRow[]).map((row) => ({
    ...rowToProduct(row),
    quantity: row.quantity,
  }));
}

export async function getPopularProducts(): Promise<Product[]> {
  const popularIds = ['15', '31', '22', '11'];
  try {
    const all = await getProducts();
    if (all.length > 0) {
      return popularIds
        .map((id) => all.find((p) => p.id === id))
        .filter((p): p is Product => !!p);
    }
  } catch (err) {
    console.warn('Popular products from DB failed:', err);
  }
  const { products: staticProducts } = await import('@/data/products');
  return popularIds
    .map((id) => staticProducts.find((p) => p.id === id))
    .filter((p): p is Product => !!p);
}

export async function getProductQuantities(
  ids: string[]
): Promise<Map<string, number>> {
  if (!ids.length) return new Map();

  const { data, error } = await supabase
    .from('products')
    .select('id, quantity')
    .in('id', ids);

  if (error) throw new Error(error.message);

  return new Map((data ?? []).map((r) => [r.id as string, r.quantity as number]));
}

/** Products for checkout - keyed by id */
export async function getProductsByIds(ids: string[]): Promise<Map<string, Product>> {
  if (!ids.length) return new Map();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('id', ids)
    .eq('published', true);

  if (error) throw new Error(error.message);

  return new Map((data as DbProductRow[]).map((row) => [row.id, rowToProduct(row)]));
}

/** Catalog with stock; falls back to static seed data when DB is empty */
export async function getCatalogProducts(): Promise<(Product & { quantity: number })[]> {
  try {
    const fromDb = await getProductsWithStock();
    if (fromDb.length > 0) return fromDb;
  } catch (err) {
    console.warn('Products DB unavailable, using static catalog:', err);
  }

  const { products: staticProducts } = await import('@/data/products');
  return staticProducts.map((p) => ({ ...p, quantity: 15 }));
}
