"use client"

// Components

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {
    ContextMenu, ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/ui/context-menu";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader, DialogPortal,
    DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Button} from '@/components/ui/button'
import {CircleArrowDown, CircleEllipsis, CircleHelp, CirclePlus, CircleX, Info} from "lucide-react";
import {MultiDialog} from "@/components/ui/multi-dialog";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/ui/components/dialog";

// Functions

import React, {useEffect, useState} from "react";
import clsx from "clsx";
import { z } from "zod"
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

// Types

import type {AccessType} from "@/lib/types"

// Server data

import { prisma } from "@/prisma"
import { auth } from "@/auth"
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

interface FileProps {
    path: string,
    id: string,
    size: number,
    createdAt: string,
    updatedAt: string,
    creatorId: string,
    persistent: boolean,
    access: AccessType,
    rel: string
}

type Modals = "delete" | "rename" | "properties" ;

function updateFile(id: string, name?: string, path?: string, persistent?: boolean) {
    useEffect(() => {
        async function updatePersistency() {
            const updateFile = await prisma.file.update({
                where: {
                    id: id
                },
                data: {
                    persistent: persistent
                }
            })
        }
        async function updateName() {
            let pathElements = path!.split('/')
            pathElements[pathElements.length] = name!
            const _path = pathElements.join('/')
            const updateFile = await prisma.file.update({
                where: {
                    id: id
                },
                data: {
                    path: _path
                }
            })
        }
        if (name != undefined && path != undefined) {
            updateName()
        }
        if (persistent != undefined) {
            updatePersistency()
        }
    })
}

function deleteFile(id: string) {
    let value = false
    useEffect(() => {
        let session: any
        async function getSession() {
            session = await auth()
        }
        getSession()
        async function getRole() {
            const user = await prisma.user.findUnique({
                where: {
                    id: session?.user?.id
                }
            })
            return user?.role
        }
        async function make() {
            const file = await prisma.file.findUnique({
                where: {
                    id: id
                },
                select: {
                    authorId: true
                }
            })
            if (file?.authorId == session?.user?.id || await getRole() == "ADMIN") {
                value = true
                await prisma.file.delete({
                    where: {
                        id: id
                    }
                })
            }
            else {
                value = false
            }
        }
    })
    return value
}

