"use client";

import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Quote, Play, ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import Image from "next/image";

export default function TestimonialsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 420;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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

  const testimonials = [
    {
      name: "Rajesh Kumar",
      title: "Plant Manager at ThermoCore India",
      text: "The component unit integration is flawless. We execute token-based calculations and sync them directly to our manufacturing queue. It made us 2x faster."
    },
    {
      name: "Priya Desai",
      title: "VP of Engineering at AeroDynamics",
      text: "Best SaaS platform for thermal dynamics on the market. The admin oversight allows me to manage tokens across my entire engineering team seamlessly."
    },
    {
      name: "Dr. Arvind Patel",
      title: "Research Lead at NexusLabs",
      text: "Frictionless top-ups during critical simulation sessions mean we never lose work. The stable architecture and auto-depletion locks are lifesavers."
    },
    {
      name: "Vikram Singh",
      title: "System Architect at BuildFlow",
      text: "The reporting dashboard is incredible. We increased our HVAC design efficiency massively after visualizing our computational load in real-time."
    },
    {
      name: "Neha Gupta",
      title: "Chief Thermal Engineer",
      text: "Easily the most professional computational tool available. The token economy is transparent, and the zero-latency processing is unmatched."
    }
  ];

  return (
    <section className="w-full bg-[#E8F5E9] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
        >
          <motion.div variants={itemVariants} className="flex flex-col pr-0 lg:pr-8">
            <h2 className="text-3xl md:text-[40px] font-bold text-[#1E1B4B] leading-tight mb-10 tracking-tight">
              "Our thermal calculation time dropped by 80% after adopting the token ecosystem. Real-time auto-depletion locks have saved us thousands in computational overhead."
            </h2>

            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#86EFAC] flex items-center justify-center text-[#1E1B4B]">
                <Quote size={24} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#1E1B4B] text-lg">Ananya Sharma</span>
                <span className="text-gray-600 text-sm">Senior Engineering Manager</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative w-full h-[400px] md:h-[500px]">
            <div className="absolute inset-0 bg-gray-300 border border-gray-400 flex items-center justify-center shadow-2xl">
              <span className="text-gray-500 font-semibold uppercase tracking-widest">
                <Image
                  src="/h9.jpg"
                  alt="Professional Computational Tools for Thermal Engineering"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1440px"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="/h9_low.png"
                  className="object-cover"
                />
              </span>
            </div>

            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 w-20 h-20 bg-white border border-gray-200 shadow-xl flex items-center justify-center cursor-pointer hover:bg-[#5648FC] hover:text-white transition-colors text-[#5648FC]">
              <Play size={32} fill="currentColor" className="ml-2" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-[#1E1B4B] tracking-tight">
              Loved by industry leaders
            </motion.h2>

            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-[#1E1B4B] hover:bg-[#5648FC] hover:text-white transition-colors hover:border-[#5648FC]"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-[#1E1B4B] hover:bg-[#5648FC] hover:text-white transition-colors hover:border-[#5648FC]"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative w-full">
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style dangerouslySetInnerHTML={{ __html: `::-webkit-scrollbar { display: none; }` }} />

              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-[100%] md:min-w-[400px] bg-white border border-gray-200 p-8 shadow-sm flex flex-col snap-start"
                >
                  <div className="flex items-center gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={18} fill="#FBBF24" color="#FBBF24" />
                    ))}
                  </div>

                  <p className="text-gray-600 text-[15px] leading-relaxed mb-8 flex-grow">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                    <div className="w-12 h-12 bg-[#F7F8FA] border border-gray-200 flex items-center justify-center text-gray-400">
                      <User size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1E1B4B] text-sm">{testimonial.name}</span>
                      <span className="text-gray-500 text-xs mt-0.5">{testimonial.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}