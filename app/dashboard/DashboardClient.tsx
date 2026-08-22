'use client'

import { motion } from 'framer-motion'

import TopMetrics from './components/TopMetrics'
import CalculatorStore from './components/CalculatorStore'
import Sidebar from './components/Sidebar'

// Types
type Calculator = { id: string; name: string; description: string; slug: string; price: number }
type UserData = { id: string; name: string; email: string; token_balance: number }

export default function DashboardClient({ 
  user, 
  calculators, 
  ownedIds 
}: { 
  user: UserData, 
  calculators: Calculator[], 
  ownedIds: string[] 
}) {
  // Animation settings
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
      {/* 1. Moduler Sidebar */}
      <Sidebar />
      {/* Main Content Workspace */}
      <main className="flex-1 md:ml-64 p-8">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={containerVariants} 
          className="max-w-5xl mx-auto"
        >
          {/* 2. Moduler Top Metrics */}
          <TopMetrics user={user} variants={itemVariants} />

          {/* 3. Moduler Store */}
          <CalculatorStore 
            calculators={calculators} 
            ownedIds={ownedIds} 
            userBalance={user.token_balance}
            variants={itemVariants}
          />
        </motion.div>
      </main>
    </div>
  )
}