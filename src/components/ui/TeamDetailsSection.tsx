import Image from 'next/image';

interface TeamDetailsSectionProps {
  image: {
    src: string;
    alt: string;
  };
  details: string[];
}

export default function TeamDetailsSection({ image, details }: TeamDetailsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="relative h-[500px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover rounded-lg shadow-xl"
        />
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