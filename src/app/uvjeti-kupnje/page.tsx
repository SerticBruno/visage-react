import { Metadata } from 'next';
import Link from 'next/link';
import { FaFileContract } from 'react-icons/fa';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { legalPageMetadata } from '@/lib/legal-metadata';
import { freeShippingThresholdLabel, legalPaths, legalSeller } from '@/data/legal';

export const metadata: Metadata = legalPageMetadata(
  'Uvjeti kupnje',
  'Uvjeti kupnje na daljinu putem webshopa VISAGE Studio — cijene, plaćanje, ugovor i prava potrošača.',
  legalPaths.termsOfSale
);

export default function TermsOfSalePage() {
  return (
    <LegalPageLayout
      title="Uvjeti kupnje"
      description="Uvjeti sklapanja i izvršenja ugovora o kupnji proizvoda putem našeg webshopa."
      titleIcon={<FaFileContract size={48} className="text-white" />}
    >
      <h2>1. Opće odredbe</h2>
      <p>
        Ovi Uvjeti kupnje uređuju odnos između prodavatelja {legalSeller.legalName} (dalje:
        &quot;prodavatelj&quot;, &quot;mi&quot;) i kupca (dalje: &quot;kupac&quot;, &quot;vi&quot;)
        pri kupnji proizvoda putem internetskog shopa na adresi {legalSeller.url}. Kupnjom
        potvrđujete da ste upoznati s ovim Uvjetima,{' '}
        <Link href={legalPaths.delivery}>Uvjetima dostave</Link>,{' '}
        <Link href={legalPaths.returns}>Politikom povrata i reklamacija</Link> te{' '}
        <Link href={legalPaths.privacy}>Politikom privatnosti</Link>.
      </p>

      <h2>2. Proizvodi i cijene</h2>
      <ul>
        <li>
          Svi proizvodi prikazani u katalogu opisani su što je moguće preciznije; fotografije
          mogu neznatno odstupati od stvarnog izgleda.
        </li>
        <li>
          Cijene su izražene u eurima (EUR), uključuju PDV ako je prodavatelj u sustavu PDV-a,
          osim ako uz cijenu nije drugačije naznačeno.
        </li>
        <li>
          Troškovi dostave nisu uključeni u cijenu proizvoda osim ako je uz proizvod izričito
          navedeno; detalji su u{' '}
          <Link href={legalPaths.delivery}>Uvjetima dostave</Link>.
        </li>
        <li>
          Besplatna dostava (BoxNow/GLS) primjenjuje se na narudžbe proizvoda iznad{' '}
          {freeShippingThresholdLabel}, prema trenutno objavljenim uvjetima na stranici
          naplate.
        </li>
        <li>Prodavatelj zadržava pravo izmjene cijena do trenutka sklapanja ugovora.</li>
      </ul>

      <h2>3. Narudžba i sklapanje ugovora</h2>
      <ol>
        <li>Kupac odabire proizvode i dodaje ih u košaricu.</li>
        <li>
          Na stranici naplate unosi podatke za dostavu/račun i odabire način dostave te
          plaćanja.
        </li>
        <li>
          Prije plaćanja kupac mora prihvatiti ove Uvjete kupnje i Politiku povrata označavanjem
          potvrdnog polja.
        </li>
        <li>
          Ugovor se smatra sklopljenim kada prodavatelj zaprimi potvrdu uspješnog plaćanja putem
          sustava Stripe i pošalje kupcu potvrdu narudžbe na e-mail.
        </li>
        <li>
          Prodavatelj može odbiti ili otkazati narudžbu u slučaju evidentne pogreške u cijeni,
          nedostupnosti zaliha ili sumnje na zlouporabu; o tome će kupca bez odgađanja
          obavijestiti.
        </li>
      </ol>

      <h2>4. Plaćanje</h2>
      <p>
        Online plaćanje karticama obavlja se putem sigurnog procesora{' '}
        <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
          Stripe
        </a>
        . Podaci o kartici ne pohranjuju se na našem poslužitelju. U studiju su moguća i druga
        dogovorena plaćanja za usluge, prema cjeniku.
      </p>

      <h2>5. Dostava</h2>
      <p>
        Rokovi, načini i cijene dostave uređeni su posebnim dokumentom{' '}
        <Link href={legalPaths.delivery}>Uvjeti dostave</Link>. Rizik slučajne propasti ili
        oštećenja proizvoda tijekom prijevoza prelazi na kupca u trenutku predaje proizvoda
        prijevozniku, odnosno kupcu pri osobnom preuzimanju u studiju.
      </p>

      <h2>6. Pravo na jednostrani raskid ugovora (povrat)</h2>
      <p>
        Kupac koji je potrošač u smislu Zakona o zaštiti potrošača ima pravo jednostrano raskinuti
        ugovor sklopljen na daljinu u roku od 14 dana bez navođenja razloga, sukladno Zakonu o
        zaštiti potrošača i propisima o poslovanju na daljinu. Detaljan postupak, iznimke i obrazac
        za odustanak navedeni su u{' '}
        <Link href={legalPaths.returns}>Povrat i reklamacije</Link>.
      </p>

      <h2>7. Reklamacije i jamstvena prava</h2>
      <p>
        Na proizvode koji ne odgovaraju ugovoru kupac ima prava iz Zakona o obveznim odnosima i
        Zakonu o zaštiti potrošača. Postupak prijave nesauglasnosti opisan je u{' '}
        <Link href={legalPaths.returns}>Povrat i reklamacije</Link>.
      </p>

      <h2>8. Osobni podaci</h2>
      <p>
        Podaci prikupljeni radi narudžbe obrađuju se u skladu s Uredbom (EU) 2016/679 (GDPR) i
        Zakonom o provedbi Opće uredbe o zaštiti podataka. Više u{' '}
        <Link href={legalPaths.privacy}>Politici privatnosti</Link>.
      </p>

      <h2>9. Mjerodavno pravo</h2>
      <p>
        Na ove Uvjete primjenjuje se pravo Republike Hrvatske. Za sporove je nadležan stvarno
        nadležan sud u Republici Hrvatskoj, osim kada je za potrošače propisano drugačije.
      </p>

      <h2>10. Kontakt</h2>
      <p>
        Za sva pitanja vezana uz narudžbe i ugovor:{' '}
        <a href={`mailto:${legalSeller.email}`}>{legalSeller.email}</a>, telefon{' '}
        <a href={`tel:${legalSeller.phone}`}>{legalSeller.phoneDisplay}</a>.
      </p>
    </LegalPageLayout>
  );
}
