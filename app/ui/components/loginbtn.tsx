"use client"

import { signIn } from "next-auth/react"
import {Button} from "@headlessui/react";

export default function SignIn() {
    return <Button
        className="inline-flex rounded w-fit bg-almostblack py-2 px-4 my-8 text-white 2xl:text-xl lg:text-lg text-base  hover:bg-ultradark active:bg-gray-900 hover:outline-1 hover:outline-gray-300 transition-colors"
        onClick={() => signIn("microsoft-entra-id", { redirectTo: "/dashboard" })}> Sign In with Microsoft </Button>
    {/*<button onClick={() => signIn("microsoft-entra-id")}>Sign In</button>*/}
}