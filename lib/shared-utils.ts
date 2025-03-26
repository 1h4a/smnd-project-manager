import { useAuth } from '@/lib/auth-context'
import { usePathname, permanentRedirect } from 'next/navigation'
import { useSession } from "next-auth/react"

export function intAuth ():number {
    const { data: session } = useSession();
    const roles: String[] = ["guest", "student", "teacher", "admin"]
    //const { role } = useAuth();
    const role = (session?.user?.id != null ? "admin" : "guest")
    const lx: number = roles.indexOf(role);
    return lx
}

export function checkAuthLx (pathname: string): boolean {
    const paths = [
        { href: '/dashboard', lx: 1 },
        { href: '/projects', lx: 1},
        { href: '/projects/list', lx: 1 },
        { href: '/projects/view', lx: 1 },
        { href: '/files', lx: 1 },
        { href: '/admin', lx: 3},
        { href: '/admin/database', lx: 3 },
        { href: '/', lx: 0}
    ];
    const al = intAuth();
    let isAllowed = false;
    paths.map((path) => {
        if (path.href === pathname) {
            if (al >= path.lx) {
                isAllowed = true;
            }
        }
    })
    return isAllowed
}

export function loginControl (): void {
    const pathname = usePathname();
    const isAllowed = checkAuthLx(pathname);
    if (!isAllowed) {
        permanentRedirect('/');
    }
}


// add function to create object array from json
// add functions for database manipulation
