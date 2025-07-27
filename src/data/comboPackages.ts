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
        title: "Y zona 5 mezoterapija otapanja i zatezanja podbratka i vrata", 
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
    price: "735 EUR",
    oldPrice: "865 EUR",
    services: [
      { 
        id: "prp", 
        title: "2 PRP tretmana", 
        image: "/images/services/prp/prp-tijek-zahvata-visage-estetski-studio.png"
      },
      { 
        id: "mezoterapija", 
        title: "5 tretmana mezoterapije vlasišta velike zone", 
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
        title: "Dermalni Filer 1 ml", 
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
    id: "ultimate-glow-up-combo",
    title: "Ultimate Glow Up",
    description: "Ciljani tretmani za osvježenje lica i vrata",
    image: "/images/services/woman-face-visage-estetski-studio.webp",
    price: "885 EUR",
    oldPrice: "1055 EUR",
    services: [
      { 
        id: "foto-terapija", 
        title: "LED Fototerapija 4 tretmana", 
        image: "/images/services/dermalux/dermalux-priprema-visage-estetski-studio.png"
      },
      { 
        id: "mezoterapija", 
        title: "Mezoterapija lica i vrata 4 tretmana", 
        image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg"
      },
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
    price: "830 EUR",
    oldPrice: "980 EUR",
    services: [
      { 
        id: "foto-terapija", 
        title: "2 LED Fototerapija", 
        image: "/images/services/dermalux/dermalux-visage-estetski-studio.png"
      },
      { 
        id: "prp", 
        title: "2 PRP tretmana", 
        image: "/images/services/prp/prp-tijek-zahvata-visage-estetski-studio.png"
      },
      { 
        id: "skin-boosteri", 
        title: "Skin Booster TKN HA3 2 tretmana", 
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
    price: "920 EUR",
    oldPrice: "1123 EUR",
    services: [
      { 
        id: "mezoterapija-dermapen", 
        title: "Mezoterapija dermapenom 4 tretmana", 
        image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg",
        linkId: "mezoterapija"
      },
      { 
        id: "foto-terapija", 
        title: "Fototerapija 5 tretmana", 
        image: "/images/services/dermalux/dermalux-visage-estetski-studio.png"
      },
      { 
        id: "mezoterapija-y-zona", 
        title: "Y zona 5 tretmana", 
        image: "/images/services/mezoterapija/mezoterapija-prednosti-visage-estetski-studio.png",
        linkId: "mezoterapija"
      }
    ],
    products: [
      {
        id: "total-recovery-gel",
        title: "Total Recovery Gel",
        image: "/images/products/total-recovery-gel-visage-estetski-studio.webp"
      },
      {
        id: "sun-shield-fluid",
        title: "Sun Shiel-D Fluid",
        image: "/images/products/sun-shiel-d-fluid-spf50-visage-estetski-studio.png"
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
    id: "mesosynergy-combo",
    title: "Mesosynergy",
    description: "Biostimulirajući tretman koji povezuje sve elemente mezoterapije",
    image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg",
    price: "485 EUR",
    oldPrice: "570 EUR",
    services: [
      { 
        id: "mezoterapija", 
        title: "Mezoterapija lica", 
        image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.png"
      },
      { 
        id: "skin-boosteri", 
        title: "Skin Booster TKN HA3", 
        image: "/images/services/skin-boosters/skin-boosteri-prednosti-visage-estetski-studio.png"
      },
      { 
        id: "kemijski-piling", 
        title: "Duosomal kemijski piling", 
        image: "/images/services/kemijski-piling/kemijski-piling-priprema-estetski-studio-sisak.jpg"
      }
    ],
    products: [
      {
        id: "toskani-pro-age",
        title: "Odgovarajući serum i krema iz Toskani Pro Age linije",
        image: "/images/products/toskani-products.webp"
      }
    ],
    benefits: [
      "Poboljšana kvaliteta kože",
      "Poboljšana čvrstoća kože",
      "Manje vidljive bore",
      "Usporen proces starenja",
      "Glatka i nježna koža na dodir"
    ],
    isPopular: true,
    isLimited: true
  },
  {
    id: "profhilo-perfect-combo",
    title: "Profhilo Perfect",
    description: "Vratite sjaj i čvrstoću koži uz kombinaciju kemijskog pilinga, mezoterapije i bioremodulatora",
    image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg",
    price: "855 EUR",
    oldPrice: "1009 EUR",
    services: [
      { 
        id: "mezoterapija", 
        title: "2 tretmana mezoterapije lica", 
        image: "/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg"
      },
      { 
        id: "kemijski-piling", 
        title: "2 duosomal kemijska pilinga", 
        image: "/images/services/kemijski-piling/kemijski-piling-priprema-estetski-studio-sisak.jpg"
      },
      { 
        id: "skin-boosteri", 
        title: "2 Profhilo tretmana", 
        image: "/images/services/skin-boosters/skin-boosteri-oporavak-visage-estetski-studio.png"
      }
    ],
    products: [
      {
        id: "profhilo-cream",
        title: "Krema Profhilo",
        image: "/images/products/profhilo-haenkenium-cream-cover-visage-estetski-studio.webp"
      }
    ],
    benefits: [
      "Cjeloviti anti-age pristup",
      "Obnova kože iznutra i izvana",
      "Dugotrajna hidratacija i sjaj",
      "Vidljivo ujednačen i pomlađen ten",
      "Idealno za umornu, dehidriranu i zrelu kožu"
    ],
    isPopular: true,
    isLimited: true
  },
  {
    id: "eye-refresh-combo",
    title: "Eye Refresh",
    description: "Otvoren i osvježen pogled bez skalpela",
    image: "/images/services/plasmage/plasmage-estetski-studio-visage-sisak.jpg",
    price: "780 EUR",
    oldPrice: "918 EUR",
    services: [
      { 
        id: "plasmage", 
        title: "Plasmage donjeg ili gornjeg kapka", 
        image: "/images/services/plasmage/plasmage-estetski-studio-visage-sisak.jpg"
      },
      { 
        id: "botox", 
        title: "Botox 50 jedinica", 
        image: "/images/services/botox/botox-visage-estetski-studio.webp"
      }
    ],
    products: [
      {
        id: "total-recovery-gel",
        title: "Total Recovery Gel",
        image: "/images/products/total-recovery-gel-visage-estetski-studio.webp"
      },
      {
        id: "sun-shield-fluid",
        title: "Sun Shiel-D Fluid",
        image: "/images/products/sun-shiel-d-fluid-spf50-visage-estetski-studio.png"
      },
      {
        id: "okolocna-njega",
        title: "Okoloočna njega (Anti-Aging ili Radiance)",
        image: "/images/products/radiance-eye-contour-visage-estetski-studio.webp"
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
    id: "radiant-skin-combo",
    title: "Radiant Skin",
    description: "Reset kože, piling, obnova i zaštita u jednom tretmanu",
    image: "/images/services/woman-face-visage-estetski-studio.webp",
    price: "545 EUR",
    oldPrice: "642 EUR",
    services: [
      { 
        id: "kemijski-piling", 
        title: "2 duosomal kemijska pilinga", 
        image: "/images/services/kemijski-piling/kemijski-piling-priprema-estetski-studio-sisak.jpg"
      },
      { 
        id: "prp", 
        title: "2 PRP tretmana", 
        image: "/images/services/prp/prp-tijek-zahvata-visage-estetski-studio.png"
      }
    ],
    products: [
      {
        id: "total-recovery-gel",
        title: "Total Recovery Gel",
        image: "/images/products/total-recovery-gel-visage-estetski-studio.webp"
      }
    ],
    benefits: [
      "uklanja mrtve stanice s površine kože",
      "pruža bolju propusnost kože",
      "pomaže u poboljšanju tonusa kože",
      "poboljšava teksturu kože",
      "potiče stvaranje kolagena i elastina",
      "koristi vlastite biološke resurse minimizirajući rizik od alergijske reakcije"
    ],
    isPopular: true,
    isLimited: true
  },
  {
    id: "eye-lift-combo",
    title: "Eye Lift",
    description: "Osvježenje i podizanje okoloočnih bora",
    image: "/images/services/plasmage/plasmage-estetski-studio-visage-sisak.jpg",
    price: "420 EUR",
    oldPrice: "498 EUR",
    services: [
      { 
        id: "botox", 
        title: "Botox 50 jedinica", 
        image: "/images/services/botox-treatment-visage-estetski-studio.webp"
      },
      { 
        id: "plasmage", 
        title: "Plasmage okoloočnih bora", 
        image: "/images/services/plasmage-hero-visage-estetski-studio.webp"
      }
    ],
    products: [
      {
        id: "total-recovery-gel",
        title: "Total Recovery Gel",
        image: "/images/products/total-recovery-gel-visage-estetski-studio.webp"
      },
      {
        id: "okolocna-njega",
        title: "Okoloočna njega (Anti-Aging ili Radiance)",
        image: "/images/products/radiance-eye-contour-visage-estetski-studio.webp"
      },
      {
        id: "sun-shield-fluid",
        title: "Sun Shiel-D Fluid",
        image: "/images/products/sun-shiel-d-fluid-spf50-visage-estetski-studio.png"
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
        title: "Dermaplaning", 
        image: "/images/services/beauty-tretmani/dermaplaning-visage-estetski-studio-sisak.webp",
        linkId: "beauty-tretmani"
      },
      { 
        id: "foto-terapija", 
        title: "LED Fototerapija", 
        image: "/images/services/dermalux/dermalux-priprema-visage-estetski-studio.png"
      },
      { 
        id: "prp", 
        title: "PRP tretman", 
        image: "/images/services/prp/prp-tijek-zahvata-visage-estetski-studio.png"
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