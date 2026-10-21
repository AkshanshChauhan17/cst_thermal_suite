"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Loader2 } from "lucide-react";

// --- PRODUCT DATA (1 to 10) ---
const productFeatures = [
  { id: 1, title: "Adiabatic Coolers - Process Cooling", description: "Efficient adiabatic cooling systems engineered specifically for industrial process cooling applications, designed to minimize water consumption while maximizing thermal exchange.", image: "/product_1.png", tag: "Process Cooling" },
  { id: 2, title: "Adiabatic Coolers - Chiller Applications", description: "Advanced adiabatic solutions designed to enhance chiller performance, lower head pressures, and significantly reduce energy overhead in commercial setups.", image: "/product_2.png", tag: "Chiller Systems" },
  { id: 3, title: "Adiabatic Coolers - Data Centers", description: "High-reliability adiabatic cooling units tailored for mission-critical data centers, ensuring optimal PUE (Power Usage Effectiveness) and continuous operation.", image: "/product_3.png", tag: "Data Center Cooling" },
  { id: 4, title: "Air Cooled Oil Coolers for Quenching Furnaces", description: "Robust air-cooled oil cooling systems built to handle the intense thermal loads and harsh environments of industrial metallurgical quenching furnaces.", image: "/product_4.png", tag: "Oil Cooling" },
  { id: 5, title: "Ammonia Air Cooled Adiabatic Cooler", description: "Specialized adiabatic coolers utilizing ammonia (NH3) for heavy-duty, environmentally conscious, and highly efficient industrial refrigeration.", image: "/product_5.png", tag: "Ammonia Systems" },
  { id: 6, title: "Ammonia Air Cooling Unit", description: "High-efficiency air cooling units designed for safe, compliant, and effective integration into large-scale industrial ammonia refrigeration systems.", image: "/product_6.png", tag: "Ammonia Systems" },
  { id: 7, title: "Refrigeration Cycles - Equipment Selection", description: "Comprehensive software suite for calculating, designing, and selecting equipment for complex industrial refrigeration cycles.", image: "/product_7.png", tag: "System Design" },
  { id: 8, title: "Compact Heat Recovery Boiler", description: "Space-saving, high-efficiency heat recovery boilers designed to capture and reuse waste heat, dramatically improving overall plant energy efficiency.", image: "/product_8.png", tag: "Heat Recovery" },
  { id: 9, title: "Air Cooled Oil Coolers for Hydraulic Machines", description: "Durable, high-capacity oil coolers engineered to maintain optimal fluid temperatures in heavy-duty hydraulic machinery and industrial presses.", image: "/product_9.png", tag: "Hydraulic Cooling" },
  { id: 10, title: "Refrigeration Cycles - Advanced Selection", description: "Advanced simulation and selection tools for optimizing multi-stage refrigeration cycles, thermodynamic performance, and component matching.", image: "/product_10.png", tag: "System Design" }
];

// --- COMPONENT DATA (1 to 6) ---
const componentFeatures = [
  { id: 1, title: "Charge Air Coolers for IC Engines", description: "High-performance charge air coolers designed to reduce intake air temperature, increasing air density and overall efficiency for internal combustion engines.", image: "/component_1.png", tag: "Engine Cooling" },
  { id: 2, title: "Dry Cooler Selection - Gas and Liquids", description: "Advanced dry cooler selection systems for optimizing heat rejection without water consumption. Ideal for process cooling and large HVAC applications.", image: "/component_2.png", tag: "Dry Cooling" },
  { id: 3, title: "Open Cycle Cooling Tower", description: "Heavy-duty open cycle cooling towers engineered for maximum heat dissipation and sustained reliability in industrial plants and power generation.", image: "/component_3.png", tag: "Cooling Towers" },
  { id: 4, title: "Remote Radiators for IC Engines", description: "Robust remote radiator systems customized for gensets and IC engines, ensuring consistent temperature regulation even in extreme environmental conditions.", image: "/component_4.png", tag: "Remote Cooling" },
  { id: 5, title: "Turbine Inlet Evaporative Cooling", description: "Maximize gas turbine power output and efficiency with our specialized evaporative cooling solutions that effectively lower intake air temperatures.", image: "/component_5.png", tag: "Evaporative Cooling" },
  { id: 6, title: "Heat Recovery from Engine Exhaust", description: "Innovative heat recovery solutions designed to capture engine exhaust heat, driving vapor absorption machines and boosting total plant thermal efficiency.", image: "/component_6.png", tag: "Heat Recovery" }
];

