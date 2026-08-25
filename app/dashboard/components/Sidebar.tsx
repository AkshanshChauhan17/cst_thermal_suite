// app/dashboard/components/Sidebar.tsx
'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { logout } from '@/app/actions/logout'
import { LayoutDashboard, Zap, History, LogOut, Share2 } from 'lucide-react'

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname() // <-- Current URL check karne ke liye
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    await logout()
    router.push('/login')
  }

  // Navigation Links ka Array
  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, activeColor: 'text-[#86EFAC]' },
    { name: 'Network & Team', href: '/dashboard/network', icon: Share2, activeColor: 'text-[#38bdf8]' },
    { name: 'Ledger History', href: '/dashboard/ledger', icon: History, activeColor: 'text-emerald-400' },
    { name: 'Session History', href: '/dashboard/sessions', icon: Zap, activeColor: 'text-[#5648FC]' },
  ]

  return (
    <aside className="w-64 bg-[#1E1B4B] text-white flex flex-col hidden md:flex fixed h-full z-20">
      <div className="p-6 border-b border-white/10">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-[#5648FC] rounded-md flex items-center justify-center shadow-lg">
            <span className="text-white text-lg leading-none">T</span>
          </div>
          Thermal Suite
        </div>
      </div>

      {/* Dynamic Navigation Menu */}
      <nav className="flex-1 p-4 flex flex-col gap-2">
        {navLinks.map((link) => {
          // Check karo ki kya current URL link ke href se match kar raha hai
          const isActive = pathname === link.href

          return (
            <Link 
              key={link.href}
              href={link.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-white/10 text-white font-medium shadow-sm' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <link.icon 
                size={18} 
                className={`transition-colors ${isActive ? link.activeColor : 'text-gray-400'}`} 
              />
              {link.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
        >
          <LogOut size={18} />
          {isLoggingOut ? 'Logging out...' : 'Log out'}
        </button>
      </div>
    </aside>
  )
}