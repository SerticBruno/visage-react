'use client';

import { useCart } from '@/context/CartContext';
import { formatPrice, parsePriceCents } from '@/lib/price-utils';
import {
  getAmountUntilFreeShippingCents,
  getFreeShippingThresholdLabel,
  qualifiesForFreeShipping,
} from '@/lib/shipping';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

export default function KosaricaPage() {
  const { items, removeItem, updateQuantity, subtotalCents } = useCart();
  const freeShipping = qualifiesForFreeShipping(subtotalCents);
  const untilFreeShippingCents = getAmountUntilFreeShippingCents(subtotalCents);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <FaShoppingCart className="w-16 h-16 text-gray-200 mb-6" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Košarica je prazna</h1>
        <p className="text-gray-500 mb-8">Pregledajte naš katalog i dodajte željene proizvode.</p>
        <Link
          href="/katalog#produkti"
          className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-colors"
        >
          Pregledaj katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/katalog#produkti"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          <FaArrowLeft className="w-3 h-3" />
          Natrag na katalog
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Košarica ({items.reduce((s, i) => s + i.quantity, 0)} {items.reduce((s, i) => s + i.quantity, 0) === 1 ? 'proizvod' : 'proizvoda'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const priceCents = parsePriceCents(item.product.price);
              return (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      className={`object-contain ${item.product.imageNeedsResize ? 'scale-75' : ''}`}
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{item.product.title}</p>
                    <p className="text-sm text-gray-500">{item.product.marka}</p>
                    {item.product.volume && (
                      <p className="text-xs text-gray-400 mt-0.5">{item.product.volume}</p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          className="text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">
                          {formatPrice(priceCents * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
                          title="Ukloni"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sažetak narudžbe</h2>

              <div className="space-y-2 text-sm">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-gray-600">
                    <span className="truncate mr-2">{item.product.title} × {item.quantity}</span>
                    <span className="flex-shrink-0">{formatPrice(parsePriceCents(item.product.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>Dostava</span>
                  <span>
                    {freeShipping ? (
                      <span className="text-emerald-700 font-medium">Besplatno</span>
                    ) : (
                      'na checkoutu'
                    )}
                  </span>
                </div>
                {freeShipping ? (
                  <p className="text-xs text-emerald-700 mb-3">
                    Imate pravo na besplatnu dostavu (BoxNow / GLS)
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mb-3">
                    Besplatna dostava iznad {getFreeShippingThresholdLabel()} - još{' '}
                    {formatPrice(untilFreeShippingCents)}
                  </p>
                )}
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Ukupno (bez dostave)</span>
                  <span>{formatPrice(subtotalCents)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-5 block w-full text-center bg-gray-900 hover:bg-black text-white font-medium py-3 rounded-xl transition-colors"
              >
                Nastavi na plaćanje
              </Link>

              <p className="text-xs text-gray-400 text-center mt-3">
                Siguran checkout putem Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
