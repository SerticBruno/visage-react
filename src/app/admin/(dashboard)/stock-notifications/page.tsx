'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { formatDateTime } from '@/lib/admin-labels';

type StockNotification = {
  id: string;
  email: string;
  productId: string;
  productTitle: string;
  productQuantity: number;
  createdAt: string;
  notifiedAt: string | null;
};

type StatusFilter = 'all' | 'pending' | 'notified';

const PAGE_SIZE = 20;

function matchesSearch(sub: StockNotification, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [sub.email, sub.productTitle, sub.productId].join(' ').toLowerCase();
  return haystack.includes(q);
}

export default function AdminStockNotificationsPage() {
  const [subscriptions, setSubscriptions] = useState<StockNotification[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetch('/api/admin/stock-notifications');
    if (!res.ok) {
      setError('Ne mogu učitati pretplate');
      setLoading(false);
      return;
    }
    const data = await res.json();
    setSubscriptions(data.subscriptions ?? []);
    setPendingCount(data.pendingCount ?? 0);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    return subscriptions.filter((sub) => {
      if (statusFilter === 'pending' && sub.notifiedAt) return false;
      if (statusFilter === 'notified' && !sub.notifiedAt) return false;
      return matchesSearch(sub, searchQuery);
    });
  }, [subscriptions, statusFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, statusFilter]);

  const productGroups = useMemo(() => {
    const groups = new Map<string, { title: string; pending: number; total: number }>();
    for (const sub of subscriptions) {
      const existing = groups.get(sub.productId);
      if (existing) {
        existing.total += 1;
        if (!sub.notifiedAt) existing.pending += 1;
      } else {
        groups.set(sub.productId, {
          title: sub.productTitle,
          pending: sub.notifiedAt ? 0 : 1,
          total: 1,
        });
      }
    }
    return [...groups.entries()]
      .filter(([, g]) => g.pending > 0)
      .sort((a, b) => b[1].pending - a[1].pending);
  }, [subscriptions]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Obavijesti o zalihama</h2>
          <p className="text-sm text-gray-500 mt-1">
            {loading
              ? 'Učitavanje…'
              : `${filtered.length} pretplata · ${pendingCount} čeka obavijest`}
          </p>
        </div>
        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pretraži email, proizvod…"
            className="w-full sm:w-72 rounded-md border border-gray-300 bg-white pl-3 pr-8 py-2 text-sm"
            aria-label="Pretraži pretplate"
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

      {!loading && productGroups.length > 0 && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50/80 p-4">
          <h3 className="text-sm font-semibold text-amber-900 mb-2">Proizvodi s čekajućim pretplatama</h3>
          <ul className="flex flex-wrap gap-2">
            {productGroups.map(([productId, group]) => (
              <li key={productId}>
                <Link
                  href={`/admin/products/${encodeURIComponent(productId)}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-medium text-amber-900 hover:bg-amber-100"
                >
                  <span className="truncate max-w-[200px]">{group.title}</span>
                  <span className="rounded-full bg-amber-200 px-1.5 py-0.5 text-[10px] font-bold">
                    {group.pending}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {(
          [
            ['all', 'Sve'],
            ['pending', 'Čeka obavijest'],
            ['notified', 'Obaviješteno'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setStatusFilter(value)}
            className={`rounded-full px-3 py-1 text-xs font-medium border cursor-pointer ${
              statusFilter === value
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600">Email</th>
              <th className="px-4 py-3 font-medium text-gray-600">Proizvod</th>
              <th className="px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Zalihe</th>
              <th className="px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Prijavljeno</th>
              <th className="px-4 py-3 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={5} className="px-4 py-3">
                    <div className="h-8 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))}
            {!loading && paginated.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                  Nema pretplata koje odgovaraju filteru.
                </td>
              </tr>
            )}
            {!loading &&
              paginated.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/80">
                  <td className="px-4 py-3 font-medium text-gray-900">{sub.email}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/products/${encodeURIComponent(sub.productId)}`}
                      className="text-gray-700 hover:text-gray-900 hover:underline"
                    >
                      {sub.productTitle}
                    </Link>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {sub.productQuantity > 0 ? (
                      <span className="text-green-700">{sub.productQuantity} kom</span>
                    ) : (
                      <span className="text-red-600">Nema na zalihama</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-600 whitespace-nowrap">
                    {formatDateTime(sub.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    {sub.notifiedAt ? (
                      <span
                        className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 border border-green-200"
                        title={formatDateTime(sub.notifiedAt)}
                      >
                        Obaviješteno
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 border border-amber-200">
                        Čeka
                      </span>
                    )}
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
