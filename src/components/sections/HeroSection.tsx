import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  height?: string;
}

const HeroSection = ({
  title,
  description,
  image,
  ctaText,
  ctaLink,
  height = '80vh'
}: HeroSectionProps) => {
  return (
    <section className={`relative h-[${height}] flex items-center justify-center`}>
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={title}
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
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default HeroSection; 