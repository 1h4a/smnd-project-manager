import NextAuth from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import { NextAuthConfig } from "next-auth"

export const authConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [MicrosoftEntraID({
        clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
        clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
        issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    })],
    callbacks: {
        /*jwt({ token, account, profile }) {
            if (profile) { // User is available during sign-in
                token.sub = profile.sub as string
            }
            return token
        },*/
        session({ session, user }) {
            session.user.id = user.id
            return session
        },
    },
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
    return {
        adapter: PrismaAdapter(prisma),
        providers: [MicrosoftEntraID({
            clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
            clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
            issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
        })],
        callbacks: {
            jwt: async ({ token, account }) => {
                if ( account && account.access_token ) {
                    token.accessToken = account.access_token
                }
                return token
            },
            session({ session, user, token }) {
                session.user.id = user.id
                return session
            },
        },
    }
})

