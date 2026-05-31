'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { FaCheckCircle, FaEnvelope, FaPhone } from 'react-icons/fa';

interface Props {
  params: { orderId: string };
}

export default function UspjehPage({ params }: Props) {
  const { clearCart } = useCart();
  const shortId = params.orderId.slice(0, 8).toUpperCase();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="flex justify-center mb-5">
          <FaCheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Plaćanje uspješno!</h1>
        <p className="text-gray-500 mb-6">
          Hvala na kupnji. Vaša narudžba je zaprimljena i plaćanje je potvrđeno.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">Broj narudžbe</p>
          <p className="text-lg font-bold text-gray-900 font-mono">#{shortId}</p>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Poslali smo potvrdu na vašu email adresu. Obavijestit ćemo vas kada narudžba bude poslana.
        </p>

        <div className="space-y-2 mb-8 text-sm text-gray-600">
          <p className="font-medium text-gray-700 mb-2">Imate pitanja?</p>
          <a
            href="mailto:info@visagestudio.hr"
            className="flex items-center justify-center gap-2 hover:text-gray-900 transition-colors"
          >
            <FaEnvelope className="w-4 h-4" />
            info@visagestudio.hr
          </a>
          <a
            href="tel:+385911105020"
            className="flex items-center justify-center gap-2 hover:text-gray-900 transition-colors"
          >
            <FaPhone className="w-4 h-4" />
            +385 91 110 5020
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/katalog"
            className="flex-1 py-3 border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition-colors text-sm"
          >
            Nastavi kupovinu
          </Link>
          <Link
            href="/"
            className="flex-1 py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-xl transition-colors text-sm"
          >
            Natrag na početnu
          </Link>
        </div>
      </div>
    </div>
  );
}
