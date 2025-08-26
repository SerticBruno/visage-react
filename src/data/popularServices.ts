import { getPopularServices } from './services';

const services = getPopularServices();

export const popularServices = services.map(service => ({
  id: service.id,
  title: service.title,
  description: service.previewDescription || service.description,
  image: service.heroImage || service.image,
  link: `/usluge/${service.id}`,
  features: service.benefits?.slice(0, 3) || [
    'Profesionalni tretman',
    'Sigurnost i kvaliteta',
    'Vidljivi rezultati'
  ]
}));
