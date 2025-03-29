import {fetchTimeline, Timeline} from "@/components/timeline";
import { auth } from "@/auth"
import { prisma } from "@/prisma"
import {getPermissionLevel, Role} from "@/lib/types";
import {PLDElement, ProjectList_Simple} from "@/components/projects"
export default async function Page() {
    const session = await auth()
    const { user: data, error } = await fetchTimeline(session?.user?.id!)

    let role: Role = "STUDENT"
    let dbUser: any

    if (session) {
        dbUser = await prisma.user.findUnique({
            where: {
                id: session?.user?.id!
            },
            select: {
                projects: {
                    select: {
                        topic: true,
                        assigned: true,
                        type: true,
                        completed: true
                    }
                },
                role: true
            }
        })
        role = dbUser?.role!
    }

    const authLx = getPermissionLevel(role)

    return (
        <div className="flex flex-col justify-normal h-full overflow-auto pb-4">
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8"> Najbližšie termíny </h1>
            <div className="flex flex-row w-full h-fit pb-12 pt-8 overflow-x-scroll grow-0 shrink-0">
                <Timeline
                    user={data}
                    error={error}
                />

            </div>
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8"> Aktuálne Projekty </h1>
            <div className="flex flex-col w-1/2">
                <ProjectList_Simple data={dbUser} authLx={authLx}/>
            </div>
            {(authLx > 2) && (<a href="/admin" className="flex items-center space-x-2">
                <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8 mt-8"> Administrátorský panel </h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 mt-9">
                    <path fillRule="evenodd"
                          d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                          clipRule="evenodd"/>
                </svg>
            </a>)}
        </div>
    );
}