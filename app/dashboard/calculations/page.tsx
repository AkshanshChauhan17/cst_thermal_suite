// app/dashboard/calculations/page.tsx
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'
import CalculationsClient from './CalculationsClient'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

// Mock Data for the UI since we haven't built the actual job runner database table yet
const mockJobs = [
  { id: 'JOB-9823', name: 'High-Pressure Coil Simulation', status: 'COMPLETED', duration: '14.2s', date: '2026-08-09T01:30:00Z' },
  { id: 'JOB-9824', name: 'Ambient Baseline Test', status: 'COMPLETED', duration: '8.4s', date: '2026-08-09T01:15:00Z' },
  { id: 'JOB-9825', name: 'Thermal Load Stress Test', status: 'FAILED', duration: '45.1s', date: '2026-08-08T14:20:00Z' },
  { id: 'JOB-9826', name: 'Condenser Efficiency Check', status: 'COMPLETED', duration: '11.0s', date: '2026-08-07T09:10:00Z' },
]

export default async function CalculationsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) redirect('/login')

  try {
    // Verify session token
    await jwtVerify(token, key, { algorithms: ['HS256'] })
    
    // In a real app, you would query the database here:
    // const [jobs]: any = await db.query('SELECT * FROM calculation_jobs WHERE user_id = ?', [payload.id])
    
    return <CalculationsClient jobs={mockJobs} />
    
  } catch (error) {
    console.error('Calculations Auth Error:', error)
    redirect('/login')
  }
}