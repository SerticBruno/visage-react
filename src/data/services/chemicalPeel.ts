import { Service } from './types';

export const chemicalPeel: Service = {
  id: 'kemijski-piling',
  title: 'Kemijski Piling',
  description: 'Otkrijte tajnu blistave kože uz profesionalni kemijski piling',
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
    'opis-zahvata': `Kemijski piling je napredna estetska procedura koja koristi kemijske spojeve za uklanjanje mrtvih stanica s površine kože. Postupak potiče prirodnu regeneraciju kože, poboljšava ton i teksturu, te pomaže u smanjenju bora i ožiljaka.

U VISAGE studiju koristimo najkvalitetnije proizvode za kemijski piling, prilagođene vašem tipu kože i specifičnim potrebama. Postupak je siguran i učinkovit, a rezultati su vidljivi već nakon prvog tretmana.`,
    'kandidati': `Kemijski piling je idealan za osobe koje žele:
- Poboljšati ton i teksturu kože
- Smanjiti fine linije i bore
- Ukloniti ožiljke od akni
- Poboljšati apsorpciju proizvoda za njegu kože
- Osvježiti i revitalizirati kožu

Nije preporučljiv za:
- Osobe s aktivnim infekcijama kože
- Osobe s ozbiljnim kožnim stanjima
- Osobe koje su nedavno prošle kroz agresivne tretmane kože`,
    'priprema': `Prije kemijskog pilinga potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja kože
2. Preporuka odgovarajućeg tipa pilinga za vaš tip kože
3. Preporuka broja tretmana za optimalne rezultate
4. Upute za pripremu kože prije tretmana

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože`,
    'tijek-zahvata': `Tijek kemijskog pilinga uključuje:
1. Čišćenje kože
2. Primjena kemijskog pilinga
3. Neutralizacija pilinga
4. Primjena umirujućih i regenerativnih proizvoda
5. Primjena zaštitnog krema

Cijeli postupak traje oko 45-60 minuta i provodi se u ugodnom ambijentu našeg studija.`,
    'oporavak': `Nakon kemijskog pilinga:
- Koža može biti osjetljiva i crvenkasta 1-2 dana
- Ljuštenje kože je normalno i traje 3-7 dana
- Potrebno je izbjegavati izravno sunce 2 tjedna
- Koristiti blage proizvode za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju

Redoviti tretmani svakih 4-6 tjedana daju najbolje rezultate.`,
    'mjere-opreza': `Važne mjere opreza:
- Izbjegavati izravno sunce 2 tjedna nakon tretmana
- Koristiti zaštitni krem s visokim SPF-om
- Izbjegavati korištenje agresivnih proizvoda za njegu kože
- Ne češati i ne trljati kožu koja se ljušti
- Pratiti sve upute naših stručnjaka

U slučaju bilo kakvih nuspojava, odmah nas kontaktirajte.`,
    'cijena': `Cijena kemijskog pilinga:
- Pojedinačni tretman: 400 kn
- Paket od 3 tretmana: 1.000 kn
- Paket od 6 tretmana: 1.800 kn

Cijene uključuju:
- Konzultaciju s našim stručnjacima
- Tretman kemijskim pilingom
- Naknadnu njegu kože
- Savjete za kućnu njegu

Za više informacija o cijenama i mogućnostima plaćanja, kontaktirajte nas.`
  }
}; 