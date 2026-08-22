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

// Validation schema for a new calculator
const CalculatorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  // Slug must be URL-safe (e.g., 'thermal-load', 'coil-selector')
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  price: z.coerce.number().min(0, 'Price cannot be negative'), 
})

export async function addCalculator(formData: FormData) {
  // 1. Authenticate and verify ADMIN role
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) {
    return { success: false, error: 'Unauthorized.' }
  }

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    if (payload.role !== 'ADMIN') {
      return { success: false, error: 'Forbidden: Admin access required.' }
    }
  } catch {
    return { success: false, error: 'Invalid session.' }
  }

  // 2. Validate form input
  const rawData = {
    name: formData.get('name'),
    description: formData.get('description'),
    slug: formData.get('slug'),
    price: formData.get('price'),
  }

  const validated = CalculatorSchema.safeParse(rawData)

  if (!validated.success) {
    return { success: false, error: validated.error.message }
  }

  const { name, description, slug, price } = validated.data
  const calculatorId = crypto.randomUUID()

  try {
    // 3. Insert into database
    await db.query(
      `INSERT INTO calculators (id, name, description, slug, price, is_active) 
       VALUES (?, ?, ?, ?, ?, true)`,
      [calculatorId, name, description, slug, price]
    )

    // 4. Refresh the admin page data
    revalidatePath('/admin/calculators')

    return { success: true, message: 'Calculator registered successfully!' }

  } catch (error: unknown) {
    console.error('Error adding calculator:', error)
    // Check if it's a unique constraint violation (slug already exists)
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ER_DUP_ENTRY'
    ) {
      return { success: false, error: 'A calculator with this slug already exists.' }
    }
    return { success: false, error: 'System error while saving calculator.' }
  }
}