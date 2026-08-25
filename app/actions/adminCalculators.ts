// app/actions/adminCalculators.ts
'use server'

import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import crypto from 'crypto'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

// 1. Reusable Auth Function
async function checkAdminAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) throw new Error('Unauthorized')

  const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })

  if (payload.role !== 'ADMIN') throw new Error('Root Admin clearance required')

  return payload 
}

// 2. Validation schema for a new calculator (Added api_url here)
const CalculatorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  price: z.coerce.number().min(0, 'Price cannot be negative'), 
  api_url: z.string().url('Please provide a valid secure API URL'), 
})

export async function addCalculator(formData: FormData) {
  try {
    // 3. Use the clean auth function
    await checkAdminAuth()

    // 4. Validate form input
    const rawData = {
      name: formData.get('name'),
      description: formData.get('description'),
      slug: formData.get('slug'),
      price: formData.get('price'),
      api_url: formData.get('api_url'), // Fetching api_url from the form
    }

    const validated = CalculatorSchema.safeParse(rawData)

    if (!validated.success) {
      return { success: false, error: validated.error.message }
    }

    const { name, description, slug, price, api_url } = validated.data
    const calculatorId = crypto.randomUUID()

    // 5. Insert into database (Fixed the ? placeholder for api_url)
    await db.query(
      `INSERT INTO calculators (id, name, description, slug, price, is_active, api_url) 
       VALUES (?, ?, ?, ?, ?, 1, ?)`,
      [calculatorId, name, description, slug, price, api_url]
    )

    // 6. Refresh the admin page data
    revalidatePath('/admin/dashboard')

    return { success: true, message: 'Module deployed successfully!' }

  } catch (error: unknown) {
    console.error('Error adding calculator:', error)
    
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'ER_DUP_ENTRY'
    ) {
      return { success: false, error: 'A calculator with this slug already exists.' }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'System error while saving calculator.',
    }
  }
}

export async function toggleCalculatorStatus(id: string, currentStatus: number) {
  try {
    await checkAdminAuth()
    const newStatus = currentStatus === 1 ? 0 : 1
    await db.query('UPDATE calculators SET is_active = ? WHERE id = ?', [newStatus, id])
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export async function deleteCalculator(id: string) {
  try {
    await checkAdminAuth()
    await db.query('DELETE FROM calculators WHERE id = ?', [id])
    revalidatePath('/admin/dashboard')
    return { success: true, message: 'Module deleted' }
  } catch (error) {
    return { success: false, error: 'Failed to delete module' }
  }
}