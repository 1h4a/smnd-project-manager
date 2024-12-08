'use client'

import Link from 'next/link';
import { Disclosure, DisclosureButton, DisclosurePanel, Button } from '@headlessui/react'
import {intAuth, loginControl} from '@/lib/shared-utils'

let permission: number = 1; // Lx permission level
const PElement = (props: any) => {
    //
    return (
        <div className="mt-4 ml-8 w-fit h-fit divide-y divide-white/5 rounded-xl bg-white drop-shadow-xl shrink-0">
            <div className="p-6">
                <span
                    className="flex flex-row w-full justify-between text-2xl font-medium text-black p-2"> {/*Project name and consultant*/}
                    <p className="text-left w-1/2 truncate">{props.name}</p>
                <p className="font-normal text-textgray text-xl">{props.consultant}</p>
            </span>
                <p className="font-normal text-textgray mr-8 text-left ml-2 mb-2">{props.type}</p>
                <span
                    className="flex flex-row w-full justify-between text-2xl font-medium text-ultradark px-2 py-1"> {/*Nearest deadline - data instantiated from object props*/}
                    <a href="" className="flex items-center space-x-2">
                   <p className="font-medium"> Najbližší termín </p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="size-5">
                        <path fillRule="evenodd"
                              d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                              clipRule="evenodd"/>
                    </svg>
                </a>
                <p className="font-normal text-textgray text-xl">{props.ndDate + " " + props.ndName}</p>
            </span>
                <span
                    className="flex flex-row w-full justify-between text-2xl font-medium text-ultradark px-2 pt-1"> {/*Uploaded files link header*/}
                    <Link
                        key="Nahrané súbory"
                        href="/files"
                        className={"flex items-center space-x-2"}
                    >
                    <p className="font-medium"> Nahrané súbory </p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="size-5">
                        <path fillRule="evenodd"
                              d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                              clipRule="evenodd"/>
                    </svg>
                </Link>
            </span>
            </div>
            <span
                className="w-full flex flex-row justify-evenly bg-black/10 shadow-inner shadow-gray-200 "> {/*Latest files view - always 5> files - to-do: file fetching based on project id*/}
                <div className="flex flex-col justify-center items-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-darkgray">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> verzia3.docx </p>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-darkgray">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> graf.png </p>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-darkgray">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> prezen...pptx </p>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-darkgray">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> verzia2.docx </p>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-darkgray">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> dotaznik.xlsx </p>
                </div>
            </span>
            <div className="px-6 pt-2 pb-6">
                {(permission > 1) ? (
                    <div className="text-lg ">
                        <Button
                            className="bg-ngray text-darkgray rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-gray-100 transition-colors">Zmeniť tému</Button>
                        <Button
                            className="bg-ngray text-darkgray rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-gray-100 transition-colors">Zobraziť žiadosti</Button>
                    </div>
                ) : (
                    <div className="mt-2 text-lg ">
                        <Button
                            className="bg-ngray text-darkgray rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-gray-100 transition-colors">Požiadať
                            o zmenu témy</Button>
                        <Button
                            className="bg-ngray text-darkgray rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-gray-100 transition-colors">Nahrať
                            nový súbor</Button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default function Page() {
    loginControl()
    permission = intAuth();
    return (
        <div className="flex flex-col justify-normal h-full overflow-auto pb-4">
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8"> Moje práce </h1>
            <div className="flex flex-row shrink-0 grow-0 w-full pr-8 h-fit pb-12 overflow-y-hidden overflow-x-scroll">
                <PElement name="Téma práce" consultant="Meno Priezvisko" type="SOČ (Stredoškolská Odborná Činnosť)"
                          ndDate="6.5." ndName="Konzultácia"/>
                <PElement name="abcdahgregtwrefgvwsefwefwefwsefw adfgadsg a adgfagd adg adg adgaad"
                          consultant="Meno Priezvisko" type="SOČ (Stredoškolská Odborná Činnosť)" ndDate="6.5."
                          ndName="Konzultácia"/>
                <PElement name="Téma práce" consultant="Meno Priezvisko" type="SOČ (Stredoškolská Odborná Činnosť)"
                          ndDate="6.5." ndName="Konzultácia"/>
                <PElement name="abcdahgregtwrefgvwsefwefwefwsefw adfgadsg a adgfagd adg adg adgaad"
                          consultant="Meno Priezvisko" type="SOČ (Stredoškolská Odborná Činnosť)" ndDate="6.5."
                          ndName="Konzultácia"/>
            </div>
            {(permission > 1) && (
                <span className="ml-8 text-lg">
                    <Link
                    href="/projects/list">
                        <Button
                            className="bg-ngray text-darkgray rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-gray-100 transition-colors" >Zoznam všetkých projektov</Button>
                    </Link>
                    <Button
                        className="bg-ngray text-darkgray rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-gray-100 transition-colors">Vytvoriť nový projekt</Button>
                    <Button
                        className="bg-red-400 text-white rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-red-500 transition-colors">Odstrániť prácu</Button>
                </span>
            )}
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8 mt-8"> Ostatné práce </h1>
            <Disclosure as="div" className="px-8 py-4" defaultOpen={false}>
                <DisclosureButton
                    className="group flex flex-row w-full items-center justify-start font-medium text-2xl text-ultradark">
                    <p className="transition-colors">Minulé Práce</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="ml-2 size-5 group-data-[open]:rotate-180">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                    </svg>
                </DisclosureButton>
                <DisclosurePanel className="mt-2 text-lg">
                    <p> Content </p>
                </DisclosurePanel>
            </Disclosure>
        </div>
    );
}