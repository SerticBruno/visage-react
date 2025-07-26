'use client';

import Link from 'next/link';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';

interface CTASectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  gradientDirection?: 't' | 'b';
  hasPadding?: boolean;
}

const CTASection = ({
  title = "Rezervirajte svoj termin danas",
  description = "Doživite vrhunsku uslugu u našem salonu. Rezervirajte termin i prepustite se stručnom timu koji će se pobrinuti za vašu ljepotu.",
  ctaText = "Rezervirajte termin",
  ctaLink = "/kontakt",
  secondaryCtaText = "Pogledajte usluge",
  secondaryCtaLink = "/usluge",
  gradientDirection = 'b',
  hasPadding = true
}: CTASectionProps) => {
  // Define gradient styles based on direction
  const getGradientStyle = () => {
    if (gradientDirection === 't') {
      // 't' = top to bottom gradient (light at top, darker at bottom)
      return {
        background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)'
      };
    } else {
      // 'b' = bottom to top gradient (darker at top, light at bottom)
      return {
        background: 'linear-gradient(to top, #ffffff, #e5e7eb)'
      };
    }
  };

  return (
    <section 
      className={`relative overflow-hidden ${hasPadding ? 'py-18' : 'pb-18'}`}
      style={getGradientStyle()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
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
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-white rounded-lg font-semibold transition-all duration-300 group text-sm sm:text-base shadow-lg hover:shadow-xl"
                  style={{ background: 'linear-gradient(to right, rgb(15, 23, 42), rgb(30, 41, 59))' }}
                >
                  {ctaText}
                  <FaCalendarAlt className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={secondaryCtaLink}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-white to-slate-50 text-slate-900 border-2 border-slate-200 rounded-lg font-semibold hover:from-slate-50 hover:to-slate-100 transition-all duration-300 group text-sm sm:text-base shadow-sm hover:shadow-md"
                >
                  {secondaryCtaText}
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-64 lg:h-auto order-1 lg:order-2">
              <div className="absolute inset-0">
                <Image
                  src="/images/services/beauty-treatment-visage-estetski-studio.webp"
                  alt="VISAGE Studio interior"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))' }}></div>
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