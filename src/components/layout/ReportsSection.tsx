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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 }
    },
  };

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

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
                <span className="text-4xl font-bold text-[#1E1B4B] min-w-[90px]">30%</span>
                <span className="text-gray-600 text-sm font-medium">Reduction in thermal energy loss</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-8">
                <span className="text-4xl font-bold text-[#1E1B4B] min-w-[90px]">2.4X</span>
                <span className="text-gray-600 text-sm font-medium">Faster calculation cycle speeds</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="relative w-full h-[500px] md:h-[600px] mt-16 lg:mt-0">
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

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute -bottom-6 left-0 md:-left-8 w-[260px] bg-white border border-gray-200 shadow-2xl p-6 z-10 flex flex-col"
            >
              <span className="text-sm font-bold text-[#1E1B4B] mb-6">Efficiency Trend</span>

              <div className="w-full h-24 flex items-end justify-between gap-2 border-b border-gray-200 pb-2">
                {[30, 45, 25, 60, 40, 75, 55, 90].map((height, i) => (
                  <div
                    key={i}
                    className="w-full bg-gradient-to-t from-[#5648FC] to-[#887efa] opacity-90"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute -bottom-12 right-0 md:-right-8 w-[220px] bg-white border border-gray-200 shadow-2xl p-6 z-20 flex flex-col items-center justify-center"
              style={{ transitionDelay: "150ms" }}
            >
              <div className="relative w-32 h-32 bg-[#F7F8FA] border border-gray-200 mb-6 flex items-center justify-center">
                <div className="absolute bottom-0 left-0 w-full bg-[#5648FC] h-[82%]"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-white tracking-tight">82%</span>
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mt-1">Accuracy</span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#5648FC]"></div>
                  <div className="h-1 w-full bg-gray-200">
                    <div className="h-full bg-[#5648FC] w-[82%]"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300"></div>
                  <div className="h-1 w-full bg-gray-200">
                    <div className="h-full bg-gray-400 w-[18%]"></div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}