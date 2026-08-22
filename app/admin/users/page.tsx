// app/admin/users/page.tsx
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { RowDataPacket } from 'mysql2/promise'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import UserManagementClient from './UserManagementClient'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

type AdminUser = RowDataPacket & {
  id: number
  name: string
  email: string
  role: string
  token_balance: number
  created_at: Date | string
}

export default async function AdminUsersPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) redirect('/admin/login')

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    if (payload.role !== 'ADMIN') redirect('/dashboard') // Kick regular users back to client dashboard
  } catch {
    redirect('/admin/login')
  }

  // Fetch all users
  const [users] = await db.query<AdminUser[]>(`
    SELECT id, name, email, role, token_balance, created_at 
    FROM users 
    ORDER BY created_at DESC
  `)

  return (
    <UserManagementClient
      users={users.map((user) => ({
        ...user,
        id: String(user.id),
        created_at: user.created_at instanceof Date
          ? user.created_at.toISOString()
          : user.created_at,
      }))}
    />
  )
}