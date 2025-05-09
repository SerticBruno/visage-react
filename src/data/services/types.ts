import { IconType } from 'react-icons';

export type ServiceStep = {
  id: string;
  label: string;
  icon: string;
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
}

export type Services = {
  [key: string]: Service;
}; 