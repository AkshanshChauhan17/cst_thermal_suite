"use client";

import { motion, Variants } from "framer-motion";
import { Zap, Activity } from "lucide-react";

export default function CapabilitiesBanner() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="w-full bg-[#F7F8FA] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="bg-white border border-gray-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
        >
          
          <motion.div variants={itemVariants} className="max-w-xl">
            <h2 className="text-3xl md:text-[32px] font-bold text-[#1E1B4B] leading-tight mb-4">
              Advanced thermal analysis built for modern engineering
            </h2>
            <p className="text-[#6B7280] text-sm md:text-base font-medium">
              Accelerate your design process with instant calculations, intuitive workflows, and enterprise-grade reliability right out of the box.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-12 md:gap-20">
            {/* Metric 1: Speed */}
            <div className="flex flex-col items-start">
              <span className="text-4xl md:text-5xl font-bold text-[#1E1B4B] tracking-tight mb-3">
                &lt; 50ms
              </span>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={18} className="text-[#FBBF24]" />
                <span className="text-sm font-bold text-[#4B5563]">
                  Processing Speed
                </span>
              </div>
              <span className="text-[13px] text-[#9CA3AF] font-medium">
                Instant calculations
              </span>
            </div>

            {/* Metric 2: Reliability */}
            <div className="flex flex-col items-start">
              <span className="text-4xl md:text-5xl font-bold text-[#1E1B4B] tracking-tight mb-3">
                99.9%
              </span>
              <div className="flex items-center gap-2 mb-2">
                <Activity size={18} className="text-[#FBBF24]" />
                <span className="text-sm font-bold text-[#4B5563]">
                  Reliability
                </span>
              </div>
              <span className="text-[13px] text-[#9CA3AF] font-medium">
                Cloud-native infrastructure
              </span>
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}