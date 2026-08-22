'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { purchaseCalculator } from '@/app/actions/purchaseCalculator'
import { Zap, AlertCircle, Loader2, Lock, Unlock, Play } from 'lucide-react'

type Calculator = {
  id: string
  name: string
  description: string
  slug: string
  price: number
}

export default function CalculatorStore({ 
  calculators, 
  ownedIds, 
  userBalance, 
  variants 
}: { 
  calculators: Calculator[], 
  ownedIds: string[], 
  userBalance: number,
  variants: Variants
}) {
  const [purchasingId, setPurchasingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handlePurchase(calcId: string) {
    setPurchasingId(calcId)
    setError(null)
    const res = await purchaseCalculator(calcId)
    setPurchasingId(null)
    
    if (!res.success) {
      setError(res.error || 'Failed to purchase module')
      setTimeout(() => setError(null), 4000)
    }
  }

  return (
    <motion.div variants={variants} className="mt-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#1E1B4B]">Computational Modules</h2>
          <p className="text-gray-500 text-sm mt-1">Unlock specialized calculators for your workspace.</p>
        </div>
        {error && (
          <span className="text-sm font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-md border border-red-100 flex items-center gap-2">
            <AlertCircle size={14} /> {error}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculators.length === 0 ? (
           <div className="col-span-2 p-12 text-center bg-white border border-gray-200 rounded-xl text-gray-500 text-sm">
             No modules available in the store yet.
           </div>
        ) : (
          calculators.map((calc) => {
            const isOwned = ownedIds.includes(calc.id)
            const isPurchasing = purchasingId === calc.id

            return (
              <div key={calc.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-[#5648FC]">
                      {isOwned ? <Unlock size={20} /> : <Lock size={20} />}
                    </div>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-bold font-mono rounded">
                      {isOwned ? 'OWNED' : `${calc.price} TOKENS`}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1E1B4B] mb-2">{calc.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    {calc.description || 'Advanced engineering calculation module.'}
                  </p>
                </div>

                {isOwned ? (
                  <Link href={`/calculators/${calc.slug}`} className="w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                    <Play size={16} /> Launch Module
                  </Link>
                ) : (
                  <button 
                    onClick={() => handlePurchase(calc.id)}
                    disabled={isPurchasing || userBalance < calc.price}
                    className="w-full bg-[#1E1B4B] hover:bg-[#5648FC] text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-[#1E1B4B]"
                  >
                    {isPurchasing ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                    {isPurchasing ? 'Unlocking...' : `Unlock for ${calc.price} Tokens`}
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>
    </motion.div>
  )
}