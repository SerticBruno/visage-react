import { Service } from './types';

export const prp: Service = {
  id: 'prp',
  title: 'PRP',
  description: 'Prirodna obnova i revitalizacija kože',
  longDescription: `Bez dodataka, bez kemije, bez rizika, samo <strong>čista snaga regeneracije</strong> iz vlastitih stanica. <strong>PRP tretman</strong> pruža <strong>prirodnu i dugotrajnu revitalizaciju kože</strong>.

<strong>PRP tretman</strong> ili tretman <strong>plazmom bogatom trombocitima</strong> je primjena vlastite krvi plazme koja je bogata <strong>faktorima rasta</strong> i <strong>proteinima</strong> kako bi se potaknula <strong>regeneracija kože</strong>.

<strong>Trombociti</strong> su sastavne stanice naše krvi te sadrže brojne <strong>faktore rasta</strong> koji se oslobađaju nakon aktivacije, a djeluju tako da <strong>stimuliraju matične stanice</strong> i time ubrzavaju proces <strong>cijeljenja i regeneracije tkiva</strong>.

<strong>PRP tretman</strong> je <strong>potpuno prirodan tretman</strong>, jer se koristi <strong>vaša krv</strong>. Ne može izazvati <strong>alergijsku reakciju</strong> i <strong>potpuno je siguran</strong>.

<strong>PRP se može raditi</strong> primjenom <strong>Mesoject guna</strong> i s <strong>mezoterapijskim iglama</strong>.

Koristi se najčešće u <strong>sinergiji s drugim estetskim tretmanima</strong>: <strong>skin boosteri</strong>, <strong>mezoterapija</strong> i <strong>kemijski piling</strong>.

Otkrijte <strong>moć PRP tretmana</strong> i prepustite se <strong>potpunoj revitalizaciji kože</strong> u <strong>Visage studiju</strong>.`,
  benefits: [
  ],
  image: '/images/services/toskani-woman.webp',
  heroImage: '/images/services/mezoterapija/mezoterapija-tijek-zahvata-visage-estetski-studio.webp',
  metaDescription: 'Profesionalna PRP terapija u VISAGE studiju u Siska. Koristite vlastite trombocite za regeneraciju kože. Prirodna i sigurna metoda s vidljivim rezultatima.',
  metaKeywords: 'PRP terapija, regeneracija kože, trombociti, estetski studio Sisak, VISAGE studio, PRP lica, prirodna regeneracija',
  tags: ['prp', 'regeneracija', 'prirodni-tretmani', 'minimalno-invazivni', 'trombociti'],
  pricingCategory: 'PRP',
  relatedServices: ['mezoterapija', 'skin-boosteri', 'kemijski-piling'],
  steps: [
    { 
      id: 'prednosti', 
      label: 'Prednosti', 
      icon: 'FaRegFileAlt',
      image: '/images/services/prp/prp-prednosti-estetski-studio-sisak.jpeg'
    },
    { 
      id: 'kandidati', 
      label: 'Kandidati', 
      icon: 'FaUsers',
    },
    { 
      id: 'priprema', 
      label: 'Priprema', 
      icon: 'FaRegEdit',
    },
    { 
      id: 'tijek-zahvata', 
      label: 'Tijek zahvata', 
      icon: 'FaRegClock',
      image: '/images/services/prp/prp-tijek-zahvata-estetski-studio-sisak.jpeg'
    },
    { 
      id: 'oporavak', 
      label: 'Oporavak', 
      icon: 'FaRegHospital',
    },
    { 
      id: 'nakon-tretmana', 
      label: 'Nakon tretmana', 
      icon: 'FaRegFile',
    },
    { 
      id: 'cijena', 
      label: 'Cijena', 
      icon: 'FaHandHoldingUsd'
    }
  ],
  stepContents: {
    'prednosti': `Prednosti PRP tretmana:

- Koristi vlastite biološke resurse minimizirajući rizik alergijskih reakcija
- Potiče stvaranje kolagena i elastina
- Potiče samostalnu regeneraciju kože i vlasišta
- Poboljšava teksturu kože
- Smanjuje pojavu finih linija, bora i nepravilnosti
- Pomaže u poboljšanju tonusa kože
- Povećava hidrataciju kože
- Usporava se gubitak kose
- Potiče rast kose
- Poboljšava kvalitetu vlasišta`,
    'kandidati': `PRP tretman je idealan za osobe koje žele:

- Poboljšati kvalitetu kože i vlasišta
- Poboljšati tonus kože
- Usporiti proces starenja
- Ojačati kosu
- Smanjiti opadanje kose
- Ujednačiti ton kože
- Poboljšanje elastičnosti kože
- Dubinski hidratizirati kožu`,
    'priprema': `Prije PRP tretmana potrebno je:

1. Dogovoriti konzultacije kako bismo napravili procjenu stanja kože
2. Izvaditi krv kako bismo utvrdili jeste li kandidat za PRP tretman
3. Preporuka broja tretmana za optimalne rezultate`,
    'tijek-zahvata': `Tretman PRP je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Priprema kože - Dezinficiramo kožu te vadimo malu količinu vaše krvi.

2. Priprema krvne plazme - Centrifugiramo vašu krv u posebnom stroju koji ekstrahira plazmu punu matičnih stanica i faktora rasta.

3. Priprema kože ili vlasišta - Čistimo kožu s Toskani Energizing Cleanserom, dok vlasište odmastimo s kemijskim pilingom u spreju.

4. Odabir načina izvođenja PRP tretmana - PRP tretman se može raditi s mezoterapijskim iglama, gdje je bol svedena na minimum korištenjem anestetske kreme. Nadalje, PRP tretman se može raditi s Mesoject gunom, pri čemu nema nelagode.

5. Završna njega - Nanošenje Toskani Antistress maske koja ima umirujuća svojstva na kožu, nanošenje Toskani Total Recovery gela koji pomaže regeneraciji kože i nanošenje kreme sa zaštitnim faktorom Toskani Sun Shiel-D SPF 50+.

6. Preporuka za kućnu njegu - Svim klijentima koji kod nas rade PRP tretman preporučavamo korištenje Toskani Total Recovery gela i kreme sa zaštitnim faktorom Toskani Sun Shiel-D SPF 50+.`,
    'oporavak': `Moguće nuspojave su osjetljivost i blago crvenilo tretiranog područja koje može trajati oko 24h.

Odmah nakon završetka tretmana moguće je nastaviti s uobičajenim aktivnostima.`,
    'nakon-tretmana': `Za najbolje rezultate se preporuča protokol:

Napraviti 2 ili 3 PRP tretmana u razmaku od mjesec dana, ovisno o stanju kože, te ponavljati tretman svakih 6 do 12 mjeseci.

Nakon PRP tretmana se preporuča:

- Koristiti kremu sa zaštitnim faktorom
- Izbjegavati odlazak u saunu i solarij
- Odgoditi trening za minimalno 3 dana
- Promjeniti jastučnicu i ručnik za lice`,
    'cijena': `Cijena PRP terapije:
- Pojedinačni tretman: 600 kn
- Paket od 3 tretmana: 1.500 kn
- Paket od 6 tretmana: 2.800 kn

Cijene uključuju:
- Konzultaciju s našim stručnjacima
- Tretman PRP terapijom
- Naknadnu njegu kože
- Savjete za kućnu njegu

Za optimalne rezultate preporučujemo seriju od 3-6 tretmana s intervalima od 4-6 tjedana. Za više informacija o cijenama i mogućnostima plaćanja, dogovorite termin.`
  }
}; 