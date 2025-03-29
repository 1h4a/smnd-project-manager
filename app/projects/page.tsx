import Link from 'next/link';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Button } from "@/components/ui/button"
import { auth } from "@/auth"
import { prisma } from "@/prisma"
import {getPermissionLevel} from "@/lib/types";
import {ProjectList_Extended} from "@/components/projects";

export default async function Page() {
    const session = await auth()

    const user = await prisma.user.findUnique({
        where: {
            id: session?.user?.id!
        },
        select: {
            projects: {
                select: {
                    topic: true,
                    assigned: true,
                    type: true,
                    completed: true,
                    altTimeline: true
                }
            },
            role: true
        }
    })

    const role = user?.role
    const authLx = getPermissionLevel(role!)

    return (
        <div className="flex flex-col justify-normal h-full overflow-auto pb-4">
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8"> Moje práce </h1>
            <div className="flex flex-row shrink-0 grow-0 w-full pr-8 h-fit pb-12 overflow-y-hidden overflow-x-scroll">
               <ProjectList_Extended
                   data={user}
                   authLx={authLx}
               />
            </div>
                <span className="ml-8 text-lg">
                    <Link
                    href="/projects/list">
                        <Button
                            className="bg-ngray text-darkgray rounded-lg font-normal text-lg py-6 px-5 mt-4 mr-4 hover:bg-gray-100 transition-colors" >Zoznam všetkých projektov</Button>
                    </Link>
                    <Button
                        className="bg-ngray text-darkgray rounded-lg font-normal text-lg py-6 px-5 mt-4 mr-4 hover:bg-gray-100 transition-colors">Vytvoriť nový projekt</Button>
                    <Button
                        className="bg-red-400 text-white rounded-lg font-normal text-lg py-6 px-5 mt-4 mr-4 hover:bg-red-500 transition-colors">Odstrániť prácu</Button>
                </span>
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8 mt-8"> Ostatné práce </h1>
            <Disclosure as="div" className="px-8 py-4" defaultOpen={false}>
                <DisclosureButton
                    className="group flex flex-row w-full items-center justify-start font-medium text-2xl text-ultradark">
                    <p className="transition-colors">Minulé Práce</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="ml-2 size-5 group-data-open:rotate-180">
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