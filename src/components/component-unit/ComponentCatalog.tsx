"use client";

import { motion, Variants } from "framer-motion";
import { Wind, Thermometer, Droplets, Fan, Settings, Cpu } from "lucide-react";
import Link from "next/link";

export default function ComponentCatalog() {
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

  const catalog = [
    {
      title: "Air-Cooled Condensers",
      icon: <Wind size={32} className="text-[#5648FC] group-hover:text-white" />,
      description: "Heavy-duty condenser units designed for maximum heat rejection in high-ambient temperature environments across the subcontinent."
    },
    {
      title: "Evaporator Systems",
      icon: <Thermometer size={32} className="text-[#1E1B4B] group-hover:text-white" />,
      description: "High-efficiency commercial and industrial evaporators tailored for cold storage, blast freezing, and precision cooling."
    },
    {
      title: "Fluid & Gas Coolers",
      icon: <Droplets size={32} className="text-[#5648FC] group-hover:text-white" />,
      description: "Dry coolers and adiabatic systems built for process cooling, power generation, and heavy manufacturing sectors."
    },
    {
      title: "Axial Fans & Blowers",
      icon: <Fan size={32} className="text-[#1E1B4B] group-hover:text-white" />,
      description: "High-volume air movement solutions featuring low-noise aerodynamics and extreme weather resistance."
    },
    {
      title: "Heat Exchanger Blocks",
      icon: <Settings size={32} className="text-[#5648FC] group-hover:text-white" />,
      description: "Customizable fin-and-tube block assemblies designed exactly to your software-calculated specifications."
    },
    {
      title: "Smart Control Panels",
      icon: <Cpu size={32} className="text-[#1E1B4B] group-hover:text-white" />,
      description: "Integrated electrical panels that link the physical hardware directly to your SaaS telemetry dashboard."
    }
  ];

  return (
    <section className="w-full bg-[#F7F8FA] py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <div className="inline-block bg-white border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6">
            Hardware Catalog
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E1B4B] tracking-tight mb-6">
            Engineered for Extremes
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Every component unit is manufactured from premium-grade materials and strictly tested to align perfectly with our softwares theoretical performance data.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {catalog.map((item, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white border border-gray-200 p-10 flex flex-col hover:border-[#5648FC] hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Sharp square icon container */}
              <div className="w-16 h-16 bg-[#F7F8FA] border border-gray-200 flex items-center justify-center mb-8 group-hover:bg-[#1E1B4B] group-hover:border-[#1E1B4B] transition-colors duration-300">
                <div className="transition-colors duration-300">
                  {item.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-[#1E1B4B] mb-4 tracking-tight group-hover:text-[#5648FC] transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                {item.description}
              </p>
              
              <div className="h-px w-full bg-gray-100 mb-6"></div>
              
              <Link href="#" className="inline-flex items-center gap-2 text-[#1E1B4B] font-bold text-sm hover:text-[#5648FC] transition-colors mt-auto uppercase tracking-wide">
                View Specifications
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}