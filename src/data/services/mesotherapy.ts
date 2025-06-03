import { Service } from './types';

export const mesotherapy: Service = {
  id: 'mezoterapija',
  title: 'Mezoterapija',
  description: 'Dubinska hidratacija i revitalizacija kože',
  longDescription: 'Mezoterapija je napredni tretman koji kombinira mikroinjekcije s koktelom aktivnih sastojaka za dubinsku hidrataciju i revitalizaciju kože. Ovaj tretman je idealan za sve tipove kože i pruža vidljive rezultate već nakon prvog tretmana.',
  benefits: [
  ],
  image: '/images/services/Mesoterapia-transdermica-facial.webp',
  heroImage: '/images/services/botox-face-girl.webp',
  metaDescription: 'Profesionalna mezoterapija u VISAGE studiju u Siska. Dubinska hidratacija i revitalizacija kože uz pomoć mikroinjekcija.',
  metaKeywords: 'mezoterapija, hidratacija kože, mikroinjekcije, estetski studio Sisak, VISAGE studio',
  tags: ['mezoterapija', 'hidratacija', 'mikroinjekcije', 'revitalizacija'],
  pricingCategory: 'Mezoterapija Mesoject Gunom',
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
    'prednosti': 'Mezoterapija je minimalno invazivni tretman koji uključuje primjenu mikroinjekcija s koktelom aktivnih sastojaka direktno u srednji sloj kože. Ovo omogućuje optimalnu apsorpciju i učinkovitost aktivnih sastojaka.',
    'kandidati': 'Mezoterapija je pogodna za:\n- Dehidriranu kožu\n- Kožu s finim linijama\n- Kožu koja izgleda umorno\n- Kožu koja treba revitalizaciju\n- Sve tipove kože',
    'priprema': 'Prije tretmana:\n- Izbjegavati sunčanje 1 tjedan prije\n- Doći s očišćenom kožom\n- Konzultirati se s terapeutom o povijesti kože\n- Izbjegavati alkohol 24h prije',
    'tijek-zahvata': `Tretman mezoterapijom je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Konzultacija i procjena (10 min) - Detaljna analiza stanja kože, odabir odgovarajućeg koktela, plan tretmana i objašnjenje postupka. Ova faza je ključna za postizanje optimalnih rezultata.

2. Priprema kože (15 min) - Dubinsko čišćenje kože, primjena anestetičke kreme, oznaka područja za tretman i dezinfekcija kože. Ova faza osigurava optimalne uvjete za primjenu mezoterapije.

3. Primjena mezoterapije (20-30 min) - Precizne mikroinjekcije, praćenje reakcije kože, prilagodba dubine injekcija i masiranje područja. Ova faza zahtijeva maksimalnu preciznost i stručnost.

4. Završni koraci (15 min) - Primjena umirujućih proizvoda, regenerativnih seruma, zaštitnog krema i fotografiranje prije/nakon. Ova faza osigurava optimalno oporavak kože.

5. Naknadna kontrola (5 min) - Provjera rezultata, savjeti za njegu i planiranje sljedećeg tretmana. Ova faza je važna za održavanje rezultata.`,
    'oporavak': 'Nakon tretmana:\n- Blago crvenilo koje nestaje u roku od 24h\n- Moguća osjetljivost kože\n- Potrebno je izbjegavati sunčanje\n- Pratiti upute terapeuta za njegu',
    'nakon-tretmana': 'Mjere opreze su važne za održavanje rezultata i prevenciju komplikacija.',
    'cijena': 'Cijena tretmana mezoterapijom ovisi o mnogim faktorima, uključujući lokaciju, stručnost i tip koktela.'
  }
}; 