import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { comboPackages } from '@/data/comboPackages';
import { FaCheck, FaPlus } from 'react-icons/fa';

export default function ComboPackagesInlineSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Kombinirani Paketi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Uštedite i doživite optimalne rezultate s našim posebno kreiranim paketima tretmana
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 max-w-6xl mx-auto">
          {comboPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-3">{pkg.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{pkg.description}</p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                    {pkg.oldPrice && (
                      <span className="text-xl text-gray-400 line-through">{pkg.oldPrice}</span>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-center text-lg">Uključeni tretmani i proizvodi:</h4>
                  <div className="flex flex-wrap justify-center items-center gap-6">
                    {pkg.services.map((service, index) => (
                      <React.Fragment key={service.id}>
                        <div className="flex flex-col items-center gap-3 w-36 group">
                          <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md transition-transform group-hover:scale-105">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <h5 className="font-medium">{service.title}</h5>
                              {service.quantity > 1 && (
                                <span className="text-sm text-primary font-medium">x{service.quantity}</span>
                              )}
                            </div>
                            {service.shortDescription && (
                              <p className="text-sm text-gray-600 mt-1">{service.shortDescription}</p>
                            )}
                          </div>
                        </div>
                        {index < pkg.services.length - 1 && (
                          <div className="flex items-center">
                            <div className="bg-primary/10 rounded-full p-3 shadow-sm">
                              <FaPlus className="text-primary text-xl" />
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}

                    {pkg.products && pkg.products.length > 0 && (
                      <>
                        {pkg.services.length > 0 && (
                          <div className="flex items-center">
                            <div className="h-0.5 w-12 bg-gray-200 mx-2"></div>
                            <div className="bg-primary/10 rounded-full p-3 shadow-sm">
                              <FaPlus className="text-primary text-xl" />
                            </div>
                            <div className="h-0.5 w-12 bg-gray-200 mx-2"></div>
                          </div>
                        )}
                        {pkg.products.map((product, index) => (
                          <React.Fragment key={product.id}>
                            <div className="flex flex-col items-center gap-3 w-36 group">
                              <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md transition-transform group-hover:scale-105">
                                <Image
                                  src={product.image}
                                  alt={product.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <h5 className="font-medium">{product.title}</h5>
                                  {product.quantity > 1 && (
                                    <span className="text-sm text-primary font-medium">x{product.quantity}</span>
                                  )}
                                </div>
                                {product.shortDescription && (
                                  <p className="text-sm text-gray-600 mt-1">{product.shortDescription}</p>
                                )}
                              </div>
                            </div>
                            {index < pkg.products!.length - 1 && (
                              <div className="flex items-center">
                                <div className="bg-primary/10 rounded-full p-3 shadow-sm">
                                  <FaPlus className="text-primary text-xl" />
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-center text-lg">Prednosti:</h4>
                  <ul className="flex flex-wrap justify-center gap-3">
                    {pkg.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-700 bg-gray-50 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                        <FaCheck className="text-primary mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/kontakt"
                  className="block w-full bg-primary text-white text-center py-4 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
                >
                  Rezervirajte termin
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 