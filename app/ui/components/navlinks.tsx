import Link from 'next/link';
import clsx from 'clsx';
import { auth } from "@/auth"
import { prisma } from "@/prisma"
import {getPermissionLevel} from "@/lib/types";

const links = [ // Add permission assignment
    { name: 'Prehľad', href: '/dashboard', lx: 1 },
    { name: 'Aktuálne Práce', href: '/projects', lx: 1},
    { name: 'Súbory', href: '/files', lx: 1 },
    { name: 'Administrátorský Panel', href: '/admin', lx: 3},
    { name: 'Databáza', href: '/admin/database', lx: 3 }
];

export default async function NavLinks() {
    const session = await auth()
    if (session) {
        const dbUser = await prisma.user.findUnique({
            where: {
                id: session?.user?.id!
            },
            select: {
                role: true
            }
        })
        const permission = getPermissionLevel(dbUser?.role!)
        return (
            <>
                {links.map((link) => {
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx("flex h-[48px] items-center justify-center text-md text-gray-700 hover:text-smnd md:flex-none md:justify-start md:p-2 md:px-3",
                                {
                                    'hidden': (permission < link.lx)
                                })}
                        >
                            <p className="hidden md:block">{link.name}</p>
                        </Link>
                    );
                })}
            </>
        );
    }
    else {
       return <></>
    }
}