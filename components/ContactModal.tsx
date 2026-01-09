"use client";

import { useContactModal } from "@/contexts/ContactModalContext";
import { useState, useEffect, useRef } from "react";

export default function ContactModal() {
  const { isOpen: isModalOpen, closeModal } = useContactModal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

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

  if (!isModalOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
        {/* Enhanced Blurred Background Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/80 to-black/70 backdrop-blur-xl animate-fadeIn"
          onClick={closeModal}
        ></div>

        {/* Modal Content */}
        <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn max-h-[90vh] border-2 border-golden-500/30 shadow-golden-500/20">
          {/* Close Button - Enhanced */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-20 w-12 h-12 bg-gray-900/10 hover:bg-red-500 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:text-white transition-all duration-300 hover:rotate-90 hover:scale-110 shadow-lg"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[650px]">
            {/* Left Side - Enhanced Welcome Section - Hidden on mobile */}
            <div className="hidden md:flex relative bg-gradient-to-br from-gray-900 via-gray-800 to-black p-12 flex-col justify-center text-white overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(to right, #d4af37 1px, transparent 1px),
                    linear-gradient(to bottom, #d4af37 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              {/* Golden Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-golden-500/10 via-transparent to-golden-600/10"></div>

              {/* Golden Shine Effect */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-golden-400/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
              </div>

              {/* Floating Decorative Elements - Enhanced */}
              <div className="absolute top-10 right-10 w-40 h-40 bg-golden-500/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 left-10 w-48 h-48 bg-golden-600/25 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-golden-400/20 rounded-full blur-2xl animate-pulse animation-delay-500"></div>

              <div className="relative z-10">
                {/* Header Section */}
                <div className="mb-10 animate-fadeInLeft">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-1 bg-gradient-to-r from-golden-400 to-golden-600 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                    <div className="w-2 h-2 bg-golden-500 rounded-full ml-2 shadow-[0_0_8px_rgba(212,175,55,0.6)] animate-pulse"></div>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                    Let's Build
                    <br />
                    <span className="text-golden-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] animate-pulse">Together</span>
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Transform your vision into reality with expert guidance
                  </p>
                </div>

                {/* Feature List - Enhanced */}
                <div className="space-y-5 mb-10 animate-fadeInLeft animation-delay-200">
                  {[
                    {
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      ),
                      text: "Free Consultation & Site Visit",
                      subtext: "Get expert advice at no cost"
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      ),
                      text: "25+ Years Experience",
                      subtext: "Trusted by 500+ clients"
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                      ),
                      text: "24/7 Support",
                      subtext: "We're always here for you"
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ),
                      text: "Premium Quality Guaranteed",
                      subtext: "Excellence in every project"
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-4 group">
                      <div className="w-10 h-10 bg-golden-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-golden-500/30 group-hover:bg-golden-500 group-hover:scale-110 transition-all duration-300">
                        <span className="text-golden-400 group-hover:text-white transition-colors">{item.icon}</span>
                      </div>
                      <div className="flex-1">
                        <span className="text-lg font-semibold block">{item.text}</span>
                        <span className="text-sm text-gray-400">{item.subtext}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote Section - Enhanced */}
                <div className="relative mt-12 animate-fadeInLeft animation-delay-400">
                  <div className="absolute -left-2 -top-2 text-golden-500/30 text-6xl">"</div>
                  <p className="text-gray-300 italic text-lg pl-8 border-l-2 border-golden-500/50">
                    Your dream project is just a conversation away. Let's create something extraordinary together.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Form */}
            <div className="relative p-6 md:p-12 bg-gradient-to-br from-white to-gray-50 overflow-y-auto max-h-[80vh] md:max-h-[650px] custom-scrollbar scroll-smooth">
              {/* Subtle Golden Accent on Right Side */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-golden-500/5 rounded-full blur-3xl"></div>
              <div className="animate-fadeInRight">
                {/* Form Header */}
                <div className="mb-6 md:mb-8">
                  <div className="inline-block px-4 py-2 bg-golden-500/10 rounded-full mb-4 border border-golden-500/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <span className="text-golden-600 font-semibold text-sm">Get Started Today</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Get In Touch</h3>
                  <p className="text-gray-600 text-base md:text-lg">Fill out the form and we'll be in touch within 24 hours!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Full Name Input */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-golden-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                      </svg>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-golden-500 focus:ring-2 focus:ring-golden-500/20 transition-all duration-300 group-hover:border-gray-300"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-golden-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-golden-500 focus:ring-2 focus:ring-golden-500/20 transition-all duration-300 group-hover:border-gray-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-golden-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-golden-500 focus:ring-2 focus:ring-golden-500/20 transition-all duration-300 group-hover:border-gray-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Service Select - Custom Dropdown */}
                  <div className="group relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-golden-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      Service Interested In *
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-golden-500 focus:ring-2 focus:ring-golden-500/20 transition-all duration-300 group-hover:border-gray-300 cursor-pointer text-left flex items-center justify-between"
                      >
                        <span className={formData.service ? "text-gray-900" : "text-gray-400"}>
                          {formData.service
                            ? (formData.service === "residential" ? "🏠 Residential Construction"
                              : formData.service === "commercial" ? "🏢 Commercial Building"
                              : formData.service === "renovation" ? "🔧 Renovation & Remodeling"
                              : "💼 Consultation")
                            : "Select a service"}
                        </span>
                        <svg className={`w-5 h-5 text-golden-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-golden-500/50 rounded-xl shadow-2xl overflow-hidden animate-slideDown">
                          {[
                            { value: "residential", label: "Residential Construction", icon: "🏠" },
                            { value: "commercial", label: "Commercial Building", icon: "🏢" },
                            { value: "renovation", label: "Renovation & Remodeling", icon: "🔧" },
                            { value: "consultation", label: "Consultation", icon: "💼" }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, service: option.value });
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full px-5 py-4 text-left transition-all duration-200 flex items-center space-x-3 ${
                                formData.service === option.value
                                  ? "bg-gradient-to-r from-golden-500 to-golden-600 text-white font-semibold"
                                  : "hover:bg-gradient-to-r hover:from-golden-50 hover:to-golden-100 text-gray-700 hover:text-golden-900"
                              }`}
                            >
                              <span className="text-2xl">{option.icon}</span>
                              <span>{option.label}</span>
                              {formData.service === option.value && (
                                <svg className="w-5 h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-golden-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                      </svg>
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-golden-500 focus:ring-2 focus:ring-golden-500/20 transition-all duration-300 resize-none group-hover:border-gray-300"
                      placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button - Enhanced */}
                  <button
                    type="submit"
                    className="group relative w-full py-5 bg-gradient-to-r from-golden-500 via-golden-600 to-golden-500 hover:from-golden-600 hover:via-golden-700 hover:to-golden-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-golden-500/50 hover:scale-[1.02] transform overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </button>

                  {/* Privacy Notice */}
                  <p className="text-xs text-gray-500 text-center mt-4">
                    🔒 Your information is secure and will never be shared with third parties.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b8941f;
        }

        /* Custom Select Dropdown Styling */
        select option {
          background-color: white;
          color: #374151;
          padding: 12px;
        }

        select option:checked {
          background: linear-gradient(to right, #d4af37, #c9a02c);
          color: white;
        }

        select option:hover {
          background-color: #fef3c7;
          color: #92400e;
        }

        /* Smooth scrolling */
        .scroll-smooth {
          scroll-behavior: smooth;
        }

        /* Slide down animation for dropdown */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
