import { Services } from './types';
import { chemicalPeel } from './chemicalPeel';
import { mesotherapy } from './mesotherapy';
import { prp } from './prp';
import { skinBoosteri } from './skinBoosters';
import { dermalFillers } from './dermalFillers';
import { plasmage } from './plasmage';
import { wrinkleTherapy } from './wrinkleTherapy';
import { beautyTreatments } from './beautyTreatments';
import { photoTherapy } from './photoTherapy';

export const services: Services = {
  'kemijski-piling': chemicalPeel,
  'mezoterapija': mesotherapy,
  'prp': prp,
  'skin-boosteri': skinBoosteri,
  'dermalni-fileri': dermalFillers,
  'plasmage': plasmage,
  'botox': wrinkleTherapy,
  'beauty-tretmani': beautyTreatments,
  'foto-terapija': photoTherapy
};

export type ServiceKey = keyof typeof services;

// Utility function to get popular services
export const getPopularServices = () => {
  const popularServiceIds = ['skin-boosteri', 'mezoterapija', 'plasmage', 'prp'];
  return popularServiceIds.map(id => services[id]).filter(Boolean);
}; 