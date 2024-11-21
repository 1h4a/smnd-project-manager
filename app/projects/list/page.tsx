import { Description, Button, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'

const PLElement = () => {
    return(
        <div
            className="w-full h-1/12 bg-darkgray items-center justify-between flex flex-row text-white px-3 py-1.5">
            <p> Téma </p>
            <p> Priradení študenti </p>
            <p> Zodpovedný učiteľ </p>
            <p> Typ projektu </p>
            <p> Školský rok </p>
        </div>
    );
}
export default function Page() {
    return (
        <div className="w-full items-center justify-center">
            <Field>
                <Input
                    className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-ngray py-1.5 px-3 text-md text-black',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/5'
                    )}
                    placeholder="Vyhľadávanie podľa témy, študenta, učiteľa..."
                />
            </Field>
            <div className="rounded-2xl w-full block h-full bg-ngray/20 my-4 text-md text-black">
                <div className="w-full h-1/12 bg-darkgray items-center justify-between flex flex-row text-white px-3 py-1.5 rounded-t-2xl">
                    <p> Téma </p>
                    <p> Priradení študenti </p>
                    <p> Zodpovedný učiteľ </p>
                    <p> Typ projektu </p>
                    <p> Školský rok </p>
                </div>

            </div>
        </div>
    );
}