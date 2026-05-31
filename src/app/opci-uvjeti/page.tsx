import { Metadata } from 'next';
import Link from 'next/link';
import { FaBalanceScale } from 'react-icons/fa';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { legalPageMetadata } from '@/lib/legal-metadata';
import { legalPaths, legalSeller } from '@/data/legal';

export const metadata: Metadata = legalPageMetadata(
  'Opći uvjeti poslovanja',
  'Opći uvjeti poslovanja VISAGE Studio — web stranica, usluge studija i internetska prodaja.',
  legalPaths.generalTerms
);

export default function GeneralTermsPage() {
  return (
    <LegalPageLayout
      title="Opći uvjeti poslovanja"
      description="Opći uvjeti korištenja web stranice i poslovanja VISAGE Studio."
      titleIcon={<FaBalanceScale size={48} className="text-white" />}
    >
      <h2>1. Područje primjene</h2>
      <p>
        Ovi Opći uvjeti poslovanja (OUP) primjenjuju se na korištenje web stranice{' '}
        {legalSeller.url}, informiranje o uslugama studija, rezervacije termina te na
        internetsku prodaju proizvoda, osim gdje posebnim dokumentima nije drugačije određeno.
      </p>
      <p>
        Za kupnju proizvoda putem webshopa primjenjuju se{' '}
        <Link href={legalPaths.termsOfSale}>Uvjeti kupnje</Link>,{' '}
        <Link href={legalPaths.delivery}>Uvjeti dostave</Link> i{' '}
        <Link href={legalPaths.returns}>Povrat i reklamacije</Link>, koji čine sastavni dio
        ugovornog odnosa s kupcem.
      </p>

      <h2>2. Usluge studija</h2>
      <ul>
        <li>
          Estetski i kozmetički tretmani pružaju se u prostorijama studija prema dogovoru,
          individualnoj procjeni i medicinsko-kozmetičkim indikacijama.
        </li>
        <li>
          Cijene usluga objavljene su na stranici Cjenik; mogu se promijeniti bez prethodne
          najave, pri čemu se na već potvrđene termine primjenjuje cijena iz trenutka
          potvrde.
        </li>
        <li>
          Otkazivanje ili pomicanje termina moguće je najkasnije 24 sata unaprijed, inače
          prodavatelj može naplatiti rezervirani termin sukladno internim pravilima objavljenim
          pri rezervaciji.
        </li>
      </ul>

      <h2>3. Korištenje web stranice</h2>
      <p>
        Sadržaj stranice (tekstovi, fotografije, logotipi) zaštićen je autorskim pravom. Nije
        dopušteno neovlašteno kopiranje, distribucija ili komercijalna uporaba bez pisane
        suglasnosti prodavatelja.
      </p>
      <p>
        Korisnik se obvezuje ne zloupotrebljavati stranicu (automatsko skidanje sadržaja,
        slanje neželjene pošte, pokušaj neovlaštenog pristupa sustavima).
      </p>

      <h2>4. Newsletter i komunikacija</h2>
      <p>
        Prijava na newsletter podrazumijeva privolu za slanje marketinških poruka na navedenu
        e-mail adresu. Privolu možete povući u svakom trenutku putem linka za odjavu ili
        poruke na {legalSeller.email}.
      </p>

      <h2>5. Odgovornost</h2>
      <p>
        Prodavatelj nastoji osigurati točnost informacija na stranici, ali ne jamči da su u
        svakom trenutku potpune i bez pogrešaka. Za štetu nastalu nepravilnim korištenjem
        stranice od strane korisnika prodavatelj ne odgovara u mjeri dopuštenoj zakonom.
      </p>

      <h2>6. Zaštita osobnih podataka i kolačići</h2>
      <p>
        Obrada osobnih podataka i korištenje kolačića opisani su u{' '}
        <Link href={legalPaths.privacy}>Politici privatnosti</Link> i{' '}
        <Link href={legalPaths.cookies}>Politici kolačića</Link>.
      </p>

      <h2>7. Izmjene OUP-a</h2>
      <p>
        Prodavatelj može izmijeniti ove Opće uvjete objavljivanjem nove verzije na stranici.
        Za sklopljen ugovore o kupnji primjenjuju se uvjeti važeći u trenutku narudžbe.
      </p>

      <h2>8. Kontakt</h2>
      <p>
        <Link href={legalPaths.seller}>Podaci o prodavatelju</Link> · E-mail:{' '}
        <a href={`mailto:${legalSeller.email}`}>{legalSeller.email}</a>
      </p>
    </LegalPageLayout>
  );
}
