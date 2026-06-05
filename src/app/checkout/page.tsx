'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice, parsePriceCents } from '@/lib/price-utils';
import {
  SHIPPING_OPTIONS,
  calculateShippingCents,
  DeliveryMethod,
  getAmountUntilFreeShippingCents,
  getFreeShippingThresholdLabel,
  qualifiesForFreeShipping,
} from '@/lib/shipping';
import {
  calculateDiscountCents,
  type PromoCode,
  resolvePromoCode,
} from '@/lib/promo-codes';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaLock, FaBoxOpen, FaTruck, FaStore, FaMapMarkerAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  // GLS fields
  street: string;
  city: string;
  zip: string;
  // BoxNow
  boxnowLockerId: string;
  boxnowLockerName: string;
  boxnowLockerAddress: string;
  // Terms
  agreeTerms: boolean;
  notes: string;
}

type ValidatedField =
  | 'name'
  | 'email'
  | 'phone'
  | 'boxnowLockerId'
  | 'street'
  | 'city'
  | 'zip'
  | 'agreeTerms';

const VALIDATION_FIELD_ORDER: ValidatedField[] = [
  'name',
  'email',
  'phone',
  'boxnowLockerId',
  'street',
  'city',
  'zip',
  'agreeTerms',
];

const DELIVERY_ICONS: Record<DeliveryMethod, React.ReactNode> = {
  boxnow: <FaBoxOpen className="w-5 h-5" />,
  gls: <FaTruck className="w-5 h-5" />,
  pickup: <FaStore className="w-5 h-5" />,
};

