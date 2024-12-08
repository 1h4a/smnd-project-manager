import { useAuth } from '@/lib/auth-context'
import { usePathname, permanentRedirect } from 'next/navigation'

export function intAuth ():number {
    const roles: String[] = ["guest", "student", "teacher", "admin"]
    const { role } = useAuth();
    const lx: number = roles.indexOf(role);
    console.log("USER PERMISSION LEVEL: " + lx);
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