'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';
import ProductModal from '@/components/ui/ProductModal';
import { Product } from '@/data/products';

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

// Convert BeautyTreatment to Product format for the modal
const convertTreatmentToProduct = (treatment: BeautyTreatment): Product => {
  return {
    id: treatment.id,
    title: treatment.title,
    description: treatment.description,
    category: 'Beauty Tretmani',
    image: treatment.image,
    price: treatment.price,
    isPopular: treatment.isPopular,
    isNew: treatment.isNew,
    volume: treatment.duration,
    activeIngredients: treatment.benefits,
    application: [
      `Priprema: ${treatment.preparation}`,
      `Tijek tretmana: ${treatment.procedure}`,
      `Nakon tretmana: ${treatment.aftercare}`
    ],
    features: treatment.suitableFor,
    tags: ['beauty-tretmani', 'tretman-lica']
  };
};

export default function BeautyTreatmentsSection({ treatments }: BeautyTreatmentsSectionProps) {
  const [selectedTreatment, setSelectedTreatment] = useState<BeautyTreatment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTreatmentClick = (treatment: BeautyTreatment) => {
    setSelectedTreatment(treatment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTreatment(null);
  };

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
              onClick={() => handleTreatmentClick(treatment)}
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
              onClick={() => handleTreatmentClick(treatment)}
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

        {/* Product Modal */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedTreatment ? convertTreatmentToProduct(selectedTreatment) : null}
        />
      </div>
    </section>
  );
} 