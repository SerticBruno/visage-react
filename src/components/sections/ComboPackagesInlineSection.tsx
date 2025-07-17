import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { comboPackages } from '@/data/comboPackages';
import { FaPlus, FaArrowRight } from 'react-icons/fa';

export default function ComboPackagesInlineSection() {
  return (
    <section className="pb-12" style={{ background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Kombinirani Paketi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Uštedite i doživite optimalne rezultate s našim posebno kreiranim paketima tretmana
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-8 max-w-7xl mx-auto overflow-x-auto px-4 py-8">
          {comboPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg flex-shrink-0 md:flex-1 lg:flex-1 relative"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg font-bold text-base md:text-lg">
                  {pkg.title}
                </div>
              </div>
              <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col pt-8 md:pt-10 lg:pt-12 rounded-xl md:rounded-2xl" style={{ background: 'linear-gradient(to bottom,rgb(233, 234, 235),#f0f0f0)' }}>
                <div className="text-center mb-6 md:mb-8">
                  <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-lg">{pkg.description}</p>
                  <div className="flex items-center justify-center gap-2 md:gap-3">
                    <span className="text-2xl md:text-3xl font-bold text-primary">{pkg.price}</span>
                    {pkg.oldPrice && (
                      <>
                        <span className="text-lg md:text-xl text-gray-400 line-through">{pkg.oldPrice}</span>
                        <span className="bg-gray-300 text-gray-700 text-xs md:text-sm font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-sm">
                          -{Math.round(((parseFloat(pkg.oldPrice.replace(' EUR', '')) - parseFloat(pkg.price.replace(' EUR', ''))) / parseFloat(pkg.oldPrice.replace(' EUR', ''))) * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="mb-6 md:mb-8 flex-1">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3 lg:gap-4">
                    {pkg.services.map((service, index) => (
                      <React.Fragment key={service.id}>
                        <Link href={`/usluge/${service.id}`} className="group w-full">
                          <div className="flex flex-col items-center gap-2 md:gap-3 w-full h-48 md:h-52 lg:h-56 bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-3 lg:p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                            <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden shadow-md transition-transform group-hover:scale-105">
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 md:gap-2">
                                <h5 className="font-medium text-sm md:text-xs lg:text-sm group-hover:text-primary transition-colors uppercase">{service.title}</h5>
                                {service.quantity > 1 && (
                                  <span className="text-xs md:text-xs lg:text-sm text-primary font-medium">x{service.quantity}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                        {index < pkg.services.length - 1 && (
                          <div className="flex items-center justify-center">
                            <div className="bg-primary/10 rounded-full p-1.5 md:p-1.5 lg:p-2 shadow-sm">
                              <FaPlus className="text-primary text-sm md:text-sm lg:text-base" />
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}

                    {pkg.products && pkg.products.length > 0 && (
                      <>
                        {pkg.services.length > 0 && (
                          <div className="flex items-center justify-center">
                            <div className="bg-primary/10 rounded-full p-1.5 md:p-1.5 lg:p-2 shadow-sm">
                              <FaPlus className="text-primary text-sm md:text-sm lg:text-base" />
                            </div>
                          </div>
                        )}
                        {pkg.products.map((product, index) => (
                          <React.Fragment key={product.id}>
                            <Link href={`/katalog/${product.id}`} className="group w-full">
                              <div className="flex flex-col items-center gap-2 md:gap-3 w-full h-48 md:h-52 lg:h-56 bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-3 lg:p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden shadow-md transition-transform group-hover:scale-105">
                                  <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="text-center">
                                  <div className="flex items-center justify-center gap-1 md:gap-2">
                                    <h5 className="font-medium text-sm md:text-xs lg:text-sm group-hover:text-primary transition-colors uppercase">{product.title}</h5>
                                    {product.quantity > 1 && (
                                      <span className="text-xs md:text-xs lg:text-sm text-primary font-medium">x{product.quantity}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Link>
                            {index < pkg.products!.length - 1 && (
                              <div className="flex items-center justify-center">
                                <div className="bg-primary/10 rounded-full p-1.5 md:p-1.5 lg:p-2 shadow-sm">
                                  <FaPlus className="text-primary text-sm md:text-sm lg:text-base" />
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-center mt-auto">
                  <Link
                    href={`/kontakt?service=${encodeURIComponent(pkg.title)}`}
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