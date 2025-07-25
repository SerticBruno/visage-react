import { comboPackages } from '@/data/comboPackages';
import { ComboPackage } from '@/data/comboPackages';

export function findComboPackagesWithService(serviceId: string): ComboPackage[] {
  return comboPackages.filter(package_ => 
    package_.services.some(service => service.id === serviceId)
  );
}

export function getServiceInComboPackage(serviceId: string, comboPackage: ComboPackage) {
  return comboPackage.services.find(service => service.id === serviceId);
} 