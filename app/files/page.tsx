'use client';
import { Input, Listbox, ListboxButton, ListboxOption, ListboxOptions  } from '@headlessui/react'
import clsx from 'clsx'
import { useState, useCallback } from 'react'
import FileContext from '@/app/ui/components/filecontext'

const projects = [
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
export default function Page() {
    const [selected, setSelected] = useState(projects[0])
    const [altselected, altsetSelected] = useState(views[0])

    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)

    const handleContextMenu = useCallback((event: React.MouseEvent) => {
        event.preventDefault()
        const { clientX, clientY } = event
        console.log('Right-click detected:', { clientX, clientY })
        setContextMenu({ x: clientX -80, y: clientY-220 })
    }, [])

    const handleCloseContextMenu = useCallback(() => {
        console.log('Closing context menu')
        setContextMenu(null)
    }, [])

    return (
        <div className="w-full pr-32 h-[90vh] items-center justify-start overflow-hidden pb-16" >
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8"> Nahrané súbory </h1>
            <div className="mx-8 mt-3 flex flex-row items-center w-full">
                <span className="flex flex-row items-center w-auto pr-2">
                    <p className="pr-2">Projekt: </p>
                    <Listbox value={selected} onChange={setSelected}>
                    <ListboxButton className={clsx(
                        'w-fit text-darkgray text-nowrap truncate rounded-lg outline-2 -outline-offset-2 outline-black/50 bg-ngray py-1.5 px-4 [--anchor-gap:var(--spacing-1)]',
                        'outline-2 -outline-offset-2 outline-black/50'
                    )}><div className="flex flex-row">{selected.name}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-5 data-[closed]:rotate-180">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                </svg></div>

                    </ListboxButton>
                    <ListboxOptions anchor="bottom" className={clsx(
                        'w-fit text-darkgray rounded-xl outline-2 -outline-offset-2 outline-black/50 bg-ngray mt-2 p-1 [--anchor-gap:var(--spacing-1)]',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}>
                        {projects.map((project) => (
                            <ListboxOption key={project.id} value={project}
                                           className=" transition-colors truncate text-nowrap w-full max-w-[20vw] group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-textgray/20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="size-4 invisible  group-data-[selected]:visible">
                                    <path fillRule="evenodd"
                                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <div>{project.name}</div>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Listbox>
                </span>
                <Input
                    className={clsx(
                        'py-1.5 px-3 block w-full rounded-lg border-none bg-ngray text-md text-black truncate',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/5'
                    )}
                    placeholder="Vyhľadávanie podľa témy, študenta, učiteľa..."
                />

            </div>
            <div
                className="mt-4 ml-8 w-full h-5/6 divide-y rounded-xl bg-white drop-shadow-xl shrink-0 row-span-2" onContextMenu={handleContextMenu}>

                {contextMenu && (
                    <FileContext
                        x={contextMenu.x}
                        y={contextMenu.y}
                        onClose={handleCloseContextMenu}
                    />
                )}

                <span
                    className="w-full h-full pt-8 grid grid-rows-8 md:grid-cols-12 grid-flow-row gap-4 bg-black/10 shadow-inner shadow-gray-200 outline outline-1 outline-textgray/40 rounded-xl"> {/*Latest files view - always 5> files - to-do: file fetching based on project id*/}
                    <Listbox value={altselected} onChange={altsetSelected}>
                    <ListboxButton className={clsx(
                        'absolute justify-end flex flex-row right-2 top-2 w-fit text-darkgray text-nowrap truncate rounded-lg outline-2 -outline-offset-2 outline-black/50 py-1.5 px-4',
                        'outline-2 -outline-offset-2 outline-black/50'
                    )}><div className="flex flex-row">{altselected.name}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-5 data-[closed]:rotate-180 mt-0.5 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                </svg></div>

                    </ListboxButton>
                    <ListboxOptions anchor="bottom end" className={clsx(
                        'w-fit text-darkgray rounded-xl outline-2 -outline-offset-2 outline-black/50 bg-white mt-2 p-1',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}>
                        <p className="py-1.5 px-3">Zoradiť podľa</p>
                        {views.map((view) => (
                            <ListboxOption key={view.id} value={view}
                                           className=" transition-colors truncate text-nowrap w-full max-w-[20vw] group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-textgray/20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="size-4 invisible  group-data-[selected]:visible">
                                    <path fillRule="evenodd"
                                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                          clipRule="evenodd"/>
                                </svg>
                                <div>{view.name}</div>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Listbox>
                    <div className="flex flex-col justify-center items-center py-4">
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
        </div>
    );
}