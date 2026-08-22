// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only_make_sure_to_change_this_later'
const key = new TextEncoder().encode(secretKey)

const protectedClientRoutes = ['/dashboard', '/settings', '/calculators']
const protectedAdminRoutes = ['/admin/dashboard', '/admin/users', '/admin/calculators']
const publicRoutes = ['/login', '/register', '/admin/login', '/']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedClientRoute = protectedClientRoutes.some((route) => path.startsWith(route))
  const isProtectedAdminRoute = protectedAdminRoutes.some((route) => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)

  const cookieStore = request.cookies
  const cookie = cookieStore.get('session')?.value

  let session = null
  if (cookie) {
    try {
      const { payload } = await jwtVerify(cookie, key, { algorithms: ['HS256'] })
      session = payload
    } catch (error) {
      // Invalid token
    }
  }

  // --- A. Base Authentication Checks ---
  if (isProtectedClientRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isProtectedAdminRoute) {
    if (!session) return NextResponse.redirect(new URL('/admin/login', request.url))
    if (session.role !== 'ADMIN') return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (isPublicRoute && session) {
    if (session.role === 'ADMIN' && path.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    if (session.role === 'CLIENT' && (path === '/login' || path === '/register')) {
       return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // --- B. Calculator Ownership Security 🔒 ---
  // If they are trying to access a specific calculator...
  if (path.startsWith('/calculators/') && session) {
    // Extract the slug (e.g., from "/calculators/thermal-load", get "thermal-load")
    const slug = path.split('/')[2] 
    
    if (slug) {
      // Ask our API route if the user owns this slug
      const url = new URL(`/api/check-ownership?userId=${session.id}&slug=${slug}`, request.url)
      
      try {
        const ownershipResponse = await fetch(url)
        const { owned } = await ownershipResponse.json()
        
        // If they don't own it, kick them back to the store
        if (!owned) {
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      } catch (error) {
         // If the check fails, fail securely (deny access)
         return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}