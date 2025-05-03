import Image from 'next/image';

const AboutContent = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Naša priča</h2>
            <p className="text-gray-600 mb-4">
              VISAGE Studio je estetski studio u centru Siska koji je certificirani predstavnik za TOSKANI.
              Naša misija je pružiti vrhunsku uslugu u području estetske medicine, koristeći najmodernije tehnologije
              i najkvalitetnije proizvode.
            </p>
            <p className="text-gray-600 mb-4">
              Kod nas možete, po prvi put u Sisku, obavljati jedne od najpopularnijih neinvazivnih tretmana:
              Plasmage i Mesoject Gun mezoterapija koja je dobila Gracia Award za BEST OF BEAUTY 2023.g.
            </p>
          </div>
          <div className="relative h-96">
            <Image
              src="/images/services/botox-face-girl.webp"
              alt="VISAGE Studio interior"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Vizija</h3>
            <p className="text-gray-600">
              Biti vodeći estetski studio u regiji, poznat po inovativnim tretmanima i izvrsnoj usluzi.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Misija</h3>
            <p className="text-gray-600">
              Pružiti klijentima najbolje moguće tretmane koristeći najmoderniju tehnologiju i iskustvo naših stručnjaka.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Vrijednosti</h3>
            <p className="text-gray-600">
              Profesionalizam, pouzdanost, inovativnost i individualni pristup svakom klijentu.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Naš tim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4">
                <Image
                  src="/images/services/plasmage-hero.webp"
                  alt="Team member"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">Ime Prezime</h3>
              <p className="text-gray-600">Estetski tehničar</p>
            </div>
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4">
                <Image
                  src="/images/services/manikura.webp"
                  alt="Team member"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">Ime Prezime</h3>
              <p className="text-gray-600">Estetski tehničar</p>
            </div>
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4">
                <Image
                  src="/images/services/TKNHA3_.webp"
                  alt="Team member"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">Ime Prezime</h3>
              <p className="text-gray-600">Estetski tehničar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent; 