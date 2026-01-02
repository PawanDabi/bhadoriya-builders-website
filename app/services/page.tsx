"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ServicesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      title: "Residential Construction",
      description: "Build your dream home from the ground up with our expert residential construction services.",
      features: [
        "Custom home building",
        "Single and multi-family homes",
        "Luxury residences",
        "Energy-efficient construction",
        "Smart home integration",
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Commercial Building",
      description: "Professional commercial construction services for businesses of all sizes.",
      features: [
        "Office buildings",
        "Retail spaces",
        "Industrial facilities",
        "Warehouses",
        "Restaurant build-outs",
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Renovations & Remodeling",
      description: "Transform your existing space with our comprehensive renovation and remodeling services.",
      features: [
        "Kitchen remodeling",
        "Bathroom renovations",
        "Basement finishing",
        "Room additions",
        "Whole house renovations",
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2080&auto=format&fit=crop",
    },
    {
      title: "Design & Planning",
      description: "Comprehensive design and planning services to bring your vision to life.",
      features: [
        "Architectural design",
        "3D visualization",
        "Project planning",
        "Permit acquisition",
        "Budget estimation",
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop",
    },
    {
      title: "Project Management",
      description: "End-to-end project management to ensure your construction runs smoothly.",
      features: [
        "Timeline management",
        "Budget oversight",
        "Quality control",
        "Vendor coordination",
        "Progress reporting",
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Maintenance & Repairs",
      description: "Ongoing maintenance and repair services to keep your property in top condition.",
      features: [
        "Preventive maintenance",
        "Emergency repairs",
        "Structural repairs",
        "Weatherproofing",
        "General handyman services",
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <div className="mt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
            alt="Our Services"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

        <div className="relative z-10 container-custom text-white text-center">
          <div className="animate-fadeInDown">
            <span className="text-golden-400 font-semibold tracking-[0.3em] text-sm uppercase">
              What We Offer
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mt-6 mb-6 animate-fadeInUp">
            Our Services
          </h1>
          <p className="text-2xl text-gray-200 max-w-3xl mx-auto animate-fadeInUp animation-delay-200">
            Comprehensive construction solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-golden-500 font-semibold tracking-wider uppercase text-sm">
              Premium Services
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mt-4 mb-6">
              Building Excellence Across All Sectors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial design to final completion, we deliver excellence at every stage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-golden-500 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Service Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      hoveredIndex === index ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Icon Overlay */}
                  <div className="absolute top-6 right-6 text-golden-400 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-golden-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start group/item">
                        <svg
                          className="w-5 h-5 text-golden-500 mr-3 mt-0.5 flex-shrink-0 transform transition-transform duration-300 group-hover/item:scale-125"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-golden-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-golden-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-golden-500/10 rounded-full blur-3xl"></div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <span className="text-golden-400 font-semibold tracking-wider uppercase text-sm">
              How We Work
            </span>
            <h2 className="text-5xl font-bold mt-4 mb-6">Our Process</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A streamlined approach to ensure your project runs smoothly from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Initial meeting to discuss your vision, requirements, and budget",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                  </svg>
                )
              },
              {
                step: "02",
                title: "Design & Planning",
                description: "Create detailed plans and obtain necessary permits",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                )
              },
              {
                step: "03",
                title: "Construction",
                description: "Execute the project with precision and quality craftsmanship",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                  </svg>
                )
              },
              {
                step: "04",
                title: "Completion",
                description: "Final walkthrough, inspection, and handover of your project",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group text-center relative"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Connecting Line (hidden on last item and mobile) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-golden-500/50 to-golden-500/20"></div>
                )}

                {/* Step Circle */}
                <div className="relative mx-auto mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full flex items-center justify-center mx-auto relative z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-xl group-hover:shadow-golden-500/50">
                    <span className="text-3xl font-bold text-white">{item.step}</span>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gray-800 border-4 border-gray-900 rounded-full flex items-center justify-center text-golden-400 z-20 transform transition-all duration-500 group-hover:scale-125">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-golden-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-golden-500 to-golden-600 text-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3 animate-pulse animation-delay-1000"></div>
        </div>

        <div className="container-custom text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-2xl text-golden-100 mb-10 max-w-2xl mx-auto">
            Contact us today to discuss your project and receive a free, no-obligation quote
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-5 bg-white text-golden-600 hover:bg-gray-100 font-semibold text-xl rounded-lg transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-105"
          >
            Get Free Quote
          </Link>
        </div>
      </section>

      <style jsx>{`
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

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
