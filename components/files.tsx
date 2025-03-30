"use client"

// Components

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CircleArrowDown, CircleArrowUp, CircleEllipsis, CircleHelp, CirclePlus, CircleX, Info, Copy} from "lucide-react";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {MultiDialog} from "@/components/ui/multi-dialog";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/ui/components/dialog";
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
    DialogDescription, DialogFooter, DialogHeader,
    DialogPortal,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Label
} from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Functions

import React, {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

// Types

import { type Role, type AccessType } from "@/lib/types"

// Utils

function transformFileSize(size: number) {
    const limit = 2 // Decimal count limit

    type Units = "B" | "kB" | "MB" | "GB"

    let _size = size
    let unit: Units = "B"

    if (size >= 1024) {
        if (size > 1024*1024) {
            if (size > 1024*1024*1024) {
                _size = size/1024/1024/1024
                unit = "GB"
            }
            else {
                _size = size/1024/1024
                unit = "MB"
            }
        }
        else {
            _size = size/1024
            unit = "kB"
        }
    }

    const split = _size.toString().split(".")
    let decimals = ""
    if (split.length > 1) {
        decimals = "." + split[1].substring(0, limit)
    }

    const out = split[0] + decimals

    return out + unit
}
import { toast } from "sonner"
import clsx from "clsx";

// -*-

interface PSProps {
    projects: any[]
}

export function ProjectSelector ({ projects }: PSProps) {
    const [selectedProject, setSelectedProject] = useState(projects[0].topic)

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [, startTransition] = useTransition();

    const updateObject = (selection: string) => {
        const index = projects.findIndex((project) => project.topic === selection)
        setSelectedProject(selection)

        const updatedSearchParams = new URLSearchParams(searchParams)

        if(selection) {
            updatedSearchParams.set("p", index.toString())
        }
        else {
            updatedSearchParams.delete("p")
        }

        startTransition(() => {
            router.replace(`${pathname}?${updatedSearchParams.toString()}`)
        })
    }

    return (
        <Select value={selectedProject} onValueChange={(e) => updateObject(e)}>
            <SelectTrigger>
                <SelectValue placeholder="Projekt"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {projects.map((project) => (
                        <SelectItem value={project.topic}
                                    key={"p_" + project.id}> {project.topic}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

const views = [
    { id: 1, name: 'Názov' },
    { id: 2, name: 'Posledná zmena' },
    { id: 3, name: 'Dátum vytvorenia' },
]

interface FWProps {
    children: React.ReactNode,
    projectId: string,
    userId: string
}

export function FileWindow({ children, projectId, userId }: FWProps) {
    // Router

    const router = useRouter()

    // Visual states

    const [open, setOpen] = useState(false)
    const [sortMethod, setSortMethod] = useState(views[0].name)

    // Form

    const fileSizeLimit = 50 // File size limit in megabytes, changeable
    const fsLimit = fileSizeLimit * 1024 * 1024 // File size limit in bytes

    const formSchema = z.object({
        file: typeof window === 'undefined' ? z.undefined() : z.instanceof(FileList)
            .refine((file) => file?.length > 0, 'A file is required.')
            .refine((file) => file?.length < 2, 'Only one file may be uploaded at a time.')
            .transform((file) => file[0] as File)
            .refine((file) => file?.size <= fsLimit, ('File size should not exceed ' + fileSizeLimit + 'MB'))
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const fileRef = form.register("file");

    // File upload

    async function upload(file: any, project: string, user: string) { // Raw S3 upload request function
        // Construct request body
        const uploadContent = new FormData()
        uploadContent.append('file', file)
        uploadContent.append('project', project)
        uploadContent.append('user', user)

        const uploadResponse = await fetch('/api/upload', {
            method: "POST",
            body: uploadContent,
        })
        if (uploadResponse.ok) {
            console.log("s3 ok")
        }
        else {
            console.error("s3 upload failure: " + await uploadResponse.json())
        }
    }

    const handleUpload = async (values: z.infer<typeof formSchema>) => { // Handler which works with form submission
        setOpen(false)
        toast.promise((upload(values?.file!, projectId, userId)), {
            loading: 'Súbor sa nahráva',
            success: () => {
                router.refresh()
                return 'Súbor bol nahraný'
            },
            error: 'Nastala chyba'
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                                    <CircleArrowUp />
                                    Zdieľať
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
                                    <ContextMenuCheckboxItem disabled>
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
                                    {
                                        children
                                    }
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
                    <form onSubmit={form.handleSubmit(handleUpload)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nahrať súbor</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            placeholder="File Upload"
                                            multiple
                                            {...fileRef}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Akýkoľvek súbor - maximálne {fileSizeLimit}MB
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
    )
}

interface FileProps {
    // Identifiers
    name: string,
    objectKey: string,
    creatorName: string,
    projectName: string,
    // Persistency
    persistent: boolean,
    psUpdateAction: (state: boolean, key: string) => void // Server action for updating persistency
    // Sharing
    access: AccessType
    acUpdateAction: (access: AccessType, key: string) => void // Server action for updating access
    // Dates
    createdAt: string, // Stored as string, transform using Date()
    updatedAt: string,
    // Other attributes
    size: number // In bytes, call transformFileSize() to get a readable format
    role: Role // The role of the current user
}

export function File({ name, objectKey, creatorName, projectName, persistent, psUpdateAction, access, acUpdateAction, createdAt, updatedAt, size, role }: FileProps) {
    // Router
    const router = useRouter();

    // MultiDialog Modals
    type Modals = "delete" | "rename" | "properties" | "share" ;

    // Visual states
    const [deleteChecked, setDeleteChecked] = useState(persistent)
    const [accessState, setAccessState] = useState((access == "PUBLIC"))

    // File Manipulation Functions
    async function updatePersistency() { // Calls an action on the server to update the persistent field for the given file in the DB
        psUpdateAction(!deleteChecked, objectKey) // Server action
        setDeleteChecked(!deleteChecked) // Update local visual state
    }
    async function updateAccess(state: string) { // Calls an action on the server to update the access field for the given file in the DB
        const temp = (state == "public")
        setAccessState(temp) // Update local visual state
        acUpdateAction((state == "public") ? "PUBLIC" : "PRIVATE", objectKey) // Server action
    }

    async function download() { // Downloads this file on the client
        try {
            const response = await fetch("/api/download", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({key: objectKey}),
            });

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            toast(`Súbor ${name} sa sťahuje`)

            link.href = url;
            link.download = name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
        catch (error) {
            console.error("Download error: ", error);
            toast.error(`Nastala chyba pri sťahovaní súboru ${name}`)
        }
    }

    async function rename(values: z.infer<typeof formSchema>) {
        try {
            const _newName = values.name + "." + fileType
            const response = await fetch("/api/rename", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: objectKey, name: _newName }),
            });

            const result = await response.json()
            if (!response.ok) console.error(result.error || "Rename failed")
            toast.success(`Súbor ${name} bol premenovaný na ${_newName}`)
            router.refresh()
        }
        catch (error) {
            console.error("Rename error: ", error)
            toast.error("Nastala chyba pri premenovaní súboru")
        }
    }

    async function drop(id: string) { // wdym "delete is a reserved word that cannot be used here"
        try {
            const response = await fetch("/api/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({key: id})
            })

            const result = await response.json()
            if (!response.ok) console.error(result.error || "Failed to delete file")
            toast.success(`Súbor ${name} bol vymazaný`)
            router.refresh()
        }
        catch (error) {
            toast.error("Nastala chyba pri vymazávaní súboru")
            console.error("Delete error: ", error)
        }
    }

    // Dates
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

    // Form
    const formSchema = z.object({
        name: z.string()
            .min(1, "Filename cannot be empty")
            .max(255, "Filename is too long")
            .regex(/^[^<>:"/\\|?*\x00-\x1F]+$/, "Invalid characters in filename")
            .refine((name) => !name.endsWith("."), "Filename cannot end with a dot")
            .refine((name) => name.trim() === name, "Filename cannot have leading or trailing spaces"),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const nameRef = form.register("name");

    // Misc
    const destructuredName = name.split('.')
    const fileType = destructuredName[destructuredName.length-1]

    let fileLink = process.env.NEXT_PUBLIC_SYSTEM_URL + "/api/serve/" + objectKey
    console.log(process.env.NEXT_PUBLIC_SYSTEM_URL)
    const copyLink = () => {
        toast.success('Odkaz bol skopírovaný do schránky')
        navigator.clipboard.writeText(fileLink)
    }

    let criticalIndexErrorPreventsRefresh = false // This should never evaluate to true, it's left here for redundancy purposes and in case the software changes.

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
                        <CirclePlus/>
                        Nahrať súbor
                    </ContextMenuItem>
                    <mdb.Trigger value="rename">
                        <ContextMenuItem inset>
                            <CircleEllipsis/>
                            Premenovať
                        </ContextMenuItem>
                    </mdb.Trigger>
                    <mdb.Trigger value="share">
                        <ContextMenuItem inset>
                            <CircleArrowUp />
                            Zdieľať
                        </ContextMenuItem>
                    </mdb.Trigger>
                    <ContextMenuItem inset onSelect={download}>
                        <CircleArrowDown/>
                        Stiahnuť súbor
                    </ContextMenuItem>
                    <mdb.Trigger value="properties">
                        <ContextMenuItem inset>
                            <Info/>
                            Podrobnosti
                        </ContextMenuItem>
                    </mdb.Trigger>
                    <ContextMenuSeparator/>
                    <TooltipTrigger asChild>
                        <ContextMenuCheckboxItem checked={deleteChecked} onCheckedChange={updatePersistency}>
                            <CircleHelp className="text-darkgray"/>
                            Nevymazávať
                        </ContextMenuCheckboxItem>
                    </TooltipTrigger>
                    <TooltipContent>
                        Po ukončení projektu sa uchovávajú iba súbory označené "nevymazávať".
                    </TooltipContent>
                    <ContextMenuSeparator/>
                    <mdb.Trigger value="delete">
                        <ContextMenuItem inset className="text-red-500">
                            <CircleX className="text-red-500"/>
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
                                    onClick={() => {
                                        setOpen(null);
                                        drop(objectKey)
                                    }}
                                    className="bg-red-400 w-fit h-fit text-white rounded-lg font-normal text-base px-5 mt-4 mr-4 hover:bg-red-500 transition-colors">Vymazať
                                    súbor</Button>
                            </DialogFooter>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>
            </mdb.Container>
            <mdb.Container value="share">
                <Dialog>
                    <DialogPortal>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Zdieľať súbor</DialogTitle>
                                <DialogDescription>Súbor je možné zdieľať iba ak je verejný. V prípade že je verejný, je k dispozícií odkaz na prezdieľanie.</DialogDescription>
                            </DialogHeader>
                            <DialogBody>
                                <Label className="mb-4"> Nastaviť súbor ako... </Label>
                                <RadioGroup className="items-start justify-start" defaultValue={accessState ? "public" : "private"} onValueChange={(v) => updateAccess(v)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="public" id="public-rg"/>
                                        <Label htmlFor="public-rg">Verejný</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="private" id="private-rg"/>
                                        <Label htmlFor="private-rg">Súkromný</Label>
                                    </div>
                                </RadioGroup>
                                <Label className="mt-4 mb-2"> Odkaz na súbor </Label>
                                <div className={clsx({"flex flex-row justify-between items-center border-input flex h-9 max-w-full min-w-0 h-fit rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" : true,
                                    "pointer-events-none opacity-50" : !accessState
                                })}>
                                    {accessState ? fileLink : "Súbor je súkromný"}
                                    <button onClick={() => {
                                        setOpen(null);
                                        copyLink()}}>
                                    <Copy className="text-textgray cursor-pointer hover:text-darkgray transition-colors" size={16} /></button>
                                </div> {/* Input element styling */}
                            </DialogBody>
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
                                {(criticalIndexErrorPreventsRefresh &&
                                    <span className="flex flex-row items-start justify-between w-full"><p>Tento súbor ešte nebol lokálne indexovaný. </p> <p
                                        className="text-darkgray">Obnovte si stránku.</p></span>)}
                                {(!criticalIndexErrorPreventsRefresh && (<><span
                                    className="flex flex-row items-start justify-between w-full"><p>Veľkosť súboru: </p> <p
                                    className="text-darkgray">{transformFileSize(size)}</p></span>
                                    <span
                                        className="flex flex-row items-start justify-between w-full"><p>Meno súboru: </p> <p
                                        className="text-darkgray">{name}</p></span>
                                    <span className="flex flex-row items-start justify-between w-full"><p>Autor: </p> <p
                                        className="text-darkgray">{creatorName}</p></span>
                                    <span className="flex flex-row items-start justify-between w-full"><p>Projekt: </p> <p
                                        className="text-darkgray">{projectName}</p></span>
                                    <span
                                        className="flex flex-row items-start justify-between w-full"><p>Typ súboru: </p> <p
                                        className="text-darkgray">{fileType}</p></span>
                                    <span className="flex flex-row items-start justify-between w-full"><p>Dátum vytvorenia: </p> <p
                                        className="text-darkgray">{creationDate}</p></span>
                                    <span className="flex flex-row items-start justify-between w-full"><p>Dátum poslednej úpravy: </p> <p
                                        className="text-darkgray">{updateDate}</p></span>
                                    {(role == "ADMIN" &&
                                        <span className="flex flex-row items-start justify-between w-full"><p>Object Key: </p> <p
                                            className="text-darkgray">{objectKey}</p></span>)}</>))}
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
                                <DialogDescription>Premenuje vybraný súbor. Zmení iba meno súboru - typ súboru nie je
                                    možné zmeniť.</DialogDescription>
                            </DialogHeader>
                            <DialogBody>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(rename)} className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Nové meno súboru</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder={destructuredName[0]}
                                                            {...nameRef}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form>
                            </DialogBody>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>
            </mdb.Container>
        </>)}
    </MultiDialog>)
}