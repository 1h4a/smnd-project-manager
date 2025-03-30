// Prisma

import { prisma } from "@/prisma"

// S3

import s3 from "@/bucket"
import { PutObjectCommand } from "@aws-sdk/client-s3"

// Functions

import { NextResponse } from "next/server"
import { v4 as uuid } from 'uuid'

// Types

import type { AccessType } from "@/lib/types"

export async function POST(req: Request) {
    try {
        // Get request body data
        const request = await req.formData()
        const file = request.get("file") as File
        const size = file.size
        const user = request.get("user") as string
        const project = request.get("project") as string
        const fileName = file.name
        const submission = request.get("submission") as string ?? undefined
        const fileId = uuid()

        if (!file) return NextResponse.json({ message: "failure : no file provided"})

        const isFile = file instanceof File

        if (!isFile) return NextResponse.json({ message: "failure : request body is not a file"})

        const defaultAccess: AccessType = "PRIVATE"

        let db: any

        if (submission == undefined) {
            db = await prisma.file.create({
                data: {
                    size: size,
                    key: fileId,
                    name: fileName,
                    access: defaultAccess,
                    author: { connect: { id: user! }},
                    project: { connect: { id: project }}
                },
                select: {
                    id: true
                }
            })
        }
        else {
            db = await prisma.file.create({
                data: {
                    size: size,
                    key: fileId,
                    name: fileName,
                    access: defaultAccess,
                    author: { connect: { id: user }},
                    project: { connect: { id: project }},
                    submission: { connect: { id: submission }},
                },
                select: {
                    id: true
                }
            })
        }

        const buffer = await file.arrayBuffer()

        const data = await s3.send(
            new PutObjectCommand({
                Bucket: process.env.SPACES_NAME!,
                Key: fileId,
                Body: Buffer.from(buffer)
            })
        )

        return NextResponse.json({ message: "success : object uploaded to bucket", key: fileId})
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ error: ("failure : failed to upload object") }, { status: 500 })
    }
}