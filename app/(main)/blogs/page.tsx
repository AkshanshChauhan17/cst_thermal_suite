"use client";

import CTASection from "@/src/components/layout/CTASection";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Thermodynamics", "SaaS Architecture", "HVAC Design", "Engineering Reports"];

  const blogs = [
    {
      id: 1,
      title: "Optimizing Heat Exchanger Fin Geometries for Extreme Industrial Environments",
      category: "Thermodynamics",
      date: "July 24, 2026",
      readTime: "6 min read",
      excerpt: "An in-depth look at how computational fluid dynamics (CFD) and token-based simulations reduce prototyping cycles for condenser coils.",
      image: "/coil_img1.webp",
      featured: true
    },
    {
      id: 2,
      title: "Why Zero-Latency Calculation Engines Matter in Modern HVAC Software",
      category: "SaaS Architecture",
      date: "July 18, 2026",
      readTime: "4 min read",
      excerpt: "Exploring the backend architectural shifts required to process complex thermodynamic calculations in milliseconds.",
      image: "/coil_img1.webp",
      featured: false
    },
    {
      id: 3,
      title: "A Practical Guide to Steam and Chilled Water Coil Selection",
      category: "HVAC Design",
      date: "July 12, 2026",
      readTime: "8 min read",
      excerpt: "Step-by-step methodologies for determining airside performance, pressure drop, and waterside data without manual calculation errors.",
      image: "/coil_img1.webp",
      featured: false
    },
    {
      id: 4,
      title: "Automating Enterprise Engineering Reports for CAD and ERP Sync",
      category: "Engineering Reports",
      date: "June 30, 2026",
      readTime: "5 min read",
      excerpt: "How manufacturing plants bridge the gap between theoretical software outputs and physical shop-floor fabrication data.",
      image: "/coil_img1.webp",
      featured: false
    }
  ];

  const filteredBlogs = activeCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      <section className="w-full bg-[#1E1B4B] pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#5648FC]/5 border-l border-[#5648FC]/10 skew-x-12 translate-x-16 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#5648FC]/20 border border-[#5648FC]/50 text-[#86EFAC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6 rounded-none">
            <BookOpen size={14} />
            Blogs
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Articles & Technical <br />
            <span className="text-[#5648FC]">Whitepapers</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Expert perspectives on thermodynamic software engineering, industrial manufacturing standards, and SaaS optimization.
          </p>
        </div>
      </section>
      <section className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors rounded-none ${
                activeCategory === cat
                  ? "bg-[#1E1B4B] text-white"
                  : "bg-[#F7F8FA] text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {activeCategory === "All" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 bg-white border border-gray-200 grid grid-cols-1 lg:grid-cols-12 shadow-xl rounded-none group overflow-hidden"
          >
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[400px] bg-[#110f2a]">
              <img 
                src={blogs[0].image} 
                alt={blogs[0].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#5648FC] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-none">
                Featured Article
              </div>
            </div>

            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-mono">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {blogs[0].date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {blogs[0].readTime}</span>
                </div>

                <span className="text-xs font-bold text-[#5648FC] uppercase tracking-wider block mb-2">{blogs[0].category}</span>
                
                <h2 className="text-2xl md:text-3xl font-bold text-[#1E1B4B] mb-4 tracking-tight leading-snug group-hover:text-[#5648FC] transition-colors">
                  {blogs[0].title}
                </h2>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {blogs[0].excerpt}
                </p>
              </div>

              <Link 
                href="#" 
                className="inline-flex items-center gap-2 text-[#1E1B4B] font-bold text-sm hover:text-[#5648FC] transition-colors uppercase tracking-wide group/link"
              >
                Read Full Article
                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <motion.article 
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 flex flex-col justify-between shadow-lg hover:border-[#5648FC] transition-all duration-300 rounded-none group"
            >
              <div>
                <div className="relative h-52 bg-[#110f2a] overflow-hidden border-b border-gray-100">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1E1B4B] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-none">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-mono">
                    <span className="flex items-center gap-1"><Calendar size={13} /> {blog.date}</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {blog.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1E1B4B] mb-3 tracking-tight leading-snug group-hover:text-[#5648FC] transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 md:px-8 pb-8 pt-0">
                <Link 
                  href="/blogs/1" 
                  className="inline-flex items-center gap-2 text-[#5648FC] font-bold text-xs uppercase tracking-wider hover:text-[#1E1B4B] transition-colors group/link"
                >
                  Read Article
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </section>

      <CTASection />
    </main>
  );
}