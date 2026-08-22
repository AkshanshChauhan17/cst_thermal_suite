// app/dashboard/network/page.tsx
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import NetworkClient from './NetworkClient'

// BUGS FIX: Yahan wahi lambi wali key daalni hai jo login mein use ki thi!
const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

export default async function NetworkPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) redirect('/login')

  let session;
  try {
    // 1. Auth check
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    session = payload
  } catch {
    redirect('/login')
  }

  try {
    // 2. Database Queries
    const [userRows]: any = await db.query('SELECT token_balance FROM users WHERE id = ?', [session.id])
    const balance = userRows[0]?.token_balance || 0

    // Yeh RECURSIVE query hierarchical network banati hai
    const [networkRows]: any = await db.query(`
      WITH RECURSIVE NetworkTree AS (
        SELECT id, name, email, manager_id, 1 as level
        FROM users WHERE manager_id = ?
        UNION ALL
        SELECT u.id, u.name, u.email, u.manager_id, nt.level + 1
        FROM users u
        INNER JOIN NetworkTree nt ON u.manager_id = nt.id
      )
      SELECT * FROM NetworkTree;
    `, [session.id])

    let transferRows: any[] = []
    
    if (networkRows.length > 0) {
      const networkIds = networkRows.map((n: any) => n.id)
      networkIds.push(session.id) 
      
      const placeholders = networkIds.map(() => '?').join(',')
      const [rows]: any = await db.query(`
        SELECT l.amount, l.reason, l.created_at, u.email as actor_email, u.name as actor_name
        FROM token_ledger l
        JOIN users u ON l.user_id = u.id
        WHERE l.user_id IN (${placeholders}) 
        AND (l.reason LIKE 'TRANSFER_OUT%' OR l.reason LIKE 'TRANSFER_IN%')
        ORDER BY l.created_at DESC
      `, networkIds)
      transferRows = rows
    }

    return (
      <NetworkClient 
        userEmail={session.email as string} 
        balance={balance} 
        network={networkRows}
        transfers={transferRows} 
      />
    )

  } catch (error: any) {
    console.error("DATABASE ERROR:", error)
    
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-xl border border-red-200 shadow-lg max-w-2xl w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Database Connection Error</h1>
          <p className="text-gray-700 mb-4">
            Bhai, MySQL mein error aa raha hai. Lagta hai tumne <strong>ALTER TABLE</strong> command run nahi ki hai!
          </p>
          <div className="bg-gray-900 text-red-400 p-4 rounded text-sm font-mono overflow-auto">
            {error.message || String(error)}
          </div>
        </div>
      </div>
    )
  }
}