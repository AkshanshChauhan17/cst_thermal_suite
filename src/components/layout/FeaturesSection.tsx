"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Zap, Shield, Layers, Cpu, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  const popupVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" } 
    }
  };

  const features = [
    {
      icon: <Zap size={24} className="text-[#5648FC]" />,
      title: "Real-time Execution",
      description: "Process complex thermal calculations instantly with our token-optimized computational engine.",
      link: "/tools/execution",
      details: [
        "Live calculation rendering",
        "Zero-latency processing",
        "Dynamic thermal mapping",
        "Instant export to PDF/CSV"
      ]
    },
    {
      icon: <Shield size={24} className="text-[#5648FC]" />,
      title: "Secure Architecture",
      description: "Enterprise-level security for your proprietary hardware configurations and performance data.",
      link: "/security",
      details: [
        "End-to-end encryption",
        "Role-based access control",
        "Automated compliance logs",
        "Proprietary data isolation"
      ]
    },
    {
      icon: <Layers size={24} className="text-[#5648FC]" />,
      title: "Seamless Integration",
      description: "Connect computational outputs directly with your component manufacturing units.",
      link: "/component-unit",
      details: [
        "ERP system webhooks",
        "Automated BOM generation",
        "Direct CAD software sync",
        "Manufacturing API access"
      ]
    },
    {
      icon: <Cpu size={24} className="text-[#5648FC]" />,
      title: "Token Economy",
      description: "Transparent credit tracking, auto-depletion locks, and frictionless in-session top-ups.",
      link: "/pricing",
      details: [
        "Real-time token ledger",
        "Auto-depletion protection",
        "In-session instant top-up",
        "Admin override controls"
      ]
    }
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
            Core Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#1E1B4B] mb-6 tracking-tight"
          >
            Enterprise-grade tools for precision engineering
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            A robust computational ecosystem designed to optimize thermal coils, manage unit components, and streamline industrial workflows with zero friction.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group flex flex-col bg-[#F7F8FA] border border-gray-200 p-8 hover:border-[#5648FC] transition-colors duration-300 min-h-[320px]"
            >
              <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center mb-6 group-hover:bg-[#5648FC]/5 transition-colors">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-[#1E1B4B] mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                {feature.description}
              </p>
              
              <div className="flex items-center gap-2 text-sm font-semibold text-[#5648FC] mt-auto w-fit">
                Hover to explore
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div 
                    variants={popupVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0 bg-[#1E1B4B] p-8 flex flex-col z-10 border border-[#5648FC] shadow-2xl"
                  >
                    <h4 className="text-white font-bold text-lg mb-6 border-b border-gray-700 pb-4">
                      Inside {feature.title}
                    </h4>
                    
                    <ul className="flex flex-col gap-4 flex-grow">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                          <Check size={18} className="text-[#5648FC] flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <Link 
                      href={feature.link}
                      className="mt-6 w-full bg-[#5648FC] text-white text-center py-3 text-sm font-semibold hover:bg-white hover:text-[#1E1B4B] transition-colors"
                    >
                      Access Tool
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}