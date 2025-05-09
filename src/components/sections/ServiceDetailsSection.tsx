'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '@/data/services/types';
import { FaRegFileAlt, FaUsers, FaRegEdit, FaRegClock, FaRegHospital, FaRegFile, FaHandHoldingUsd, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

interface ServiceDetailsSectionProps {
  service: Service;
}

const tabIcons = {
  'opis-zahvata': FaRegFileAlt,
  'kandidati': FaUsers,
  'priprema': FaRegEdit,
  'tijek-zahvata': FaRegClock,
  'oporavak': FaRegHospital,
  'mjere-opreza': FaRegFile,
  'cijena': FaHandHoldingUsd
};

export default function ServiceDetailsSection({ service }: ServiceDetailsSectionProps) {
  const [activeTab, setActiveTab] = useState(service.steps[0].id);

  const formatContent = (content: string) => {
    // Split content into paragraphs
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, idx) => {
      // Check if paragraph contains bullet points
      if (paragraph.includes('- ')) {
        const lines = paragraph.split('\n');
        const introText = lines.find(line => !line.trim().startsWith('- '));
        const bulletPoints = lines.filter(line => line.trim().startsWith('- '));
        
        return (
          <div key={idx} className="mb-6">
            {introText && <p className="text-gray-600 mb-4 leading-relaxed">{introText}</p>}
            <ul className="space-y-3">
              {bulletPoints.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-0.5">
                    <FaCheck className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-600">{item.replace('- ', '')}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      
      // Regular paragraph
      return <p key={idx} className="text-gray-600 mb-6 leading-relaxed">{paragraph}</p>;
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
              <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center shadow-md">
                <span className="text-indigo-600 font-semibold">{number}</span>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
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
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs Navigation */}
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
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 cursor-pointer
                    ${activeTab === step.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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

        {/* Tab Content */}
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
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                          {React.createElement(tabIcons[step.id as keyof typeof tabIcons], {
                            className: "h-6 w-6 text-indigo-600"
                          })}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.label}</h3>
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
                    {activeTab === 'opis-zahvata' && (
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
                              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    {activeTab !== 'opis-zahvata' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 }}
                        className="relative h-[400px] rounded-xl overflow-hidden shadow-xl group cursor-pointer"
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
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