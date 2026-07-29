"use client";

import { motion, Variants } from "framer-motion";
import { Shield, Database, MoreHorizontal, User, Activity } from "lucide-react";

export default function AdminControlSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } 
    },
  };

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col pr-0 lg:pr-8"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-block bg-[#F7F8FA] border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6">
                Global Oversight
              </div>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-[#1E1B4B] mb-6 tracking-tight leading-[1.15]"
            >
              Centralized control for user access and tokens
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-500 text-lg mb-10 leading-relaxed"
            >
              Monitor your entire client directory, manage computational workflows, and resolve disputes instantly. Our admin dashboard gives you the power to toggle tool access and audit usage seamlessly.
            </motion.p>
            
            <motion.div variants={itemVariants} className="w-full h-px bg-gray-200 mb-10"></motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div variants={itemVariants} className="flex flex-col">
                <div className="w-12 h-12 bg-[#F7F8FA] border border-gray-200 flex items-center justify-center mb-5 text-[#5648FC]">
                  <Shield size={24} />
                </div>
                <h3 className="text-[#1E1B4B] font-bold text-lg mb-2">Access Overrides</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Manually lock or unlock any computational tool for specific users, overriding current balances.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex flex-col">
                <div className="w-12 h-12 bg-[#F7F8FA] border border-gray-200 flex items-center justify-center mb-5 text-[#5648FC]">
                  <Database size={24} />
                </div>
                <h3 className="text-[#1E1B4B] font-bold text-lg mb-2">Token Ledger</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Audit user computation history and manually gift tokens to ensure uninterrupted VIP sessions.
                </p>
              </motion.div>
            </div>
          </motion.div>

          <div className="relative w-full h-[500px] md:h-[600px] mt-10 lg:mt-0">
            <div className="absolute inset-0 bg-gray-200 border border-gray-300 flex items-center justify-center shadow-inner z-0">
              <span className="text-gray-400 font-semibold text-xl tracking-widest uppercase">
                Main Image Placeholder
              </span>
            </div>

            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute top-12 -left-4 md:-left-12 w-[320px] bg-white border border-gray-200 shadow-2xl p-4 flex items-center justify-between z-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1E1B4B] flex items-center justify-center text-white">
                  <User size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#1E1B4B] font-bold text-sm">Client ID: 8942</span>
                  <span className="text-gray-500 text-xs">VIP Enterprise Account</span>
                </div>
              </div>
              <MoreHorizontal size={20} className="text-gray-400" />
            </motion.div>

            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute top-36 -left-8 md:-left-20 w-[320px] bg-white border border-gray-200 shadow-2xl p-4 flex items-center justify-between z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#5648FC] flex items-center justify-center text-white">
                  <Activity size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#1E1B4B] font-bold text-sm">System Override</span>
                  <span className="text-green-600 font-medium text-xs">+10,000 Tokens Granted</span>
                </div>
              </div>
              <MoreHorizontal size={20} className="text-gray-400" />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}