'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/price-utils';
import { formatDateTime } from '@/lib/admin-labels';
import { getShippingOption, type DeliveryMethod } from '@/lib/shipping';

type CartItem = {
  title: string;
  quantity: number;
  unitPriceCents: number;
};

type RecoveryStage = 'none' | 'email_sent' | 'link_opened' | 'checkout_started' | 'converted';

type CartRecovery = {
  stage: RecoveryStage;
  lastEmailSentAt: string | null;
  linkOpenedAt: string | null;
  checkoutStartedAt: string | null;
};

type CheckoutAbandonedCart = {
  id: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string | null;
  totalCents: number;
  createdAt: string;
  abandonedAt: string | null;
  deliveryMethod: string;
  emailsSent: number;
  hasRecoveryToken: boolean;
  items: CartItem[];
  recovery: CartRecovery;
};

type RecoveredCart = {
  id: string;
  customerEmail: string;
  customerName: string;
  totalCents: number;
  convertedAt: string;
  paidAt: string | null;
  emailsSent: number;
};

type RecoveryStats = {
  emailsSent: number;
  linkOpened: number;
  checkoutStarted: number;
  converted: number;
  conversionRate: number | null;
};

type BrowseAbandonedCart = {
  id: string;
  visitorToken: string;
  customerEmail: string | null;
  customerName: string | null;
  subtotalCents: number;
  lastActivityAt: string;
  createdAt: string;
  items: CartItem[];
};

const RECOVERY_STAGE_LABELS: Record<RecoveryStage, string> = {
  none: '',
  email_sent: 'Mail poslan',
  link_opened: 'Otvoren link',
  checkout_started: 'Checkout započet',
  converted: 'Kupljeno',
};

function RecoveryStageBadge({ stage }: { stage: RecoveryStage }) {
  if (stage === 'none') return null;

  const styles: Record<Exclude<RecoveryStage, 'none'>, string> = {
    email_sent: 'bg-amber-50 text-amber-700',
    link_opened: 'bg-blue-50 text-blue-700',
    checkout_started: 'bg-violet-50 text-violet-700',
    converted: 'bg-green-50 text-green-700',
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[stage]}`}>
      {RECOVERY_STAGE_LABELS[stage]}
    </span>
  );
}

function FunnelStat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border px-4 py-3 ${highlight ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'}`}>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

