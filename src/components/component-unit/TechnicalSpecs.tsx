"use client";

import { motion, Variants } from "framer-motion";
import { Check } from "lucide-react";

export default function TechnicalSpecs() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const specs = [
    "Copper, Aluminum, and Stainless Steel tube options",
    "Epoxy and Hydrophilic anti-corrosion fin coatings",
    "Tested up to 45 Bar operational pressure",
    "ISO 9001:2015 Certified Manufacturing Process",
    "Dynamic balancing for all rotating components"
  ];

  return (
    <section className="w-full bg-white py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-stretch"
        >
          {/* Content Side */}
          <motion.div 
            variants={textVariants} 
            className="w-full lg:w-1/2 flex flex-col justify-center py-4"
          >
            <div className="inline-block bg-[#F7F8FA] border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6 self-start">
              Material Excellence
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-[#1E1B4B] mb-6 tracking-tight leading-tight">
              Built to outlast the harshest conditions.
            </h3>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              We dont just calculate theory; we build the reality. Our component units utilize industry-leading metallurgy and manufacturing techniques to guarantee that the numbers you see in the SaaS dashboard match real-world output.
            </p>
            
            <ul className="flex flex-col gap-5">
              {specs.map((spec, index) => (
                <li key={index} className="flex items-start gap-4 p-5 bg-[#F7F8FA] border border-gray-200 hover:border-[#5648FC]/50 transition-all duration-300">
                  {/* Sharp Checkbox */}
                  <div className="flex-shrink-0 w-6 h-6 bg-[#1E1B4B] flex items-center justify-center mt-0.5">
                    <Check size={14} className="text-[#86EFAC] font-bold" />
                  </div>
                  <span className="text-gray-700 text-[15px] font-medium leading-relaxed pt-0.5">
                    {spec}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Image Side - Strict sharp corners */}
          <motion.div 
            variants={textVariants} 
            className="w-full lg:w-1/2 relative min-h-[500px] flex flex-col"
          >
            <div className="relative w-full h-full bg-[#F7F8FA] border border-gray-300 p-3 shadow-2xl flex-grow">
              <img 
                src="/coil_img1.webp" 
                alt="Industrial Component Unit"
                className="w-full h-full object-cover filter contrast-125"
              />
              
              {/* Technical Overlay Accents */}
              <div className="absolute top-6 right-6 bg-[#1E1B4B] text-white text-xs font-mono px-3 py-1 border border-gray-600">
                TEMP_MAX: 120°C
              </div>
              <div className="absolute bottom-6 left-6 bg-[#5648FC] text-white text-xs font-mono px-3 py-1">
                PRESSURE: 45 BAR
              </div>
              
              {/* Sharp crosshairs in corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#5648FC]"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#5648FC]"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#5648FC]"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#5648FC]"></div>
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}