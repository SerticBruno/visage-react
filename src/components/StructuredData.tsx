import Script from 'next/script';

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

export function LocalBusinessStructuredData({ data }: { data: LocalBusinessData }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "telephone": data.telephone,
    "email": data.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address.streetAddress,
      "addressLocality": data.address.addressLocality,
      "postalCode": data.address.postalCode,
      "addressCountry": data.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": data.geo.latitude,
      "longitude": data.geo.longitude
    },
    "openingHours": data.openingHours,
    "priceRange": data.priceRange,
    "image": data.image,
    "sameAs": data.sameAs,
    "serviceType": [
      "Estetska medicina",
      "Kozmetički tretmani",
      "Mezoterapija",
      "Plasmage",
      "PRP terapija"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Sisak"
    }
  };

  return (
    <Script
      id="local-business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ArticleStructuredData({ data }: { data: ArticleData }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.headline,
    "description": data.description,
    "image": data.image,
    "author": {
      "@type": "Person",
      "name": data.author.name,
      "url": data.author.url
    },
    "publisher": {
      "@type": "Organization",
      "name": data.publisher.name,
      "logo": {
        "@type": "ImageObject",
        "url": data.publisher.logo.url
      }
    },
    "datePublished": data.datePublished,
    "dateModified": data.dateModified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.mainEntityOfPage.id
    }
  };

  return (
    <Script
      id="article-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 