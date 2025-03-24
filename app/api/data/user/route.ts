import isAuth from "@/app/api/session"

export async function GET(request: Request) {
    const auth = await isAuth(request)
    if (auth) {
        return new Response('Hello world', { status: 200 })
    }
    return new Response('Unauthenticated', { status: 400 })
}