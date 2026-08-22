// app/dashboard/network/NetworkClient.tsx
'use client'

import { useState, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import { shareTokens } from '@/app/actions/shareTokens'
import { addColleague } from '@/app/actions/addColleague'
import { clientRemoveColleague } from '@/app/actions/clientRemoveColleague'
import { Share2, Users, Loader2, UserPlus, AlertCircle, CheckCircle2, Unlink } from 'lucide-react'

type NetworkMember = {
  id: string
  name: string
  email: string
  level: number
}

type Transfer = {
  reason: string
  actor_name: string
  actor_email: string
  amount: number
  created_at: string | Date
}

export default function NetworkClient({ 
  userEmail, balance, network, transfers 
}: { 
  userEmail: string, balance: number, network: NetworkMember[], transfers: Transfer[] 
}) {
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  // Unlink Modal State
  const [userToUnlink, setUserToUnlink] = useState<NetworkMember | null>(null)
  const [unlinkLoading, setUnlinkLoading] = useState(false)
  
  const addFormRef = useRef<HTMLFormElement>(null)
  const transferFormRef = useRef<HTMLFormElement>(null)

  const parsedTransfers = transfers
    .filter(t => t.reason.startsWith('TRANSFER_OUT'))
    .map(t => ({
      sender: t.actor_name, senderEmail: t.actor_email, recipientEmail: t.reason.replace('TRANSFER_OUT TO ', ''),
      amount: Math.abs(t.amount), date: new Date(t.created_at).toLocaleDateString()
    }))

  async function handleAddColleague(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)
    if (!addFormRef.current) return
    const formData = new FormData(addFormRef.current)
    const res = await addColleague(formData)
    
    if (res.success) {
      addFormRef.current.reset()
      setFeedback({ type: 'success', text: res.message || 'Colleague linked' })
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to add' })
    }
    setLoading(false)
    setTimeout(() => setFeedback(null), 5000)
  }

  async function handleTransfer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)
    if (!transferFormRef.current) return
    const formData = new FormData(transferFormRef.current)
    const res = await shareTokens(formData)
    
    if (res.success) {
      transferFormRef.current.reset()
      setFeedback({ type: 'success', text: res.message || 'Transfer successful' })
    } else {
      setFeedback({ type: 'error', text: res.error || 'Transfer failed' })
    }
    setLoading(false)
    setTimeout(() => setFeedback(null), 5000)
  }

  // --- NAYA FUNCTION: UNLINK ---
  async function confirmUnlink() {
    if (!userToUnlink) return
    setUnlinkLoading(true)
    setFeedback(null)

    const res = await clientRemoveColleague(userToUnlink.id)
    if (res.success) {
      setFeedback({ type: 'success', text: res.message || 'User removed successfully' })
      setUserToUnlink(null) // Modal close
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to remove user' })
    }
    
    setUnlinkLoading(false)
    setTimeout(() => setFeedback(null), 5000)
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto relative">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1E1B4B] tracking-tight flex items-center gap-3">
              <Share2 className="text-[#5648FC]" size={28} /> Token Network
            </h1>
            <p className="text-gray-500 mt-1">Manage your team and track token transfers across your network.</p>
          </div>

          {feedback && !userToUnlink && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 text-sm font-bold ${
              feedback.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'
            }`}>
              {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              {feedback.text}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 flex flex-col gap-8">
              {/* Add Colleague Form */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-lg font-bold text-[#1E1B4B] mb-1 flex items-center gap-2">
                  <UserPlus size={18} className="text-[#5648FC]" /> Link Colleague
                </h2>
                <p className="text-xs text-gray-500 mb-4">Add an existing registered client to your network.</p>
                <form ref={addFormRef} onSubmit={handleAddColleague} className="flex flex-col gap-4">
                  <input type="email" name="email" required disabled={loading} placeholder="Colleague's Registered Email" className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#5648FC]" />
                  <button type="submit" disabled={loading} className="w-full bg-[#1E1B4B] hover:bg-[#5648FC] text-white px-4 py-3 rounded-lg text-sm font-bold transition-colors flex justify-center items-center gap-2 disabled:opacity-50">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : null} Add to Network
                  </button>
                </form>
              </div>

              {/* Send Tokens Form */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-lg font-bold text-[#1E1B4B] mb-4 flex items-center gap-2">
                  <Share2 size={18} className="text-[#5648FC]" /> Send Tokens
                </h2>
                <div className="mb-4 p-3 bg-indigo-50 rounded-lg text-sm font-bold text-[#5648FC] flex justify-between">
                  <span>Available Balance:</span><span>{balance} TKN</span>
                </div>
                <form ref={transferFormRef} onSubmit={handleTransfer} className="flex flex-col gap-4">
                  <select name="recipientId" required disabled={loading || network.length === 0} className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm bg-white focus:outline-none focus:border-[#5648FC]">
                    <option value="">Select Colleague...</option>
                    {network.map(n => <option key={n.id} value={n.id}>{n.name} (Lvl {n.level})</option>)}
                  </select>
                  <input type="number" name="amount" required min="1" max={balance > 0 ? balance : 1} disabled={loading} placeholder="Amount" className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#5648FC]" />
                  <button type="submit" disabled={loading || network.length === 0 || balance < 1} className="w-full bg-[#5648FC] hover:bg-[#4336d6] text-white px-4 py-3 rounded-lg text-sm font-bold transition-colors flex justify-center items-center gap-2 disabled:opacity-50">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : null} Transfer Tokens
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Downstream Network View */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Downstream Network</h2>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                  {network.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center mt-12">No colleagues in your network yet.</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {network.map(n => (
                        <div key={n.id} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-indigo-200 transition-colors group" style={{ marginLeft: `${(n.level - 1) * 32}px` }}>
                          
                          {/* Left Line Visualizer */}
                          {n.level > 1 && <div className="absolute -ml-6 w-4 border-t-2 border-gray-200"></div>}
                          
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${n.level === 1 ? 'bg-indigo-50 text-[#5648FC]' : 'bg-gray-50 text-gray-500'}`}>
                            <Users size={18} />
                          </div>
                          
                          <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold text-[#1E1B4B] truncate flex items-center gap-2">
                              {n.name}
                              <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 border border-gray-200 rounded uppercase">
                                Level {n.level}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 truncate">{n.email}</p>
                          </div>
                          
                          {/* UNLINK BUTTON (Only for Direct Level 1 connections) */}
                          {n.level === 1 && (
                            <button 
                              onClick={() => setUserToUnlink(n)}
                              title="Unlink Colleague"
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors border border-transparent hover:border-red-100"
                            >
                              <Unlink size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Transactions Ledger View */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-64">
                 <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Network Transactions</h2>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                  {parsedTransfers.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center mt-4">No token transfers found.</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {parsedTransfers.map((t, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="text-sm font-bold text-[#1E1B4B]">{t.sender} <span className="text-gray-400 mx-1">&rarr;</span> {t.recipientEmail}</p>
                            <p className="text-xs text-gray-500">{t.date}</p>
                          </div>
                          <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-md font-bold font-mono text-sm border border-emerald-100">
                            {t.amount} TKN
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* CONFIRMATION MODAL */}
      {userToUnlink && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-[#1E1B4B] flex items-center gap-2">
                <Unlink className="text-red-500" /> Remove Colleague?
              </h3>
            </div>
            
            <div className="p-6 bg-gray-50/50">
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to remove <strong>{userToUnlink.name}</strong> from your network?
              </p>
              <p className="text-xs text-indigo-700 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                <strong>Note:</strong> If {userToUnlink.name} has colleagues in their downline, those colleagues will automatically become your direct Level 1 connections.
              </p>
              
              <div className="flex gap-3 mt-6">
                <button onClick={() => setUserToUnlink(null)} disabled={unlinkLoading} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={confirmUnlink} disabled={unlinkLoading} className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors flex justify-center items-center gap-2">
                  {unlinkLoading ? <Loader2 size={16} className="animate-spin" /> : 'Confirm Removal'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}