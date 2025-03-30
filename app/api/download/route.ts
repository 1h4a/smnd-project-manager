// Prisma

import { prisma } from "@/prisma"

// S3

import s3 from "@/bucket"
import { GetObjectCommand } from "@aws-sdk/client-s3"

// Functions

import { NextResponse, NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const request = await req.json()
        const key: string = request.key
        if (!key) {
            return NextResponse.json({error: "failure : missing key"}, {status: 400})
        }

        const data = await s3.send(
            new GetObjectCommand({
                Bucket: process.env.SPACES_NAME!,
                Key: key,
            })
        );

        if (!data.Body) {
            return NextResponse.json({error: "failure : file not found or empty"}, {status: 404})
        }

        const db = await prisma.file.findUnique({
            where: {
                key: key
            },
            select: {
                name: true
            }
        })

        const fileName = db?.name

        const stream = data.Body as ReadableStream

        return new NextResponse(stream, {
            headers: {
                "Content-Type": data.ContentType || "application/octet-stream",
                "Content-Length": data.ContentLength?.toString() || "0",
                "Content-Disposition": `attachment; filename="${fileName}"`
            }
        })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ error: "failure : failed to fetch object" }, { status: 500 })
    }
}