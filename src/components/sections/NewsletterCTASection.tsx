import Image from 'next/image';

const NewsletterCTASection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/services/toskani-woman.webp"
            alt="VISAGE Studio Newsletter"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Budite u toku s najnovijim ponudama
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Prijavite se na naš newsletter i budite prvi koji će saznati za nove tretmane, akcije i posebne ponude.
          </p>
          
          {/* Newsletter Form */}
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Vaša email adresa"
              className="flex-1 px-6 py-3 rounded-full bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition-colors"
            >
              Prijavi se
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-300">
            Vaša email adresa je sigurna. Možete se odjaviti u bilo kojem trenutku.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTASection; 