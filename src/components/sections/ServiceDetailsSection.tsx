'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '@/data/services/types';
import { FaUsers, FaRegClock, FaHandHoldingUsd, FaCheck, FaChevronRight, FaStar, FaBox, FaClipboardCheck, FaClipboard, FaHome } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { pricingData } from '@/data/pricing';
import { products, Product } from '@/data/products';
import ProductModal from '@/components/ui/ProductModal';


interface ServiceDetailsSectionProps {
  service: Service;
}

const tabIcons = {
  'prednosti': FaStar,
  'kandidati': FaUsers,
  'priprema': FaClipboard,
  'tijek-tretmana': FaRegClock,
  'oporavak': FaHeart,
  'nakon-tretmana': FaHome,
  'cijena': FaHandHoldingUsd
};



const renderPricingTable = (service: Service) => {
  // For mesotherapy, we want to show multiple categories
  const categories = service.id === 'mezoterapija' 
    ? ['Mesosynergy', 'Mezoterapija Dermapenom 4', 'Mezoterapija Mesoject Gunom']
    : [service.pricingCategory];

  return (
    <div className="space-y-12">
      {categories.map((category) => {
        const relevantPricingItems = pricingData.filter(item => item.category === category);

        if (relevantPricingItems.length === 0) {
          return null;
        }

        return (
          <div key={category} className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {relevantPricingItems.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="text-base font-medium text-gray-900">{item.title}</h4>
                          {item.isPackage && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <FaBox className="mr-1" />
                              Paket
                            </span>
                          )}
                          {item.isPopular && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              <FaStar className="mr-1" />
                              Popularno
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-base font-medium text-gray-900">{item.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          * Cijene su informativne i mogu varirati ovisno o specifičnim zahtjevima
        </p>
        <p className="text-gray-600">
          Za više informacija i rezervacije, slobodno nas kontaktirajte
        </p>
      </div>
    </div>
  );
};

export default function ServiceDetailsSection({ service }: ServiceDetailsSectionProps) {
  const [activeTab, setActiveTab] = useState(service.steps[0].id);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [hasUserChangedTab, setHasUserChangedTab] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  


  const handleNext = () => {
    const currentIndex = service.steps.findIndex(step => step.id === activeTab);
    if (currentIndex < service.steps.length - 1) {
      setActiveTab(service.steps[currentIndex + 1].id);
      setHasUserChangedTab(true);
      // Scroll the slider
      if (sliderRef.current) {
        const scrollAmount = 84; // 80px (min-w-[80px]) + 16px (space-x-4)
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = service.steps.findIndex(step => step.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(service.steps[currentIndex - 1].id);
      setHasUserChangedTab(true);
      // Scroll the slider
      if (sliderRef.current) {
        const scrollAmount = -84; // 80px (min-w-[80px]) + 16px (space-x-4)
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleProductClick = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleImageLoad = (imageSrc: string) => {
    setLoadedImages(prev => new Set(prev).add(imageSrc));
  };

  // Call scrollToActiveStep only when user has manually changed tabs
  React.useEffect(() => {
    if (hasUserChangedTab && sliderRef.current) {
      const activeStep = sliderRef.current.querySelector(`[data-step-id="${activeTab}"]`);
      if (activeStep) {
        activeStep.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab, hasUserChangedTab]);

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
      
      // Check if content also contains bullet points
      if (processedContent.includes('- ')) {
        // Split content into sections and process bullet points separately
        const sections = processedContent.split('\n\n');
        
        return sections.map((section, sectionIdx) => {
          const lines = section.split('\n');
          
          // If the section starts with a title/intro text
          if (lines[0] && !lines[0].trim().startsWith('- ') && !lines[0].trim().match(/^[0-9]+\./)) {
            const introText = lines[0];
            const bulletPoints = lines.slice(1).filter(line => line.trim().startsWith('- '));
            
            return (
              <div key={sectionIdx} className="mb-6">
                <div 
                  className="text-gray-600 mb-4 leading-relaxed [&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:transition-colors"
                  dangerouslySetInnerHTML={{ __html: introText }}
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
                {bulletPoints.length > 0 && (
                  <ul className="space-y-3">
                    {bulletPoints.map((item, itemIdx) => {
                      const cleanItem = item.replace('- ', '');
                      // Check if the bullet point contains HTML links
                      if (cleanItem.includes('<a href=')) {
                        // Process the content to replace catalog links with modal triggers
                        const processedItem = cleanItem.replace(
                          /<a href="\/katalog\?product=(\d+)">([^<]+)<\/a>/g,
                          (match, productId, linkText) => {
                            return `<a href="#" class="product-link" data-product-id="${productId}">${linkText}</a>`;
                          }
                        );
                        
                        return (
                          <li key={itemIdx} className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                              <FaCheck className="h-4 w-4 text-slate-700" />
                            </div>
                            <div 
                              className="text-gray-600 [&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:transition-colors"
                              dangerouslySetInnerHTML={{ __html: processedItem }}
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
                          </li>
                        );
                      }
                      
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
                    // Check if the bullet point contains HTML links
                    if (cleanItem.includes('<a href=')) {
                      // Process the content to replace catalog links with modal triggers
                      const processedItem = cleanItem.replace(
                        /<a href="\/katalog\?product=(\d+)">([^<]+)<\/a>/g,
                        (match, productId, linkText) => {
                          return `<a href="#" class="product-link" data-product-id="${productId}">${linkText}</a>`;
                        }
                      );
                      
                      return (
                        <li key={itemIdx} className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                            <FaCheck className="h-4 w-4 text-slate-700" />
                          </div>
                          <div 
                            className="text-gray-600 [&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:transition-colors"
                            dangerouslySetInnerHTML={{ __html: processedItem }}
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
                        </li>
                      );
                    }
                    
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
          
          // Regular HTML content
          return (
            <div 
              key={sectionIdx}
              className="text-gray-600 leading-relaxed [&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:transition-colors"
              dangerouslySetInnerHTML={{ __html: section }}
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
        });
      }
      
      // If content contains HTML but no bullet points, render it directly
      return (
        <div 
          className="text-gray-600 leading-relaxed [&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:transition-colors"
          dangerouslySetInnerHTML={{ __html: processedContent }}
          ref={(el) => {
            if (el) {
              // Add click handlers to product links
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

    // Original logic for plain text content
    const sections = content.split('\n\n');
    
    return sections.map((section, sectionIdx) => {
      const lines = section.split('\n');
      
      // If the section starts with a title/intro text
      if (lines[0] && !lines[0].trim().startsWith('- ') && !lines[0].trim().match(/^[0-9]+\./)) {
        const introText = lines[0];
        const orderedListItems = lines.slice(1).filter(line => line.trim().match(/^[0-9]+\./));
        const bulletPoints = lines.slice(1).filter(line => line.trim().startsWith('- '));
        
        return (
          <div key={sectionIdx} className="mb-6">
            <p className="text-gray-600 mb-4 leading-relaxed">{introText}</p>
            {orderedListItems.length > 0 && (
              <ol className="space-y-3 list-decimal pl-6 mb-4">
                {orderedListItems.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-gray-600">
                    {item.replace(/^[0-9]+\.\s*/, '')}
                  </li>
                ))}
              </ol>
            )}
            {bulletPoints.length > 0 && (
              <ul className="space-y-3">
                {bulletPoints.map((item, itemIdx) => {
                  const cleanItem = item.replace('- ', '');
                  // Check if the bullet point contains HTML links
                  if (cleanItem.includes('<a href=')) {
                    // Process the content to replace catalog links with modal triggers
                    const processedItem = cleanItem.replace(
                      /<a href="\/katalog\?product=(\d+)">([^<]+)<\/a>/g,
                      (match, productId, linkText) => {
                        return `<a href="#" class="product-link" data-product-id="${productId}">${linkText}</a>`;
                      }
                    );
                    
                    return (
                      <li key={itemIdx} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                          <FaCheck className="h-4 w-4 text-slate-700" />
                        </div>
                        <div 
                          className="text-gray-600 [&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:transition-colors"
                          dangerouslySetInnerHTML={{ __html: processedItem }}
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
                      </li>
                    );
                  }
                  
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
      
      // If the section is just ordered list items
      if (lines.every(line => line.trim().match(/^[0-9]+\./))) {
        return (
          <div key={sectionIdx} className="mb-6">
            <ol className="space-y-3 list-decimal pl-6">
              {lines.map((item, itemIdx) => (
                <li key={itemIdx} className="text-gray-600">
                  {item.replace(/^[0-9]+\.\s*/, '')}
                </li>
              ))}
            </ol>
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
                // Check if the bullet point contains HTML links
                if (cleanItem.includes('<a href=')) {
                  // Process the content to replace catalog links with modal triggers
                  const processedItem = cleanItem.replace(
                    /<a href="\/katalog\?product=(\d+)">([^<]+)<\/a>/g,
                    (match, productId, linkText) => {
                      return `<a href="#" class="product-link" data-product-id="${productId}">${linkText}</a>`;
                    }
                  );
                  
                  return (
                    <li key={itemIdx} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                        <FaCheck className="h-4 w-4 text-slate-700" />
                      </div>
                      <div 
                        className="text-gray-600 [&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:transition-colors"
                        dangerouslySetInnerHTML={{ __html: processedItem }}
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
                    </li>
                  );
                }
                
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
                {description.includes('<a href=') ? (
                  (() => {
                    // Process the content to replace catalog links with modal triggers
                    const processedDescription = description.replace(
                      /<a href="\/katalog\?product=(\d+)">([^<]+)<\/a>/g,
                      (match, productId, linkText) => {
                        return `<a href="#" class="product-link" data-product-id="${productId}">${linkText}</a>`;
                      }
                    );
                    
                    return (
                      <div 
                        className="text-gray-600 leading-relaxed [&_a]:text-gray-700 [&_a]:underline [&_a]:hover:text-gray-900 [&_a]:transition-colors"
                        dangerouslySetInnerHTML={{ __html: processedDescription }}
                        ref={(el) => {
                          if (el) {
                            // Add click handlers to product links
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
                  })()
                ) : (
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <section style={{ background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)' }}>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Mobile Step Navigation */}
        <div className="lg:hidden mb-8">
          <div className="relative">
            {/* Step List */}
            <div ref={sliderRef} className="flex overflow-x-auto pb-4 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex space-x-4 px-4">
                {service.steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex-shrink-0"
                    data-step-id={step.id}
                  >
                    <button
                      onClick={() => {
                        setActiveTab(step.id);
                        setHasUserChangedTab(true);
                      }}
                      className={`flex flex-col items-center min-w-[80px] transition-all duration-200 ${
                        activeTab === step.id ? 'opacity-100' : 'opacity-60'
                      }`}
                    >
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center mb-2
                        transition-all duration-200
                        ${activeTab === step.id 
                          ? 'bg-gradient-to-br from-black to-gray-800 text-white scale-110 shadow-lg' 
                          : 'bg-white text-black shadow-md'
                        }
                      `}>
                        {React.createElement(tabIcons[step.id as keyof typeof tabIcons], {
                          className: "w-5 h-5"
                        })}
                      </div>
                      <span className="text-sm font-medium text-center text-black">
                        {step.label}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-gray-100">
              <div 
                className="h-full bg-black transition-all duration-300"
                style={{ 
                  width: `${((service.steps.findIndex(step => step.id === activeTab) + 1) / service.steps.length) * 100}%` 
                }}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button 
                onClick={handlePrevious}
                disabled={service.steps.findIndex(step => step.id === activeTab) === 0}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <FaChevronRight className="w-4 h-4 rotate-180" />
              </button>

              <div className="text-sm font-medium text-slate-600">
                {service.steps.findIndex(step => step.id === activeTab) + 1} / {service.steps.length}
              </div>

              <button 
                onClick={handleNext}
                disabled={service.steps.findIndex(step => step.id === activeTab) === service.steps.length - 1}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden lg:block">
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8 overflow-x-auto pb-4 scrollbar-hide">
              {service.steps.map((step) => {
                const Icon = tabIcons[step.id as keyof typeof tabIcons];
                return (
                  <motion.button
                    key={step.id}
                    onClick={() => {
                      setActiveTab(step.id);
                      setHasUserChangedTab(true);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 cursor-pointer
                      ${activeTab === step.id
                        ? 'border-[#000000] text-black'
                        : 'border-transparent text-black hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5" />
                      <span>{step.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {service.steps.map((step) => (
              activeTab === step.id && (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className={`grid grid-cols-1 gap-12 items-start ${
                    activeTab === 'cijena'
                      ? 'lg:grid-cols-1'
                      : activeTab === 'oporavak' || (activeTab !== 'cijena' && service.steps.find(s => s.id === activeTab)?.image)
                      ? 'lg:grid-cols-2' 
                      : 'lg:grid-cols-1'
                  }`}>
                    <div className={`space-y-6 ${activeTab === 'cijena' ? 'lg:max-w-2xl' : ''}`}>
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex items-center space-x-3 mb-6"
                      >
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center shadow-md ring-1 ring-gray-200/50">
                          {React.createElement(tabIcons[step.id as keyof typeof tabIcons], {
                            className: "h-6 w-6 text-black"
                          })}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{step.label}</h3>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-indigo max-w-none"
                      >
                        {activeTab === 'cijena' ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="prose prose-indigo max-w-none"
                          >
                            {renderPricingTable(service)}
                          </motion.div>
                        ) : activeTab === 'tijek-tretmana' 
                          ? renderTreatmentSteps(service.stepContents[step.id])
                          : formatContent(service.stepContents[step.id])
                        }
                      </motion.div>
                    </div>



                    {/* Image for other tabs - only show if step has an image */}
                    {activeTab !== 'cijena' && service.steps.find(s => s.id === activeTab)?.image && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 }}
                        className="relative h-[400px] rounded-xl overflow-hidden shadow-xl group cursor-pointer"
                      >
                        {(() => {
                          const currentImage = service.steps.find(s => s.id === activeTab)?.image || '';
                          const isImageLoaded = loadedImages.has(currentImage);
                          
                          return (
                            <>
                              {/* Animated glass placeholder */}
                              <div 
                                className={`absolute inset-0 transition-opacity duration-700 ${
                                  isImageLoaded ? 'opacity-0' : 'opacity-100'
                                }`}
                              >
                                {/* Base glass background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-350 to-gray-300 rounded-xl" />
                                
                                {/* Animated shimmer overlay */}
                                <div className="absolute inset-0 overflow-hidden rounded-xl">
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer" />
                                </div>
                                
                                {/* Subtle pattern overlay */}
                                <div className="absolute inset-0 opacity-10">
                                  <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:20px_20px]" />
                                </div>
                                
                                {/* Glass effect highlights */}
                                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl" />
                                <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/20 to-transparent rounded-l-xl" />
                              </div>
                              
                              {/* Actual image with blur-in effect */}
                              <Image
                                src={currentImage}
                                alt={`${service.title} - ${service.steps.find(s => s.id === activeTab)?.label || ''}`}
                                fill
                                loading="lazy"
                                onLoad={() => handleImageLoad(currentImage)}
                                className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                                  isImageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'
                                }`}
                                style={{ 
                                  objectPosition: (() => {
                                    const step = service.steps.find(s => s.id === activeTab);
                                    if (!step?.focalPoint) return 'center center';
                                    
                                    // Check if focalPoint is a percentage string (e.g., "25% 30%")
                                    if (step.focalPoint.includes('%')) {
                                      return step.focalPoint;
                                    }
                                    
                                    switch (step.focalPoint) {
                                      case 'left': return 'left center';
                                      case 'right': return 'right center';
                                      case 'top': return 'center top';
                                      case 'bottom': return 'center bottom';
                                      case 'top-left': return 'left top';
                                      case 'top-right': return 'right top';
                                      case 'bottom-left': return 'left bottom';
                                      case 'bottom-right': return 'right bottom';
                                      case 'center':
                                      default: return 'center center';
                                    }
                                  })()
                                }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </>
                          );
                        })()}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    )}

                    {/* Empty right column for oporavak tab */}
                    {activeTab === 'oporavak' && !service.steps.find(s => s.id === activeTab)?.image && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="hidden lg:block"
                      >
                        {/* Empty space to maintain 2-column layout */}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
      

      
      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onProductChange={handleProductClick}
      />
    </section>
  );
}