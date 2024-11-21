'use client';
import Image from "next/image";
import { Button } from '@headlessui/react';

export default function Home() {
    let success: boolean = true;

    if (success) {
        // auth success page
        return (
            <div className="flex flex-none w-screen h-[calc(100vh-8rem)] justify-center md:justify-start items-center">
                <div className="flex flex-none w-full md:w-1/2 h-1/2 items-center justify-center">
                    <div
                        className="flex flex-col w-1/2 bg-white h-full rounded-xl shadow-3xl text-xl lg:text-2xl 2xl:text-3xl p-16 justify-center items-center">
                        <div className="text-left"><p className="font-medium">Vitajte na projektovej platforme ŠpMNDaG.</p>
                            <p>O moment budete presmerovaní automaticky.</p>
                        </div>
                    </div>
                </div>
                    <Image
                        src="/logo-hero.svg"
                        width={1500}
                        height={1500}
                        className="hidden md:block absolute right-0 bottom-0 blur-2xl -z-50"
                        alt="SMND logo, used as a hero image"
                    />
            </div>
        )
    }
    else {
        // auth failure page
        return (
            <div className="flex flex-none w-screen h-[calc(100vh-8rem)] justify-center md:justify-start items-center">
                <div className="flex flex-none w-full lg:w-1/2 h-1/2 items-center justify-center">
                    <div
                        className="flex flex-col w-1/2 bg-white h-fit rounded-xl shadow-3xl text-xl lg:text-2xl 2xl:text-3xl p-16 justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="flex-none size-16 lg:size-32 2xl:size-60 fill-darkgray">
                                <path fillRule="evenodd"
                                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                      clipRule="evenodd"/>
                            </svg>
                            <div className="text-center">
                                <p className="font-medium text-xl lg:text-2xl 2xl:text-3xl">Nepodarilo sa nám prihlásiť
                                    Vás.</p>
                                <p>Pre pokračovanie sa prihláste pomocou Teams účtu.</p>
                            </div>
                            <Button
                                className="inline-flex rounded w-fit bg-almostblack py-2 px-4 my-8 text-white 2xl:text-xl lg:text-lg text-base  hover:bg-ultradark active:bg-gray-900 hover:outline-1 hover:outline-gray-300 transition-colors"> Entra
                                ID Login </Button>
                    </div>
                </div>
                <Image
                    src="/logo-hero.svg"
                    width={1500}
                    height={1500}
                    className="hidden md:block absolute right-0 bottom-0 blur-2xl -z-50"
                    alt="SMND logo, used as a hero image"
                />
            </div>
        )
    }
}
