'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

interface HeroSectionProps {
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

const HeroSection = ({
  title,
  description,
  image,
  ctaText,
  ctaLink,
}: HeroSectionProps) => {
  const handleScrollDown = () => {
    // Find the current hero section
    const heroSection = document.querySelector('section');
    if (heroSection) {
      // Find the next section after the hero section
      const nextSection = heroSection.nextElementSibling;
      if (nextSection) {
        // Get the navigation height (assuming it's 80px, adjust if different)
        const navHeight = 80;
        const nextSectionTop = nextSection.getBoundingClientRect().top + window.pageYOffset;
        
        // Scroll to the section with offset for navigation
        window.scrollTo({
          top: nextSectionTop - navHeight,
          behavior: 'smooth'
        });
      } else {
        // If no next section is found, scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transform scale-105"
            priority
            quality={100}
            sizes="100vw"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow w-full px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              {title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto text-gray-100 leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              {description}
            </p>
          </motion.div>

          {ctaText && ctaLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <Link
                href={ctaLink}
                className="group inline-flex items-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg text-lg"
              >
                {ctaText}
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={handleScrollDown}
            className="group flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-sm font-medium text-gray-200 uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] group-hover:text-white transition-colors">
              Scroll Down
            </span>
            <div className="w-6 h-12 border-2 border-gray-200 rounded-full p-1.5 group-hover:border-white transition-colors">
              <motion.div
                animate={{
                  y: [0, 16, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-2 h-2 bg-gray-200 rounded-full group-hover:bg-white transition-colors"
              />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 