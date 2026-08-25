// app/dashboard/calculations/CalculationsClient.tsx
'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import { Search, History, Clock, Zap, CheckCircle2, ArrowUpDown, Filter } from 'lucide-react'

type SessionLog = {
  session_id: string
  calculator_name: string
  tokens_spent: number
  minutes_used: number
  started_at: string
}

type SortConfig = {
  key: keyof SessionLog
  direction: 'asc' | 'desc'
}

export default function CalculationsClient({ sessions }: { sessions: SessionLog[] }) {
  // --- STATES FOR SEARCH, FILTER, AND SORTING ---
  const [searchQuery, setSearchQuery] = useState('')
  const [filterModule, setFilterModule] = useState('All')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'started_at', direction: 'desc' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  // --- DERIVED DATA LOGIC ---
  // 1. Get unique module names for the dropdown filter
  const uniqueModules = useMemo(() => {
    return Array.from(new Set(sessions.map(s => s.calculator_name)))
  }, [sessions])

  // 2. Filter and Sort the data
  const filteredAndSortedSessions = useMemo(() => {
    let result = [...sessions]

    // Apply Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(s => 
        s.calculator_name.toLowerCase().includes(query) || 
        s.session_id.toLowerCase().includes(query)
      )
    }

    // Apply Dropdown Filter
    if (filterModule !== 'All') {
      result = result.filter(s => s.calculator_name === filterModule)
    }

    // Apply Sorting
    result.sort((a, b) => {
      let aValue = a[sortConfig.key]
      let bValue = b[sortConfig.key]

      // Date sorting check
      if (sortConfig.key === 'started_at') {
        aValue = new Date(aValue as string).getTime()
        bValue = new Date(bValue as string).getTime()
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [sessions, searchQuery, filterModule, sortConfig])

  // Sort Handler
  const requestSort = (key: keyof SessionLog) => {
    let direction: 'asc' | 'desc' = 'desc'
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-6xl mx-auto relative">
          
          {/* Header & Controls */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1E1B4B] tracking-tight flex items-center gap-3">
                <History className="text-[#5648FC]" size={28} />
                Session History
              </h1>
              <p className="text-gray-500 mt-1">Review your module computation logs and token usage.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {/* Module Filter Dropdown */}
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-sm">
                  <Filter size={16} className="text-gray-400" />
                  <select 
                    value={filterModule}
                    onChange={(e) => setFilterModule(e.target.value)}
                    className="bg-transparent outline-none text-[#1E1B4B] font-medium cursor-pointer w-full sm:w-auto"
                  >
                    <option value="All">All Modules</option>
                    {uniqueModules.map((mod, i) => (
                      <option key={i} value={mod}>{mod}</option>
                    ))}
                  </select>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-auto">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search by ID or name..." 
                   className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#5648FC] w-full sm:w-64 shadow-sm transition-colors"
                 />
               </div>
            </div>
          </motion.div>

          {/* Real Usage Logs Table */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th 
                      onClick={() => requestSort('calculator_name')}
                      className="px-6 py-4 text-xs font-bold text-gray-500 hover:text-[#1E1B4B] uppercase tracking-widest cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">Module Info <ArrowUpDown size={12} className="opacity-40 group-hover:opacity-100" /></div>
                    </th>
                    <th 
                      onClick={() => requestSort('minutes_used')}
                      className="px-6 py-4 text-xs font-bold text-gray-500 hover:text-[#1E1B4B] uppercase tracking-widest cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">Compute Time <ArrowUpDown size={12} className="opacity-40 group-hover:opacity-100" /></div>
                    </th>
                    <th 
                      onClick={() => requestSort('tokens_spent')}
                      className="px-6 py-4 text-xs font-bold text-gray-500 hover:text-[#1E1B4B] uppercase tracking-widest cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">Tokens Burned <ArrowUpDown size={12} className="opacity-40 group-hover:opacity-100" /></div>
                    </th>
                    <th 
                      onClick={() => requestSort('started_at')}
                      className="px-6 py-4 text-xs font-bold text-gray-500 hover:text-[#1E1B4B] uppercase tracking-widest cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">Date & Time <ArrowUpDown size={12} className="opacity-40 group-hover:opacity-100" /></div>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAndSortedSessions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                        {searchQuery || filterModule !== 'All' 
                          ? "No records match your search or filter."
                          : "No computation sessions recorded yet. Start a module to see your history."}
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedSessions.map((session, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-[#1E1B4B] text-sm">{session.calculator_name}</div>
                          <div className="text-xs text-gray-400 font-mono mt-1">ID: {session.session_id.toUpperCase()}</div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <Clock size={14} className="text-gray-400" />
                            {session.minutes_used} {session.minutes_used === 1 ? 'Minute' : 'Minutes'}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm font-bold text-red-500">
                            <Zap size={14} />
                            -{session.tokens_spent} TKN
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(session.started_at)}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border bg-emerald-50 text-emerald-700 border-emerald-200 justify-end">
                            <CheckCircle2 size={14} /> LOGGED
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  )
}