'use client';
import Link from "next/link";
import { useState, useCallback } from 'react'
import FileContext from '@/app/ui/components/filecontext'
import {intAuth, loginControl} from '@/lib/shared-utils'

let permission: number = 1;
const TLElement = (props: any) => {
    return (
        <div
            className="flex-none flex flex-col w-fit min-w-8 h-full rounded-3xl text-2xl text-left justify-center items-center">
            <div className="flex flex-col items-start px-10 pt-2">
                <p className="lg:text-xl xl:text-2xl 2xl:text-3xl"> {props.date} </p>
                <p className="font-medium lg:text-xl xl:text-2xl 2xl:text-3xl"> {props.name} </p>
            </div>
        </div>
    );
}


export default function Page() {
    loginControl()
    permission = intAuth();
    // add admin data edit options !

    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)

    const handleContextMenu = useCallback((event: React.MouseEvent) => {
        event.preventDefault()
        const { clientX, clientY } = event
        setContextMenu({ x: clientX -130, y: clientY-340 })
    }, [])

    const handleCloseContextMenu = useCallback(() => {
        setContextMenu(null)
    }, [])

    return (
        <div className="pb-4">
            <Link
                href="/projects/list"
                className="items-center justify-start flex-row flex text-darkgray">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-5 rotate-90">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                </svg>
                <p>Späť na zoznam projektov</p>
            </Link>
            <span
                className="flex flex-row w-full justify-between text-2xl font-medium text-black p-2"> {/*Project name and consultant*/}
                <div className="w-full flex flex-col">
                    <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl pt-4 text-left w-1/2 truncate">Téma práce</h1>
                    <p className="font-normal text-textgray text-left pt-2 pl-1">Stredoškolská Odborná Činnosť (SOČ)</p>
                    <div className="w-full flex flex-col text-xl text-darkgray pl-1 pt-2">
                        <p className="font-normal text-left">Priradení študenti: Meno Priezvisko</p>
                        <p className="font-normal text-left">Zodpovední učitelia: Meno Priezvisko</p>
                    </div>
                </div>
                <div className="w-1/3">
                    <p className="font-normal text-right text-textgray text-xl">Dátum vzniku: 25.8.2025</p>
                    <p className="font-normal text-right text-textgray text-xl">Dátum ukončenia: N/A</p>
                </div>
            </span>

            <div className="w-full h-[50vh] grid grid-cols-2 grid-rows-1 gap-x-16 gap-y-10 pb-8 pr-28">
                <div
                    className="mt-4 ml-8 w-full h-full divide-y divide-white/5 rounded-xl bg-white drop-shadow-xl shrink-0">
                    <Link
                        key="Nahrané súbory"
                        href="/files"
                        className={"flex items-center justify-between text-2xl font-medium px-8 py-6"}
                    >
                        <p className="font-medium text-black"> Nahrané súbory </p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-5 text-textgray">
                            <path fillRule="evenodd"
                                  d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </Link>
                    <span
                        onContextMenu={handleContextMenu}
                        className="w-full h-5/6 grid grid-rows-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-flow-row gap-4 bg-black/10 shadow-inner shadow-gray-200 pt-2"> {/*Latest files view - always 5> files - to-do: file fetching based on project id*/}
                        {contextMenu && (
                            <FileContext
                                x={contextMenu.x}
                                y={contextMenu.y}
                                onClose={handleCloseContextMenu}
                            />
                        )}
                        <div className="flex flex-col justify-center items-center py-4" >

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-docx">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> verzia3.docx </p>
                </div>
                <div className="flex flex-col justify-center items-center py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-uid-ft">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> graf.png </p>
                </div>
                <div className="flex flex-col justify-center items-center py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-pptx">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> prezen...pptx </p>
                </div>
                <div className="flex flex-col justify-center items-center py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-docx">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> verzia2.docx </p>
                </div>
                <div className="flex flex-col justify-center items-center py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-xlsx">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> dotaznik.xlsx </p>
                </div>
            </span>
                </div>
                <div
                    className="mt-4 ml-8 w-full h-full divide-y divide-white/5 rounded-xl bg-white drop-shadow-xl shrink-0">
                    <p
                        className={"flex items-center justify-between text-2xl font-medium px-8 pt-6"}
                    >
                        <p className="font-medium text-black"> Najblizšie termíny </p>
                    </p>
                    <div className="flex flex-row justify-start items-center py-4">
                        <TLElement name="Konzultácia" date="6.5." studentName="Meno Priezvisko"/>
                    </div>
                </div>
            </div>
        </div>
    );
}