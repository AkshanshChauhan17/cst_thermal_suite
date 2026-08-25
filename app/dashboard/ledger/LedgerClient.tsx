// app/dashboard/ledger/LedgerClient.tsx
'use client'

import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import { History, ArrowDownRight, ArrowUpRight, FileText } from 'lucide-react'

type LedgerEntry = {
  id: string
  amount: number
  reason: string
  created_at: Date
}

export default function LedgerClient({ history }: { history: LedgerEntry[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  // Format date nicely
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  // EXPORT CSV FUNCTION
  const handleExportCSV = () => {
    if (history.length === 0) {
      alert("No data to export!");
      return;
    }

    // 1. Create CSV Headers
    const headers = ['Transaction ID', 'Reason', 'Date & Time', 'Amount (TKN)'];

    // 2. Map data to CSV rows
    const rows = history.map(entry => {
      // Reason ya Date mein agar comma (,) hua toh CSV break ho jayega, isliye usko quotes "" mein wrap kar rahe hain
      const safeReason = `"${entry.reason.replace(/"/g, '""')}"`;
      const safeDate = `"${formatDate(entry.created_at)}"`;
      const amountStr = entry.amount > 0 ? `+${entry.amount}` : `${entry.amount}`;
      
      return [entry.id, safeReason, safeDate, amountStr].join(',');
    });

    // 3. Combine Headers and Rows
    const csvContent = [headers.join(','), ...rows].join('\n');

    // 4. Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ThermalSuite_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
    
    // Append to body, click, and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-6xl mx-auto relative">
          
          {/* Header */}
          <motion.div variants={itemVariants} className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1E1B4B] tracking-tight flex items-center gap-3">
                <History className="text-[#5648FC]" size={28} />
                Ledger History
              </h1>
              <p className="text-gray-500 mt-1">An immutable record of your token transactions.</p>
            </div>
            
            {/* ADDED onClick HANDLER HERE */}
            <button 
              onClick={handleExportCSV}
              className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm shadow-sm active:scale-95"
            >
              <FileText size={16} />
              Export CSV
            </button>
          </motion.div>

          {/* Ledger Table */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {history.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                No transactions found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Transaction Details</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date & Time</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {history.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded flex items-center justify-center ${
                              entry.amount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                            }`}>
                              {entry.amount > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            </div>
                            <div>
                              <p className="font-bold text-[#1E1B4B] text-sm">{entry.reason}</p>
                              <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {entry.id.split('-')[0]}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{formatDate(entry.created_at)}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`font-bold font-mono ${
                            entry.amount > 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {entry.amount > 0 ? '+' : ''}{entry.amount} TKN
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

        </motion.div>
      </main>
    </div>
  )
}