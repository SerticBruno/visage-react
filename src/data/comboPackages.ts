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
        id: "kemijski-piling", 
        title: "Kemijski Piling", 
        quantity: 1,
        image: "/images/services/kemijski-piling/tretman-kemijski-piling.webp"
      },
      { 
        id: "prp", 
        title: "PRP", 
        quantity: 1,
        image: "/images/services/plasmage-hero.webp"
      },
      { 
        id: "skin-boosteri", 
        title: "Skin Boosteri", 
        quantity: 1,
        image: "/images/services/TKNHA3_.webp"
      }
    ],
    products: [
      { 
        id: "purifying-cleanser", 
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
  // {
  //   id: "anti-age-combo",
  //   title: "Anti-Age Combo",
  //   description: "Napredni paket za mladolik izgled",
  //   image: "/images/services/toskani-woman.webp",
  //   price: "680 EUR",
  //   oldPrice: "780 EUR",
  //   services: [
  //     { 
  //       id: "kemijski-piling", 
  //       title: "Kemijski Piling", 
  //       quantity: 2,
  //       image: "/images/services/kemijski-piling/toskani-peelings.webp",
  //       shortDescription: "Obnova kože"
  //     },
  //     { 
  //       id: "mezoterapija", 
  //       title: "Mezoterapija", 
  //       quantity: 2,
  //       image: "/images/services/Mesoterapia-transdermica-facial.webp",
  //       shortDescription: "Dubinska hidratacija"
  //     },
  //     { 
  //       id: "skin-booster-profhilo", 
  //       title: "Profhilo", 
  //       quantity: 1,
  //       image: "/images/services/toskani-woman.webp",
  //       shortDescription: "Napredna hidratacija"
  //     }
  //   ],
  //   benefits: [
  //     "Dubinska regeneracija kože",
  //     "Poboljšana elastičnost",
  //     "Smanjenje bora",
  //     "Svježiji i mladolikiji izgled"
  //   ],
  //   isLimited: true
  // }
]; 