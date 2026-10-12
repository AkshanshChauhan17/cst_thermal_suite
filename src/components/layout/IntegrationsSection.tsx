"use client";

import { motion, Variants } from "framer-motion";
import { PenTool, Users, HardHat, Factory, Zap, Server, Settings } from "lucide-react";

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
    { name: "HVAC System Designers", icon: <PenTool size={24} className="text-[#5648FC]" /> },
    { name: "HVAC Consultants", icon: <Users size={24} className="text-[#1E1B4B]" /> },
    { name: "HVAC Contractors", icon: <HardHat size={24} className="text-[#5648FC]" /> },
    { name: "Coil Manufacturers", icon: <Factory size={24} className="text-[#1E1B4B]" /> },
    { name: "Power Generation Consultants", icon: <Zap size={24} className="text-[#5648FC]" /> },
    { name: "Power Generation Contractors", icon: <Zap size={24} className="text-[#1E1B4B]" /> },
    { name: "Data Center Consultants", icon: <Server size={24} className="text-[#5648FC]" /> },
    { name: "Data Center Contractors", icon: <Server size={24} className="text-[#1E1B4B]" /> },
    { name: "Power Generation Equipment Manufacturers", icon: <Settings size={24} className="text-[#5648FC]" /> }
  ];

  return (
    <section className="w-full bg-[#F7F8FA] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-[#F7F8FA] border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6"
          >
            Who We Serve
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#1E1B4B] mb-6 tracking-tight"
          >
            Industries That Can Use Our Software
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            Our software is purpose-built to accelerate design, streamline workflows, and ensure precise computational accuracy for professionals across heavy engineering and thermal management sectors.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-6xl mx-auto"
        >
          {industries.map((industry, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="flex items-center gap-3 bg-[#F7F8FA] border border-gray-200 py-4 px-6 md:px-8 hover:border-[#5648FC] hover:shadow-lg transition-all duration-300 min-w-[240px] md:min-w-[280px] justify-start group"
            >
              <div className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                {industry.icon}
              </div>
              <span className="font-bold text-[#1E1B4B] text-sm md:text-base tracking-tight leading-tight text-left">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}