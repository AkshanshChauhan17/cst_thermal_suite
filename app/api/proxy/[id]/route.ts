// app/api/proxy/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

type Calculator = RowDataPacket & { api_url: string; is_active: number };

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Type updated to Promise
) {
  try {
    const { id } = await params;

    const [rows] = await db.query<Calculator[]>(
      'SELECT api_url, is_active FROM calculators WHERE id = ?',
      [id]
    );

    if (rows.length === 0 || rows[0].is_active === 0) {
      return new NextResponse('Calculator is offline or not found.', { status: 404 });
    }

    const actualUrl = rows[0].api_url;

    if (!actualUrl.startsWith('http')) {
       return new NextResponse('Invalid Internal URL', { status: 500 });
    }

    const response = await fetch(actualUrl);

    const content = await response.text();

    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });

  } catch (error) {
    console.error("Proxy Error:", error);
    return new NextResponse('Error connecting to module.', { status: 500 });
  }
}