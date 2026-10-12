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
  company: string
  country: string
  state: string
  gst_number: string
  pan_number: string
  password: string
}) {

  const { name, email, company, country, state, gst_number, pan_number, password } = formData

  try {
    const [existing] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    )

    if (Array.isArray(existing) && existing.length > 0) {
      return { success: false, error: 'Email is already registered' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = crypto.randomUUID()
    const ledgerId = crypto.randomUUID()

    // 3. Insert User with new fields
    await db.query(
      `INSERT INTO users 
      (id, name, email, password, company, country, state, gst_number, pan_number, token_balance) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, name, email, hashedPassword, company, country, state, gst_number, pan_number, 100]
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