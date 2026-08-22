// app/admin/contacts/AdminContactsClient.tsx
'use client'

import { useState, useMemo } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { toggleContactStatus, deleteContact } from '@/app/actions/contactActions'
import { Mail, Trash2, CheckCircle, Clock, Search, Filter, Inbox } from 'lucide-react'

type Contact = {
  id: string
  full_name: string
  email: string
  message: string
  status: string
  department: string | null
  created_at: string
}

export default function AdminContactsClient({ initialContacts }: { initialContacts: Contact[] }) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(initialContacts.length > 0 ? initialContacts[0] : null)
  
  // Advanced Filter & Search States
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All') // All, Unread, Read
  const [deptFilter, setDeptFilter] = useState('All')

  // Extract unique departments dynamically for the filter dropdown
  const departments = useMemo(() => {
    const depts = new Set(initialContacts.map(c => c.department).filter(Boolean))
    return ['All', ...Array.from(depts)]
  }, [initialContacts])

  // Filter and search logic
  const filteredContacts = useMemo(() => {
    return initialContacts.filter(c => {
      const matchesSearch = 
        c.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.message?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'All' || c.status === statusFilter
      const matchesDept = deptFilter === 'All' || c.department === deptFilter

      return matchesSearch && matchesStatus && matchesDept
    })
  }, [initialContacts, searchQuery, statusFilter, deptFilter])

  async function handleToggle(id: string, status: string) {
    await toggleContactStatus(id, status)
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteContact(id)
      if (selectedContact?.id === id) {
        const remaining = filteredContacts.filter(c => c.id !== id)
        setSelectedContact(remaining.length > 0 ? remaining[0] : null)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <header className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-[#1E1B4B] flex items-center gap-3">
            <Mail className="text-red-500" size={28} /> Client Inquiries Hub
          </h1>
          <p className="text-gray-500 mt-1">Advanced filtering and management for incoming support and enterprise leads.</p>
        </header>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or message..." 
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5648FC]"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
            
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600">
              <Filter size={14} className="text-[#5648FC]" />
              <span>Status:</span>
              <select 
                value={statusFilter} 
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-medium text-[#1E1B4B]"
              >
                <option value="All">All Status</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
              </select>
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600">
              <span>Dept:</span>
              <select 
                value={deptFilter} 
                onChange={e => setDeptFilter(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-medium text-[#1E1B4B] max-w-[150px] truncate"
              >
                {departments.map((dept, i) => (
                  <option key={i} value={dept ?? ''}>{dept}</option>
                ))}
              </select>
            </div>

            <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
              {filteredContacts.length} results
            </span>
          </div>
        </div>

        {/* MAIN SPLIT VIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Inbox List */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[70vh]">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-xs uppercase text-gray-500 flex justify-between items-center">
              <span>Inbox Messages</span>
              <span className="text-[10px] bg-indigo-100 text-[#5648FC] px-2 py-0.5 rounded font-bold">
                {filteredContacts.length} shown
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {filteredContacts.length === 0 ? (
                <div className="p-12 text-center text-gray-400 text-sm flex flex-col items-center justify-center h-full">
                  <Inbox size={36} className="mb-2 opacity-20" />
                  <p>No inquiries match your filter criteria.</p>
                </div>
              ) : (
                filteredContacts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedContact(c)}
                    className={`w-full text-left p-4 transition-colors flex flex-col gap-1 ${
                      selectedContact?.id === c.id ? 'bg-indigo-50/60 border-l-4 border-[#5648FC]' : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className={`font-bold text-sm truncate max-w-[180px] ${c.status === 'Unread' ? 'text-[#1E1B4B]' : 'text-gray-500'}`}>
                        {c.full_name}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold shrink-0 ${
                        c.status === 'Unread' ? 'bg-red-100 text-red-600' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <span className="text-xs text-[#5648FC] font-semibold truncate">{c.department}</span>
                    <span className="text-xs text-gray-400 truncate">{c.message}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right Details Pane */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 flex flex-col justify-between h-[70vh]">
            {selectedContact ? (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 mb-6 gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-[#5648FC] uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded">
                        {selectedContact.department}
                      </span>
                      <h2 className="text-2xl font-bold text-[#1E1B4B] mt-2">{selectedContact.full_name}</h2>
                      <a href={`mailto:${selectedContact.email}`} className="text-sm text-gray-500 font-mono mt-0.5 hover:text-[#5648FC] transition-colors inline-block">
                        {selectedContact.email}
                      </a>
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1 font-mono shrink-0">
                      <Clock size={14} /> {new Date(selectedContact.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-[#F7F8FA] p-6 rounded-lg border border-gray-200/60 text-gray-700 text-sm leading-relaxed mb-6 whitespace-pre-wrap overflow-y-auto max-h-[35vh]">
                    {selectedContact.message}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 shrink-0">
                  <button
                    onClick={() => handleToggle(selectedContact.id, selectedContact.status)}
                    className="px-4 py-2 text-xs font-bold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1.5 text-gray-700 shadow-sm"
                  >
                    <CheckCircle size={14} className="text-emerald-500" />
                    Mark as {selectedContact.status === 'Unread' ? 'Read' : 'Unread'}
                  </button>

                  <button
                    onClick={() => handleDelete(selectedContact.id)}
                    className="px-4 py-2 text-xs font-bold rounded-lg border border-red-100 bg-white text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Trash2 size={14} /> Delete Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Mail size={48} className="mb-2 opacity-20" />
                <p className="text-sm">Select an inquiry from the inbox to read full details.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}