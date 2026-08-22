"use client";

import { motion, Variants } from "framer-motion";
import { Check, Phone, User } from "lucide-react";
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

  const floatingVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.6 }
    },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
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

          <div className="relative w-full h-[500px] md:h-[600px] order-2 lg:order-1 mt-10 lg:mt-0">
            <div className="absolute inset-0 bg-gray-200 border border-gray-300 flex items-center justify-center shadow-inner z-0">
              <span className="text-gray-400 font-semibold text-xl tracking-widest uppercase">
                <Image
                  src="/h8.jpg"
                  alt="Professional Computational Tools for Thermal Engineering"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1440px"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="/h8_low.png"
                  className="object-cover"
                />
              </span>
            </div>

            <motion.div
              variants={floatingVariants}
              initial="hidden"
              whileInView="visible"
              animate="animate"
              viewport={{ once: true }}
              className="absolute top-12 left-8 md:left-12 w-16 h-16 bg-white border border-gray-200 shadow-xl flex items-center justify-center z-10"
            >
              <User size={24} className="text-gray-400" />
            </motion.div>

            <motion.div
              variants={floatingVariants}
              initial="hidden"
              whileInView="visible"
              animate="animate"
              viewport={{ once: true }}
              className="absolute top-32 right-8 md:right-12 w-16 h-16 bg-white border border-gray-200 shadow-xl flex items-center justify-center z-10"
              style={{ animationDelay: "1s" }}
            >
              <User size={24} className="text-gray-400" />
            </motion.div>

            <motion.div
              variants={floatingVariants}
              initial="hidden"
              whileInView="visible"
              animate="animate"
              viewport={{ once: true }}
              className="absolute bottom-40 -left-4 md:-left-6 w-16 h-16 bg-white border border-gray-200 shadow-xl flex items-center justify-center z-10"
              style={{ animationDelay: "2s" }}
            >
              <User size={24} className="text-gray-400" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] md:w-[380px] bg-white border border-gray-200 shadow-2xl p-4 flex items-center justify-between z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F7F8FA] border border-gray-200 flex items-center justify-center text-gray-500">
                  <User size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#1E1B4B] font-bold text-sm">Active Session</span>
                  <span className="text-gray-500 text-xs">Engineering Team Alpha</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-[#5648FC] text-white flex items-center justify-center hover:bg-[#4336d6] transition-colors cursor-pointer">
                <Phone size={18} />
              </div>
            </motion.div>
          </div>

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