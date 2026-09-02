// app/admin/components/AdminSidebar.tsx
'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { logout } from '@/app/actions/logout'
// Naya icon FileText import kiya hai
import { Server, Users, Cpu, LogOut, ShieldAlert, Network, FileText, Mail } from 'lucide-react'

export default function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    await logout()
    router.push('/admin/login')
  }

  // Yahan 'Blog Management' add kiya hai
  const adminLinks = [
    { name: 'Command Center', href: '/admin/dashboard', icon: Server, activeColor: 'text-red-400' },
    { name: 'Python Server', href: '/admin/python', icon: Cpu, activeColor: 'text-red-400' },
    { name: 'User Management', href: '/admin/users', icon: Users, activeColor: 'text-red-400' },
    { name: 'Global Network', href: '/admin/network', icon: Network, activeColor: 'text-red-400' },
    { name: 'Client Inquiries', href: '/admin/contacts', icon: Mail, activeColor: 'text-red-400' },
    { name: 'Blog Management', href: '/admin/blogs', icon: FileText, activeColor: 'text-red-400' },
  ]

  return (
    <aside className="w-64 bg-[#1E1B4B] text-white flex flex-col hidden md:flex fixed h-full z-20">
      <div className="p-6 border-b border-white/10">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center shadow-lg">
            <ShieldAlert size={18} className="text-white" />
          </div>
          System Root
        </div>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${isActive
                  ? 'bg-white/10 text-white shadow-sm'
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

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left text-sm font-medium"
        >
          <LogOut size={18} />
          {isLoggingOut ? 'Terminating...' : 'Terminate Session'}
        </button>
      </div>
    </aside>
  )
}