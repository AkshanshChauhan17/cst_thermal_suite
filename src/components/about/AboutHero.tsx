"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutHero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } 
    },
  };

  return (
    <section className="w-full bg-[#5648FC] pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20"
        >
          <div className="flex flex-col justify-between">
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-10 leading-tight"
            >
              About our company
            </motion.h1>
            
            <motion.div variants={itemVariants}>
              <Link 
                href="/careers" 
                className="inline-flex items-center gap-2 text-white font-bold text-sm hover:text-[#86EFAC] transition-colors group"
              >
                Join our engineering team
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 justify-start pt-2">
            <motion.p variants={itemVariants} className="text-white/80 text-lg leading-relaxed">
              We are Thermal Suite, a pioneer in bridging high-performance physical thermal coils with advanced computational SaaS. We empower Indian manufacturing businesses to increase operational efficiency with enterprise-grade token ecosystems built to acquire precise calculations and engage engineering teams.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-white/80 text-lg leading-relaxed">
              Founded to solve a critical gap in industrial manufacturing, we eliminate the disconnect between physical hardware units and real-time computational optimization. Our proprietary Token Depletion Engine ensures that your team can execute complex simulations with zero latency, absolute precision, and complete transparent oversight.
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="w-full h-[400px] md:h-[600px] bg-gray-200 border border-gray-300 shadow-2xl flex items-center justify-center relative overflow-hidden"
        >
          <span className="text-gray-500 font-bold uppercase tracking-widest text-sm z-10 relative bg-white/80 px-6 py-2 border border-gray-300">
            Team Collaboration Image Placeholder
          </span>
        </motion.div>

      </div>
    </section>
  );
}