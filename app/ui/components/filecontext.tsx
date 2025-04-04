﻿import React, { useState, useEffect } from 'react'
import {CirclePlus} from "lucide-react";
interface ContextMenuProps {
    x: number
    y: number
    onClose: () => void
}
const FileContext: React.FC<ContextMenuProps> = ({ x, y, onClose }) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
        const handleClick = (e: MouseEvent) => {
            const el = e.target;
            if ((el as HTMLElement).closest('.context-menu') === null) {
                onClose()
            }
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [onClose])

    if (!mounted) return null

    return (
        <div
            className="fixed z-50 context-menu bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden"
            style={{top: y, left: x}}
        >
            <div className="px-1 py-1 text-md">
                <button
                    className="group flex rounded-md items-center w-full px-2 py-2 text-darkgray hover:bg-gray-100 hover:text-gray-900"
                >
                    <CirclePlus />
                    Nahrať súbor
                </button>
                <button
                    className="group flex rounded-md items-center w-full px-2 py-2 text-darkgray hover:bg-gray-100 hover:text-gray-900"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    Premenovať
                </button>
                <button
                    className="group flex rounded-md items-center w-full px-2 py-2 text-darkgray hover:bg-gray-100 hover:text-gray-900"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    Stiahnuť súbor
                </button>
                <button
                    className="group flex rounded-md items-center w-full px-2 py-2 text-darkgray hover:bg-gray-100 hover:text-gray-900"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                    </svg>
                    Podrobnosti
                </button>
                <div className="my-0.5 h-px bg-textgray/30" role="none"></div>
                <button
                    className="group flex rounded-md items-center w-full px-2 py-2 text-red-500 hover:bg-gray-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    Vymazať súbor
                </button>
            </div>
        </div>
    )
}

export default FileContext