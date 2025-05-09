import { IconType } from 'react-icons';

export type ServiceStep = {
  id: string;
  label: string;
  icon: string;
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
  steps: {
    id: string;
    label: string;
    icon: string;
  }[];
  stepContents: {
    [key: string]: string;
  };
}

export type Services = {
  [key: string]: Service;
}; 