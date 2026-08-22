// app/dashboard/page.tsx
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

type UserRow = {
  id: string
  name: string
  email: string
  token_balance: number
}

type CalculatorRow = {
  id: string
  name: string
  description: string
  slug: string
  price: number
}

type OwnedCalculatorRow = {
  calculator_id: string | number
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) redirect('/login')

  let user: UserRow | undefined
  let calculators: CalculatorRow[]
  let ownedCalculatorIds: string[]

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    
    // 1. Fetch User Data
    const [userRows] = (await db.query(
      'SELECT id, name, email, token_balance FROM users WHERE id = ?',
      [payload.id]
    )) as [UserRow[], unknown]
    user = userRows[0]
    
    if (!user) redirect('/login')

    // Normalize the database identifier for the client component.
    user = { ...user, id: String(user.id) }

    // 2. Fetch All Active Calculators for the Store
    const [calcRows] = (await db.query(
      'SELECT id, name, description, slug, price FROM calculators WHERE is_active = true ORDER BY created_at DESC'
    )) as [CalculatorRow[], unknown]
    calculators = calcRows.map((calculator) => ({
      ...calculator,
      id: String(calculator.id),
    }))
    
    // 3. Fetch IDs of calculators this specific user already owns
    const [ownedRows] = (await db.query(
      'SELECT calculator_id FROM user_calculators WHERE user_id = ?',
      [user.id]
    )) as [OwnedCalculatorRow[], unknown]
    
    // Convert the database rows into a simple array of strings [ "id-1", "id-2" ]
    ownedCalculatorIds = ownedRows.map((row) => String(row.calculator_id))
    
  } catch (error) {
    console.error('Dashboard Auth Error:', error)
    redirect('/login')
  }

  // Pass everything down to the client UI outside the try/catch.
  return (
    <DashboardClient 
      user={user} 
      calculators={calculators} 
      ownedIds={ownedCalculatorIds} 
    />
  )
}