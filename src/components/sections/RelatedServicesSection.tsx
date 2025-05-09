'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Service } from '@/data/services/types';

interface RelatedServicesSectionProps {
  currentService: Service;
  relatedServices: Service[];
}

export default function RelatedServicesSection({ currentService, relatedServices }: RelatedServicesSectionProps) {
  // Filter out the current service and ensure we have valid services
  const validServices = relatedServices.filter(service => 
    service && 
    service.id && 
    service.id !== currentService.id
  );

  if (validServices.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Slične usluge koje bi vas mogle zanimati
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Otkrijte još tretmana koji će vam pomoći postići željeni izgled
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {validServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="group h-full"
            >
              <Link 
                href={`/usluge/${service.id}`}
                className="block h-full"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 flex-1">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/usluge"
            className="inline-flex items-center px-8 py-4 text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Povratak na sve usluge
          </Link>
        </div>
      </div>
    </section>
  );
} 