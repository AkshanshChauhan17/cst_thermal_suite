"use client";

import { motion, Variants } from "framer-motion";
import { Calculator } from "lucide-react";

export default function ProductsHero() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section className="w-full bg-[#1E1B4B] pt-32 pb-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        
        <motion.div 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="inline-block bg-[#5648FC]/20 border border-[#5648FC]/50 text-[#86EFAC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-8"
        >
          CST Thermal Suite
        </motion.div>
        
        <motion.h1 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]"
        >
          Thermal Engineering <br />
          <span className="text-[#5648FC]">Software Solutions</span>
        </motion.h1>
        
        <motion.p 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mb-12"
        >
          Practical software and product-selection tools for HVAC, refrigeration, industrial cooling, heat-transfer equipment, and cold-storage applications.
        </motion.p>
        
        <motion.div 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <button className="flex items-center gap-3 bg-[#5648FC] text-white px-8 py-4 font-bold text-base hover:bg-[#4336d6] transition-colors border border-transparent hover:border-[#86EFAC]/50">
            <Calculator size={20} />
            Open Engineering Calculator
          </button>
        </motion.div>
        
      </div>
    </section>
  );
}