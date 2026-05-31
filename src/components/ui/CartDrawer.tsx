'use client';

import { Fragment, useCallback, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { FaTimes, FaShoppingCart, FaTrash, FaMinus, FaPlus, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatPrice, parsePriceCents } from '@/lib/price-utils';
import { getProductStock } from '@/lib/inventory';
import {
  getAmountUntilFreeShippingCents,
  getFreeShippingThresholdLabel,
  qualifiesForFreeShipping,
} from '@/lib/shipping';

export default function CartDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    items,
    isOpen,
    isCheckoutLoading,
    closeCart,
    removeItem,
    updateQuantity,
    subtotalCents,
    startCheckoutLoading,
    finishCheckoutLoading,
  } = useCart();
  const freeShipping = qualifiesForFreeShipping(subtotalCents);
  const untilFreeShippingCents = getAmountUntilFreeShippingCents(subtotalCents);

  useEffect(() => {
    if (isOpen && items.length > 0) {
      router.prefetch('/checkout');
    }
  }, [isOpen, items.length, router]);

  const handleCheckout = useCallback(async () => {
    if (isCheckoutLoading || items.length === 0) return;

    if (pathname === '/checkout') {
      closeCart();
      return;
    }

    startCheckoutLoading();
    try {
      await router.push('/checkout');
    } catch {
      finishCheckoutLoading();
    }
  }, [
    closeCart,
    finishCheckoutLoading,
    isCheckoutLoading,
    items.length,
    pathname,
    router,
    startCheckoutLoading,
  ]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-[60] flex justify-end">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />
        </Transition.Child>

        {/* Drawer */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FaShoppingCart className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Košarica</h2>
                {items.length > 0 && (
                  <span className="ml-1 bg-gray-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <FaShoppingCart className="w-12 h-12 text-gray-200 mb-4" />
                  <p className="text-gray-500 font-medium">Košarica je prazna</p>
                  <p className="text-sm text-gray-400 mt-1">Dodajte proizvode iz kataloga</p>
                  <Link
                    href="/katalog#produkti"
                    onClick={closeCart}
                    className="mt-6 px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors"
                  >
                    Idi na katalog
                  </Link>
                </div>
              ) : (
                items.map((item) => {
                  const priceCents = parsePriceCents(item.product.price);
                  const stock = getProductStock(item.product);
                  const atMaxStock = stock !== null && item.quantity >= stock;
                  return (
                    <div key={item.product.id} className="flex gap-3 py-3 border-b border-gray-50 last:border-0">
                      {/* Image */}
                      <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className={`object-contain ${item.product.imageNeedsResize ? 'scale-75' : ''}`}
                          sizes="64px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.product.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.product.marka}</p>
                        {item.product.volume && (
                          <p className="text-xs text-gray-400">{item.product.volume}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-0.5">{formatPrice(priceCents)} / kom</p>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                              className="text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <FaMinus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={atMaxStock}
                              className="text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <FaPlus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(priceCents * item.quantity)}
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="flex-shrink-0 p-1 text-gray-300 hover:text-red-400 transition-colors self-start mt-0.5 cursor-pointer"
                        title="Ukloni"
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-100 space-y-3 bg-white">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ukupno</span>
                  <span className="text-base font-semibold text-gray-900">{formatPrice(subtotalCents)}</span>
                </div>
                <p className="text-xs text-gray-400">
                  {freeShipping
                    ? 'Besplatna dostava (BoxNow / GLS)'
                    : `Besplatna dostava iznad ${getFreeShippingThresholdLabel()} - još ${formatPrice(untilFreeShippingCents)}`}
                </p>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isCheckoutLoading}
                  className={`relative flex w-full items-center justify-center gap-2 font-medium py-3 rounded-xl transition-colors cursor-pointer ${
                    isCheckoutLoading
                      ? 'bg-gray-500 text-white cursor-wait'
                      : 'bg-gray-900 hover:bg-black text-white'
                  }`}
                >
                  {isCheckoutLoading ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" aria-hidden />
                      Priprema
                    </>
                  ) : (
                    'Nastavi na plaćanje'
                  )}
                </button>
                <button
                  onClick={closeCart}
                  className="block w-full text-center text-sm text-gray-500 hover:text-gray-700 py-1 transition-colors cursor-pointer"
                >
                  Nastavi kupovinu
                </button>
              </div>
            )}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
