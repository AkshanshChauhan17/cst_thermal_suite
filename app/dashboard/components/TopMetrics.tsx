'use client'

import { motion, type Variants } from 'framer-motion'
import { Activity, Zap, History, AlertCircle } from 'lucide-react'

type UserData = {
  id: string
  name: string
  email: string
  token_balance: number
}

export default function TopMetrics({ user, variants }: { user: UserData, variants: Variants }) {
  return (
    <>
      <motion.div variants={variants} className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#1E1B4B] tracking-tight">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="text-gray-500 mt-1">Here is your workspace overview.</p>
        </div>
      </motion.div>

      <motion.div variants={variants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Token Balance Card */}
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
            <span className="text-sm font-medium text-[#5648FC] hover:underline cursor-pointer">Top up</span>
          </div>
        </div>

        {/* Hardware Status Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Activity size={24} className="text-emerald-600" />
            </div>
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ONLINE
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">
            Active Coils
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-[#1E1B4B]">1</span>
            <span className="text-sm font-medium text-gray-500">Device Connected</span>
          </div>
        </div>

        {/* Recent Jobs Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-gray-50 rounded-lg">
              <History size={24} className="text-gray-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">
            Jobs This Week
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-[#1E1B4B]">12</span>
            <span className="text-sm font-medium text-gray-500">-45 tokens</span>
          </div>
        </div>
      </motion.div>
    </>
  )
}