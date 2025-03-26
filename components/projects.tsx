import {Button} from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import clsx from "clsx";

interface ProjectProps {
    name: string,
    assigned: String[],
    type: string,
    completed: boolean,
    authLx: number
}
export const PLDElement = ({ name, assigned, type, completed, authLx } : ProjectProps) => {
    return (
        <div className={clsx("mt-8 ml-8 w-full divide-y divide-white/5 rounded-xl bg-white drop-shadow-xl outline-1 outline-ngray/50", {
            "hidden" : completed
        })}>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="py-4 px-6">
                    <AccordionTrigger>
                        <div className="group flex w-full items-start justify-between">
                            <span
                        className="flex flex-row w-full justify-between text-2xl p-2 font-normal">
                            <p className="text-left font-medium w-1/2 text-pretty text-3xl truncate">{name}</p>
                            <p className="text-right text-textgray w-1/2 text-pretty truncate">{assigned.join(', ')}</p>
                        </span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="mt-2 text-lg">
                        <p className="font-normal text-textgray text-xl mr-8 text-left ml-2 -mt-4 mb-2">{type}</p>
                        <Button
                            className="bg-ngray text-darkgray rounded-lg font-normal text-lg py-6 px-5 mt-4 mr-4 hover:bg-gray-100 transition-colors">Nahrané
                            súbory</Button>
                        <Button
                            className="bg-ngray text-darkgray rounded-lg font-normal text-lg py-6 px-5 mt-4 mr-4 hover:bg-gray-100 transition-colors">Termíny</Button>
                        {(authLx > 1) && (<Button
                            className="bg-red-400 text-white rounded-lg font-normal text-lg py-6 px-5 mt-4 mr-4 hover:bg-red-500 transition-colors">Odstrániť</Button>)}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>)
}