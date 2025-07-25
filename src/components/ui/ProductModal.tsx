'use client';

import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { FaTimes, FaLeaf, FaTag, FaFire, FaShieldAlt } from 'react-icons/fa';
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
            
            <div className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all border border-slate-200 max-h-[90vh]">
              {/* Header */}
              <div className="flex justify-between items-start p-4 pb-3 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">
                  {product.title}
                </h2>
              </div>
              
              {/* Content */}
              <div className="flex flex-col md:flex-row">
                {/* Fixed Left Side */}
                <div className="w-full md:w-2/5 p-4 border-r border-slate-100">
                  <div className="relative h-64 md:h-96 bg-slate-50 rounded-xl overflow-hidden shadow-sm">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
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
                
                {/* Scrollable Right Side */}
                <div className="w-full md:w-3/5 overflow-y-auto max-h-[calc(90vh-5rem)]">
                  <div className="p-4 space-y-3">
                    <div className="bg-slate-50 rounded-xl p-3">
                      <h3 className="text-sm font-semibold text-slate-900 mb-1">Opis</h3>
                      <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                        {product.description}
                      </div>
                    </div>

                    {product.volume && (
                      <div className="bg-slate-50 rounded-xl p-3">
                        <h3 className="text-sm font-semibold text-slate-900 mb-1">
                          {product.category === 'Beauty Tretmani' ? 'Trajanje' : 'Sadržaj'}
                        </h3>
                        <p className="text-sm text-slate-600">{product.volume}</p>
                      </div>
                    )}

                    {product.activeIngredients && (
                      <div className="bg-slate-50 rounded-xl p-3">
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">
                          {product.category === 'Beauty Tretmani' ? 'Prednosti' : 'Aktivni sastojci'}
                        </h3>
                        {product.category === 'Beauty Tretmani' ? (
                          <div className="space-y-2">
                            {product.activeIngredients.map((ingredient, index) => (
                              <div key={index} className="flex items-start">
                                <span className="flex-shrink-0 w-1.5 h-1.5 bg-slate-400 rounded-full mr-3 mt-2"></span>
                                <p className="text-sm text-slate-600 leading-relaxed">{ingredient}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {product.activeIngredients.join(', ')}
                          </p>
                        )}
                      </div>
                    )}

                    {product.application && (
                      <div className="bg-slate-50 rounded-xl p-3">
                        {product.category !== 'Beauty Tretmani' && (
                          <h3 className="text-sm font-semibold text-slate-900 mb-3">Primjena</h3>
                        )}
                        <div className="space-y-4">
                          {product.application.map((step, index) => {
                            // Check if the step contains a colon (indicating a section header)
                            const hasHeader = step.includes(':');
                            const [header, content] = hasHeader ? step.split(': ', 2) : [null, step];
                            
                            if (!hasHeader) {
                              // Check if this is a warning step
                              if (step.trim() === 'UPOZORENJE') {
                                return (
                                  <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                    <div className="text-sm font-medium text-yellow-800">
                                      UPOZORENJE
                                    </div>
                                  </div>
                                );
                              }
                              
                              // Regular numbered step
                              return (
                                <div key={index} className="flex items-start">
                                  <span className="flex-shrink-0 w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                    <span className="text-xs font-semibold text-slate-600">{index + 1}</span>
                                  </span>
                                  <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                                </div>
                              );
                            }

                            // Parse the content to detect list items
                            const parseContent = (content: string) => {
                              const lines = content.split('\n').filter(line => line.trim());
                              const items = [];
                              let currentWarning = null;
                              
                              for (const line of lines) {
                                const trimmedLine = line.trim();
                                if (trimmedLine.startsWith('- ')) {
                                  // Unordered list item
                                  items.push({ type: 'unordered', text: trimmedLine.substring(2) });
                                } else if (/^\d+\./.test(trimmedLine)) {
                                  // Ordered list item
                                  const match = trimmedLine.match(/^\d+\.\s*(.+)/);
                                  if (match) {
                                    items.push({ type: 'ordered', number: trimmedLine.match(/^\d+/)?.[0], text: match[1] });
                                  }
                                } else if (trimmedLine === 'UPOZORENJE') {
                                  // Start of warning section
                                  currentWarning = { type: 'warning', text: 'UPOZORENJE' };
                                } else if (currentWarning && trimmedLine) {
                                  // Add content to current warning
                                  currentWarning.text += '\n' + trimmedLine;
                                } else if (trimmedLine) {
                                  // Regular text
                                  items.push({ type: 'text', text: trimmedLine });
                                }
                              }
                              
                              // Add the warning if we have one
                              if (currentWarning) {
                                items.push(currentWarning);
                              }
                              
                              return items;
                            };

                            const items = parseContent(content);
                            
                            return (
                              <div key={index} className="border-l-4 border-slate-400 pl-6 bg-gradient-to-r from-slate-50 to-white rounded-r-lg py-5 shadow-sm">
                                <h4 className="text-sm font-semibold text-slate-800 mb-3">
                                  {header}
                                </h4>
                                <div className="space-y-3">
                                  {items.map((item, itemIndex) => {
                                    if (item.type === 'unordered') {
                                      return (
                                        <div key={itemIndex} className="flex items-start">
                                          <span className="flex-shrink-0 w-1.5 h-1.5 bg-slate-400 rounded-full mr-3 mt-2"></span>
                                          <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                                        </div>
                                      );
                                    } else if (item.type === 'ordered') {
                                      return (
                                        <div key={itemIndex} className="flex items-start">
                                          <span className="flex-shrink-0 w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                            <span className="text-xs font-semibold text-slate-600">{item.number}</span>
                                          </span>
                                          <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                                        </div>
                                      );
                                    } else if (item.type === 'warning') {
                                      return (
                                        <div key={itemIndex} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                          <div className="text-sm font-medium text-yellow-800 whitespace-pre-line">
                                            {item.text}
                                          </div>
                                        </div>
                                      );
                                    } else {
                                      return (
                                        <p key={itemIndex} className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                                      );
                                    }
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {product.warnings && product.warnings.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-3">
                        <div className="space-y-3">
                          {product.warnings.map((warning, index) => {
                            // Extract everything after "SIGURNOST:" or "UPOZORENJE" (with or without colon)
                            const warningText = warning.replace(/^(SIGURNOST|UPOZORENJE)\s*:?\s*/, '');
                            const isSafetyWarning = warning.startsWith('SIGURNOST');
                            
                            return (
                              <div key={index} className={`${isSafetyWarning ? 'bg-slate-50 border-slate-200' : 'bg-yellow-50 border-yellow-200'} border rounded-lg p-4 shadow-sm`}>
                                <div className="flex items-start gap-3">
                                  <FaShieldAlt className={`w-5 h-5 mt-0.5 ${isSafetyWarning ? 'text-slate-600' : 'text-yellow-600'}`} />
                                  <div className="flex-1">
                                    <div className={`text-sm font-semibold ${isSafetyWarning ? 'text-slate-800' : 'text-yellow-800'} mb-1`}>
                                      {isSafetyWarning ? 'Sigurnosna informacija' : 'Upozorenje'}
                                    </div>
                                    <div className={`text-sm ${isSafetyWarning ? 'text-slate-700' : 'text-yellow-800'} leading-relaxed`}>
                                      {warningText}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
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