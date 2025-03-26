import { getToken } from "next-auth/jwt";
import { auth } from "@/auth"
import { prisma } from "@/prisma"

export default async function isAuth(req: Request) {
    const serverToken = await getToken({req})

    if (serverToken) {
        return true
    }
    else {
        return false
    }
}