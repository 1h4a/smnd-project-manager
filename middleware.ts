import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
    //const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    const { pathname } = request.nextUrl

    // Paths excluded from authentication control
    const publicPaths = ['/']

    // Default redirect path
    const defaultPath: string = '/'

    /*if (!token && !publicPaths.includes(pathname) && !pathname.startsWith('/api/')) {
        return NextResponse.redirect(new URL("/auth/signin", request.url))
    }*/

    /*if (!mwLoginControl(pathname) && !publicPaths.includes(pathname) && !pathname.startsWith('/api/')) {
        return NextResponse.redirect(new URL(defaultPath, request.url))
    }*/

    // Can't do middleware based access control without Entra Auth implemented
    // TODO: Permission gating via middleware instead of shared-utils:loginControl()
    // Server should refuse to serve routes that the user is not allowed in

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}

