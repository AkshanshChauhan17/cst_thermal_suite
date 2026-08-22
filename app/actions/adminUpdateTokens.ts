// app/actions/adminUpdateTokens.ts
'use server'

import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import crypto from 'crypto'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

const TokenUpdateSchema = z.object({
  userId: z.string(),
  amount: z.coerce.number().int(), // Can be positive (add) or negative (deduct)
})

export async function adminUpdateTokens(formData: FormData) {
  // 1. Authenticate Admin
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (!token) return { success: false, error: 'Unauthorized' }

  let adminId;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    if (payload.role !== 'ADMIN') {
      return { success: false, error: 'Access denied: Admin clearance required.' }
    }
    adminId = payload.id
  } catch {
    return { success: false, error: 'Invalid session' }
  }

  // 2. Validate Input
  const rawData = {
    userId: formData.get('userId'),
    amount: formData.get('amount'),
  }
  
  const validated = TokenUpdateSchema.safeParse(rawData)
  if (!validated.success) return { success: false, error: 'Invalid input provided' }
  const { userId, amount } = validated.data

  if (amount === 0) return { success: false, error: 'Amount cannot be zero' }

  const connection = await db.getConnection()

  try {
    await connection.beginTransaction()

    // 3. Verify target user exists
    const [targetRows]: any = await connection.query(
      'SELECT email, token_balance FROM users WHERE id = ? FOR UPDATE',
      [userId]
    )
    if (targetRows.length === 0) throw new Error('User not found')
    
    const targetUser = targetRows[0]
    
    // Prevent negative balance if deducting
    if (amount < 0 && targetUser.token_balance + amount < 0) {
       await connection.rollback(); connection.release()
       return { success: false, error: 'Cannot deduct more tokens than the user has.' }
    }

    // 4. Update Balance
    await connection.query(
      'UPDATE users SET token_balance = token_balance + ? WHERE id = ?',
      [amount, userId]
    )

    // 5. Write Ledger Receipt
    const actionReason = amount > 0 ? 'ADMIN_ADJUSTMENT_CREDIT' : 'ADMIN_ADJUSTMENT_DEBIT'
    await connection.query(
      'INSERT INTO token_ledger (id, user_id, amount, reason) VALUES (?, ?, ?, ?)',
      [crypto.randomUUID(), userId, amount, actionReason]
    )

    await connection.commit()
    connection.release()
    
    revalidatePath('/admin/users')
    
    const actionWord = amount > 0 ? 'Added' : 'Deducted'
    return { success: true, message: `Successfully ${actionWord} ${Math.abs(amount)} tokens.` }

  } catch (error) {
    await connection.rollback()
    connection.release()
    console.error("Admin Token Update Error:", error)
    return { success: false, error: 'Database update failed' }
  }
}