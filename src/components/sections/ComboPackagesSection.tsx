import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { comboPackages } from '@/data/comboPackages';
import { FaCheck, FaPlus } from 'react-icons/fa';

export default function ComboPackagesSection() {
  return (
    <section className="py-16 bg-gray-50" style={{ background: 'linear-gradient(to bottom, #e5e7eb, #ffffff)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Kombinirani Paketi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Uštedite i doživite optimalne rezultate s našim posebno kreiranim paketima tretmana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {comboPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="relative h-48">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
                {pkg.isPopular && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popularno
                  </div>
                )}
                {pkg.isLimited && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Ograničeno
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-center">{pkg.title}</h3>
                <p className="text-gray-600 mb-4 text-center">{pkg.description}</p>

                <div className="mb-4 text-center">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                    {pkg.oldPrice && (
                      <span className="text-gray-500 line-through">{pkg.oldPrice}</span>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-center">Uključeni tretmani:</h4>
                  <div className="space-y-4">
                    {pkg.services.map((service, index) => (
                      <React.Fragment key={service.id}>
                        <div className="flex flex-col items-center gap-2">
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <h5 className="font-medium">{service.title}</h5>
                              {service.quantity > 1 && (
                                <span className="text-sm text-primary">x{service.quantity}</span>
                              )}
                            </div>
                            {service.shortDescription && (
                              <p className="text-sm text-gray-600">{service.shortDescription}</p>
                            )}
                          </div>
                        </div>
                        {index < pkg.services.length - 1 && (
                          <div className="flex justify-center my-2">
                            <div className="bg-primary/10 rounded-full p-2">
                              <FaPlus className="text-primary text-lg" />
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {pkg.products && pkg.products.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-center">Uključeni proizvodi:</h4>
                    <div className="space-y-4">
                      {pkg.products.map((product, index) => (
                        <React.Fragment key={product.id}>
                          <div className="flex flex-col items-center gap-2">
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <h5 className="font-medium">{product.title}</h5>
                                {product.quantity > 1 && (
                                  <span className="text-sm text-primary">x{product.quantity}</span>
                                )}
                              </div>
                              {product.shortDescription && (
                                <p className="text-sm text-gray-600">{product.shortDescription}</p>
                              )}
                            </div>
                          </div>
                          {index < pkg.products!.length - 1 && (
                            <div className="flex justify-center my-2">
                              <div className="bg-primary/10 rounded-full p-2">
                                <FaPlus className="text-primary text-lg" />
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-center">Prednosti:</h4>
                  <ul className="space-y-1">
                    {pkg.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center justify-center text-gray-600">
                        <FaCheck className="text-primary mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/kontakt"
                  className="block w-full bg-primary text-white text-center py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
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