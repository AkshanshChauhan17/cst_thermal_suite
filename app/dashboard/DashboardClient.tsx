// app/dashboard/DashboardClient.tsx
'use client'

import { motion } from 'framer-motion'

import TopMetrics from './components/TopMetrics'
import CalculatorStore from './components/CalculatorStore'
import Sidebar from './components/Sidebar'

// Types
type Calculator = { id: string; name: string; description: string; slug: string; price: number }
type UserData = { id: string; name: string; email: string; token_balance: number }
type UserStats = { totalSessions: number; totalMinutes: number; totalTokensSpent: number } // NEW

export default function DashboardClient({ 
  user, 
  calculators,
  stats // NEW
}: { 
  user: UserData, 
  calculators: Calculator[],
  stats: UserStats // NEW
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-8">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={containerVariants} 
          className="max-w-6xl mx-auto relative"
        >
          {/* Pass stats to TopMetrics */}
          <TopMetrics user={user} stats={stats} variants={itemVariants} />

          <CalculatorStore 
            calculators={calculators}
            variants={itemVariants}
          />
        </motion.div>
      </main>
    </div>
  )
}