// app/admin/users/page.tsx
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import UserManagementClient from './UserManagementClient'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

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
  const [users]: any = await db.query(`
    SELECT id, name, email, role, token_balance, created_at 
    FROM users 
    ORDER BY created_at DESC
  `)

  return <UserManagementClient users={users} />
}