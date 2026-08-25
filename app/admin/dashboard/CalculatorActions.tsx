// app/admin/dashboard/CalculatorActions.tsx
'use client'

import { useState } from 'react'
import { Trash2, Power, Loader2 } from 'lucide-react'
import { deleteCalculator, toggleCalculatorStatus } from '@/app/actions/adminCalculators'

export default function CalculatorActions({ id, isActive }: { id: string, isActive: number }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  async function handleDelete() {
    if (confirm('Are you sure you want to completely remove this module? This action cannot be undone.')) {
      setIsDeleting(true)
      await deleteCalculator(id)
      setIsDeleting(false)
    }
  }

  async function handleToggle() {
    setIsToggling(true)
    await toggleCalculatorStatus(id, isActive)
    setIsToggling(false)
  }

  return (
    <div className="flex items-center gap-2 mt-3 sm:mt-0">
      <button 
        onClick={handleToggle}
        disabled={isToggling || isDeleting}
        className={`p-2 rounded-lg border transition-colors disabled:opacity-50 ${
          isActive 
            ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
            : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
        }`}
        title={isActive ? "Disable Module" : "Enable Module"}
      >
        {isToggling ? <Loader2 size={16} className="animate-spin" /> : <Power size={16} />}
      </button>
      
      <button 
        onClick={handleDelete}
        disabled={isDeleting || isToggling}
        className="p-2 rounded-lg border border-red-100 bg-white text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
        title="Delete Module permanently"
      >
        {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
      </button>
    </div>
  )
}