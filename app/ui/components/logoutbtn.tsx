"use client"

import { signOut } from "next-auth/react"
import {Button} from "@headlessui/react";

export default function SignOut() {
    return <Button
        className="inline-flex rounded w-fit bg-almostblack items-center text-white 2xl:text-lg lg:text-md text-base  hover:bg-ultradark active:bg-gray-900 hover:outline-1 hover:outline-gray-300 transition-colors"
        onClick={() => signOut()}> Sign Out </Button>
    {/*<button onClick={() => signIn("microsoft-entra-id")}>Sign In</button>*/}
}