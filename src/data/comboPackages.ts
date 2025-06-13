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
    image: "/images/services/toskani-woman.webp",
    price: "450 EUR",
    oldPrice: "520 EUR",
    services: [
      { 
        id: "mezoterapija", 
        title: "Mezoterapija", 
        quantity: 1,
        image: "/images/services/Mesoterapia-transdermica-facial.webp",
        shortDescription: "Dubinska hidratacija kože"
      },
      { 
        id: "mesosynergy", 
        title: "Mesosynergy", 
        quantity: 1,
        image: "/images/services/toskani-woman.webp",
        shortDescription: "Napredni tretman za regeneraciju"
      },
      { 
        id: "skin-booster-tkn-ha3", 
        title: "TKN HA3", 
        quantity: 1,
        image: "/images/services/toskani-woman.webp",
        shortDescription: "Intenzivna hidratacija"
      }
    ],
    products: [
      { 
        id: "sun-shield", 
        title: "Toskani Sun Shiel-D SPF 50+", 
        quantity: 1,
        image: "/images/products/Almond-Oil-12.webp",
        shortDescription: "Zaštita od sunca"
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
    image: "/images/services/toskani-woman.webp",
    price: "680 EUR",
    oldPrice: "780 EUR",
    services: [
      { 
        id: "kemijski-piling", 
        title: "Kemijski Piling", 
        quantity: 2,
        image: "/images/services/kemijski-piling/toskani-peelings.webp",
        shortDescription: "Obnova kože"
      },
      { 
        id: "mezoterapija", 
        title: "Mezoterapija", 
        quantity: 2,
        image: "/images/services/Mesoterapia-transdermica-facial.webp",
        shortDescription: "Dubinska hidratacija"
      },
      { 
        id: "skin-booster-profhilo", 
        title: "Profhilo", 
        quantity: 1,
        image: "/images/services/toskani-woman.webp",
        shortDescription: "Napredna hidratacija"
      }
    ],
    benefits: [
      "Dubinska regeneracija kože",
      "Poboljšana elastičnost",
      "Smanjenje bora",
      "Svježiji i mladolikiji izgled"
    ],
    isLimited: true
  }
]; 