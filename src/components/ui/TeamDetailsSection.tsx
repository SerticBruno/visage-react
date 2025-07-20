import Image from 'next/image';
import { BsQuote } from 'react-icons/bs';

interface TeamDetailsSectionProps {
  image: {
    src: string;
    alt: string;
  };
  details: string[];
  hasGroupPhoto?: boolean;
  groupQuote?: string;
}

export default function TeamDetailsSection({ image, details, hasGroupPhoto = false, groupQuote }: TeamDetailsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="relative h-[500px]">
        {!hasGroupPhoto ? (
          // Quote placeholder for group photo
          <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8 text-center rounded-lg shadow-xl">
            <BsQuote className="w-16 h-16 text-gray-600 mb-6" />
            <blockquote className="text-gray-800 italic text-xl leading-relaxed mb-4">
              {groupQuote || `"Naš tim stručnjaka radi zajedno kako bismo vam pružili najkvalitetnijih estetskih usluge s fokusom na vašu sigurnost i zadovoljstvo."`}
            </blockquote>
          </div>
        ) : (
          // Actual group photo
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover rounded-lg shadow-xl"
          />
        )}
      </div>
      <div>
        {details.map((detail, index) => (
          <p key={index} className="text-gray-600 mb-6">
            {detail}
          </p>
        ))}
      </div>
    </div>
  );
} 