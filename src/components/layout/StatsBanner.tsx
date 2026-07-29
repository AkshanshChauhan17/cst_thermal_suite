"use client";

import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";

export default function StatsBanner() {
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
              More than 2,500 engineering teams use Thermal Suite
            </h2>
            <p className="text-[#6B7280] text-sm md:text-base font-medium">
              Optimize thermal performance, execute complex calculations, and scale your industrial operations faster.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-12 md:gap-20">
            <div className="flex flex-col items-start">
              <span className="text-4xl md:text-5xl font-bold text-[#1E1B4B] tracking-tight mb-3">
                4.9
              </span>
              <div className="flex items-center gap-1.5 mb-2">
                <Star size={16} fill="#FBBF24" color="#FBBF24" />
                <Star size={16} fill="#FBBF24" color="#FBBF24" />
                <Star size={16} fill="#FBBF24" color="#FBBF24" />
                <Star size={16} fill="#FBBF24" color="#FBBF24" />
                <Star size={16} fill="#FBBF24" color="#FBBF24" />
              </div>
              <span className="text-[13px] text-[#9CA3AF] font-medium">
                Capterra
              </span>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-4xl md:text-5xl font-bold text-[#1E1B4B] tracking-tight mb-3">
                4.8
              </span>
              <div className="flex items-center gap-1.5 mb-2">
                <Star size={16} fill="#FBBF24" color="#FBBF24" />
                <Star size={16} fill="#FBBF24" color="#FBBF24" />
                <Star size={16} fill="#FBBF24" color="#FBBF24" />
                <Star size={16} fill="#FBBF24" color="#FBBF24" />
                <Star size={16} fill="#FBBF24" color="#FBBF24" />
              </div>
              <span className="text-[13px] text-[#9CA3AF] font-medium">
                Trustpilot
              </span>
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}