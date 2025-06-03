'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '@/data/services/types';
import { FaRegFileAlt, FaUsers, FaRegEdit, FaRegClock, FaRegHospital, FaRegFile, FaHandHoldingUsd, FaCheck, FaChevronRight } from 'react-icons/fa';

interface ServiceDetailsSectionProps {
  service: Service;
}

const tabIcons = {
  'prednosti': FaRegFileAlt,
  'kandidati': FaUsers,
  'priprema': FaRegEdit,
  'tijek-zahvata': FaRegClock,
  'oporavak': FaRegHospital,
  'nakon-tretmana': FaRegFile,
  'cijena': FaHandHoldingUsd
};

export default function ServiceDetailsSection({ service }: ServiceDetailsSectionProps) {
  const [activeTab, setActiveTab] = useState(service.steps[0].id);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    const currentIndex = service.steps.findIndex(step => step.id === activeTab);
    if (currentIndex < service.steps.length - 1) {
      setActiveTab(service.steps[currentIndex + 1].id);
      // Scroll the slider
      if (sliderRef.current) {
        const scrollAmount = 84; // 80px (min-w-[80px]) + 16px (space-x-4)
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const formatContent = (content: string) => {
    // Split content into sections (separated by double newlines)
    const sections = content.split('\n\n');
    
    return sections.map((section, sectionIdx) => {
      const lines = section.split('\n');
      
      // If the section starts with a title/intro text
      if (lines[0] && !lines[0].trim().startsWith('- ') && !lines[0].trim().match(/^[0-9]+\./)) {
        const introText = lines[0];
        const orderedListItems = lines.slice(1).filter(line => line.trim().match(/^[0-9]+\./));
        const bulletPoints = lines.slice(1).filter(line => line.trim().startsWith('- '));
        
        return (
          <div key={sectionIdx} className="mb-6">
            <p className="text-gray-600 mb-4 leading-relaxed">{introText}</p>
            {orderedListItems.length > 0 && (
              <ol className="space-y-3 list-decimal pl-6 mb-4">
                {orderedListItems.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-gray-600">
                    {item.replace(/^[0-9]+\.\s*/, '')}
                  </li>
                ))}
              </ol>
            )}
            {bulletPoints.length > 0 && (
              <ul className="space-y-3">
                {bulletPoints.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                      <FaCheck className="h-4 w-4 text-slate-700" />
                    </div>
                    <span className="text-gray-600">{item.replace('- ', '')}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }
      
      // If the section is just ordered list items
      if (lines.every(line => line.trim().match(/^[0-9]+\./))) {
        return (
          <div key={sectionIdx} className="mb-6">
            <ol className="space-y-3 list-decimal pl-6">
              {lines.map((item, itemIdx) => (
                <li key={itemIdx} className="text-gray-600">
                  {item.replace(/^[0-9]+\.\s*/, '')}
                </li>
              ))}
            </ol>
          </div>
        );
      }
      
      // If the section is just bullet points
      if (lines.every(line => line.trim().startsWith('- '))) {
        return (
          <div key={sectionIdx} className="mb-6">
            <ul className="space-y-3">
              {lines.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <FaCheck className="h-4 w-4 text-slate-700" />
                  </div>
                  <span className="text-gray-600">{item.replace('- ', '')}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      
      // Regular paragraph
      return <p key={sectionIdx} className="text-gray-600 mb-6 leading-relaxed">{section}</p>;
    });
  };

  const renderTreatmentSteps = (content: string) => {
    const steps = content.split('\n').filter(line => line.trim().match(/^\d+\./));
    
    return (
      <div className="space-y-8">
        {steps.map((step, idx) => {
          const [number, ...rest] = step.split('.');
          const content = rest.join('.').trim();
          const [title, description] = content.split(' - ');
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="relative pl-12"
            >
              <div className="absolute left-0 top-0 flex items-center h-full">
                <span className="text-2xl font-bold text-slate-700">{number}.</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Mobile Step Navigation */}
        <div className="lg:hidden mb-8">
          <div className="relative">
            {/* Step List */}
            <div ref={sliderRef} className="flex overflow-x-auto pb-4 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex space-x-4 px-4">
                {service.steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex-shrink-0"
                  >
                    <button
                      onClick={() => setActiveTab(step.id)}
                      className={`flex flex-col items-center min-w-[80px] transition-all duration-200 ${
                        activeTab === step.id ? 'opacity-100' : 'opacity-60'
                      }`}
                    >
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center mb-2
                        transition-all duration-200
                        ${activeTab === step.id 
                          ? 'bg-gradient-to-br from-black to-gray-800 text-white scale-110 shadow-lg' 
                          : 'bg-white text-black shadow-md'
                        }
                      `}>
                        {React.createElement(tabIcons[step.id as keyof typeof tabIcons], {
                          className: "w-5 h-5"
                        })}
                      </div>
                      <span className="text-sm font-medium text-center text-black">
                        {step.label}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-gray-100">
              <div 
                className="h-full bg-black transition-all duration-300"
                style={{ 
                  width: `${((service.steps.findIndex(step => step.id === activeTab) + 1) / service.steps.length) * 100}%` 
                }}
              />
            </div>

            {/* Next Step Button */}
            <div className="flex justify-end mt-6">
              <button 
                onClick={handleNext}
                disabled={service.steps.findIndex(step => step.id === activeTab) === service.steps.length - 1}
                className="flex items-center text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span className="text-sm font-medium mr-1">Sljedeći korak</span>
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden lg:block">
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8 overflow-x-auto pb-4 scrollbar-hide">
              {service.steps.map((step) => {
                const Icon = tabIcons[step.id as keyof typeof tabIcons];
                return (
                  <motion.button
                    key={step.id}
                    onClick={() => setActiveTab(step.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 cursor-pointer
                      ${activeTab === step.id
                        ? 'border-black text-black'
                        : 'border-transparent text-black hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5" />
                      <span>{step.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {service.steps.map((step) => (
              activeTab === step.id && (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex items-center space-x-3 mb-6"
                      >
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center shadow-md ring-1 ring-gray-200/50">
                          {React.createElement(tabIcons[step.id as keyof typeof tabIcons], {
                            className: "h-6 w-6 text-black"
                          })}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{step.label}</h3>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-indigo max-w-none"
                      >
                        {activeTab === 'tijek-zahvata' 
                          ? renderTreatmentSteps(service.stepContents[step.id])
                          : formatContent(service.stepContents[step.id])
                        }
                      </motion.div>
                    </div>

                    {/* Benefits Cards */}
                    {activeTab === 'prednosti' && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                      >
                        {service.benefits.map((benefit, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center shadow-lg ring-2 ring-white">
                                <svg className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <h4 className="text-lg font-semibold text-gray-900">Prednost {idx + 1}</h4>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{benefit}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {/* Image for other tabs */}
                    {activeTab !== 'prednosti' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 }}
                        className="relative h-[400px] rounded-xl overflow-hidden shadow-xl group cursor-pointer"
                      >
                        <Image
                          src={service.steps.find(s => s.id === activeTab)?.image || service.image}
                          alt={`${service.title} - ${service.steps.find(s => s.id === activeTab)?.label}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}