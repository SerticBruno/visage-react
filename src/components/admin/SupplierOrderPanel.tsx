'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { buildMailtoUrl } from '@/lib/supplier-order-email';
import { shortId } from '@/lib/admin-labels';

type AdminProductRef = {
  id: string;
  title: string;
  marka: string;
  quantity: number;
};

type PreviewGroup =
  | {
      missingSupplier: true;
      marka: string;
      items: { productId: string; title: string; orderQuantity: number }[];
    }
  | {
      missingSupplier: false;
      supplier: { name: string; email: string; marka: string };
      to: string;
      subject: string;
      bodyText: string;
      items: { productId: string; title: string; orderQuantity: number }[];
    };

type CreatedOrder = {
  id: string;
  supplierName: string;
  supplierMarka: string;
};

interface SupplierOrderPanelProps {
  products: AdminProductRef[];
  selected: Map<string, number>;
  onClearSelection: () => void;
}

export default function SupplierOrderPanel({
  products,
  selected,
  onClearSelection,
}: SupplierOrderPanelProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [groups, setGroups] = useState<PreviewGroup[]>([]);
  const [createdOrders, setCreatedOrders] = useState<CreatedOrder[]>([]);
  const [emailConfigured, setEmailConfigured] = useState(false);

  const selectedCount = selected.size;

  const selectedSummary = useMemo(() => {
    return [...selected.entries()].map(([id, orderQuantity]) => {
      const product = products.find((p) => p.id === id);
      return {
        productId: id,
        title: product?.title ?? id,
        marka: product?.marka ?? '',
        orderQuantity,
      };
    });
  }, [selected, products]);

  const requestItems = useMemo(
    () =>
      [...selected.entries()].map(([productId, orderQuantity]) => ({
        productId,
        orderQuantity,
      })),
    [selected]
  );

  const loadPreview = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setCreatedOrders([]);

    const res = await fetch('/api/admin/supplier-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'preview',
        items: requestItems,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? 'Greška pri generiranju mailova');
      return;
    }

    setGroups(data.groups ?? []);
    setOpen(true);
  }, [requestItems]);

  useEffect(() => {
    fetch('/api/admin/supplier-orders')
      .then((res) => res.json())
      .then((data) => setEmailConfigured(!!data.emailConfigured))
      .catch(() => setEmailConfigured(false));
  }, []);

  const handleCreate = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    const res = await fetch('/api/admin/supplier-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create',
        items: requestItems,
      }),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? 'Greška pri spremanju narudžbenica');
      return;
    }

    const orders = (data.orders ?? []) as CreatedOrder[];
    setCreatedOrders(orders);

    let message = `Kreirano ${orders.length} narudžbenica u bazi.`;
    if (data.skippedMarkas?.length) {
      message += ` Bez dobavljača: ${data.skippedMarkas.join(', ')}.`;
    }
    setSuccess(message);
    onClearSelection();
  };

  const handleSend = async () => {
    if (!confirm('Spremiti narudžbenice i poslati mailove dobavljačima?')) return;

    setSending(true);
    setError(null);
    setSuccess(null);

    const res = await fetch('/api/admin/supplier-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'send',
        items: requestItems,
      }),
    });

    const data = await res.json();
    setSending(false);

    if (!res.ok) {
      setError(data.error ?? 'Greška pri slanju mailova');
      return;
    }

    const orders = (data.orders ?? []) as CreatedOrder[];
    setCreatedOrders(orders);
    setSuccess(`Poslano ${data.sent?.length ?? 0} mailova. Kreirano ${orders.length} narudžbenica.`);
    onClearSelection();
  };

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">{selectedCount}</span> proizvoda odabrano
            za narudžbu
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onClearSelection}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              Poništi odabir
            </button>
            <button
              type="button"
              onClick={loadPreview}
              disabled={loading}
              className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Generiram…' : 'Generiraj mailove'}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40"
          role="dialog"
          aria-modal="true"
          aria-labelledby="supplier-order-title"
        >
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-5 py-4">
              <div>
                <h3 id="supplier-order-title" className="text-lg font-semibold text-gray-900">
                  Mailovi dobavljačima
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {selectedSummary.length} proizvoda u {groups.length} grupa
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-2xl leading-none cursor-pointer"
                aria-label="Zatvori"
              >
                ×
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                  <p>{success}</p>
                  {createdOrders.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {createdOrders.map((order) => (
                        <li key={order.id}>
                          <Link
                            href={`/admin/purchase-orders/${order.id}`}
                            className="underline hover:no-underline"
                          >
                            #{shortId(order.id)} — {order.supplierName} ({order.supplierMarka})
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {groups.map((group, index) => {
                if (group.missingSupplier) {
                  return (
                    <div
                      key={`missing-${group.marka}`}
                      className="rounded-lg border border-amber-200 bg-amber-50 p-4"
                    >
                      <p className="font-medium text-amber-900">
                        Marka „{group.marka}” — nema konfiguriranog dobavljača
                      </p>
                      <ul className="mt-2 text-sm text-amber-800 list-disc pl-5 space-y-1">
                        {group.items.map((item) => (
                          <li key={item.productId}>
                            {item.title} — {item.orderQuantity} kom
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-amber-700 mt-2">
                        Dodajte dobavljača u SUPPLIERS_JSON (.env.local). Ove stavke se neće spremiti
                        u narudžbenicu.
                      </p>
                    </div>
                  );
                }

                const mailto = buildMailtoUrl(group.to, group.subject, group.bodyText);

                return (
                  <div
                    key={`${group.supplier.marka}-${index}`}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-gray-900">{group.supplier.name}</p>
                        <p className="text-sm text-gray-500">
                          {group.supplier.email} · marka {group.supplier.marka}
                        </p>
                      </div>
                      <a
                        href={mailto}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 whitespace-nowrap"
                      >
                        Otvori u mailu
                      </a>
                    </div>

                    <p className="text-sm font-medium text-gray-700 mt-3">Predmet</p>
                    <p className="text-sm text-gray-600">{group.subject}</p>

                    <p className="text-sm font-medium text-gray-700 mt-3">Sadržaj</p>
                    <pre className="mt-1 whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-xs text-gray-700 font-sans">
                      {group.bodyText}
                    </pre>
                  </div>
                );
              })}
            </div>

            <div className="sticky bottom-0 flex flex-wrap items-center justify-end gap-2 border-t border-gray-200 bg-white px-5 py-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer"
              >
                Zatvori
              </button>
              {groups.some((g) => !g.missingSupplier) && (
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={saving || sending}
                  className="rounded-md border border-gray-900 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Spremam…' : 'Spremi narudžbenice'}
                </button>
              )}
              {emailConfigured && groups.some((g) => !g.missingSupplier) && (
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={sending || saving || groups.some((g) => g.missingSupplier)}
                  className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
                  title={
                    groups.some((g) => g.missingSupplier)
                      ? 'Prvo konfigurirajte sve dobavljače ili spremite samo dostupne'
                      : undefined
                  }
                >
                  {sending ? 'Šaljem…' : 'Pošalji i spremi'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
