// app/calculators/[slug]/CalculatorRunner.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { deductMinuteToken } from '@/app/actions/billing'
import { ArrowLeft, Cpu, Zap, AlertTriangle, ShieldCheck, Clock, PlusCircle, Info, ChevronUp, ChevronDown, Loader2 } from 'lucide-react'
import Link from 'next/link'

type CalculatorProp = { id: string; name: string; description: string; api_url: string; price: number }

export default function CalculatorRunner({ calculator, initialBalance }: { calculator: CalculatorProp, initialBalance: number }) {
  const [balance, setBalance] = useState(initialBalance)
  const [isRunning, setIsRunning] = useState(initialBalance >= calculator.price)
  const [showLowTokenPopup, setShowLowTokenPopup] = useState(false)
  const [elapsedMinutes, setElapsedMinutes] = useState(0)
  
  const [userConsented, setUserConsented] = useState(false)
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false)
  const [isIframeLoading, setIsIframeLoading] = useState(true)

  const [sessionId, setSessionId] = useState<string>('')
  const hasStarted = useRef(false)

  // Heartbeat Timer & Billing Logic
  useEffect(() => {
    if (!sessionId || !isRunning || !userConsented) return

    let interval: NodeJS.Timeout

    const processBillingTick = async () => {
      const res = await deductMinuteToken(calculator.price, calculator.id, sessionId)

      if (res.success && res.newBalance !== undefined) {
        setBalance(res.newBalance)
        setElapsedMinutes(prev => prev + 1)

        if (res.newBalance < 5) setShowLowTokenPopup(true)
        
        if (res.newBalance < calculator.price) {
          setIsRunning(false)
          setShowLowTokenPopup(true)
        }
      } else {
        setIsRunning(false)
        setShowLowTokenPopup(true)
      }
    }

    if (isRunning) {
      if (!hasStarted.current) {
        hasStarted.current = true
        processBillingTick() 
      }
      interval = setInterval(processBillingTick, 60000)
    }

    return () => clearInterval(interval)
  }, [isRunning, calculator.price, calculator.id, sessionId, userConsented])

  return (
    <div className="flex flex-col h-screen w-full relative overflow-hidden bg-[#F7F8FA]">
      
      {/* 1. TOP INFORMATION BAR */}
      <motion.header 
        initial={false}
        animate={{ height: isHeaderCollapsed ? 0 : 'auto', padding: isHeaderCollapsed ? 0 : '10px 20px', gap: isHeaderCollapsed ? 0 : 'auto', opacity: isHeaderCollapsed ? 0 : 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-[#1E1B4B] border-b border-gray-800 text-white px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 z-20 shadow-lg overflow-hidden"
      >
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-gray-300" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <Cpu size={20} className="text-[#5648FC]" /> {calculator.name}
              </h1>
              {!userConsented ? (
                <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/50 text-amber-400 text-[10px] font-bold uppercase rounded">
                  Awaiting Consent
                </span>
              ) : isRunning ? (
                <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold uppercase rounded animate-pulse">
                  Connected & Running
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/50 text-red-400 text-[10px] font-bold uppercase rounded">
                  System Halted
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1 line-clamp-1 max-w-xl">{calculator.description}</p>
          </div>
        </div>

        {/* Live Token Status Panel */}
        <div className="flex items-center gap-4 bg-[#110f2a] border border-gray-700/50 rounded-lg p-2.5 px-4 shadow-inner">
          <div className="flex flex-col items-end pr-4 border-r border-gray-700">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Time Elapsed</span>
            <span className="text-sm font-mono text-gray-300 flex items-center gap-1"><Clock size={12}/> {elapsedMinutes} mins</span>
          </div>
          <div className="flex flex-col items-end pr-4 border-r border-gray-700">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Burn Rate</span>
            <span className="text-sm font-mono text-red-400">-{calculator.price} TKN / min</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Remaining Balance</span>
            <span className={`text-xl font-mono font-bold flex items-center gap-1.5 ${balance < 5 ? 'text-red-500 animate-pulse' : 'text-[#86EFAC]'}`}>
              <Zap size={18} className={balance < 5 ? 'text-red-500' : 'text-amber-400'} /> 
              {balance} <span className="text-sm">TKN</span>
            </span>
          </div>
        </div>
      </motion.header>

      {/* Floating Toggle Button (Fixed Position) */}
      <button 
        onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
        className="absolute top-4 right-6 z-30 bg-[#1E1B4B] hover:bg-[#5648FC] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 transition-colors border border-gray-700"
        title="Slide up / expand navigation"
      >
        {isHeaderCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        {isHeaderCollapsed ? "Expand Nav" : "Slide Up Nav"}
      </button>

      {/* 2. SECURE IFRAME EMBED */}
      <main className="flex-1 w-full bg-[#F7F8FA] relative overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5648FC] via-[#86EFAC] to-[#5648FC] opacity-50 z-10"></div>
        
        {/* Secure Token Badge (Fixed Position in Center) */}
        <div className="absolute top-2 right-1/10 -translate-x-1/2 bg-white border border-gray-200 shadow-sm px-4 py-1.5 rounded-full text-[10px] font-bold text-gray-500 flex items-center gap-1.5 z-10">
          <ShieldCheck size={14} className="text-emerald-500" /> 
          Secure Token Tunnel Active {sessionId && `(Session: ${sessionId})`}
        </div>

        {isRunning && sessionId && userConsented ? (
          <div className="relative w-full h-full flex-1">
            
            {/* SKELETON LOADER ANIMATION */}
            {isIframeLoading && (
              <div className="absolute inset-0 z-10 bg-white flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-4xl space-y-4 animate-pulse">
                  <div className="flex justify-between items-center mb-8">
                    <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
                    <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="h-28 bg-gray-100 rounded-xl"></div>
                    <div className="h-28 bg-gray-100 rounded-xl"></div>
                    <div className="h-28 bg-gray-100 rounded-xl"></div>
                  </div>
                  <div className="h-64 bg-gray-100 rounded-xl mt-6 flex flex-col items-center justify-center gap-3">
                    <Loader2 size={36} className="text-[#5648FC] animate-spin" />
                    <p className="text-sm font-semibold text-gray-400">Establishing Secure Connection to Module...</p>
                  </div>
                </div>
              </div>
            )}

            <iframe 
              src={`/api/proxy/${calculator.id}`} 
              title={calculator.name}
              onLoad={() => setIsIframeLoading(false)}
              onError={() => setIsIframeLoading(false)} // Fail hone par loader hata dega
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals allow-popups-to-escape-sandbox"
              allow="clipboard-read; clipboard-write; display-capture; fullscreen"
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <Cpu size={64} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-500">
              {!userConsented ? "Awaiting User Consent" : "Module Execution Halted"}
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              {!userConsented 
                ? "Please accept the billing terms to establish a secure connection." 
                : "Insufficient tokens to establish or maintain a secure connection."}
            </p>
          </div>
        )}
      </main>

      {/* 3. PRE-PAID CONSENT POPUP */}
      <AnimatePresence>
        {!userConsented && initialBalance >= calculator.price && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-indigo-100"
            >
              <div className="bg-indigo-50 p-6 flex flex-col items-center border-b border-indigo-100">
                <div className="w-16 h-16 bg-indigo-100 text-[#5648FC] rounded-full flex items-center justify-center mb-4">
                  <Info size={32} />
                </div>
                <h2 className="text-2xl font-bold text-[#1E1B4B] text-center tracking-tight">Pre-Paid Module Agreement</h2>
              </div>
              
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-6 text-sm text-gray-600 leading-relaxed text-center">
                  This calculator operates on a <strong>Pay-Per-Minute</strong> model. <br/><br/>
                  By starting, <strong className="text-red-500">{calculator.price} tokens</strong> will be deducted immediately for the first minute of computation. 
                  Billing continues automatically every 60 seconds.
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      setSessionId(Math.random().toString(36).substring(2, 8).toUpperCase())
                      setUserConsented(true)
                    }}
                    className="w-full bg-[#1E1B4B] hover:bg-[#5648FC] text-white px-4 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg"
                  >
                    I Agree, Start Module & Deduct Tokens
                  </button>
                  <Link 
                    href="/dashboard"
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center"
                  >
                    Cancel & Go Back
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. LOW TOKEN POPUP MODAL */}
      <AnimatePresence>
        {(showLowTokenPopup || (initialBalance < calculator.price && !userConsented)) && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-red-100"
            >
              <div className="bg-red-50 p-6 flex flex-col items-center border-b border-red-100">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle size={32} />
                </div>
                <h2 className="text-2xl font-bold text-red-600 text-center tracking-tight">Warning: Running Out of Tokens!</h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  Your current balance is critically low (<strong className="text-red-600">{balance} TKN</strong>). 
                  {balance < calculator.price 
                    ? " You do not have enough tokens to start or continue this module."
                    : " The module will shut down automatically in less than a minute."}
                </p>

                <div className="flex flex-col gap-3">
                  <Link 
                    href="/dashboard/billing" 
                    className="w-full bg-[#1E1B4B] hover:bg-[#5648FC] text-white px-4 py-3.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <PlusCircle size={18} /> Recharge Tokens Now
                  </Link>
                  
                  {balance >= calculator.price && userConsented ? (
                    <button 
                      onClick={() => setShowLowTokenPopup(false)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-3 rounded-xl font-bold text-sm transition-colors"
                    >
                      I Understand, Continue Running
                    </button>
                  ) : (
                    <Link 
                      href="/dashboard"
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center"
                    >
                      Exit Module
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}