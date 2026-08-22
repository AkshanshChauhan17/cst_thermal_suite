// app/contact/page.tsx (ya jahan bhi aapka ContactSection component hai)
"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { submitContact } from "@/app/actions/contactActions";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const res = await submitContact(formData);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row bg-white">
      
      {/* Left Side - Contact Info */}
      <div className="w-full lg:w-5/12 bg-[#1E1B4B] p-8 md:p-16 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-[#5648FC] rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute top-[10%] -left-[20%] w-[60%] h-[60%] bg-[#86EFAC] rounded-full blur-[120px] opacity-10"></div>
        </div>

        <div className="relative z-10">
          <div className="inline-block bg-[#5648FC]/20 border border-[#5648FC]/50 text-[#86EFAC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6">
            Get in Touch
          </div>
          <motion.h1 
            initial="hidden" 
            animate="visible" 
            variants={fadeUpVariants} 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            We are here for your engineering teams.
          </motion.h1>
          <motion.p 
            initial="hidden" 
            animate="visible" 
            variants={fadeUpVariants} 
            transition={{ delay: 0.1 }} 
            className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed"
          >
            Whether you need custom coil selection support, enterprise billing assistance, or technical documentation queries, our team responds within 2 hours.
          </motion.p>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#5648FC]/20 border border-[#5648FC]/50 flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin size={20} className="text-[#86EFAC]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Headquarters</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Cyber City, DLF Phase 2, Sector 24, Gurugram, Haryana 122002
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#5648FC]/20 border border-[#5648FC]/50 flex items-center justify-center flex-shrink-0 mt-1">
                <Mail size={20} className="text-[#86EFAC]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Direct Email</h3>
                <p className="text-gray-400 text-sm">support@thermalsuite.in | enterprise@thermalsuite.in</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#5648FC]/20 border border-[#5648FC]/50 flex items-center justify-center flex-shrink-0 mt-1">
                <Phone size={20} className="text-[#86EFAC]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Telephone Support</h3>
                <p className="text-gray-400 text-sm">+91 (124) 4890-4400 (Mon - Sat, 9am - 7pm IST)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-16 pt-8 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-[#86EFAC]" />
            <span className="text-sm text-gray-300 font-medium">Average Response Time: <strong className="text-white">Under 45 Minutes</strong></span>
          </div>
        </div>
      </div>

      {/* Right Side - Sharp Contact Form */}
      <div className="w-full lg:w-7/12 bg-[#F7F8FA] p-8 md:p-16 lg:p-24 flex flex-col justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-lg bg-white p-10 shadow-2xl border border-gray-200"
        >
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#E8F5E9] border border-[#10B981]/30 flex items-center justify-center mb-6">
                <CheckCircle2 size={32} className="text-[#10B981]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E1B4B] mb-2 tracking-tight">Message Received</h3>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-8">
                Thank you for reaching out. An engineering specialist has been assigned to your query and will contact you shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-[#1E1B4B] text-white px-6 py-3 font-bold text-sm hover:bg-[#5648FC] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#1E1B4B] mb-2 tracking-tight">Send a message</h2>
                <p className="text-gray-500 text-sm">Fill out the form below and our technical team will get back to you.</p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      name="full_name"
                      required 
                      placeholder="Rahul Sharma" 
                      className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Work Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required 
                      placeholder="rahul@company.in" 
                      className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Subject / Department</label>
                  <select 
                    name="department"
                    className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] transition-colors text-gray-700"
                  >
                    <option>Technical Calculator Support</option>
                    <option>Coil Selection Software Query</option>
                    <option>Enterprise Token Purchasing</option>
                    <option>Custom Hardware Integration</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Message</label>
                  <textarea 
                    name="message"
                    rows={4} 
                    required 
                    placeholder="Describe your thermodynamic calculations or inquiry in detail..." 
                    className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="mt-2 w-full bg-[#5648FC] text-white px-8 py-4 font-bold text-base hover:bg-[#4336d6] transition-colors flex items-center justify-center gap-2 group"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : "Send Message"}
                  {!loading && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>

    </section>
  );
}