// app/admin/network/AdminNetworkClient.tsx
'use client'

import { useState, useMemo } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { Network, Search, Filter, Shield, Users as UsersIcon, ChevronDown, Zap, CornerDownRight, User } from 'lucide-react'

// Define the basic User type
type User = {
  id: string
  name: string
  email: string
  role: string
  token_balance: number
  manager_id: string | null
}

// Define the Tree Node type (User + their children)
type UserNode = User & {
  children: UserNode[]
}

// --- RECURSIVE TREE COMPONENT ---
// Ye component apne aap ko call karta hai jab tak chain khatam nahi hoti
const TreeNode = ({ node, level = 0 }: { node: UserNode, level?: number }) => {
  const hasChildren = node.children.length > 0;

  return (
    <div className="relative">
      {/* Node Card */}
      <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md ${
        level === 0 ? 'bg-white border-gray-300 shadow-sm' : 'bg-gray-50/80 border-gray-200'
      }`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${
          node.role === 'ADMIN' ? 'bg-[#1E1B4B] text-red-400' : 'bg-white border border-gray-200 text-gray-600'
        }`}>
          {node.role === 'ADMIN' ? <Shield size={18} /> : <User size={18} />}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-bold ${level === 0 ? 'text-[#1E1B4B] text-lg' : 'text-gray-800 text-base'}`}>
              {node.name}
            </h3>
            {level === 0 && node.role !== 'ADMIN' && (
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-blue-100">Root Client</span>
            )}
            {node.role === 'ADMIN' && (
              <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-red-100">Admin</span>
            )}
          </div>
          <p className="text-sm text-gray-500">{node.email}</p>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-bold font-mono text-[#5648FC]">
            <Zap size={14} /> {node.token_balance}
          </span>
        </div>
      </div>

      {/* Render Children (Recursive part) */}
      {hasChildren && (
        <div className="relative mt-2 ml-4 md:ml-8">
          {/* Vertical connecting line */}
          <div className="absolute left-0 top-0 bottom-6 w-px bg-gray-300"></div>
          
          <div className="flex flex-col gap-3 pl-6 py-2">
            {node.children.map((child, index) => (
              <div key={child.id} className="relative">
                {/* Horizontal connector hook */}
                <div className="absolute -left-6 top-6 w-6 border-t border-gray-300"></div>
                <TreeNode node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


// --- MAIN CLIENT COMPONENT ---
export default function AdminNetworkClient({ users }: { users: User[] }) {
  const [searchEmail, setSearchEmail] = useState('')
  const [selectedManagerId, setSelectedManagerId] = useState<string>('ALL')

  // List of users who are managers (for the dropdown)
  const managers = useMemo(() => {
    const managerIds = new Set(users.map(u => u.manager_id).filter(Boolean))
    return users.filter(u => managerIds.has(u.id))
  }, [users])

  // 1. Build the full raw Tree
  const fullTree = useMemo(() => {
    const userMap = new Map<string, UserNode>()
    
    // Initialize nodes
    users.forEach(u => userMap.set(u.id, { ...u, children: [] }))
    
    const roots: UserNode[] = []
    
    // Connect children to parents
    userMap.forEach(node => {
      if (node.manager_id && userMap.has(node.manager_id)) {
        userMap.get(node.manager_id)!.children.push(node)
      } else {
        roots.push(node) // If no manager, they are a Root node
      }
    })
    
    return roots
  }, [users])

  // 2. Apply Filters (Smart Recursive Filter)
  const displayedTree = useMemo(() => {
    let currentRoots = fullTree;

    // Filter A: Manager Dropdown
    if (selectedManagerId !== 'ALL') {
      // Find the specific manager node anywhere in the tree and make it the ONLY root
      const findNode = (nodes: UserNode[], targetId: string): UserNode | null => {
        for (const node of nodes) {
          if (node.id === targetId) return node;
          const found = findNode(node.children, targetId);
          if (found) return found;
        }
        return null;
      }
      const specificRoot = findNode(fullTree, selectedManagerId);
      currentRoots = specificRoot ? [specificRoot] : [];
    }

    // Filter B: Email/Name Search
    if (searchEmail.trim() !== '') {
      const searchTerm = searchEmail.toLowerCase();
      
      const recursiveSearch = (nodes: UserNode[]): UserNode[] => {
        return nodes.map(node => {
          const matchSelf = node.name.toLowerCase().includes(searchTerm) || node.email.toLowerCase().includes(searchTerm);
          const filteredChildren = recursiveSearch(node.children);
          
          // Keep node if it matches OR if any of its children match
          if (matchSelf || filteredChildren.length > 0) {
            return { ...node, children: filteredChildren };
          }
          return null;
        }).filter(Boolean) as UserNode[];
      }
      
      currentRoots = recursiveSearch(currentRoots);
    }

    return currentRoots;
  }, [fullTree, searchEmail, selectedManagerId])


  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Super Filters */}
          <header className="mb-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 pb-6 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#1E1B4B] flex items-center gap-3">
                  <Network className="text-red-500" size={28} />
                  Global Network Tree
                </h1>
                <p className="text-gray-500 mt-1">Full hierarchical view of the token ecosystem and user chains.</p>
              </div>
              <div className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md text-xs font-bold uppercase border border-red-100 flex items-center gap-2">
                <Shield size={14} /> Tree Map Active
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Filter 1: Find by Email */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Find by Email or Name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search specific user in the tree..." 
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Filter 2: Filter by Sub-Tree (Manager) */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Isolate Sub-Tree</label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select 
                    value={selectedManagerId}
                    onChange={(e) => setSelectedManagerId(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:bg-white appearance-none cursor-pointer"
                  >
                    <option value="ALL">Show Entire Global Tree</option>
                    {managers.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.email})</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>
          </header>

          {/* Render the Recursive Tree */}
          <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
            {displayedTree.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <Network size={48} className="mx-auto mb-4 opacity-20" />
                <p>No networks found matching your filters.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {displayedTree.map((rootNode) => (
                  <TreeNode key={rootNode.id} node={rootNode} />
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}