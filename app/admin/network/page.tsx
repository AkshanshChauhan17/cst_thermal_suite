// app/admin/network/page.tsx
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import type { RowDataPacket } from 'mysql2/promise'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import AdminNetworkClient from './AdminNetworkClient'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

interface NetworkUser extends RowDataPacket {
  id: number
  name: string
  email: string
  role: string
  token_balance: number
  manager_id: number | null
}

export default async function AdminNetworkPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) redirect('/admin/login')

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    if (payload.role !== 'ADMIN') redirect('/dashboard')
  } catch {
    redirect('/admin/login')
  }

  // Fetch ALL users and their relationships
  const [users] = await db.query<NetworkUser[]>(`
    SELECT id, name, email, role, token_balance, manager_id 
    FROM users 
    ORDER BY created_at ASC
  `)

    return (
      <AdminNetworkClient
        users={users.map((user) => ({
          ...user,
          id: String(user.id),
          manager_id: user.manager_id === null ? null : String(user.manager_id),
        }))}
      />
    )
}