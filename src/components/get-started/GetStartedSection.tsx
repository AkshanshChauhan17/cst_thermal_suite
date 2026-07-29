"use client";

import { motion, Variants } from "framer-motion";
import { Check, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";

export default function GetStartedSection() {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const benefits = [
    "Zero-latency computational architecture",
    "Access to Coil Selection & Product Selectors",
    "Transparent token-based usage tracking",
    "Enterprise-grade engineering reports export",
    "Centralized team and project management"
  ];

  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row bg-white">

      {/* Left Side - Value Proposition (Dark Mode) */}
      <div className="w-full lg:w-5/12 bg-[#1E1B4B] p-8 md:p-16 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[#5648FC] rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute bottom-[10%] -right-[20%] w-[60%] h-[60%] bg-[#86EFAC] rounded-full blur-[120px] opacity-10"></div>
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16 inline-flex">
            <img
              src="/logo.png"
              alt="Thermal Suite Logo"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUpVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Start optimizing your thermal operations.
            </motion.h1>
            <motion.p variants={fadeUpVariants} className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
              Join 2,500+ engineering teams across India building the future of industrial HVAC and refrigeration.
            </motion.p>

            <motion.ul variants={staggerContainer} className="flex flex-col gap-5">
              {benefits.map((benefit, index) => (
                <motion.li key={index} variants={fadeUpVariants} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#5648FC]/20 border border-[#5648FC]/50 flex items-center justify-center mt-0.5">
                    <Check size={14} className="text-[#86EFAC] font-bold" />
                  </div>
                  <span className="text-gray-300 text-[15px] leading-relaxed">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        <div className="relative z-10 mt-20 pt-10 border-t border-gray-700">
          <p className="text-gray-400 text-sm italic mb-4">
            "Thermal Suite reduced our coil selection calculation time by 80%. The token system is incredibly transparent."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-600 border border-gray-500">
              <img src="/coil_img1.webp" alt="User" className="w-full h-full object-cover grayscale opacity-80" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">Vikram Sharma</p>
              <p className="text-gray-500 text-xs">Lead Engineer, Tata Heavy Eng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-7/12 bg-[#F7F8FA] p-8 md:p-16 lg:p-24 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-lg bg-white p-10 shadow-2xl border border-gray-200"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#1E1B4B] mb-2 tracking-tight">Create your account</h2>
            <p className="text-gray-500 text-sm">Get started with a 14-day free trial. No credit card required.</p>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex-1 flex items-center justify-center gap-3 bg-white border border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.79 15.69 17.57V20.34H19.26C21.35 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
                <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.69 17.57C14.71 18.23 13.46 18.63 12 18.63C9.17 18.63 6.77 16.72 5.88 14.16H2.21V17.01C4.01 20.59 7.71 23 12 23Z" fill="#34A853" />
                <path d="M5.88 14.16C5.65 13.48 5.52 12.76 5.52 12C5.52 11.24 5.65 10.52 5.88 9.84V6.99H2.21C1.47 8.47 1 10.18 1 12C1 13.82 1.47 15.53 2.21 17.01L5.88 14.16Z" fill="#FBBC05" />
                <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.34 3.88C17.45 2.12 14.97 1 12 1C7.71 1 4.01 3.41 2.21 6.99L5.88 9.84C6.77 7.28 9.17 5.38 12 5.38Z" fill="#EA4335" />
              </svg>
              Google
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Or register with email</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">First Name</label>
                <input
                  type="text"
                  placeholder="Rahul"
                  className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Last Name</label>
                <input
                  type="text"
                  placeholder="Desai"
                  className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Work Email</label>
              <input
                type="email"
                placeholder="rahul@company.in"
                className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Company Name</label>
              <input
                type="text"
                placeholder="Engineering Solutions Ltd."
                className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors"
              />
            </div>

            <button type="button" className="mt-4 w-full bg-[#5648FC] text-white px-8 py-4 font-bold text-base hover:bg-[#4336d6] transition-colors flex items-center justify-center gap-2 group">
              Start Free Trial
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-6 text-center leading-relaxed">
            By creating an account, you agree to our <Link href="/terms" className="text-[#5648FC] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#5648FC] hover:underline">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>

    </section>
  );
}