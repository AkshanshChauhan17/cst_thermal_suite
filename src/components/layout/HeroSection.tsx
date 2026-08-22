"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

// Define your 3 images here
const IMAGES = ["/hero.png", "/h1.png", "/h2.png", "/h3.png"];

export default function HeroSection() {
    const SLICES = 5;
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
        }, 5000);
        
        return () => clearInterval(timer);
    }, []);

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

                <div className="relative w-full max-w-[1440px] mx-auto h-[50vh] md:h-[70vh] flex items-center justify-center mt-8">
                    <div className="absolute inset-0 w-full h-full shadow-xl overflow-hidden border border-gray-300 bg-[#E5E7EB]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                className="absolute inset-0 w-full h-full"
                            >
                                {Array.from({ length: SLICES }).map((_, i) => {
                                    const sliceWidth = 100 / SLICES;
                                    const left = i * sliceWidth;
                                    const right = 100 - (i + 1) * sliceWidth;

                                    return (
                                        <motion.div
                                            key={`${currentIndex}-${i}`}
                                            className="absolute inset-0 w-full h-full"
                                            style={{
                                                clipPath: `inset(0% ${right}% 0% ${left}%)`,
                                            }}
                                            initial={{ opacity: 0, y: i % 2 === 0 ? 80 : -80 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 1.1 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: i * 0.1,
                                                ease: [0.33, 1, 0.68, 1],
                                            }}
                                        >
                                            <motion.div
                                                className="w-full h-full relative"
                                                animate={{ scale: [1, 1.05, 1] }}
                                                transition={{
                                                    duration: 6 + i * 0.5,
                                                    repeat: Infinity,
                                                    repeatType: "mirror",
                                                    ease: "easeInOut",
                                                }}
                                            >
                                                <Image
                                                    src={IMAGES[currentIndex]}
                                                    alt={`Thermal Engineering Tool Visualization ${currentIndex + 1}`}
                                                    fill
                                                    priority={currentIndex === 0} // Only prioritize the first image to load fast
                                                    sizes="(max-width: 768px) 100vw, 1440px"
                                                    quality={80}
                                                    className="object-cover"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}