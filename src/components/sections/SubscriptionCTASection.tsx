'use client';

import { FaArrowRight, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';

const SubscriptionCTASection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
      
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-16 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Pretplatite se na naš newsletter
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                Budite u toku s najnovijim savjetima i trendovima u svijetu ljepote. Pretplatite se na naš newsletter i primajte ekskluzivne sadržaje direktno u vaš inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors group text-sm sm:text-base"
                >
                  Pretplatite se
                  <FaEnvelope className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="/blog"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition-colors group text-sm sm:text-base"
                >
                  Pročitajte više
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-48 sm:h-64 lg:h-auto order-1 lg:order-2">
              <div className="absolute inset-0">
                <Image
                  src="/images/services/TKNHA3_.webp"
                  alt="VISAGE Studio interior"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
                <div className="text-center text-white">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">VISAGE Blog</div>
                  <p className="text-sm sm:text-base lg:text-lg opacity-90">
                    Ekskluzivni savjeti za vašu ljepotu
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

export default SubscriptionCTASection; 