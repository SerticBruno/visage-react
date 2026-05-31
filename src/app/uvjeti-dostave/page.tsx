import { Metadata } from 'next';
import Link from 'next/link';
import { FaTruck } from 'react-icons/fa';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { legalPageMetadata } from '@/lib/legal-metadata';
import { freeShippingThresholdLabel, legalPaths, legalSeller } from '@/data/legal';
import { SHIPPING_OPTIONS } from '@/lib/shipping';
import { formatPrice } from '@/lib/price-utils';

export const metadata: Metadata = legalPageMetadata(
  'Uvjeti dostave',
  'Načini, rokovi i cijene dostave proizvoda VISAGE Studio webshopa — BoxNow, GLS i preuzimanje u studiju.',
  legalPaths.delivery
);

export default function DeliveryTermsPage() {
  return (
    <LegalPageLayout
      title="Uvjeti dostave"
      description="Informacije o načinima dostave, rokovima isporuke i troškovima prijevoza."
      titleIcon={<FaTruck size={48} className="text-white" />}
    >
      <h2>1. Područje dostave</h2>
      <p>
        Dostava proizvoda kupljenih putem webshopa obavlja se na području Republike Hrvatske,
        osim ako uz pojedini proizvod nije drugačije navedeno.
      </p>

      <h2>2. Načini dostave</h2>
      <p>Trenutno su dostupni sljedeći načini dostave:</p>
      <ul>
        {SHIPPING_OPTIONS.map((option) => (
          <li key={option.id}>
            <strong>{option.label}</strong> — {option.description}. Procijenjeni rok:{' '}
            {option.estimatedDays}. Cijena dostave:{' '}
            {option.priceCents === 0
              ? 'besplatno'
              : formatPrice(option.priceCents)}{' '}
            (ako nije primijenjena besplatna dostava).
          </li>
        ))}
      </ul>

      <h2>3. Troškovi dostave</h2>
      <ul>
        <li>
          Za dostavu putem BoxNow paketomata ili GLS kurirskom službom standardna cijena iznosi{' '}
          {formatPrice(500)} po narudžbi, osim ako je ispunjen uvjet besplatne dostave.
        </li>
        <li>
          Besplatna dostava (BoxNow i GLS) primjenjuje se kada vrijednost proizvoda u košarici
          iznosi {freeShippingThresholdLabel} ili više, prije troškova dostave i eventualnih
          popusta.
        </li>
        <li>Preuzimanje u studiju na adresi {legalSeller.address.streetAddress}, Sisak — besplatno.</li>
        <li>Konačni trošak dostave prikazan je na stranici naplate prije potvrde plaćanja.</li>
      </ul>

      <h2>4. Rok isporuke</h2>
      <p>
        Narudžbe se obrađuju radnim danima. Proizvodi se šalju u roku od 1–3 radna dana od
        zaprimanja uplate, osim u slučaju više sile ili nedostupnosti zaliha (o čemu ćemo vas
        obavijestiti). Procijenjeni rok dostave prijevoznika iznosi 2–4 radna dana od predaje
        pošiljke, ovisno o odredištu.
      </p>

      <h2>5. Preuzimanje pošiljke</h2>
      <ul>
        <li>
          Za BoxNow: primit ćete obavijest (SMS/e-mail) s kodom za preuzimanje iz odabranog
          paketomata.
        </li>
        <li>
          Za GLS: kurir dostavlja na adresu navedenu u narudžbi; molimo osigurajte točnu
          adresu i kontakt telefon.
        </li>
        <li>
          Po isteku roka čuvanja u paketomatu pošiljka se može vratiti prodavatelju; ponovna
          dostava može biti naplaćena.
        </li>
      </ul>

      <h2>6. Oštećenje ili gubitak u transportu</h2>
      <p>
        Kupac je dužan pri preuzimanju vizualno pregledati paket. Očita oštećenja ili nedostatak
        proizvoda prijavite nam na {legalSeller.email} u roku od 48 sati uz fotografije
        ambalaže i proizvoda. Detalji reklamacije u{' '}
        <Link href={legalPaths.returns}>Povrat i reklamacije</Link>.
      </p>

      <h2>7. Povezani dokumenti</h2>
      <p>
        Kupnja proizvoda uređena je{' '}
        <Link href={legalPaths.termsOfSale}>Uvjetima kupnje</Link>. Za pitanja o narudžbi
        kontaktirajte nas na{' '}
        <a href={`mailto:${legalSeller.email}`}>{legalSeller.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
