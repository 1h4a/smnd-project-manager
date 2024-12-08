'use client';

import Link from 'next/link';
import {usePathname} from "next/navigation";
import clsx from 'clsx';
import { intAuth } from '@/lib/shared-utils'

const links = [ // Add permission assignment
    { name: 'Prehľad', href: '/dashboard', lx: 1 },
    { name: 'Aktuálne Práce', href: '/projects', lx: 1},
    { name: 'Súbory', href: '/files', lx: 1 },
    { name: 'Administrátorský Panel', href: '/admin', lx: 3},
    { name: 'Databáza', href: '/admin/database', lx: 3 }
];

export default function NavLinks() {
    let permission: number = intAuth();
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                console.log(pathname);
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx("flex h-[48px] items-center justify-center text-md text-gray-700 hover:text-smnd md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                ' text-smnd': (pathname === link.href),
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