'use client';

import { useState } from 'react';

export default function NewsletterAdminPage() {
  const [formData, setFormData] = useState({
    subject: '',
    htmlContent: '',
    textContent: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        setFormData({ subject: '', htmlContent: '', textContent: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Došlo je do greške prilikom slanja newslettera.');
      }
    } catch (error) {
      console.error('Newsletter sending error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Došlo je do greške prilikom slanja newslettera.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Slanje Newslettera
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Naslov emaila *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="htmlContent" className="block text-sm font-medium text-gray-700 mb-2">
                HTML sadržaj *
              </label>
              <textarea
                id="htmlContent"
                name="htmlContent"
                value={formData.htmlContent}
                onChange={handleChange}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="<h1>Naslov</h1><p>Sadržaj newslettera...</p>"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="textContent" className="block text-sm font-medium text-gray-700 mb-2">
                Tekstualni sadržaj (opcionalno)
              </label>
              <textarea
                id="textContent"
                name="textContent"
                value={formData.textContent}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tekstualna verzija newslettera za email klijente koji ne podržavaju HTML..."
                disabled={isSubmitting}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Slanje...' : 'Pošalji Newsletter'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-600 text-sm">{submitMessage}</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-sm">{submitMessage}</p>
              )}
            </div>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Napomene:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Newsletter će biti poslan svim pretplatnicima iz Brevo liste</li>
              <li>• HTML sadržaj je obavezan</li>
              <li>• Tekstualni sadržaj se automatski generira iz HTML-a ako nije unesen</li>
              <li>• Provjerite sadržaj prije slanja jer se ne može opozvati</li>
              <li>• Preporučujemo korištenje Brevo dashboard-a za profesionalne newslettere</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 