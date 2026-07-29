"use client";

import { motion, Variants } from "framer-motion";
import { Briefcase, ArrowDown } from "lucide-react";

export default function CareersHero() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section className="w-full bg-[#1E1B4B] pt-32 pb-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800 relative overflow-hidden">
      {/* Sharp industrial background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#5648FC]/5 border-l border-[#5648FC]/10 skew-x-12 translate-x-16 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
        
        <motion.div 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="inline-block bg-[#5648FC]/20 border border-[#5648FC]/50 text-[#86EFAC] text-xs font-bold tracking-widest uppercase px-6 py-2 mb-8 rounded-none"
        >
          Join Our Engineering Team
        </motion.div>
        
        <motion.h1 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]"
        >
          Build the Future of <br />
          <span className="text-[#5648FC]">Thermal Software</span>
        </motion.h1>
        
        <motion.p 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mb-12"
        >
          We are assembling world-class thermodynamic engineers, full-stack architects, and industrial specialists to redefine computational cooling and HVAC design across India.
        </motion.p>
        
        <motion.div 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <a 
            href="#openings" 
            className="flex items-center gap-3 bg-[#86EFAC] text-[#1E1B4B] px-8 py-4 font-bold text-base hover:bg-white transition-colors border border-transparent rounded-none"
          >
            <Briefcase size={20} />
            View Open Positions
          </a>
        </motion.div>
        
      </div>
    </section>
  );
}