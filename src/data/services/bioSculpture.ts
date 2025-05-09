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
  steps: [
    { id: 'opis-zahvata', label: 'Opis zahvata', icon: 'FaRegFileAlt' },
    { id: 'kandidati', label: 'Kandidati', icon: 'FaUsers' },
    { id: 'priprema', label: 'Priprema', icon: 'FaRegEdit' },
    { id: 'tijek-zahvata', label: 'Tijek zahvata', icon: 'FaRegClock' },
    { id: 'oporavak', label: 'Oporavak', icon: 'FaRegHospital' },
    { id: 'mjere-opreza', label: 'Mjere opreza', icon: 'FaRegFile' },
    { id: 'cijena', label: 'Cijena', icon: 'FaHandHoldingUsd' }
  ],
  stepContents: {
    'opis-zahvata': `Bio Sculpture je vrhunski sistem za njegu i ukrašavanje noktiju koji koristi prirodne sastojke i napredne tehnike. Ova metoda pruža dugotrajne rezultate i prirodan izgled.

U VISAGE studiju koristimo originalne Bio Sculpture proizvode i tehnike, što osigurava najbolju kvalitetu i trajnost. Svaki tretman je prilagođen vašim potrebama i željama.`,
    'kandidati': `Bio Sculpture je idealan za osobe koje žele:
- Dugotrajnu njegu noktiju
- Prirodan izgled noktiju
- Širok izbor boja i dizajna
- Profesionalnu njegu noktiju
- Visoku kvalitetu i trajnost

Nije preporučljiv za:
- Osobe s aktivnim infekcijama noktiju
- Osobe s ozbiljnim stanjima noktiju
- Osobe s alergijama na sastojke proizvoda`,
    'priprema': `Prije Bio Sculpture tretmana potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja noktiju
2. Odabir odgovarajućeg tretmana i boje
3. Upute za pripremu noktiju prije tretmana

Dan prije tretmana:
- Očistiti nokte od starih lakova
- Ukloniti umjetne nokte (ako ih imate)
- Piti dovoljno vode za optimalnu hidrataciju`,
    'tijek-zahvata': `Tijek Bio Sculpture tretmana uključuje:
1. Čišćenje i priprema noktiju
2. Odabir boje i dizajna
3. Primjena Bio Sculpture sistema
4. Sušenje i oblikovanje
5. Primjena zaštitnog sloja

Cijeli postupak traje oko 60-90 minuta i provodi se u ugodnom ambijentu našeg studija.`,
    'oporavak': `Nakon Bio Sculpture tretmana:
- Nokti su zaštićeni i ojačani
- Potrebno je izbjegavati vodu 2 sata
- Koristiti zaštitne rukavice pri čišćenju
- Redovito koristiti preporučene proizvode za njegu
- Dolaziti na redovite kontrole

Redoviti tretmani svakih 2-3 tjedna održavaju najbolje rezultate.`,
    'mjere-opreza': `Važne mjere opreza:
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

Za više informacija o cijenama i mogućnostima plaćanja, kontaktirajte nas.`
  }
}; 