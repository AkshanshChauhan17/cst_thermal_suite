// app/actions/addColleague.ts
'use server'

import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

// Ab hume sirf Email chahiye
const LinkColleagueSchema = z.object({
  email: z.string().email('Invalid email format'),
})

export async function addColleague(formData: FormData) {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (!token) return { success: false, error: 'Unauthorized' }

  let currentUserId;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    currentUserId = payload.id
  } catch {
    return { success: false, error: 'Invalid session' }
  }

  const rawData = {
    email: formData.get('email'),
  }

  const validated = LinkColleagueSchema.safeParse(rawData)
  if (!validated.success) return { success: false, error: validated.error.errors[0].message }
  
  const { email } = validated.data

  try {
    // 1. Check karo ki email database mein hai ya nahi
    const [existingUsers]: any = await db.query(
      'SELECT id, name, manager_id, role FROM users WHERE email = ?', 
      [email]
    )
    
    if (existingUsers.length === 0) {
      return { success: false, error: 'User not found. They must register on the platform first.' }
    }

    const targetUser = existingUsers[0]

    // 2. Khud ko add karne se roko
    if (targetUser.id === currentUserId) {
      return { success: false, error: 'You cannot add yourself to your own network.' }
    }

    // 3. Admin ko add karne se roko
    if (targetUser.role === 'ADMIN') {
      return { success: false, error: 'You cannot add an Administrator to your network.' }
    }

    // 4. Check karo ki target user already kisi aur ke network mein toh nahi hai
    if (targetUser.manager_id !== null) {
      return { success: false, error: 'This user is already part of a network.' }
    }

    // 5. Sab theek hai toh Link kar do (Update target user's manager_id to current user's id)
    await db.query(
      'UPDATE users SET manager_id = ? WHERE id = ?',
      [currentUserId, targetUser.id]
    )

    revalidatePath('/dashboard/network')
    
    return { success: true, message: `${targetUser.name} has been successfully added to your network!` }
    
  } catch (error) {
    console.error(error)
    return { success: false, error: 'System error while linking colleague.' }
  }
}