export default function ProductScrolling() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-redirect logic with timer cleanup
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isModalOpen) {
      timer = setTimeout(() => {
        router.push("/get-started");
      }, 1500); // 1.5 seconds ka delay
    }
    // Cleanup function: agar user redirect se pehle modal close kar de to timer cancel ho jaye
    return () => clearTimeout(timer);
  }, [isModalOpen, router]);

  return (
    <div className="w-full overflow-hidden flex flex-col">
      
      {/* ======================================= */}
      {/* SECTION 1: PRODUCTS & SYSTEMS          */}
      {/* ======================================= */}
      <section className="w-full bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#5648FC]/10 border border-[#5648FC]/20 text-[#5648FC] text-sm font-bold tracking-wide uppercase">
            Complete Solutions
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Advanced <span className="text-[#5648FC]">Products & Systems</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our extensive lineup of specialized cooling units, heat recovery systems, and comprehensive equipment selection tools.
          </p>
        </motion.div>
      </section>

      <div className="w-full flex flex-col">
        {productFeatures.map((feature, index) => {
          const isEven = index % 2 === 0;
          const bgClass = isEven ? "bg-white" : "bg-[#F8FAFC] border-y border-gray-100";

          return (
            <section 
              key={`prod-${feature.id}`} 
              id={`product-${feature.id}`} 
              className={`w-full py-24 px-4 sm:px-6 lg:px-8 transition-colors ${bgClass} scroll-mt-20`}
            >
              <div className={`max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isEven ? "" : "lg:flex-row-reverse"}`}>
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
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{feature.description}</p>
                  
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="group flex items-center gap-2 text-white bg-[#5648FC] px-6 py-3 rounded-lg font-bold hover:bg-[#4336d6] transition-all shadow-lg shadow-[#5648FC]/20"
                  >
                    View & Get Started
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 100, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                  className="flex-1 w-full"
                >
                  <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
                    <div className="absolute inset-0 bg-[#5648FC] blur-[50px] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 rounded-full"></div>
                    <img src={feature.image} alt={feature.title} className="relative z-10 w-full rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 hover:border-[#5648FC]/40 transition-colors duration-500 bg-white" />
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ======================================= */}
      {/* SECTION 2: INDUSTRIAL COMPONENTS       */}
      {/* ======================================= */}
      <section className="w-full bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#5648FC]/10 border border-[#5648FC]/20 text-[#5648FC] text-sm font-bold tracking-wide uppercase">
            Industrial Components
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Specialized <span className="text-[#5648FC]">Cooling Components</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Browse our technical selection of charge air coolers, dry coolers, and heat recovery components engineered for heavy-duty industrial applications.
          </p>
        </motion.div>
      </section>

      <div className="w-full flex flex-col">
        {componentFeatures.map((feature, index) => {
          const isEven = index % 2 === 0;
          const bgClass = isEven ? "bg-white" : "bg-[#F8FAFC] border-y border-gray-100";

          return (
            <section 
              key={`comp-${feature.id}`} 
              id={`component-${feature.id}`} 
              className={`w-full py-24 px-4 sm:px-6 lg:px-8 transition-colors ${bgClass} scroll-mt-20`}
            >
              <div className={`max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isEven ? "" : "lg:flex-row-reverse"}`}>
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
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{feature.description}</p>
                  
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="group flex items-center gap-2 text-white bg-[#5648FC] px-6 py-3 rounded-lg font-bold hover:bg-[#4336d6] transition-all shadow-lg shadow-[#5648FC]/20"
                  >
                    View & Get Started
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 100, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                  className="flex-1 w-full"
                >
                  <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
                    <div className="absolute inset-0 bg-[#5648FC] blur-[50px] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 rounded-full"></div>
                    <img src={feature.image} alt={feature.title} className="relative z-10 w-full rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 hover:border-[#5648FC]/40 transition-colors duration-500 bg-white" />
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* NEW CLEAN ANIMATED POPUP MODAL (Fixed Spinner) */}
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
                {/* Yahan framer motion hata kar sidha Tailwind ki animate-spin class laga di hai */}
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