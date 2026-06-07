'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from '@headlessui/react';
import type { Product } from '@/data/products';
import { FaBell, FaCheck, FaTimes } from 'react-icons/fa';

type Variant = 'primary' | 'secondary' | 'icon' | 'quantity' | 'card';

const SUBSCRIBED_BUTTON_CLASSES =
  'bg-[#5ba2ff] text-white shadow-[0_4px_6px_-1px_rgb(91_162_255_/_0.35),0_2px_4px_-2px_rgb(91_162_255_/_0.25)]';

interface Props {
  product: Product;
  variant?: Variant;
  className?: string;
}

export default function StockNotifyButton({ product, variant = 'primary', className = '' }: Props) {
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [dismissShield, setDismissShield] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setError('');
    setMessage((prev) => (subscribed ? prev : ''));
  }, [subscribed]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) closeModal();
    };
    if (modalOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalOpen, closeModal]);

  const absorbPointerEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const stopClickPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDismiss = (e: React.MouseEvent) => {
    stopClickPropagation(e);
    closeModal();
    setDismissShield(true);
    window.setTimeout(() => setDismissShield(false), 400);
  };

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(true);
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/stock-notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, email }),
      });
      const data = await res.json();

      if (res.ok) {
        setSubscribed(true);
        setMessage(data.message ?? 'Obavijestit ćemo vas čim proizvod bude opet na zalihama.');
        setEmail('');
      } else {
        setError(data.error ?? 'Došlo je do greške. Pokušajte ponovno.');
      }
    } catch {
      setError('Došlo je do greške. Pokušajte ponovno.');
    } finally {
      setSubmitting(false);
    }
  };

  const triggerButton =
    variant === 'card' ? (
      <button
        type="button"
        onMouseDown={absorbPointerEvent}
        onClick={subscribed ? absorbPointerEvent : openModal}
        disabled={subscribed}
        title={subscribed ? message || 'Prijavljeni ste za obavijest' : 'Obavijesti me kad bude na zalihama'}
        className={`group flex items-center justify-center gap-1 sm:gap-1.5 min-w-0 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium shadow-sm transform-gpu transition-all duration-200 ease-out cursor-pointer ${
          subscribed
            ? `${SUBSCRIBED_BUTTON_CLASSES} cursor-default`
            : 'bg-slate-200 text-slate-700 border border-slate-300 hover:bg-slate-300 hover:text-slate-800 hover:border-slate-400 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-500/15 active:translate-y-0 active:scale-[0.98]'
        } ${className}`}
      >
        {subscribed ? (
          <FaCheck className="w-3.5 h-3.5 flex-shrink-0" />
        ) : (
          <FaBell className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-12" />
        )}
        <span className="truncate">
          {subscribed ? 'Prijavljeno' : (
            <>
              <span className="sm:hidden">Obavijesti</span>
              <span className="hidden sm:inline">Obavijesti me</span>
            </>
          )}
        </span>
      </button>
    ) : variant === 'icon' ? (
      <button
        type="button"
        onMouseDown={absorbPointerEvent}
        onClick={subscribed ? absorbPointerEvent : openModal}
        disabled={subscribed}
        title={subscribed ? message || 'Prijavljeni ste za obavijest' : 'Obavijesti me kad bude na zalihama'}
        className={`p-2 rounded-full shadow transition-all cursor-pointer ${
          subscribed
            ? `${SUBSCRIBED_BUTTON_CLASSES} cursor-default`
            : 'bg-white/90 hover:bg-white text-slate-700 hover:text-slate-800 hover:scale-110'
        } ${className}`}
      >
        {subscribed ? <FaCheck className="w-4 h-4" /> : <FaBell className="w-4 h-4" />}
      </button>
    ) : subscribed ? (
      <div
        className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium scale-[1.02] ${SUBSCRIBED_BUTTON_CLASSES} ${className}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
      >
        <FaCheck className="w-4 h-4 shrink-0" />
        <span className="text-left">{message || 'Obavijestit ćemo vas čim proizvod bude opet na zalihama.'}</span>
      </div>
    ) : (
      <button
        type="button"
        onMouseDown={absorbPointerEvent}
        onClick={openModal}
        className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
          variant === 'secondary'
            ? 'border border-slate-700 text-slate-800 hover:bg-slate-50'
            : 'bg-slate-700 hover:bg-slate-800 text-white shadow-sm hover:shadow'
        } ${className}`}
      >
        <FaBell className="w-4 h-4 shrink-0" />
        Obavijesti me
      </button>
    );

  const modal = (
    <Transition appear show={modalOpen} as={Fragment}>
      <div
        className="fixed inset-0 z-[10050] flex items-center justify-center p-4"
        onMouseDown={stopClickPropagation}
        onClick={stopClickPropagation}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleDismiss}
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 p-6"
            onMouseDown={stopClickPropagation}
            onClick={stopClickPropagation}
          >
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
              aria-label="Zatvori"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            {subscribed ? (
              <div className="text-center pt-2">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#5ba2ff]/15 text-[#5ba2ff]">
                  <FaCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Prijava spremljena</h3>
                <p className="text-sm text-slate-600 mb-6">{message}</p>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full rounded-lg bg-slate-700 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800 cursor-pointer"
                >
                  U redu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-1 pr-8">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                    <FaBell className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Obavijesti me</h3>
                </div>
                <p className="text-sm text-slate-600 mb-5 pl-[52px]">
                  Javit ćemo vam na email kad <span className="font-medium">{product.title}</span> bude opet na
                  zalihama.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor={`stock-notify-email-${product.id}`} className="sr-only">
                      Email adresa
                    </label>
                    <input
                      id={`stock-notify-email-${product.id}`}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vaš@email.com"
                      required
                      autoFocus
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/40 focus:border-slate-600"
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Odustani
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 rounded-lg bg-slate-700 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? 'Spremanje…' : 'Obavijesti me'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );

  return (
    <>
      {triggerButton}
      {mounted ? createPortal(modal, document.body) : null}
      {mounted && dismissShield
        ? createPortal(
            <div
              className="fixed inset-0 z-[10051]"
              aria-hidden
              onMouseDown={absorbPointerEvent}
              onClick={absorbPointerEvent}
            />,
            document.body
          )
        : null}
    </>
  );
}
