import { NextAuthOptions } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import { DefaultSession } from "next-auth"

import { UserRole } from "@/lib/types"

declare module "next-auth" {
    interface Session {
        user: {
            role: UserRole
        } & DefaultSession["user"]
    }
}

if (!process.env.AZURE_AD_CLIENT_ID || !process.env.AZURE_AD_CLIENT_SECRET || !process.env.AZURE_AD_TENANT_ID) {
    throw new Error('Missing AZURE_AD environment variables')
}

export const authOptions: NextAuthOptions = {
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.role = determineUserRole(profile)
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as UserRole
            }
            return session
        },
    },
}

function determineUserRole(profile: any): UserRole {
    return "student"
}

