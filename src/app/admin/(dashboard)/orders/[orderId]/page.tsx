'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatPrice } from '@/lib/price-utils';
import { formatDateTime, orderStatusClass, orderStatusLabel } from '@/lib/admin-labels';

type OrderDetail = {
  id: string;
  status: string;
  deliveryMethod: string;
  deliveryLabel: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string | null;
  shippingAddress: Record<string, string>;
  subtotalCents: number;
  shippingCents: number;
  discountCents: number;
  promoCode: string | null;
  totalCents: number;
  notes: string | null;
  createdAt: string;
  paidAt: string | null;
};

type OrderItem = {
  id: string;
  productId: string;
  title: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
};

const STATUS_OPTIONS = [
  'pending',
  'paid',
  'processing',
  'shipped',
  'ready_for_pickup',
  'completed',
  'cancelled',
] as const;

function formatAddress(method: string, address: Record<string, string>): string {
  if (method === 'boxnow') {
    const parts = [address.locker_name, address.locker_address, address.locker_id].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : '-';
  }
  if (method === 'gls') {
    const parts = [address.street, address.city, address.zip, address.country].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : '-';
  }
  return 'Preuzimanje u studiju';
}

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/orders/${orderId}`);
    if (!res.ok) {
      setError('Narudžba nije pronađena');
      setLoading(false);
      return;
    }
    const data = await res.json();
    setOrder(data.order);
    setItems(data.items ?? []);
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (status: string) => {
    if (!order) return;
    setSaving(true);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setOrder({ ...order, status });
    }
    setSaving(false);
  };

  if (loading) {
    return <p className="text-gray-500">Učitavanje narudžbe…</p>;
  }

  if (error || !order) {
    return (
      <div>
        <p className="text-red-600 mb-4">{error ?? 'Narudžba nije pronađena'}</p>
        <Link href="/admin/orders" className="text-sm text-gray-500 hover:text-gray-900">
          ← Natrag na narudžbe
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/orders"
        className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        ← Natrag na narudžbe
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mt-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Narudžba</h2>
          <p className="text-xs text-gray-400 font-mono mt-1">{order.id}</p>
          <p className="text-sm text-gray-500 mt-1">{formatDateTime(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs rounded-full px-2.5 py-1 ${orderStatusClass(order.status)}`}
          >
            {orderStatusLabel(order.status)}
          </span>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={saving}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm disabled:opacity-50"
            aria-label="Promijeni status narudžbe"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {orderStatusLabel(s)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-medium text-gray-900 mb-3">Kupac</h3>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-gray-500">Ime</dt>
              <dd className="text-gray-900">{order.customerName}</dd>
            </div>
            <div>
              <dt className="text-gray-500">E-mail</dt>
              <dd>
                <a href={`mailto:${order.customerEmail}`} className="text-gray-900 hover:underline">
                  {order.customerEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Telefon</dt>
              <dd className="text-gray-900">{order.customerPhone ?? '-'}</dd>
            </div>
          </dl>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-medium text-gray-900 mb-3">Dostava</h3>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-gray-500">Način</dt>
              <dd className="text-gray-900">{order.deliveryLabel}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Adresa / lokacija</dt>
              <dd className="text-gray-900">
                {formatAddress(order.deliveryMethod, order.shippingAddress)}
              </dd>
            </div>
            {order.paidAt && (
              <div>
                <dt className="text-gray-500">Plaćeno</dt>
                <dd className="text-gray-900">{formatDateTime(order.paidAt)}</dd>
              </div>
            )}
          </dl>
        </section>
      </div>

      <section className="bg-white rounded-xl border border-gray-200 mt-6 overflow-x-auto">
        <h3 className="font-medium text-gray-900 px-5 pt-5 pb-3">Stavke</h3>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left border-y border-gray-200">
            <tr>
              <th className="px-5 py-3 font-medium text-gray-600">Proizvod</th>
              <th className="px-5 py-3 font-medium text-gray-600 hidden sm:table-cell">ID</th>
              <th className="px-5 py-3 font-medium text-gray-600 text-right">Količina</th>
              <th className="px-5 py-3 font-medium text-gray-600 text-right">Cijena</th>
              <th className="px-5 py-3 font-medium text-gray-600 text-right">Ukupno</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-3 text-gray-900">{item.title}</td>
                <td className="px-5 py-3 hidden sm:table-cell text-gray-500 font-mono text-xs">
                  {item.productId}
                </td>
                <td className="px-5 py-3 text-right text-gray-700">{item.quantity}</td>
                <td className="px-5 py-3 text-right text-gray-700 whitespace-nowrap">
                  {formatPrice(item.unitPriceCents)}
                </td>
                <td className="px-5 py-3 text-right font-medium whitespace-nowrap">
                  {formatPrice(item.lineTotalCents)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-5 py-4 border-t border-gray-200 space-y-1.5 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Međuzbroj</span>
            <span>{formatPrice(order.subtotalCents)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Dostava</span>
            <span>{formatPrice(order.shippingCents)}</span>
          </div>
          {order.discountCents > 0 && (
            <div className="flex justify-between text-green-700">
              <span>Popust{order.promoCode ? ` (${order.promoCode})` : ''}</span>
              <span>−{formatPrice(order.discountCents)}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-100">
            <span>Ukupno</span>
            <span>{formatPrice(order.totalCents)}</span>
          </div>
        </div>
      </section>

      {order.notes && (
        <section className="bg-white rounded-xl border border-gray-200 p-5 mt-6">
          <h3 className="font-medium text-gray-900 mb-2">Napomena</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{order.notes}</p>
        </section>
      )}
    </div>
  );
}
