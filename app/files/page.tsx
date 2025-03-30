import { prisma } from "@/prisma"
import { auth } from "@/auth"
import {FileWindow, ProjectSelector, File} from '@/components/files'
import {Input} from "@/components/ui/input";
import clsx from "clsx";
import React from "react";
import { type AccessType } from "@/lib/types"

const _projects = [
    { id: 1, name: 'Práca 1' },
    { id: 2, name: 'Práca 2' },
    { id: 3, name: 'Práca 3' },
    { id: 4, name: 'Práca 4' },
    { id: 5, name: 'Práca 5' },
]

export default async function Page({ searchParams } : { searchParams : {p?: number}}) {
    const session = await auth()
    const user = await prisma.user.findUnique({
        where: {
            id: session?.user?.id
        },
        select: {
            role: true
        }
    })

    const sp = (await searchParams).p
    const getProjects = async () => {
        return await prisma.project.findMany({
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
                        name: true,
                        key: true,
                        persistent: true,
                        size: true,
                        createdAt: true,
                        updatedAt: true,
                        access: true,
                        project: {
                            select: {
                                id: true,
                                topic: true
                            }
                        },
                        author: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                id: true,
            }
        })
    }
    const role = user?.role!

    const projects = await getProjects()

    let selectedProject: any

    if (!sp) {
        selectedProject = projects[0]
    }
    else {
        selectedProject = projects[sp]
    }

    const updatePersistency = async (state: boolean, key: string) => {
        'use server'
        await prisma.file.update({
            where: {
                project: {
                    id: selectedProject.id
                },
                key: key
            },
            data: {
                persistent: state
            }
        })
    }

    const updateAccess = async (access: AccessType, key: string) => {
        'use server'
        await prisma.file.update({
            where: {
                project: {
                    id: selectedProject.id
                },
                key: key
            },
            data: {
                access: access
            }
        })
    }

    return (
        <div className="w-full pr-32 h-[90vh] items-center justify-start overflow-hidden pb-16">
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8"> Nahrané súbory </h1>
            <div className="mx-8 mt-3 flex flex-row items-center w-full">
                <span className="flex flex-row items-center w-auto pr-2">
                    <p className="pr-2">Projekt: </p>
                    <ProjectSelector projects={projects} />
                </span>
                <Input
                    className={clsx(
                        'py-1.5 px-3 block w-full rounded-lg border-none bg-ngray text-md text-black truncate',
                        'focus:outline-hidden data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/5'
                    )}
                    placeholder="Vyhľadávanie podľa témy, študenta, učiteľa..."
                />

            </div>
            <FileWindow projectId={selectedProject.id} userId={session?.user?.id!}>
                <>
                    {selectedProject.files.map((file: any, i: number) => {
                        return <File key={i} name={file.name} objectKey={file.key} creatorName={file.author.name} projectName={file.project.topic} persistent={file.persistent} access={file.access} acUpdateAction={updateAccess} psUpdateAction={updatePersistency} createdAt={file.createdAt} updatedAt={file.updatedAt} size={file.size} role={role} />
                    })}
                </>
            </FileWindow>
        </div>
            );
            }