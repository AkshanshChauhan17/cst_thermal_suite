// app/actions/adminLogin.ts
'use server'

import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

const AdminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function adminLogin(formData: {
  email: string
  password: string
}) {
  const validated = AdminLoginSchema.safeParse(formData)

  if (!validated.success) {
    return { success: false, error: validated.error.message }
  }

  const { email, password } = validated.data

  try {
    // 1. Find user by email
    const [rows]: any = await db.query(
      'SELECT id, name, email, password, role FROM users WHERE email = ?',
      [email]
    )
    const user = rows[0]

    if (!user) {
      return { success: false, error: 'Invalid credentials' }
    }

    // 2. Strict Admin Check 🔒
    if (user.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized: Admin access required.' }
    }

    // 3. Verify password
    const passwordsMatch = await bcrypt.compare(password, user.password)
    
    if (!passwordsMatch) {
      return { success: false, error: 'Invalid credentials' }
    }

    // 4. Create Session Payload
    const sessionPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role, // This will be 'ADMIN'
    }

    // 5. Create JWT
    const token = await new SignJWT(sessionPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(key)

    // 6. Set HTTP-Only Cookie (ADDED AWAIT HERE)
    const cookieStore = await cookies()
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })

    return { success: true, message: 'Admin authenticated successfully.' }
  } catch (error) {
    console.error('Admin Login Error:', error)
    return { success: false, error: 'System error during authentication.' }
  }
}