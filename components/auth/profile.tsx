"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
export function Profile() {
    const { data: session } = useSession();
    if (session?.user?.name != null) {
        return <div className="flex flex-row items-center justify-center">
            <Image
                src={session.user.image ?? "user.svg"}
                width={48}
                height={48}
                alt="Profile picture"
                className="rounded-full"
            ></Image>
            <span className="flex flex-col">
                <p className="mx-8 my-1 text-lg font-medium">{session.user.name}</p>
                <p className="mx-8 my-1 text-lg font-medium">{session.user.id}</p>
                <p className="mx-8 my-1 text-lg font-medium">{session.user.email}</p>
                </span>
        </div>
    }
    return <div className="flex flex-row items-center justify-center"><div className="bg-gray-500 text-gray-500 p-8 px-11 rounded-full">.</div>
        <span className="flex flex-col"><p className="mx-8 my-1 text-lg font-medium">User Name</p> <p
            className="mx-8 my-1 text-lg font-medium">User ID</p>
        <p
            className="mx-8 my-1 text-lg font-medium">User Email</p></span></div>
}