import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const session = await auth()

    if (session) {
        return NextResponse.next()
    }
    else {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon.svg|logo-full.svg|logo-hero.svg|$).*)',
    ],
}
