'use client';

import { Suspense, use, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/price-utils';
import { FaCheckCircle, FaEnvelope, FaPhone, FaSpinner } from 'react-icons/fa';

interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
  image: string | null;
  marka: string | null;
  volume: string | null;
  description: string | null;
  imageNeedsResize: boolean;
}

interface OrderSummary {
  id: string;
  status: string;
  customerName: string;
  deliveryLabel: string;
  subtotalCents: number;
  shippingCents: number;
  discountCents: number;
  promoCode: string | null;
  totalCents: number;
}

interface Props {
  params: Promise<{ orderId: string }>;
}

const DESCRIPTION_COLLAPSED_LINES = 2;

function OrderItemDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong =
    description.length > 100 || description.split('\n').length > DESCRIPTION_COLLAPSED_LINES;

  if (!isLong) {
    return <p className="text-sm text-gray-500 mt-2 whitespace-pre-line">{description}</p>;
  }

  return (
    <div className="mt-2">
      <p
        className={`text-sm text-gray-500 whitespace-pre-line ${expanded ? '' : 'line-clamp-2'}`}
      >
        {description}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="text-sm font-medium text-gray-700 hover:text-gray-900 mt-1 underline-offset-2 hover:underline cursor-pointer"
      >
        {expanded ? 'Sakrij' : 'Pročitaj više'}
      </button>
    </div>
  );
}

function UspjehPageContent({ params }: Props) {
  const { orderId } = use(params);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const shortId = orderId.slice(0, 8).toUpperCase();

  useEffect(() => {
    let cancelled = false;

    async function loadOrder() {
      try {
        let paymentConfirmed = false;

        if (sessionId) {
          const confirmRes = await fetch(`/api/orders/${orderId}/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: sessionId }),
          }).catch(() => null);

          if (confirmRes?.ok) {
            paymentConfirmed = true;
          }
        }

        const query = sessionId ? `?session_id=${encodeURIComponent(sessionId)}` : '';
        const orderRes = await fetch(`/api/orders/${orderId}${query}`);
        if (!orderRes.ok) {
          const body = await orderRes.json().catch(() => ({}));
          throw new Error(body.error ?? 'Narudžba nije učitana');
        }

        const data = (await orderRes.json()) as { order: OrderSummary; items: OrderItem[] };
        if (cancelled) return;

        setOrder(data.order);
        setItems(data.items);

        // Clear cart after confirm succeeds or order is marked paid
        if (data.order.status === 'paid' || paymentConfirmed) {
          clearCart();
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Greška');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOrder();

    return () => {
      cancelled = true;
    };
  }, [orderId, sessionId, clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10 lg:py-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Left - confirmation */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <FaCheckCircle className="w-10 h-10 text-green-500 flex-shrink-0" />
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-gray-900">Plaćanje uspješno!</h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Hvala{order?.customerName ? ` ${order.customerName.split(' ')[0]}` : ''} na kupnji.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-5 text-left">
                <p className="text-sm text-gray-500 mb-1">Broj narudžbe</p>
                <p className="text-lg font-bold text-gray-900 font-mono">#{shortId}</p>
              </div>

              <p className="text-sm text-gray-600 text-left mb-6">
                Poslali smo potvrdu na vašu email adresu. Obavijestit ćemo vas kada narudžba bude
                poslana.
              </p>

              <div className="space-y-2 mb-8 text-sm text-gray-600 text-left">
                <p className="font-medium text-gray-700">Imate pitanja?</p>
                <a
                  href="mailto:info@visagestudio.hr"
                  className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                >
                  <FaEnvelope className="w-4 h-4 flex-shrink-0" />
                  info@visagestudio.hr
                </a>
                <a
                  href="tel:+385911105020"
                  className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                >
                  <FaPhone className="w-4 h-4 flex-shrink-0" />
                  +385 91 110 5020
                </a>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/katalog"
                  className="flex-1 py-3 border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition-colors text-sm text-center"
                >
                  Nastavi kupovinu
                </Link>
                <Link
                  href="/"
                  className="flex-1 py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-xl transition-colors text-sm text-center"
                >
                  Natrag na početnu
                </Link>
              </div>
            </div>
          </div>

          {/* Right - items + totals */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 px-1">Vaša narudžba</h2>

            {loading && (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-gray-400">
                <FaSpinner className="w-8 h-8 animate-spin mb-3" />
                <p className="text-sm">Učitavanje narudžbe…</p>
              </div>
            )}

            {error && !loading && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-sm text-gray-600">
                <p>{error}</p>
                <p className="mt-2 text-gray-500">
                  Narudžba #{shortId} je zaprimljena - provjerite email za potvrdu.
                </p>
              </div>
            )}

            {!loading &&
              !error &&
              items.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={`object-contain ${item.imageNeedsResize ? 'scale-75' : ''}`}
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100" aria-hidden />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      {item.marka && (
                        <p className="text-sm text-gray-500">{item.marka}</p>
                      )}
                      {item.volume && (
                        <p className="text-xs text-gray-400 mt-0.5">{item.volume}</p>
                      )}
                      {item.description && <OrderItemDescription description={item.description} />}
                      <p className="text-sm text-gray-500 mt-2 sm:hidden">
                        Količina: {item.quantity}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 mt-3 sm:mt-0 flex-shrink-0">
                      <span className="text-sm text-gray-500 hidden sm:block">
                        × {item.quantity}
                      </span>
                      <span className="font-semibold text-gray-900 whitespace-nowrap">
                        {formatPrice(item.lineTotalCents)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            {order && !loading && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Sažetak</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Proizvodi</span>
                    <span>{formatPrice(order.subtotalCents)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dostava ({order.deliveryLabel})</span>
                    <span>
                      {order.shippingCents === 0
                        ? 'Besplatno'
                        : formatPrice(order.shippingCents)}
                    </span>
                  </div>
                  {order.discountCents > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>
                        Popust
                        {order.promoCode ? ` (${order.promoCode})` : ''}
                      </span>
                      <span>−{formatPrice(order.discountCents)}</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-semibold text-gray-900">
                  <span>Ukupno</span>
                  <span>{formatPrice(order.totalCents)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UspjehPage(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <FaSpinner className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      }
    >
      <UspjehPageContent {...props} />
    </Suspense>
  );
}
