export const dynamic = 'force-dynamic';
// app/login/page.tsx
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import LoginForm from './LoginForm'

export default function LoginSection() {
  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row bg-white">
      
      {/* Left Side - Welcome Back & Status (Server Rendered) */}
      <div className="w-full lg:w-5/12 bg-[#1E1B4B] p-8 md:p-16 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[20%] -left-[20%] w-[80%] h-[80%] bg-[#5648FC] rounded-full blur-[150px] opacity-20"></div>
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16 inline-flex">
            {/* Logo */}
            <div className="text-white font-bold text-2xl tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-[#5648FC] rounded-md flex items-center justify-center">
                <span className="text-white text-lg leading-none">T</span>
              </div>
              Thermal Suite
            </div>
          </Link>

          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Welcome back to your workspace.
            </h1>
            <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
              Log in to continue optimizing your thermal operations, managing
              component configurations, and accessing your engineering reports.
            </p>
          </div>
        </div>

        {/* System Status Indicator */}
        <div className="relative z-10 mt-20 pt-8 border-t border-gray-700/50">
          <div className="bg-[#110f2a] border border-gray-700 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                System Status
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#86EFAC] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#86EFAC]"></span>
                </span>
                <span className="text-xs font-bold text-[#86EFAC] uppercase tracking-wider">
                  Operational
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-[#86EFAC]" />
                <span className="text-sm text-gray-300">Calculation Engine</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-[#86EFAC]" />
                <span className="text-sm text-gray-300">Token Ledgers</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-[#86EFAC]" />
                <span className="text-sm text-gray-300">API Gateway</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Interactive Login Form Component */}
      <LoginForm />
      
    </section>
  )
}