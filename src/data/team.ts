import { TeamMember } from '@/components/ui/TeamMemberCard';

export const teamMembers: TeamMember[] = [
  {
    name: 'Tatjana Torinek',
    image: '/images/services/plasmage-hero.webp',
    title: 'dr. spec. med. obiteljske medicine',
    credentials: [
      'dr. spec. med. obiteljske medicine',
      'član HDEM-a'
    ],
    favoriteTreatments: 'mezoterapija egzosomima, skin boosteri i plasmage',
    hasImage: false,
    quote: '"Kombiniram medicinsko znanje s najnovijim estetskim tehnikama kako bih pružila sigurne i učinkovite tretmane."'
  },
  {
    name: 'Mia Torinek',
    image: '/images/services/manikura.webp',
    title: 'mag. oec. smjer marketing',
    credentials: [
      'mag. oec. smjer marketing',
      'kozmetičar'
    ],
    favoriteTreatments: 'PRP, mezoterapija polinukleotidima i skin boosteri',
    hasImage: false,
    quote: '"Posvećena sam pružanju personaliziranih tretmana koji ističu prirodnu ljepotu svakog klijenta."'
  },
  {
    name: 'Helena Torinek',
    image: '/images/services/TKNHA3_.webp',
    title: 'dr. med. vet.',
    credentials: [
      'dr. med. vet.',
      'kozmetičar'
    ],
    favoriteTreatments: 'Kemijski piling, PRP i Plasmage',
    hasImage: false,
    quote: '"Moja strast je pomoći klijentima da postignu najbolju verziju sebe kroz sigurne i učinkovite tretmane."'
  }
];

export const teamDetails = {
  tatjana: 'Tatjana Torinek je diplomirala 1992. godine na Medicinskom fakultetu u Zagrebu, a od tada se bavi obiteljskom medicinom. Završila je specijalizaciju iz Obiteljske medicine i uspješno vodi svoju ambulantu već 18 godina. Estetskom medicinom se počela baviti prije 4 godine te se specijalizirala za obavljanje nekirurških estetskih tretmana. Prošla je brojne edukacije i tečajeve te redovito prisustvuje kongresima i predavanjima iz estetske medicine.',
  mia: 'Mia Torinek je diplomirala marketing na Ekonomskom fakultetu u Zagrebu. Osnovala je Visage studio 2023. godine skupa s majkom Tatjanom. 2024. godine je završila prekvalifikaciju za kozmetičara te se specijalizira za obavljanje neinvazivnih estetskih tretmana. Redovito odlazi na edukacije, tečajeve, radionice i kongrese iz estetske medicine te je uvijek u toku s trendovima.',
  helena: 'Helena Torinek je završila veterinu u Zagrebu. S medicinskim obrazovanjem i strasti prema estetskoj medicini, specijalizirala se za obavljanje neinvazivnih estetskih tretmana. Redovito odlazi na edukacije, tečajeve, radionice i kongrese iz estetske medicine te je uvijek u toku s najnovijim trendovima i tehnikama. Posvećena je pružanju sigurnih i učinkovitih tretmana, kombinirajući svoje medicinsko znanje s najmodernijim estetskim pristupima.'
};

export const teamDetailsSection = {
  image: {
    src: '/images/services/TKNHA3_.webp',
    alt: 'VISAGE Studio team'
  },
  details: [
    teamDetails.tatjana,
    teamDetails.mia,
    teamDetails.helena
  ],
  hasGroupPhoto: false,
  groupQuote: '"Naš tim radi zajedno kako bismo vam pružili najkvalitetnije estetske usluge s fokusom na vašu sigurnost i zadovoljstvo."'
}; 