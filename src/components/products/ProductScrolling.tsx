"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

// Images aur details based on your public folder screenshot[cite: 2]
const productFeatures = [
  {
    id: 1,
    title: "Adiabatic Coolers - Process Cooling",
    description: "Efficient adiabatic cooling systems engineered specifically for industrial process cooling applications, designed to minimize water consumption while maximizing thermal exchange.",
    image: "/product_1.png",
    tag: "Process Cooling"
  },
  {
    id: 2,
    title: "Adiabatic Coolers - Chiller Applications",
    description: "Advanced adiabatic solutions designed to enhance chiller performance, lower head pressures, and significantly reduce energy overhead in commercial setups.",
    image: "/product_2.png",
    tag: "Chiller Systems"
  },
  {
    id: 3,
    title: "Adiabatic Coolers - Data Centers",
    description: "High-reliability adiabatic cooling units tailored for mission-critical data centers, ensuring optimal PUE (Power Usage Effectiveness) and continuous operation.",
    image: "/product_3.png",
    tag: "Data Center Cooling"
  },
  {
    id: 4,
    title: "Air Cooled Oil Coolers for Quenching Furnaces",
    description: "Robust air-cooled oil cooling systems built to handle the intense thermal loads and harsh environments of industrial metallurgical quenching furnaces.",
    image: "/product_4.png",
    tag: "Oil Cooling"
  },
  {
    id: 5,
    title: "Ammonia Air Cooled Adiabatic Cooler",
    description: "Specialized adiabatic coolers utilizing ammonia (NH3) for heavy-duty, environmentally conscious, and highly efficient industrial refrigeration.",
    image: "/product_5.png",
    tag: "Ammonia Systems"
  },
  {
    id: 6,
    title: "Ammonia Air Cooling Unit",
    description: "High-efficiency air cooling units designed for safe, compliant, and effective integration into large-scale industrial ammonia refrigeration systems.",
    image: "/product_6.png",
    tag: "Ammonia Systems"
  },
  {
    id: 7,
    title: "Refrigeration Cycles - Equipment Selection",
    description: "Comprehensive software suite for calculating, designing, and selecting equipment for complex industrial refrigeration cycles.",
    image: "/product_7.png",
    tag: "System Design"
  },
  {
    id: 8,
    title: "Compact Heat Recovery Boiler",
    description: "Space-saving, high-efficiency heat recovery boilers designed to capture and reuse waste heat, dramatically improving overall plant energy efficiency.",
    image: "/product_8.png",
    tag: "Heat Recovery"
  },
  {
    id: 9,
    title: "Air Cooled Oil Coolers for Hydraulic Machines",
    description: "Durable, high-capacity oil coolers engineered to maintain optimal fluid temperatures in heavy-duty hydraulic machinery and industrial presses.",
    image: "/product_9.png",
    tag: "Hydraulic Cooling"
  },
  {
    id: 10,
    title: "Refrigeration Cycles - Advanced Selection",
    description: "Advanced simulation and selection tools for optimizing multi-stage refrigeration cycles, thermodynamic performance, and component matching.",
    image: "/product_10.png",
    tag: "System Design"
  }
];

export default function ProductScrolling() {
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

      {/* Alternating Scroll Sections */}
      <div className="w-full flex flex-col">
        {productFeatures.map((feature, index) => {
          const isEven = index % 2 === 0;
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
                  
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="group flex items-center gap-2 text-white bg-[#5648FC] px-6 py-3 rounded-lg font-bold hover:bg-[#4336d6] transition-all shadow-lg shadow-[#5648FC]/20"
                  >
                    Explore Product Demo
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
              className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header & Tabs */}
              <div className="flex border-b border-gray-200 relative bg-gray-50 flex-shrink-0">
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
              <div className="p-6 md:p-8 overflow-y-auto">
                
                {/* DEMO TAB W/ FORM */}
                {activeTab === "Demo" && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Request System Demo</h2>
                      <p className="text-gray-600">Fill out the details below and our technical team will set up a live demo session for your product selection.</p>
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
                        <label className="text-sm font-semibold text-gray-700">Product Interest</label>
                        <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5648FC]/50 focus:border-[#5648FC] outline-none transition-all bg-gray-50 focus:bg-white">
                          <option>Adiabatic Coolers</option>
                          <option>Ammonia Systems</option>
                          <option>Heat Recovery Boilers</option>
                          <option>Oil Cooling Systems</option>
                          <option>Software / Selection Tools</option>
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
                    <p className="text-gray-600">Detailed product blueprints, capacities, and selection charts will be displayed here.</p>
                  </motion.div>
                )}
                
                {/* TOKEN TAB */}
                {activeTab === "Token" && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">System Access & Tokens</h2>
                    <p className="text-gray-600">Manage your software licenses, download technical datasheets, and view API tokens here.</p>
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