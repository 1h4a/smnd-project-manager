"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
export function Profile() {
    const { data: session } = useSession();
    if (session?.user?.name != null) {
        return <div className="flex flex-row items-center justify-center">
            <span className="flex flex-col">
                <p className="mx-2 my-1 text-lg font-normal">{session.user.name}</p>
            </span>
            <Image
                src={session.user.image ?? "user.svg"}
                width={32}
                height={32}
                alt="Profile picture"
                className="rounded-full mr-4"
            ></Image>
        </div>
    }
    return <div className="flex flex-row items-center justify-center"><div className="bg-gray-500 text-gray-500 p-8 px-11 rounded-full">.</div>
        <span className="flex flex-col"><p className="mx-8 my-1 text-lg font-medium">Not logged in.</p></span></div>
}