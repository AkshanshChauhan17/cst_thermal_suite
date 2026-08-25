// app/admin/dashboard/page.tsx
export const dynamic = 'force-dynamic';

import { db } from '@/lib/db'
import type { RowDataPacket } from 'mysql2'
import AddCalculatorForm from './AddCalculatorForm'
import AdminSidebar from '../components/AdminSidebar'
import CalculatorActions from './CalculatorActions' // <--- Naya Import
import { Server, Activity, Power as PowerIcon, Shield, Link2 } from 'lucide-react'

type Calculator = RowDataPacket & {
  id: string
  name: string
  slug: string
  api_url: string
  description: string
  price: number
  is_active: number
  created_at: Date
}

export default async function AdminDashboardPage() {
  const [rows] = await db.query<Calculator[]>(
    'SELECT * FROM calculators ORDER BY created_at DESC'
  )
  const calculators = rows as Calculator[]

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          
          <header className="mb-8 flex justify-between items-end border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1E1B4B] flex items-center gap-3">
                <Server className="text-red-500" size={28} />
                Command Center
              </h1>
              <p className="text-gray-500 mt-1">System Administration & Module Registry</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-100 rounded-md text-xs font-bold text-red-600 uppercase">
              <Shield size={14} /> Root Access
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            <div className="xl:col-span-1">
              <AddCalculatorForm />
            </div>

            <div className="xl:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-full">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Active Calculator Modules</h2>
                  <span className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {calculators.filter(c => c.is_active === 1).length} ONLINE
                  </span>
                </div>

                {calculators.length === 0 ? (
                  <div className="p-12 text-center text-gray-400 text-sm">
                    No calculators deployed yet.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {calculators.map((calc) => (
                      <div key={calc.id} className="p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                        
                        {/* Module Info */}
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-[#1E1B4B] text-base truncate">{calc.name}</h3>
                            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-500 text-xs font-mono rounded shrink-0">
                              /{calc.slug}
                            </span>
                          </div>

                          <p className="text-gray-500 text-sm flex items-center gap-4 mt-2">
                            <span>Price: <span className="font-bold text-red-500">{calc.price} TKN</span></span>
                            <span className="font-mono text-xs text-gray-400">ID: {calc.id.split('-')[0]}</span>
                          </p>

                          {/* API URL View */}
                          <div className="mt-3 bg-gray-100 border border-gray-200 rounded-md p-2 text-[11px] font-mono text-gray-500 flex items-center gap-2 max-w-sm truncate">
                            <Link2 size={12} className="shrink-0 text-indigo-400" />
                            <span className="truncate">{calc.api_url || 'No API configured'}</span>
                          </div>
                        </div>
                        
                        {/* Status & Actions Column */}
                        <div className="shrink-0 flex flex-row sm:flex-col items-end gap-3 sm:gap-2 justify-between w-full sm:w-auto mt-2 sm:mt-0">
                          
                          {calc.is_active ? (
                             <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md text-xs font-bold w-[90px]">
                               <Activity size={14} /> Active
                             </span>
                          ) : (
                             <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-500 border border-gray-200 rounded-md text-xs font-bold w-[90px]">
                               <PowerIcon size={14} /> Offline
                             </span>
                          )}

                          {/* ACTION BUTTONS COMPONENT */}
                          <CalculatorActions id={calc.id} isActive={calc.is_active} />
                          
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}