export default function CheckoutPage() {
  const { items, subtotalCents, finishCheckoutLoading, closeCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    finishCheckoutLoading();
    closeCart();
  }, [finishCheckoutLoading, closeCart]);

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    deliveryMethod: 'boxnow',
    street: '',
    city: '',
    zip: '',
    boxnowLockerId: '',
    boxnowLockerName: '',
    boxnowLockerAddress: '',
    agreeTerms: false,
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ValidatedField, string>>>({});
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');

  const selectedShipping = SHIPPING_OPTIONS.find((o) => o.id === form.deliveryMethod)!;
  const shippingCents = calculateShippingCents(form.deliveryMethod, subtotalCents);
  const discountCents = appliedPromo
    ? calculateDiscountCents(subtotalCents, appliedPromo.percentOff)
    : 0;
  const totalCents = subtotalCents - discountCents + shippingCents;
  const freeShipping = qualifiesForFreeShipping(subtotalCents);
  const untilFreeShippingCents = getAmountUntilFreeShippingCents(subtotalCents);

  const applyPromoCode = () => {
    const promo = resolvePromoCode(promoInput);
    if (!promo) {
      setPromoError('Kod za popust nije valjan');
      setAppliedPromo(null);
      return;
    }
    setPromoError('');
    setAppliedPromo(promo);
    setPromoInput(promo.code);
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError('');
  };

  const clearFieldError = useCallback((field: ValidatedField) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-gray-500 mb-6">Košarica je prazna.</p>
        <Link href="/katalog" className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors">
          Idi na katalog
        </Link>
      </div>
    );
  }

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field in fieldErrors) {
      clearFieldError(field as ValidatedField);
    }
  };

  const scrollToField = (field: ValidatedField) => {
    const el = document.getElementById(`checkout-field-${field}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const focusable = el.querySelector<HTMLElement>(
      'input:not([type="radio"]):not([type="checkbox"]), textarea, button, select'
    );
    focusable?.focus({ preventScroll: true });
  };

  const inputClassName = (field: ValidatedField) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 ${
      fieldErrors[field]
        ? 'border-red-300 focus:ring-red-400/60 bg-red-50/30'
        : 'border-gray-200 focus:ring-gray-400/50'
    }`;

  const openBoxNowWidget = () => {
    // BoxNow widget integration point
    // When BoxNow credentials are configured, replace this with:
    // boxnowDeliveryWidget.open({ apiKey: process.env.NEXT_PUBLIC_BOXNOW_API_KEY, ... })
    // and receive locker selection via callback
    alert('BoxNow widget će biti aktivan nakon aktivacije ugovora. Trenutno koristite test mod.\n\nU produkciji: pritisnite za odabir paketomata na mapi.');
    // Temp mock selection for testing
    setForm((prev) => ({
      ...prev,
      boxnowLockerId: 'BN-SISAK-001',
      boxnowLockerName: 'BoxNow - Sisak, Capraška ulica',
      boxnowLockerAddress: 'Capraška ulica 6, Sisak',
    }));
    clearFieldError('boxnowLockerId');
  };

  const getValidationErrors = (): Partial<Record<ValidatedField, string>> => {
    const errors: Partial<Record<ValidatedField, string>> = {};

    if (!form.name.trim()) errors.name = 'Unesite ime i prezime';
    if (!form.email.trim() || !form.email.includes('@')) errors.email = 'Unesite ispravnu email adresu';
    if (!form.phone.trim()) errors.phone = 'Unesite broj telefona';

    if (form.deliveryMethod === 'boxnow' && !form.boxnowLockerId) {
      errors.boxnowLockerId = 'Odaberite BoxNow paketomat';
    }
    if (form.deliveryMethod === 'gls') {
      if (!form.street.trim()) errors.street = 'Unesite ulicu i broj';
      if (!form.city.trim()) errors.city = 'Unesite grad';
      if (!form.zip.trim()) errors.zip = 'Unesite poštanski broj';
    }

    if (!form.agreeTerms) errors.agreeTerms = 'Morate prihvatiti uvjete kupnje';

    return errors;
  };

  const getFirstInvalidField = (
    errors: Partial<Record<ValidatedField, string>>
  ): ValidatedField | null => {
    for (const field of VALIDATION_FIELD_ORDER) {
      if (field === 'boxnowLockerId' && form.deliveryMethod !== 'boxnow') continue;
      if ((field === 'street' || field === 'city' || field === 'zip') && form.deliveryMethod !== 'gls') {
        continue;
      }
      if (errors[field]) return field;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = getValidationErrors();
    const firstInvalidField = getFirstInvalidField(errors);

    if (firstInvalidField) {
      setFieldErrors(errors);
      setError('');
      scrollToField(firstInvalidField);
      return;
    }

    setFieldErrors({});
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
          customer: { name: form.name, email: form.email, phone: form.phone },
          deliveryMethod: form.deliveryMethod,
          shippingAddress:
            form.deliveryMethod === 'gls'
              ? { street: form.street, city: form.city, zip: form.zip, country: 'HR' }
              : form.deliveryMethod === 'boxnow'
              ? {
                  locker_id: form.boxnowLockerId,
                  locker_name: form.boxnowLockerName,
                  locker_address: form.boxnowLockerAddress,
                }
              : {},
          notes: form.notes,
          promoCode: appliedPromo?.code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Greška pri kreiranju narudžbe. Pokušajte ponovo.');
        return;
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        router.push(data.url);
      }
    } catch {
      setError('Mrežna greška. Provjerite internetsku vezu i pokušajte ponovo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/katalog#produkti"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          <FaArrowLeft className="w-3 h-3" />
          Natrag na katalog
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">Plaćanje</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left column - form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Customer info */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Podaci kupca</h2>
                <div className="space-y-4">
                  <div id="checkout-field-name">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ime i prezime <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set('name')}
                      className={inputClassName('name')}
                      placeholder="Ime i prezime"
                      autoComplete="name"
                      aria-invalid={!!fieldErrors.name}
                    />
                    {fieldErrors.name && (
                      <p className="text-xs text-red-600 mt-1.5">{fieldErrors.name}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div id="checkout-field-email">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        className={inputClassName('email')}
                        placeholder="ana@example.com"
                        autoComplete="email"
                        aria-invalid={!!fieldErrors.email}
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-red-600 mt-1.5">{fieldErrors.email}</p>
                      )}
                    </div>
                    <div id="checkout-field-phone">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        className={inputClassName('phone')}
                        placeholder="+385 91 234 5678"
                        autoComplete="tel"
                        aria-invalid={!!fieldErrors.phone}
                      />
                      {fieldErrors.phone && (
                        <p className="text-xs text-red-600 mt-1.5">{fieldErrors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Delivery method */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-base font-semibold text-gray-900 mb-1">Način dostave</h2>
                <p className="text-xs text-gray-500 mb-4">
                  Besplatna dostava (BoxNow i GLS) za narudžbe iznad {getFreeShippingThresholdLabel()}
                </p>
                <div className="space-y-3">
                  {SHIPPING_OPTIONS.map((option) => {
                    const optionShippingCents = calculateShippingCents(option.id, subtotalCents);
                    return (
                    <label
                      key={option.id}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        form.deliveryMethod === option.id
                          ? 'border-gray-800 bg-gray-50'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={option.id}
                        checked={form.deliveryMethod === option.id}
                        onChange={() => {
                          setForm((p) => ({ ...p, deliveryMethod: option.id }));
                          setFieldErrors((prev) => {
                            const next = { ...prev };
                            delete next.boxnowLockerId;
                            delete next.street;
                            delete next.city;
                            delete next.zip;
                            return next;
                          });
                        }}
                        className="mt-0.5"
                      />
                      <span className="text-gray-600 mt-0.5">{DELIVERY_ICONS[option.id]}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 text-sm">{option.label}</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {optionShippingCents === 0 ? 'Besplatno' : formatPrice(optionShippingCents)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Procijenjeni rok: {option.estimatedDays}</p>
                      </div>
                    </label>
                    );
                  })}
                </div>

                {/* BoxNow locker picker */}
                {form.deliveryMethod === 'boxnow' && (
                  <div
                    id="checkout-field-boxnowLockerId"
                    className={`mt-4 p-4 rounded-xl border ${
                      fieldErrors.boxnowLockerId
                        ? 'bg-red-50 border-red-200'
                        : 'bg-blue-50 border-blue-100'
                    }`}
                  >
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <FaMapMarkerAlt className="w-4 h-4 text-blue-500" />
                      Odabrani paketomat
                    </h3>
                    {form.boxnowLockerId ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{form.boxnowLockerName}</p>
                          <p className="text-xs text-gray-500">{form.boxnowLockerAddress}</p>
                        </div>
                        <button
                          type="button"
                          onClick={openBoxNowWidget}
                          className="text-xs text-blue-600 hover:text-blue-800 underline ml-3 cursor-pointer"
                        >
                          Promijeni
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={openBoxNowWidget}
                        className={`w-full py-2.5 px-4 bg-white border text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                          fieldErrors.boxnowLockerId
                            ? 'border-red-300 text-red-700 hover:bg-red-50'
                            : 'border-blue-200 text-blue-700 hover:bg-blue-50'
                        }`}
                      >
                        Odaberi paketomat na mapi
                      </button>
                    )}
                    {fieldErrors.boxnowLockerId && (
                      <p className="text-xs text-red-600 mt-2">{fieldErrors.boxnowLockerId}</p>
                    )}
                  </div>
                )}

                {/* GLS address */}
                {form.deliveryMethod === 'gls' && (
                  <div className="mt-4 space-y-3">
                    <div id="checkout-field-street">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ulica i broj <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.street}
                        onChange={set('street')}
                        className={inputClassName('street')}
                        placeholder="Ilica 1"
                        autoComplete="street-address"
                        aria-invalid={!!fieldErrors.street}
                      />
                      {fieldErrors.street && (
                        <p className="text-xs text-red-600 mt-1.5">{fieldErrors.street}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div id="checkout-field-city">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Grad <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.city}
                          onChange={set('city')}
                          className={inputClassName('city')}
                          placeholder="Zagreb"
                          autoComplete="address-level2"
                          aria-invalid={!!fieldErrors.city}
                        />
                        {fieldErrors.city && (
                          <p className="text-xs text-red-600 mt-1.5">{fieldErrors.city}</p>
                        )}
                      </div>
                      <div id="checkout-field-zip">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Poštanski broj <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.zip}
                          onChange={set('zip')}
                          className={inputClassName('zip')}
                          placeholder="10000"
                          autoComplete="postal-code"
                          aria-invalid={!!fieldErrors.zip}
                        />
                        {fieldErrors.zip && (
                          <p className="text-xs text-red-600 mt-1.5">{fieldErrors.zip}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Notes */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Napomena uz narudžbu (neobavezno)</h2>
                <textarea
                  value={form.notes}
                  onChange={set('notes')}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400/50 resize-none"
                  placeholder="Posebne upute za dostavu ili napomena za studio..."
                />
              </section>
            </div>

            {/* Right column - order summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24 space-y-4">
                <h2 className="text-base font-semibold text-gray-900">Pregled narudžbe</h2>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className={`object-contain ${item.product.imageNeedsResize ? 'scale-75' : ''}`}
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.product.title}</p>
                        <p className="text-xs text-gray-500">Kol: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900 flex-shrink-0">
                        {formatPrice(parsePriceCents(item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo code */}
                <div className="border-t border-gray-100 pt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kod za popust
                  </label>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-emerald-800 truncate">
                          {appliedPromo.code}
                        </p>
                        <p className="text-xs text-emerald-600">{appliedPromo.label}</p>
                      </div>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="text-xs text-emerald-700 hover:text-emerald-900 underline flex-shrink-0 cursor-pointer"
                      >
                        Ukloni
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          setPromoError('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            applyPromoCode();
                          }
                        }}
                        className="flex-1 min-w-0 border border-gray-200 rounded-lg px-3 py-2 text-sm uppercase focus:outline-none focus:ring-1 focus:ring-gray-400/50"
                        placeholder="Unesite kod"
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        onClick={applyPromoCode}
                        className="px-3 py-2 text-sm font-medium text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0 cursor-pointer"
                      >
                        Primijeni
                      </button>
                    </div>
                  )}
                  {promoError && (
                    <p className="text-xs text-red-600 mt-1.5">{promoError}</p>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Proizvodi</span>
                    <span>{formatPrice(subtotalCents)}</span>
                  </div>
                  {discountCents > 0 && appliedPromo && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Popust ({appliedPromo.percentOff}%)</span>
                      <span>−{formatPrice(discountCents)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Dostava ({selectedShipping.label})</span>
                    <span className={shippingCents === 0 && freeShipping ? 'text-emerald-700' : ''}>
                      {shippingCents === 0 ? 'Besplatno' : formatPrice(shippingCents)}
                    </span>
                  </div>
                  {!freeShipping && untilFreeShippingCents > 0 && (
                    <p className="text-xs text-gray-500">
                      Još {formatPrice(untilFreeShippingCents)} do besplatne dostave
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-gray-900">
                  <span>Ukupno</span>
                  <span>{formatPrice(totalCents)}</span>
                </div>

                {/* Terms checkbox */}
                <div
                  id="checkout-field-agreeTerms"
                  className={`rounded-lg border px-3 py-2.5 ${
                    fieldErrors.agreeTerms
                      ? 'border-red-200 bg-red-50/40'
                      : 'border-transparent'
                  }`}
                >
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agreeTerms}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, agreeTerms: e.target.checked }));
                        if (e.target.checked) clearFieldError('agreeTerms');
                      }}
                      className="mt-0.5 rounded"
                      aria-invalid={!!fieldErrors.agreeTerms}
                    />
                    <span className="text-xs text-gray-600">
                      Prihvaćam{' '}
                      <Link href="/uvjeti-kupnje" target="_blank" className="underline hover:text-gray-900">
                        Uvjete kupnje
                      </Link>{' '}
                      i{' '}
                      <Link href="/povrat-i-reklamacije" target="_blank" className="underline hover:text-gray-900">
                        Politiku povrata
                      </Link>
                    </span>
                  </label>
                  {fieldErrors.agreeTerms && (
                    <p className="text-xs text-red-600 mt-1.5 ml-6" aria-live="polite">
                      {fieldErrors.agreeTerms}
                    </p>
                  )}
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-xl transition-colors cursor-pointer"
                >
                  <FaLock className="w-3.5 h-3.5" />
                  {loading ? 'Preusmjeravanje...' : `Plati ${formatPrice(totalCents)}`}
                </button>

                <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                  <FaLock className="w-3 h-3" />
                  Sigurno plaćanje putem Stripe
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
