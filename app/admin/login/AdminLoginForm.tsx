// app/admin/login/AdminLoginForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogin } from '@/app/actions/adminLogin'
import { ShieldAlert, ArrowRight, Loader2, Lock } from 'lucide-react'

export default function AdminLoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const res = await adminLogin(formData)

    if (!res.success) {
      setLoading(false)
      setError(res.error || 'Authentication failed')
    } else {
      setSuccess('Authorization confirmed. Booting dashboard...')
      router.refresh()

      setTimeout(() => {
        router.push('/admin/dashboard')
      }, 1000)
    }
  }

  return (
    <>
      {error && (
        <div className="mb-6 p-4 bg-red-950/50 border border-red-900/50 flex items-start gap-3 text-red-400 text-sm font-medium">
          <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-900/50 flex items-start gap-3 text-emerald-400 text-sm font-medium">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Administrator Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={loading}
            className="w-full border border-[#333] px-4 py-3 text-sm bg-[#0a0a0a] text-white focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50 font-mono"
            placeholder="admin@thermalsuite.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Security Passkey
          </label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={loading}
            className="w-full border border-[#333] px-4 py-3 text-sm bg-[#0a0a0a] text-white focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50 font-mono"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-white text-black px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Establish Uplink
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </>
  )
}