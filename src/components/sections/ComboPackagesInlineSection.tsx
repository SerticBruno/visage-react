import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { comboPackages } from '@/data/comboPackages';
import { FaCheck, FaPlus, FaArrowRight } from 'react-icons/fa';

export default function ComboPackagesInlineSection() {
  return (
    <section className="py-12 md:py-16" style={{ background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Kombinirani Paketi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Uštedite i doživite optimalne rezultate s našim posebno kreiranim paketima tretmana
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-12 max-w-6xl mx-auto">
          {comboPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="p-4 md:p-8" style={{ background: 'linear-gradient(to bottom,rgb(233, 234, 235),#f0f0f0)' }}>
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{pkg.title}</h3>
                  <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-lg">{pkg.description}</p>
                  <div className="flex items-baseline justify-center gap-2 md:gap-3">
                    <span className="text-2xl md:text-3xl font-bold text-primary">{pkg.price}</span>
                    {pkg.oldPrice && (
                      <span className="text-lg md:text-xl text-gray-400 line-through">{pkg.oldPrice}</span>
                    )}
                  </div>
                </div>

                <div className="mb-6 md:mb-8">
                  <div className="flex flex-col items-center gap-4 md:gap-6">
                    {pkg.services.map((service, index) => (
                      <React.Fragment key={service.id}>
                        <div className="flex flex-col items-center gap-2 md:gap-3 w-full max-w-[280px] md:w-48 bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden shadow-md transition-transform group-hover:scale-105">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 md:gap-2">
                              <h5 className="font-medium text-sm md:text-base">{service.title}</h5>
                              {service.quantity > 1 && (
                                <span className="text-xs md:text-sm text-primary font-medium">x{service.quantity}</span>
                              )}
                            </div>
                            {service.shortDescription && (
                              <p className="text-xs md:text-sm text-gray-600 mt-1">{service.shortDescription}</p>
                            )}
                          </div>
                        </div>
                        {index < pkg.services.length - 1 && (
                          <div className="flex items-center justify-center">
                            <div className="bg-primary/10 rounded-full p-2 md:p-3 shadow-sm">
                              <FaPlus className="text-primary text-lg md:text-xl" />
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}

                    {pkg.products && pkg.products.length > 0 && (
                      <>
                        {pkg.services.length > 0 && (
                          <div className="flex items-center justify-center">
                            <div className="bg-primary/10 rounded-full p-2 md:p-3 shadow-sm">
                              <FaPlus className="text-primary text-lg md:text-xl" />
                            </div>
                          </div>
                        )}
                        {pkg.products.map((product, index) => (
                          <React.Fragment key={product.id}>
                            <div className="flex flex-col items-center gap-2 md:gap-3 w-full max-w-[280px] md:w-48 bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow">
                              <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden shadow-md transition-transform group-hover:scale-105">
                                <Image
                                  src={product.image}
                                  alt={product.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 md:gap-2">
                                  <h5 className="font-medium text-sm md:text-base">{product.title}</h5>
                                  {product.quantity > 1 && (
                                    <span className="text-xs md:text-sm text-primary font-medium">x{product.quantity}</span>
                                  )}
                                </div>
                                {product.shortDescription && (
                                  <p className="text-xs md:text-sm text-gray-600 mt-1">{product.shortDescription}</p>
                                )}
                              </div>
                            </div>
                            {index < pkg.products!.length - 1 && (
                              <div className="flex items-center justify-center">
                                <div className="bg-primary/10 rounded-full p-2 md:p-3 shadow-sm">
                                  <FaPlus className="text-primary text-lg md:text-xl" />
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className="mb-6 md:mb-8">
                  <h4 className="font-semibold mb-3 md:mb-4 text-center text-base md:text-lg">Prednosti:</h4>
                  <ul className="flex flex-wrap justify-center gap-2 md:gap-3">
                    {pkg.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-700 bg-gray-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm hover:shadow-md transition-shadow text-sm md:text-base">
                        <FaCheck className="text-primary mr-1.5 md:mr-2 flex-shrink-0 text-sm md:text-base" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-center mt-8">
                  <Link
                    href="/kontakt"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-[#1e293b] text-white rounded-xl hover:bg-[#334155] transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                  >
                    <span>Rezervirajte termin</span>
                    <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 