const FileComponent = ({ path, id, size, createdAt, updatedAt, creatorId, persistent, access, rel } : FileProps) => {
    const [deleteChecked, setDeleteChecked] = useState(persistent)

    if(!path) {
        return <></>
    }

    const pathElements = path.split('/')
    const name = pathElements[pathElements.length-1]
    console.log("File name: " + name)

    const nameElements = name.split('.')
    const fileType = nameElements[nameElements.length-1]
    console.log("File type: " + fileType)

    function changePersistency() {
        setDeleteChecked(!deleteChecked)
        updateFile(id, undefined, undefined, deleteChecked)
    }

    let creatorName = ""
    useEffect(() => {
        async function getName() {
            const name = await prisma.user.findUnique({
                where: {
                    id: creatorId
                },
                select: {
                    name: true
                }
            })
            creatorName = name?.name!
        }
        getName()
    })

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const _creationDate = new Date(createdAt)
    const creationDate = _creationDate.toLocaleDateString("sk-SK", options)

    const _updateDate = new Date(updatedAt)
    const updateDate = _updateDate.toLocaleDateString("sk-SK", options)

    return(<MultiDialog <Modals>>
        {(mdb, setOpen) => (<>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="flex flex-col justify-center items-center py-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="size-16 text-darkgray">
                            <path
                                d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                        </svg>
                        <p className="text-darkgray truncate max-w-32"> {name} </p>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem disabled inset>
                        <CirclePlus />
                        Nahrať súbor
                    </ContextMenuItem>
                    <mdb.Trigger value="rename">
                        <ContextMenuItem inset>
                            <CircleEllipsis />
                            Premenovať
                        </ContextMenuItem>
                    </mdb.Trigger>
                    <ContextMenuItem inset>
                        <CircleArrowDown />
                        Stiahnuť súbor
                    </ContextMenuItem>
                    <mdb.Trigger value="properties">
                        <ContextMenuItem inset>
                            <Info />
                            Podrobnosti
                        </ContextMenuItem>
                    </mdb.Trigger>
                    <ContextMenuSeparator />
                    <TooltipTrigger asChild>
                        <ContextMenuCheckboxItem checked={deleteChecked} onCheckedChange={changePersistency}>
                            <CircleHelp className="text-darkgray"/>
                            Nevymazávať
                        </ContextMenuCheckboxItem>
                    </TooltipTrigger>
                    <TooltipContent>
                        Po ukončení projektu sa uchovávajú iba súbory označené "nevymazávať".
                    </TooltipContent>
                    <ContextMenuSeparator />
                    <mdb.Trigger value="delete">
                        <ContextMenuItem inset className="text-red-500">
                            <CircleX className="text-red-500" />
                            Vymazať súbor
                        </ContextMenuItem>
                    </mdb.Trigger>
                </ContextMenuContent>
            </ContextMenu>
            <mdb.Container value="delete">
                <Dialog>
                    <DialogPortal>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Vymazať súbor</DialogTitle>
                                <DialogDescription>Vymaže vybraný súbor. <span className="font-medium">Vymazanie súboru nie je možné navrátiť.</span></DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button
                                    onClick={()=>{setOpen(null)}}
                                    className="bg-red-400 w-fit h-fit text-white rounded-lg font-normal text-base px-5 mt-4 mr-4 hover:bg-red-500 transition-colors">Vymazať súbor</Button>
                            </DialogFooter>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>
            </mdb.Container>
            <mdb.Container value="properties">
                <Dialog>
                    <DialogPortal>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Vlastnosti súboru</DialogTitle>
                            </DialogHeader>
                            <DialogBody className="flex flex-col items-start justify-start">
                                <span className="flex flex-row items-start justify-between w-full"><p>Veľkosť súboru: </p> <p className="text-darkgray">{size} bytes</p></span>
                                <span className="flex flex-row items-start justify-between w-full"><p>Meno súboru: </p> <p className="text-darkgray">{name}</p></span>
                                <span className="flex flex-row items-start justify-between w-full"><p>Autor: </p> <p className="text-darkgray">{creatorName}</p></span>
                                <span className="flex flex-row items-start justify-between w-full"><p>Projekt: </p> <p className="text-darkgray">{rel}</p></span>
                                <span className="flex flex-row items-start justify-between w-full"><p>Typ súboru: </p> <p className="text-darkgray">{fileType}</p></span>
                                <span className="flex flex-row items-start justify-between w-full"><p>Dátum vytvorenia: </p> <p className="text-darkgray">{creationDate}</p></span>
                                <span className="flex flex-row items-start justify-between w-full"><p>Dátum poslednej úpravy: </p> <p className="text-darkgray">{updateDate}</p></span>
                                <span className="flex flex-row items-start justify-between w-full"><p>Lokácia na serveri: </p> <p className="text-darkgray">{path}</p></span>
                            </DialogBody>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>
            </mdb.Container>
            <mdb.Container value="rename">
            <Dialog>
                <DialogPortal>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Premenovať súbor</DialogTitle>
                            <DialogDescription>Premenuje vybraný súbor.</DialogDescription>
                        </DialogHeader>
                        <DialogBody>
                            <Input placeholder="Meno súboru"/>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                onClick={()=>{setOpen(null)}}
                                className="bg-ngray w-fit h-fit text-darkgray rounded-lg font-normal text-base px-5 mt-4 mr-4 hover:bg-gray-100 transition-colors">Premenovať</Button>
                        </DialogFooter>
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        </mdb.Container>
        </>)}
    </MultiDialog>)
}

interface CreationProps {
    files: any[]
}

function CreateFiles({ files }: CreationProps) {
    return (<div>
        {files.map((el) => {
            return <p></p>
    })}
    </div>)
}

