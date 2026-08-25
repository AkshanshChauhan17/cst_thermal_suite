// app/dashboard/components/TopMetrics.tsx
'use client'

import { motion, type Variants } from 'framer-motion'
import { Zap, History, AlertCircle, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

type UserData = {
  id: string
  name: string
  email: string
  token_balance: number
}

// New Stats Type
type UserStats = {
  totalSessions: number
  totalMinutes: number
  totalTokensSpent: number
}

export default function TopMetrics({ user, stats, variants }: { user: UserData, stats: UserStats, variants: Variants }) {
  return (
    <>
      <motion.div variants={variants} className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#1E1B4B] tracking-tight">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="text-gray-500 mt-1">Here is your workspace overview and compute usage.</p>
        </div>
      </motion.div>

      <motion.div variants={variants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        
        {/* Card 1: Live Token Balance (Always Current) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Zap size={24} className="text-[#5648FC]" />
            </div>
            {user.token_balance < 20 && (
              <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                <AlertCircle size={12} /> LOW BALANCE
              </span>
            )}
          </div>
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1 relative z-10">
            Compute Tokens
          </h3>
          <div className="flex items-baseline gap-2 relative z-10">
            <span className="text-4xl font-black text-[#1E1B4B]">{user.token_balance.toLocaleString()}</span>
            <Link href="/dashboard/billing" className="text-sm font-medium text-[#5648FC] hover:underline cursor-pointer">
              Top up
            </Link>
          </div>
        </div>

        {/* Card 2: Total Compute Time (Minutes Used) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Clock size={24} className="text-emerald-600" />
            </div>
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 size={12} /> VERIFIED
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">
            Compute Time
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-[#1E1B4B]">{stats.totalMinutes}</span>
            <span className="text-sm font-medium text-gray-500">Mins Total</span>
          </div>
        </div>

        {/* Card 3: Session & Burn Rate History */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-50 rounded-lg">
              <History size={24} className="text-amber-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">
            Usage History
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-[#1E1B4B]">{stats.totalSessions}</span>
            <span className="text-sm font-medium text-gray-500">Sessions</span>
          </div>
          <p className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded inline-block mt-2">
            -{stats.totalTokensSpent.toLocaleString()} Tokens Burned
          </p>
        </div>

      </motion.div>
    </>
  )
}