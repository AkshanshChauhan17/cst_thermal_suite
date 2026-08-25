// app/admin/dashboard/AddCalculatorForm.tsx
'use client'

import { useState, useRef } from 'react'
import { addCalculator } from '@/app/actions/adminCalculators'
import { Loader2, Plus, AlertCircle, CheckCircle2, Link2 } from 'lucide-react'

export default function AddCalculatorForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // 1. Form ka reference banane ke liye useRef ka use kiya
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(e.currentTarget)
    const res = await addCalculator(formData)

    setLoading(false)
    if (!res.success) {
      setError(res.error || 'Failed to add calculator')
    } else {
      setSuccess(res.message || 'Calculator added successfully')
      
      // 2. Reference ke through safely form reset karna
      formRef.current?.reset() 
      
      setTimeout(() => setSuccess(null), 4000)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-lg font-bold text-[#1E1B4B]">Register New Calculator</h2>
        <p className="text-gray-500 text-sm mt-1">Deploy a new computational module to the client store.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 text-red-600 text-sm font-medium">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-start gap-3 text-emerald-600 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* 3. yahan formRef assign kar diya */}
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Display Name</label>
          <input
            type="text"
            name="name"
            required
            disabled={loading}
            placeholder="e.g. HVAC Load Estimator"
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">URL Slug (Folder Name)</label>
          <input
            type="text"
            name="slug"
            required
            disabled={loading}
            placeholder="e.g. hvac-load"
            pattern="^[a-z0-9-]+$"
            title="Only lowercase letters, numbers, and hyphens"
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50 font-mono"
          />
        </div>

        {/* PYTHON API URL */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Python API Endpoint</label>
          <div className="relative">
            <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="url"
              name="api_url"
              required
              disabled={loading}
              placeholder="https://xyz-domain.com/api/run"
              className="w-full border border-gray-300 pl-9 pr-4 py-2.5 rounded-lg text-sm font-mono text-indigo-600 focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50 bg-gray-50"
            />
          </div>
          <p className="text-[10px] text-gray-400">Secure backend compute URL. Completely hidden from public clients.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
          <textarea
            name="description"
            rows={3}
            disabled={loading}
            placeholder="Briefly describe what this calculator does..."
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50 resize-none"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Unlock Price (Tokens)</label>
          <input
            type="number"
            name="price"
            required
            min="0"
            defaultValue="50"
            disabled={loading}
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50 font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          Deploy Calculator
        </button>
      </form>
    </div>
  )
}