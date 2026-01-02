"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
  ];

  // Auto-change images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="mt-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt="About Us"
            fill
            className="object-cover brightness-[0.6]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

        <div className="relative z-10 container-custom text-white text-center">
          <div className="animate-fadeInDown">
            <span className="text-golden-400 font-semibold tracking-[0.3em] text-sm uppercase">
              Our Story
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mt-6 mb-6 animate-fadeInUp">
            About BhadoriyaBuild
          </h1>
          <p className="text-2xl text-gray-200 max-w-3xl mx-auto animate-fadeInUp animation-delay-200">
            Building dreams with excellence for over 25 years
          </p>
        </div>
      </section>

      {/* Story Section with Auto-Changing Images */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-golden-500 font-semibold tracking-wider uppercase text-sm">
                Our Journey
              </span>
              <h2 className="text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                Crafting Excellence Since 1999
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                What started as a small family business has grown into one of the region's most
                trusted construction companies, known for delivering exceptional quality and
                unparalleled customer service.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With over two decades of experience, we've successfully completed 500+ premium
                residential and commercial projects. Our commitment to excellence, attention to
                detail, and dedication to client satisfaction have earned us countless awards
                and the trust of clients nationwide.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { number: "25+", label: "Years in Business" },
                  { number: "500+", label: "Projects Completed" },
                  { number: "50+", label: "Expert Team" },
                  { number: "100%", label: "Client Satisfaction" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-golden-50 to-golden-100 p-6 rounded-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="text-4xl font-bold text-golden-600 mb-2">{stat.number}</div>
                    <div className="text-gray-700 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/portfolio"
                className="inline-flex items-center text-golden-600 hover:text-golden-700 font-semibold text-lg group"
              >
                View Our Portfolio
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>

            {/* Auto-Changing Image Carousel */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Project ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-golden-500 w-8"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-golden-400 rounded-3xl -z-10 animate-pulse"></div>
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-golden-200 rounded-full -z-10 animate-pulse animation-delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-golden-500 font-semibold tracking-wider uppercase text-sm">
              Our Values
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mt-4 mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and define who we are
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🏆",
                title: "Excellence",
                description: "We strive for perfection in every project, no matter the size or complexity.",
              },
              {
                icon: "🤝",
                title: "Integrity",
                description: "Honest communication and transparent practices are at our core.",
              },
              {
                icon: "💡",
                title: "Innovation",
                description: "We embrace new technologies and methods to deliver cutting-edge solutions.",
              },
              {
                icon: "❤️",
                title: "Passion",
                description: "We love what we do, and it shows in the quality of our work.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center cursor-pointer"
              >
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-golden-500 font-semibold tracking-wider uppercase text-sm">
              Our Team
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mt-4 mb-6">
              Meet The Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Talented professionals dedicated to bringing your vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "John Mitchell", role: "Founder & CEO", image: "JM" },
              { name: "Sarah Williams", role: "Head of Design", image: "SW" },
              { name: "Michael Chen", role: "Project Manager", image: "MC" },
              { name: "Emily Rodriguez", role: "Operations Director", image: "ER" },
            ].map((member, i) => (
              <div
                key={i}
                className="group text-center cursor-pointer"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <div className="w-full h-80 bg-gradient-to-br from-golden-400 to-golden-600 flex items-center justify-center text-white transform group-hover:scale-105 transition-transform duration-500">
                    <span className="text-6xl font-bold">{member.image}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-golden-600 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss how we can bring your construction project to life
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-5 bg-golden-500 hover:bg-golden-600 text-white font-semibold text-xl rounded-lg transition-all duration-300 shadow-2xl hover:shadow-golden-500/50"
          >
            Get In Touch
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
