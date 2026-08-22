// app/admin/contacts/page.tsx
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import AdminContactsClient from './AdminContactsClient'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

export default async function AdminContactsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (!token) redirect('/admin/login')

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    if (payload.role !== 'ADMIN') redirect('/dashboard')
  } catch {
    redirect('/admin/login')
  }

  const [contacts]: any = await db.query('SELECT * FROM contacts ORDER BY created_at DESC')

  return <AdminContactsClient initialContacts={contacts} />
}