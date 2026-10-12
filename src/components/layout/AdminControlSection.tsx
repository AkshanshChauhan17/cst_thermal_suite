"use client";

import { motion, Variants } from "framer-motion";
import { Shield, Database } from "lucide-react";
import Image from "next/image";

export default function AdminControlSection() {
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
    <section className="w-full border-[#e0dfdf] border-1 bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Text & Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col pr-0 lg:pr-8"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-block bg-[#F7F8FA] border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6">
                Global Oversight
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-[#1E1B4B] mb-6 tracking-tight leading-[1.15]"
            >
              Centralized control for user access and tokens
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-500 text-lg mb-10 leading-relaxed"
            >
              Monitor your entire client directory, manage computational workflows, and resolve disputes instantly. Our admin dashboard gives you the power to toggle tool access and audit usage seamlessly.
            </motion.p>

            <motion.div variants={itemVariants} className="w-full h-px bg-gray-200 mb-10"></motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div variants={itemVariants} className="flex flex-col">
                <div className="w-12 h-12 bg-[#F7F8FA] border border-gray-200 flex items-center justify-center mb-5 text-[#5648FC]">
                  <Shield size={24} />
                </div>
                <h3 className="text-[#1E1B4B] font-bold text-lg mb-2">Access Overrides</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Manually lock or unlock any computational tool for specific users, overriding current balances.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <div className="w-12 h-12 bg-[#F7F8FA] border border-gray-200 flex items-center justify-center mb-5 text-[#5648FC]">
                  <Database size={24} />
                </div>
                <h3 className="text-[#1E1B4B] font-bold text-lg mb-2">Token Ledger</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Audit user computation history and manually gift tokens to ensure uninterrupted VIP sessions.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Single Image with Fade-in Scroll Animation */}
          <motion.div
            variants={imageFadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full h-[500px] md:h-[600px] mt-10 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gray-200 border border-gray-300 flex items-center justify-center shadow-inner z-0">
              <span className="text-gray-400 font-semibold text-xl tracking-widest uppercase">
                <Image
                  src="/h10.jpg"
                  alt="Professional Computational Tools for Thermal Engineering"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1440px"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="/h10_low.png"
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