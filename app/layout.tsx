import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from '@/app/ui/components/nav'
import "./globals.css";

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
    <html lang="en">
    <body
        className={`${effra.className} antialiased min-h-screen max-h-screen`}>
        <Nav />
    {children}
    </body>
    </html>
  );
}