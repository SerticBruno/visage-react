"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ServiceContentSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  benefits?: readonly string[];
  reverse?: boolean;
}

export default function ServiceContentSection({
  title,
  description,
  imageSrc,
  imageAlt,
  benefits = [],
  reverse = false
}: ServiceContentSectionProps) {
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
            <p className="text-xl text-gray-600 mb-8">{description}</p>
            
            {benefits.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prednosti</h2>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href="/kontakt"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              Zakažite termin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 