// app/dashboard/page.tsx
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) redirect('/login')

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    
    // 1. Fetch User Data
    const [userRows]: any = await db.query(
      'SELECT id, name, email, token_balance FROM users WHERE id = ?',
      [payload.id]
    )
    const user = userRows[0]
    
    if (!user) redirect('/login')

    // 2. Fetch All Active Calculators for the Store
    const [calcRows]: any = await db.query(
      'SELECT id, name, description, slug, price FROM calculators WHERE is_active = true ORDER BY created_at DESC'
    )
    
    // 3. Fetch IDs of calculators this specific user already owns
    const [ownedRows]: any = await db.query(
      'SELECT calculator_id FROM user_calculators WHERE user_id = ?',
      [user.id]
    )
    
    // Convert the database rows into a simple array of strings [ "id-1", "id-2" ]
    const ownedCalculatorIds = ownedRows.map((row: any) => row.calculator_id)

    // Pass everything down to the client UI
    return (
      <DashboardClient 
        user={user} 
        calculators={calcRows} 
        ownedIds={ownedCalculatorIds} 
      />
    )
    
  } catch (error) {
    console.error('Dashboard Auth Error:', error)
    redirect('/login')
  }
}