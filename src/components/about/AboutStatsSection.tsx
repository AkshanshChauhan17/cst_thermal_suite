"use client";

import { motion, Variants } from "framer-motion";

export default function AboutStatsSection() {
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

  const stats = [
    {
      value: "2,500+",
      label: "Active Indian Teams",
      description: "Powering industrial engineering with seamless token-based thermal calculations across the subcontinent."
    },
    {
      value: "10M+",
      label: "Tokens Processed",
      description: "Executing complex thermal simulations daily with an absolute zero-latency computational architecture."
    },
    {
      value: "80%",
      label: "Reduction in Time",
      description: "Drastically reducing calculation cycles compared to traditional manual component testing methods."
    },
    {
      value: "120+",
      label: "Enterprise Partners",
      description: "Integrated deeply with the world's leading ERP, supply chain, and CAD software providers."
    }
  ];

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E1B4B] tracking-tight">
            We engineer differently
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="flex flex-col pt-6 border-t border-gray-200"
            >
              <span className="text-4xl md:text-5xl font-bold text-[#1E1B4B] mb-2 tracking-tight">
                {stat.value}
              </span>
              <span className="text-base font-bold text-[#5648FC] mb-4">
                {stat.label}
              </span>
              <p className="text-gray-500 text-sm leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}