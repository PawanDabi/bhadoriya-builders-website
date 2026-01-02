"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useContactModal } from "@/contexts/ContactModalContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useContactModal();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar when scrolled past 80% of viewport height (hero section)
      const heroSectionHeight = window.innerHeight * 0.8;
      setIsScrolled(window.scrollY > heroSectionHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg py-3"
          : "bg-black/20 backdrop-blur-md py-0"
      }`}
    >
      <div className="container-custom">
        <div
          className={`flex justify-between items-center transition-all duration-500 ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Logo
              className={`transition-all duration-500 ${
                isScrolled ? "w-10 h-10" : "w-12 h-12"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-all duration-300 relative group ${
                    isScrolled
                      ? `text-gray-700 hover:text-golden-600 ${isActive ? "text-golden-600" : ""}`
                      : `text-white hover:text-golden-400 ${isActive ? "text-golden-400" : ""}`
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-golden-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}
            <button
              onClick={openModal}
              className={`px-6 bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-600 hover:to-golden-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 ${
                isScrolled ? "py-2" : "py-2.5"
              }`}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden focus:outline-none p-2 rounded-lg transition-colors duration-300 ${
              isScrolled
                ? "text-gray-700 hover:bg-golden-50"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-4 bg-white pt-2 space-y-1">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 transform ${
                    isActive
                      ? "bg-golden-50 text-golden-600 translate-x-2"
                      : "text-gray-700 hover:text-golden-600 hover:bg-golden-50 hover:translate-x-2"
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <span className="flex items-center">
                    {isActive && (
                      <svg
                        className="w-4 h-4 mr-2 text-golden-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {link.label}
                  </span>
                </Link>
              );
            })}
            <button
              className="block mt-4 px-6 py-3 bg-gradient-to-r from-golden-500 to-golden-600 hover:from-golden-600 hover:to-golden-700 text-white font-semibold rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 w-full"
              onClick={() => {
                setIsOpen(false);
                openModal();
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
