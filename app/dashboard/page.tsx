export default function Page() {
    const permission: number = 1; // Lx permission level
    return (
        <div className="pt-8 flex flex-col justify-normal h-2/3 overflow-auto">
            <h1 className="font-medium text-5xl"> Najbližšie termíny </h1>
            <div className="w-96 h-96 bg-gradient-to-l from-white to-transparent z-40 absolute right-10 top-100"></div>
            <div className="flex flex-row w-full h-1/3 py-12 overflow-x-scroll">
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
            <h1 className="font-medium text-5xl pt-4 "> Moje práce </h1>
        </div>
    );
}