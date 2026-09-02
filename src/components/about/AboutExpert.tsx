'use client'

import { motion } from 'framer-motion'
import { Award, Target, Flame, Lightbulb, Settings, Quote } from 'lucide-react'
import Image from 'next/image'

export default function AboutExpert() {
  const expertiseList = [
    { icon: <Award className="text-amber-500" size={20} />, text: "45+ Years of Industry Experience" },
    { icon: <Settings className="text-[#5648FC]" size={20} />, text: "HVAC & Heat-Transfer Equipment" },
    { icon: <Flame className="text-red-500" size={20} />, text: "Industrial Heat Recovery" },
    { icon: <Target className="text-emerald-500" size={20} />, text: "Field-Performance Optimization" }
  ]

  return (
    <section className="w-full bg-white py-16 px-6 relative overflow-hidden border-t border-gray-100">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#5648FC]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
          
          {/* Left Side: Photo & Quick Highlights */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/3 flex flex-col items-center lg:items-start gap-6"
          >
            {/* Image Container - Replace src with actual photo */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100 shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-[#1E1B4B] to-[#5648FC] flex items-center justify-center text-white/50 text-5xl font-light">
                <Image src="/admin.jpg" alt="Dr. Jagjit Singh" fill className="object-cover" />                 
              </div>
              
              {/* Experience Badge overlaid on image */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-white/20">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#1E1B4B]">45</span>
                  <span className="text-xs font-semibold text-gray-600 leading-tight">Years<br/>Experience</span>
                </div>
              </div>
            </div>

            {/* Core Expertise Badges */}
            <div className="w-full max-w-sm bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Core Strengths</h3>
              <ul className="space-y-3">
                {expertiseList.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100 shrink-0">
                      {item.icon}
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Side: Bio Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-2/3"
          >
            <div className="mb-2">
              <span className="text-[#5648FC] font-bold tracking-wider uppercase text-sm">Meet Our Heat Exchange Expert</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E1B4B] mb-6">
              Dr. Jagjit Singh
            </h2>
            
            <div className="prose prose-lg text-gray-600 max-w-none space-y-5 leading-relaxed">
              <p>
                Dr. Jagjit Singh, a heat exchange expert at <strong>CST EnviroTech</strong>, is a distinguished thermal engineering professional with nearly 45 years of hands-on experience in the design, selection, manufacturing, installation, and performance evaluation of HVAC and industrial heat-transfer equipment.
              </p>
              
              <p>
                His core expertise covers the complete engineering of chilled-water coils, hot-water coils, steam coils, direct-expansion (DX) coils, condensers, evaporators, dry coolers, and other finned-tube heat exchangers. This includes meticulous work on tube and fin geometry, circuitry, air-side and fluid-side heat transfer, pressure-drop calculations, material selection, and overall equipment optimization.
              </p>

              <p>
                Over his prolific career, he has worked extensively on the practical manufacturing and field-performance aspects of heat exchangers. This deep, ground-level understanding enables designs to be seamlessly translated from theoretical calculations into highly manufacturable and reliable equipment. He also possesses extensive experience in industrial heat recovery and waste-heat utilization, including the recovery of thermal energy from exhaust gases, steam, and industrial processes to produce useful heating, cooling, and energy.
              </p>
            </div>

            {/* Software Highlight Section */}
            <div className="mt-8 bg-gradient-to-br from-[#1E1B4B] to-[#2D2870] rounded-2xl p-6 md:p-8 text-white relative shadow-xl">
              <Quote className="absolute top-4 right-4 text-white/10" size={80} />
              <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                  <Lightbulb className="text-amber-400" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">The Vision Behind CST Coil Selection Software</h4>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    This software has been developed directly from Dr. Singh combination of decades of practical engineering experience, established heat-transfer principles, and modern computational methods. The objective is clear: to provide engineers and manufacturers a highly practical, precise tool for accurate coil design, selection, and performance analysis.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}