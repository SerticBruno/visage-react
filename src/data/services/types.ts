export type ServiceStep = {
  id: string;
  label: string;
  icon: string;
  image?: string;
  focalPoint?: 'left' | 'center' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | `${number}% ${number}%`;
};

export type TreatmentStep = {
  title: string;
  duration: string;
  description: string;
};

export interface Service {
  id: string;
  title: string;
  akuzativTitle?: string;
  description: string;
  previewDescription?: string;
  longDescription: string;
  image: string;
  heroImage: string;
  benefits: string[];
  metaDescription: string;
  metaKeywords: string;
  steps: ServiceStep[];
  stepContents: {
    [key: string]: string;
  };
  treatmentSteps?: TreatmentStep[];
  tags: string[];
  isPopular?: boolean; // New field for popular tag
  isBestseller?: boolean; // New field for bestseller tag
  isPackage?: boolean; // New field for package tag
  isRecommended?: boolean; // New field for recommended tag
  pricingCategory?: string;
  relatedServices?: string[];
  focalPoint?: 'left' | 'center' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | `${number}% ${number}%`;
  mobileFocalPoint?: 'left' | 'center' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | `${number}% ${number}%`;
}

export type Services = {
  [key: string]: Service;
}; 