// app/register/RegisterForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import { registerUser } from '@/app/actions/register'

export default function RegisterForm() {
  const router = useRouter()
  // Form state tracking
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    // Combine first and last name for our database schema
    const fullName = `${formData.firstName} ${formData.lastName}`.trim()

    const res = await registerUser({
      name: fullName,
      email: formData.email,
      password: formData.password,
    })

    if (!res.success) {
      setLoading(false)
      setError(res.error || 'Failed to create account')
    } else {
      setSuccess('Account created! Redirecting to login...')
      
      // ✅ Refresh to wipe any stale cache state
      router.refresh()
      
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    }
  }

  return (
    <div className="w-full lg:w-7/12 bg-[#F7F8FA] p-8 md:p-16 lg:p-24 flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-lg bg-white p-10 shadow-2xl border border-gray-200"
      >
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#1E1B4B] mb-2 tracking-tight">
            Create your account
          </h2>
          <p className="text-gray-500 text-sm">
            Get started with a 14-day free trial. No credit card required.
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
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Social Logins */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-3 bg-white border border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.79 15.69 17.57V20.34H19.26C21.35 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
              <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.69 17.57C14.71 18.23 13.46 18.63 12 18.63C9.17 18.63 6.77 16.72 5.88 14.16H2.21V17.01C4.01 20.59 7.71 23 12 23Z" fill="#34A853" />
              <path d="M5.88 14.16C5.65 13.48 5.52 12.76 5.52 12C5.52 11.24 5.65 10.52 5.88 9.84V6.99H2.21C1.47 8.47 1 10.18 1 12C1 13.82 1.47 15.53 2.21 17.01L5.88 14.16Z" fill="#FBBC05" />
              <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.34 3.88C17.45 2.12 14.97 1 12 1C7.71 1 4.01 3.41 2.21 6.99L5.88 9.84C6.77 7.28 9.17 5.38 12 5.38Z" fill="#EA4335" />
            </svg>
            Google
          </button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Or register with email
          </span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">
                First Name
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={loading}
                placeholder="Rahul"
                className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">
                Last Name
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={loading}
                placeholder="Desai"
                className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors disabled:opacity-50"
              />
            </div>
          </div>

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
              placeholder="rahul@company.in"
              className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">
              Company Name
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              disabled={loading}
              placeholder="Engineering Solutions Ltd."
              className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">
              Password
            </label>
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
            className="mt-4 w-full bg-[#5648FC] text-white px-8 py-4 font-bold text-base hover:bg-[#4336d6] transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:bg-[#5648FC]"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Start Free Trial
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center leading-relaxed">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-[#5648FC] hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-[#5648FC] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        
        <div className="mt-6 text-center text-sm font-bold text-gray-600 border-t border-gray-200 pt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#1E1B4B] hover:text-[#5648FC] hover:underline">
            Log in here
          </Link>
        </div>
      </motion.div>
    </div>
  )
}