// app/contact/ContactForm.tsx
"use client";

import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { submitContact } from "@/app/actions/contactActions";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
  );
}