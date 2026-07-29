"use client";

import { motion, Variants } from "framer-motion";
import { Factory, Plane, Car, Server, Zap, Droplets, Anchor, HeartPulse, Wind, ShieldAlert } from "lucide-react";

export default function IndustriesSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  const industries = [
    { name: "HVAC Systems", icon: <Wind size={24} className="text-[#5648FC]" /> },
    { name: "Aerospace", icon: <Plane size={24} className="text-[#1E1B4B]" /> },
    { name: "Automotive", icon: <Car size={24} className="text-[#5648FC]" /> },
    { name: "Data Centers", icon: <Server size={24} className="text-[#1E1B4B]" /> },
    { name: "Power Generation", icon: <Zap size={24} className="text-[#5648FC]" /> },
    { name: "Chemical Processing", icon: <Droplets size={24} className="text-[#1E1B4B]" /> },
    { name: "Marine Engineering", icon: <Anchor size={24} className="text-[#5648FC]" /> },
    { name: "Medical Devices", icon: <HeartPulse size={24} className="text-[#1E1B4B]" /> },
    { name: "Heavy Manufacturing", icon: <Factory size={24} className="text-[#5648FC]" /> },
    { name: "Defense & Security", icon: <ShieldAlert size={24} className="text-[#1E1B4B]" /> }
  ];

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-[#F7F8FA] border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6"
          >
            Industries Served
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#1E1B4B] mb-6 tracking-tight"
          >
            Engineered for high-performance sectors
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            Our thermal coils and computational token-based tools are trusted across diverse industries requiring absolute precision, efficiency, and real-time reliability.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {industries.map((industry, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="flex items-center gap-3 bg-[#F7F8FA] border border-gray-200 py-4 px-6 md:px-8 hover:border-[#5648FC] hover:shadow-lg transition-all duration-300 min-w-[160px] md:min-w-[200px] justify-center group"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {industry.icon}
              </div>
              <span className="font-bold text-[#1E1B4B] text-sm md:text-base tracking-tight">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}