import { Service } from './types';

export const bioSculpture: Service = {
  id: 'bio-sculpture',
  title: 'Bio Sculpture sistemi',
  description: 'Profesionalni Bio Sculpture sistemi za nokte',
  longDescription: 'Bio Sculpture je vrhunski sistem za njegu i ukrašavanje noktiju. Koristimo najkvalitetnije proizvode i tehnike za savršene rezultate.',
  benefits: [
    'Profesionalna njega noktiju',
    'Dugotrajni rezultati',
    'Širok izbor boja i dizajna',
    'Prirodan izgled',
    'Visoka kvaliteta'
  ],
  image: '/images/services/Mesoterapia-transdermica-facial.webp',
  heroImage: '/images/services/manikura.webp',
  metaDescription: 'Bio Sculpture sistemi u VISAGE studiju. Profesionalna njega i ukrašavanje noktiju. Vrhunska kvaliteta i dugotrajni rezultati.',
  metaKeywords: 'bio sculpture, nokti, manikura, estetski studio Sisak, VISAGE studio',
  tags: ['bio-sculpture', 'nokti', 'manikura', 'nježni-tretmani'],
  steps: [
    { id: 'prednosti', label: 'Prednosti', icon: 'FaRegFileAlt' },
    { id: 'kandidati', label: 'Kandidati', icon: 'FaUsers' },
    { id: 'priprema', label: 'Priprema', icon: 'FaRegEdit' },
    { id: 'tijek-zahvata', label: 'Tijek zahvata', icon: 'FaRegClock' },
    { id: 'oporavak', label: 'Oporavak', icon: 'FaRegHospital' },
    { id: 'nakon-tretmana', label: 'Nakon tretmana', icon: 'FaRegFile' },
    { id: 'cijena', label: 'Cijena', icon: 'FaHandHoldingUsd' }
  ],
  stepContents: {
    'prednosti': `Bio Sculpture je vrhunski sistem za njegu i ukrašavanje noktiju koji koristi prirodne sastojke i napredne tehnike. Ova metoda pruža dugotrajne rezultate i prirodan izgled.

U VISAGE studiju koristimo originalne Bio Sculpture proizvode i tehnike, što osigurava najbolju kvalitetu i trajnost. Svaki tretman je prilagođen vašim potrebama i željama.`,
    'kandidati': `Bio Sculpture je idealan za osobe koje žele:
- Dugotrajnu njegu noktiju
- Prirodan izgled noktiju
- Širok izbor boja i dizajna
- Profesionalnu njegu noktiju
- Visoku kvalitetu i trajnost`,
    'priprema': `Prije Bio Sculpture tretmana potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja noktiju
2. Odabir odgovarajućeg tretmana i boje
3. Upute za pripremu noktiju prije tretmana

Dan prije tretmana:
- Očistiti nokte od starih lakova
- Ukloniti umjetne nokte (ako ih imate)
- Piti dovoljno vode za optimalnu hidrataciju`,
    'tijek-zahvata': `Tretman Bio Sculpture je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Konzultacija i procjena (10 min) - Detaljna analiza stanja noktiju, odabir odgovarajućeg tretmana, plan postupka i objašnjenje. Ova faza je ključna za postizanje optimalnih rezultata.

2. Priprema noktiju (15 min) - Čišćenje noktiju, uklanjanje starog laka, oblikovanje i poliranje. Ova faza osigurava optimalne uvjete za primjenu tretmana.

3. Primjena tretmana (30-45 min) - Precizna primjena Bio Sculpture proizvoda, praćenje reakcije noktiju i masiranje. Ova faza zahtijeva maksimalnu preciznost i stručnost.

4. Završni koraci (15 min) - Primjena zaštitnog sloja, sušenje i fotografiranje prije/nakon. Ova faza osigurava optimalno trajanje tretmana.

5. Naknadna kontrola (5 min) - Provjera rezultata, savjeti za njegu i planiranje sljedećeg tretmana. Ova faza je važna za održavanje rezultata.`,
    'oporavak': `Nakon Bio Sculpture tretmana:
- Nokti su zaštićeni i ojačani
- Potrebno je izbjegavati vodu 2 sata
- Koristiti zaštitne rukavice pri čišćenju
- Redovito koristiti preporučene proizvode za njegu
- Dolaziti na redovite kontrole

Redoviti tretmani svakih 2-3 tjedna održavaju najbolje rezultate.`,
    'nakon-tretmana': `Važne mjere opreza:
- Izbjegavati vodu 2 sata nakon tretmana
- Koristiti zaštitne rukavice pri čišćenju
- Izbjegavati agresivne kemikalije
- Ne koristiti nokte kao alat
- Pratiti sve upute naših stručnjaka

U slučaju bilo kakvih problema, odmah nas kontaktirajte.`,
    'cijena': `Cijena Bio Sculpture tretmana:
- Osnovni tretman: 250 kn
- Premium tretman: 350 kn
- Luxury tretman: 450 kn

Cijene uključuju:
- Konzultaciju s našim stručnjacima
- Odabrani Bio Sculpture tretman
- Naknadnu njegu noktiju
- Savjete za kućnu njegu

Za više informacija o cijenama i mogućnostima plaćanja, dogovorite termin.`
  }
}; 