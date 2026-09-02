import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) throw new Error("No image file provided")

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    
    try { 
      await fs.access(uploadDir) 
    } catch { 
      await fs.mkdir(uploadDir, { recursive: true }) 
    }
    
    const filePath = path.join(uploadDir, filename)
    await fs.writeFile(filePath, buffer)

    return NextResponse.json({ success: true, url: `/uploads/${filename}` })
  } catch (error: unknown) {
    console.error("Image Upload Error:", error)
    const message = error instanceof Error ? error.message : "Image upload failed"
    return NextResponse.json({ success: false, error: message })
  }
}