'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegClock, FaRegStar, FaRegHeart, FaRegEye, FaRegFileAlt, FaRegUser, FaRegEdit, FaRegFile, FaHandHoldingUsd, FaCheck, FaChevronRight, FaTimes } from 'react-icons/fa';
import { pricingData } from '@/data/pricing';
import { products, Product } from '@/data/products';
import ProductModal from '@/components/ui/ProductModal';

interface BeautyTreatment {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  benefits: string[];
  suitableFor: string[];
  preparation: string;
  procedure: string;
  aftercare: string;
  isPopular?: boolean;
  isNew?: boolean;
}

interface BeautyTreatmentsSectionProps {
  treatments: BeautyTreatment[];
}



export default function BeautyTreatmentsSection({ treatments }: BeautyTreatmentsSectionProps) {
  const [selectedTreatment, setSelectedTreatment] = useState<BeautyTreatment | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const formatContent = (content: string) => {
    // Check if content contains HTML links
    if (content.includes('<a href=')) {
      // Process the content to replace catalog links with modal triggers
      const processedContent = content.replace(
        /<a href="\/katalog\?product=(\d+)">([^<]+)<\/a>/g,
        (match, productId, linkText) => {
          return `<a href="#" class="product-link" data-product-id="${productId}">${linkText}</a>`;
        }
      );
      
      return (
        <div 
          className="text-gray-600 leading-relaxed [&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:transition-colors"
          dangerouslySetInnerHTML={{ __html: processedContent }}
          ref={(el) => {
            if (el) {
              el.querySelectorAll('.product-link').forEach((link) => {
                link.addEventListener('click', (e) => {
                  e.preventDefault();
                  const productId = link.getAttribute('data-product-id');
                  if (productId) {
                    handleProductClick(productId);
                  }
                });
              });
            }
          }}
        />
      );
    }

    // Regular text content
    const sections = content.split('\n\n');
    
    return sections.map((section, sectionIdx) => {
      const lines = section.split('\n');
      
      // If the section starts with a title/intro text
      if (lines[0] && !lines[0].trim().startsWith('- ') && !lines[0].trim().match(/^[0-9]+\./)) {
        const introText = lines[0];
        const bulletPoints = lines.slice(1).filter(line => line.trim().startsWith('- '));
        
        return (
          <div key={sectionIdx} className="mb-6">
            <p className="text-gray-600 mb-4 leading-relaxed">{introText}</p>
            {bulletPoints.length > 0 && (
              <ul className="space-y-3">
                {bulletPoints.map((item, itemIdx) => {
                  const cleanItem = item.replace('- ', '');
                  return (
                    <li key={itemIdx} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                        <FaCheck className="h-4 w-4 text-slate-700" />
                      </div>
                      <span className="text-gray-600">{cleanItem}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      }
      
      // If the section is just bullet points
      if (lines.every(line => line.trim().startsWith('- '))) {
        return (
          <div key={sectionIdx} className="mb-6">
            <ul className="space-y-3">
              {lines.map((item, itemIdx) => {
                const cleanItem = item.replace('- ', '');
                return (
                  <li key={itemIdx} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                      <FaCheck className="h-4 w-4 text-slate-700" />
                    </div>
                    <span className="text-gray-600">{cleanItem}</span>
                  </li>
                );
              })}
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

  const renderTreatmentContent = (treatment: BeautyTreatment) => {
    return (
      <div className="space-y-6">
        {/* Procedure Steps - Show for specific treatments */}
        {treatment.id === 'dermaplaning' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Kako izgleda tretman</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">1</span>
                  </div>
                  <span className="text-gray-600 text-sm">Čišćenje lica sa Circadia proizvodima za čišćenje lica</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">2</span>
                  </div>
                  <span className="text-gray-600 text-sm">Dermaplaning</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">3</span>
                  </div>
                  <span className="text-gray-600 text-sm">Aplikacija Snow Algae & Spirulina Cooling Mask</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">4</span>
                  </div>
                  <span className="text-gray-600 text-sm">Maska se suši 10 do 20 minuta</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">5</span>
                  </div>
                  <span className="text-gray-600 text-sm">Uklanjanje maske</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">6</span>
                  </div>
                  <span className="text-gray-600 text-sm">Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {treatment.id === 'marshmallow-facial' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Kako izgleda tretman</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">1</span>
                  </div>
                  <span className="text-gray-600 text-sm">Čišćenje lica sa Circadia proizvodima za čišćenje lica</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">2</span>
                  </div>
                  <span className="text-gray-600 text-sm">Aplikacija Marshmallow Whip Hydrating Mask</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">3</span>
                  </div>
                  <span className="text-gray-600 text-sm">Maska se suši 10 do 20 minuta</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">4</span>
                  </div>
                  <span className="text-gray-600 text-sm">Uklanjanje maske</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">5</span>
                  </div>
                  <span className="text-gray-600 text-sm">Circadia serum ovisno o tipu i stanju kože</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">6</span>
                  </div>
                  <span className="text-gray-600 text-sm">Circadia krema ovisno o tipu i stanju kože</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">7</span>
                  </div>
                  <span className="text-gray-600 text-sm">Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {treatment.id === 'firming-peptide-facial' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Kako izgleda tretman</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">1</span>
                  </div>
                  <span className="text-gray-600 text-sm">Čišćenje lica sa Circadia proizvodima za čišćenje lica</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">2</span>
                  </div>
                  <span className="text-gray-600 text-sm">Aplikacija Firming Peptide Mask</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">3</span>
                  </div>
                  <span className="text-gray-600 text-sm">Maska se suši 10 do 30 minuta</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">4</span>
                  </div>
                  <span className="text-gray-600 text-sm">Uklanjanje maske</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">5</span>
                  </div>
                  <span className="text-gray-600 text-sm">Circadia serum ovisno o tipu i stanju kože</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">6</span>
                  </div>
                  <span className="text-gray-600 text-sm">Circadia krema ovisno o tipu i stanju kože</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">7</span>
                  </div>
                  <span className="text-gray-600 text-sm">Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm font-medium">UPOZORENJE: Prilikom sušenja maska pruža osjećaj zatezanja!</p>
              </div>
            </div>
          </div>
        )}

        {treatment.id === 'signature-dermaplaning-facial' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Kako izgleda tretman</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">1</span>
                  </div>
                  <span className="text-gray-600 text-sm">Čišćenje lica sa Circadia proizvodima za čišćenje lica</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">2</span>
                  </div>
                  <span className="text-gray-600 text-sm">Dermaplaning</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">3</span>
                  </div>
                  <span className="text-gray-600 text-sm">Caviar Lime & Passionfruit Enzym piling</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">4</span>
                  </div>
                  <span className="text-gray-600 text-sm">Aplikacija Marshmallow Whip Hydrating Mask</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">5</span>
                  </div>
                  <span className="text-gray-600 text-sm">Maska se suši 10 do 20 minuta</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">6</span>
                  </div>
                  <span className="text-gray-600 text-sm">Uklanjanje maske</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">7</span>
                  </div>
                  <span className="text-gray-600 text-sm">Circadia serum ovisno o tipu i stanju kože</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">8</span>
                  </div>
                  <span className="text-gray-600 text-sm">Circadia krema ovisno o tipu i stanju kože</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">9</span>
                  </div>
                  <span className="text-gray-600 text-sm">Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {treatment.id === 'beyond-botox-facial' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Kako izgleda tretman</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">1</span>
                  </div>
                  <span className="text-gray-600 text-sm">Čišćenje lica sa Circadia proizvodima za čišćenje lica</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">2</span>
                  </div>
                  <span className="text-gray-600 text-sm">Dermaplaning</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">3</span>
                  </div>
                  <span className="text-gray-600 text-sm">Kemijski piling laktičnom kiselinom ili enzimski piling</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">4</span>
                  </div>
                  <span className="text-gray-600 text-sm">Aplikacija Firming Peptide Mask</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">5</span>
                  </div>
                  <span className="text-gray-600 text-sm">Maska se suši 10 do 30 minuta</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">6</span>
                  </div>
                  <span className="text-gray-600 text-sm">Uklanjanje maske</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">7</span>
                  </div>
                  <span className="text-gray-600 text-sm">Circadia serum ovisno o tipu i stanju kože</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">8</span>
                  </div>
                  <span className="text-gray-600 text-sm">Circadia krema ovisno o tipu i stanju kože</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                    <span className="text-xs font-semibold text-slate-700">9</span>
                  </div>
                  <span className="text-gray-600 text-sm">Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme</span>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm font-medium">POKLON: Post Peel Home Care</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm font-medium">UPOZORENJE: Prilikom sušenja maska pruža osjećaj zatezanja!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Cijena</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{treatment.price}</div>
              <div className="text-gray-600 text-sm mb-2">Trajanje: {treatment.duration}</div>
              <p className="text-gray-600 text-sm">
                Za detaljne informacije i rezervacije, slobodno nas kontaktirajte
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-white to-[#e5e7eb] py-4">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Treatments Grid - 3+2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* First row: 3 items on desktop, 2 on tablet */}
                      <div className="md:col-span-2 lg:col-span-2">
            {treatments.slice(0, 1).map((treatment) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group h-full"
                onClick={() => setSelectedTreatment(treatment)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{treatment.title}</h3>
                    <div className="flex items-center justify-between text-white/90">
                      <div className="flex items-center">
                        <FaRegClock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{treatment.duration}</span>
                      </div>
                      <div className="text-lg font-semibold">{treatment.price}</div>
                    </div>
                  </div>
                  {treatment.isPopular && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        <FaRegStar className="mr-1" />
                        Popularno
                      </span>
                    </div>
                  )}
                  {treatment.isNew && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        Novo
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{treatment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Kliknite za više informacija</span>
                    <FaRegEye className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Second item */}
          <div className="lg:col-span-2">
            {treatments.slice(1, 2).map((treatment) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group h-full"
                onClick={() => setSelectedTreatment(treatment)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{treatment.title}</h3>
                    <div className="flex items-center justify-between text-white/90">
                      <div className="flex items-center">
                        <FaRegClock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{treatment.duration}</span>
                      </div>
                      <div className="text-lg font-semibold">{treatment.price}</div>
                    </div>
                  </div>
                  {treatment.isPopular && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        <FaRegStar className="mr-1" />
                        Popularno
                      </span>
                    </div>
                  )}
                  {treatment.isNew && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        Novo
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{treatment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Kliknite za više informacija</span>
                    <FaRegEye className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Third item */}
          <div className="lg:col-span-2">
            {treatments.slice(2, 3).map((treatment) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group h-full"
                onClick={() => setSelectedTreatment(treatment)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{treatment.title}</h3>
                    <div className="flex items-center justify-between text-white/90">
                      <div className="flex items-center">
                        <FaRegClock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{treatment.duration}</span>
                      </div>
                      <div className="text-lg font-semibold">{treatment.price}</div>
                    </div>
                  </div>
                  {treatment.isPopular && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        <FaRegStar className="mr-1" />
                        Popularno
                      </span>
                    </div>
                  )}
                  {treatment.isNew && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        Novo
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{treatment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Kliknite za više informacija</span>
                    <FaRegEye className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Fourth item - between first and second */}
          <div className="lg:col-start-1 lg:col-span-2">
            {treatments.slice(3, 4).map((treatment) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group h-full"
                onClick={() => setSelectedTreatment(treatment)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{treatment.title}</h3>
                    <div className="flex items-center justify-between text-white/90">
                      <div className="flex items-center">
                        <FaRegClock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{treatment.duration}</span>
                      </div>
                      <div className="text-lg font-semibold">{treatment.price}</div>
                    </div>
                  </div>
                  {treatment.isPopular && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        <FaRegStar className="mr-1" />
                        Popularno
                      </span>
                    </div>
                  )}
                  {treatment.isNew && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        Novo
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{treatment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Kliknite za više informacija</span>
                    <FaRegEye className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Fifth item - between second and third */}
          <div className="lg:col-start-3 lg:col-span-2">
            {treatments.slice(4, 5).map((treatment) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group h-full"
                onClick={() => setSelectedTreatment(treatment)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{treatment.title}</h3>
                    <div className="flex items-center justify-between text-white/90">
                      <div className="flex items-center">
                        <FaRegClock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{treatment.duration}</span>
                      </div>
                      <div className="text-lg font-semibold">{treatment.price}</div>
                    </div>
                  </div>
                  {treatment.isPopular && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        <FaRegStar className="mr-1" />
                        Popularno
                      </span>
                    </div>
                  )}
                  {treatment.isNew && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        Novo
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{treatment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Kliknite za više informacija</span>
                    <FaRegEye className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Treatment Detail Modal */}
        <AnimatePresence>
          {selectedTreatment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedTreatment(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={selectedTreatment.image}
                    alt={selectedTreatment.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => setSelectedTreatment(null)}
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedTreatment.title}</h2>
                    <div className="flex items-center justify-between text-white/90">
                      <div className="flex items-center">
                        <FaRegClock className="w-5 h-5 mr-2" />
                        <span>{selectedTreatment.duration}</span>
                      </div>
                      <div className="text-2xl font-semibold">{selectedTreatment.price}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-400px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div className="text-gray-600 mb-8 leading-relaxed whitespace-pre-line">{selectedTreatment.description}</div>

                  {/* Treatment Content */}
                  <div className="space-y-8">
                    {renderTreatmentContent(selectedTreatment)}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 text-center">
                    <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                      Rezervirajte svoj tretman
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </section>
  );
} 