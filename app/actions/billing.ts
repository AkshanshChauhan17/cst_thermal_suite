// app/actions/billing.ts
'use server'

import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import type { RowDataPacket } from 'mysql2'

interface BalanceRow extends RowDataPacket {
  token_balance: number
}

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

export async function deductMinuteToken(pricePerMinute: number, calculatorId: string, sessionId: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    if (!token) return { success: false, error: 'Unauthorized' }

    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    const userId = payload.id

    const [rows] = await db.query<BalanceRow[]>(
      'SELECT token_balance FROM users WHERE id = ?',
      [userId],
    )
    const currentBalance = rows[0]?.token_balance || 0


    if (currentBalance < pricePerMinute) {
      return { success: false, error: 'Insufficient tokens' }
    }

    const newBalance = currentBalance - pricePerMinute
    await db.query('UPDATE users SET token_balance = ? WHERE id = ?', [newBalance, userId])

    await db.query(
      `INSERT INTO usage_logs (session_id, user_id, calculator_id, tokens_spent, minutes_used) 
       VALUES (?, ?, ?, ?, 1)
       ON DUPLICATE KEY UPDATE 
       tokens_spent = tokens_spent + ?, 
       minutes_used = minutes_used + 1`,
      [sessionId, userId, calculatorId, pricePerMinute, pricePerMinute]
    )

    return { success: true, newBalance }
  } catch (error) {
    console.error('Billing error:', error)
    return { success: false, error: 'Billing error' }
  }
}