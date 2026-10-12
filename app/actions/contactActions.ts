// app/actions/contactActions.ts
'use server'

import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import crypto from 'crypto'
import { revalidatePath } from 'next/cache'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

async function checkAdminAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (!token) throw new Error('Unauthorized')
  const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
  if (payload.role !== 'ADMIN') throw new Error('Root Admin clearance required')
  return payload
}

// Public form submit action
export async function submitContact(formData: FormData) {
  try {
    const id = crypto.randomUUID();
    const full_name = formData.get('full_name');
    const email = formData.get('email');
    const phone = formData.get('phone'); // Capture phone
    const address = formData.get('address'); // Capture address
    const department = formData.get('department');
    const message = formData.get('message');

    await db.query(
      'INSERT INTO contacts (id, full_name, email, phone, address, department, message) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, full_name, email, phone, address, department, message]
    );

    revalidatePath('/admin/contacts');
    return { success: true, message: 'Message received successfully!' };
  } catch (error: unknown) {
    console.error(error);
    return { success: false, error: 'Failed to send message.' };
  }
}

// Admin actions
export async function toggleContactStatus(id: string, currentStatus: string) {
  try {
    await checkAdminAuth()
    const newStatus = currentStatus === 'Unread' ? 'Read' : 'Unread'
    await db.query('UPDATE contacts SET status = ? WHERE id = ?', [newStatus, id])
    revalidatePath('/admin/contacts')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export async function deleteContact(id: string) {
  try {
    await checkAdminAuth()
    await db.query('DELETE FROM contacts WHERE id = ?', [id])
    revalidatePath('/admin/contacts')
    return { success: true, message: 'Message deleted' }
  } catch (error) {
    return { success: false, error: 'Failed to delete' }
  }
}