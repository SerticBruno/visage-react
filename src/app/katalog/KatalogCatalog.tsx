import { getCatalogProducts } from '@/lib/products-db';
import KatalogClient from './KatalogClient';

export default async function KatalogCatalog() {
  const catalogProducts = await getCatalogProducts();

  return <KatalogClient products={catalogProducts} />;
}
