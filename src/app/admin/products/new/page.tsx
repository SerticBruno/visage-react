'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductForm, { type AdminProductFormValues } from '@/components/admin/ProductForm';

export default function NewProductPage() {
  const router = useRouter();

  const handleSubmit = async (values: AdminProductFormValues) => {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? 'Greška pri dodavanju');
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">
        ← Natrag na popis
      </Link>
      <h1 className="text-2xl font-semibold mt-4 mb-6">Novi proizvod</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ProductForm isNew onSubmit={handleSubmit} onCancel={() => router.push('/admin')} />
      </div>
    </div>
  );
}
