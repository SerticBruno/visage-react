'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaTimes } from 'react-icons/fa';
import ProductModal from '@/components/ui/ProductModal';
import { renderTreatmentContent } from '@/lib/beautyTreatmentsUtils';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-gradient-to-b from-white to-[#e5e7eb] py-4">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Treatments Grid - 3+2 Layout with Offset */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* First row: 3 items */}
          {treatments.slice(0, 3).map((treatment, index) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group h-full lg:col-span-2"
              onClick={() => setSelectedTreatment(treatment)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-2">{treatment.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{treatment.description}</p>
                <div className="flex items-center justify-start">
                  <div className="group inline-flex items-center gap-2 px-4 py-2 bg-[#1e293b] text-white rounded-lg hover:bg-[#334155] transition-all duration-300 shadow-md hover:shadow-lg text-sm">
                    <span className="font-medium">Saznajte više</span>
                    <FaChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Second row: 2 items with 0.4 offset */}
          {treatments.slice(3, 5).map((treatment, index) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 3) * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group h-full lg:col-span-2 ${
                index === 0 ? 'lg:col-start-2' : 'lg:col-start-4'
              }`}
              onClick={() => setSelectedTreatment(treatment)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-2">{treatment.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{treatment.description}</p>
                <div className="flex items-center justify-start">
                  <div className="group inline-flex items-center gap-2 px-4 py-2 bg-[#1e293b] text-white rounded-lg hover:bg-[#334155] transition-all duration-300 shadow-md hover:shadow-lg text-sm">
                    <span className="font-medium">Saznajte više</span>
                    <FaChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
        product={null}
      />
    </section>
  );
} 