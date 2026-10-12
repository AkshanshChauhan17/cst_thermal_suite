"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function ReportsSection() {
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

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Text & Metrics */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col pr-0 lg:pr-12"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-block bg-[#F7F8FA] border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6">
                Computational Reports
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-[#1E1B4B] mb-6 tracking-tight leading-[1.15]"
            >
              Precision reporting that drives engineering decisions
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-500 text-lg mb-10 leading-relaxed"
            >
              Every thermal setup is unique. Whether optimizing existing coils or testing new component limits, our token-powered reporting tools map out the exact computational paths needed for peak performance.
            </motion.p>

            <motion.div variants={itemVariants} className="w-full h-px bg-gray-200 mb-10"></motion.div>

            <motion.div variants={containerVariants} className="flex flex-col gap-8">
              <motion.div variants={itemVariants} className="flex items-center gap-8">
                <span className="text-4xl font-bold text-[#1E1B4B] min-w-[90px]">2.4X</span>
                <span className="text-gray-600 text-sm font-medium">Faster calculation cycle speeds</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Single Image with Fade-in Scroll Animation */}
          <motion.div
            variants={imageFadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full h-[500px] md:h-[600px] mt-16 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gray-200 border border-gray-300 flex items-center justify-center shadow-inner z-0">
              <span className="text-gray-400 font-semibold text-xl tracking-widest uppercase">
                <Image
                  src="/h7.jpg"
                  alt="Professional Computational Tools for Thermal Engineering"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1440px"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="/h7_low.png"
                  className="object-cover"
                />
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}