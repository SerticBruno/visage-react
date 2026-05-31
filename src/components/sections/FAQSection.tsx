'use client';

import { useState, useEffect } from 'react';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { faqItems } from '@/data/faq';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  // Add click event listeners to contact form links
  useEffect(() => {
    const handleContactFormLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('contact-form-link')) {
        e.preventDefault();
        router.push('/kontakt');
        
        // Wait for navigation to complete, then scroll to form
        setTimeout(() => {
          const element = document.getElementById('contact-form');
          if (element) {
            const navbarHeight = 80; // h-20 = 80px
            const offset = 20; // Small additional offset
            const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: elementTop - navbarHeight - offset,
              behavior: 'smooth'
            });
          }
        }, 500);
      }
    };

    document.addEventListener('click', handleContactFormLinkClick);
    return () => {
      document.removeEventListener('click', handleContactFormLinkClick);
    };
  }, [router]);

  return (
    <section className="py-18" style={{ background: 'linear-gradient(to bottom, #e5e7eb, #ffffff)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 mb-6 shadow-md ring-1 ring-slate-200/50">
            <FaQuestionCircle className="w-8 h-8 text-slate-700" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Često postavljana pitanja
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Pronađite odgovore na najčešća pitanja o našim uslugama
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-b from-white to-slate-50 rounded-xl shadow-sm overflow-hidden border transition-all duration-300 ${
                openIndex === index 
                  ? 'border-slate-200 shadow-md ring-1 ring-slate-200/50' 
                  : 'border-slate-100 hover:border-slate-200 hover:shadow-sm'
              }`}
            >
              <button
                className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 cursor-pointer hover:bg-slate-50/50 transition-colors duration-200"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`text-lg font-medium transition-colors duration-300 ${
                    openIndex === index ? 'text-slate-900' : 'text-slate-700'
                  }`}>
                    {item.question}
                  </h3>
                  <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    <FaChevronDown className={`w-5 h-5 transition-colors duration-300 ${
                      openIndex === index ? 'text-slate-700' : 'text-slate-400'
                    }`} />
                  </div>
                </div>
              </button>
              
              <div
                className={`px-8 transition-all duration-300 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100 pb-6' 
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="border-t border-slate-100 pt-6">
                  <div 
                    className="text-slate-600 leading-relaxed [&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:hover:no-underline [&_a]:transition-colors [&_a]:cursor-pointer"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 