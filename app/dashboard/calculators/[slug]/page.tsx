// app/calculators/[slug]/page.tsx
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { notFound, redirect } from 'next/navigation'
import CalculatorRunner from './CalculatorRunner'
import type { RowDataPacket } from 'mysql2/promise'

interface CalculatorRow extends RowDataPacket {
  id: number
  name: string
  description: string
  api_url: string
  price: number
}

interface UserRow extends RowDataPacket {
  token_balance: number
}

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Resolve params (Next.js 15 fix)
  const resolvedParams = await params
  const slug = resolvedParams.slug

  // 2. Authenticate User
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

  // 3. Fetch Calculator Details & User Balance
  const [calcRows] = await db.query<CalculatorRow[]>('SELECT * FROM calculators WHERE slug = ? AND is_active = 1 LIMIT 1', [slug])
  if (calcRows.length === 0) notFound()
  const calculator = calcRows[0]

  const [userRows] = await db.query<UserRow[]>('SELECT token_balance FROM users WHERE id = ?', [userId])
  const userBalance = userRows[0]?.token_balance || 0

  return (
    <div className="min-h-screen bg-[#110f2a] flex flex-col font-sans">
      <CalculatorRunner 
        calculator={{
          id: String(calculator.id),
          name: calculator.name,
          description: calculator.description,
          api_url: calculator.api_url,
          price: calculator.price
        }}
        initialBalance={userBalance}
      />
    </div>
  )
}