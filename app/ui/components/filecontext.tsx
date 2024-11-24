import {Dialog, DialogPanel} from "@headlessui/react";
import {useEffect, useState} from "react";

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

export default function FileContext() {
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });
    useEffect(() => {
        const handleClick = () => setClicked(false);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return(
        <Dialog open={isOpen} as="div" className="absolute z-10 focus:outline-none duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0" style={{top: '500px'}} onContextMenu={(e) => {
            e.preventDefault();
            open();
            setPoints({
                x: e.pageX,
                y: e.pageY,
            }); console.log("Right Click", e.pageX, e.pageY);}} onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        className="w-fit text-darkgray rounded-xl outline-2 -outline-offset-2 outline-black/50 bg-white mt-2 p-1 [--anchor-gap:var(--spacing-1)]"
                    >
                        <button
                            className="transition-colors truncate text-nowrap w-full max-w-[20vw] group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-textgray/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>

                            Nahrať súbor
                        </button>
                        <div className="my-0.5 h-px bg-textgray/30"></div>
                        <button
                            className="transition-colors truncate text-nowrap w-full max-w-[20vw] group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-textgray/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>


                            Premenovať
                        </button>
                        <div className="my-0.5 h-px bg-textgray/30"></div>
                        <button
                            className="transition-colors truncate text-nowrap w-full max-w-[20vw] group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-textgray/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>


                            Stiahnuť súbor
                        </button>
                        <div className="my-0.5 h-px bg-textgray/30"></div>
                        <button
                            className="transition-colors truncate text-nowrap w-full max-w-[20vw] group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-textgray/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                            </svg>


                            Podrobnosti
                        </button>
                        <div className="my-0.5 h-px bg-textgray/30"></div>
                        <button
                            className="transition-colors text-red-500 truncate text-nowrap w-full max-w-[20vw] group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-textgray/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>


                            Vymazať súbor
                        </button>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}