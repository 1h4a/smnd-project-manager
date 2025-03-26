"use client"
import { signIn, signOut } from "next-auth/react"
import clsx from "clsx";

interface ComponentProps {
    className?: string,
    text?: string
}

export function SignIn({className, text} : ComponentProps) {
    return <button className={clsx("text-black text-base font-normal", className)} onClick={() => signIn("microsoft-entra-id", undefined, { prompt: "login"})}>{"Prihlásiť sa"+(text != null ? " " + text : "")}</button>
}

export function SignOut({ className }: ComponentProps) {
    return <button className={clsx("text-black text-base font-normal", className)} onClick={() => signOut()}>Odhlásiť sa</button>
}