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
    quantity?: number;
    image: string;
    shortDescription?: string;
  }[];
  products?: {
    id: string;
    title: string;
    quantity?: number;
    image: string;
    shortDescription?: string;
  }[];
  benefits: string[];
  isPopular?: boolean;
  isLimited?: boolean;
}

export const comboPackages: ComboPackage[] = [
  {
    id: "neck-refine-combo",
    title: "Neck Refine",
    description: "Elegantna definicija linije čeljusti i svjež izgled vrata",
    image: "/images/services/woman-face-visage-estetski-studio.webp",
    price: "445 EUR",
    oldPrice: "525 EUR",
    services: [
      { 
        id: "botox", 
        title: "Botox - 50 jedinica", 
        image: "/images/services/botox/botox-visage-estetski-studio.webp"
      },
      { 
        id: "dermalni-fileri", 
        title: "Dermalni Fileri 1 ml", 
        image: "/images/services/dermalni-fileri/dermalni-fileri-visage-estetski-studio-sisak.webp"
      }
    ],
    benefits: [
      "Zateže kožu vrata i podbratka",
      "Umanjuje bore i fine linije",
      "Vizualno podiže donji dio lica",
      "Uklanja višak kože",
      "Poboljšava čvrstoću kože"
    ],
    isPopular: true,
    isLimited: true
  },
  {
    id: "hair-boost-combo",
    title: "Hair Boost",
    description: "Intenzivan tretman za poticanje rasta kose i jačanje vlasišta",
    image: "/images/products/anti-hair-loss-background.webp",
    price: "690 EUR",
    oldPrice: "810 EUR",
    services: [
      { 
        id: "mezoterapija", 
        title: "5 tretmana mezoterapije vlasišta velike zone", 
        image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg"
      },
      { 
        id: "prp", 
        title: "2 PRP tretmana", 
        image: "/images/services/prp/prp-prednosti-estetski-studio-sisak.jpeg"
      }
    ],
    benefits: [
      "Poboljšava kvalitetu vlasišta",
      "Potiče rast kose",
      "Jača kosu i vlasište",
      "Smanjuje ispadanje kose",
      "Idealno za tanku, prorjeđenu kosu"
    ],
    isPopular: true,
    isLimited: true
  },
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
        image: "/images/products/purifying-cleanser-visage-estetski-studio.webp"
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
        id: "20", 
        title: "Retin Pro Age Cream", 
        quantity: 1,
        image: "/images/products/toskani-retin-pro-age-estetski-studio-visage-sisak.png"
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
        id: "22", 
        title: "Unique Pro Age Cream", 
        quantity: 1,
        image: "/images/products/toskani-unique-pro-age-cream-visage-estetski-studio.png"
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