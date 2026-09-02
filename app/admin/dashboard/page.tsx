export const dynamic = 'force-dynamic';

import { db } from '@/lib/db'
import type { RowDataPacket } from 'mysql2'
import AddCalculatorForm from './AddCalculatorForm'
import AdminSidebar from '../components/AdminSidebar'
import CalculatorGrid from './CalculatorGrid'
import { Server, Shield } from 'lucide-react'

type Calculator = RowDataPacket & {
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

export default async function AdminDashboardPage() {
  const [rows] = await db.query<Calculator[]>(
    'SELECT * FROM calculators ORDER BY created_at DESC'
  )
  const calculators = rows as Calculator[]

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-[1400px] mx-auto">
          
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
              <CalculatorGrid calculators={calculators} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}