function CartItemsTable({ items }: { items: CartItem[] }) {
  return (
    <table className="w-full text-sm">
      <tbody className="divide-y divide-gray-100">
        {items.map((item, idx) => (
          <tr key={idx}>
            <td className="py-2 text-gray-700">{item.title}</td>
            <td className="py-2 text-gray-500 text-right whitespace-nowrap pl-4">
              {item.quantity} × {formatPrice(item.unitPriceCents)}
            </td>
            <td className="py-2 font-medium text-gray-900 text-right whitespace-nowrap pl-4">
              {formatPrice(item.quantity * item.unitPriceCents)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function AdminAbandonedCartsPage() {
  const [carts, setCarts] = useState<CheckoutAbandonedCart[]>([]);
  const [browseCarts, setBrowseCarts] = useState<BrowseAbandonedCart[]>([]);
  const [recoveredCarts, setRecoveredCarts] = useState<RecoveredCart[]>([]);
  const [recoveryStats, setRecoveryStats] = useState<RecoveryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [sending, setSending] = useState<string | null>(null);
  const [sendResult, setSendResult] = useState<Map<string, { ok: boolean; msg: string }>>(
    new Map()
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetch('/api/admin/abandoned-carts');
    if (!res.ok) {
      setError('Ne mogu učitati napuštene košarice');
      setLoading(false);
      return;
    }
    const data = await res.json();
    setCarts(data.carts ?? []);
    setBrowseCarts(data.browseCarts ?? []);
    setRecoveredCarts(data.recoveredCarts ?? []);
    setRecoveryStats(data.recoveryStats ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleExpand = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleSendReminder = async (id: string) => {
    setSending(id);
    setSendResult((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });

    try {
      const res = await fetch('/api/admin/orders/abandoned-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error((data as { error?: string }).error ?? 'Greška');

      setSendResult((prev) => new Map(prev).set(id, { ok: true, msg: 'Mail poslan.' }));
      setCarts((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                emailsSent: c.emailsSent + 1,
                recovery: {
                  ...c.recovery,
                  stage: c.recovery.stage === 'none' ? 'email_sent' : c.recovery.stage,
                  lastEmailSentAt: new Date().toISOString(),
                },
              }
            : c
        )
      );
      setRecoveryStats((prev) =>
        prev ? { ...prev, emailsSent: prev.emailsSent + 1 } : prev
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Slanje nije uspjelo';
      setSendResult((prev) => new Map(prev).set(id, { ok: false, msg }));
    } finally {
      setSending(null);
    }
  };

  const browseWithEmail = browseCarts.filter((c) => c.customerEmail).length;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Napuštene košarice</h2>
          <p className="text-sm text-gray-500 mt-1">
            {loading
              ? 'Učitavanje…'
              : `${carts.length} na checkoutu · ${browseCarts.length} bez checkouta (${browseWithEmail} s emailom)`}
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          Osvježi
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {!loading && recoveryStats && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Recovery funnel (mail → kupnja)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <FunnelStat label="Mail poslan" value={recoveryStats.emailsSent} />
            <FunnelStat label="Otvoren link" value={recoveryStats.linkOpened} />
            <FunnelStat label="Checkout započet" value={recoveryStats.checkoutStarted} />
            <FunnelStat label="Kupljeno" value={recoveryStats.converted} highlight />
          </div>
          {recoveryStats.conversionRate !== null && (
            <p className="text-xs text-gray-500 mt-2">
              Stopa konverzije (kupljeno / poslano mailova):{' '}
              <span className="font-medium text-gray-700">{recoveryStats.conversionRate}%</span>
            </p>
          )}
        </section>
      )}

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="space-y-10">
          {recoveredCarts.length > 0 && (
            <section>
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900">Oporavljene kupnje</h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  Kupnje nakon poslanog recovery maila (ista narudžba).
                </p>
              </div>
              <div className="space-y-2">
                {recoveredCarts.map((cart) => (
                  <Link
                    key={cart.id}
                    href={`/admin/orders/${cart.id}`}
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3 bg-green-50/50 rounded-xl border border-green-100 hover:border-green-200 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{cart.customerName}</p>
                      <p className="text-sm text-gray-500 truncate">{cart.customerEmail}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-gray-900">{formatPrice(cart.totalCents)}</p>
                      <p className="text-xs text-green-700">
                        Kupljeno: {formatDateTime(cart.convertedAt)}
                      </p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full shrink-0">
                      Oporavljeno
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Checkout abandonment */}
          <section>
            <div className="mb-4">
              <h3 className="text-base font-semibold text-gray-900">Napušten checkout</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Korisnik je došao do Stripe plaćanja. Plaćene narudžbe su u tabu Narudžbe.
              </p>
            </div>

            {carts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 px-6 py-10 text-center">
                <p className="text-gray-500">Nema napuštenih checkout košarica.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {carts.map((cart) => {
                  const expandKey = `checkout-${cart.id}`;
                  const isExpanded = expanded.has(expandKey);
                  const result = sendResult.get(cart.id);

                  return (
                    <div
                      key={cart.id}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{cart.customerName}</p>
                          <p className="text-sm text-gray-500 truncate">{cart.customerEmail}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {getShippingOption(cart.deliveryMethod as DeliveryMethod).label}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="font-semibold text-gray-900">{formatPrice(cart.totalCents)}</p>
                          <p className="text-xs text-gray-400">
                            Napušteno: {formatDateTime(cart.abandonedAt ?? cart.createdAt)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                          <RecoveryStageBadge stage={cart.recovery.stage} />
                          {cart.emailsSent > 0 && cart.recovery.stage === 'none' && (
                            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                              {cart.emailsSent} mail{cart.emailsSent !== 1 ? 'a' : ''} poslan
                              {cart.emailsSent !== 1 ? 'o' : ''}
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => toggleExpand(expandKey)}
                            className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded border border-gray-200 hover:border-gray-300"
                          >
                            {isExpanded ? 'Sakrij' : `${cart.items.length} stavk${cart.items.length === 1 ? 'a' : 'i'}`}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSendReminder(cart.id)}
                            disabled={sending === cart.id || !cart.hasRecoveryToken}
                            className="text-sm font-medium bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {sending === cart.id ? 'Šalje…' : 'Pošalji mail'}
                          </button>
                        </div>
                      </div>

                      {result && (
                        <div
                          className={`px-5 pb-3 text-sm ${result.ok ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {result.msg}
                        </div>
                      )}

                      {isExpanded && (
                        <div className="border-t border-gray-100 px-5 py-3 bg-gray-50">
                          <CartItemsTable items={cart.items} />
                          {cart.recovery.lastEmailSentAt && (
                            <p className="text-xs text-gray-500 mt-2">
                              Mail poslan: {formatDateTime(cart.recovery.lastEmailSentAt)}
                            </p>
                          )}
                          {cart.recovery.linkOpenedAt && (
                            <p className="text-xs text-gray-500">
                              Link otvoren: {formatDateTime(cart.recovery.linkOpenedAt)}
                            </p>
                          )}
                          {cart.recovery.checkoutStartedAt && (
                            <p className="text-xs text-gray-500">
                              Checkout: {formatDateTime(cart.recovery.checkoutStartedAt)}
                            </p>
                          )}
                          {cart.customerPhone && (
                            <p className="text-xs text-gray-400 mt-2">Tel: {cart.customerPhone}</p>
                          )}
                          <p className="text-xs text-gray-300 font-mono mt-1">{cart.id}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Browse abandonment */}
          <section>
            <div className="mb-4">
              <h3 className="text-base font-semibold text-gray-900">Košarice bez checkouta</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Proizvodi u košarici, bez klika na Plaćanje. Prikaz nakon 1 minute neaktivnosti.
                Email je dostupan samo ako je korisnik upisao adresu na checkout stranici.
              </p>
            </div>

            {browseCarts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 px-6 py-10 text-center">
                <p className="text-gray-500">Nema napuštenih košarica bez checkouta.</p>
                <p className="text-sm text-gray-400 mt-1">
                  Pojavi se kad korisnik doda proizvode i ne dira košaricu barem 1 minutu.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {browseCarts.map((cart) => {
                  const expandKey = `browse-${cart.id}`;
                  const isExpanded = expanded.has(expandKey);

                  return (
                    <div
                      key={cart.id}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {cart.customerName?.trim() || 'Anonimno'}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {cart.customerEmail ?? '— nema emaila —'}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="font-semibold text-gray-900">
                            {formatPrice(cart.subtotalCents)}
                          </p>
                          <p className="text-xs text-gray-500">
                            Zadnja aktivnost: {formatDateTime(cart.lastActivityAt)}
                          </p>
                          <p className="text-xs text-gray-400">
                            Prva aktivnost: {formatDateTime(cart.createdAt)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {!cart.customerEmail && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              Anonimno
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => toggleExpand(expandKey)}
                            className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded border border-gray-200 hover:border-gray-300"
                          >
                            {isExpanded ? 'Sakrij' : `${cart.items.length} stavk${cart.items.length === 1 ? 'a' : 'i'}`}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-gray-100 px-5 py-3 bg-gray-50">
                          <CartItemsTable items={cart.items} />
                          <p className="text-xs text-gray-400 mt-2 font-mono">
                            visitor: {cart.visitorToken.slice(0, 12)}…
                          </p>
                          <p className="text-xs text-gray-300 font-mono mt-0.5">{cart.id}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
