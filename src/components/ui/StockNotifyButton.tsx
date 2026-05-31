'use client';

import { Fragment, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from '@headlessui/react';
import type { Product } from '@/data/products';
import { FaBell, FaCheck, FaTimes } from 'react-icons/fa';

type Variant = 'primary' | 'secondary' | 'icon' | 'quantity';

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) closeModal();
    };
    if (modalOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  const closeModal = () => {
    setModalOpen(false);
    setError('');
    if (!subscribed) setMessage('');
  };

  const absorbPointerEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDismiss = (e: React.MouseEvent) => {
    absorbPointerEvent(e);
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
    variant === 'icon' ? (
      <button
        type="button"
        onMouseDown={absorbPointerEvent}
        onClick={subscribed ? absorbPointerEvent : openModal}
        disabled={subscribed}
        title={subscribed ? message || 'Prijavljeni ste za obavijest' : 'Obavijesti me kad bude na zalihama'}
        className={`p-2 rounded-full shadow transition-all cursor-pointer ${
          subscribed
            ? 'bg-green-500 text-white cursor-default'
            : 'bg-white/90 hover:bg-white text-amber-700 hover:text-amber-800 hover:scale-110'
        } ${className}`}
      >
        {subscribed ? <FaCheck className="w-4 h-4" /> : <FaBell className="w-4 h-4" />}
      </button>
    ) : subscribed ? (
      <div
        className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-green-50 text-green-800 border border-green-200 ${className}`}
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
            ? 'border border-amber-700 text-amber-800 hover:bg-amber-50'
            : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm hover:shadow'
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
        onMouseDown={absorbPointerEvent}
        onClick={absorbPointerEvent}
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
            onMouseDown={absorbPointerEvent}
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
            className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 p-6"
            onMouseDown={absorbPointerEvent}
            onClick={absorbPointerEvent}
          >
            <button
              type="button"
              onMouseDown={absorbPointerEvent}
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
              aria-label="Zatvori"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            {subscribed ? (
              <div className="text-center pt-2">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <FaCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prijava spremljena</h3>
                <p className="text-sm text-gray-600 mb-6">{message}</p>
                <button
                  type="button"
                  onMouseDown={absorbPointerEvent}
                  onClick={handleDismiss}
                  className="w-full rounded-lg bg-gray-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-black cursor-pointer"
                >
                  U redu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-1 pr-8">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <FaBell className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Obavijesti me</h3>
                </div>
                <p className="text-sm text-gray-600 mb-5 pl-[52px]">
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
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onMouseDown={absorbPointerEvent}
                      onClick={handleDismiss}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      Odustani
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 rounded-lg bg-gray-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-black disabled:opacity-50 cursor-pointer"
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
