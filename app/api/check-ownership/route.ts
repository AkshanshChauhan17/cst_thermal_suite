// app/api/check-ownership/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const slug = searchParams.get('slug')

  if (!userId || !slug) {
    return NextResponse.json({ owned: false }, { status: 400 })
  }

  try {
    // Join the user_calculators and calculators tables to check if the user owns this specific slug
    const [rows]: any = await db.query(
      `SELECT uc.id 
       FROM user_calculators uc
       JOIN calculators c ON uc.calculator_id = c.id
       WHERE uc.user_id = ? AND c.slug = ?`,
      [userId, slug]
    )

    if (rows.length > 0) {
      return NextResponse.json({ owned: true })
    }

    return NextResponse.json({ owned: false })
  } catch (error) {
    console.error('Ownership Check Error:', error)
    return NextResponse.json({ owned: false }, { status: 500 })
  }
}