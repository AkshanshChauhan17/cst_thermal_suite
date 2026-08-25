// app/dashboard/calculations/page.tsx
export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'
import type { RowDataPacket } from 'mysql2/promise'
import { db } from '@/lib/db'
import CalculationsClient from './CalculationsClient'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

interface UsageLogRow extends RowDataPacket {
  session_id: string
  calculator_name: string
  tokens_spent: number
  minutes_used: number
  started_at: Date
}

export default async function CalculationsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) redirect('/login')

  let userId = ''
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    userId = payload.id as string
  } catch (error) {
    redirect('/login')
  }

  // Fetching real usage logs joined with calculator details for this specific user
  const [logsRows] = await db.query<UsageLogRow[]>(`
    SELECT 
      u.session_id, 
      c.name AS calculator_name, 
      u.tokens_spent, 
      u.minutes_used, 
      u.started_at 
    FROM usage_logs u
    JOIN calculators c ON u.calculator_id = c.id
    WHERE u.user_id = ?
    ORDER BY u.started_at DESC
  `, [userId])

  const sessions = logsRows.map((log) => ({
    session_id: log.session_id,
    calculator_name: log.calculator_name,
    tokens_spent: log.tokens_spent,
    minutes_used: log.minutes_used,
    started_at: log.started_at.toISOString(),
  }))

  return <CalculationsClient sessions={sessions} />
}