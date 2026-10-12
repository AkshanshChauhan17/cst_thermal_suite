'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import { registerUser } from '@/app/actions/register'

interface StateData {
  name: string;
}

interface CountryData {
  name: string;
  states: StateData[];
}

export default function RegisterForm() {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    state: '',
    gstNumber: '',
    panNumber: '',
    password: '',
  })
  
  const [locations, setLocations] = useState<CountryData[]>([])
  const [loadingLocations, setLoadingLocations] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/states')
        const json = await res.json()
        if (!json.error) {
          
          // 1. Deduplicate countries by name (fixes the "Congo" duplicate key error)
          const uniqueCountries = Array.from(
            new Map(json.data.map((c: CountryData) => [c.name, c])).values()
          ) as CountryData[]

          // 2. Sort countries alphabetically
          const sortedCountries = uniqueCountries.sort((a, b) => 
            a.name.localeCompare(b.name)
          )
          
          setLocations(sortedCountries)
        }
      } catch (err) {
        console.error("Failed to fetch locations from API", err)
      } finally {
        setLoadingLocations(false)
      }
    }
    fetchLocations()
  }, [])

  const availableStates = formData.country 
    ? locations.find(c => c.name === formData.country)?.states || [] 
    : []

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const fullName = `${formData.firstName} ${formData.lastName}`.trim()

    const res = await registerUser({
      name: fullName,
      email: formData.email,
      company: formData.company,
      country: formData.country,
      state: formData.state,
      gst_number: formData.gstNumber,
      pan_number: formData.panNumber,
      password: formData.password,
    })

    if (!res.success) {
      setLoading(false)
      setError(res.error || 'Failed to create account')
    } else {
      setSuccess('Account created! Redirecting to login...')
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
        className="w-full max-w-xl bg-white p-10 shadow-2xl border border-gray-200"
      >
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#1E1B4B] mb-2 tracking-tight">
            Create your account
          </h2>
          <p className="text-gray-500 text-sm">
            Get started with a 14-day free trial. No credit card required.
          </p>
        </div>

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">First Name *</label>
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
              <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Last Name *</label>
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
            <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Work Email *</label>
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
            <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Company Name *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              disabled={loading}
              placeholder="Engineering Solutions Ltd."
              className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Country *</label>
              <select
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value, state: '' })}
                disabled={loading || loadingLocations}
                className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] transition-colors disabled:opacity-50"
              >
                <option value="" disabled>
                  {loadingLocations ? 'Loading countries...' : 'Select Country'}
                </option>
                {/* 3. Render options with index appended to key to guarantee uniqueness */}
                {locations.map((c, idx) => (
                  <option key={`${c.name}-${idx}`} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">State *</label>
              <select
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                disabled={loading || !formData.country || loadingLocations}
                className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] transition-colors disabled:opacity-50"
              >
                <option value="" disabled>
                  {!formData.country ? 'Select a country first' : 'Select State'}
                </option>
                {/* 4. Render states with index appended to key to guarantee uniqueness */}
                {availableStates.map((s, idx) => (
                  <option key={`${s.name}-${idx}`} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">GST Number *</label>
              <input
                type="text"
                required
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })}
                disabled={loading}
                placeholder="22AAAAA0000A1Z5"
                className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">PAN Number *</label>
              <input
                type="text"
                required
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                disabled={loading}
                placeholder="ABCDE1234F"
                className="w-full border border-gray-300 px-4 py-3 text-sm bg-[#F7F8FA] focus:bg-white focus:outline-none focus:border-[#5648FC] focus:ring-1 focus:ring-[#5648FC] transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">Password *</label>
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