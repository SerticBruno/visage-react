'use client';

import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { FaTimes, FaCheck, FaGift } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { ComboPackage } from '@/data/comboPackages';

interface SingleComboPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  comboPackage: ComboPackage;
  serviceId: string;
  serviceTitle: string;
}

export default function SingleComboPackageModal({ 
  isOpen, 
  onClose, 
  comboPackage, 
  serviceId, 
}: SingleComboPackageModalProps) {
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
            
            <div className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all border border-slate-200 max-h-[90vh]">
              {/* Header */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={comboPackage.image}
                  alt={comboPackage.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Header Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {comboPackage.title}
                  </h2>
                  <p className="text-white/90 text-lg">
                    {comboPackage.description}
                  </p>
                </div>
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-16rem)]">
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Services Included */}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <FaGift className="text-slate-600" />
                          Uključene usluge
                        </h3>
                        <div className="space-y-3">
                          {comboPackage.services.map((service) => (
                            <div 
                              key={service.id}
                              className={`flex items-center p-3 rounded-lg border ${
                                service.id === serviceId 
                                  ? 'bg-slate-100 border-slate-300' 
                                  : 'bg-white border-slate-200'
                              }`}
                            >
                              <div className={`w-3 h-3 rounded-full mr-3 ${
                                service.id === serviceId 
                                  ? 'bg-slate-600' 
                                  : 'bg-slate-400'
                              }`} />
                              <div className="flex-1">
                                {service.id === serviceId ? (
                                  <span className="font-medium text-slate-800">
                                    {service.title}
                                  </span>
                                ) : (
                                  <Link
                                    href={`/usluge/${service.id}`}
                                    className="font-medium hover:underline text-slate-700"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {service.title}
                                  </Link>
                                )}
                                {service.shortDescription && (
                                  <p className="text-sm text-slate-500 mt-1">
                                    {service.shortDescription}
                                  </p>
                                )}
                              </div>
                              {service.id === serviceId && (
                                <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full font-medium">
                                  Ova usluga
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Products Included */}
                      {comboPackage.products && comboPackage.products.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-4">
                            Uključeni proizvodi
                          </h3>
                          <div className="space-y-3">
                            {comboPackage.products.map((product) => (
                              <div 
                                key={product.id}
                                className="flex items-center p-3 rounded-lg border border-slate-200 bg-white"
                              >
                                <div className="w-3 h-3 rounded-full mr-3 bg-slate-400" />
                                <Link
                                  href={`/katalog?product=${product.id}`}
                                  className="text-slate-700 font-medium hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {product.title}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Pricing */}
                      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                          Cijena paketa
                        </h3>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-3xl font-bold text-slate-900">
                              {comboPackage.price}
                            </span>
                            {comboPackage.oldPrice && (
                              <span className="text-lg text-slate-500 line-through ml-3">
                                {comboPackage.oldPrice}
                              </span>
                            )}
                          </div>
                          {comboPackage.oldPrice && (
                            <div className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-2 rounded-lg">
                              Ušteda {calculateSavings(comboPackage.oldPrice, comboPackage.price)}
                            </div>
                          )}
                        </div>
                        {comboPackage.oldPrice && (
                          <div className="text-sm text-slate-600">
                            Uštedite {Math.round((1 - parseFloat(comboPackage.price.replace(/\D/g, '')) / parseFloat(comboPackage.oldPrice.replace(/\D/g, ''))) * 100)}% u odnosu na pojedinačne usluge
                          </div>
                        )}
                      </div>

                      {/* Benefits */}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <FaCheck className="text-green-600" />
                          Prednosti paketa
                        </h3>
                        <ul className="space-y-3">
                          {comboPackage.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start text-slate-700">
                              <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="leading-relaxed">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <Link
                      href={`/kontakt?combo=${encodeURIComponent(comboPackage.title)}`}
                      onClick={onClose}
                      className="w-full inline-flex items-center justify-center px-6 py-4 border border-slate-600 text-base font-medium rounded-xl text-white bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:shadow-lg"
                    >
                      Rezervirajte ovaj paket
                    </Link>
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

function calculateSavings(oldPrice: string, newPrice: string): string {
  const old = parseInt(oldPrice.replace(/\D/g, ''));
  const new_ = parseInt(newPrice.replace(/\D/g, ''));
  const savings = old - new_;
  return `${savings} EUR`;
} 