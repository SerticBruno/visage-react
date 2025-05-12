export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

interface DataLayerEvent {
  event: string;
  page?: string;
  eventAction?: string;
  eventCategory?: string;
  eventLabel?: string;
  eventValue?: number;
  consent_state?: {
    analytics_storage: 'granted' | 'denied';
    ad_storage: 'granted' | 'denied';
    functionality_storage: 'granted' | 'denied';
    personalization_storage: 'granted' | 'denied';
    security_storage: 'granted' | 'denied';
  };
}

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}

export const pageview = (url: string) => {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    })
  }
}

export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'event',
      eventAction: action,
      eventCategory: category,
      eventLabel: label,
      eventValue: value,
    })
  }
} 