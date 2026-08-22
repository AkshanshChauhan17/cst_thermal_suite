// app/register/page.tsx
import Link from 'next/link'
import { Check } from 'lucide-react'
import RegisterForm from './RegisterForm'

export default function GetStartedSection() {
  const benefits = [
    'Zero-latency computational architecture',
    'Access to Coil Selection & Product Selectors',
    'Transparent token-based usage tracking',
    'Enterprise-grade engineering reports export',
    'Centralized team and project management',
  ]

  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row bg-white">
      
      {/* Left Side - Value Proposition (Server Rendered) */}
      <div className="w-full lg:w-5/12 bg-[#1E1B4B] p-8 md:p-16 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[#5648FC] rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute bottom-[10%] -right-[20%] w-[60%] h-[60%] bg-[#86EFAC] rounded-full blur-[120px] opacity-10"></div>
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
              Start optimizing your thermal operations.
            </h1>
            <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
              Join 2,500+ engineering teams across India building the future of
              industrial HVAC and refrigeration.
            </p>

            <ul className="flex flex-col gap-5">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#5648FC]/20 border border-[#5648FC]/50 flex items-center justify-center mt-0.5">
                    <Check size={14} className="text-[#86EFAC] font-bold" />
                  </div>
                  <span className="text-gray-300 text-[15px] leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 mt-20 pt-10 border-t border-gray-700">
          <p className="text-gray-400 text-sm italic mb-4">
            "Thermal Suite reduced our coil selection calculation time by 80%.
            The token system is incredibly transparent."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-600 border border-gray-500 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold text-gray-300">
              {/* Fallback avatar block */}
              VS
            </div>
            <div>
              <p className="text-white text-sm font-bold">Vikram Sharma</p>
              <p className="text-gray-500 text-xs">
                Lead Engineer, Tata Heavy Eng
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Interactive Registration Form Component */}
      <RegisterForm />
      
    </section>
  )
}