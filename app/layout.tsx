import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from '@/app/ui/components/nav'
import "./globals.css";
import React, {Suspense} from "react";
import {SessionProvider} from "next-auth/react";

import { Toaster } from "@/components/ui/sonner"

const effra = localFont({
    src: [
        {
            path:'./fonts/Effra.woff',
            weight: '400',
            style: 'normal'
        },
        {
            path:'./fonts/EffraMedium.woff',
            weight: '500',
            style: 'normal'
        }
    ]
})

export const metadata: Metadata = {
  title: "SMND",
  description: "Project Platform"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang='sk' suppressHydrationWarning>

      <body
          className={`${effra.className} antialiased h-fit`}>
      {/*<Suspense fallback={
          <div className="w-screen h-screen flex flex-row items-center justify-center text-textgray font-medium">
              Loading...
          </div>
      }>*/}
              <SessionProvider>
                  <Nav/>
                  <main>{children}</main>
                  <Toaster />
              </SessionProvider>
      {/*</Suspense>*/}
      </body>
      </html>
  );
}