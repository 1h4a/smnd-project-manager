"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { UserRole } from '@/lib/types'
import { prisma } from "@/prisma"
import {useSession} from "next-auth/react";

type AuthContextType = {
    role: UserRole
    setRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
export function AuthProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<UserRole>("STUDENT")
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession()

    useEffect(() => {
        async function getRole() {
            const role = await prisma.user.findUnique({
                where: {
                    id: session?.user?.id!
                },
                select: {
                    role: true
                }
            })
            setRole(role?.role!)
        }
        getRole()
    }, []);

    console.log(role)

    if (loading) {
        return (
            <div className="w-screen h-screen flex flex-row items-center justify-center text-textgray font-medium">
                Loading...
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{role, setRole}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

