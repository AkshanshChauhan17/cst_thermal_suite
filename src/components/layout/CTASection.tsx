"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section className="w-full bg-gradient-to-br from-[#5648FC] via-[#4336d6] to-[#1E1B4B] py-24 md:py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        <motion.h2 
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
        >
          Ready to optimize your thermal operations?
        </motion.h2>
        
        <motion.p 
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed"
        >
          Join 2,500+ Indian engineering teams leveraging our token-based ecosystem for frictionless computational accuracy and seamless component management.
        </motion.p>
        
        <motion.div 
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link href="/get-started" className="w-full sm:w-auto bg-[#86EFAC] text-[#1E1B4B] px-10 py-4 font-bold text-base hover:bg-white transition-colors">
            Get Started Now
          </Link>
          <Link href="/secure/request-demo" className="w-full sm:w-auto bg-transparent border border-white/30 text-white px-10 py-4 font-bold text-base hover:bg-white/10 transition-colors">
            Request Free Demo
          </Link>
        </motion.div>

      </div>
    </section>
  );
}