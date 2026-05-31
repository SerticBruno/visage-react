import Script from 'next/script';
import { stripHtml } from '@/data/faq';

interface LocalBusinessData {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  priceRange: string;
  image: string;
  sameAs?: string[];
  areaServed?: string[];
}

interface ArticleData {
  headline: string;
  description: string;
  image: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: {
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    type: string;
    id: string;
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ServiceData {
  name: string;
  description: string;
  url: string;
  image?: string;
  providerName: string;
  providerUrl: string;
  areaServed?: string[];
}

const BASE_URL = 'https://visagestudio.hr';

function JsonLdScript({ id, data }: { id: string; data: object }) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessStructuredData({ data }: { data: LocalBusinessData }) {
  const areaServed = data.areaServed ?? ['Sisak', 'Sisačko-moslavačka županija', 'Zagreb', 'Hrvatska'];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    email: data.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    },
    openingHours: data.openingHours,
    priceRange: data.priceRange,
    image: data.image,
    sameAs: data.sameAs,
    serviceType: [
      'Estetska medicina',
      'Kozmetički tretmani',
      'Mezoterapija',
      'Plasmage',
      'PRP terapija',
    ],
    areaServed: areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
  };

  return <JsonLdScript id="local-business-structured-data" data={structuredData} />;
}

export function ArticleStructuredData({ data }: { data: ArticleData }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    image: data.image,
    author: {
      '@type': 'Person',
      name: data.author.name,
      url: data.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: data.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: data.publisher.logo.url,
      },
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.mainEntityOfPage.id,
    },
  };

  return <JsonLdScript id="article-structured-data" data={structuredData} />;
}

export function FAQPageStructuredData({ items }: { items: FAQItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(item.answer),
      },
    })),
  };

  return <JsonLdScript id="faq-structured-data" data={structuredData} />;
}

export function BreadcrumbListStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return <JsonLdScript id="breadcrumb-structured-data" data={structuredData} />;
}

export function ServiceStructuredData({ data }: { data: ServiceData }) {
  const areaServed = data.areaServed ?? ['Sisak', 'Zagreb', 'Hrvatska'];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    url: data.url,
    image: data.image,
    provider: {
      '@type': 'BeautySalon',
      name: data.providerName,
      url: data.providerUrl,
    },
    areaServed: areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
  };

  return <JsonLdScript id="service-structured-data" data={structuredData} />;
}
