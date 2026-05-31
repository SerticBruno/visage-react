'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/data/products';
import { brands, productTypes } from '@/data/products';

export type AdminProductFormValues = Product & {
  quantity: number;
  published: boolean;
};

const emptyProduct = (): AdminProductFormValues => ({
  id: '',
  title: '',
  description: '',
  previewDescription: '',
  categories: [],
  marka: brands[0] ?? 'TOSKANI',
  productType: '',
  skinType: [],
  skinConcern: [],
  image: '/images/products/placeholder.webp',
  price: '0 EUR',
  quantity: 0,
  published: true,
});

interface ProductFormProps {
  initial?: Partial<AdminProductFormValues>;
  isNew?: boolean;
  onSubmit: (values: AdminProductFormValues) => Promise<void>;
  onCancel: () => void;
}

function parseList(value: string): string[] {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function joinList(values?: string[]): string {
  return (values ?? []).join(', ');
}

export default function ProductForm({
  initial,
  isNew,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [values, setValues] = useState<AdminProductFormValues>({
    ...emptyProduct(),
    ...initial,
    quantity: initial?.quantity ?? 0,
    published: initial?.published ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof AdminProductFormValues>(
    key: K,
    value: AdminProductFormValues[K]
  ) => setValues((v) => ({ ...v, [key]: value }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    if (values.id.trim()) {
      formData.append('productId', values.id.trim());
    }

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload nije uspio');
      update('image', data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Greška pri uploadu');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Greška pri spremanju');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <p className="rounded-md bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">ID *</span>
          <input
            required
            disabled={!isNew}
            value={values.id}
            onChange={(e) => update('id', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Naziv *</span>
          <input
            required
            value={values.title}
            onChange={(e) => update('title', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Kratki opis</span>
        <input
          value={values.previewDescription ?? ''}
          onChange={(e) => update('previewDescription', e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Opis *</span>
        <textarea
          required
          rows={6}
          value={values.description}
          onChange={(e) => update('description', e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Cijena *</span>
          <input
            required
            value={values.price}
            onChange={(e) => update('price', e.target.value)}
            placeholder="40 EUR"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Stara cijena</span>
          <input
            value={values.oldPrice ?? ''}
            onChange={(e) => update('oldPrice', e.target.value || undefined)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Marka *</span>
          <select
            value={values.marka}
            onChange={(e) => update('marka', e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Tip proizvoda</span>
          <select
            value={values.productType ?? ''}
            onChange={(e) => update('productType', e.target.value || undefined)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">-</option>
            {productTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Volumen</span>
          <input
            value={values.volume ?? ''}
            onChange={(e) => update('volume', e.target.value || undefined)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </label>
      </div>

      <div className="block space-y-3">
        <span className="text-sm font-medium text-gray-700">Slika proizvoda *</span>

        {values.image && (
          <div className="relative h-40 w-40 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
            <Image
              src={values.image}
              alt="Pregled"
              fill
              className="object-contain p-2"
              sizes="160px"
              unoptimized={values.image.startsWith('http')}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
            id="product-image-upload"
          />
          <label
            htmlFor="product-image-upload"
            className={`inline-flex rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer ${
              uploading ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            {uploading ? 'Upload…' : 'Upload na Supabase'}
          </label>
          <span className="text-xs text-gray-500">JPEG, PNG, WebP, GIF · max 5 MB</span>
        </div>

        <label className="block">
          <span className="text-xs text-gray-500">URL slike (automatski nakon uploada ili ručno)</span>
          <input
            required
            value={values.image}
            onChange={(e) => update('image', e.target.value)}
            placeholder="https://....supabase.co/storage/v1/object/public/product-images/..."
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Količina na zalihi</span>
          <input
            type="number"
            min={0}
            value={values.quantity}
            onChange={(e) => update('quantity', Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="flex items-center gap-2 mt-6 cursor-pointer">
          <input
            type="checkbox"
            checked={values.published}
            onChange={(e) => update('published', e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">Objavljeno u katalogu</span>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Kategorije (zarezom)</span>
        <input
          value={joinList(values.categories)}
          onChange={(e) => update('categories', parseList(e.target.value))}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Tip kože (zarezom)</span>
        <input
          value={joinList(values.skinType)}
          onChange={(e) => update('skinType', parseList(e.target.value))}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </label>

      <div className="flex flex-wrap gap-4">
        {(
          [
            ['isPopular', 'Popularno'],
            ['isNew', 'Novo'],
            ['isRecommended', 'Preporučeno'],
            ['isForDay', 'Za dan'],
            ['isForNight', 'Za noć'],
            ['isSet', 'Set'],
            ['imageNeedsResize', 'Manja slika'],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={!!values[key]}
              onChange={(e) => update(key, e.target.checked || undefined)}
              className="rounded border-gray-300"
            />
            {label}
          </label>
        ))}
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-gray-900 text-white px-5 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {saving ? 'Spremanje…' : 'Spremi'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer"
        >
          Odustani
        </button>
      </div>
    </form>
  );
}
