'use client';

import React, { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { BeautyTreatment } from '@/data/services/beautyTreatments';

interface BeautyTreatmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatment: BeautyTreatment | null;
}

export default function BeautyTreatmentModal({ isOpen, onClose, treatment }: BeautyTreatmentModalProps) {
  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!treatment) return null;

  // Parse the description to separate the main text from the procedure steps
  const parseDescription = (description: string) => {
    const parts = description.split('Kako izgleda tretman:');
    
    if (parts.length === 2) {
      const mainText = parts[0].trim();
      const procedureText = parts[1].trim();
      
      // Split procedure steps by newlines and filter out empty lines
      const steps = procedureText
        .split('\n')
        .map(step => step.trim())
        .filter(step => step.length > 0);
      
      return { mainText, steps };
    }
    
    return { mainText: description, steps: [] };
  };

  const { mainText, steps } = parseDescription(treatment.description);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
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
          <div className="relative w-full h-full lg:h-auto max-w-4xl max-h-full lg:max-h-none flex items-center justify-center">
            {/* Close Button - Mobile: Inside Modal, Desktop: Outside Modal */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 lg:-top-4 lg:-right-4 z-20 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer p-2 hover:bg-slate-100 rounded-full bg-white shadow-md"
            >
              <FaTimes size={20} />
            </button>
            
            <div className="w-full h-full lg:h-auto max-w-4xl max-h-full lg:max-h-none transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all border border-slate-200 flex flex-col">
              {/* Content - Fixed Left + Scrollable Right */}
              <div className="flex flex-col lg:flex-row h-full min-h-0">
                {/* Mobile Layout */}
                <div className="lg:hidden w-full h-full flex flex-col">
                  {/* Image - Fixed height */}
                  <div className="w-full relative h-32 sm:h-40 bg-slate-50 rounded-t-xl overflow-hidden shadow-sm flex-shrink-0">
                    <Image
                      src={treatment.image}
                      alt={treatment.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  
                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {/* Title and Description */}
                    <div className="bg-slate-50 rounded-xl p-3">
                      <h2 className="text-xl font-bold text-slate-900 mb-2">
                        {treatment.title}
                      </h2>
                      <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                        {mainText}
                      </div>
                    </div>
                    
                    {/* Pricing Section */}
                    <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-2xl font-bold text-slate-900">
                              {treatment.price}
                            </span>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span>{treatment.duration}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            // Handle booking action
                            window.open('/kontakt', '_blank');
                          }}
                          className="inline-flex items-center justify-center px-6 py-2 border border-slate-600 text-sm font-medium rounded-lg text-white bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:shadow-lg whitespace-nowrap"
                        >
                          Rezervirajte tretman
                        </button>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-slate-50 rounded-xl p-3">
                      <h3 className="text-sm font-semibold text-slate-900 mb-2">
                        Prednosti
                      </h3>
                      <ul className="space-y-2">
                        {treatment.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-slate-700">
                            <span className="flex-shrink-0 w-1.5 h-1.5 bg-slate-400 rounded-full mr-3 mt-2"></span>
                            <span className="text-sm leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Procedure Steps */}
                    {steps.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">
                          Kako izgleda tretman:
                        </h3>
                        <ul className="space-y-2">
                          {steps.map((step, index) => (
                            <li key={index} className="flex items-start text-slate-700">
                              <span className="flex-shrink-0 w-1.5 h-1.5 bg-slate-400 rounded-full mr-3 mt-2"></span>
                              <span className="text-sm leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Layout - Fixed Left Side */}
                <div className="hidden lg:block w-2/5 p-6 border-r border-slate-100">
                  <div className="relative h-[calc(600px-3rem)] bg-slate-50 rounded-xl overflow-hidden shadow-sm">
                    <Image
                      src={treatment.image}
                      alt={treatment.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                </div>
                
                {/* Scrollable Right Side - Desktop Only */}
                <div className="hidden lg:block w-3/5 overflow-y-auto max-h-[600px] flex-1 min-h-0">
                  <div className="p-6">
                    
                    {/* Title and Description */}
                    <div className="bg-slate-50 rounded-xl p-3 mb-4">
                      <h2 className="text-xl font-bold text-slate-900 mb-2">
                        {treatment.title}
                      </h2>
                      <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                        {mainText}
                      </div>
                    </div>
                    
                    {/* Pricing Section */}
                    <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-2xl font-bold text-slate-900">
                              {treatment.price}
                            </span>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span>{treatment.duration}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            // Handle booking action
                            window.open('/kontakt', '_blank');
                          }}
                          className="inline-flex items-center justify-center px-6 py-2 border border-slate-600 text-sm font-medium rounded-lg text-white bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:shadow-lg whitespace-nowrap"
                        >
                          Rezervirajte tretman
                        </button>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-slate-50 rounded-xl p-3 mb-4">
                      <h3 className="text-sm font-semibold text-slate-900 mb-2">
                        Prednosti
                      </h3>
                      <ul className="space-y-2">
                        {treatment.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-slate-700">
                            <span className="flex-shrink-0 w-1.5 h-1.5 bg-slate-400 rounded-full mr-3 mt-2"></span>
                            <span className="text-sm leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Procedure Steps */}
                    {steps.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">
                          Kako izgleda tretman:
                        </h3>
                        <ul className="space-y-2">
                          {steps.map((step, index) => (
                            <li key={index} className="flex items-start text-slate-700">
                              <span className="flex-shrink-0 w-1.5 h-1.5 bg-slate-400 rounded-full mr-3 mt-2"></span>
                              <span className="text-sm leading-relaxed">{step}</span>
                            </li>
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