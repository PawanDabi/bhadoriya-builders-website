"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useContactModal } from "@/contexts/ContactModalContext";
import Logo from "@/components/Logo";

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
  const [aboutInView, setAboutInView] = useState(false);
  const [servicesInView, setServicesInView] = useState(false);
  const [portfolioInView, setPortfolioInView] = useState(false);
  const [testimonialsInView, setTestimonialsInView] = useState(false);
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

  // Intersection Observer for About section animation - triggers every time
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set to true when in view, false when out of view - triggers every time
          setAboutInView(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

  // Intersection Observer for Services section animation - triggers every time
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setServicesInView(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    const servicesSection = document.getElementById("services-section");
    if (servicesSection) {
      observer.observe(servicesSection);
    }

    return () => {
      if (servicesSection) {
        observer.unobserve(servicesSection);
      }
    };
  }, []);

  // Intersection Observer for Portfolio section animation - triggers every time
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setPortfolioInView(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    const portfolioSection = document.getElementById("portfolio-section");
    if (portfolioSection) {
      observer.observe(portfolioSection);
    }

    return () => {
      if (portfolioSection) {
        observer.unobserve(portfolioSection);
      }
    };
  }, []);

  // Intersection Observer for Testimonials section animation - triggers every time
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setTestimonialsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    const testimonialsSection = document.getElementById("testimonials-section");
    if (testimonialsSection) {
      observer.observe(testimonialsSection);
    }

    return () => {
      if (testimonialsSection) {
        observer.unobserve(testimonialsSection);
      }
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Global Animation Styles for Construction Elements */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        @keyframes slide {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(15px);
          }
        }

        @keyframes hammer {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(-5deg);
          }
          50% {
            transform: translateY(0px) rotate(0deg);
          }
          75% {
            transform: translateY(-5px) rotate(3deg);
          }
        }

        @keyframes drift {
          0%, 100% {
            transform: translate(0px, 0px);
          }
          25% {
            transform: translate(8px, -8px);
          }
          50% {
            transform: translate(0px, -12px);
          }
          75% {
            transform: translate(-8px, -8px);
          }
        }

        @keyframes rotate {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-8deg);
          }
          50% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(8deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-sway {
          animation: sway 5s ease-in-out infinite;
        }

        .animate-slide {
          animation: slide 7s ease-in-out infinite;
        }

        .animate-hammer {
          animation: hammer 4s ease-in-out infinite;
        }

        .animate-drift {
          animation: drift 8s ease-in-out infinite;
        }

        .animate-rotate {
          animation: rotate 6s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section - Full Screen with Real Professional Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Construction Site Sunset Silhouette */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-sunset.png"
            alt="Construction Site at Sunset"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>

        {/* Minimal Overlay with slight blur */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-r from-black/30 via-black/15 to-transparent"></div>

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


      {/* About Section */}
      <section id="about-section" className="relative py-24 bg-white overflow-hidden">
        {/* OPTION 1: Blueprint Architecture Pattern */}
        <div className="absolute inset-0 w-full h-full opacity-[0.15]">
          {/* Grid Lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #d4af37 1px, transparent 1px),
              linear-gradient(to bottom, #d4af37 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 25px'
          }}></div>

          {/* Geometrical Shapes */}

          {/* Circle - Top Left */}
          <svg className="absolute top-20 left-1/4 w-16 h-16 opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* Triangle - Center */}
          <svg className="absolute top-1/3 left-1/2 w-20 h-20 opacity-20" viewBox="0 0 100 100">
            <polygon points="50,10 90,85 10,85" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="50" y1="10" x2="50" y2="85" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* Hexagon - Bottom Right */}
          <svg className="absolute bottom-32 right-1/4 w-20 h-20 opacity-20" viewBox="0 0 100 100">
            <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="50" cy="50" r="3" fill="#d4af37"/>
          </svg>

          {/* Rectangle - Top Center */}
          <svg className="absolute top-24 left-2/3 w-24 h-16 opacity-20" viewBox="0 0 120 80">
            <rect x="10" y="10" width="100" height="60" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="10" y1="10" x2="110" y2="70" stroke="#d4af37" strokeWidth="1"/>
            <line x1="110" y1="10" x2="10" y2="70" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* Square - Bottom Left */}
          <svg className="absolute bottom-40 left-1/3 w-16 h-16 opacity-20" viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <rect x="35" y="35" width="30" height="30" fill="none" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* Compass Symbol */}
          <svg className="absolute top-10 right-10 w-24 h-24 opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="#d4af37" strokeWidth="1"/>
            <line x1="50" y1="5" x2="50" y2="25" stroke="#d4af37" strokeWidth="2"/>
            <line x1="50" y1="75" x2="50" y2="95" stroke="#d4af37" strokeWidth="2"/>
            <line x1="5" y1="50" x2="25" y2="50" stroke="#d4af37" strokeWidth="2"/>
            <line x1="75" y1="50" x2="95" y2="50" stroke="#d4af37" strokeWidth="2"/>
            <polygon points="50,20 55,50 50,45 45,50" fill="#d4af37"/>
          </svg>

          {/* Ruler Symbol */}
          <svg className="absolute bottom-10 left-10 w-32 h-8 opacity-20" viewBox="0 0 200 40">
            <rect x="0" y="0" width="200" height="40" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="20" y1="0" x2="20" y2="15" stroke="#d4af37" strokeWidth="1"/>
            <line x1="40" y1="0" x2="40" y2="20" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="60" y1="0" x2="60" y2="15" stroke="#d4af37" strokeWidth="1"/>
            <line x1="80" y1="0" x2="80" y2="20" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="100" y1="0" x2="100" y2="25" stroke="#d4af37" strokeWidth="2"/>
            <line x1="120" y1="0" x2="120" y2="15" stroke="#d4af37" strokeWidth="1"/>
            <line x1="140" y1="0" x2="140" y2="20" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="160" y1="0" x2="160" y2="15" stroke="#d4af37" strokeWidth="1"/>
            <line x1="180" y1="0" x2="180" y2="20" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* Corner Brackets */}
          <svg className="absolute top-5 left-5 w-16 h-16 opacity-50" viewBox="0 0 50 50">
            <polyline points="15,0 0,0 0,15" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
          <svg className="absolute top-5 right-5 w-16 h-16 opacity-50" viewBox="0 0 50 50">
            <polyline points="35,0 50,0 50,15" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
          <svg className="absolute bottom-5 left-5 w-16 h-16 opacity-50" viewBox="0 0 50 50">
            <polyline points="15,50 0,50 0,35" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
          <svg className="absolute bottom-5 right-5 w-16 h-16 opacity-50" viewBox="0 0 50 50">
            <polyline points="35,50 50,50 50,35" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
        </div>

        {/* Real Construction Instruments - More Visible */}
        <div className="absolute inset-0 w-full h-full opacity-[0.35] z-20">
          {/* 1. Measuring Tape - Top Left */}
          <svg className="absolute top-1/4 left-20 w-32 h-32 animate-float" viewBox="0 0 120 120">
            {/* Tape body */}
            <rect x="30" y="30" width="60" height="50" rx="8" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <circle cx="60" cy="55" r="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            {/* Tape extending */}
            <rect x="85" y="48" width="20" height="14" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="105" y1="50" x2="105" y2="62" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="98" y1="50" x2="98" y2="62" stroke="#d4af37" strokeWidth="1"/>
            <line x1="92" y1="50" x2="92" y2="57" stroke="#d4af37" strokeWidth="1"/>
            {/* Clip hook */}
            <path d="M 105 52 L 110 52 L 110 60 L 105 60" fill="none" stroke="#d4af37" strokeWidth="2"/>
            {/* Detail lines */}
            <line x1="40" y1="42" x2="55" y2="42" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="40" y1="50" x2="50" y2="50" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* 2. Spirit Level - Top Right */}
          <svg className="absolute top-16 right-24 w-36 h-24 animate-sway" viewBox="0 0 140 80">
            {/* Level body */}
            <rect x="10" y="25" width="120" height="30" rx="4" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Bubble vial */}
            <ellipse cx="70" cy="40" rx="20" ry="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="70" cy="40" r="4" fill="#d4af37"/>
            {/* End caps */}
            <rect x="8" y="23" width="8" height="34" rx="2" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <rect x="124" y="23" width="8" height="34" rx="2" fill="none" stroke="#d4af37" strokeWidth="2"/>
            {/* Measurement marks */}
            <line x1="40" y1="40" x2="40" y2="48" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="100" y1="40" x2="100" y2="48" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* 3. Trowel - Top Right Side */}
          <svg className="absolute top-20 right-1/3 w-28 h-32 animate-bounce-slow" viewBox="0 0 100 120">
            {/* Blade */}
            <path d="M 50 20 L 80 45 L 70 75 L 30 75 L 20 45 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Handle connection */}
            <rect x="45" y="75" width="10" height="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            {/* Handle */}
            <rect x="40" y="83" width="20" height="30" rx="10" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Grip lines */}
            <line x1="45" y1="88" x2="55" y2="88" stroke="#d4af37" strokeWidth="1"/>
            <line x1="45" y1="93" x2="55" y2="93" stroke="#d4af37" strokeWidth="1"/>
            <line x1="45" y1="98" x2="55" y2="98" stroke="#d4af37" strokeWidth="1"/>
            <line x1="45" y1="103" x2="55" y2="103" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* 4. Power Drill - Middle Right */}
          <svg className="absolute top-1/2 right-32 w-32 h-28 animate-hammer" viewBox="0 0 120 100">
            {/* Drill body */}
            <rect x="30" y="35" width="50" height="25" rx="3" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Chuck/nose */}
            <rect x="80" y="38" width="15" height="19" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="102" cy="47.5" r="5" fill="none" stroke="#d4af37" strokeWidth="2"/>
            {/* Drill bit */}
            <line x1="107" y1="47.5" x2="115" y2="47.5" stroke="#d4af37" strokeWidth="2"/>
            {/* Handle/Grip */}
            <path d="M 30 60 L 20 70 L 20 80 L 30 85 L 35 80 L 35 65 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Trigger */}
            <rect x="27" y="65" width="6" height="10" rx="1" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
            {/* Battery pack */}
            <rect x="32" y="60" width="15" height="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>

          {/* 5. Hand Saw - Bottom Right */}
          <svg className="absolute bottom-16 right-20 w-40 h-28 animate-slide" viewBox="0 0 150 100">
            {/* Saw blade */}
            <path d="M 20 40 L 120 30 L 120 35 L 20 45 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Saw teeth */}
            <path d="M 30 45 L 35 50 L 40 45 L 45 50 L 50 45 L 55 50 L 60 45 L 65 50 L 70 45 L 75 50 L 80 45 L 85 50 L 90 45 L 95 50 L 100 45 L 105 50 L 110 45 L 115 50 L 120 45"
                  fill="none" stroke="#d4af37" strokeWidth="2"/>
            {/* Handle */}
            <path d="M 20 25 Q 15 32.5, 20 40 L 35 40 L 35 25 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Handle grip */}
            <circle cx="25" cy="32.5" r="4" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* 6. Shovel - Bottom Left */}
          <svg className="absolute bottom-12 left-20 w-28 h-36 animate-drift" viewBox="0 0 100 140">
            {/* Blade */}
            <path d="M 40 90 L 35 110 Q 50 120, 65 110 L 60 90 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Socket */}
            <rect x="45" y="80" width="10" height="15" fill="none" stroke="#d4af37" strokeWidth="2"/>
            {/* Handle/shaft */}
            <line x1="50" y1="80" x2="50" y2="20" stroke="#d4af37" strokeWidth="2.5"/>
            {/* D-Handle */}
            <path d="M 50 20 L 40 20 Q 35 20, 35 25 L 35 35 Q 35 40, 40 40 L 50 40" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Handle grip */}
            <line x1="38" y1="25" x2="38" y2="35" stroke="#d4af37" strokeWidth="1"/>
            <line x1="42" y1="25" x2="42" y2="35" stroke="#d4af37" strokeWidth="1"/>
            <line x1="46" y1="25" x2="46" y2="35" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* 7. Safety Helmet with Goggles - Middle Left */}
          <svg className="absolute top-1/2 left-28 w-32 h-28 animate-rotate" viewBox="0 0 120 120">
            {/* Helmet dome */}
            <path d="M 25 70 Q 25 35, 60 25 Q 95 35, 95 70" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Helmet brim */}
            <ellipse cx="60" cy="70" rx="38" ry="10" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Goggles strap */}
            <path d="M 30 50 Q 60 45, 90 50" fill="none" stroke="#d4af37" strokeWidth="2"/>
            {/* Goggles lenses */}
            <ellipse cx="45" cy="55" rx="10" ry="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <ellipse cx="75" cy="55" rx="10" ry="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            {/* Bridge */}
            <line x1="55" y1="55" x2="65" y2="55" stroke="#d4af37" strokeWidth="2"/>
            {/* Ventilation slots */}
            <line x1="50" y1="38" x2="55" y2="38" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="65" y1="38" x2="70" y2="38" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* 8. Adjustable Wrench - Top Left 2 */}
          <svg className="absolute top-1/3 left-1/4 w-32 h-28 animate-float" viewBox="0 0 130 100">
            {/* Wrench head fixed jaw */}
            <path d="M 20 45 L 20 35 L 35 35 L 35 25 L 45 25 L 45 55 L 35 55 L 35 45 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Movable jaw */}
            <rect x="30" y="30" width="8" height="20" fill="none" stroke="#d4af37" strokeWidth="2"/>
            {/* Adjustment screw */}
            <circle cx="55" cy="40" r="5" fill="none" stroke="#d4af37" strokeWidth="2"/>
            {/* Handle */}
            <rect x="45" y="35" width="70" height="10" rx="2" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Handle texture */}
            <line x1="60" y1="37" x2="60" y2="43" stroke="#d4af37" strokeWidth="1"/>
            <line x1="70" y1="37" x2="70" y2="43" stroke="#d4af37" strokeWidth="1"/>
            <line x1="80" y1="37" x2="80" y2="43" stroke="#d4af37" strokeWidth="1"/>
            <line x1="90" y1="37" x2="90" y2="43" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* 9. Stacked Bricks - Bottom Center */}
          <svg className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-32 h-28 animate-slide" viewBox="0 0 120 100">
            {/* Bottom brick */}
            <rect x="20" y="60" width="80" height="20" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="60" y1="60" x2="60" y2="80" stroke="#d4af37" strokeWidth="2"/>
            {/* Middle brick */}
            <rect x="30" y="40" width="60" height="20" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="60" y1="40" x2="60" y2="60" stroke="#d4af37" strokeWidth="2"/>
            {/* Top brick */}
            <rect x="40" y="20" width="40" height="20" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Holes in bricks */}
            <rect x="35" y="65" width="8" height="10" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
            <rect x="52" y="65" width="8" height="10" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
            <rect x="68" y="65" width="8" height="10" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* 10. Wheelbarrow - Bottom Right 2 */}
          <svg className="absolute bottom-10 right-1/4 w-36 h-32 animate-drift" viewBox="0 0 140 120">
            {/* Wheel */}
            <circle cx="50" cy="90" r="20" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <circle cx="50" cy="90" r="12" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="50" cy="90" r="4" fill="#d4af37"/>
            {/* Spokes */}
            <line x1="50" y1="70" x2="50" y2="110" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="30" y1="90" x2="70" y2="90" stroke="#d4af37" strokeWidth="1.5"/>
            {/* Tray/bucket */}
            <path d="M 50 90 L 60 70 L 70 50 L 110 50 L 115 60 L 115 70 L 60 70 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Handles */}
            <line x1="110" y1="50" x2="115" y2="30" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="115" y1="70" x2="120" y2="50" stroke="#d4af37" strokeWidth="2.5"/>
            {/* Handle grips */}
            <circle cx="115" cy="27" r="3" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="120" cy="47" r="3" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
        </div>

        <div className="container-custom relative z-30">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side - Animated Text Content */}
            <div className={`transform transition-all duration-1000 ${aboutInView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <span className="text-golden-500 font-semibold tracking-wider uppercase text-5xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)' }}>
                About Us
              </span>
              <h2 className={`text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6 leading-tight transition-all duration-1000 delay-100 ${aboutInView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.2)' }}>
                Crafting Excellence Since 1999
              </h2>
              <p className={`text-xl text-gray-600 mb-6 leading-relaxed transition-all duration-1000 delay-200 ${aboutInView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                We are more than builders—we are craftsmen dedicated to turning architectural dreams into stunning realities.
              </p>
              <p className={`text-lg text-gray-600 mb-8 leading-relaxed transition-all duration-1000 delay-300 ${aboutInView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                With over two decades of experience, our team has successfully delivered 500+ premium residential and commercial projects, earning the trust of clients nationwide.
              </p>

              <div className={`space-y-4 mb-8 transition-all duration-1000 delay-400 ${aboutInView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
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

              <Link href="/about" className={`inline-flex items-center text-golden-600 hover:text-golden-700 font-semibold text-lg group transition-all duration-1000 delay-500 ${aboutInView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                Learn More About Us
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>

            {/* Right Side - Animated Image */}
            <div className={`relative transform transition-all duration-1000 delay-300 ${aboutInView ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
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
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="relative py-24 bg-white overflow-hidden">
        {/* Blueprint Background - Same as About Us */}
        <div className="absolute inset-0 w-full h-full opacity-[0.15]">
          {/* Grid Lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #d4af37 1px, transparent 1px),
              linear-gradient(to bottom, #d4af37 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 25px'
          }}></div>

          {/* Geometrical Shapes */}
          <svg className="absolute top-20 left-1/4 w-16 h-16 opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          <svg className="absolute top-1/3 left-1/2 w-20 h-20 opacity-20" viewBox="0 0 100 100">
            <polygon points="50,10 90,85 10,85" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="50" y1="10" x2="50" y2="85" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          <svg className="absolute bottom-32 right-1/4 w-20 h-20 opacity-20" viewBox="0 0 100 100">
            <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="50" cy="50" r="3" fill="#d4af37"/>
          </svg>

          {/* Compass Symbol */}
          <svg className="absolute top-10 right-10 w-24 h-24 opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="#d4af37" strokeWidth="1"/>
            <line x1="50" y1="5" x2="50" y2="25" stroke="#d4af37" strokeWidth="2"/>
            <line x1="50" y1="75" x2="50" y2="95" stroke="#d4af37" strokeWidth="2"/>
            <line x1="5" y1="50" x2="25" y2="50" stroke="#d4af37" strokeWidth="2"/>
            <line x1="75" y1="50" x2="95" y2="50" stroke="#d4af37" strokeWidth="2"/>
            <polygon points="50,20 55,50 50,45 45,50" fill="#d4af37"/>
          </svg>

          {/* Ruler Symbol */}
          <svg className="absolute bottom-10 left-10 w-32 h-8 opacity-20" viewBox="0 0 200 40">
            <rect x="0" y="0" width="200" height="40" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="20" y1="0" x2="20" y2="15" stroke="#d4af37" strokeWidth="1"/>
            <line x1="40" y1="0" x2="40" y2="20" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="60" y1="0" x2="60" y2="15" stroke="#d4af37" strokeWidth="1"/>
            <line x1="80" y1="0" x2="80" y2="20" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="100" y1="0" x2="100" y2="25" stroke="#d4af37" strokeWidth="2"/>
            <line x1="120" y1="0" x2="120" y2="15" stroke="#d4af37" strokeWidth="1"/>
            <line x1="140" y1="0" x2="140" y2="20" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="160" y1="0" x2="160" y2="15" stroke="#d4af37" strokeWidth="1"/>
            <line x1="180" y1="0" x2="180" y2="20" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* Corner Brackets */}
          <svg className="absolute top-5 left-5 w-16 h-16 opacity-50" viewBox="0 0 50 50">
            <polyline points="15,0 0,0 0,15" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
          <svg className="absolute top-5 right-5 w-16 h-16 opacity-50" viewBox="0 0 50 50">
            <polyline points="35,0 50,0 50,15" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
          <svg className="absolute bottom-5 left-5 w-16 h-16 opacity-50" viewBox="0 0 50 50">
            <polyline points="15,50 0,50 0,35" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
          <svg className="absolute bottom-5 right-5 w-16 h-16 opacity-50" viewBox="0 0 50 50">
            <polyline points="35,50 50,50 50,35" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
        </div>

        {/* Real Construction Instruments - Same as About Us */}
        <div className="absolute inset-0 w-full h-full opacity-[0.35] z-20">
          {/* 1. Measuring Tape - Top Left */}
          <svg className="absolute top-1/4 left-20 w-32 h-32 animate-float" viewBox="0 0 120 120">
            <rect x="30" y="30" width="60" height="50" rx="8" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <circle cx="60" cy="55" r="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <rect x="85" y="48" width="20" height="14" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="105" y1="50" x2="105" y2="62" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="98" y1="50" x2="98" y2="62" stroke="#d4af37" strokeWidth="1"/>
            <line x1="92" y1="50" x2="92" y2="57" stroke="#d4af37" strokeWidth="1"/>
            <path d="M 105 52 L 110 52 L 110 60 L 105 60" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="40" y1="42" x2="55" y2="42" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="40" y1="50" x2="50" y2="50" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* 2. Spirit Level - Top Right */}
          <svg className="absolute top-16 right-24 w-36 h-24 animate-sway" viewBox="0 0 140 80">
            <rect x="10" y="25" width="120" height="30" rx="4" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <ellipse cx="70" cy="40" rx="20" ry="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="70" cy="40" r="4" fill="#d4af37"/>
            <rect x="8" y="23" width="8" height="34" rx="2" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <rect x="124" y="23" width="8" height="34" rx="2" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="40" y1="40" x2="40" y2="48" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="100" y1="40" x2="100" y2="48" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* 3. Trowel - Top Right Side */}
          <svg className="absolute top-20 right-1/3 w-28 h-32 animate-bounce-slow" viewBox="0 0 100 120">
            <path d="M 50 20 L 80 45 L 70 75 L 30 75 L 20 45 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <rect x="45" y="75" width="10" height="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <rect x="40" y="83" width="20" height="30" rx="10" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="45" y1="88" x2="55" y2="88" stroke="#d4af37" strokeWidth="1"/>
            <line x1="45" y1="93" x2="55" y2="93" stroke="#d4af37" strokeWidth="1"/>
            <line x1="45" y1="98" x2="55" y2="98" stroke="#d4af37" strokeWidth="1"/>
            <line x1="45" y1="103" x2="55" y2="103" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* 4. Power Drill - Middle Right */}
          <svg className="absolute top-1/2 right-32 w-32 h-28 animate-hammer" viewBox="0 0 120 100">
            <rect x="30" y="35" width="50" height="25" rx="3" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <rect x="80" y="38" width="15" height="19" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="102" cy="47.5" r="5" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="107" y1="47.5" x2="115" y2="47.5" stroke="#d4af37" strokeWidth="2"/>
            <path d="M 30 60 L 20 70 L 20 80 L 30 85 L 35 80 L 35 65 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <rect x="27" y="65" width="6" height="10" rx="1" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
            <rect x="32" y="60" width="15" height="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>

          {/* 5. Hand Saw - Bottom Right */}
          <svg className="absolute bottom-16 right-20 w-40 h-28 animate-slide" viewBox="0 0 150 100">
            <path d="M 20 40 L 120 30 L 120 35 L 20 45 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <path d="M 30 45 L 35 50 L 40 45 L 45 50 L 50 45 L 55 50 L 60 45 L 65 50 L 70 45 L 75 50 L 80 45 L 85 50 L 90 45 L 95 50 L 100 45 L 105 50 L 110 45 L 115 50 L 120 45"
                  fill="none" stroke="#d4af37" strokeWidth="2"/>
            <path d="M 20 25 Q 15 32.5, 20 40 L 35 40 L 35 25 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <circle cx="25" cy="32.5" r="4" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* 6. Shovel - Bottom Left */}
          <svg className="absolute bottom-12 left-20 w-28 h-36 animate-drift" viewBox="0 0 100 140">
            <path d="M 40 90 L 35 110 Q 50 120, 65 110 L 60 90 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <rect x="45" y="80" width="10" height="15" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="50" y1="80" x2="50" y2="20" stroke="#d4af37" strokeWidth="2.5"/>
            <path d="M 50 20 L 40 20 Q 35 20, 35 25 L 35 35 Q 35 40, 40 40 L 50 40" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="38" y1="25" x2="38" y2="35" stroke="#d4af37" strokeWidth="1"/>
            <line x1="42" y1="25" x2="42" y2="35" stroke="#d4af37" strokeWidth="1"/>
            <line x1="46" y1="25" x2="46" y2="35" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* 7. Safety Helmet with Goggles - Middle Left */}
          <svg className="absolute top-1/2 left-28 w-32 h-28 animate-rotate" viewBox="0 0 120 120">
            <path d="M 25 70 Q 25 35, 60 25 Q 95 35, 95 70" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <ellipse cx="60" cy="70" rx="38" ry="10" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <path d="M 30 50 Q 60 45, 90 50" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <ellipse cx="45" cy="55" rx="10" ry="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <ellipse cx="75" cy="55" rx="10" ry="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="55" y1="55" x2="65" y2="55" stroke="#d4af37" strokeWidth="2"/>
            <line x1="50" y1="38" x2="55" y2="38" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="65" y1="38" x2="70" y2="38" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* 8. Adjustable Wrench - Top Left 2 */}
          <svg className="absolute top-1/3 left-1/4 w-32 h-28 animate-float" viewBox="0 0 130 100">
            <path d="M 20 45 L 20 35 L 35 35 L 35 25 L 45 25 L 45 55 L 35 55 L 35 45 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <rect x="30" y="30" width="8" height="20" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="55" cy="40" r="5" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <rect x="45" y="35" width="70" height="10" rx="2" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="60" y1="37" x2="60" y2="43" stroke="#d4af37" strokeWidth="1"/>
            <line x1="70" y1="37" x2="70" y2="43" stroke="#d4af37" strokeWidth="1"/>
            <line x1="80" y1="37" x2="80" y2="43" stroke="#d4af37" strokeWidth="1"/>
            <line x1="90" y1="37" x2="90" y2="43" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* 9. Stacked Bricks - Bottom Center */}
          <svg className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-32 h-28 animate-slide" viewBox="0 0 120 100">
            <rect x="20" y="60" width="80" height="20" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="60" y1="60" x2="60" y2="80" stroke="#d4af37" strokeWidth="2"/>
            <rect x="30" y="40" width="60" height="20" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="60" y1="40" x2="60" y2="60" stroke="#d4af37" strokeWidth="2"/>
            <rect x="40" y="20" width="40" height="20" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <rect x="35" y="65" width="8" height="10" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
            <rect x="52" y="65" width="8" height="10" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
            <rect x="68" y="65" width="8" height="10" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* 10. Wheelbarrow - Bottom Right 2 */}
          <svg className="absolute bottom-10 right-1/4 w-36 h-32 animate-drift" viewBox="0 0 140 120">
            <circle cx="50" cy="90" r="20" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <circle cx="50" cy="90" r="12" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="50" cy="90" r="4" fill="#d4af37"/>
            <line x1="50" y1="70" x2="50" y2="110" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="30" y1="90" x2="70" y2="90" stroke="#d4af37" strokeWidth="1.5"/>
            <path d="M 50 90 L 60 70 L 70 50 L 110 50 L 115 60 L 115 70 L 60 70 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="110" y1="50" x2="115" y2="30" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="115" y1="70" x2="120" y2="50" stroke="#d4af37" strokeWidth="2.5"/>
            <circle cx="115" cy="27" r="3" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="120" cy="47" r="3" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
        </div>

        <div className="container-custom relative z-30">
          <div className={`text-center mb-16 transition-all duration-1000 ${servicesInView ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
            <span className="text-golden-500 font-semibold tracking-wider uppercase text-5xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)' }}>
              Our Services
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.2)' }}>
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
                className={`group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-1000 ${
                  servicesInView ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-20 scale-75 opacity-0'
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
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

          <div className={`text-center mt-12 transition-all duration-1000 delay-[600ms] ${servicesInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
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
      <section id="portfolio-section" className="relative py-24 bg-white overflow-hidden">
        {/* Blueprint Background - Same as About Us */}
        <div className="absolute inset-0 w-full h-full opacity-[0.15]">
          {/* Grid Lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #d4af37 1px, transparent 1px),
              linear-gradient(to bottom, #d4af37 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 25px'
          }}></div>

          {/* Geometrical Shapes */}
          <svg className="absolute top-20 left-1/4 w-16 h-16 opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          <svg className="absolute top-1/3 left-1/2 w-20 h-20 opacity-20" viewBox="0 0 100 100">
            <polygon points="50,10 90,85 10,85" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="50" y1="10" x2="50" y2="85" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          <svg className="absolute bottom-32 right-1/4 w-20 h-20 opacity-20" viewBox="0 0 100 100">
            <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="50" cy="50" r="3" fill="#d4af37"/>
          </svg>

          {/* Compass Symbol */}
          <svg className="absolute top-10 right-10 w-24 h-24 opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="#d4af37" strokeWidth="1"/>
            <line x1="50" y1="5" x2="50" y2="25" stroke="#d4af37" strokeWidth="2"/>
            <line x1="50" y1="75" x2="50" y2="95" stroke="#d4af37" strokeWidth="2"/>
            <line x1="5" y1="50" x2="25" y2="50" stroke="#d4af37" strokeWidth="2"/>
            <line x1="75" y1="50" x2="95" y2="50" stroke="#d4af37" strokeWidth="2"/>
            <polygon points="50,20 55,50 50,45 45,50" fill="#d4af37"/>
          </svg>

          {/* Ruler Symbol */}
          <svg className="absolute bottom-10 left-10 w-32 h-8 opacity-20" viewBox="0 0 200 40">
            <rect x="0" y="0" width="200" height="40" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="20" y1="0" x2="20" y2="15" stroke="#d4af37" strokeWidth="1"/>
            <line x1="40" y1="0" x2="40" y2="20" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="60" y1="0" x2="60" y2="15" stroke="#d4af37" strokeWidth="1"/>
            <line x1="80" y1="0" x2="80" y2="20" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="100" y1="0" x2="100" y2="25" stroke="#d4af37" strokeWidth="2"/>
            <line x1="120" y1="0" x2="120" y2="15" stroke="#d4af37" strokeWidth="1"/>
            <line x1="140" y1="0" x2="140" y2="20" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="160" y1="0" x2="160" y2="15" stroke="#d4af37" strokeWidth="1"/>
            <line x1="180" y1="0" x2="180" y2="20" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* Corner Brackets */}
          <svg className="absolute top-5 left-5 w-16 h-16 opacity-50" viewBox="0 0 50 50">
            <polyline points="15,0 0,0 0,15" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
          <svg className="absolute top-5 right-5 w-16 h-16 opacity-50" viewBox="0 0 50 50">
            <polyline points="35,0 50,0 50,15" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
          <svg className="absolute bottom-5 left-5 w-16 h-16 opacity-50" viewBox="0 0 50 50">
            <polyline points="15,50 0,50 0,35" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
          <svg className="absolute bottom-5 right-5 w-16 h-16 opacity-50" viewBox="0 0 50 50">
            <polyline points="35,50 50,50 50,35" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
        </div>

        {/* Real Construction Instruments - Same as About Us */}
        <div className="absolute inset-0 w-full h-full opacity-[0.35] z-20">
          {/* 1. Measuring Tape */}
          <svg className="absolute top-1/4 left-20 w-32 h-32 animate-float" viewBox="0 0 120 120">
            <rect x="30" y="30" width="60" height="50" rx="8" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <circle cx="60" cy="55" r="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <rect x="85" y="48" width="20" height="14" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="105" y1="50" x2="105" y2="62" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="98" y1="50" x2="98" y2="62" stroke="#d4af37" strokeWidth="1"/>
            <line x1="92" y1="50" x2="92" y2="57" stroke="#d4af37" strokeWidth="1"/>
            <path d="M 105 52 L 110 52 L 110 60 L 105 60" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="40" y1="42" x2="55" y2="42" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="40" y1="50" x2="50" y2="50" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* 2. Spirit Level */}
          <svg className="absolute top-16 right-24 w-36 h-24 animate-sway" viewBox="0 0 140 80">
            <rect x="10" y="25" width="120" height="30" rx="4" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <ellipse cx="70" cy="40" rx="20" ry="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="70" cy="40" r="4" fill="#d4af37"/>
            <rect x="8" y="23" width="8" height="34" rx="2" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <rect x="124" y="23" width="8" height="34" rx="2" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="40" y1="40" x2="40" y2="48" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="100" y1="40" x2="100" y2="48" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* 3. Trowel */}
          <svg className="absolute top-20 right-1/3 w-28 h-32 animate-bounce-slow" viewBox="0 0 100 120">
            <path d="M 50 20 L 80 45 L 70 75 L 30 75 L 20 45 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <rect x="45" y="75" width="10" height="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <rect x="40" y="83" width="20" height="30" rx="10" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="45" y1="88" x2="55" y2="88" stroke="#d4af37" strokeWidth="1"/>
            <line x1="45" y1="93" x2="55" y2="93" stroke="#d4af37" strokeWidth="1"/>
            <line x1="45" y1="98" x2="55" y2="98" stroke="#d4af37" strokeWidth="1"/>
            <line x1="45" y1="103" x2="55" y2="103" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* 4. Power Drill */}
          <svg className="absolute top-1/2 right-32 w-32 h-28 animate-hammer" viewBox="0 0 120 100">
            <rect x="30" y="35" width="50" height="25" rx="3" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <rect x="80" y="38" width="15" height="19" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="102" cy="47.5" r="5" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="107" y1="47.5" x2="115" y2="47.5" stroke="#d4af37" strokeWidth="2"/>
            <path d="M 30 60 L 20 70 L 20 80 L 30 85 L 35 80 L 35 65 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <rect x="27" y="65" width="6" height="10" rx="1" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
            <rect x="32" y="60" width="15" height="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>

          {/* 5. Hand Saw */}
          <svg className="absolute bottom-16 right-20 w-40 h-28 animate-slide" viewBox="0 0 150 100">
            <path d="M 20 40 L 120 30 L 120 35 L 20 45 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <path d="M 30 45 L 35 50 L 40 45 L 45 50 L 50 45 L 55 50 L 60 45 L 65 50 L 70 45 L 75 50 L 80 45 L 85 50 L 90 45 L 95 50 L 100 45 L 105 50 L 110 45 L 115 50 L 120 45"
                  fill="none" stroke="#d4af37" strokeWidth="2"/>
            <path d="M 20 25 Q 15 32.5, 20 40 L 35 40 L 35 25 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <circle cx="25" cy="32.5" r="4" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* 6. Shovel */}
          <svg className="absolute bottom-12 left-20 w-28 h-36 animate-drift" viewBox="0 0 100 140">
            <path d="M 40 90 L 35 110 Q 50 120, 65 110 L 60 90 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <rect x="45" y="80" width="10" height="15" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="50" y1="80" x2="50" y2="20" stroke="#d4af37" strokeWidth="2.5"/>
            <path d="M 50 20 L 40 20 Q 35 20, 35 25 L 35 35 Q 35 40, 40 40 L 50 40" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="38" y1="25" x2="38" y2="35" stroke="#d4af37" strokeWidth="1"/>
            <line x1="42" y1="25" x2="42" y2="35" stroke="#d4af37" strokeWidth="1"/>
            <line x1="46" y1="25" x2="46" y2="35" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* 7. Safety Helmet with Goggles */}
          <svg className="absolute top-1/2 left-28 w-32 h-28 animate-rotate" viewBox="0 0 120 120">
            <path d="M 25 70 Q 25 35, 60 25 Q 95 35, 95 70" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <ellipse cx="60" cy="70" rx="38" ry="10" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <path d="M 30 50 Q 60 45, 90 50" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <ellipse cx="45" cy="55" rx="10" ry="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <ellipse cx="75" cy="55" rx="10" ry="8" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <line x1="55" y1="55" x2="65" y2="55" stroke="#d4af37" strokeWidth="2"/>
            <line x1="50" y1="38" x2="55" y2="38" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="65" y1="38" x2="70" y2="38" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* 8. Adjustable Wrench */}
          <svg className="absolute top-1/3 left-1/4 w-32 h-28 animate-float" viewBox="0 0 130 100">
            <path d="M 20 45 L 20 35 L 35 35 L 35 25 L 45 25 L 45 55 L 35 55 L 35 45 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <rect x="30" y="30" width="8" height="20" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="55" cy="40" r="5" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <rect x="45" y="35" width="70" height="10" rx="2" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="60" y1="37" x2="60" y2="43" stroke="#d4af37" strokeWidth="1"/>
            <line x1="70" y1="37" x2="70" y2="43" stroke="#d4af37" strokeWidth="1"/>
            <line x1="80" y1="37" x2="80" y2="43" stroke="#d4af37" strokeWidth="1"/>
            <line x1="90" y1="37" x2="90" y2="43" stroke="#d4af37" strokeWidth="1"/>
          </svg>

          {/* 9. Stacked Bricks */}
          <svg className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-32 h-28 animate-slide" viewBox="0 0 120 100">
            <rect x="20" y="60" width="80" height="20" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="60" y1="60" x2="60" y2="80" stroke="#d4af37" strokeWidth="2"/>
            <rect x="30" y="40" width="60" height="20" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="60" y1="40" x2="60" y2="60" stroke="#d4af37" strokeWidth="2"/>
            <rect x="40" y="20" width="40" height="20" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <rect x="35" y="65" width="8" height="10" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
            <rect x="52" y="65" width="8" height="10" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
            <rect x="68" y="65" width="8" height="10" fill="none" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>

          {/* 10. Wheelbarrow */}
          <svg className="absolute bottom-10 right-1/4 w-36 h-32 animate-drift" viewBox="0 0 140 120">
            <circle cx="50" cy="90" r="20" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <circle cx="50" cy="90" r="12" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="50" cy="90" r="4" fill="#d4af37"/>
            <line x1="50" y1="70" x2="50" y2="110" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="30" y1="90" x2="70" y2="90" stroke="#d4af37" strokeWidth="1.5"/>
            <path d="M 50 90 L 60 70 L 70 50 L 110 50 L 115 60 L 115 70 L 60 70 Z" fill="none" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="110" y1="50" x2="115" y2="30" stroke="#d4af37" strokeWidth="2.5"/>
            <line x1="115" y1="70" x2="120" y2="50" stroke="#d4af37" strokeWidth="2.5"/>
            <circle cx="115" cy="27" r="3" fill="none" stroke="#d4af37" strokeWidth="2"/>
            <circle cx="120" cy="47" r="3" fill="none" stroke="#d4af37" strokeWidth="2"/>
          </svg>
        </div>

        <div className="container-custom relative z-30">
          <div className={`text-center mb-16 transition-all duration-1000 ${portfolioInView ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
            <span className="text-golden-500 font-semibold tracking-wider uppercase text-5xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)' }}>
              Portfolio
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.2)' }}>
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
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
              },
            ].map((project, i) => (
              <div
                key={i}
                className={`group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-1000 ${
                  portfolioInView ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-20 scale-90 opacity-0'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
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

          <div className={`text-center mt-12 transition-all duration-1000 delay-[600ms] ${portfolioInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
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
      <section id="testimonials-section" className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="container-custom relative z-30">
          <div className={`text-center mb-16 transition-all duration-1000 ${testimonialsInView ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
            <span className="text-golden-400 font-semibold tracking-wider uppercase text-5xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3)' }}>
              Testimonials
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.4)' }}>
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
              <div
                key={i}
                className={`group bg-gradient-to-br from-golden-900/20 via-gray-800/50 to-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-golden-700/30 hover:border-golden-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-golden-500/30 hover:-translate-y-2 hover:from-golden-900/30 hover:via-gray-800/60 ${
                  testimonialsInView ? 'translate-y-0 scale-100 opacity-100 transition-all duration-1000' : 'translate-y-20 scale-90 opacity-0 transition-all duration-1000'
                }`}
                style={{
                  transitionDelay: testimonialsInView ? `${i * 150}ms` : '0ms'
                }}
              >
                <div className="flex mb-4 gap-1">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-6 h-6 text-golden-400 transition-transform duration-300 hover:scale-125 hover:rotate-12"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 italic text-lg mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-golden-400 to-golden-600 flex items-center justify-center text-white font-bold text-xl mr-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-lg group-hover:text-golden-400 transition-colors duration-300">{testimonial.name}</div>
                    <div className="text-golden-400 text-sm group-hover:text-golden-300 transition-colors duration-300">{testimonial.role}</div>
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
