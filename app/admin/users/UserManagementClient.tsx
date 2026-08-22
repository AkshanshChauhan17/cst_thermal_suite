// app/admin/users/UserManagementClient.tsx
'use client'

import { useState, useRef } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { adminUpdateTokens } from '@/app/actions/adminUpdateTokens'
import { Users, Search, Shield, ShieldAlert, Loader2, Zap, AlertCircle, CheckCircle2 } from 'lucide-react'

type User = {
  id: string
  name: string
  email: string
  role: string
  token_balance: number
  created_at: string
}

export default function UserManagementClient({ users }: { users: User[] }) {
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const formRef = useRef<HTMLFormElement>(null)

  // Filter users based on search
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    })
  }

  async function handleTokenUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    if (!formRef.current) return
    const formData = new FormData(formRef.current)

    const res = await adminUpdateTokens(formData)

    if (res.success) {
      formRef.current.reset()
      setFeedback({ type: 'success', text: res.message || 'Updated successfully' })
      // Auto-close modal on success after a short delay
      setTimeout(() => {
        setSelectedUser(null)
        setFeedback(null)
      }, 2000)
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to update' })
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto relative">
          
          <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1E1B4B] flex items-center gap-3">
                <Users className="text-red-500" size={28} />
                User Management
              </h1>
              <p className="text-gray-500 mt-1">View registered clients and manage their compute allocations.</p>
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-500"
              />
            </div>
          </header>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User Details</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                        No users found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-[#1E1B4B] text-sm">{user.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{user.email}</div>
                          <div className="text-[10px] text-gray-400 font-mono mt-1">ID: {user.id.split('-')[0]}</div>
                        </td>
                        <td className="px-6 py-4">
                          {user.role === 'ADMIN' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 border border-red-100 rounded-md text-xs font-bold">
                              <ShieldAlert size={12} /> Root Admin
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 border border-gray-200 rounded-md text-xs font-bold">
                              <Shield size={12} /> Client
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-bold font-mono text-sm ${user.token_balance > 0 ? 'text-[#5648FC]' : 'text-gray-400'}`}>
                            {user.token_balance} TKN
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(user.created_at)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => setSelectedUser(user)}
                            className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {/* Floating Action Modal for Token Management */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-[#1E1B4B]">Manage User Tokens</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedUser.name} ({selectedUser.email})</p>
              </div>
              <div className="bg-indigo-50 text-[#5648FC] px-3 py-1.5 rounded-lg font-bold font-mono text-sm border border-indigo-100 flex items-center gap-2">
                <Zap size={14} /> {selectedUser.token_balance}
              </div>
            </div>
            
            <div className="p-6 bg-gray-50/50">
              {feedback && (
                <div className={`mb-4 p-3 rounded-lg flex items-start gap-2 text-sm font-bold ${
                  feedback.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {feedback.text}
                </div>
              )}

              <form ref={formRef} onSubmit={handleTokenUpdate} className="flex flex-col gap-4">
                <input type="hidden" name="userId" value={selectedUser.id} />
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Adjustment Amount</label>
                  <p className="text-xs text-gray-400 mb-2">Use a positive number to add tokens, or a negative number (e.g., -50) to deduct them.</p>
                  <input 
                    type="number" 
                    name="amount" 
                    required 
                    disabled={loading}
                    placeholder="e.g. 100 or -50"
                    className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button 
                    type="button" 
                    onClick={() => { setSelectedUser(null); setFeedback(null) }}
                    disabled={loading}
                    className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors flex justify-center items-center gap-2"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                    Confirm Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}