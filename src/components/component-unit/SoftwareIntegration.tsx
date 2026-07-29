"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SoftwareIntegration() {
  return (
    <section className="w-full bg-[#1E1B4B] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#86EFAC 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      ></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity size={28} className="text-[#86EFAC]" />
            <span className="text-white font-bold text-xl tracking-tight">The Digital Twin Advantage</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Every physical unit has a <br />
            <span className="text-[#5648FC]">SaaS profile.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Dont just buy hardware. Utilize the Thermal Suite calculation engine to model your exact component unit before its manufactured. Zero guesswork, absolute precision.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-auto"
        >
          <Link href="/products" className="group flex items-center justify-center gap-4 bg-white text-[#1E1B4B] px-10 py-5 font-bold text-lg hover:bg-[#86EFAC] transition-colors border border-transparent shadow-2xl">
            Open Software Suite
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        
      </div>
    </section>
  );
}