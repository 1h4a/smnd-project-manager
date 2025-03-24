import isAuth from "@/app/api/session"

export async function GET(request: Request, { params } : { params: Promise<{  id: string }>}) {
    const auth = await isAuth(request)
    return new Response('Hello world', { status: 200 })
}