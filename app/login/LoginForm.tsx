// app/login/LoginForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import { loginUser } from '@/app/actions/login'

export default function LoginForm() {
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

    const res = await loginUser(formData)

    if (!res.success) {
      setLoading(false)
      setError(res.error || 'Login failed')
    } else {
      setSuccess('Access Granted. Redirecting...')
      
      // ✅ Cache refresh to ensure Dashboard loads with new auth state
      router.refresh()
      
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    }
  }

  return (
    <div className="w-full lg:w-7/12 bg-[#F7F8FA] p-8 md:p-16 lg:p-24 flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-md bg-white p-10 shadow-2xl border border-gray-200"
      >
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#1E1B4B] mb-2 tracking-tight">
            Log in
          </h2>
          <p className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-[#5648FC] hover:underline font-bold"
            >
              Start a free trial
            </Link>
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-start gap-3 text-red-600 text-sm font-medium">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-[#86EFAC]/20 border border-[#86EFAC] flex items-start gap-3 text-emerald-700 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Social Logins */}
        <div className="flex flex-col gap-4 mb-8">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.79 15.69 17.57V20.34H19.26C21.35 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
              <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.69 17.57C14.71 18.23 13.46 18.63 12 18.63C9.17 18.63 6.77 16.72 5.88 14.16H2.21V17.01C4.01 20.59 7.71 23 12 23Z" fill="#34A853" />
              <path d="M5.88 14.16C5.65 13.48 5.52 12.76 5.52 12C5.52 11.24 5.65 10.52 5.88 9.84V6.99H2.21C1.47 8.47 1 10.18 1 12C1 13.82 1.47 15.53 2.21 17.01L5.88 14.16Z" fill="#FBBC05" />
              <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.34 3.88C17.45 2.12 14.97 1 12 1C7.71 1 4.01 3.41 2.21 6.99L5.88 9.84C6.77 7.28 9.17 5.38 12 5.38Z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Or continue with email
          </span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">
              Work Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={loading}
              placeholder="name@company.in"
              className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#5648FC] hover:underline font-bold"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={loading}
              placeholder="••••••••"
              className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-[#1E1B4B] text-white px-8 py-4 font-bold text-base hover:bg-[#5648FC] transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:bg-[#1E1B4B]"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Access Workspace
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}