"use client";

import { motion, Variants } from "framer-motion";
import { Calculator, ArrowRightLeft, Scale, ExternalLink } from "lucide-react";

export default function EngineeringTools() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  const tools = [
    {
      title: "Scientific Calculator",
      icon: <Calculator size={24} className="text-[#5648FC]" />,
      description: "Perform quick engineering calculations with a practical scientific calculator for formulas, percentages, trigonometry, powers, roots, and everyday technical calculations."
    },
    {
      title: "Engineering Unit Converter",
      icon: <ArrowRightLeft size={24} className="text-[#1E1B4B]" />,
      description: "Convert engineering units accurately across mechanical, thermal, HVAC, electrical, chemical, process, plastics, and many other disciplines."
    },
    {
      title: "Material Weight Calculator",
      icon: <Scale size={24} className="text-[#5648FC]" />,
      description: "Estimate the weight of plates, sheets, pipes, bars, channels, angles, and other materials using dimensions, quantity, and selected material type."
    }
  ];

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col sticky top-24"
          >
            <div className="inline-block bg-[#F7F8FA] border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6 self-start">
              Toolbox
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1E1B4B] mb-6 tracking-tight leading-tight">
              All Engineering Calculators
            </h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              Use the Scientific Calculator for engineering calculations, the Material Weight Calculator for metal and material weight estimation, and the Engineering Unit Converter for fast and accurate unit conversions.
            </p>
            <button className="self-start flex items-center gap-3 bg-[#1E1B4B] text-white px-8 py-4 font-bold text-base hover:bg-[#5648FC] transition-colors border border-transparent">
              <ExternalLink size={20} />
              Open All Calculators
            </button>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {tools.map((tool, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-start gap-6 bg-[#F7F8FA] border border-gray-200 p-8 hover:border-[#5648FC] transition-colors duration-300 group cursor-pointer"
              >
                <div className="w-14 h-14 bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-[#1E1B4B] mb-3 tracking-tight group-hover:text-[#5648FC] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}