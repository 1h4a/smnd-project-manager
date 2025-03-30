// Prisma

import { prisma } from "@/prisma"

// S3

import s3 from "@/bucket"
import { GetObjectCommand } from "@aws-sdk/client-s3"

// Functions

import { NextRequest, NextResponse } from "next/server"
import { type AccessType } from "@/lib/types"

export async function GET(request: NextRequest, {params} : {params: Promise<{key: string}>}) {
    try {
        const { key } = await params

        const file = await prisma.file.findUnique({
            where: {
                key: key
            },
            select: {
                access: true,
                name: true
            }
        })

        if (!file) {
            return NextResponse.json({error: "Provided key does not exist."}, { status: 404 })
        }

        const fileAccess = file?.access!

        if (fileAccess == "PRIVATE") {
            return NextResponse.json({error: "Access to the requested resource is forbidden - the file is marked as \"Private\"."}, {status: 403})
        }

        const data = await s3.send(
            new GetObjectCommand({
                Bucket: process.env.SPACES_NAME!,
                Key: key,
            })
        );

        if (!data.Body) {
            return NextResponse.json({error: "File not found or is empty."}, {status: 404})
        }

        const fileName = file?.name
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
        return NextResponse.json({error: "Route returned unexpected exception: " + error}, { status: 500 })
    }
}