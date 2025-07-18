import Image from 'next/image';
import { ReactNode } from 'react';

interface StorySectionProps {
  title: string;
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
  };
  children?: ReactNode;
}

export default function StorySection({ title, paragraphs, image, children }: StorySectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-600 mb-4">
            {paragraph}
          </p>
        ))}
        {children}
      </div>
      <div className="relative h-96">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
} 