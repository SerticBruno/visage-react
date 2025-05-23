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
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="relative">
          <div className="absolute -inset-1.5 sm:-inset-2 bg-gray-100 rounded-full opacity-50"></div>
          <div className="relative bg-white p-2 sm:p-3 rounded-full border-2 border-gray-100">
            <Icon size={20} className="text-gray-900" />
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">{title}</h4>
          {Array.isArray(content) ? (
            content.map((line, index) => (
              <p key={index} className="text-gray-600 text-sm sm:text-base">{line}</p>
            ))
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">{content}</p>
          )}
          {link && (
            <a 
              href={link} 
              target={link.startsWith('http') ? '_blank' : undefined}
              rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="mt-1 sm:mt-2 inline-block text-gray-900 hover:text-gray-700 transition-colors font-medium text-sm sm:text-base"
            >
              {linkText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
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
      content: ['Ulica Stjepana i Antuna Radića 37', '44 000, Sisak']
    },
    {
      icon: FaClock,
      title: 'Radno vrijeme',
      content: ['Pon-Pet: 09:00 - 20:00', 'Sub: 09:00 - 15:00']
    },
    {
      icon: FaPhone,
      title: 'Telefon',
      content: '091 110 50 20',
      link: 'tel:+385911105020',
      linkText: 'Nazovite nas'
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      content: 'Javite nam se putem WhatsAppa',
      link: 'https://wa.me/385911105020',
      linkText: 'Pošaljite poruku'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Kontaktirajte nas</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Javite nam se putem kontakt obrasca ili nas posjetite u našem salonu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Contact Form - Left side */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 h-full flex flex-col">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Pošaljite nam poruku</h3>
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                <div className="space-y-4">
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

                <div className="mt-4 pt-4 flex-grow">
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
                    className="w-full bg-gray-900 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base cursor-pointer"
                  >
                    Pošalji poruku
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info and Map - Right side */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Google Maps */}
            <div className="h-64 sm:h-80 lg:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2780.9999999999995!2d16.371999999999998!3d45.483999999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4766a7a7a7a7a7a7%3A0x7a7a7a7a7a7a7a7a!2sUlica%20Stjepana%20i%20Antuna%20Radi%C4%87a%2037%2C%2044000%2C%20Sisak!5e0!3m2!1shr!2shr!4v1234567890!5m2!1shr!2shr"
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