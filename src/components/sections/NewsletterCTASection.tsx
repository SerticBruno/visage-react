'use client';

import Image from 'next/image';
import { useState } from 'react';

const NewsletterCTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Uspješno ste se prijavili na newsletter!');
        setEmail('');
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Došlo je do greške. Molimo pokušajte ponovno.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Došlo je do greške. Molimo pokušajte ponovno.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/services/toskani-woman-visage-estetski-studio.webp"
            alt="VISAGE Studio Newsletter"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))' }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Budite u toku s najnovijim ponudama
          </h2>
          <p className="text-xl text-slate-200 mb-8">
            Prijavite se na naš newsletter i budite prvi koji će saznati za nove tretmane, akcije i posebne ponude.
          </p>
          
          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Vaša email adresa"
              className="flex-1 px-6 py-3 rounded-full bg-white/10 text-white placeholder-slate-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 text-white rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(to right, rgb(30, 41, 59), rgb(15, 23, 42))' }}
            >
              {isSubmitting ? 'Slanje...' : 'Prijavi se'}
            </button>
          </form>
          
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <p className="text-green-400 text-sm mt-3">{submitMessage}</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-400 text-sm mt-3">{submitMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTASection; 