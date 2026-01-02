"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Modern Family Home",
    category: "Residential",
    location: "Greenville, CA",
    description: "A stunning 3,500 sq ft modern family home featuring open-concept living, floor-to-ceiling windows, and sustainable materials.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Downtown Office Complex",
    category: "Commercial",
    location: "Metro City",
    description: "State-of-the-art 50,000 sq ft office complex with modern amenities and energy-efficient design.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Luxury Kitchen Remodel",
    category: "Renovation",
    location: "Riverside, CA",
    description: "Complete kitchen transformation with custom cabinetry, marble countertops, and professional-grade appliances.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Coastal Villa",
    category: "Residential",
    location: "Beach City, CA",
    description: "Elegant coastal villa with ocean views, outdoor entertainment areas, and luxury finishes throughout.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Retail Shopping Center",
    category: "Commercial",
    location: "Suburban Plaza",
    description: "Multi-tenant retail center with 30,000 sq ft of modern shopping space and ample parking.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Historic Home Restoration",
    category: "Renovation",
    location: "Old Town District",
    description: "Careful restoration of a 1920s historic home while preserving original architectural details.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Contemporary Townhouse",
    category: "Residential",
    location: "Urban Heights",
    description: "Multi-level townhouse with smart home technology and rooftop terrace.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Industrial Warehouse",
    category: "Commercial",
    location: "Industrial Park",
    description: "75,000 sq ft warehouse facility with loading docks and office space.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Basement Conversion",
    category: "Renovation",
    location: "Hillside, CA",
    description: "Transformed unfinished basement into a modern entertainment space with home theater and bar.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2080&auto=format&fit=crop",
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const categories = ["All", "Residential", "Commercial", "Renovation"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="mt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
            alt="Our Portfolio"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

        <div className="relative z-10 container-custom text-white text-center">
          <div className="animate-fadeInDown">
            <span className="text-golden-400 font-semibold tracking-[0.3em] text-sm uppercase">
              Our Work
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mt-6 mb-6 animate-fadeInUp">
            Portfolio
          </h1>
          <p className="text-2xl text-gray-200 max-w-3xl mx-auto animate-fadeInUp animation-delay-200">
            Explore our collection of completed projects showcasing quality and innovation
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b sticky top-20 z-40 shadow-md">
        <div className="container-custom py-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-golden-500 to-golden-600 text-white shadow-lg shadow-golden-500/50"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer animate-fadeIn"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      hoveredProject === project.id ? "scale-110 brightness-75" : "scale-100"
                    }`}
                  />

                  {/* Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-60"
                  }`}>
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-golden-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        {project.category}
                      </span>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-6 right-6">
                      <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                        {project.year}
                      </span>
                    </div>

                    {/* View Details Button - Shows on Hover */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      hoveredProject === project.id ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}>
                      <div className="bg-golden-500 hover:bg-golden-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 shadow-xl transform transition-all duration-300 hover:scale-105">
                        <span>View Details</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-golden-600 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-5 h-5 mr-2 text-golden-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span className="text-sm font-medium">{project.location}</span>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-5">{project.description}</p>

                  {/* Decorative Bottom Border */}
                  <div className="w-16 h-1 bg-gradient-to-r from-golden-500 to-golden-600 rounded-full transform transition-all duration-500 group-hover:w-full"></div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 animate-fadeIn">
              <div className="text-gray-400 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="text-gray-500 text-xl">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-golden-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-golden-500/10 rounded-full blur-3xl"></div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <span className="text-golden-400 font-semibold tracking-wider uppercase text-sm">
              Our Achievements
            </span>
            <h2 className="text-5xl font-bold mt-4 mb-6">Project Statistics</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Numbers that showcase our experience and commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Completed Projects", icon: "🏗️" },
              { number: "20M+", label: "Square Feet Built", icon: "📐" },
              { number: "98%", label: "Client Satisfaction", icon: "⭐" },
              { number: "15", label: "Industry Awards", icon: "🏆" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group text-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-golden-500 transition-all duration-500 hover:transform hover:scale-105 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="text-5xl mb-4 transform transition-transform duration-500 group-hover:scale-125">
                  {stat.icon}
                </div>
                <div className="text-5xl md:text-6xl font-bold text-golden-400 mb-3 group-hover:text-golden-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg font-medium">{stat.label}</div>
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
          <h2 className="text-5xl font-bold mb-6">Let's Build Your Next Project</h2>
          <p className="text-2xl text-golden-100 mb-10 max-w-2xl mx-auto">
            Ready to see your project come to life? Contact us today for a free consultation
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-5 bg-white text-golden-600 hover:bg-gray-100 font-semibold text-xl rounded-lg transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-105"
          >
            Get Started
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
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
