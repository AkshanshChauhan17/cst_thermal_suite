// app/actions/clientRemoveColleague.ts
'use server'

import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { revalidatePath } from 'next/cache'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

export async function clientRemoveColleague(targetUserId: string) {
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

  const connection = await db.getConnection()

  try {
    await connection.beginTransaction()

    // 1. Verify Target User and their Manager
    const [userRows]: any = await connection.query(
      'SELECT name, manager_id FROM users WHERE id = ? FOR UPDATE', 
      [targetUserId]
    )
    
    if (userRows.length === 0) throw new Error('User not found')
    const targetUser = userRows[0]

    // SECURITY CHECK: Ensure the person trying to remove is the ACTUAL direct manager
    if (targetUser.manager_id !== currentUserId) {
      await connection.rollback(); connection.release()
      return { success: false, error: 'You can only remove your DIRECT colleagues (Level 1).' }
    }

    // 2. PROMOTE METHOD: Target ke downlines ko current user ko assign kar do
    await connection.query(
      'UPDATE users SET manager_id = ? WHERE manager_id = ?', 
      [currentUserId, targetUserId]
    )

    // 3. UNLINK TARGET: Target ko cluster se bahar nikalo
    await connection.query(
      'UPDATE users SET manager_id = NULL WHERE id = ?', 
      [targetUserId]
    )

    await connection.commit()
    connection.release()

    revalidatePath('/dashboard/network')
    
    return { success: true, message: `${targetUser.name} removed. Their downlines are now your direct connections.` }
    
  } catch (error) {
    await connection.rollback()
    connection.release()
    console.error("Client Unlink Error:", error)
    return { success: false, error: 'Failed to process request.' }
  }
}