// app/actions/login.ts
'use server'

import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

// Secret key for JWT signing. Must be at least 32 chars.
// In production, put this in .env.local: JWT_SECRET="your_long_random_string"
const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function loginUser(formData: {
  email: string
  password: string
}) {
  const validated = LoginSchema.safeParse(formData)

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

    // 2. Verify password
    const passwordsMatch = await bcrypt.compare(password, user.password)
    
    if (!passwordsMatch) {
      return { success: false, error: 'Invalid credentials' }
    }

    // 3. Create Session Payload (do NOT include the password here)
    const sessionPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    // 4. Create JWT (expires in 1 day)
    const token = await new SignJWT(sessionPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(key)

    // 5. Set HTTP-Only Cookie (ADDED AWAIT HERE)
    const cookieStore = await cookies()
    cookieStore.set('session', token, {
      httpOnly: true, // Prevents JS access
      secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day in seconds
    })

    return { success: true, message: 'Login successful' }
  } catch (error) {
    console.error('Login Error:', error)
    return { success: false, error: 'Something went wrong during login' }
  }
}