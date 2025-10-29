import { NextRequest, NextResponse } from 'next/server'
 
// 1. Specify protected and public routes
// const protectedRoutes = ['/datasets/add', '/administrator/user-management', '/administrator/role']
const publicRoutes = ['/login', '/']
const adminRoutes = ['/jobs-management', '/jobs-management/:id']
const applicantRoutes = ['/form-apply'] 

 
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  // const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  const authToken =  req.cookies.get("authToken")?.value
  const role =  req.cookies.get("role")?.value
  const isAdminRoute = adminRoutes.includes(path)
  const isApplicantRoute = applicantRoutes.includes(path)

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // if (isProtectedRoute && !authToken) {
  if (!authToken || !role) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname)
    return NextResponse.redirect(new URL(`/login?redirect=${callbackUrl}`, req.nextUrl))
  } else if (isAdminRoute && (role as string | unknown) !== 'admin') {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  } else if (isApplicantRoute && (role as string | unknown) !== 'applicant') {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
