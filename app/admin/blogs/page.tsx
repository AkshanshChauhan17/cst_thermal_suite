// app/admin/blogs/page.tsx
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import AdminBlogsClient from './AdminBlogsClient'
import type { RowDataPacket } from 'mysql2'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

export default async function AdminBlogsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) redirect('/admin/login')

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    if (payload.role !== 'ADMIN') redirect('/dashboard')
  } catch {
    redirect('/admin/login')
  }

  const [blogs] = await db.query<RowDataPacket[]>('SELECT * FROM blogs ORDER BY created_at DESC')

    return (
      <AdminBlogsClient
        initialBlogs={blogs as unknown as Parameters<typeof AdminBlogsClient>[0]['initialBlogs']}
      />
    )
}