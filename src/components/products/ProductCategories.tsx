"use client";

import { motion, Variants } from "framer-motion";
import { Box, ThermometerSnowflake, Settings2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductCategories() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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

  const categories = [
    {
      title: "Coil Selection Software",
      icon: <Settings2 size={32} className="text-[#5648FC]" />,
      description: "Select and design Steam Coils, Hot Water Coils, Chilled Water Coils, DX Cooling Coils, and Condenser Coils with practical thermal calculations, coil geometry, airside performance, waterside data, pressure drop, and engineering reports."
    },
    {
      title: "Product Selectors",
      icon: <Box size={32} className="text-[#1E1B4B]" />,
      description: "Choose Fluid Cooler Coils, Remote Radiator Coils, Air-to-Air Coolers, Thermic Fluid Heating Coils, Gas Coolers, Special Fluid Coolers, and Adiabatic Coolers for industrial cooling, process heating, engine cooling, and specialised heat-transfer applications."
    },
    {
      title: "Cold Storage Solutions",
      icon: <ThermometerSnowflake size={32} className="text-[#5648FC]" />,
      description: "Support low-temperature refrigeration applications with Low Temperature Cooling Units, Air-Cooled Condensers, and Evaporative Coolers designed for cold rooms, food storage, warehouses, process cooling, and refrigeration systems."
    }
  ];

  return (
    <section className="w-full bg-[#F7F8FA] py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E1B4B] tracking-tight mb-6">
            Core Software Suites
          </h2>
          <p className="text-gray-500 text-lg">
            Powerful selection and design tools built for absolute accuracy in manufacturing environments.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {categories.map((cat, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white border border-gray-200 p-10 flex flex-col hover:border-[#5648FC] hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-[#F7F8FA] border border-gray-200 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-[#1E1B4B] mb-4 tracking-tight">
                {cat.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                {cat.description}
              </p>
              
              <Link href="#" className="inline-flex items-center gap-2 text-[#5648FC] font-bold text-sm hover:text-[#1E1B4B] transition-colors mt-auto">
                Explore Suite
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}