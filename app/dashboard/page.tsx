export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import DashboardClient from './DashboardClient'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

type UserRow = {
  id: string
  name: string
  email: string
  token_balance: number
}

type UsageStatsRow = {
  totalSessions: number | null
  totalMinutes: number | null
  totalTokensSpent: number | null
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) redirect('/login')

  let userId = ''
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    userId = payload.id as string
  } catch {
    redirect('/login')
  }

  const [userRows] = (await db.query(
    'SELECT id, name, email, token_balance FROM users WHERE id = ?',
    [userId],
  )) as [UserRow[], unknown]
  
  if (userRows.length === 0) redirect('/login')
  const user = userRows[0]

  type Calculator = Parameters<typeof DashboardClient>[0]['calculators'][number]
  const [calculators] = (await db.query(
    'SELECT * FROM calculators ORDER BY is_active DESC, created_at DESC',
  )) as [Calculator[], unknown]

  const [statsRows] = (await db.query(`
    SELECT 
      COUNT(session_id) as totalSessions,
      SUM(minutes_used) as totalMinutes,
      SUM(tokens_spent) as totalTokensSpent
    FROM usage_logs 
    WHERE user_id = ?
  `, [userId])) as [UsageStatsRow[], unknown]
  
  const stats = {
    totalSessions: statsRows[0]?.totalSessions || 0,
    totalMinutes: statsRows[0]?.totalMinutes || 0,
    totalTokensSpent: statsRows[0]?.totalTokensSpent || 0,
  }

  return <DashboardClient user={user} calculators={calculators} stats={stats} />
}