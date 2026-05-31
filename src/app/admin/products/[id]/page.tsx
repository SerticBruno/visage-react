'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ProductForm, { type AdminProductFormValues } from '@/components/admin/ProductForm';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = decodeURIComponent(params.id as string);
  const [initial, setInitial] = useState<Partial<AdminProductFormValues> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/products/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.product) setInitial(data.product);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (values: AdminProductFormValues) => {
    const res = await fetch(`/api/admin/products/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? 'Greška pri spremanju');
    router.push('/admin');
    router.refresh();
  };

  if (loading) {
    return <p className="p-8 text-gray-500">Učitavanje…</p>;
  }

  if (!initial) {
    return <p className="p-8 text-red-600">Proizvod nije pronađen.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">
        ← Natrag na popis
      </Link>
      <h1 className="text-2xl font-semibold mt-4 mb-6">Uredi proizvod</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ProductForm initial={initial} onSubmit={handleSubmit} onCancel={() => router.push('/admin')} />
      </div>
    </div>
  );
}
