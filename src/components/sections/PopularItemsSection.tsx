import Image from 'next/image';
import Link from 'next/link';

interface PopularItem {
  title: string;
  description: string;
  image: string;
  link: string;
  features: string[];
}

interface PopularItemsSectionProps {
  title: string;
  items: PopularItem[];
  viewAllLink: string;
  viewAllText: string;
  background?: 'white' | 'gray';
}

const PopularItemsSection = ({
  title,
  items,
  viewAllLink,
  viewAllText,
  background = 'white'
}: PopularItemsSectionProps) => {
  return (
    <section className="py-16" style={{ background: background === 'gray' ? 'linear-gradient(to bottom, #e5e7eb, #ffffff)' : 'white' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item) => (
            <Link 
              key={item.title}
              href={item.link}
              className="group block h-full"
            >
              <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#00000099] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-[#111827] mb-2 group-hover:text-[#1f2937] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#4b5563] line-clamp-2 flex-1 mb-4">
                    {item.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    {item.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ecfdf5] flex items-center justify-center">
                          <svg className="w-3 h-3 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-[#4b5563]">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1f2937] text-white rounded-lg hover:bg-[#374151] transition-all duration-300">
                      <span className="font-medium">Saznajte više</span>
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href={viewAllLink}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1f2937] text-white rounded-full font-semibold hover:bg-[#374151] transition-all duration-300"
          >
            {viewAllText}
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularItemsSection; 