interface ManagerProps {
    projects: any[]
    views: any[]
}
export function FileManager({ projects, views }: ManagerProps) {
    const [selectedProject, setSelectedProject] = useState(projects[0].topic)
    const [sortMethod, setSortMethod] = useState(views[0].name)

    const [deleteChecked, setDeleteChecked] = useState(false)
    const [formOpen, setFormOpen] = useState(false)

    const index = projects.findIndex(project => project.topic === selectedProject)
    const selectedObject = projects[index] // woop woop

    const context = typeof window === 'undefined'

    const formSchema = z.object({
        file: context ? z.any() : z.instanceof(FileList).refine((file) => file?.length == 1, 'A file is required.').optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function submitForm(values: z.infer<typeof formSchema>) {
        setFormOpen(false)
    }

    const fileRef = form.register("file");

    return (<div className="w-full pr-32 h-[90vh] items-center justify-start overflow-hidden pb-16" >
        <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8"> Nahrané súbory </h1>
        <div className="mx-8 mt-3 flex flex-row items-center w-full">
                <span className="flex flex-row items-center w-auto pr-2">
                    <p className="pr-2">Projekt: </p>
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger>
                            <SelectValue placeholder="Projekt" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {projects.map((project) => (
                                    <SelectItem value={project.topic} key={"p_"+project.id}> {project.topic}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </span>
            <Input
                className={clsx(
                    'py-1.5 px-3 block w-full rounded-lg border-none bg-ngray text-md text-black truncate',
                    'focus:outline-hidden data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/5'
                )}
                placeholder="Vyhľadávanie podľa témy, študenta, učiteľa..."
            />

        </div>
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <ContextMenu>
                <TooltipProvider>
                    <Tooltip>
                        <ContextMenuTrigger>
                            <ContextMenuContent>
                                <DialogTrigger>
                                    <ContextMenuItem inset>
                                        <CirclePlus />
                                        Nahrať súbor
                                    </ContextMenuItem>
                                </DialogTrigger>
                                <ContextMenuItem disabled inset>
                                    <CircleEllipsis />
                                    Premenovať
                                </ContextMenuItem>
                                <ContextMenuItem disabled inset>
                                    <CircleArrowDown />
                                    Stiahnuť súbor
                                </ContextMenuItem>
                                <ContextMenuItem disabled inset>
                                    <Info />
                                    Podrobnosti
                                </ContextMenuItem>
                                <ContextMenuSeparator />
                                <TooltipTrigger asChild>
                                    <ContextMenuCheckboxItem disabled checked={deleteChecked} onCheckedChange={setDeleteChecked}>
                                        <CircleHelp className="text-darkgray"/>
                                        Nevymazávať
                                    </ContextMenuCheckboxItem>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Po ukončení projektu sa uchovávajú iba súbory označené "nevymazávať".
                                </TooltipContent>
                                <ContextMenuSeparator />
                                <ContextMenuItem disabled inset className="text-red-500">
                                    <CircleX className="text-red-500" />
                                    Vymazať súbor
                                </ContextMenuItem>
                            </ContextMenuContent>
                            <div
                                className="mt-4 ml-8 w-full h-5/6 divide-y rounded-xl bg-white drop-shadow-xl shrink-0 row-span-2">

                                {/*contextMenu && (
                            <FileContext
                                x={contextMenu.x}
                                y={contextMenu.y}
                                onClose={handleCloseContextMenu}
                            />
                        )*/}

                                <span
                                    className="w-full h-full p-8 grid auto-rows-max md:grid-cols-12 grid-flow-row gap-4 bg-black/10 shadow-inner shadow-gray-200 outline-1 outline-textgray/40 rounded-xl overflow-y-scroll">
                    <span className="absolute top-2 right-2">
                        <Select value={sortMethod} onValueChange={setSortMethod}>
                        <SelectTrigger className="bg-none shadow-none">
                            <SelectValue placeholder="Zoradiť podľa"/>
                        </SelectTrigger>
                        <SelectContent position="popper" align="end">
                            <SelectGroup>
                                {views.map((view, i) => (
                                    <SelectItem key={"v"+view.id+i} value={view.name}>{view.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    </span>
                                    {/*Files go here*/}
                                    <FileComponent path={"abcd/abcd/name.docx"} id={""} size={0} createdAt={""} updatedAt={""} creatorId={""} persistent={true} access={"PUBLIC"} rel={""} />
                    </span>
                            </div>
                        </ContextMenuTrigger>
                    </Tooltip>
                </TooltipProvider>
            </ContextMenu>
            <DialogContent>
                    <DialogTitle>Nahrať súbor</DialogTitle>
                <VisuallyHidden><DialogDescription>Nahrať súbor</DialogDescription></VisuallyHidden>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nahrať súbor</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            placeholder="shadcn"
                                            {...fileRef}
                                            onChange={(event) => {
                                                field.onChange(event.target?.files?.[0] ?? undefined);
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Akýkoľvek súbor - maximálne 15MB
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </div>);
}