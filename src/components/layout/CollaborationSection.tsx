"use client";

import { motion, Variants } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

export default function CollaborationSection() {
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

  const imageFadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  const features = [
    "Shared computation sessions",
    "Real-time data sync",
    "Role-based tool access",
    "Direct ERP integration",
    "Unified token ledger",
    "Instant export & sharing"
  ];

  return (
    <section className="w-full bg-[#F7F8FA] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Single Image with Fade-in Scroll Animation */}
          <motion.div
            variants={imageFadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full h-[500px] md:h-[600px] order-2 lg:order-1 mt-10 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gray-200 border border-gray-300 flex items-center justify-center shadow-inner z-0">
              <span className="text-gray-400 font-semibold text-xl tracking-widest uppercase">
                <Image
                  src="/h8_v2.jpg"
                  alt="Professional Computational Tools for Thermal Engineering"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1440px"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="/h8_v2_low.jpg"
                  className="object-cover"
                />
              </span>
            </div>
          </motion.div>

          {/* Right Column: Text & Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col pl-0 lg:pl-8 order-1 lg:order-2"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-block bg-white border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6 shadow-sm">
                Collaborate
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-[#1E1B4B] mb-6 tracking-tight leading-[1.15]"
            >
              Seamlessly collaborate across engineering teams.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-500 text-lg mb-10 leading-relaxed"
            >
              Share thermal computation results, track component manufacturing statuses, and manage token allocations across your entire organization instantly. Shared sessions equal faster deployment.
            </motion.p>

            <motion.div variants={itemVariants} className="w-full h-px bg-gray-200 mb-8"></motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#5648FC]/10 flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-[#5648FC]" />
                  </div>
                  <span className="text-gray-600 text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}