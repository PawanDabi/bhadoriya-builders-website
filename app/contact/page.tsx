"use client";

import { useState } from "react";
import Image from "next/image";
import { useContactModal } from "@/contexts/ContactModalContext";

export default function ContactPage() {
  const { isOpen: isModalOpen, openModal, closeModal } = useContactModal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We'll contact you soon.");
    closeModal();
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <div className="mt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] animate-pulse"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 animate-fadeInDown">
              <span className="text-golden-400 font-semibold tracking-[0.3em] text-sm uppercase">
                Get In Touch
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fadeInUp">
              Let's Build Something
              <span className="block text-golden-400">Amazing Together</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 animate-fadeInUp animation-delay-200">
              Ready to start your dream project? We're here to help bring your vision to life
            </p>
            <button
              onClick={openModal}
              className="group relative px-12 py-5 bg-golden-500 hover:bg-golden-600 text-white font-semibold text-xl rounded-lg overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-golden-500/50 animate-fadeInUp animation-delay-400"
            >
              <span className="relative z-10 flex items-center justify-center">
                Open Contact Form
                <svg className="w-6 h-6 ml-3 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-golden-600 to-golden-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                ),
                title: "Call Us",
                info: "(555) 123-4567",
                subInfo: "Mon-Fri 8AM-6PM",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                ),
                title: "Email Us",
                info: "info@elegancebuild.com",
                subInfo: "24/7 Support",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                ),
                title: "Visit Us",
                info: "123 Builder Street",
                subInfo: "Construction City, CA",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-golden-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              >
                <div className="w-16 h-16 bg-golden-100 rounded-xl flex items-center justify-center text-golden-600 mb-6 group-hover:bg-golden-500 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-lg text-gray-700 font-semibold mb-1">{item.info}</p>
                <p className="text-gray-500">{item.subInfo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Us Here
            </h2>
            <p className="text-xl text-gray-600">
              Visit our office or get directions to start your project consultation
            </p>
          </div>
          <div className="rounded-[2rem] overflow-hidden shadow-2xl h-[400px] md:h-[500px] lg:h-[600px] relative border-4 border-golden-200">
            <iframe
              src="https://www.google.com/maps?q=22.719,75.838&hl=en&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bhadoriya Builders & Developers Office Location"
              className="w-full h-full"
            ></iframe>
            {/* Overlay with address on mobile */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 md:hidden">
              <p className="text-white font-semibold text-lg">Bhadoriya Builders & Developers</p>
              <p className="text-white/90 text-sm">Indore, Madhya Pradesh</p>
            </div>
          </div>
          {/* Quick Actions Below Map */}
          <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
            <a
              href="https://www.google.com/maps?q=22.719,75.838"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-golden-50 border-2 border-golden-400 text-golden-600 font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Open in Google Maps
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=22.719,75.838"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-600 hover:to-golden-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Beautiful Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Blurred Background Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fadeIn"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:text-golden-500 transition-all duration-300 hover:rotate-90"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <div className="grid md:grid-cols-2 min-h-[600px]">
              {/* Left Side - Welcome Section */}
              <div className="relative bg-gradient-to-br from-golden-500 via-golden-600 to-golden-700 p-12 flex flex-col justify-center text-white overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 animate-pulse animation-delay-1000"></div>

                <div className="relative z-10">
                  <div className="mb-8 animate-fadeInLeft">
                    <div className="w-20 h-1 bg-white/50 mb-6"></div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                      Hello,<br />Welcome!
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                      Start your journey with us today
                    </p>
                  </div>

                  <div className="space-y-4 animate-fadeInLeft animation-delay-200">
                    {[
                      { icon: "✓", text: "Free Consultation" },
                      { icon: "✓", text: "Expert Guidance" },
                      { icon: "✓", text: "24/7 Support" },
                      { icon: "✓", text: "Trusted by 500+ Clients" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-bold">{item.icon}</span>
                        </div>
                        <span className="text-lg">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 animate-fadeInLeft animation-delay-400">
                    <p className="text-white/80 italic">
                      "Your dream project is just a conversation away"
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="p-12 bg-white overflow-y-auto max-h-[600px]">
                <div className="animate-fadeInRight">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Get In Touch</h3>
                  <p className="text-gray-600 mb-8">Fill out the form and we'll be in touch soon!</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="transform transition-all duration-300 hover:scale-[1.02]">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-golden-500 focus:bg-white transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="transform transition-all duration-300 hover:scale-[1.02]">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-golden-500 focus:bg-white transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="transform transition-all duration-300 hover:scale-[1.02]">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-golden-500 focus:bg-white transition-all duration-300"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div className="transform transition-all duration-300 hover:scale-[1.02]">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Interested In *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-golden-500 focus:bg-white transition-all duration-300"
                      >
                        <option value="">Select a service</option>
                        <option value="residential">Residential Construction</option>
                        <option value="commercial">Commercial Building</option>
                        <option value="renovation">Renovation & Remodeling</option>
                        <option value="consultation">Consultation</option>
                      </select>
                    </div>

                    <div className="transform transition-all duration-300 hover:scale-[1.02]">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-golden-500 focus:bg-white transition-all duration-300 resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-600 hover:to-golden-700 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
