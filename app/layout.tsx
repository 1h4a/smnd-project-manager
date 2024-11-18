import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { inter } from '@/app/ui/fonts';

/*const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});*/

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
  title: "Trinity v0.1",
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
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between bg-white shadow-lg">
        <a href="/" className="pl-5 py-2.5 lg:basis-1/4">
            <img src="/logo-full.svg" className="hidden md:block" alt="Domov"/>
            <img src="/icon.svg" className="block md:hidden" alt="Domov"/>
        </a>
        <a href="/" className="flex items-center justify-center">
            <p className="mr-3">
                Meno Priezvisko
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="size-10 mr-4 fill-gray-500">
                <path fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"/>
            </svg>
        </a>
    </header>
    {children}
    </body>
    </html>
  );
}