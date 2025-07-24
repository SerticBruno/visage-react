'use client';

import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { FaTimes, FaLeaf, FaTag, FaFire } from 'react-icons/fa';
import Image from 'next/image';
import { Product } from '@/data/products';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  if (!product) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30" onClick={onClose} />
        
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative">
            {/* Close Button - Outside Modal */}
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 z-20 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer p-2 hover:bg-slate-100 rounded-full bg-white shadow-md"
            >
              <FaTimes size={20} />
            </button>
            
            <div className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-4 shadow-2xl transition-all border border-slate-200 max-h-[90vh]">
            
            <div className="overflow-y-auto max-h-[calc(90vh-2rem)] pr-2">
            <div className="flex justify-between items-start mb-3 pb-3 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                {product.title}
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-2/5">
                <div className="relative h-64 md:h-96 bg-slate-50 rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-6"
                  />
                  {/* Product Badges in Modal */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-emerald-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                        <FaLeaf className="w-4 h-4" />
                        Novo
                      </span>
                    )}
                    {product.isOnSale && product.oldPrice && (
                      <span className="bg-rose-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                        <FaTag className="w-4 h-4" />
                        Akcija
                      </span>
                    )}
                    {product.isLimited && (
                      <span className="bg-violet-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                        <FaFire className="w-4 h-4" />
                        Limitirano
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      {product.isOnSale && product.oldPrice ? (
                        <>
                          <span className="text-sm text-slate-400 line-through">{product.oldPrice}</span>
                          <span className="text-xl font-bold text-rose-500">{product.price}</span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-slate-900">{product.price}</span>
                      )}
                    </div>
                    {product.isOnSale && product.oldPrice && (
                      <span className="bg-rose-500 text-white text-sm font-bold w-12 h-12 rounded-full shadow-lg transform -rotate-12 flex items-center justify-center">
                        -{Math.round((1 - parseFloat(product.price) / parseFloat(product.oldPrice)) * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-3/5 space-y-3">
                <div className="bg-slate-50 rounded-xl p-3">
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">Opis</h3>
                  <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </div>
                </div>

                {product.volume && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">Sadržaj</h3>
                    <p className="text-sm text-slate-600">{product.volume}</p>
                  </div>
                )}

                {product.activeIngredients && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">Aktivni sastojci</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {product.activeIngredients.join(', ')}
                    </p>
                  </div>
                )}

                {product.application && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">Primjena</h3>
                    <ul className="list-disc list-outside text-sm text-slate-600 space-y-0.5 pl-4">
                      {product.application.map((step, index) => (
                        <li key={index} className="leading-relaxed">{step}</li>
                      ))}
                    </ul>
                  </div>
                )}


              </div>
                          </div>
            </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
} 