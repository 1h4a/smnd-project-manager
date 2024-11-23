'use client';
import { Button, Input, Listbox, ListboxButton, ListboxOption, ListboxOptions  } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'

const projects = [
    { id: 1, name: 'Práca 1' },
    { id: 2, name: 'Práca 2' },
    { id: 3, name: 'Práca 3' },
    { id: 4, name: 'Práca 4' },
    { id: 5, name: 'Práca 5' },
]
export default function Page() {
    const [selected, setSelected] = useState(projects[0])
    return (
        <div className="w-screen pr-48 h-fit items-center justify-start overflow-y-hidden pb-4">
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8"> Nahrané súbory </h1>
            <div className="mx-8 mt-3 flex flex-row items-center w-full">
                <span className="flex flex-row items-center w-auto pr-2">
                    <p className="pr-2">Projekt: </p>
                    <Listbox value={selected} onChange={setSelected}>
                    <ListboxButton className={clsx(
                        'w-fit text-darkgray text-nowrap truncare rounded-lg outline-2 -outline-offset-2 outline-black/50 bg-ngray py-1.5 px-4 [--anchor-gap:var(--spacing-1)]',
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
                        'py-1.5 px-3 block w-full rounded-lg border-none bg-ngray text-md text-black',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/5'
                        )}
                        placeholder="Vyhľadávanie podľa témy, študenta, učiteľa..."
                    />

            </div>
        </div>
    );
}