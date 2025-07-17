// Utility functions for managing cookie consent using localStorage

const CONSENT_KEY = 'cookie_consent';

export type CookieConsentStatus = 'accepted' | 'essential';

export function getCookieConsent(): { status: CookieConsentStatus | null } {
  if (typeof window === 'undefined') return { status: null };
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === 'accepted' || value === 'essential') {
    return { status: value };
  }
  return { status: null };
}

export function setCookieConsent(value: CookieConsentStatus): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_KEY, value);
}

export function clearCookieConsent(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_KEY);
} 