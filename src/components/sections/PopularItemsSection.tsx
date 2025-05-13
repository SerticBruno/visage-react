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
    <section className={`py-16 ${background === 'gray' ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {items.map((item) => (
            <Link 
              key={item.title}
              href={item.link}
              className="group relative bg-gradient-to-b from-white to-slate-50 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-4 flex flex-col items-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-slate-200 transition-all duration-300">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2 md:mb-4 text-center group-hover:text-slate-900 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-slate-600 text-center mb-4">
                  {item.description}
                </p>
                <div className="hidden lg:block w-full space-y-2 md:space-y-3 mb-4">
                  {item.features.map((feature, index) => (
                    <div key={index} className="flex items-center group/feature">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 mr-2 flex-shrink-0 transition-transform duration-300 group-hover/feature:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs md:text-sm text-slate-600 group-hover/feature:text-slate-700 transition-colors duration-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 border-t border-slate-100 mt-auto">
                <div className="text-center text-sm md:text-base font-medium bg-gradient-to-r from-slate-50 to-white rounded-lg py-2 px-4 group-hover:from-slate-100 group-hover:to-slate-50 transition-all duration-300">
                  <span className="text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                    Saznajte više
                  </span>
                  <svg 
                    className="w-4 h-4 ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
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
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-slate-200 transition-all duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href={viewAllLink}
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            {viewAllText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularItemsSection; 