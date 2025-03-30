// Prisma

import { prisma } from "@/prisma"

// S3

import s3 from "@/bucket"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"

// Functions

import { NextResponse, NextRequest } from "next/server"

export async function POST (req: NextRequest) {
    try {
        const request = await req.json()
        const key = request.key
        if (!key) {
            return NextResponse.json({error: "failure : missing key"}, {status: 400})
        }

        await s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.SPACES_NAME!,
                Key: key
            })
        )

        await prisma.file.delete({
            where: {
            key: key
            }
        })

        return NextResponse.json({ message: "success : object deleted"})
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ error: "failure : failed to delete object"}, { status: 500 })
    }
}