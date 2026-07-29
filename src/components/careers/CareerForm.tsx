"use client";

import { motion } from "framer-motion";
import { Send, CheckCircle2, Upload } from "lucide-react";
import { useState } from "react";

export default function CareerForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="apply-form" className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block bg-[#F7F8FA] border border-gray-200 text-[#5648FC] text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-6 rounded-none">
            Application Portal
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E1B4B] tracking-tight mb-4">
            Submit Your Application
          </h2>
          <p className="text-gray-500 text-lg">
            Don't see an exact match? Apply via our general talent pool and our hiring leads will review your portfolio.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#F7F8FA] border border-gray-200 p-8 md:p-12 shadow-2xl rounded-none"
        >
          {submitted ? (
            <div className="py-16 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#E8F5E9] border border-[#10B981]/30 flex items-center justify-center mb-6 rounded-none">
                <CheckCircle2 size={32} className="text-[#10B981]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E1B4B] mb-2 tracking-tight">Application Submitted Successfully</h3>
              <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-8">
                Thank you for applying to Thermal Suite. Our talent team reviews all submissions within 3 to 5 business days.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-[#1E1B4B] text-white px-8 py-4 font-bold text-sm hover:bg-[#5648FC] transition-colors rounded-none"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Vikram Sharma" 
                    className="w-full border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors rounded-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="vikram@engineering.in" 
                    className="w-full border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Target Position</label>
                  <select 
                    className="w-full border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors text-gray-700 rounded-none"
                  >
                    <option>Senior Thermodynamic Engineer</option>
                    <option>Full Stack SaaS Developer</option>
                    <option>HVAC Product Specialist</option>
                    <option>General Talent Pool / Open Application</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">LinkedIn / Portfolio URL</label>
                  <input 
                    type="url" 
                    placeholder="https://linkedin.com/in/username" 
                    className="w-full border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors rounded-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Upload Resume / CV (PDF)</label>
                <div className="border-2 border-dashed border-gray-300 p-6 bg-white text-center flex flex-col items-center justify-center cursor-pointer hover:border-[#5648FC] transition-colors">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Drag and drop your resume here, or <span className="text-[#5648FC]">browse files</span></p>
                  <p className="text-xs text-gray-400 mt-1">PDF format only (Max size: 5MB)</p>
                  <input type="file" accept=".pdf" className="hidden" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Cover Note / Experience Summary</label>
                <textarea 
                  rows={4} 
                  required 
                  placeholder="Briefly describe your background in thermodynamics, software engineering, or industrial cooling..." 
                  className="w-full border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors resize-none rounded-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="mt-4 w-full bg-[#5648FC] text-white px-8 py-4 font-bold text-base hover:bg-[#4336d6] transition-colors flex items-center justify-center gap-2 group rounded-none"
              >
                Submit Application
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}