// app/actions/shareTokens.ts
'use server'

import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import crypto from 'crypto'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// BUG FIXED: Key yahan match karni chahiye login wali key se!
const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

const TransferSchema = z.object({
  recipientId: z.string().min(1, "Please select a recipient"),
  amount: z.coerce.number().min(1, "Amount must be at least 1").int(),
})

export async function shareTokens(formData: FormData) {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) return { success: false, error: 'Unauthorized: No token found' }

  let senderId;
  try {
    // Ye line ab error nahi degi kyunki key same hai
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    senderId = payload.id
  } catch (error) {
    return { success: false, error: 'Invalid session. Please logout and login again.' }
  }

  const rawData = {
    recipientId: formData.get('recipientId'),
    amount: formData.get('amount'),
  }
  
  const validated = TransferSchema.safeParse(rawData)
  if (!validated.success) return { success: false, error: 'Invalid input provided' }
  const { recipientId, amount } = validated.data

  const connection = await db.getConnection()

  try {
    await connection.beginTransaction()

    // 1. Get Sender Info
    const [senderRows]: any = await connection.query(
      'SELECT email, token_balance FROM users WHERE id = ? FOR UPDATE',
      [senderId]
    )
    if (senderRows.length === 0) throw new Error('Sender not found')
    const sender = senderRows[0]

    // 2. Check Balance
    if (sender.token_balance < amount) {
      await connection.rollback(); connection.release()
      return { success: false, error: 'Insufficient tokens in your balance' }
    }

    // 3. Get Recipient Info
    const [recipientRows]: any = await connection.query(
      'SELECT id, email, name FROM users WHERE id = ? FOR UPDATE',
      [recipientId]
    )
    if (recipientRows.length === 0) {
      await connection.rollback(); connection.release()
      return { success: false, error: 'Recipient not found' }
    }
    const recipient = recipientRows[0]

    // 4. Update Balances
    await connection.query('UPDATE users SET token_balance = token_balance - ? WHERE id = ?', [amount, senderId])
    await connection.query('UPDATE users SET token_balance = token_balance + ? WHERE id = ?', [amount, recipientId])

    // 5. Create Graph/Ledger Entries (Sender & Receiver)
    await connection.query(
      'INSERT INTO token_ledger (id, user_id, amount, reason) VALUES (?, ?, ?, ?)',
      [crypto.randomUUID(), senderId, -amount, `TRANSFER_OUT TO ${recipient.email}`]
    )
    await connection.query(
      'INSERT INTO token_ledger (id, user_id, amount, reason) VALUES (?, ?, ?, ?)',
      [crypto.randomUUID(), recipientId, amount, `TRANSFER_IN FROM ${sender.email}`]
    )

    await connection.commit()
    connection.release()
    
    // Refresh the Graph page
    revalidatePath('/dashboard/network')
    
    return { success: true, message: `Sent ${amount} tokens to ${recipient.name} successfully!` }
  } catch (error) {
    await connection.rollback()
    connection.release()
    console.error("Transfer Error:", error)
    return { success: false, error: 'Database transfer failed' }
  }
}