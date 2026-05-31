import { Suspense } from 'react';
import { getCatalogProducts } from '@/lib/products-db';
import KatalogClient from './KatalogClient';

export default async function KatalogPage() {
  const catalogProducts = await getCatalogProducts();

  return (
    <Suspense
      fallback={
        <div className="min-h-[40vh] flex items-center justify-center">
          Učitavanje kataloga…
        </div>
      }
    >
      <KatalogClient products={catalogProducts} />
    </Suspense>
  );
}
