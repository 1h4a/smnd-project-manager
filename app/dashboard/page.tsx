import { Disclosure, DisclosureButton, DisclosurePanel, Button } from '@headlessui/react'

const permission: number = 3; // Lx permission level
const TLElement = (props: any) => {
    return (
        <div
            className="flex-none flex flex-col w-fit min-w-8 bg-white h-full rounded-3xl shadow-2xl outline outline-1 outline-gray-100 text-2xl text-left ml-8 py-8 justify-center items-center">
            <div className="flex flex-col items-start px-10">
                <p> {props.date} </p>
                <p className="font-medium text-3xl pt-8"> {props.name} </p>
                {(permission > 1) && (<p className="pt-8 text-textgray"> {props.studentName} </p>)}
            </div>
        </div>
    );
}
const PLDElement = (props: any) => {
    return (
        <div className="mt-4 ml-8 w-full divide-y divide-white/5 rounded-xl bg-white drop-shadow-xl">
        <Disclosure as="div" className="p-6" defaultOpen={false}>
            <DisclosureButton className="group flex w-full items-start justify-between">
                        <span className="flex flex-row w-full justify-between text-2xl p-2 font-medium text-black">
                            <p className="text-left w-1/2 text-pretty truncate">{props.name}</p>
                            <p className="absolute right-10 font-normal text-textgray text-xl mr-4">{props.consultant}</p>
                        </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="mt-3 size-5 stroke-textgray group-data-[open]:rotate-180">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                </svg>
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-lg">
                <p className="font-normal text-textgray mr-8 text-left ml-2 -mt-3 mb-2">{props.type}</p>
                <Button
                    className="bg-ngray text-darkgray rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-gray-100 transition-colors">Nahrané
                    súbory</Button>
                <Button
                    className="bg-ngray text-darkgray rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-gray-100 transition-colors">Termíny</Button>
                {(permission > 1) && (<Button
                    className="bg-red-400 text-white rounded-3xl p-4 px-5 mt-2 mr-4 hover:bg-red-500 transition-colors">Odstrániť</Button>)}
            </DisclosurePanel>
        </Disclosure>
    </div>)
}
export default function Page() {
    // data is example junk, add object generation abilities
    return (
        <div className="flex flex-col justify-normal h-full overflow-auto pb-4">
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8"> Najbližšie termíny </h1>
            <div
                className="w-32 h-96 bg-gradient-to-l from-white to-transparent z-40 absolute right-0 top-100 md:block hidden"></div>
            <div className="flex flex-row w-full h-fit pb-12 pt-8 overflow-x-scroll grow-0 shrink-0">
                <TLElement name="Konzultácia" date="6.5." studentName="Meno Priezvisko"/>
                <TLElement name="Prezentácia práce" date="30.5." studentName="Meno Priezvisko"/>
                <TLElement name="Termín" date="1.10." studentName="Meno Priezvisko"/>
                <TLElement name="Termín" date="1.10." studentName="Meno Priezvisko"/>
                <TLElement name="Termín" date="1.10." studentName="Meno Priezvisko"/>
                <TLElement name="Termín" date="1.10." studentName="Meno Priezvisko"/>
                <TLElement name="Termín" date="1.10." studentName="Meno Priezvisko"/>
                <TLElement name="Termín" date="1.10." studentName="Meno Priezvisko"/>
                <TLElement name="Termín" date="1.10." studentName="Meno Priezvisko"/>
                <TLElement name="Termín" date="1.10." studentName="Meno Priezvisko"/>
                <TLElement name="Termín" date="1.10." studentName="Meno Priezvisko"/>
                <TLElement name="Termín" date="1.10." studentName="Meno Priezvisko"/>
                <TLElement name="Termín" date="1.10." studentName="Meno Priezvisko"/>

            </div>
            <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8"> Moje práce </h1>
            <div className="flex flex-col w-1/2">
                <PLDElement name="abcdahgregtwrefgvwsefwefwefwsefw adfgadsg a adgfagd adg adg adgaad"
                            consultant="Meno Priezvisko" type="SOČ (Stredoškolská Odborná Činnosť)"/>
                <PLDElement name="Téma práce" consultant="Meno Priezvisko" type="SOČ (Stredoškolská Odborná Činnosť)"/>
                <PLDElement name="Téma práce" consultant="Meno Priezvisko" type="SOČ (Stredoškolská Odborná Činnosť)"/>
            </div>
            {(permission>2) && (<a href="/admin" className="flex items-center space-x-2">
                <h1 className="font-medium text-3xl lg:text-4xl 2xl:text-5xl ml-8 mt-8"> Administrátorský prehľad </h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 mt-9">
                    <path fillRule="evenodd"
                          d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                          clipRule="evenodd"/>
                </svg>
            </a>)}
        </div>
    );
}