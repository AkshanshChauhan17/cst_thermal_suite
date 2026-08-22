// app/actions/compute.ts
'use server'

import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import crypto from 'crypto'
import { revalidatePath } from 'next/cache'
import type { RowDataPacket } from 'mysql2/promise'

interface UserRow extends RowDataPacket {
  token_balance: number
}

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

export async function runThermalCalculation(jobName: string, tokenCost: number = 15) {
  // 1. Authenticate the User
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) {
    return { success: false, error: 'Unauthorized. Please log in.' }
  }

  let userId;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    userId = payload.id
  } catch {
    return { success: false, error: 'Invalid session.' }
  }

  // 2. Grab a dedicated connection for the Transaction
  const connection = await db.getConnection()

  try {
    // Start the Transaction
    await connection.beginTransaction()

    // 3. Lock the User Row (`FOR UPDATE`) and get the current balance
    const [userRows] = await connection.query<UserRow[]>(
      'SELECT token_balance FROM users WHERE id = ? FOR UPDATE',
      [userId]
    )

    if (userRows.length === 0) {
      throw new Error('User not found')
    }

    const currentBalance = userRows[0].token_balance

    // 4. Verify Funds
    if (currentBalance < tokenCost) {
      await connection.rollback() // Cancel the transaction
      connection.release()
      return { 
        success: false, 
        error: `Insufficient tokens. Required: ${tokenCost}, Available: ${currentBalance}` 
      }
    }

    // 5. SIMULATE THE HEAVY COMPUTATION HERE
    // In reality, this might be an API call to a Python microservice or C++ solver
    await new Promise((resolve) => setTimeout(resolve, 1500)) 

    // 6. Deduct the Tokens
    await connection.query(
      'UPDATE users SET token_balance = token_balance - ? WHERE id = ?',
      [tokenCost, userId]
    )

    // 7. Write the Immutable Ledger Receipt
    const ledgerId = crypto.randomUUID()
    await connection.query(
      'INSERT INTO token_ledger (id, user_id, amount, reason) VALUES (?, ?, ?, ?)',
      [ledgerId, userId, -tokenCost, `Calculation: ${jobName}`] // Negative amount for usage
    )

    // Commit the Transaction (Saves everything permanently)
    await connection.commit()
    connection.release()

    // Refresh the dashboard page data automatically
    revalidatePath('/dashboard')

    return { 
      success: true, 
      message: 'Calculation completed successfully.',
      tokensDeducted: tokenCost,
      newBalance: currentBalance - tokenCost
    }

  } catch (error) {
    // If ANYTHING fails (even the simulation), rollback both the deduction and the receipt
    await connection.rollback()
    connection.release()
    console.error('Computation Error:', error)
    return { success: false, error: 'System error during computation. No tokens were charged.' }
  }
}