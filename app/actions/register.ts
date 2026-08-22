'use server'

import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { z } from 'zod'

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function registerUser(formData: {
  name: string
  email: string
  password: string
}) {
  const validated = RegisterSchema.safeParse(formData)

  if (!validated.success) {
    return { success: false, error: validated.error.message }
  }

  const { name, email, password } = validated.data

  try {
    // 1. Check if user exists using parameterized query
    const [existing] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    )

    if (Array.isArray(existing) && existing.length > 0) {
      return { success: false, error: 'Email is already registered' }
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = crypto.randomUUID()
    const ledgerId = crypto.randomUUID()

    // 3. Insert User
    await db.query(
      'INSERT INTO users (id, name, email, password, token_balance) VALUES (?, ?, ?, ?, ?)',
      [userId, name, email, hashedPassword, 100]
    )

    // 4. Create Initial Token Grant in Ledger
    await db.query(
      'INSERT INTO token_ledger (id, user_id, amount, reason) VALUES (?, ?, ?, ?)',
      [ledgerId, userId, 100, 'Initial Signup Grant']
    )

    return { success: true, message: 'Account created successfully!' }
  } catch (error) {
    console.error('Registration Error:', error)
    return { success: false, error: 'Failed to create account. Please try again.' }
  }
}