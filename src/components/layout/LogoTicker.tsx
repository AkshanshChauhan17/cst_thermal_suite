"use client";

import { motion } from "framer-motion";

export default function LogoTicker() {
  const dummyLogos = [1, 2, 3, 4, 5, 6];

  return (
    <section className="w-full bg-white border-b border-gray-200 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        
        <div className="flex-shrink-0 text-sm font-semibold text-gray-500">
          Trusted by industry leaders
        </div>
        
        <div className="flex-1 overflow-hidden relative flex items-center w-full">
          
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
            className="flex gap-12 pr-12 w-fit items-center"
          >
            {[...dummyLogos, ...dummyLogos].map((_, index) => (
              <div 
                key={index} 
                className="w-32 h-10 bg-gray-200 flex-shrink-0"
              ></div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}