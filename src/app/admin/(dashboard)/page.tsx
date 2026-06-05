'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/data/products';
import SupplierOrderPanel from '@/components/admin/SupplierOrderPanel';
import { parsePriceCents } from '@/lib/price-utils';

type AdminProduct = Product & { quantity: number; published?: boolean };

type SortField = 'title' | 'marka' | 'price' | 'quantity' | 'published' | 'id';
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 10;

function SortableHeader({
  field,
  label,
  sortField,
  sortDir,
  onSort,
  className = '',
}: {
  field: SortField;
  label: string;
  sortField: SortField;
  sortDir: SortDir;
  onSort: (field: SortField) => void;
  className?: string;
}) {
  const active = sortField === field;
  return (
    <th className={`px-4 py-3 ${className}`}>
      <button
        type="button"
        onClick={() => onSort(field)}
        className="inline-flex items-center gap-1.5 font-medium text-gray-600 hover:text-gray-900 select-none cursor-pointer"
      >
        {label}
        <span
          className={`text-xs ${active ? 'text-gray-900' : 'text-gray-300'}`}
          aria-hidden
        >
          {active ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
        </span>
      </button>
    </th>
  );
}

function compareProducts(a: AdminProduct, b: AdminProduct, field: SortField, dir: SortDir): number {
  let cmp = 0;

  switch (field) {
    case 'title':
      cmp = a.title.localeCompare(b.title, 'hr');
      break;
    case 'marka':
      cmp = a.marka.localeCompare(b.marka, 'hr');
      break;
    case 'price':
      cmp = parsePriceCents(a.price) - parsePriceCents(b.price);
      break;
    case 'quantity':
      cmp = (a.quantity ?? 0) - (b.quantity ?? 0);
      break;
    case 'published': {
      const aPub = a.published !== false ? 1 : 0;
      const bPub = b.published !== false ? 1 : 0;
      cmp = aPub - bPub;
      break;
    }
    case 'id':
      cmp = a.id.localeCompare(b.id, 'hr', { numeric: true });
      break;
  }

  return dir === 'asc' ? cmp : -cmp;
}

function matchesSearch(product: AdminProduct, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    product.id,
    product.title,
    product.marka,
    product.price,
    product.sku ?? '',
    product.productType ?? '',
    ...(product.categories ?? []),
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(q);
}

function getStockRowClassName(quantity: number): string {
  if (quantity === 0) return 'bg-red-50 hover:bg-red-100/80';
  if (quantity < 5) return 'bg-orange-50 hover:bg-orange-100/80';
  return 'hover:bg-gray-50/80';
}

function defaultOrderQuantity(stock: number): number {
  if (stock <= 0) return 5;
  if (stock < 5) return Math.max(1, 10 - stock);
  return 3;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('quantity');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<Map<string, number>>(new Map());

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/products');
    if (!res.ok) {
      setError('Ne mogu učitati proizvode');
      setLoading(false);
      return;
    }
    const data = await res.json();
    setProducts(data.products ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filteredProducts = useMemo(
    () => products.filter((p) => matchesSearch(p, searchQuery)),
    [products, searchQuery]
  );

  const sortedProducts = useMemo(
    () => [...filteredProducts].sort((a, b) => compareProducts(a, b, sortField, sortDir)),
    [filteredProducts, sortField, sortDir]
  );

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return sortedProducts.slice(start, start + PAGE_SIZE);
  }, [sortedProducts, safePage]);

  const rangeStart = sortedProducts.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, sortedProducts.length);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const handleColumnSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(1);
  };

  const toggleProductSelection = (product: AdminProduct) => {
    setSelectedOrders((prev) => {
      const next = new Map(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.set(product.id, defaultOrderQuantity(product.quantity ?? 0));
      }
      return next;
    });
  };

  const updateOrderQuantity = (productId: string, value: string) => {
    const parsed = Math.max(1, Math.floor(Number(value) || 1));
    setSelectedOrders((prev) => {
      if (!prev.has(productId)) return prev;
      const next = new Map(prev);
      next.set(productId, parsed);
      return next;
    });
  };

  const clearSelection = () => setSelectedOrders(new Map());

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Obrisati proizvod "${title}"?`)) return;
    const res = await fetch(`/api/admin/products/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const remaining = products.length - 1;
      const newTotalPages = Math.max(1, Math.ceil(remaining / PAGE_SIZE));
      if (page > newTotalPages) setPage(newTotalPages);
      load();
    }
  };

  return (
    <div className={selectedOrders.size > 0 ? 'pb-24' : undefined}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Katalog proizvoda</h2>
          <p className="text-sm text-gray-500 mt-1">
            {loading
              ? 'Učitavanje…'
              : searchQuery.trim()
                ? `${filteredProducts.length} od ${products.length} proizvoda`
                : `${products.length} proizvoda`}
            {!loading && (
              <span className="block text-gray-400">
                Označite proizvode za automatsku narudžbu kod dobavljača.
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pretraži naziv, ID, marku…"
              className="w-full sm:w-64 rounded-md border border-gray-300 bg-white pl-3 pr-8 py-2 text-sm"
              aria-label="Pretraži proizvode"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer text-lg leading-none"
                aria-label="Očisti pretragu"
              >
                ×
              </button>
            )}
          </div>
          <Link
            href="/admin/products/new"
            className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 cursor-pointer"
          >
            + Novi proizvod
          </Link>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {!loading && (sortedProducts.length > 0 || searchQuery.trim()) && (
        <p className="text-sm text-gray-500 mb-3">
          {sortedProducts.length > 0 ? (
            <>
              Prikaz {rangeStart}-{rangeEnd} od {sortedProducts.length}
              {searchQuery.trim() ? ' (filtrirano)' : ''}
            </>
          ) : (
            <>Nema rezultata za „{searchQuery.trim()}“</>
          )}
        </p>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left border-b border-gray-200">
            <tr>
              <th className="px-3 py-3 w-10" aria-label="Odabir za narudžbu" />
              <SortableHeader
                field="title"
                label="Proizvod"
                sortField={sortField}
                sortDir={sortDir}
                onSort={handleColumnSort}
              />
              <SortableHeader
                field="id"
                label="ID"
                sortField={sortField}
                sortDir={sortDir}
                onSort={handleColumnSort}
                className="hidden lg:table-cell"
              />
              <SortableHeader
                field="marka"
                label="Marka"
                sortField={sortField}
                sortDir={sortDir}
                onSort={handleColumnSort}
                className="hidden sm:table-cell"
              />
              <SortableHeader
                field="price"
                label="Cijena"
                sortField={sortField}
                sortDir={sortDir}
                onSort={handleColumnSort}
              />
              <SortableHeader
                field="quantity"
                label="Zaliha"
                sortField={sortField}
                sortDir={sortDir}
                onSort={handleColumnSort}
              />
              <SortableHeader
                field="published"
                label="Status"
                sortField={sortField}
                sortDir={sortDir}
                onSort={handleColumnSort}
                className="hidden md:table-cell"
              />
              <th className="px-4 py-3 font-medium text-gray-600 w-24 hidden sm:table-cell">
                Narudžba
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 w-28 text-right">Akcije</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading &&
              Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={9} className="px-4 py-3">
                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))}
            {!loading && paginatedProducts.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-gray-500">
                  {searchQuery.trim()
                    ? `Nema proizvoda koji odgovaraju „${searchQuery.trim()}“.`
                    : 'Nema proizvoda. Pokrenite seed skriptu ili dodajte novi proizvod.'}
                </td>
              </tr>
            )}
            {!loading &&
              paginatedProducts.map((p) => {
                const quantity = p.quantity ?? 0;
                const isSelected = selectedOrders.has(p.id);
                const orderQty = selectedOrders.get(p.id) ?? defaultOrderQuantity(quantity);
                return (
                <tr key={p.id} className={getStockRowClassName(quantity)}>
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleProductSelection(p)}
                      className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                      aria-label={`Odaberi ${p.title} za narudžbu`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 rounded bg-gray-100 overflow-hidden">
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{p.title}</p>
                        <p className="text-xs text-gray-400 font-mono lg:hidden">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-500 font-mono text-xs">
                    {p.id}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{p.marka}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{p.price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        quantity === 0
                          ? 'text-red-800 font-semibold'
                          : quantity < 5
                            ? 'text-orange-800 font-medium'
                            : 'text-gray-700'
                      }
                    >
                      {quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {p.published === false ? (
                      <span className="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
                        Skriveno
                      </span>
                    ) : (
                      <span className="text-xs rounded-full bg-green-50 px-2 py-0.5 text-green-700">
                        Objavljeno
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {isSelected ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min={1}
                          value={orderQty}
                          onChange={(e) => updateOrderQuantity(p.id, e.target.value)}
                          className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                          aria-label={`Količina za narudžbu: ${p.title}`}
                        />
                        <span className="text-xs text-gray-500">kom</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    <Link
                      href={`/admin/products/${encodeURIComponent(p.id)}`}
                      className="text-gray-900 hover:underline cursor-pointer"
                    >
                      Uredi
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id, p.title)}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Obriši
                    </button>
                  </td>
                </tr>
              );
              })}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          aria-label="Paginacija"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prethodna
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`min-w-[2.25rem] rounded-md px-2 py-1.5 text-sm font-medium ${
                  n === safePage
                    ? 'bg-gray-900 text-white'
                    : 'border border-gray-300 hover:bg-white'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sljedeća
          </button>
        </nav>
      )}

      <SupplierOrderPanel
        products={products.map((p) => ({
          id: p.id,
          title: p.title,
          marka: p.marka,
          quantity: p.quantity ?? 0,
        }))}
        selected={selectedOrders}
        onClearSelection={clearSelection}
      />
    </div>
  );
}
