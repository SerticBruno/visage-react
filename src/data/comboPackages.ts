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
    linkId?: string;
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
        id: "mezoterapija", 
        title: "Mezoterapija otapanja i zatezanja podbratka i vrata Dermapenom 4 - 5 tretmana", 
        image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg"
      },
      { 
        id: "botox", 
        title: "Botox - 50 jedinica", 
        image: "/images/services/botox/botox-visage-estetski-studio.webp"
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
    price: "784 EUR",
    oldPrice: "905 EUR",
    services: [
      { 
        id: "prp", 
        title: "PRP - 2 tretmana", 
        image: "/images/services/prp/prp-tijek-zahvata-visage-estetski-studio.png"
      },
      { 
        id: "mezoterapija", 
        title: "Mezoterapija vlasišta velike zone Dermapenom 4 - 5 tretmana", 
        image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.png"
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
        id: "dermalni-fileri", 
        title: "Dermalni filer - 1 ml", 
        image: "/images/services/dermalni-fileri/dermalni-fileri-visage-estetski-studio-sisak.webp"
      },
      { 
        id: "botox", 
        title: "Botox - 50 jedinica", 
        image: "/images/services/botox-treatment-visage-estetski-studio.webp"
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
    id: "skin-revive-combo",
    title: "Skin Revive",
    description: "Regeneracija kože na staničnoj razini",
    image: "/images/services/skin-boosters-hero-visage-estetski-studio.webp",
    price: "926 EUR",
    oldPrice: "1090 EUR",
    services: [
      { 
        id: "foto-terapija", 
        title: "LED fototerapija - 2 tretmana", 
        image: "/images/services/dermalux/dermalux-visage-estetski-studio.png"
      },
      { 
        id: "prp", 
        title: "PRP - 2 tretmana", 
        image: "/images/services/prp/prp-tijek-zahvata-visage-estetski-studio.png"
      },
      { 
        id: "skin-boosteri", 
        title: "Skin booster TKN HA3 - 2 tretmana", 
        image: "/images/services/skin-boosters/skin-booster-nakon-tretmana-visage-estetski-studio-sisak.jpeg"
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
  },
  {
    id: "glow-define-combo",
    title: "Glow & Define",
    description: "Ciljani tretmani za svježinu i definiciju donjeg dijela lica",
    image: "/images/services/woman-face-visage-estetski-studio.webp",
    price: "930 EUR",
    oldPrice: "1095 EUR",
    services: [
      { 
        id: "mezoterapija-dermapen", 
        title: "Mezoterapija lica Dermapenom 4 - 4 tretmana", 
        image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg",
        linkId: "mezoterapija"
      },
      { 
        id: "foto-terapija", 
        title: "LED fototerapija - 5 tretmana", 
        image: "/images/services/dermalux/dermalux-visage-estetski-studio.png"
      },
      { 
        id: "mezoterapija-y-zona", 
        title: "Mezoterapija otapanja i zatezanja podbratka i vrata Dermapenom 4 - 5 tretmana", 
        image: "/images/services/mezoterapija/mezoterapija-prednosti-visage-estetski-studio.png",
        linkId: "mezoterapija"
      }
    ],
    benefits: [
      "Dubinska hidratacija",
      "Zatezanje kože vrata i podbratka",
      "Uklanjanje viška kože",
      "Zatezanje kože lica",
      "Poticanje proizvodnje kolagena i elastina"
    ],
    isPopular: true,
    isLimited: true
  },
  {
    id: "eye-refresh-combo",
    title: "Eye Refresh",
    description: "Otvoren i osvježen pogled bez skalpela",
    image: "/images/services/plasmage/plasmage-estetski-studio-visage-sisak.jpg",
    price: "720 EUR",
    oldPrice: "845 EUR",
    services: [
      { 
        id: "plasmage", 
        title: "Nekirurško podizanje gornjeg ili donjeg kapka - 1 tretman", 
        image: "/images/services/plasmage/plasmage-estetski-studio-visage-sisak.jpg"
      },
      { 
        id: "botox", 
        title: "Botox 50 jedinica", 
        image: "/images/services/botox/botox-visage-estetski-studio.webp"
      }
    ],
    benefits: [
      "Nekirurško podizanje kapka",
      "Uklanjanje viška kože",
      "Smanjuju se fine linije i opuštenost",
      "Smanjuje se vidljivost bora",
      "Kućna njega za bržu regeneraciju kože i dugotrajan rezultat"
    ],
    isPopular: true,
    isLimited: true
  },
  {
    id: "eye-lift-combo",
    title: "Eye Lift",
    description: "Osvježenje i podizanje okoloočnih bora",
    image: "/images/services/plasmage/plasmage-estetski-studio-visage-sisak.jpg",
    price: "435 EUR",
    oldPrice: "510 EUR",
    services: [
      { 
        id: "plasmage", 
        title: "Tretman uklanjanja okoloočnih bora Plasmageom - 1 tretman", 
        image: "/images/services/plasmage-hero-visage-estetski-studio.webp"
      },
      { 
        id: "botox", 
        title: "Botox 50 jedinica", 
        image: "/images/services/botox-treatment-visage-estetski-studio.webp"
      }
    ],
    benefits: [
      "Nekirurško podizanje okoloočnih bora",
      "Uklanjanje viška kože",
      "Smanjuje fine linije i opuštenost",
      "Smanjuje vidljivost bora",
      "Kućna njega za bržu regeneraciju kože"
    ],
    isPopular: true,
    isLimited: true
  },
  {
    id: "lumifusion-combo",
    title: "LumiFusion",
    description: "Zaboravi na umornu kožu!",
    image: "/images/services/woman-face-visage-estetski-studio.webp",
    price: "300 EUR",
    oldPrice: "350 EUR",
    services: [
      { 
        id: "beauty-tretmani", 
        title: "Dermaplaning - 1 tretman", 
        image: "/images/services/beauty-tretmani/dermaplaning-visage-estetski-studio-sisak.webp",
        linkId: "beauty-tretmani"
      },
      { 
        id: "prp", 
        title: "PRP - 1  tretman", 
        image: "/images/services/prp/prp-tijek-zahvata-visage-estetski-studio.png"
      },
      { 
        id: "foto-terapija", 
        title: "LED fototerapija - 1 tretman", 
        image: "/images/services/dermalux/dermalux-priprema-visage-estetski-studio.png"
      }
    ],
    benefits: [
      "trenutna glatkoća i sjaj",
      "regeneracija iz vlastite plazme",
      "potiče se proizvodnja kolagena i elastina",
      "ujednačen i osvježen ten",
      "poboljšava kvalitetu kože"
    ],
    isPopular: true,
    isLimited: true
  }
]; 