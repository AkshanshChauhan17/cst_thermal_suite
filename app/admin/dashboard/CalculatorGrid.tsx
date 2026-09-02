'use client'

import { useState } from 'react'
import { Search, Filter, Power as PowerIcon, Link2, Server } from 'lucide-react'
import CalculatorActions from './CalculatorActions'

type Calculator = {
  id: string
  name: string
  slug: string
  api_url: string
  description: string
  price: number
  is_active: number
  created_at: Date
  image_url?: string
}

export default function CalculatorGrid({ calculators }: { calculators: Calculator[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filteredCalculators = calculators.filter((calc) => {
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          calc.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' ? true : 
                          statusFilter === 'ONLINE' ? calc.is_active === 1 : 
                          calc.is_active === 0

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
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
            <option value="ONLINE">Online Active</option>
            <option value="OFFLINE">Offline Halted</option>
          </select>
        </div>
      </div>

      {filteredCalculators.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-200 shadow-sm h-64">
          <Server size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500 font-semibold">No modules found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCalculators.map((calc) => (
            <div key={calc.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
              
              <div className="relative w-full h-40 bg-gray-100 overflow-hidden border-b border-gray-100">
                <img 
                  src={calc.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'} 
                  alt={calc.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  {calc.is_active ? (
                     <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold shadow-md tracking-wider">
                       <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> ONLINE
                     </span>
                  ) : (
                     <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-600 text-white rounded-full text-[10px] font-bold shadow-md tracking-wider">
                       <PowerIcon size={10} /> OFFLINE
                     </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-extrabold text-[#1E1B4B] text-lg line-clamp-1">{calc.name}</h3>
                  <span className="bg-indigo-50 text-[#5648FC] px-2 py-1 rounded text-xs font-bold shrink-0">
                    {calc.price} TKN
                  </span>
                </div>
                
                <p className="text-xs font-mono text-gray-400 mb-3 bg-gray-50 inline-block px-2 py-0.5 rounded border border-gray-100 w-fit">
                  /{calc.slug}
                </p>

                <p className="text-gray-500 text-sm line-clamp-2 flex-1">
                  {calc.description || 'No description provided for this calculation module.'}
                </p>

                <div className="mt-4 bg-gray-50 border border-gray-100 rounded-lg p-2 text-[11px] font-mono text-gray-500 flex items-center gap-2 truncate">
                  <Link2 size={12} className="shrink-0 text-indigo-400" />
                  <span className="truncate">{calc.api_url || 'No API configured'}</span>
                </div>
              </div>

              <CalculatorActions calculator={calc} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}