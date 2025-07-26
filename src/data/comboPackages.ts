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
    price: "635 EUR",
    oldPrice: "750 EUR",
    services: [
      { 
        id: "botox", 
        title: "Botox - 50 jedinica", 
        image: "/images/services/botox/botox-visage-estetski-studio.webp"
      },
      { 
        id: "mezoterapija", 
        title: "Y zona 5 mezoterapija otapanja i zatezanja podbratka i vrata", 
        image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg"
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
    image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg",
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
    id: "fresh-up-combo",
    title: "Fresh Up",
    description: "Kombinacija liftinga i prirodnog volumena za brzo osvježenje kože",
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
        title: "Dermalni Filer 1 ml", 
        image: "/images/services/dermalni-fileri/dermalni-fileri-visage-estetski-studio-sisak.webp"
      }
    ],
    benefits: [
      "Osvježava i pomlađuje lice",
      "Suptilan, prirodan rezultat",
      "Smanjuje vidljivost bora i finih linija",
      "Vraća volumen"
    ],
    isPopular: true,
    isLimited: true
  },
  {
    id: "ultimate-glow-up-combo",
    title: "Ultimate Glow Up",
    description: "Ciljani tretmani za osvježenje lica i vrata",
    image: "/images/services/woman-face-visage-estetski-studio.webp",
    price: "885 EUR",
    oldPrice: "1055 EUR",
    services: [
      { 
        id: "botox", 
        title: "Botox - 50 jedinica", 
        image: "/images/services/botox/botox-visage-estetski-studio.webp"
      },
      { 
        id: "mezoterapija", 
        title: "Mezoterapija lica i vrata 4 tretmana", 
        image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg"
      },
      { 
        id: "dermalni-fileri", 
        title: "Dermalni Filer 1 ml", 
        image: "/images/services/dermalni-fileri/dermalni-fileri-visage-estetski-studio-sisak.webp"
      },
      { 
        id: "foto-terapija", 
        title: "LED Fototerapija 4 tretmana", 
        image: "/images/services/dermalux/dermalux-about-visage-estetski-studio.png"
      }
    ],
    benefits: [
      "Potiče proizvodnju kolagena i elastina",
      "Daje volumen licu",
      "Osvježava kožu lica",
      "Poboljšava kvalitetu kože",
      "Umanjuje bore i fine linije",
      "Savršen za pripremu za važan događaj"
    ],
    isPopular: true,
    isLimited: true
  },
  {
    id: "skin-revive-combo",
    title: "Skin Revive",
    description: "Regeneracija kože na staničnoj razini",
    image: "/images/services/skin-boosters-hero-visage-estetski-studio.webp",
    price: "825 EUR",
    oldPrice: "980 EUR",
    services: [
      { 
        id: "skin-boosteri", 
        title: "Skin Booster TKN HA3 2 tretmana", 
        image: "/images/services/skin-boosters/skin-booster-visage-estetski-studio-sisak.jpeg"
      },
      { 
        id: "prp", 
        title: "2 PRP tretmana", 
        image: "/images/services/prp/prp-prednosti-estetski-studio-sisak.jpeg"
      },
      { 
        id: "foto-terapija", 
        title: "2 LED Fototerapija", 
        image: "/images/services/dermalux/dermalux-about-visage-estetski-studio.png"
      }
    ],
    benefits: [
      "Idealno za umornu, dehidriranu i oštećenu kožu",
      "Potiče stvaranje kolagena i elastina",
      "Vraća hidrataciju i elastičnost koži",
      "Potiče samostalnu regeneraciju kože",
      "Poboljšava teksturu kože"
    ],
    isPopular: true,
    isLimited: true
  }
]; 