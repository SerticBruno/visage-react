import { Service } from './types';

export const chemicalPeel: Service = {
  id: 'kemijski-piling',
  title: 'Kemijski Piling',
  description: 'Otkrijte tajnu blistave kože uz TOSKANI pilinge',
  longDescription: 'Kemijski piling je ključan korak u njezi kože koji pomaže u uklanjanju mrtvih stanica s površine kože, potiče regeneraciju stanica te smanjuje pojavu nepravilnosti poput hiperpigmentacije, sitnih linija i akni. U Visage studiju prilagođavamo svaki tretman vašim individualnim potrebama, koristeći kombinaciju nježnih kiselina kako bismo postigli optimalne rezultate.',
  benefits: [
    'Uklanja mrtve stanice i nečistoće s kože',
    'Poboljšava čvrstoću i zaglađuje teksturu kože',
    'Ublažava nepravilnu pigmentaciju',
    'Umanjuje učinke fotostarenja',
    'Poboljšava izgled kože sklone aknama',
    'Pruža trenutne rezultate bez nelagode'
  ],
  image: '/images/services/kemijski-piling/tretman-kemijski-piling.webp',
  heroImage: '/images/services/kemijski-piling/toskani-bg.webp',
  metaDescription: 'Profesionalni kemijski piling u VISAGE studiju u Siska. Obnovite svoju kožu uz pomoć naprednih kemijskih pilinzi TOSKANI. Rezultati odmah vidljivi.',
  metaKeywords: 'kemijski piling, piling lica, obnova kože, estetski studio Sisak, VISAGE studio, TOSKANI piling, kemijski piling Sisak',
  tags: ['kemijski-piling', 'piling', 'obnova-kože', 'nježni-tretmani'],
  steps: [
    { 
      id: 'opis-zahvata', 
      label: 'Opis zahvata', 
      icon: 'FaRegFileAlt',
      image: '/images/services/kemijski-piling/tretman-kemijski-piling.webp'
    },
    { 
      id: 'kandidati', 
      label: 'Kandidati', 
      icon: 'FaUsers',
      image: '/images/services/kemijski-piling/toskani-peelings.webp'
    },
    { 
      id: 'priprema', 
      label: 'Priprema', 
      icon: 'FaRegEdit',
      image: '/images/services/kemijski-piling/toskani-duosomal.webp'
    },
    { 
      id: 'tijek-zahvata', 
      label: 'Tijek zahvata', 
      icon: 'FaRegClock',
      image: '/images/services/kemijski-piling/kombinirani-pilinzi.webp'
    },
    { 
      id: 'oporavak', 
      label: 'Oporavak', 
      icon: 'FaRegHospital',
      image: '/images/services/kemijski-piling/toskani-bg.webp'
    },
    { 
      id: 'mjere-opreza', 
      label: 'Mjere opreza', 
      icon: 'FaRegFile',
      image: '/images/services/kemijski-piling/tretman-kemijski-piling.webp'
    },
    { 
      id: 'cijena', 
      label: 'Cijena', 
      icon: 'FaHandHoldingUsd',
      image: '/images/services/kemijski-piling/tretman-kemijski-piling.webp'
    }
  ],
  stepContents: {
    'opis-zahvata': `Kemijski piling je napredna estetska procedura koja koristi kemijske spojeve za uklanjanje mrtvih stanica s površine kože. Postupak potiče prirodnu regeneraciju kože, poboljšava ton i teksturu, te pomaže u smanjenju bora i ožiljaka.

U VISAGE studiju koristimo najkvalitetnije proizvode za kemijski piling, prilagođene vašem tipu kože i specifičnim potrebama. Postupak je siguran i učinkovit, a rezultati su vidljivi već nakon prvog tretmana.`,
    'kandidati': `Kemijski piling je idealan za osobe koje žele:
- Poboljšati ton i teksturu kože
- Smanjiti fine linije i bore
- Ukloniti ožiljke od akni
- Poboljšati apsorpciju proizvoda za njegu kože
- Osvježiti i revitalizirati kožu`,
    'priprema': `Prije kemijskog pilinga potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja kože
2. Preporuka odgovarajućeg tipa pilinga za vaš tip kože
3. Preporuka broja tretmana za optimalne rezultate
4. Upute za pripremu kože prije tretmana

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože`,
    'tijek-zahvata': `Tretman kemijskim pilingom je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Konzultacija i procjena (10 min) - Detaljna analiza stanja kože, odabir odgovarajućeg tipa pilinga, plan tretmana i objašnjenje postupka. Ova faza je ključna za postizanje optimalnih rezultata.

2. Priprema kože (15 min) - Dubinsko čišćenje kože, primjena anestetičke kreme, oznaka područja za tretman i dezinfekcija kože. Ova faza osigurava optimalne uvjete za primjenu pilinga.

3. Primjena pilinga (20-30 min) - Precizna primjena kemijskog pilinga, praćenje reakcije kože, neutralizacija pilinga i masiranje. Ova faza zahtijeva maksimalnu preciznost i stručnost.

4. Završni koraci (15 min) - Primjena umirujućih proizvoda, regenerativnih seruma, zaštitnog krema i fotografiranje prije/nakon. Ova faza osigurava optimalno oporavak kože.

5. Naknadna kontrola (5 min) - Provjera rezultata, savjeti za njegu i planiranje sljedećeg tretmana. Ova faza je važna za održavanje rezultata.`,
    'oporavak': 'Nakon tretmana:\n- Blago crvenilo koje nestaje u roku od 24h\n- Moguća osjetljivost kože\n- Potrebno je izbjegavati sunčanje\n- Pratiti upute terapeuta za njegu',
    'mjere-opreza': 'Mjere opreze su važne za održavanje rezultata i prevenciju komplikacija.',
    'cijena': 'Cijena tretmana kemijskim pilingom ovisi o mnogim faktorima, uključujući lokaciju, stručnost i tip pilinga.'
  }
}; 