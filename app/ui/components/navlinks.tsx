'use client';

import Link from 'next/link';
import {usePathname} from "next/navigation";
import clsx from 'clsx';
const links = [ // Add permission assignment
    { name: 'Prehľad', href: '/dashboard' },
    { name: 'Aktuálne Práce', href: '/projects',},
    { name: 'Súbory', href: '/files' },
    { name: 'Posudky a Termíny', href: '/deadlines' },
    { name: 'Databáza', href: '/admin/database' }
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx("flex h-[48px] items-center justify-center text-md text-gray-700 hover:text-smnd md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                ' text-smnd': pathname === link.href,
                            })}
                    >
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}