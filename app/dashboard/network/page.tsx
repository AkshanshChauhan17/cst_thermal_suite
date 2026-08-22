// app/dashboard/network/page.tsx
import { cookies } from 'next/headers'
import { jwtVerify, type JWTPayload } from 'jose'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import NetworkClient from './NetworkClient'

// BUGS FIX: Yahan wahi lambi wali key daalni hai jo login mein use ki thi!
const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

type Session = JWTPayload & {
  id: string | number
  email: string
}

type NetworkRow = {
  id: string | number
  name: string
  email: string
  manager_id: string | number
  level: number
}

type TransferRow = {
  amount: number
  reason: string
  created_at: string | Date
  actor_email: string
  actor_name: string
}

export default async function NetworkPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) redirect('/login')

  let session: Session
  try {
    // 1. Auth check
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    session = payload as Session
  } catch {
    redirect('/login')
  }

  let balance = 0
  let networkRows: NetworkRow[] = []
  let transferRows: TransferRow[] = []
  let databaseError: unknown = null

  try {
    // 2. Database Queries
    const [userRows] = await db.query('SELECT token_balance FROM users WHERE id = ?', [session.id]) as [{ token_balance?: number }[], unknown]
    balance = userRows[0]?.token_balance || 0

    // Yeh RECURSIVE query hierarchical network banati hai
    const [rows] = await db.query(`
      WITH RECURSIVE NetworkTree AS (
        SELECT id, name, email, manager_id, 1 as level
        FROM users WHERE manager_id = ?
        UNION ALL
        SELECT u.id, u.name, u.email, u.manager_id, nt.level + 1
        FROM users u
        INNER JOIN NetworkTree nt ON u.manager_id = nt.id
      )
      SELECT * FROM NetworkTree;
    `, [session.id]) as [NetworkRow[], unknown]
    networkRows = rows

    if (networkRows.length > 0) {
      const networkIds = networkRows.map((n) => n.id)
      networkIds.push(session.id) 
      
      const placeholders = networkIds.map(() => '?').join(',')
      const [rows] = await db.query(`
        SELECT l.amount, l.reason, l.created_at, u.email as actor_email, u.name as actor_name
        FROM token_ledger l
        JOIN users u ON l.user_id = u.id
        WHERE l.user_id IN (${placeholders}) 
        AND (l.reason LIKE 'TRANSFER_OUT%' OR l.reason LIKE 'TRANSFER_IN%')
        ORDER BY l.created_at DESC
      `, networkIds) as [TransferRow[], unknown]
      transferRows = rows
    }

  } catch (error: unknown) {
    console.error("DATABASE ERROR:", error)
    databaseError = error
  }

  if (databaseError) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-xl border border-red-200 shadow-lg max-w-2xl w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Database Connection Error</h1>
          <p className="text-gray-700 mb-4">
            Bhai, MySQL mein error aa raha hai. Lagta hai tumne <strong>ALTER TABLE</strong> command run nahi ki hai!
          </p>
          <div className="bg-gray-900 text-red-400 p-4 rounded text-sm font-mono overflow-auto">
            {databaseError instanceof Error ? databaseError.message : String(databaseError)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <NetworkClient
      userEmail={session.email as string}
      balance={balance}
      network={networkRows.map((member) => ({
        ...member,
        id: String(member.id),
        manager_id: String(member.manager_id),
      }))}
      transfers={transferRows}
    />
  )
}