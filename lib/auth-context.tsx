"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Role } from '@/lib/types'
import { prisma } from "@/prisma"
import {useSession} from "next-auth/react";

type AuthContextType = {
    role: Role
    setRole: (role: Role) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
export function AuthProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<Role>("STUDENT")
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession()

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

