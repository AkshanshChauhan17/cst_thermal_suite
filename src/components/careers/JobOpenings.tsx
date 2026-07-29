"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";

export default function JobOpenings() {
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

  const jobs = [
    {
      title: "Senior Thermodynamic Engineer",
      department: "Engineering & R&D",
      location: "Gurugram, Haryana / Hybrid",
      type: "Full-Time",
      desc: "Lead the mathematical modeling of steam, chilled water, and DX cooling coils for our core zero-latency calculation engine."
    },
    {
      title: "Full Stack SaaS Developer",
      department: "Software Architecture",
      location: "Gurugram, Haryana / Remote",
      type: "Full-Time",
      desc: "Build scalable Next.js interfaces, manage secure token ledger pipelines, and optimize high-performance calculation UI components."
    },
    {
      title: "HVAC Product Specialist",
      department: "Product & Technical Sales",
      location: "Pune / Gurugram",
      type: "Full-Time",
      desc: "Bridge the gap between physical manufacturing units and digital software features by consulting enterprise manufacturing partners."
    }
  ];

  return (
    <section id="openings" className="w-full bg-[#F7F8FA] py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <div className="inline-block bg-white border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6 rounded-none">
            Current Openings
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E1B4B] tracking-tight mb-6">
            Open Positions
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Find your role in shaping industrial manufacturing technology. All positions include competitive compensation and enterprise health benefits.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6"
        >
          {jobs.map((job, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white border border-gray-200 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#5648FC] hover:shadow-xl transition-all duration-300 rounded-none group"
            >
              <div className="flex flex-col max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#5648FC]/10 text-[#5648FC] text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-none">
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                    <Clock size={14} /> {job.type}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-[#1E1B4B] mb-2 tracking-tight group-hover:text-[#5648FC] transition-colors">
                  {job.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {job.desc}
                </p>

                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <MapPin size={14} className="text-[#5648FC]" /> {job.location}
                </div>
              </div>
              
              <a 
                href="#apply-form" 
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#1E1B4B] text-white px-6 py-3 font-bold text-sm hover:bg-[#5648FC] transition-colors rounded-none flex-shrink-0"
              >
                Apply for Role
                <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}