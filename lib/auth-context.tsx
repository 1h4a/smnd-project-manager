"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { UserRole } from '@/lib/types'

type AuthContextType = {
    role: UserRole
    setRole: (role: UserRole) => void
    login: (role: UserRole) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
export function AuthProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<UserRole>("guest")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            // Add auth state check code
            await new Promise(resolve => setTimeout(resolve, 1000))
            setRole('student')
            setLoading(false)
        }

        checkAuth()
    }, [])

    const login = (newRole: UserRole) => {
        setRole(newRole)
    }

    const logout = () => {
        setRole("guest")
    }

    if (loading) {
        return (
            <div className="w-screen h-screen flex flex-row items-center justify-center text-textgray font-medium">
                Loading...
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{role, setRole, login, logout}}>
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

