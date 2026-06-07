import type { DeliveryMethod } from '@/lib/shipping';

export type OrderCheckoutFields = {
  customer_email: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  delivery_method: string | null;
  shipping_address: Record<string, unknown> | null;
};

export type CheckoutPrefill = {
  name: string;
  email: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  street: string;
  city: string;
  zip: string;
  boxnowLockerId: string;
  boxnowLockerName: string;
  boxnowLockerAddress: string;
  notes: string;
  promoCode: string;
};

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function isOrderReadyForDirectPayment(order: OrderCheckoutFields): boolean {
  if (!str(order.customer_name)) return false;
  if (!str(order.customer_email).includes('@')) return false;
  if (!str(order.customer_phone)) return false;

  const method = order.delivery_method as DeliveryMethod | null;
  const addr = order.shipping_address ?? {};

  if (method === 'boxnow') {
    return !!str(addr.locker_id);
  }
  if (method === 'gls') {
    return !!str(addr.street) && !!str(addr.city) && !!str(addr.zip);
  }
  if (method === 'pickup') {
    return true;
  }

  return false;
}

export function orderToCheckoutPrefill(order: {
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  delivery_method: string | null;
  shipping_address: Record<string, unknown> | null;
  notes: string | null;
  promo_code: string | null;
}): CheckoutPrefill {
  const addr = order.shipping_address ?? {};
  const deliveryMethod = (order.delivery_method as DeliveryMethod) || 'boxnow';

  return {
    name: str(order.customer_name),
    email: str(order.customer_email),
    phone: str(order.customer_phone),
    deliveryMethod,
    street: str(addr.street),
    city: str(addr.city),
    zip: str(addr.zip),
    boxnowLockerId: str(addr.locker_id),
    boxnowLockerName: str(addr.locker_name),
    boxnowLockerAddress: str(addr.locker_address),
    notes: str(order.notes),
    promoCode: str(order.promo_code),
  };
}

export function buildShippingAddress(
  deliveryMethod: DeliveryMethod,
  input: Pick<
    CheckoutPrefill,
    'street' | 'city' | 'zip' | 'boxnowLockerId' | 'boxnowLockerName' | 'boxnowLockerAddress'
  >
): Record<string, string> {
  if (deliveryMethod === 'gls') {
    return {
      street: input.street.trim(),
      city: input.city.trim(),
      zip: input.zip.trim(),
      country: 'HR',
    };
  }
  if (deliveryMethod === 'boxnow') {
    return {
      locker_id: input.boxnowLockerId.trim(),
      locker_name: input.boxnowLockerName.trim(),
      locker_address: input.boxnowLockerAddress.trim(),
    };
  }
  return {};
}
