export type ServiceStep = {
  id: string;
  label: string;
  icon: string;
  image?: string;
};

export type TreatmentStep = {
  title: string;
  duration: string;
  description: string;
};

export interface Service {
  id: string;
  title: string;
  description: string;
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
  pricingCategory?: string;
  relatedServices?: string[];
}

export type Services = {
  [key: string]: Service;
}; 