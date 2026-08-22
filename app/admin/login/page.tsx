// app/admin/login/page.tsx
export const dynamic = 'force-dynamic';

import { ShieldAlert } from 'lucide-react'
import AdminLoginForm from './AdminLoginForm'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 selection:bg-red-500/30">

      <div className="absolute inset-0 z-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#111] border border-[#222] p-8 md:p-10 shadow-2xl">

          <div className="flex flex-col items-center mb-10">
            <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4">
              <ShieldAlert size={24} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Admin Gateway</h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Thermal Suite Control Panel</p>
          </div>

          <AdminLoginForm /> 

        </div>
      </div>
    </div>
  )
}