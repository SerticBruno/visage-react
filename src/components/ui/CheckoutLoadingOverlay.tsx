'use client';

import { FaSpinner } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

export default function CheckoutLoadingOverlay() {
  const { isCheckoutLoading } = useCart();

  if (!isCheckoutLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-md"
      role="alert"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/90 px-8 py-7 shadow-xl border border-gray-100">
        <FaSpinner className="w-9 h-9 text-gray-800 animate-spin" aria-hidden />
        <p className="text-sm font-medium text-gray-800">Priprema checkouta…</p>
      </div>
    </div>
  );
}
