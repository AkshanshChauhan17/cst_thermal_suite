// app/actions/adminBlogs.ts
'use server'

import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import crypto from 'crypto'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

const BlogSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  category: z.string(),
  author_name: z.string(),
  author_role: z.string(),
  image_caption: z.string(),
  tags: z.string(),
  content: z.string().min(10),
})

// app/actions/adminBlogs.ts mein checkAdminAuth ko modify karein ya payload use karein:
async function checkAdminAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (!token) throw new Error('Unauthorized')

  const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
  if (payload.role !== 'ADMIN') throw new Error('Root Admin clearance required')
  return payload // Isme user ki details hoti hain (jaise name ya email)
}

// Image upload helper
async function handleImageUpload(formData: FormData, existingImage: string = '/coil_img1.webp') {
  const file = formData.get('cover_image_file') as File | null
  
  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    
    // Create directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true })
    
    const filepath = path.join(uploadDir, filename)
    await writeFile(filepath, buffer)
    return `/uploads/${filename}` // Return public URL
  }
  
  return existingImage // Agar nayi file upload nahi hui, toh purani rakho
}

export async function addBlog(formData: FormData) {
  try {
    await checkAdminAuth()

    const adminUser = await checkAdminAuth()
    const authorName = adminUser.name || adminUser.email || 'System Admin'
    const authorRole = 'System Administrator'
    const cover_image = await handleImageUpload(formData, '/coil_img1.webp')

    const rawData = {
      title: formData.get('title'), slug: formData.get('slug'), category: formData.get('category') || 'Platform Releases',
      author_name: formData.get('author_name') || 'Admin', author_role: formData.get('author_role') || 'System Administrator',
      image_caption: formData.get('image_caption') || '', tags: formData.get('tags') || '', content: formData.get('content'),
    }

    const validated = BlogSchema.safeParse(rawData)
    if (!validated.success) return { success: false, error: 'Invalid data' }

    const data = validated.data
    const id = crypto.randomUUID()

    await db.query(
      'INSERT INTO blogs (id, title, slug, category, author_name, author_role, cover_image, image_caption, tags, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, data.title, data.slug, data.category, data.author_name, data.author_role, cover_image, data.image_caption, data.tags, data.content]
    )

    revalidatePath('/admin/blogs')
    revalidatePath('/blogs')
    return { success: true, message: 'Blog published successfully!' }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to save blog' }
  }
}

export async function updateBlog(id: string, formData: FormData) {
  try {
    await checkAdminAuth()

    const existingImage = formData.get('existing_cover_image') as string
    const cover_image = await handleImageUpload(formData, existingImage)

    const rawData = {
      title: formData.get('title'), slug: formData.get('slug'), category: formData.get('category'),
      author_name: formData.get('author_name'), author_role: formData.get('author_role'),
      image_caption: formData.get('image_caption'), tags: formData.get('tags'), content: formData.get('content'),
    }

    const validated = BlogSchema.safeParse(rawData)
    if (!validated.success) return { success: false, error: 'Invalid data' }
    const data = validated.data

    await db.query(
      'UPDATE blogs SET title=?, slug=?, category=?, author_name=?, author_role=?, cover_image=?, image_caption=?, tags=?, content=? WHERE id=?',
      [data.title, data.slug, data.category, data.author_name, data.author_role, cover_image, data.image_caption, data.tags, data.content, id]
    )

    revalidatePath('/admin/blogs')
    revalidatePath('/blogs')
    revalidatePath(`/blogs/${data.slug}`)
    return { success: true, message: 'Blog updated successfully!' }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update blog' }
  }
}

// toggleBlogStatus aur deleteBlog function wahi same rahenge jo the...
export async function toggleBlogStatus(id: string, currentStatus: number) {
  try {
    await checkAdminAuth(); const newStatus = currentStatus === 1 ? 0 : 1
    await db.query('UPDATE blogs SET is_published = ? WHERE id = ?', [newStatus, id]); revalidatePath('/admin/blogs'); revalidatePath('/blogs'); return { success: true }
  } catch (error) { return { success: false } }
}
export async function deleteBlog(id: string) {
  try {
    await checkAdminAuth(); await db.query('DELETE FROM blogs WHERE id = ?', [id]); revalidatePath('/admin/blogs'); revalidatePath('/blogs'); return { success: true, message: 'Deleted' }
  } catch (error) { return { success: false, error: 'Failed' } }
}