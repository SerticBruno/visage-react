'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  formatDateTime,
  purchaseOrderStatusClass,
  purchaseOrderStatusLabel,
  shortId,
} from '@/lib/admin-labels';

type PurchaseOrderItem = {
  id: string;
  productId: string;
  productTitle: string;
  productSku: string | null;
  orderedQuantity: number;
  receivedQuantity: number | null;
  currentStock: number | null;
};

type PurchaseOrderDetail = {
  id: string;
  status: string;
  supplierName: string;
  supplierEmail: string;
  supplierMarka: string;
  emailSubject: string | null;
  emailBody: string | null;
  emailSentAt: string | null;
  orderedAt: string;
  receivedAt: string | null;
  notes: string | null;
  items: PurchaseOrderItem[];
};

type ReceiveDraft = {
  delivered: boolean;
  receivedQuantity: number;
};

export default function AdminPurchaseOrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<PurchaseOrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [receiveDraft, setReceiveDraft] = useState<Record<string, ReceiveDraft>>({});

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/purchase-orders/${orderId}`);
    if (!res.ok) {
      setError('Narudžbenica nije pronađena');
      setLoading(false);
      return;
    }
    const data = await res.json();
    const loaded = data.order as PurchaseOrderDetail;
    setOrder(loaded);

    if (loaded.status === 'ordered') {
      const draft: Record<string, ReceiveDraft> = {};
      for (const item of loaded.items) {
        draft[item.id] = {
          delivered: true,
          receivedQuantity: item.orderedQuantity,
        };
      }
      setReceiveDraft(draft);
    }

    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    load();
  }, [load]);

  const partialSummary = useMemo(() => {
    if (!order || order.status !== 'ordered') return null;
    const lines = order.items.map((item) => {
      const draft = receiveDraft[item.id];
      const received = draft?.delivered ? draft.receivedQuantity : 0;
      return { item, received };
    });
    const hasPartial = lines.some((l) => l.received < l.item.orderedQuantity);
    const hasMissing = lines.some((l) => l.received === 0);
    const totalReceived = lines.reduce((sum, l) => sum + l.received, 0);
    return { hasPartial, hasMissing, totalReceived };
  }, [order, receiveDraft]);

  const toggleDelivered = (item: PurchaseOrderItem, delivered: boolean) => {
    setReceiveDraft((prev) => ({
      ...prev,
      [item.id]: {
        delivered,
        receivedQuantity: delivered
          ? (prev[item.id]?.receivedQuantity ?? item.orderedQuantity)
          : 0,
      },
    }));
  };

  const updateReceivedQuantity = (item: PurchaseOrderItem, value: string) => {
    const parsed = Math.max(0, Math.min(item.orderedQuantity, Math.floor(Number(value) || 0)));
    setReceiveDraft((prev) => ({
      ...prev,
      [item.id]: {
        delivered: parsed > 0,
        receivedQuantity: parsed,
      },
    }));
  };

  const handleReceive = async () => {
    if (!order) return;
    if (
      !confirm(
        'Prihvatiti isporuku i dodati primljene količine na zalihe? Ova radnja se ne može poništiti.'
      )
    ) {
      return;
    }

    setSaving(true);
    setError(null);

    const res = await fetch(`/api/admin/purchase-orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'receive',
        items: order.items.map((item) => {
          const draft = receiveDraft[item.id];
          return {
            itemId: item.id,
            receivedQuantity: draft?.delivered ? draft.receivedQuantity : 0,
          };
        }),
      }),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? 'Greška pri primitku isporuke');
      return;
    }

    setOrder(data.order);
  };

  const handleCancel = async () => {
    if (!order || !confirm('Otkazati narudžbenicu?')) return;

    setSaving(true);
    const res = await fetch(`/api/admin/purchase-orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'cancel' }),
    });
    const data = await res.json();
    setSaving(false);

    if (res.ok) {
      setOrder(data.order);
    } else {
      setError(data.error ?? 'Greška pri otkazivanju');
    }
  };

  if (loading) {
    return <p className="text-gray-500">Učitavanje narudžbenice…</p>;
  }

  if (error && !order) {
    return (
      <div>
        <p className="text-red-600 mb-4">{error}</p>
        <Link href="/admin/purchase-orders" className="text-sm text-gray-500 hover:text-gray-900">
          ← Natrag na narudžbenice
        </Link>
      </div>
    );
  }

  if (!order) return null;

  const isReceiving = order.status === 'ordered';

  return (
    <div>
      <Link
        href="/admin/purchase-orders"
        className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        ← Natrag na narudžbenice
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Narudžbenica #{shortId(order.id)}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {order.supplierName} · {order.supplierMarka}
          </p>
        </div>
        <span
          className={`text-xs rounded-full px-2.5 py-1 font-medium ${purchaseOrderStatusClass(order.status)}`}
        >
          {purchaseOrderStatusLabel(order.status)}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500">Dobavljač</p>
          <p className="font-medium text-gray-900 mt-1">{order.supplierName}</p>
          <a href={`mailto:${order.supplierEmail}`} className="text-gray-600 hover:underline">
            {order.supplierEmail}
          </a>
        </div>
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500">Naručeno</p>
          <p className="font-medium text-gray-900 mt-1">{formatDateTime(order.orderedAt)}</p>
          {order.emailSentAt && (
            <p className="text-xs text-gray-500 mt-1">
              Mail poslan: {formatDateTime(order.emailSentAt)}
            </p>
          )}
        </div>
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500">Primitak</p>
          <p className="font-medium text-gray-900 mt-1">
            {order.receivedAt ? formatDateTime(order.receivedAt) : '—'}
          </p>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

      {isReceiving && partialSummary && (
        <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          Označite što je stiglo i po potrebi uredite primljenu količinu (npr. naručeno 5, stiglo 4).
          Ukupno za dodati na zalihe: <strong>{partialSummary.totalReceived} kom</strong>.
        </div>
      )}

      <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left border-b border-gray-200">
            <tr>
              {isReceiving && <th className="px-4 py-3 w-12">Stiglo</th>}
              <th className="px-4 py-3 font-medium text-gray-600">Proizvod</th>
              <th className="px-4 py-3 font-medium text-gray-600">Naručeno</th>
              <th className="px-4 py-3 font-medium text-gray-600">
                {isReceiving ? 'Primljeno' : 'Primljeno'}
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 hidden md:table-cell">
                Trenutna zaliha
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {order.items.map((item) => {
              const draft = receiveDraft[item.id];
              const receivedValue = isReceiving
                ? draft?.delivered
                  ? draft.receivedQuantity
                  : 0
                : (item.receivedQuantity ?? 0);
              const isPartialLine =
                order.status === 'received' && receivedValue < item.orderedQuantity;
              const isMissingLine = order.status === 'received' && receivedValue === 0;

              return (
                <tr
                  key={item.id}
                  className={
                    isMissingLine
                      ? 'bg-red-50'
                      : isPartialLine
                        ? 'bg-amber-50'
                        : 'hover:bg-gray-50/80'
                  }
                >
                  {isReceiving && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={draft?.delivered ?? false}
                        onChange={(e) => toggleDelivered(item, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                        aria-label={`Stiglo: ${item.productTitle}`}
                      />
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{item.productTitle}</p>
                    <p className="text-xs text-gray-500 font-mono">
                      {item.productSku ? `Šifra: ${item.productSku}` : item.productId}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{item.orderedQuantity} kom</td>
                  <td className="px-4 py-3">
                    {isReceiving ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min={0}
                          max={item.orderedQuantity}
                          value={draft?.delivered ? draft.receivedQuantity : 0}
                          disabled={!draft?.delivered}
                          onChange={(e) => updateReceivedQuantity(item, e.target.value)}
                          className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm disabled:bg-gray-100"
                        />
                        <span className="text-xs text-gray-500">kom</span>
                      </div>
                    ) : (
                      <span
                        className={
                          receivedValue < item.orderedQuantity
                            ? 'text-amber-800 font-medium'
                            : 'text-gray-700'
                        }
                      >
                        {receivedValue} kom
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500">
                    {item.currentStock ?? '—'}
                    {isReceiving && draft?.delivered && draft.receivedQuantity > 0 && (
                      <span className="text-green-700 text-xs block">
                        → {(item.currentStock ?? 0) + draft.receivedQuantity}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {order.emailBody && (
        <details className="mt-6 rounded-lg border border-gray-200 bg-white">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-gray-700">
            Poslani mail dobavljaču
          </summary>
          <pre className="px-4 pb-4 text-xs text-gray-600 whitespace-pre-wrap font-sans">
            {order.emailSubject ? `Predmet: ${order.emailSubject}\n\n` : ''}
            {order.emailBody}
          </pre>
        </details>
      )}

      {isReceiving && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleReceive}
            disabled={saving}
            className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Spremam…' : 'Prihvati isporuku i ažuriraj zalihe'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
          >
            Otkaži narudžbenicu
          </button>
        </div>
      )}
    </div>
  );
}
