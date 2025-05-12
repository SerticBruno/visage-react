import { Services } from './types';
import { chemicalPeel } from './chemicalPeel';
import { mesotherapy } from './mesotherapy';
import { prp } from './prp';
import { skinBoosteri } from './skinBoosters';
import { dermalFillers } from './dermalFillers';
import { plasmage } from './plasmage';
import { wrinkleTherapy } from './wrinkleTherapy';
import { beautyTreatments } from './beautyTreatments';
import { bioSculpture } from './bioSculpture';

export const services: Services = {
  'kemijski-piling': chemicalPeel,
  'mezoterapija': mesotherapy,
  'prp': prp,
  'skin-boosteri': skinBoosteri,
  'dermalni-fileri': dermalFillers,
  'plasmage': plasmage,
  'terapija-bora-lica': wrinkleTherapy,
  'beauty-tretmani': beautyTreatments,
  'bio-sculpture': bioSculpture
};

export type ServiceKey = keyof typeof services; 