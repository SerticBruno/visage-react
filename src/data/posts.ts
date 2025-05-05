import { BlogPost } from './types';

const formatDate = (date: Date): string => {
  const months = {
    '01': 'siječnja',
    '02': 'veljače',
    '03': 'ožujka',
    '04': 'travnja',
    '05': 'svibnja',
    '06': 'lipnja',
    '07': 'srpnja',
    '08': 'kolovoza',
    '09': 'rujna',
    '10': 'listopada',
    '11': 'studenog',
    '12': 'prosinca'
  };

  const day = date.getDate();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}. ${months[month as keyof typeof months]} ${year}.`;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Plazma terapija - revolucionarna metoda za mladolik izgled',
    slug: 'plazma-terapija',
    excerpt: 'Otkrijte kako plazma terapija može pomoći u redukciji bora, liftingu kože i poboljšanju tonusa kože bez invazivnih zahvata.',
    content: [
      {
        type: 'heading',
        level: 1,
        text: 'Plazma terapija - revolucionarna metoda za mladolik izgled'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Plazma terapija je ' },
          { type: 'text', text: 'revolucionarna metoda', style: 'bold' },
          { type: 'text', text: ' u estetskoj medicini koja koristi prirodnu plazmu vaše krvi za stimulaciju regeneracije kože. Ova neinvazivna tehnika je postala izuzetno popularna zahvaljujući svojoj učinkovitosti i minimalnom vremenu oporavka.' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/plasmage-hero.webp',
        alt: 'Plazma terapija tretman',
        caption: 'Plazma terapija - siguran i učinkovit tretman za mladolik izgled'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Prednosti plazma terapije'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Plazma terapija nudi brojne prednosti u odnosu na tradicionalne metode:' },
          { type: 'text', text: '\n\n• ' },
          { type: 'text', text: 'Prirodna regeneracija kože', style: 'bold' },
          { type: 'text', text: ' - koristi vlastite faktore rasta iz krvi' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Minimalno vrijeme oporavka', style: 'bold' },
          { type: 'text', text: ' - većina klijenata se može vratiti normalnim aktivnostima isti dan' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Dugotrajni rezultati', style: 'bold' },
          { type: 'text', text: ' - rezultati se postupno poboljšavaju tijekom nekoliko tjedana' }
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'Kako radi plazma terapija?'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Tijekom tretmana, mala količina vaše krvi se uzima i centrifugira kako bi se izdvojila ' },
          { type: 'text', text: 'plazma bogata trombocitima (PRP)', style: 'bold' },
          { type: 'text', text: '. Ova plazma sadrži koncentrirane faktore rasta koji se zatim injiciraju u kožu, stimulirajući prirodni proces regeneracije. Za više informacija o ' },
          { type: 'link', text: 'PRP tretmanima', href: '/usluge/prp-terapija' },
          { type: 'text', text: ', posjetite našu stranicu s uslugama.' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/MYV_selfie_details.webp',
        alt: 'Rezultati plazma terapije',
        caption: 'Vidljivi rezultati nakon serije tretmana plazma terapije'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Tko je idealan kandidat?'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Plazma terapija je idealna za osobe koje žele:' },
          { type: 'text', text: '\n\n• ' },
          { type: 'text', text: 'Poboljšati tonus i teksturu kože', style: 'bold' },
          { type: 'text', text: ' - za mladolik i zdrav izgled' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Smanjiti fine linije i bore', style: 'bold' },
          { type: 'text', text: ' - prirodna alternativa botoksu' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Poboljšati kvalitetu ožiljaka', style: 'bold' },
          { type: 'text', text: ' - učinkovito rješenje za stare i nove ožiljke' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Postići prirodan lifting bez operacije', style: 'bold' },
          { type: 'text', text: ' - sigurna alternativa kirurškim zahvatima' }
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'Očekivani rezultati'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Nakon serije tretmana, možete očekivati:' },
          { type: 'text', text: '\n\n• ' },
          { type: 'text', text: 'Poboljšanu teksturu i tonus kože', style: 'bold' },
          { type: 'text', text: ' - glatka i sjajna koža' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Smanjenje fine linija i bora', style: 'bold' },
          { type: 'text', text: ' - prirodno podmlađivanje' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Prirodan lifting i volumizaciju', style: 'bold' },
          { type: 'text', text: ' - obnavljanje volumena' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Poboljšanu hidrataciju i sjaj kože', style: 'bold' },
          { type: 'text', text: ' - zdrava i svježa koža' }
        ]
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Za najbolje rezultate, preporučujemo seriju od ' },
          { type: 'text', text: '3-4 tretmana', style: 'bold' },
          { type: 'text', text: ' u razmaku od ' },
          { type: 'text', text: '4-6 tjedana', style: 'bold' },
          { type: 'text', text: '. Rezultati su kumulativni i traju do ' },
          { type: 'text', text: '12-18 mjeseci', style: 'bold' },
          { type: 'text', text: '. Za više informacija o ' },
          { type: 'link', text: 'cijenama i rasporedu tretmana', href: '/cjenik' },
          { type: 'text', text: ', kontaktirajte nas ili posjetite našu stranicu s cjenikom.' }
        ]
      }
    ],
    date: new Date('2024-03-15'),
    author: 'dr. Ana Horvat',
    tags: ['Plazma terapija', 'Anti-aging', 'Estetska medicina'],
    image: '/images/services/MYV_selfie_details.webp'
  },
  {
    id: 2,
    title: 'Savršene obrve i trepavice - ključ za izražajni pogled',
    slug: 'obrve-trepavice',
    excerpt: 'Saznajte kako postići savršene obrve i trepavice koje će vašem licu dati izražajnost i mladolik izgled.',
    content: [
      {
        type: 'heading',
        level: 1,
        text: 'Savršene obrve i trepavice - ključ za izražajni pogled'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Obrve i trepavice igraju ključnu ulogu u izgledu našeg lica. Dobro oblikovane obrve mogu potpuno promijeniti izraz lica, dok duge i guste trepavice daju očima izražajnost i mladolik izgled.' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/obrve-i-trepavice.webp',
        alt: 'Tretman obrva',
        caption: 'Profesionalni tretman obrva za savršen izgled'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Naše usluge'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'U našem salonu nudimo širok spektar tretmana:' },
          { type: 'text', text: '\n\n• ' },
          { type: 'text', text: 'Laminacija obrva', style: 'bold' },
          { type: 'text', text: ' - dugotrajno oblikovanje i volumizacija' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Tintiranje trepavica', style: 'bold' },
          { type: 'text', text: ' - intenzivniji i izražajniji pogled' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Lifting trepavica', style: 'bold' },
          { type: 'text', text: ' - prirodno podizanje i volumizacija' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Mikroblading', style: 'bold' },
          { type: 'text', text: ' - polutrajno oblikovanje obrva' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/botox-face-girl.webp',
        alt: 'Tretman trepavica',
        caption: 'Tretman trepavica za izražajniji pogled'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Prednosti naših tretmana'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Svaki tretman je prilagođen individualnim potrebama klijenta:' },
          { type: 'text', text: '\n\n• Prirodan izgled' },
          { type: 'text', text: '\n• Dugotrajni rezultati' },
          { type: 'text', text: '\n• Minimalno vrijeme oporavka' },
          { type: 'text', text: '\n• Profesionalna primjena' }
        ]
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Naši stručnjaci će vam pomoći odabrati najbolji tretman za vaše potrebe i želje, osiguravajući prirodan i dugotrajan rezultat.' }
        ]
      }
    ],
    date: new Date('2024-03-20'),
    author: 'Maja Kovač',
    tags: ['Obrve', 'Trepavice', 'Laminacija'],
    image: '/images/services/obrve-i-trepavice.webp'
  },
  {
    id: 3,
    title: 'Toskani - vrhunski proizvodi za njegu kože',
    slug: 'toskani-proizvodi',
    excerpt: 'Upoznajte Toskani proizvode - vrhunsku liniju za njegu kože koja kombinira prirodne sastojke i najnovije tehnologije.',
    content: [
      {
        type: 'heading',
        level: 1,
        text: 'Toskani - vrhunski proizvodi za njegu kože'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Toskani je vodeći proizvođač kozmetičkih proizvoda koji kombiniraju prirodne sastojke s najnovijim tehnologijama. Njihova linija proizvoda je specijalizirana za različite tipove kože i probleme, pružajući rješenja koja su i učinkovita i blaga za kožu.' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/toskani-hero.webp',
        alt: 'Toskani proizvodi',
        caption: 'Toskani linija proizvoda za njegu kože'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Prednosti Toskani proizvoda'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Toskani proizvodi se ističu svojim jedinstvenim svojstvima:' },
          { type: 'text', text: '\n\n• ' },
          { type: 'text', text: 'Prirodni sastojci', style: 'bold' },
          { type: 'text', text: ' - visokokvalitetni ekstrakti iz prirode' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Dokazana učinkovitost', style: 'bold' },
          { type: 'text', text: ' - rezultati potvrđeni kliničkim istraživanjima' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Visoka kvaliteta', style: 'bold' },
          { type: 'text', text: ' - proizvedeno u Italiji po najvišim standardima' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Prilagodljivost', style: 'bold' },
          { type: 'text', text: ' - odgovara svim tipovima kože' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/toskani-woman.webp',
        alt: 'Toskani tretman',
        caption: 'Profesionalni tretman s Toskani proizvodima'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Naše Toskani usluge'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'U našem salonu možete pronaći:' },
          { type: 'text', text: '\n\n• Profesionalne tretmane s Toskani proizvodima' },
          { type: 'text', text: '\n• Individualne savjete za kućnu njegu' },
          { type: 'text', text: '\n• Kompletne linije proizvoda' },
          { type: 'text', text: '\n• Redovne promocije i posebne ponude' }
        ]
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Naši stručnjaci će vam pomoći odabrati najbolje Toskani proizvode za vašu kožu i naučiti vas kako ih pravilno koristiti za optimalne rezultate.' }
        ]
      }
    ],
    date: new Date('2024-03-25'),
    author: 'Ivana Petrović',
    tags: ['Toskani', 'Njega kože', 'Kozmetika'],
    image: '/images/services/toskani-hero.webp'
  },
  {
    id: 4,
    title: 'Mesoterapija - prirodna metoda za hidrataciju kože',
    slug: 'mesoterapija',
    excerpt: 'Otkrijte prednosti mesoterapije - prirodne metode za dubinsku hidrataciju i regeneraciju kože.',
    content: [
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Mesoterapija je minimalno invazivna metoda koja uključuje injekciju prirodnih sastojaka direktno u srednji sloj kože. Ova tehnika omogućuje direktnu dostavu aktivnih sastojaka u područje koje zahtijeva tretman.' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/Mesoterapia-transdermica-facial.webp',
        alt: 'Mesoterapija tretman',
        caption: 'Profesionalni tretman mesoterapije'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Prednosti mesoterapije:' },
          { type: 'text', text: '\n- Dubinska hidratacija' },
          { type: 'text', text: '\n- Stimulacija proizvodnje kolagena' },
          { type: 'text', text: '\n- Poboljšanje tonusa kože' },
          { type: 'text', text: '\n- Smanjenje finih linija' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/TKNHA3_.webp',
        alt: 'Rezultati mesoterapije',
        caption: 'Vidljivi rezultati nakon tretmana'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Tretman je prilagođen individualnim potrebama kože i može se kombinirati s drugim tretmanima za optimalne rezultate.' }
        ]
      }
    ],
    date: new Date('2024-05-07'),
    author: 'Dr. Petra Novak',
    tags: ['Mesoterapija', 'Hidratacija', 'Anti-aging'],
    image: '/images/services/Mesoterapia-transdermica-facial.webp'
  },
  {
    id: 5,
    title: 'Profesionalna njega ruku i noktiju',
    slug: 'njega-ruku',
    excerpt: 'Saznajte kako održavati ruke i nokte u savršenom stanju uz pomoć profesionalnih tretmana.',
    content: [
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Ruke su jedna od prvih stvari koje drugi primjećuju, a dobro održavani nokti su znak brige o sebi. U našem salonu nudimo širok spektar tretmana za njegu ruku i noktiju.' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/manikura.webp',
        alt: 'Profesionalna manikura',
        caption: 'Profesionalni tretman manikure'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Naše usluge uključuju:' },
          { type: 'text', text: '\n- Profesionalnu manikuru' },
          { type: 'text', text: '\n- Gel lak' },
          { type: 'text', text: '\n- Rekonstrukciju noktiju' },
          { type: 'text', text: '\n- Njegu kože ruku' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/socialmedia_peelings_combined.webp',
        alt: 'Tretman ruku',
        caption: 'Specijalni tretmani za njegu ruku'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Svaki tretman je prilagođen vašim potrebama i željama, a koristimo samo najkvalitetnije proizvode za postizanje najboljih rezultata.' }
        ]
      }
    ],
    date: new Date('2024-05-09'),
    author: 'Lara Horvat',
    tags: ['Manikura', 'Njega ruku', 'Nokti'],
    image: '/images/services/manikura.webp'
  },
  {
    id: 6,
    title: 'Kozmetički tretmani za muškarce',
    slug: 'kozmeticki-tretmani-za-muskarce',
    excerpt: 'Otkrijte kako muškarci mogu održavati zdrav i mladolik izgled uz pomoć profesionalnih kozmetičkih tretmana.',
    content: [
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Kozmetički tretmani nisu samo za žene - sve više muškaraca prepoznaje važnost profesionalne njege kože. U našem salonu nudimo specijalizirane tretmane prilagođene muškoj koži.' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/botox-face-girl.webp',
        alt: 'Kozmetički tretman za muškarce',
        caption: 'Profesionalni tretman za mušku kožu'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Popularni tretmani za muškarce:' },
          { type: 'text', text: '\n- Čišćenje lica' },
          { type: 'text', text: '\n- Anti-aging tretmani' },
          { type: 'text', text: '\n- Njega kože' },
          { type: 'text', text: '\n- Tretmani protiv akni' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/MYV_selfie_details.webp',
        alt: 'Rezultati tretmana',
        caption: 'Vidljivi rezultati nakon tretmana'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Naši tretmani su prilagođeni specifičnim potrebama muške kože, koja se razlikuje od ženske po debljini, sadržaju ulja i brzini starenja.' }
        ]
      }
    ],
    date: new Date('2024-05-11'),
    author: 'Dr. Marko Kovač',
    tags: ['Muška njega', 'Kozmetika', 'Anti-aging'],
    image: '/images/services/botox-face-girl.webp'
  },
  {
    id: 7,
    title: 'Prirodna njega kože - najbolji sastojci za svaki tip kože',
    slug: 'prirodna-njega-koze',
    excerpt: 'Otkrijte prirodne sastojke koji će vašoj koži dati sve što joj treba za zdrav i mladolik izgled.',
    content: [
      {
        type: 'heading',
        level: 1,
        text: 'Prirodna njega kože - najbolji sastojci za svaki tip kože'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Prirodna njega kože postaje sve popularnija, a s razlogom. Prirodni sastojci su blagi, učinkoviti i često sadrže aktivne tvari koje koža lako apsorbira.' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/toskani-woman.webp',
        alt: 'Prirodna njega kože',
        caption: 'Prirodni sastojci za njegu kože'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Najbolji prirodni sastojci'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Evo nekoliko prirodnih sastojaka koji su posebno korisni za kožu:' },
          { type: 'text', text: '\n\n• ' },
          { type: 'text', text: 'Aloe vera', style: 'bold' },
          { type: 'text', text: ' - odlična za hidrataciju i smirivanje' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Čajno drvo', style: 'bold' },
          { type: 'text', text: ' - prirodni antiseptik za problematičnu kožu' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Kokosovo ulje', style: 'bold' },
          { type: 'text', text: ' - bogato srednjelančanim masnim kiselinama' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Med', style: 'bold' },
          { type: 'text', text: ' - prirodni humektant s antibakterijskim svojstvima' }
        ]
      }
    ],
    date: new Date('2024-05-15'),
    author: 'Ivana Petrović',
    tags: ['Prirodna njega', 'Kozmetika', 'Njega kože'],
    image: '/images/services/toskani-woman.webp'
  },
  {
    id: 8,
    title: 'Zimski tretmani za kožu - kako održati kožu zdravom tijekom hladnih mjeseci',
    slug: 'zimski-tretmani-koze',
    excerpt: 'Saznajte kako pravilno njegovati kožu tijekom zime i spriječiti suhoću i oštećenja.',
    content: [
      {
        type: 'heading',
        level: 1,
        text: 'Zimski tretmani za kožu - kako održati kožu zdravom tijekom hladnih mjeseci'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Zima je posebno zahtjevno doba godine za našu kožu. Hladno vrijeme, suhi zrak u zatvorenim prostorima i promjene temperature mogu dovesti do suhoće, iritacije i oštećenja kože.' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/MYV_selfie_details.webp',
        alt: 'Zimski tretman kože',
        caption: 'Profesionalni zimski tretman kože'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Ključni koraci za zimsku njegu kože'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Za zdravu kožu tijekom zime, preporučujemo sljedeće korake:' },
          { type: 'text', text: '\n\n• ' },
          { type: 'text', text: 'Intenzivna hidratacija', style: 'bold' },
          { type: 'text', text: ' - koristite bogate kreme i serume' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Zaštita od vremenskih uvjeta', style: 'bold' },
          { type: 'text', text: ' - SPF je važan i zimi' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Gentilno čišćenje', style: 'bold' },
          { type: 'text', text: ' - izbjegavajte agresivne proizvode' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Redovni tretmani', style: 'bold' },
          { type: 'text', text: ' - profesionalna njega jednom mjesečno' }
        ]
      }
    ],
    date: new Date('2024-05-20'),
    author: 'Dr. Petra Novak',
    tags: ['Zimska njega', 'Hidratacija', 'Njega kože'],
    image: '/images/services/MYV_selfie_details.webp'
  },
  {
    id: 9,
    title: 'Anti-aging tretmani - kako održati mladolik izgled prirodno',
    slug: 'anti-aging-tretmani',
    excerpt: 'Otkrijte najučinkovitije anti-aging tretmane koji će vam pomoći održati mladolik izgled na prirodan način.',
    content: [
      {
        type: 'heading',
        level: 1,
        text: 'Anti-aging tretmani - kako održati mladolik izgled prirodno'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'Anti-aging tretmani su postali sastavni dio moderne kozmetičke njege. Uz pravilnu kombinaciju profesionalnih tretmana i kućne njege, možete postići značajno poboljšanje izgleda kože.' }
        ]
      },
      {
        type: 'image',
        src: '/images/services/botox-face-girl.webp',
        alt: 'Anti-aging tretman',
        caption: 'Profesionalni anti-aging tretman'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Najučinkovitiji anti-aging tretmani'
      },
      {
        type: 'text',
        text: [
          { type: 'text', text: 'U našem salonu nudimo širok spektar anti-aging tretmana:' },
          { type: 'text', text: '\n\n• ' },
          { type: 'text', text: 'Plazma terapija', style: 'bold' },
          { type: 'text', text: ' - prirodna regeneracija kože' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Radiofrekvencija', style: 'bold' },
          { type: 'text', text: ' - lifting i toniziranje kože' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'Mezoterapija', style: 'bold' },
          { type: 'text', text: ' - dubinska hidratacija i regeneracija' },
          { type: 'text', text: '\n• ' },
          { type: 'text', text: 'LED terapija', style: 'bold' },
          { type: 'text', text: ' - stimulacija proizvodnje kolagena' }
        ]
      }
    ],
    date: new Date('2024-05-25'),
    author: 'dr. Ana Horvat',
    tags: ['Anti-aging', 'Estetska medicina', 'Njega kože'],
    image: '/images/services/botox-face-girl.webp'
  }
]; 