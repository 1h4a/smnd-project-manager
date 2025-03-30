import { NextResponse, NextRequest } from "next/server"

import { prisma } from "@/prisma"

export async function POST (req: NextRequest) {
    try {
        const { key, name } = await req.json()
        if (!key || !name) {
            return NextResponse.json({ error: "failure: missing key or name"}, { status: 400 })
        }

        await prisma.file.update({
            where: {
                key: key
            },
            data: {
                name: name
            }
        })

        return NextResponse.json({ message: "success : object renamed"})
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ error: "failure : failed to rename object"}, { status: 500 })
    }
}