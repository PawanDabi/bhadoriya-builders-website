"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useContactModal } from "@/contexts/ContactModalContext";

// About section images carousel - MOVED OUTSIDE COMPONENT
const aboutImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
];

// Service cards data with multiple images for carousel - MOVED OUTSIDE COMPONENT
const services = [
  {
    title: "Residential Construction",
    description: "Custom homes designed and built to reflect your lifestyle and aspirations.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    ],
  },
  {
    title: "Commercial Projects",
    description: "State-of-the-art commercial spaces that drive business success.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
    ],
  },
  {
    title: "Renovation & Remodeling",
    description: "Transform your existing space with our expert renovation services.",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop",
    ],
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [currentAboutImage, setCurrentAboutImage] = useState(0);
  const [currentServiceImages, setCurrentServiceImages] = useState([0, 0, 0]); // Track current image for each service card
  const { openModal } = useContactModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-change images every 2 seconds in About section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAboutImage((prevIndex) =>
        prevIndex === aboutImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-change images every 2 seconds for each service card with staggered delays
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    // Create staggered intervals for each service card
    services.forEach((_, serviceIndex) => {
      const delay = serviceIndex * 2000; // 0s, 2s, 4s delay

      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setCurrentServiceImages((prevImages) => {
            const newImages = [...prevImages];
            const totalImages = services[serviceIndex].images.length;
            newImages[serviceIndex] = newImages[serviceIndex] === totalImages - 1 ? 0 : newImages[serviceIndex] + 1;
            return newImages;
          });
        }, 2000);
        intervals.push(interval);
      }, delay);

      intervals.push(timeout);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section - Full Screen with Real Professional Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Using professional construction image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Modern Home"
            fill
            className="object-cover brightness-[0.85]"
            priority
            quality={100}
          />
        </div>

        {/* Glassmorphism Overlay - Frosted Glass Effect */}
        <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>

        {/* Additional subtle glass layer for depth */}
        <div className="absolute inset-0 bg-white/5"></div>

        {/* Content */}
        <div className="relative z-10 container-custom text-white px-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-block">
              <span className="text-golden-400 font-semibold tracking-[0.3em] text-sm uppercase">
                Premium Construction Services
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
              Building Dreams<br />
              <span className="text-golden-400">Into Reality</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-2xl font-light">
              25+ years of excellence in residential and commercial construction.
              Your vision, our expertise, delivered with perfection.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={openModal}
                className="px-10 py-5 bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-600 hover:to-golden-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-xl text-center hover:scale-105"
              >
                Start Your Project
              </button>

              <Link
                href="/portfolio"
                className="px-10 py-5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold text-lg rounded-xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 text-center hover:scale-105 shadow-lg"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "25+", label: "Years Experience", icon: "🏆" },
              { number: "500+", label: "Projects Delivered", icon: "🏗️" },
              { number: "100%", label: "Satisfaction Rate", icon: "⭐" },
              { number: "50+", label: "Expert Team", icon: "👷" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className="text-5xl md:text-6xl font-bold text-golden-400 mb-2 group-hover:text-golden-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-golden-500 font-semibold tracking-wider uppercase text-sm">
                About Us
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                Crafting Excellence Since 1999
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                We are more than builders—we are craftsmen dedicated to turning architectural dreams into stunning realities.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With over two decades of experience, our team has successfully delivered 500+ premium residential and commercial projects, earning the trust of clients nationwide.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Premium Quality Materials",
                  "On-Time Project Delivery",
                  "Transparent Cost Structure",
                  "Professional Supervision",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center group">
                    <div className="w-8 h-8 rounded-full bg-golden-100 flex items-center justify-center mr-4 group-hover:bg-golden-500 transition-colors">
                      <svg className="w-5 h-5 text-golden-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className="text-lg text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/about" className="inline-flex items-center text-golden-600 hover:text-golden-700 font-semibold text-lg group">
                Learn More About Us
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>

            <div className="relative">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Auto-changing image carousel */}
                {aboutImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentAboutImage ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Modern Architecture ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {aboutImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAboutImage(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentAboutImage
                          ? "bg-golden-500 w-8"
                          : "bg-white/50 hover:bg-white/80 w-2"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-golden-400 rounded-2xl -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-golden-500 font-semibold tracking-wider uppercase text-sm">
              Our Services
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6">
              What We Do Best
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to completion, we deliver exceptional construction services tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                {/* Auto-changing image carousel for each service card */}
                {service.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      imageIndex === currentServiceImages[i] ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${service.title} ${imageIndex + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-3xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-200 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {service.description}
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    <span className="inline-flex items-center text-golden-400 font-semibold">
                      Explore Service
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute top-4 right-4 flex space-x-1.5 z-10">
                  {service.images.map((_, imageIndex) => (
                    <div
                      key={imageIndex}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        imageIndex === currentServiceImages[i]
                          ? "bg-golden-500 w-6"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block px-10 py-4 bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-600 hover:to-golden-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-golden-500 font-semibold tracking-wider uppercase text-sm">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6">
              Recent Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our latest work showcasing innovation, quality, and timeless design
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Modern Luxury Villa",
                location: "Beverly Hills, CA",
                image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
              },
              {
                title: "Downtown Office Complex",
                location: "New York, NY",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Coastal Resort Home",
                location: "Malibu, CA",
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Urban Loft Renovation",
                location: "San Francisco, CA",
                image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=2070&auto=format&fit=crop",
              },
            ].map((project, i) => (
              <div
                key={i}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex items-center text-golden-400 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-golden-400 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-block px-10 py-4 bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-600 hover:to-golden-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
            >
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-golden-400 font-semibold tracking-wider uppercase text-sm">
              Testimonials
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
              Client Stories
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Hear what our clients have to say about working with us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Homeowner",
                text: "Absolutely phenomenal work! They transformed our vision into reality with impeccable attention to detail. The quality exceeded all expectations.",
              },
              {
                name: "Michael Chen",
                role: "Business Owner",
                text: "Professional, reliable, and exceptionally skilled. Our new office space is stunning and was delivered exactly on schedule.",
              },
              {
                name: "Emily Rodriguez",
                role: "Real Estate Developer",
                text: "Best construction partner we've ever worked with. Their expertise and dedication are unmatched in the industry.",
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-golden-900/20 via-gray-800/50 to-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-golden-700/30 hover:border-golden-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-golden-500/20">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-golden-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 italic text-lg mb-6 leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-golden-400 to-golden-600 flex items-center justify-center text-white font-bold text-xl mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-golden-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
            alt="Construction Blueprint"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-900/95"></div>
        </div>

        <div className="container-custom relative z-10 text-center text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Build Your Dream?
          </h2>
          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Let's turn your vision into reality. Get in touch for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={openModal}
              className="px-12 py-5 bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-600 hover:to-golden-700 text-white font-semibold text-xl rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
            >
              Get Free Consultation
            </button>
            <a
              href="tel:+15551234567"
              className="px-12 py-5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold text-xl rounded-md border-2 border-white/30 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
