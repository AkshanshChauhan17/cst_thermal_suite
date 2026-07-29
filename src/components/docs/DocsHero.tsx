"use client";

import { motion, Variants } from "framer-motion";
import { BookOpen, Search, X, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function DocsHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search Index - Maps to the IDs we created in DocsContent
  const searchIndex = [
    { id: "getting-started", title: "Getting Started", category: "Introduction", desc: "System requirements and initial setup." },
    { id: "dashboard-overview", title: "Dashboard Overview", category: "Interface", desc: "Understanding active projects and token ledgers." },
    { id: "purchasing-tokens", title: "Purchasing & Tokens", category: "Billing", desc: "How to buy tokens, auto-top up, and deduction rates." },
    { id: "running-calculations", title: "Running Calculations", category: "Engineering", desc: "Input metrics and execute zero-latency thermal calculations." },
    { id: "exporting-reports", title: "Exporting Reports", category: "Outputs", desc: "Download PDF datasheets and CSV/ERP data exports." }
  ];

  // Filter results based on search query
  const filteredResults = searchIndex.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle clicking outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle smooth scroll for search results
  const handleScrollToResult = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsFocused(false);
    setSearchQuery("");
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section className="w-full bg-[#1E1B4B] pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8 relative">
        
        <div className="flex flex-col">
          <motion.div 
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 text-[#86EFAC] font-bold tracking-widest uppercase text-xs mb-6"
          >
            <BookOpen size={16} />
            Knowledge Base
          </motion.div>
          
          <motion.h1 
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]"
          >
            Platform <span className="text-[#5648FC]">Documentation</span>
          </motion.h1>
        </div>

        <motion.div 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="w-full md:w-96 relative z-50"
          ref={searchRef}
        >
          {/* Search Input */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5648FC] transition-colors">
              <Search size={18} />
            </div>
            
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsFocused(true);
              }}
              onFocus={() => setIsFocused(true)}
              placeholder="Search documentation..." 
              className="w-full bg-white/5 border border-gray-700 pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:bg-[#110f2a] focus:outline-none focus:border-[#5648FC] transition-all"
            />
            
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
              >
                <X size={16} />
              </button>
            ) : (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-mono bg-white/10 px-2 py-1 pointer-events-none">
                Ctrl+K
              </div>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isFocused && searchQuery.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 shadow-2xl max-h-[400px] overflow-y-auto z-50">
              <div className="p-3 bg-[#F7F8FA] border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Search Results
              </div>
              
              {filteredResults.length > 0 ? (
                <ul className="flex flex-col">
                  {filteredResults.map((result) => (
                    <li key={result.id}>
                      <a 
                        href={`#${result.id}`}
                        onClick={(e) => handleScrollToResult(e, result.id)}
                        className="flex flex-col p-4 border-b border-gray-100 hover:bg-[#5648FC]/5 hover:border-l-4 hover:border-l-[#5648FC] transition-all group cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[#1E1B4B] font-bold text-sm group-hover:text-[#5648FC] transition-colors">
                            {result.title}
                          </span>
                          <ChevronRight size={14} className="text-gray-300 group-hover:text-[#5648FC] group-hover:translate-x-1 transition-all" />
                        </div>
                        <span className="text-xs text-[#5648FC] font-medium mb-1">{result.category}</span>
                        <span className="text-gray-500 text-xs leading-relaxed line-clamp-1">{result.desc}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center flex flex-col items-center">
                  <Search size={24} className="text-gray-300 mb-3" />
                  <p className="text-[#1E1B4B] font-bold text-sm mb-1">No results found</p>
                  <p className="text-gray-500 text-xs">Try adjusting your search query.</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
        
      </div>
    </section>
  );
}