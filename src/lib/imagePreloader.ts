import { useState, useEffect } from 'react';

// Helper function to preload a single image
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
};

// Custom hook for preloading multiple images
export const useImagePreloader = (imageSources: (string | undefined)[]) => {
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    const preload = async () => {
      setIsPreloading(true);
      const validSources = imageSources.filter(Boolean) as string[];
      
      const preloadPromises = validSources.map(async (src) => {
        try {
          await preloadImage(src);
          return src;
        } catch (error) {
          console.warn(`Failed to preload image: ${src}`, error);
          return null;
        }
      });

      const results = await Promise.allSettled(preloadPromises);
      const successfulPreloads = results
        .filter((result): result is PromiseFulfilledResult<string> => 
          result.status === 'fulfilled' && result.value !== null
        )
        .map(result => result.value);

      setPreloadedImages(successfulPreloads);
      setIsPreloading(false);
    };

    if (imageSources.length > 0) {
      preload();
    } else {
      setIsPreloading(false);
    }
  }, [imageSources]);

  return { preloadedImages, isPreloading };
};

// Utility function to check if an image is preloaded
export const isImagePreloaded = (src: string, preloadedImages: string[]): boolean => {
  return preloadedImages.includes(src);
}; 