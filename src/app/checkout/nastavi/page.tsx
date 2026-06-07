'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart, type CartItem } from '@/context/CartContext';
import { formatPrice } from '@/lib/price-utils';
import {
  FaSpinner,
  FaShoppingCart,
  FaExclamationTriangle,
  FaArrowLeft,
} from 'react-icons/fa';
import type { Product } from '@/data/products';

type PreviewItem = {
  productId: string;
  title: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
  image: string | null;
  available: number;
  inStock: boolean;
};

type PreviewOrder = {
  id: string;
  customerName: string;
  deliveryLabel: string;
  subtotalCents: number;
  shippingCents: number;
  discountCents: number;
  totalCents: number;
  promoCode: string | null;
  hasStockIssues: boolean;
};

function NastaviContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const { replaceCartItems } = useCart();

  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [order, setOrder] = useState<PreviewOrder | null>(null);
  const [items, setItems] = useState<PreviewItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!token) {
      setErrorMessage('Neispravni link za nastavak narudžbe.');
      setStatus('error');
      return;
    }

    fetch(`/api/checkout/recover?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? 'Neispravni link');
        }
        return data as {
          redirect?: string;
          order?: PreviewOrder;
          items?: PreviewItem[];
          cartItems?: { product: Product; quantity: number }[];
        };
      })
      .then((data) => {
        if (data.redirect) {
          router.replace(data.redirect);
          return;
        }
        if (!data.order || !data.items) {
          throw new Error('Narudžba nije učitana');
        }
        setOrder(data.order);
        setItems(data.items);
        setCartItems(
          (data.cartItems ?? []).filter((i) => i.product && i.quantity > 0) as CartItem[]
        );
        setStatus('ready');
      })
      .catch((err: Error) => {
        setErrorMessage(err.message);
        setStatus('error');
      });
  }, [token, router]);

  const restoreCart = () => {
    if (cartItems.length > 0) {
      replaceCartItems(cartItems);
    }
  };

  const handleContinueShopping = () => {
    restoreCart();
    router.push('/katalog#produkti');
  };

  const handleGoToCheckout = async () => {
    if (!token || order?.hasStockIssues) return;

    setPaying(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/checkout/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = (await res.json()) as { url?: string; redirect?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? 'Plaćanje nije moguće pokrenuti');
      }

      if (data.redirect) {
        router.replace(data.redirect);
        return;
      }

      if (data.url) {
        // Spremi košaricu u pozadini prije Stripe redirecta
        restoreCart();
        window.location.href = data.url;
        return;
      }

      throw new Error('Stripe sesija nije kreirana');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Greška pri plaćanju');
      setPaying(false);
    }
  };

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <FaExclamationTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Ne mogu učitati narudžbu</h1>
          <p className="text-gray-500 text-sm mb-6">{errorMessage}</p>
          <Link
            href="/katalog"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Pregledaj katalog
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'loading' || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 text-gray-400 mx-auto animate-spin mb-4" />
          <p className="text-gray-500 text-sm">Učitavamo vašu narudžbu…</p>
        </div>
      </div>
    );
  }

  const firstName = order.customerName.split(' ')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <FaShoppingCart className="w-10 h-10 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">
            {firstName}, vaša košarica još čeka
          </h1>
          <p className="text-gray-500 mt-2">
            Ovo su proizvodi iz vaše nedovršene narudžbe. Možete nastaviti kupovinu ili odmah
            dovršiti plaćanje.
          </p>
        </div>

        {errorMessage && status === 'ready' && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {order.hasStockIssues && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Neki proizvodi više nisu dostupni u traženoj količini. Pregledajte katalog i
            ažurirajte košaricu prije plaćanja.
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li key={item.productId} className="flex gap-4 p-4 sm:p-5">
                <div className="relative h-20 w-20 shrink-0 rounded-lg bg-gray-50 overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-300">
                      <FaShoppingCart className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {item.quantity} × {formatPrice(item.unitPriceCents)}
                  </p>
                  {!item.inStock && (
                    <p className="text-xs text-red-600 mt-1">
                      Dostupno: {item.available} kom
                    </p>
                  )}
                </div>
                <p className="font-medium text-gray-900 whitespace-nowrap">
                  {formatPrice(item.lineTotalCents)}
                </p>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-100 px-5 py-4 space-y-2 text-sm bg-gray-50">
            <div className="flex justify-between text-gray-600">
              <span>Ukupno proizvodi</span>
              <span>{formatPrice(order.subtotalCents)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Dostava ({order.deliveryLabel})</span>
              <span>{order.shippingCents === 0 ? 'Besplatno' : formatPrice(order.shippingCents)}</span>
            </div>
            {order.discountCents > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Popust{order.promoCode ? ` (${order.promoCode})` : ''}</span>
                <span>−{formatPrice(order.discountCents)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-200">
              <span>Ukupno</span>
              <span>{formatPrice(order.totalCents)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleContinueShopping}
            disabled={cartItems.length === 0}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
            Nastavi kupovinu
          </button>
          <button
            type="button"
            onClick={handleGoToCheckout}
            disabled={order.hasStockIssues || cartItems.length === 0 || paying}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-medium text-white hover:bg-black disabled:opacity-50 transition-colors"
          >
            {paying ? (
              <>
                <FaSpinner className="w-4 h-4 animate-spin" />
                Preusmjeravanje na plaćanje…
              </>
            ) : (
              'Nastavi na plaćanje'
            )}
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          Plaćanje koristi već unesene podatke — ne morate ponovo ispunjavati checkout formu.
        </p>
      </div>
    </div>
  );
}

export default function NastaviPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <FaSpinner className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      }
    >
      <NastaviContent />
    </Suspense>
  );
}
