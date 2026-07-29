"use client";

import { motion, Variants } from "framer-motion";
import { Check } from "lucide-react";

export default function CalculatorSuiteSection() {
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

  const imagePopVariants: Variants = {
    hidden: { opacity: 0, y: 120, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 20, 
        mass: 1,
        delay: 0.1
      } 
    },
  };

  // Checkbox specific animations
  const featureListVariants: Variants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.4 // Starts animating checkboxes after the main section loads
      } 
    }
  };

  const checkBoxVariants: Variants = {
    hidden: { 
      backgroundColor: "#F7F8FA", 
      borderColor: "#E5E7EB" 
    },
    visible: { 
      backgroundColor: "#1E1B4B", // Dark fill color
      borderColor: "#1E1B4B",
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  const checkIconVariants: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -45 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.1 }
    }
  };

  const calculators = [
    {
      title: "Scientific Calculator",
      description: "Perform advanced engineering calculations with a practical scientific calculator interface.",
      features: [
        "Supports trigonometric, logarithmic, power, root, and exponential functions",
        "Includes DEG, RAD, and GRAD angle modes",
        "Provides memory, history, and display controls",
        "Suitable for formulas, technical calculations, and engineering problem-solving"
      ],
      image: "/coil_img1.webp" 
    },
    {
      title: "Material Weight Calculator",
      description: "Estimate material weight quickly and accurately for practical engineering applications.",
      features: [
        "Calculates total weight, unit weight, sectional area, and material volume",
        "Supports plates, bars, pipes, sections, and common material forms",
        "Allows direct input of dimensions, density, and quantity",
        "Useful for fabrication, costing, procurement, and engineering estimation."
      ],
      image: "/coil_img1.webp" 
    },
    {
      title: "Engineering Unit Converter",
      description: "Convert engineering units accurately across multiple disciplines with fast lookup and quick calculations.",
      features: [
        "Covers mechanical, thermal, HVAC, electrical, chemical, process, and plastics categories",
        "Provides quick access to the Scientific Calculator and Material Weight Calculator",
        "Supports search, favourites, recent conversions, and fast keypad entry",
        "Ideal for day-to-day engineering conversions, design work, and technical reference"
      ],
      image: "/coil_img1.webp" 
    }
  ];

  return (
    <section className="w-full bg-[#F7F8FA] py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block bg-white shadow-sm border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-6 py-2 mb-6"
          >
            Three In One Calculator
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E1B4B] tracking-tight"
          >
            Integrated Engineering Suite
          </motion.h2>
        </div>

        <div className="flex flex-col gap-32">
          {calculators.map((calc, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={index}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-stretch`}
              >
                {/* Content Side */}
                <motion.div 
                  variants={textVariants} 
                  className="w-full lg:w-1/2 flex flex-col justify-center py-4"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-[#1E1B4B] mb-6 tracking-tight">
                    {calc.title}
                  </h3>
                  <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                    {calc.description}
                  </p>
                  
                  {/* Staggered Checkbox List */}
                  <motion.ul 
                    variants={featureListVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-col gap-5"
                  >
                    {calc.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-4 p-5 bg-white shadow-sm border border-gray-100 hover:border-[#5648FC]/40 hover:shadow-md transition-all duration-300">
                        {/* Animated Checkbox */}
                        <motion.div 
                          variants={checkBoxVariants}
                          className="flex-shrink-0 w-8 h-8 border flex items-center justify-center mt-0.5"
                        >
                          <motion.div variants={checkIconVariants}>
                            <Check size={18} className="text-white font-bold" strokeWidth={3} />
                          </motion.div>
                        </motion.div>
                        
                        <span className="text-gray-600 text-[15px] leading-relaxed pt-1">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </motion.ul>
                </motion.div>

                {/* Image Pop-Out Side */}
                <motion.div 
                  className="w-full lg:w-1/2 relative perspective-1000 flex flex-col"
                >
                  <motion.div 
                    variants={imagePopVariants}
                    className="relative w-full h-full min-h-[400px] overflow-hidden shadow-2xl border border-gray-200/50 bg-white group flex-grow"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#5648FC]/5 to-transparent z-0"></div>
                    
                    <img 
                      src={calc.image} 
                      alt={calc.title}
                      className="absolute inset-0 w-full h-full object-cover object-top z-10 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                    
                    <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </motion.div>
                  
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.6 } }
                    }}
                    className="absolute -bottom-6 left-10 right-10 h-10 bg-[#1E1B4B]/10 blur-2xl -z-10"
                  ></motion.div>
                </motion.div>
                
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}