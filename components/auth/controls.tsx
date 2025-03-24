"use client"
import { signIn, signOut } from "next-auth/react"

export function SignIn() {
    return <button className="bg-white text-black text-base font-medium rounded-xl m-2 p-2 hover:bg-white/80 transition-colors" onClick={() => signIn("microsoft-entra-id")}>Sign In</button>
}

export function SignOut() {
    return <button className="bg-red-400 text-white text-base font-medium rounded-xl m-2 p-2 hover:bg-red-500 transition-colors" onClick={() => signOut()}>Sign Out</button>
}