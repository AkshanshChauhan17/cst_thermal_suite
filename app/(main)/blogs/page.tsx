export const dynamic = 'force-dynamic';
// app/blogs/page.tsx
import { db } from '@/lib/db'
import BlogsClient from './blogsClients'

export const revalidate = 60

export default async function PublicBlogsPage() {
  const [blogs]: any = await db.query(
    'SELECT * FROM blogs WHERE is_published = 1 ORDER BY created_at DESC'
  )

  // Fetch unique categories dynamically from DB
  const [categoryRows]: any = await db.query(
    'SELECT DISTINCT category FROM blogs WHERE is_published = 1 AND category IS NOT NULL AND category != ""'
  )
  const dbCategories = categoryRows.map((r: any) => r.category)

  return <BlogsClient dbBlogs={blogs} dbCategories={dbCategories} />
}