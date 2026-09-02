'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Lock, Play, Zap, Cpu } from 'lucide-react'
import Link from 'next/link'

import TopMetrics from './components/TopMetrics'
import Sidebar from './components/Sidebar'

type Calculator = { 
  id: string; 
  name: string; 
  description: string; 
  slug: string; 
  price: number;
  is_active: number;
  image_url?: string;
}

type UserData = { id: string; name: string; email: string; token_balance: number }
type UserStats = { totalSessions: number; totalMinutes: number; totalTokensSpent: number } 

export default function DashboardClient({ 
  user, 
  calculators,
  stats 
}: { 
  user: UserData, 
  calculators: Calculator[],
  stats: UserStats 
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const filteredCalculators = calculators.filter((calc) => {
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          calc.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' ? true : 
                          statusFilter === 'ACTIVE' ? calc.is_active === 1 : 
                          calc.is_active === 0
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-8">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={containerVariants} 
          className="max-w-6xl mx-auto relative space-y-8"
        >
          <TopMetrics user={user} stats={stats} variants={itemVariants} />

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name or slug..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5648FC]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="text-gray-400" size={18} />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5648FC] text-sm font-semibold text-gray-700"
              >
                <option value="ALL">All Modules</option>
                <option value="ACTIVE">Ready to Run</option>
                <option value="UPCOMING">Coming Soon</option>
              </select>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {filteredCalculators.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-200 shadow-sm h-64">
                <Cpu size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 font-semibold">No modules found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCalculators.map((calc) => (
                  <div 
                    key={calc.id} 
                    className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${
                      calc.is_active ? 'border-gray-200 hover:shadow-xl hover:border-indigo-200' : 'border-gray-100 opacity-80'
                    }`}
                  >
                    
                    <div className="relative h-48 bg-gray-100 border-b border-gray-100 overflow-hidden">
                      <img 
                        src={calc.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'} 
                        alt={calc.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${calc.is_active ? 'hover:scale-105' : 'grayscale'}`}
                      />
                      <div className="absolute top-4 right-4">
                        {calc.is_active ? (
                          <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Ready
                          </span>
                        ) : (
                          <span className="bg-gray-800 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                            <Lock size={10} /> Coming Soon
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className={`text-xl font-black mb-1 ${calc.is_active ? 'text-[#1E1B4B]' : 'text-gray-500'}`}>
                        {calc.name}
                      </h3>
                      <p className="text-xs font-mono text-gray-400 mb-4 bg-gray-50 inline-block px-2 py-0.5 rounded border border-gray-100 w-fit">
                        /{calc.slug}
                      </p>
                      <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                        {calc.description || 'Advanced calculation module optimized for precise cloud processing.'}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Burn Rate</span>
                          <span className={`font-bold flex items-center gap-1 ${calc.is_active ? 'text-[#5648FC]' : 'text-gray-400'}`}>
                            <Zap size={14} className={calc.is_active ? "text-amber-500" : "text-gray-300"}/> 
                            {calc.price} TKN <span className="text-xs font-normal">/ min</span>
                          </span>
                        </div>
                        
                        {calc.is_active ? (
                          <Link 
                            href={`/dashboard/calculators/${calc.slug}`}
                            className="bg-[#1E1B4B] hover:bg-[#5648FC] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2 hover:-translate-y-0.5"
                          >
                            Launch <Play size={14} />
                          </Link>
                        ) : (
                          <button disabled className="bg-gray-100 text-gray-400 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 cursor-not-allowed">
                            Offline
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}