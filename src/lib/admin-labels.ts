const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Na čekanju',
  paid: 'Plaćeno',
  processing: 'U obradi',
  shipped: 'Poslano',
  ready_for_pickup: 'Spremno za preuzimanje',
  completed: 'Završeno',
  cancelled: 'Otkazano',
  abandoned: 'Napušteno',
};

export function orderStatusLabel(status: string): string {
  return ORDER_STATUS_LABELS[status] ?? status;
}

export function orderStatusClass(status: string): string {
  switch (status) {
    case 'paid':
    case 'completed':
      return 'bg-green-50 text-green-700';
    case 'processing':
    case 'shipped':
    case 'ready_for_pickup':
      return 'bg-blue-50 text-blue-700';
    case 'cancelled':
      return 'bg-red-50 text-red-700';
    case 'abandoned':
      return 'bg-orange-50 text-orange-700';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('hr-HR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso));
}

const PURCHASE_ORDER_STATUS_LABELS: Record<string, string> = {
  ordered: 'Naručeno',
  received: 'Primljeno',
  cancelled: 'Otkazano',
};

export function purchaseOrderStatusLabel(status: string): string {
  return PURCHASE_ORDER_STATUS_LABELS[status] ?? status;
}

export function purchaseOrderStatusClass(status: string): string {
  switch (status) {
    case 'received':
      return 'bg-green-50 text-green-700';
    case 'ordered':
      return 'bg-amber-50 text-amber-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

export function shortId(id: string): string {
  return id.slice(0, 8).toUpperCase();
}
