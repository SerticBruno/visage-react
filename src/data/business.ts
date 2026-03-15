/**
 * Central business/contact data for VISAGE Studio.
 * Used for structured data (JSON-LD), footer, and contact sections.
 */
const BASE_URL = 'https://visagestudio.hr';

export const businessData = {
  name: 'VISAGE Studio',
  description:
    'VISAGE Studio je estetski studio u centru Siska, certificirani predstavnik TOSKANI. Pružamo profesionalne usluge estetske medicine: mezoterapija, Dermapen 4, skin boosteri, PRP, Plasmage, botox i kozmetički tretmani.',
  url: BASE_URL,
  telephone: '+385911105020',
  email: 'info@visagestudio.hr',
  address: {
    streetAddress: 'Ulica Stjepana i Antuna Radića 49',
    addressLocality: 'Sisak',
    postalCode: '44000',
    addressCountry: 'HR',
  },
  geo: {
    latitude: 45.484,
    longitude: 16.372,
  },
  /** Schema.org openingHours format e.g. "Mo-Fr 09:00-17:00". By appointment = flexible within typical hours. */
  openingHours: ['Mo-Su 09:00-18:00'] as string[],
  priceRange: '€€',
  image: `${BASE_URL}/images/services/toskani-woman-visage-estetski-studio.webp`,
  sameAs: [
    'https://www.instagram.com/visage.estheticstudio',
    'https://www.facebook.com/visage.estheticstudio',
  ].filter(Boolean) as string[],
};

export type LocalBusinessStructuredDataInput = typeof businessData & {
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: { latitude: number; longitude: number };
  openingHours: string[];
};
