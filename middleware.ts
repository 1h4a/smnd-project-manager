import { auth } from "@/auth"

export async function middleware(req: Request) {
    const session = await auth()

    if (session) {
        return new Response(null, { status: 200 })
    }
    else {
        return Response.redirect(new URL('/', req.url))
    }
}

export const config = {
    matcher: [
        //'/((?!api|_next/static|public|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)',
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon.svg|logo-full.svg|logo-hero.svg|$).*)',
    ],
}
