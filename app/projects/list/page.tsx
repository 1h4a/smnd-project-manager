import { Button, Field, Input } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'

const ListElement = (props: any) => {
    return(
        <div
            className={clsx("w-full h-1/12 items-center text-center justify-between flex flex-row text-white ",
                {
                    'bg-darkgray/50' : props.alt,
                },
                {
                    'bg-textgray/70' : !props.alt,
                }
                )}>
            <div className="px-8 py-1 flex flex-row items-center justify-between w-full">
                <p className="w-1/5"> {props.name} </p>
                <p className="w-1/5"> {props.student} </p>
                <p className="w-1/5"> {props.consultant} </p>
                <p className="w-1/5"> {props.type} </p>
                <p className="w-1/5"> {props.year} </p>
            </div>
            <Link
            href="/projects/view">
                <Button
                    className="items-center justify-center text-center px-12 py-2 bg-gray-100 text-textgray shadow-inner hover:shadow-none hover:bg-gray-200 active:bg-regulargray transition-colors">
                    Zobraziť
                </Button>
            </Link>
        </div>
    );
}

const MakeList = (props: any) => {
    const exportArray: string[] = Array(props.count);
    for (let i = 0; i < props.count; i++) {
        exportArray.push((i + 1).toString());
    }
    return(
      <>
          {
            exportArray.map((el) => {
                return(
                  <ListElement
                      name="Téma Práce"
                      student="Meno Priezvisko"
                      consultant="Meno Priezvisko"
                      type="SOČ (Stredoškolská Odborná Činnosť)"
                      year="2024/2025"
                      alt={(exportArray.indexOf(el) % 2 === 0)}
                  />
                );
            })
          }
      </>
    );
}
export default function Page() {
    return (
        <div className="w-full h-fit items-center justify-center overflow-y-hidden pb-4">
            <Link
                href="/projects"
                className="items-center justify-start flex-row flex text-darkgray">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-5 rotate-90">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                </svg>
                <p>Späť na aktuálne práce</p>
            </Link>
            <Field>
                <Input
                    className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-ngray py-1.5 px-3 text-md text-black',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/5'
                    )}
                    placeholder="Vyhľadávanie podľa témy, študenta, učiteľa..."
                />
            </Field>
            <div className="rounded-2xl w-full block h-[80vh] bg-ngray my-4 text-md text-black overflow-y-scroll">
                <div
                    className="flex flex-row sticky top-0">
                    <div
                        className="w-full h-1/12 bg-darkgray text-center items-center justify-between flex flex-row text-white px-8 py-1.5 rounded-t-2xl">
                        <p className="w-1/5"> Téma </p>
                        <p className="w-1/5"> Priradení študenti </p>
                        <p className="w-1/5"> Zodpovedný učiteľ </p>
                        <p className="w-1/5"> Typ projektu </p>
                        <p className="w-1/5"> Školský rok </p>
                    </div>
                    <div
                        className="items-center justify-center text-center px-12 py-2 bg-gray-100 text-black/0 select-none">
                        Zobraziť
                    </div>
                    <div
                        className="absolute px-16 py-5 bg-gray-100 -z-10 right-10">
                    </div>
                </div>
                <MakeList count={50}/>
            </div>
        </div>
    );
}