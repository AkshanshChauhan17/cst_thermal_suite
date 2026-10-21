"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Loader2 } from "lucide-react";

// 8 Coils ka data
const coilFeatures = [
  {
    id: 1,
    title: "Air to Air Coolers",
    description: "High-performance thermal exchange solutions optimized for maximum efficiency and minimum pressure drop in industrial environments.",
    image: "/coil_1.png",
    tag: "Efficiency First"
  },
  {
    id: 2,
    title: "Chilled Water Coils",
    description: "Precision-engineered chilled water coils designed for complex HVAC systems. Ensures consistent temperature control and durability.",
    image: "/coil_2.png",
    tag: "HVAC Solutions"
  },
  {
    id: 3,
    title: "DX Coils (Direct Expansion)",
    description: "State-of-the-art direct expansion coils built for rapid cooling. Custom tube configurations available for specific refrigerant needs.",
    image: "/coil_3.png",
    tag: "Rapid Cooling"
  },
  {
    id: 4,
    title: "Special Fluids Coils",
    description: "Custom cooling and heating coils designed to handle specialized industrial fluids safely and efficiently.",
    image: "/coil_4.png",
    tag: "Industrial Grade"
  },
  {
    id: 5,
    title: "Steam Heating Coils",
    description: "Heavy-duty steam coils built to withstand high pressure and extreme temperatures, providing reliable heating performance.",
    image: "/coil_5.png",
    tag: "High Pressure"
  },
  {
    id: 6,
    title: "Turbine Inlet Cooling Coils",
    description: "Maximize gas turbine power output with our specialized inlet cooling systems, designed for extreme performance demands.",
    image: "/coil_6.png",
    tag: "Power Generation"
  },
  {
    id: 7,
    title: "Condenser Coils", 
    description: "High-efficiency condenser coils specifically designed for optimal heat rejection in heavy-duty air conditioning and refrigeration systems.",
    image: "/coil_7.png",
    tag: "Heat Rejection"
  },
  {
    id: 8,
    title: "Evaporator Coils", 
    description: "Premium evaporator coils tailored for maximum heat absorption, ensuring superior cooling performance in complex industrial setups.",
    image: "/coil_8.png",
    tag: "Heat Absorption"
  }
];

export default function CoilScrolling() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-redirect logic with timer cleanup
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isModalOpen) {
      timer = setTimeout(() => {
        router.push("/get-started");
      }, 1500); // 1.5 seconds delay
    }
    // Agar redirect hone se pehle user modal close kar de to timer cancel ho jayega
    return () => clearTimeout(timer);
  }, [isModalOpen, router]);

  return (
    <div className="w-full overflow-hidden flex flex-col">
      
      {/* Main Heading Section */}
      <section className="w-full bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Explore Our <span className="text-[#5648FC]">Coil Technologies</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Scroll down to discover our comprehensive range of engineering solutions designed for peak thermal performance.
          </p>
        </motion.div>
      </section>

      {/* Alternating Scroll Sections */}
      <div className="w-full flex flex-col">
        {coilFeatures.map((feature, index) => {
          const isEven = index % 2 === 0;
          const bgClass = isEven ? "bg-white" : "bg-[#F8FAFC] border-y border-gray-100";

          return (
            <section 
              key={feature.id} 
              id={`coil-${feature.id}`}
              className={`w-full py-24 px-4 sm:px-6 lg:px-8 transition-colors ${bgClass} scroll-mt-20`}
            >
              <div className={`max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}>
                
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="flex-1 w-full"
                >
                  <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#5648FC]/10 border border-[#5648FC]/20 text-[#5648FC] text-sm font-bold tracking-wide">
                    {feature.tag}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {feature.description}
                  </p>
                  
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="group flex items-center gap-2 text-white bg-[#5648FC] px-6 py-3 rounded-lg font-bold hover:bg-[#4336d6] transition-all shadow-lg shadow-[#5648FC]/20"
                  >
                    View & Get Started
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                {/* Image Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 100, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                  className="flex-1 w-full"
                >
                  <div 
                    className="relative group cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <div className="absolute inset-0 bg-[#5648FC] blur-[50px] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 rounded-full"></div>
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="relative z-10 w-full rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 hover:border-[#5648FC]/40 transition-colors duration-500 bg-white"
                    />
                  </div>
                </motion.div>

              </div>
            </section>
          );
        })}
      </div>

      {/* NEW CLEAN ANIMATED POPUP MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition-colors z-10 bg-white p-1.5 rounded-full shadow-sm border border-gray-200"
              >
                <X size={20} />
              </button>

              {/* Loader Content with animate-spin */}
              <div className="flex flex-col items-center justify-center py-12 px-6 min-h-[280px]">
                <Loader2 size={56} className="text-[#5648FC] mb-6 animate-spin" />
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Connecting to Register...</h3>
                  <p className="text-gray-500 font-medium text-sm md:text-base">Please wait, setting up your environment.</p>
                </div>
              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}