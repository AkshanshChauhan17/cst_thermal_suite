"use client";

import { motion, Variants } from "framer-motion";

export default function AboutBrandsSection() {
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

  // Generating 10 empty placeholders to match the grid in the reference
  const placeholders = Array.from({ length: 10 });

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gray-600 font-medium text-lg">
            Trusted by 2,500+ industrial and manufacturing companies
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center"
        >
          {placeholders.map((_, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="w-full max-w-[160px] h-16 bg-[#F7F8FA] border border-gray-200 flex items-center justify-center hover:border-[#5648FC] transition-colors duration-300 group"
            >
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px] group-hover:text-[#5648FC] transition-colors">
                Logo Placeholder
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}