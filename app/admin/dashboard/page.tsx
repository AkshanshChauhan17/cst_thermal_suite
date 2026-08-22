// app/admin/dashboard/page.tsx
import { db } from '@/lib/db'
import AddCalculatorForm from './AddCalculatorForm'
import AdminSidebar from '../components/AdminSidebar'
import { Server, Activity, Power, Shield } from 'lucide-react'

type Calculator = {
  id: string
  name: string
  slug: string
  price: number
  is_active: number
  created_at: Date
}

export default async function AdminDashboardPage() {
  const [rows]: any = await db.query(
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
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Active Calculator Modules</h2>
                  <span className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {calculators.length} ONLINE
                  </span>
                </div>

                {calculators.length === 0 ? (
                  <div className="p-12 text-center text-gray-400 text-sm">
                    No calculators deployed yet.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {calculators.map((calc) => (
                      <div key={calc.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-[#1E1B4B] text-base">{calc.name}</h3>
                            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-500 text-xs font-mono rounded">
                              /{calc.slug}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm flex items-center gap-4 mt-2">
                            <span>Price: <span className="font-bold text-red-500">{calc.price} TKN</span></span>
                            <span className="font-mono text-xs text-gray-400">ID: {calc.id.split('-')[0]}</span>
                          </p>
                        </div>
                        
                        <div>
                          {calc.is_active ? (
                             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md text-xs font-bold">
                               <Activity size={14} /> Active
                             </span>
                          ) : (
                             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-500 border border-gray-200 rounded-md text-xs font-bold">
                               <Power size={14} /> Offline
                             </span>
                          )}
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