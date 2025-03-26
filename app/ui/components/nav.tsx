import NavLinks from '@/app/ui/components/navlinks';
import { Profile } from "@/components/auth/profile"
import { SignOut } from "@/components/auth/controls";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { auth } from "@/auth"
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import { prisma } from "@/prisma"
import { formatCaps } from "@/lib/utils"

export default async function Nav() {
    const session = await auth()
    if (session) {
        const dbUser = await prisma.user.findUnique({
            where: {
                id: session?.user?.id
            },
            select: {
                role: true
            }
        })
        const role = dbUser?.role!
        return (
            <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between bg-white shadow-lg">
                <a href="/" className="pl-5 py-2.5 w-fit">
                    <img src="/logo-full.svg" className="hidden md:block" alt="Domov"/>
                    <img src="/icon.svg" className="block md:hidden" alt="Domov"/>
                </a>
                <div className="flex flex-row">
                    <NavLinks/>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger><span><Profile/></span></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel className="text-base font-normal flex flex-col items-start justify-start">
                            <div className="flex flex-row items-center justify-between w-full">
                                <div className="flex flex-col items-start justify-center">
                                    <p>{session?.user?.name!}</p>
                                    <p>{formatCaps(role)}</p>
                                </div>
                                <Avatar className="ml-2 w-10 h-10">
                                    <AvatarImage src={session?.user?.image! ?? "user.svg"}/>
                                </Avatar>
                            </div>
                            <p className="text-sm text-textgray mt-1"> {session?.user?.email!}</p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem><p className="text-base">Nahlásiť Problém</p></DropdownMenuItem>
                        <DropdownMenuItem><SignOut className="text-base text-red-800"/></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
        );
    }
    return <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between bg-white shadow-lg">
        <a href="/" className="pl-5 py-2.5 w-fit">
            <img src="/logo-full.svg" className="hidden md:block" alt="Domov"/>
            <img src="/icon.svg" className="block md:hidden" alt="Domov"/>
        </a>
    </header>
}
