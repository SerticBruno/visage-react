export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'Koje usluge nudite?',
    answer:
      "Nudimo širok spektar nekirurških estetskih usluga: <a href='/usluge/mezoterapija'>mezoterapija</a>, <a href='/usluge/skin-boosteri'>skin boosteri</a>, <a href='/usluge/prp'>PRP tretman</a>, <a href='/usluge/dermalni-fileri'>dermalni fileri</a>, <a href='/usluge/terapija-bora-lica'>terapija bora lica</a>, <a href='/usluge/plasmage'>plasmage</a>, <a href='/usluge/kemijski-piling'>kemijski piling</a>. Nadalje nudimo sljedeće beauty tretmane: <a href='/usluge/beauty-tretmani'>Circadia Signature Dermaplaning facial</a>, <a href='/usluge/beauty-tretmani'>Circadia Tretmani</a>, <a href='/usluge/beauty-tretmani'>Circadia Marshmallow Facial</a>, <a href='/usluge/beauty-tretmani'>Circadia Firming Peptide Facial</a> i <a href='/usluge/foto-terapija'>Dermalux Flex fototerapiju</a>.",
  },
  {
    question: 'Gdje mogu dogovoriti termin?',
    answer:
      "Termin možete dogovoriti preko <a href='https://www.facebook.com/profile.php?id=61555201097471' target='_blank' rel='noopener noreferrer'>Facebooka</a>, <a href='https://www.instagram.com/visage.estheticstudio' target='_blank' rel='noopener noreferrer'>Instagrama</a> ili <a href='https://wa.me/385911105020' target='_blank' rel='noopener noreferrer'>Whatsappa</a>, slanjem maila na <a href='mailto:info@visagestudio.hr'>info@visagestudio.hr</a> te <a href='/kontakt' class='contact-form-link'>forme na službenoj web stranici</a>.",
  },
  {
    question: 'Koje je vaše radno vrijeme?',
    answer:
      'Visage studio radi po dogovoru, što znači da morate unaprijed dogovoriti termin kako bismo Vas primili na konzultacije.',
  },
  {
    question: 'Koje načine plaćanja prihvaćate?',
    answer:
      'Prihvaćamo gotovinsko plaćanje, kartično plaćanje i plaćanje na rate. Jednkratno kartično plaćanje je moguće za Visa, Master, Maestro i Diners kartice. Plaćanje na rate je moguće za Visa, Master i Maestro kartice od 2 do 6 rata (*samo kartice izdane od Erste banke, HPB, Agram banke, Istarske kreditne banke i Slatinske banke) te za Diners kartice od 2 do 12 rata bez kamata.',
  },
  {
    question: 'Koje su cijene vaših usluga?',
    answer:
      "Cijene usluga variraju ovisno o vrsti tretmana i trajanju tretmana. <a href='/cjenik'>Detaljan cjenik</a> možete pogledati na našoj službenoj web stranici i društvenim mrežama.",
  },
];

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}
