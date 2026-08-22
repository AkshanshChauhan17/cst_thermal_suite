// app/dashboard/calculations/CalculationsClient.tsx
'use client'

import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import { Zap, Play, CheckCircle2, AlertCircle, Clock, FileDown, Search } from 'lucide-react'

type Job = {
  id: string
  name: string
  status: string
  duration: string
  date: string
}

export default function CalculationsClient({ jobs }: { jobs: Job[] }) {
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
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle2 size={16} className="text-emerald-500" />
      case 'FAILED': return <AlertCircle size={16} className="text-red-500" />
      case 'RUNNING': return <Clock size={16} className="text-blue-500 animate-spin" />
      default: return <Clock size={16} className="text-gray-500" />
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'FAILED': return 'bg-red-50 text-red-700 border-red-200'
      case 'RUNNING': return 'bg-blue-50 text-blue-700 border-blue-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-5xl mx-auto">
          
          {/* Header */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1E1B4B] tracking-tight flex items-center gap-3">
                <Zap className="text-[#5648FC]" size={28} />
                Computation Jobs
              </h1>
              <p className="text-gray-500 mt-1">Manage and review your engineering simulation runs.</p>
            </div>
            
            <div className="flex gap-3">
               <div className="relative">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="Search jobs..." 
                   className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#5648FC] w-64"
                 />
               </div>
              <button className="bg-[#1E1B4B] hover:bg-[#5648FC] text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm shadow-sm">
                <Play size={16} />
                New Run
              </button>
            </div>
          </motion.div>

          {/* Active/Recent Jobs Table */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Job ID & Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Compute Time</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Executed On</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#1E1B4B] text-sm">{job.name}</div>
                        <div className="text-xs text-gray-400 font-mono mt-0.5">{job.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusStyle(job.status)}`}>
                          {getStatusIcon(job.status)}
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">
                        {job.duration}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(job.date)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {job.status === 'COMPLETED' ? (
                           <button className="text-[#5648FC] hover:text-[#4336d6] text-sm font-medium flex items-center gap-1 justify-end w-full">
                             <FileDown size={16} /> Report
                           </button>
                        ) : (
                           <button className="text-gray-400 cursor-not-allowed text-sm font-medium flex items-center gap-1 justify-end w-full" disabled>
                             <FileDown size={16} /> N/A
                           </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  )
}