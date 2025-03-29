import { prisma } from "@/prisma"
import { auth } from "@/auth"
import { FileManager } from '@/components/files'

const _projects = [
    { id: 1, name: 'Práca 1' },
    { id: 2, name: 'Práca 2' },
    { id: 3, name: 'Práca 3' },
    { id: 4, name: 'Práca 4' },
    { id: 5, name: 'Práca 5' },
]
const views = [
    { id: 1, name: 'Názov' },
    { id: 2, name: 'Posledná zmena' },
    { id: 3, name: 'Dátum vytvorenia' },
]

export default async function Page() {
    const session = await auth()
    const projects = await prisma.project.findMany({
        where: {
            assigned: {
                some: {
                    id: session?.user?.id
                }
            }
        },
        select: {
            topic: true,
            files: {
                select: {
                    id: true,
                    path: true,
                    persistent: true,
                    size: true,
                    createdAt: true,
                    updatedAt: true,
                    access: true,
                    project: true
                }
            },
            id: true,
        }
    })
    return (
        <FileManager projects={projects} views={views} />
    );
}