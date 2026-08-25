// app/dashboard/CalculatorStore.tsx
'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { Play, Cpu } from 'lucide-react'

type Calculator = {
  id: string
  name: string
  description: string
  slug: string
  price: number 
}

export default function CalculatorStore({ 
  calculators, 
  variants 
}: { 
  calculators: Calculator[], 
  variants: Variants
}) {

  return (
    <motion.div variants={variants} className="mt-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#1E1B4B]">Computational Modules</h2>
          <p className="text-gray-500 text-sm mt-1">Access all specialized calculators for your workspace.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculators.length === 0 ? (
           <div className="col-span-2 p-12 text-center bg-white border border-gray-200 rounded-xl text-gray-500 text-sm">
             No modules available in the store yet.
           </div>
        ) : (
          calculators.map((calc) => (
            <div key={calc.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:border-[#5648FC] transition-colors group">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-[#5648FC] group-hover:bg-[#5648FC] group-hover:text-white transition-colors">
                    <Cpu size={20} />
                  </div>
                  {/* Premium Tag instead of "Free" */}
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                    Module Ready
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1E1B4B] mb-2">{calc.name}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">
                  {calc.description || 'Advanced engineering calculation module.'}
                </p>
              </div>

              <Link 
                href={`/dashboard/calculators/${calc.slug}`} 
                className="w-full bg-[#1E1B4B] hover:bg-[#5648FC] text-white px-4 py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Play size={16} /> Launch Module
              </Link>
            </div>
          ))
        )}
      </div>
    </motion.div>
  )
}