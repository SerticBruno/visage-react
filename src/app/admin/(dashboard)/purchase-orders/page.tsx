'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  formatDateTime,
  purchaseOrderStatusClass,
  purchaseOrderStatusLabel,
  shortId,
} from '@/lib/admin-labels';

type PurchaseOrder = {
  id: string;
  status: string;
  supplierName: string;
  supplierEmail: string;
  supplierMarka: string;
  orderedAt: string;
  receivedAt: string | null;
  emailSentAt: string | null;
  itemCount: number;
  orderedTotal: number;
  receivedTotal: number | null;
  isPartial: boolean | null;
};

type StatusFilter = 'all' | 'ordered' | 'received' | 'cancelled';

export default function AdminPurchaseOrdersPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/purchase-orders');
    if (!res.ok) {
      setError('Ne mogu učitati narudžbenice');
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
    const q = searchQuery.trim().toLowerCase();
    return orders.filter((order) => {
      if (statusFilter !== 'all' && order.status !== statusFilter) return false;
      if (!q) return true;
      const haystack = [
        order.id,
        shortId(order.id),
        order.supplierName,
        order.supplierEmail,
        order.supplierMarka,
        purchaseOrderStatusLabel(order.status),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [orders, statusFilter, searchQuery]);

  const pendingCount = orders.filter((o) => o.status === 'ordered').length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Narudžbenice dobavljača</h2>
          <p className="text-sm text-gray-500 mt-1">
            {loading
              ? 'Učitavanje…'
              : `${orders.length} narudžbenica${pendingCount > 0 ? ` · ${pendingCount} čeka isporuku` : ''}`}
          </p>
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pretraži dobavljača, marku…"
          className="w-full sm:w-72 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(
          [
            ['all', 'Sve'],
            ['ordered', 'Čeka isporuku'],
            ['received', 'Primljeno'],
            ['cancelled', 'Otkazano'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setStatusFilter(value)}
            className={`rounded-full px-3 py-1 text-sm font-medium cursor-pointer ${
              statusFilter === value
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              <th className="px-4 py-3 font-medium text-gray-600">ID</th>
              <th className="px-4 py-3 font-medium text-gray-600">Dobavljač</th>
              <th className="px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Marka</th>
              <th className="px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Naručeno</th>
              <th className="px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Datum</th>
              <th className="px-4 py-3 font-medium text-gray-600 text-right">Akcija</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={7} className="px-4 py-3">
                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))}
            {!loading && filteredOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                  Nema narudžbenica. Kreirajte ih iz kataloga proizvoda.
                </td>
              </tr>
            )}
            {!loading &&
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    #{shortId(order.id)}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{order.supplierName}</p>
                    <p className="text-xs text-gray-500">{order.supplierEmail}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-600">
                    {order.supplierMarka}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs rounded-full px-2 py-0.5 ${purchaseOrderStatusClass(order.status)}`}
                    >
                      {purchaseOrderStatusLabel(order.status)}
                      {order.isPartial ? ' (djelomično)' : ''}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {order.itemCount} stavki · {order.orderedTotal} kom
                    {order.receivedTotal != null && (
                      <span className="text-gray-400"> → {order.receivedTotal} primljeno</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-500 whitespace-nowrap">
                    {formatDateTime(order.orderedAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/purchase-orders/${order.id}`}
                      className="text-gray-900 hover:underline cursor-pointer"
                    >
                      {order.status === 'ordered' ? 'Primi' : 'Pregled'}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
