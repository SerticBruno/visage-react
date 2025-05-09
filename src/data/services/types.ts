export type ServiceStep = {
  id: string;
  label: string;
  icon: string;
};

export type Service = {
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  image: string;
  heroImage: string;
  metaDescription: string;
  metaKeywords: string;
  steps: ServiceStep[];
  stepContents: {
    [key: string]: string;
  };
};

export type Services = {
  [key: string]: Service;
}; 