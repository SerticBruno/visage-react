export interface BeautyTreatmentStep {
  number: number;
  description: string;
}

export interface BeautyTreatmentProcedure {
  id: string;
  steps: BeautyTreatmentStep[];
  warnings?: string[];
  gifts?: string[];
}

export const beautyTreatmentProcedures: Record<string, BeautyTreatmentProcedure> = {
  'dermaplaning': {
    id: 'dermaplaning',
    steps: [
      { number: 1, description: 'Čišćenje lica sa Circadia proizvodima za čišćenje lica' },
      { number: 2, description: 'Dermaplaning' },
      { number: 3, description: 'Aplikacija Snow Algae & Spirulina Cooling Mask' },
      { number: 4, description: 'Maska se suši 10 do 20 minuta' },
      { number: 5, description: 'Uklanjanje maske' },
      { number: 6, description: 'Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme' }
    ]
  },
  'marshmallow-facial': {
    id: 'marshmallow-facial',
    steps: [
      { number: 1, description: 'Čišćenje lica sa Circadia proizvodima za čišćenje lica' },
      { number: 2, description: 'Aplikacija Marshmallow Whip Hydrating Mask' },
      { number: 3, description: 'Maska se suši 10 do 20 minuta' },
      { number: 4, description: 'Uklanjanje maske' },
      { number: 5, description: 'Circadia serum ovisno o tipu i stanju kože' },
      { number: 6, description: 'Circadia krema ovisno o tipu i stanju kože' },
      { number: 7, description: 'Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme' }
    ]
  },
  'firming-peptide-facial': {
    id: 'firming-peptide-facial',
    steps: [
      { number: 1, description: 'Čišćenje lica sa Circadia proizvodima za čišćenje lica' },
      { number: 2, description: 'Aplikacija Firming Peptide Mask' },
      { number: 3, description: 'Maska se suši 10 do 30 minuta' },
      { number: 4, description: 'Uklanjanje maske' },
      { number: 5, description: 'Circadia serum ovisno o tipu i stanju kože' },
      { number: 6, description: 'Circadia krema ovisno o tipu i stanju kože' },
      { number: 7, description: 'Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme' }
    ],
    warnings: ['UPOZORENJE: Prilikom sušenja maska pruža osjećaj zatezanja!']
  },
  'signature-dermaplaning-facial': {
    id: 'signature-dermaplaning-facial',
    steps: [
      { number: 1, description: 'Čišćenje lica sa Circadia proizvodima za čišćenje lica' },
      { number: 2, description: 'Dermaplaning' },
      { number: 3, description: 'Caviar Lime & Passionfruit Enzym piling' },
      { number: 4, description: 'Aplikacija Marshmallow Whip Hydrating Mask' },
      { number: 5, description: 'Maska se suši 10 do 20 minuta' },
      { number: 6, description: 'Uklanjanje maske' },
      { number: 7, description: 'Circadia serum ovisno o tipu i stanju kože' },
      { number: 8, description: 'Circadia krema ovisno o tipu i stanju kože' },
      { number: 9, description: 'Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme' }
    ]
  },
  'beyond-botox-facial': {
    id: 'beyond-botox-facial',
    steps: [
      { number: 1, description: 'Čišćenje lica sa Circadia proizvodima za čišćenje lica' },
      { number: 2, description: 'Dermaplaning' },
      { number: 3, description: 'Kemijski piling laktičnom kiselinom ili enzimski piling' },
      { number: 4, description: 'Aplikacija Firming Peptide Mask' },
      { number: 5, description: 'Maska se suši 10 do 30 minuta' },
      { number: 6, description: 'Uklanjanje maske' },
      { number: 7, description: 'Circadia serum ovisno o tipu i stanju kože' },
      { number: 8, description: 'Circadia krema ovisno o tipu i stanju kože' },
      { number: 9, description: 'Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme' }
    ],
    warnings: ['UPOZORENJE: Prilikom sušenja maska pruža osjećaj zatezanja!'],
    gifts: ['POKLON: Post Peel Home Care']
  }
}; 