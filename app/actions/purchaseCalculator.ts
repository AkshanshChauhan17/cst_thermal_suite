// app/actions/purchaseCalculator.ts
'use server'

import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import crypto from 'crypto'
import { revalidatePath } from 'next/cache'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

export async function purchaseCalculator(calculatorId: string) {
  // 1. Authenticate User
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) return { success: false, error: 'Unauthorized.' }

  let userId;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    userId = payload.id
  } catch {
    return { success: false, error: 'Invalid session.' }
  }

  // 2. Grab a dedicated connection for a Transaction
  const connection = await db.getConnection()

  try {
    await connection.beginTransaction()

    // 3. Lock user row to get absolute current balance
    const [userRows]: any = await connection.query(
      'SELECT token_balance FROM users WHERE id = ? FOR UPDATE',
      [userId]
    )
    if (userRows.length === 0) throw new Error('User not found')
    const currentBalance = userRows[0].token_balance

    // 4. Get Calculator Price and Details
    const [calcRows]: any = await connection.query(
      'SELECT name, price, is_active FROM calculators WHERE id = ?',
      [calculatorId]
    )
    if (calcRows.length === 0) throw new Error('Calculator not found')
    const calculator = calcRows[0]

    if (!calculator.is_active) {
      await connection.rollback(); connection.release()
      return { success: false, error: 'This module is currently offline.' }
    }

    // 5. Check if user already owns it
    const [ownershipRows]: any = await connection.query(
      'SELECT id FROM user_calculators WHERE user_id = ? AND calculator_id = ?',
      [userId, calculatorId]
    )
    if (ownershipRows.length > 0) {
      await connection.rollback(); connection.release()
      return { success: false, error: 'You already own this module.' }
    }

    // 6. Verify Funds
    if (currentBalance < calculator.price) {
      await connection.rollback(); connection.release()
      return { success: false, error: `Insufficient tokens. Required: ${calculator.price}` }
    }

    // 7. EXECUTE PURCHASE
    
    // A. Deduct tokens
    await connection.query(
      'UPDATE users SET token_balance = token_balance - ? WHERE id = ?',
      [calculator.price, userId]
    )

    // B. Grant Access
    await connection.query(
      'INSERT INTO user_calculators (id, user_id, calculator_id) VALUES (?, ?, ?)',
      [crypto.randomUUID(), userId, calculatorId]
    )

    // C. Write Ledger Receipt
    await connection.query(
      'INSERT INTO token_ledger (id, user_id, amount, reason) VALUES (?, ?, ?, ?)',
      [crypto.randomUUID(), userId, -calculator.price, `Unlocked Module: ${calculator.name}`]
    )

    // Commit Transaction
    await connection.commit()
    connection.release()

    revalidatePath('/dashboard') // Refresh UI automatically

    return { success: true, message: `${calculator.name} unlocked successfully!` }

  } catch (error: any) {
    await connection.rollback()
    connection.release()
    console.error('Purchase Error:', error)
    return { success: false, error: 'System error during purchase.' }
  }
}