"use client";

import { motion } from "framer-motion";
import { Check, BarChart3, Zap, Layers } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="w-full bg-[#F7F8FA] pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-extrabold text-[#1E1B4B] tracking-tight mb-6 leading-tight"
                    >
                        Professional Computational Tools for <span className="text-[#5648FC]">Thermal Engineering</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Frictionless access to enterprise-grade computational tools. Optimize your thermal coils and component units with our seamless token-based execution engine.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full max-w-lg mx-auto"
                    >
                        <div className="flex flex-col sm:flex-row w-full bg-white border border-gray-300 shadow-sm focus-within:border-[#5648FC] transition-colors">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 outline-none text-gray-700 bg-transparent placeholder-gray-400 text-base"
                            />
                            <button className="bg-[#5648FC] text-white px-8 py-4 font-semibold text-base hover:bg-[#4336d6] transition-colors whitespace-nowrap">
                                Get Started
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500 font-medium">
                            <Check size={16} className="text-green-500" />
                            <span>Full access. Affordable plans for every business</span>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full max-w-[1440px] mx-auto bg-gray-200 border border-gray-300 flex items-center justify-center h-[50vh] md:h-[70vh] shadow-xl"
                >
                    <span className="text-gray-400 font-semibold text-xl tracking-widest uppercase">
                        Image Placeholder
                    </span>
                </motion.div>
            </div>
        </section>
    );
}