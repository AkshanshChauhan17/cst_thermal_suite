// app/dashboard/ledger/page.tsx
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import LedgerClient from './LedgerClient'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

export default async function LedgerPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) redirect('/login')

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    
    // Fetch ledger history for this specific user, newest first
    const [ledgerRows]: any = await db.query(
      'SELECT id, amount, reason, created_at FROM token_ledger WHERE user_id = ? ORDER BY created_at DESC',
      [payload.id]
    )
    
    return <LedgerClient history={ledgerRows} />
    
  } catch (error) {
    console.error('Ledger Auth Error:', error)
    redirect('/login')
  }
}