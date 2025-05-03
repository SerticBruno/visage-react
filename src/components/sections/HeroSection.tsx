import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/services/toskani-hero.webp"
            alt="VISAGE Studio"
            fill
            className="object-cover"
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
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          VISAGE studio
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Estetski studio u centru Siska koji je certificirani predstavnik za TOSKANI
        </p>
        <Link
          href="/kontakt"
          className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Zakažite termin
        </Link>
      </div>
    </section>
  );
};

export default HeroSection; 