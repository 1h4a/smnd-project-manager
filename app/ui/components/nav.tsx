"use client"

import NavLinks from '@/app/ui/components/navlinks';
import { useAuth } from "@/lib/auth-context"
import { Profile } from "@/components/auth/profile"
import SignOut from "@/app/ui/components/logoutbtn";
export default function Nav() {
    const { role, setRole } = useAuth()
    return (
        <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between bg-white shadow-lg">
            <a href="/" className="pl-5 py-2.5 w-fit">
                <img src="/logo-full.svg" className="hidden md:block" alt="Domov"/>
                <img src="/icon.svg" className="block md:hidden" alt="Domov"/>
            </a>
            <div className="flex flex-row">
                <NavLinks/>
                <SignOut/>
            </div>
                <a href="/" className="flex items-center justify-center">
                    {/*<p className="mr-3 md:block hidden">
                        Meno Priezvisko
                    </p>*/}
                </a>
        </header>
);
}
