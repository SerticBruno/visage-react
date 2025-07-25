export interface ComboPackage {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  oldPrice?: string;
  services: {
    id: string;
    title: string;
    quantity: number;
    image: string;
    shortDescription?: string;
  }[];
  products?: {
    id: string;
    title: string;
    quantity: number;
    image: string;
    shortDescription?: string;
  }[];
  benefits: string[];
  isPopular?: boolean;
  isLimited?: boolean;
}

export const comboPackages: ComboPackage[] = [
  {
    id: "glow-combo",
    title: "Glow Combo",
    description: "Kompletni paket za sjajnu i zdravu kožu",
    image: "/images/services/toskani-woman-visage-estetski-studio.webp",
    price: "450 EUR",
    oldPrice: "520 EUR",
    services: [
      { 
        id: "kemijski-piling", 
        title: "Kemijski Piling", 
        quantity: 1,
        image: "/images/services/kemijski-piling/toskani-bg.webp"
      },
      { 
        id: "prp", 
        title: "PRP", 
        quantity: 1,
        image: "/images/services/woman-face-visage-estetski-studio.webp"
      },
      { 
        id: "skin-boosteri", 
        title: "Skin Boosteri", 
        quantity: 1,
        image: "/images/services/toskani-hero-visage-estetski-studio.webp"
      }
    ],
    products: [
      { 
        id: "2", 
        title: "Purifying Cleanser", 
        quantity: 1,
        image: "/images/products/TOSKANIpurifyingcleanser.webp"
      }
    ],
    benefits: [
      "Dubinska hidratacija kože",
      "Poboljšana tekstura i ton kože",
      "Smanjenje finih linija",
      "Zaštita od sunca uključena"
    ],
    isPopular: true
  },
  {
    id: "anti-age-combo",
    title: "Anti-Age Combo",
    description: "Napredni paket za mladolik izgled",
    image: "/images/services/toskani-woman-visage-estetski-studio.webp",
    price: "680 EUR",
    oldPrice: "780 EUR",
    services: [
      { 
        id: "kemijski-piling", 
        title: "Kemijski Piling", 
        quantity: 1,
        image: "/images/services/kemijski-piling/toskani-bg.webp",
        shortDescription: "Obnova kože"
      },
      { 
        id: "mezoterapija", 
        title: "Mezoterapija", 
        quantity: 1,
        image: "/images/services/mezoterapija/mezoterapija-tijek-zahvata-visage-estetski-studio.webp",
        shortDescription: "Dubinska hidratacija"
      },
      { 
        id: "skin-boosteri", 
        title: "Skin Boosteri", 
        quantity: 1,
        image: "/images/services/toskani-hero-visage-estetski-studio.webp",
        shortDescription: "Napredna hidratacija"
      }
    ],
    products: [
      { 
        id: "3", 
        title: "Retin Cream", 
        quantity: 1,
        image: "/images/products/toskaniRetinCream.webp"
      }
    ],
    benefits: [
      "Dubinska regeneracija kože",
      "Poboljšana elastičnost",
      "Smanjenje bora",
      "Svježiji i mladolikiji izgled"
    ],
    isLimited: true
  },
  {
    id: "premium-combo",
    title: "Premium Combo",
    description: "Ekskluzivni paket za najbolje rezultate",
    image: "/images/services/toskani-woman-visage-estetski-studio.webp",
    price: "890 EUR",
    oldPrice: "1050 EUR",
    services: [
      { 
        id: "plasmage", 
        title: "Plasmage", 
        quantity: 1,
        image: "/images/services/plasmage/plasmage-estetski-studio-visage-sisak.jpg",
        shortDescription: "Napredna terapija"
      },
      { 
        id: "dermalni-fileri", 
        title: "Dermalni Fileri", 
        quantity: 1,
        image: "/images/services/dermalni-fileri/dermalni-fileri-visage-estetski-studio-sisak.webp",
        shortDescription: "Volumizacija"
      },
      { 
        id: "kemijski-piling", 
        title: "Kemijski Piling", 
        quantity: 1,
        image: "/images/services/kemijski-piling/toskani-bg.webp",
        shortDescription: "Obnova kože"
      }
    ],
    products: [
      { 
        id: "5", 
        title: "Unique Cream", 
        quantity: 1,
        image: "/images/products/toskaniUniqueCream.webp"
      }
    ],
    benefits: [
      "Kompletna transformacija kože",
      "Maksimalna hidratacija i regeneracija",
      "Dugotrajni rezultati",
      "Personalizirani pristup"
    ],
    isPopular: true,
    isLimited: true
  }
]; 