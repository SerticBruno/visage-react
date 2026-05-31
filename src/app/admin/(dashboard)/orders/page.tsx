'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { formatPrice } from '@/lib/price-utils';
import { formatDateTime, orderStatusClass, orderStatusLabel } from '@/lib/admin-labels';
import { getShippingOption, type DeliveryMethod } from '@/lib/shipping';

type AdminOrder = {
  id: string;
  status: string;
  deliveryMethod: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string | null;
  totalCents: number;
  itemCount: number;
  createdAt: string;
  paidAt: string | null;
};

type SortField = 'createdAt' | 'customerName' | 'totalCents' | 'status' | 'itemCount';
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 15;

const STATUS_OPTIONS = [
  'pending',
  'paid',
  'processing',
  'shipped',
  'ready_for_pickup',
  'completed',
  'cancelled',
] as const;

function compareOrders(a: AdminOrder, b: AdminOrder, field: SortField, dir: SortDir): number {
  let cmp = 0;

  switch (field) {
    case 'createdAt':
      cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      break;
    case 'customerName':
      cmp = a.customerName.localeCompare(b.customerName, 'hr');
      break;
    case 'totalCents':
      cmp = a.totalCents - b.totalCents;
      break;
    case 'status':
      cmp = a.status.localeCompare(b.status, 'hr');
      break;
    case 'itemCount':
      cmp = a.itemCount - b.itemCount;
      break;
  }

  return dir === 'asc' ? cmp : -cmp;
}

function matchesSearch(order: AdminOrder, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const delivery = getShippingOption(order.deliveryMethod as DeliveryMethod).label;

  const haystack = [
    order.id,
    order.customerName,
    order.customerEmail,
    order.customerPhone ?? '',
    order.status,
    orderStatusLabel(order.status),
    delivery,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(q);
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<p className="text-gray-500">Učitavanje narudžbi…</p>}>
      <AdminOrdersContent />
    </Suspense>
  );
}

function AdminOrdersContent() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get('email') ?? '';

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [searchQuery, setSearchQuery] = useState(emailFromUrl);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    if (emailFromUrl) setSearchQuery(emailFromUrl);
  }, [emailFromUrl]);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/orders');
    if (!res.ok) {
      setError('Ne mogu učitati narudžbe');
      setLoading(false);
      return;
    }
    const data = await res.json();
    setOrders(data.orders ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter && o.status !== statusFilter) return false;
      return matchesSearch(o, searchQuery);
    });
  }, [orders, searchQuery, statusFilter]);

  const sortedOrders = useMemo(
    () => [...filteredOrders].sort((a, b) => compareOrders(a, b, sortField, sortDir)),
    [filteredOrders, sortField, sortDir]
  );

  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginatedOrders = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return sortedOrders.slice(start, start + PAGE_SIZE);
  }, [sortedOrders, safePage]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, statusFilter]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir(field === 'createdAt' ? 'desc' : 'asc');
    }
    setPage(1);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Narudžbe</h2>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Učitavanje…' : `${filteredOrders.length} narudžbi`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            aria-label="Filtriraj po statusu"
          >
            <option value="">Svi statusi</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {orderStatusLabel(s)}
              </option>
            ))}
          </select>
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pretraži kupca, e-mail, ID…"
              className="w-full sm:w-64 rounded-md border border-gray-300 bg-white pl-3 pr-8 py-2 text-sm"
              aria-label="Pretraži narudžbe"
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
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => handleSort('createdAt')}
                  className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Datum
                </button>
              </th>
              <th className="px-4 py-3 hidden md:table-cell">
                <button
                  type="button"
                  onClick={() => handleSort('customerName')}
                  className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Kupac
                </button>
              </th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => handleSort('status')}
                  className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Status
                </button>
              </th>
              <th className="px-4 py-3 hidden sm:table-cell">Dostava</th>
              <th className="px-4 py-3 hidden lg:table-cell">
                <button
                  type="button"
                  onClick={() => handleSort('itemCount')}
                  className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Stavke
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => handleSort('totalCents')}
                  className="font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Ukupno
                </button>
              </th>
              <th className="px-4 py-3 w-20 text-right">Detalj</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={7} className="px-4 py-3">
                    <div className="h-8 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))}
            {!loading && paginatedOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                  Nema narudžbi koje odgovaraju filteru.
                </td>
              </tr>
            )}
            {!loading &&
              paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-gray-900">{formatDateTime(order.createdAt)}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">
                      {order.id.slice(0, 8)}…
                    </p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs rounded-full px-2 py-0.5 ${orderStatusClass(order.status)}`}
                    >
                      {orderStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-600">
                    {getShippingOption(order.deliveryMethod as DeliveryMethod).label}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-600">
                    {order.itemCount}
                  </td>
                  <td className="px-4 py-3 text-right font-medium whitespace-nowrap">
                    {formatPrice(order.totalCents)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-gray-900 hover:underline cursor-pointer"
                    >
                      Pregled
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Paginacija">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prethodna
          </button>
          <span className="text-sm text-gray-500 px-2">
            {safePage} / {totalPages}
          </span>
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
    </>
  );
}
