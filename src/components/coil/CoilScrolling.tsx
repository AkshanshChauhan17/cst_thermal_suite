"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

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
  }
];

export default function CoilScrolling() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Demo");

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
          // Background aur border se har section ko differentiate kiya hai
          const bgClass = isEven ? "bg-white" : "bg-[#F8FAFC] border-y border-gray-100";

          return (
            <section 
              key={feature.id} 
              className={`w-full py-24 px-4 sm:px-6 lg:px-8 transition-colors ${bgClass}`}
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
                  
                  {/* Button se ab Popup Modal khulega */}
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="group flex items-center gap-2 text-white bg-[#5648FC] px-6 py-3 rounded-lg font-bold hover:bg-[#4336d6] transition-all shadow-lg shadow-[#5648FC]/20"
                  >
                    Request Demo / Specs
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

      {/* POPUP MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header & Tabs */}
              <div className="flex border-b border-gray-200 relative bg-gray-50">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition-colors z-10 bg-white p-1 rounded-full shadow-sm border border-gray-200"
                >
                  <X size={20} />
                </button>

                {["Demo", "Product", "Token"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm md:text-base font-bold transition-all ${
                      activeTab === tab 
                        ? "text-[#5648FC] border-b-2 border-[#5648FC] bg-white" 
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Modal Content Area */}
              <div className="p-6 md:p-8 min-h-[400px]">
                
                {/* DEMO TAB W/ FORM */}
                {activeTab === "Demo" && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Request Software Demo</h2>
                      <p className="text-gray-600">Fill out the details below and our technical team will set up a live demo session for your requirements.</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-gray-700">Full Name</label>
                          <input type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5648FC]/50 focus:border-[#5648FC] outline-none transition-all bg-gray-50 focus:bg-white" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-gray-700">Work Email</label>
                          <input type="email" placeholder="john@company.com" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5648FC]/50 focus:border-[#5648FC] outline-none transition-all bg-gray-50 focus:bg-white" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Company / Organization</label>
                        <input type="text" placeholder="Engineering Solutions Pvt Ltd" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5648FC]/50 focus:border-[#5648FC] outline-none transition-all bg-gray-50 focus:bg-white" />
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Application Type</label>
                        <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5648FC]/50 focus:border-[#5648FC] outline-none transition-all bg-gray-50 focus:bg-white">
                          <option>HVAC Solutions</option>
                          <option>Industrial Cooling</option>
                          <option>Power Generation</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <button type="submit" className="w-full bg-[#5648FC] text-white font-bold py-3 rounded-lg hover:bg-[#4336d6] transition-colors mt-4 shadow-lg shadow-[#5648FC]/20">
                        Submit Demo Request
                      </button>
                    </form>
                  </motion.div>
                )}
                
                {/* PRODUCT TAB */}
                {activeTab === "Product" && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Product Specifications</h2>
                    <p className="text-gray-600">Product details and selection options will be displayed here.</p>
                  </motion.div>
                )}
                
                {/* TOKEN TAB */}
                {activeTab === "Token" && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Buy / Manage Tokens</h2>
                    <p className="text-gray-600">API token generation and usage statistics will be available here.</p>
                  </motion.div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}