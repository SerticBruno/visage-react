import { Metadata } from 'next';
import Link from 'next/link';
import { FaUndo } from 'react-icons/fa';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { legalPageMetadata } from '@/lib/legal-metadata';
import { legalPaths, legalSeller } from '@/data/legal';
import { legalPanelClass } from '@/components/legal/legal-styles';

export const metadata: Metadata = legalPageMetadata(
  'Povrat i reklamacije',
  'Pravo na jednostrani raskid ugovora, povrat proizvoda i postupak reklamacije — VISAGE Studio webshop.',
  legalPaths.returns
);

export default function ReturnsPage() {
  return (
    <LegalPageLayout
      title="Povrat i reklamacije"
      description="Vaša prava kao potrošača: odustanak od ugovora, povrat proizvoda i prijava nesauglasnosti."
      titleIcon={<FaUndo size={48} className="text-white" />}
    >
      <h2>1. Pravo na jednostrani raskid ugovora (povrat bez razloga)</h2>
      <p>
        Ako ste potrošač u smislu Zakona o zaštiti potrošača, imate pravo jednostrano raskinuti
        ugovor sklopljen na daljinu u roku od <strong>14 dana</strong> od dana kada vi ili
        treća osoba koju ste vi odredili, a koja nije prijevoznik, preuzmete robu.
      </p>
      <p>
        Za ostvarivanje prava pošaljite nedvosmislnu izjavu o odustajanju na e-mail{' '}
        <a href={`mailto:${legalSeller.email}`}>{legalSeller.email}</a> ili poštom na adresu
        prodavatelja. Možete koristiti i sljedeći obrazac (nije obvezan):
      </p>

      <blockquote className={`${legalPanelClass} border-l-4 border-slate-300 rounded-r-xl text-sm text-slate-700 space-y-2`}>
        <p className="font-semibold text-slate-900 mb-3">Obrazac za jednostrani raskid ugovora</p>
        <p>Primatelj: {legalSeller.legalName}, {legalSeller.address.streetAddress},{' '}
          {legalSeller.address.postalCode} {legalSeller.address.addressLocality}</p>
        <p className="mt-2">
          Obavještavam vas da jednostrano raskidam ugovor o kupnji sljedeće robe / usluge:
        </p>
        <p>— Datum narudžbe: _______________</p>
        <p>— Broj narudžbe: _______________</p>
        <p>— Ime i prezime potrošača: _______________</p>
        <p>— Adresa potrošača: _______________</p>
        <p>— Potpis (samo ako se obrazac šalje na papiru): _______________</p>
        <p>— Datum: _______________</p>
      </blockquote>

      <h3>Rok za vraćanje robe</h3>
      <p>
        Robu morate vratiti bez odgađanja, a najkasnije u roku od 14 dana od dana slanja
        izjave o odustajanju. Troškove izravnog vraćanja robe snosite vi, osim ako
        prodavatelj nije ponudio da ih sam preuzme ili ako nije obaviješten da troškove snosi
        prodavatelj.
      </p>

      <h3>Povrat novca</h3>
      <p>
        Iznos uplate (uključujući troškove standardne dostave koje ste platili) vraćamo u roku
        od 14 dana od zaprimanja izjave o odustajanju, i to istim načinom plaćanja koji ste
        koristili, osim ako se izričito ne dogovorimo drugačije. Povrat možemo odgoditi dok ne
        zaprimimo robu ili dok ne dostavite dokaz da ste robu poslali.
      </p>

      <h2>2. Iznimke od prava na povrat</h2>
      <p>Pravo na jednostrani raskid ne primjenjuje se, između ostalog, na:</p>
      <ul>
        <li>
          robu izrađenu prema specifikacijama potrošača ili jasno personaliziranu;
        </li>
        <li>
          zapečaćenu robu koja nije pogodna za povrat iz zdravstvenih ili higijenskih razloga
          ako je pečat nakon dostave otklonjen (npr. određeni kozmetički proizvodi s otvorenom
          ambalažom);
        </li>
        <li>robu koja je nakon isporuke nerazdvojivo pomiješana s drugim predmetima;</li>
        <li>
          usluge koje su u cijelosti izvršene uz izričit pristanak potrošača prije isteka roka
          za odustanak.
        </li>
      </ul>
      <p>
        Ako ste zatražili da usluga započne tijekom roka za odustanak, dužni ste platiti
        razmjerni dio cijene za već izvršenu uslugu.
      </p>

      <h2>3. Smanjenje vrijednosti robe</h2>
      <p>
        Odgovorni ste samo za svako umanjenje vrijednosti robe koje je posljedica rukovanja
        robom na način koji prelazi ono što je potrebno za utvrđivanje prirode,
        obilježja i djelovanja robe.
      </p>

      <h2>4. Reklamacija — proizvod koji ne odgovara ugovoru</h2>
      <p>
        Ako primljena roba ima nedostatke, oštećenja nastala u dostavi ili ne odgovara
        narudžbi, prijavite reklamaciju u razumnom roku, a najkasnije u roku od 2 mjeseca od
        dana kada ste nedostatak otkrili.
      </p>
      <p>
        Reklamaciju podnesite e-mailom na{' '}
        <a href={`mailto:${legalSeller.email}`}>{legalSeller.email}</a> s brojem narudžbe,
        opisom nedostatka i fotografijama. Odgovorit ćemo u zakonskom roku i predložiti
        rješenje: zamjenu, popravak, sniženje cijene ili povrat novca, ovisno o okolnostima.
      </p>

      <h2>5. Jamstvena prava</h2>
      <p>
        Ako je na proizvodu dano jamstvo proizvođača, jamstveni list i uvjeti jamstva su sastavni
        dio isporuke. Jamstvena prava ostvarujete kod prodavatelja ili ovlaštenog servisa prema
        uvjetima jamstva.
      </p>

      <h2>6. Zaštita potrošača</h2>
      <p>
        Ova pravila ne isključuju prava koja vam pripadaju prema obveznim propisima Republike
        Hrvatske i Europske unije. Više o ugovornom odnosu u{' '}
        <Link href={legalPaths.termsOfSale}>Uvjetima kupnje</Link>.
      </p>
    </LegalPageLayout>
  );
}
