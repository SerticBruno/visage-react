'use client';

import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock, FaWhatsapp } from 'react-icons/fa';
import { IconType } from 'react-icons';

const ContactInfoCard = ({ icon: Icon, title, content, link, linkText }: { 
  icon: IconType, 
  title: string, 
  content: string | string[], 
  link?: string,
  linkText?: string 
}) => {
  const CardContent = () => (
    <div className="flex items-start space-x-3 sm:space-x-4 h-full">
      <div className="relative flex-shrink-0">
        <div className="absolute -inset-1.5 sm:-inset-2 bg-gray-100 rounded-full opacity-50"></div>
        <div className="relative bg-white p-2 sm:p-3 rounded-full border-2 border-gray-100">
          <Icon size={20} className="text-gray-900" />
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">{title}</h4>
        <div className="flex-grow">
          {Array.isArray(content) ? (
            content.map((line, index) => (
              <p key={index} className="text-gray-600 text-sm sm:text-base">{line}</p>
            ))
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">{content}</p>
          )}
        </div>
        {linkText && (
          <span className="mt-1 sm:mt-2 inline-block text-gray-900 hover:text-gray-700 transition-colors font-medium text-sm sm:text-base">
            {linkText}
          </span>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <a 
        href={link} 
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 hover:shadow-2xl transition-shadow duration-300 hover:bg-gray-50"
      >
        <CardContent />
      </a>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 hover:shadow-2xl transition-shadow duration-300">
      <CardContent />
    </div>
  );
};

const ContactSection = ({ hasTopPadding = true }: { hasTopPadding?: boolean }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Poruka je uspješno poslana! Javit ćemo vam se u najkraćem mogućem roku.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovno.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovno.');
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

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Adresa',
      content: ['Ulica Stjepana i Antuna Radića 49', '44 000, Sisak'],
      link: 'https://www.google.com/maps/dir//Ulica+Stjepana+i+Antuna+Radića+49,+44000,+Sisak/@45.4839999,16.3719999,17z',
      linkText: 'Pronađite nas'
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      content: 'Javite nam se putem WhatsAppa',
      link: 'https://wa.me/385911105020',
      linkText: 'Pošaljite poruku'
    },
    {
      icon: FaPhone,
      title: 'Telefon',
      content: '091 110 50 20',
      link: 'tel:+385911105020',
      linkText: 'Nazovite nas'
    },
    {
      icon: FaClock,
      title: 'Radno vrijeme',
      content: ['Po dogovoru']
    }
  ];

  return (
    <section style={{ background: 'linear-gradient(to bottom, #e5e7eb, #ffffff)' }}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${hasTopPadding ? 'pt-16' : ''} pb-12 relative`}>
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Dogovorite termin</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Javite nam se putem kontakt obrasca ili preko društvenih mreža
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Contact Form - Left side */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 h-full flex flex-col">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Pošaljite nam poruku</h3>
              
              {submitStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Hvala vam!</h4>
                  <p className="text-gray-600 mb-6 max-w-sm">
                    Vaša poruka je uspješno poslana. Javit ćemo vam se u najkraćem mogućem roku.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitStatus('idle');
                      setSubmitMessage('');
                    }}
                    className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Pošaljite novu poruku
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                  <div className={`space-y-4 transition-all duration-500 ${
                    submitStatus === 'error' ? 'opacity-50 scale-95' : ''
                  }`}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Ime i prezime
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>

                  <div className={`mt-4 pt-4 flex-grow transition-all duration-500 ${
                    submitStatus === 'error' ? 'opacity-50 scale-95' : ''
                  }`}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Poruka
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full h-full min-h-[200px] px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors text-sm sm:text-base resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="mt-6 pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gray-900 hover:bg-gray-800 cursor-pointer'
                      } text-white`}
                    >
                      {isSubmitting ? 'Slanje...' : 'Pošalji poruku'}
                    </button>
                    
                    {submitStatus === 'error' && (
                      <div className="mt-4 p-3 rounded-lg text-sm bg-red-50 text-red-800 border border-red-200">
                        {submitMessage}
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info and Map - Right side */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Google Maps */}
            <div className="h-64 sm:h-80 lg:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.9999999999995!2d16.371999999999998!3d45.483999999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4766a7a7a7a7a7a7%3A0x7a7a7a7a7a7a7a7a!2sUlica%20Stjepana%20i%20Antuna%20Radi%C4%87a%2049%2C%2044000%2C%20Sisak!5e0!3m2!1shr!2shr!4v1234567890!5m2!1shr!2shr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {contactInfo.map((info, index) => (
                <ContactInfoCard key={index} {...info} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 