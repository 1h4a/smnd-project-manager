import { Disclosure, DisclosureButton, DisclosurePanel, Button } from '@headlessui/react'
export default function Page() {
    const permission: number = 1; // Lx permission level
    // data is example junk, add object generation abilities
    return (
        <div className="flex flex-col justify-normal h-full overflow-auto">
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl mt-4"> Najbližšie termíny </h1>
            <div className="w-96 h-96 bg-gradient-to-l from-white to-transparent z-40 absolute right-10 top-100"></div>
            <div className="flex flex-row w-full h-1/3 pb-12 pt-8 overflow-x-scroll">
                <div
                    className="flex-none flex flex-col w-fit min-w-8 bg-white h-full rounded-3xl shadow-2xl outline outline-1 outline-gray-100 text-2xl text-left ml-8 mr-8 justify-center items-center">
                    <div className="flex flex-col items-start px-10">
                        <p> 6.5. </p>
                        <p className="font-medium text-3xl pt-8"> Konzultácia </p>
                    </div>
                </div>
                <div
                    className="flex-none flex flex-col w-fit min-w-8 bg-white h-full rounded-3xl shadow-2xl outline outline-1 outline-gray-100 text-2xl text-left mr-8 justify-center items-center">
                    <div className="flex flex-col items-start px-10">
                        <p> 30.5. </p>
                        <p className="font-medium text-3xl pt-8"> Prezentácia práce </p>
                    </div>
                </div>
                <div
                    className="flex-none flex flex-col w-fit min-w-8 bg-white h-full rounded-3xl shadow-2xl outline outline-1 outline-gray-100 text-2xl text-left mr-8 justify-center items-center">
                    <div className="flex flex-col items-start px-10">
                        <p> 1.10. </p>
                        <p className="font-medium text-3xl pt-8"> Termín </p>
                    </div>
                </div>
                <div
                    className="flex-none flex flex-col w-fit min-w-8 bg-white h-full rounded-3xl shadow-2xl outline outline-1 outline-gray-100 text-2xl text-left mr-8 justify-center items-center">
                    <div className="flex flex-col items-start px-10">
                        <p> 1.11. </p>
                        <p className="font-medium text-3xl pt-8"> Dlhší termín </p>
                    </div>
                </div>
                <div
                    className="flex-none flex flex-col w-fit min-w-8 bg-white h-full rounded-3xl shadow-2xl outline outline-1 outline-gray-100 text-2xl text-left mr-8 justify-center items-center">
                    <div className="flex flex-col items-start px-10">
                        <p> 1.11. </p>
                        <p className="font-medium text-3xl pt-8"> Ešte dlhší termín </p>
                    </div>
                </div>
                <div
                    className="flex-none flex flex-col w-fit min-w-8 bg-white h-full rounded-3xl shadow-2xl outline outline-1 outline-gray-100 text-2xl text-left mr-8 justify-center items-center">
                    <div className="flex flex-col items-start px-10">
                        <p> 1.11. </p>
                        <p className="font-medium text-3xl pt-8"> Ešte dlhší termín </p>
                    </div>
                </div>
                <div
                    className="flex-none flex flex-col w-fit min-w-8 bg-white h-full rounded-3xl shadow-2xl outline outline-1 outline-gray-100 text-2xl text-left mr-8 justify-center items-center">
                    <div className="flex flex-col items-start px-10">
                        <p> 1.11. </p>
                        <p className="font-medium text-3xl pt-8"> Ešte dlhší termín </p>
                    </div>
                </div>
                <div
                    className="flex-none flex flex-col w-fit min-w-8 bg-white h-full rounded-3xl shadow-2xl outline outline-1 outline-gray-100 text-2xl text-left mr-8 justify-center items-center">
                    <div className="flex flex-col items-start px-10">
                        <p> 1.11. </p>
                        <p className="font-medium text-3xl pt-8"> Ešte dlhší termín </p>
                    </div>
                </div>
                <div
                    className="flex-none flex flex-col w-fit min-w-8 bg-white h-full rounded-3xl shadow-2xl outline outline-1 outline-gray-100 text-2xl text-left mr-8 justify-center items-center">
                    <div className="flex flex-col items-start px-10">
                        <p> 1.11. </p>
                        <p className="font-medium text-3xl pt-8"> Ešte dlhší termín </p>
                    </div>
                </div>
            </div>
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl "> Moje práce </h1>
            <div className="mt-4 ml-8 w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white drop-shadow-xl">
                <Disclosure as="div" className="p-6" defaultOpen={true}>
                    <DisclosureButton className="group flex w-full items-center justify-between">
                        <span className="flex flex-row w-full justify-between text-lg font-medium text-black">
                            <p>Téma práce</p>
                            <p className="font-normal text-gray-400 mr-4">Konzultant: Meno Priezvisko</p>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6 stroke-gray-400 group-data-[open]:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                        </svg>
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 text-lg text-gray-400">
                        <p className="font-normal text-gray-400 mr-8 text-right -mt-3">SOČ (Stredoškolská Odborná Činnosť)</p>
                        <Button className="bg-gray-200 text-gray-500 rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-gray-100 transition-colors">Nahrané súbory</Button>
                        <Button className="bg-gray-200 text-gray-500 rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-gray-100 transition-colors">Posudky</Button>
                        <Button className="bg-gray-200 text-gray-500 rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-gray-100 transition-colors">Termíny</Button>
                    </DisclosurePanel>
                </Disclosure>
            </div>
        </div>
    );
}