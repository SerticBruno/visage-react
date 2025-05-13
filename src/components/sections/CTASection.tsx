'use client';

import Link from 'next/link';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';

interface CTASectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

const CTASection = ({
  title = "Rezervirajte svoj termin danas",
  description = "Doživite vrhunsku uslugu u našem salonu. Rezervirajte termin i prepustite se stručnom timu koji će se pobrinuti za vašu ljepotu.",
  ctaText = "Rezervirajte termin",
  ctaLink = "/kontakt"
}: CTASectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative">
        <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-16 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                {title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-lg font-semibold hover:from-slate-700 hover:to-slate-600 transition-all duration-300 group text-sm sm:text-base shadow-lg hover:shadow-xl"
                >
                  {ctaText}
                  <FaCalendarAlt className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/usluge"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-white to-slate-50 text-slate-900 border-2 border-slate-200 rounded-lg font-semibold hover:from-slate-50 hover:to-slate-100 transition-all duration-300 group text-sm sm:text-base shadow-sm hover:shadow-md"
                >
                  Pogledajte usluge
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-64 lg:h-auto order-1 lg:order-2">
              <div className="absolute inset-0">
                <Image
                  src="/images/services/TKNHA3_.webp"
                  alt="VISAGE Studio interior"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
                <div className="text-center text-white">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">VISAGE Studio</div>
                  <p className="text-sm sm:text-base lg:text-lg opacity-90">
                    Vaš partner u njegovanju ljepote
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 