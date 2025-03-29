import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import clsx from "clsx";
import {getCurrentOffset} from "@/components/timeline";

interface ProjectProps {
    name: string,
    assigned: String[],
    type: string,
    completed: boolean,
    authLx: number
}

interface ExtendedProps {
    name: string,
    assigned: String[],
    type: string,
    completed: boolean,
    authLx: number,
    nearestName: string,
    nearestOffset: number,
    startDate: string
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

export const PLEElement = ({ name, assigned, type, completed, startDate, authLx, nearestName, nearestOffset }: ExtendedProps) => {
    let offsetText: string
    const offset = nearestOffset - getCurrentOffset(startDate)
    if (offset<0) {
        offsetText = Math.abs(offset) + " days ago"
    }
    else if (offset==0) {
        offsetText = "Today"
    }
    else {
        offsetText = "In " + offset + " days"
    }
    return (
        <div className={clsx("mt-8 ml-8 w-full divide-y divide-white/5 rounded-xl bg-white drop-shadow-xl outline-1 outline-ngray/50", {
            "hidden" : completed
        })}>
            <Card>
                <CardHeader className="-mb-4"><div className="group flex w-full items-start justify-between">
                            <span
                                className="flex flex-row w-full justify-between text-2xl font-normal">
                            <p className="text-left font-medium w-1/2 text-pretty truncate">{name}</p>
                                <span className="flex flex-col items-start justify-end">
                                    <p className="text-right text-textgray w-full text-pretty text-xl truncate">{assigned.join(', ')}</p>
                                    <p className="text-right text-textgray w-full text-pretty text-xl truncate">{type}</p>
                                </span>
                        </span>
                </div></CardHeader>
                <CardContent className=""><span className="flex flex-col items-start justify-start w-full">
                    <span className="justify-between flex flex-row w-full items-center text-textgray"><p className="font-medium text-xl text-left"> Najbližší termín </p>
                    <p className="font-normal text-xl text-right">{nearestName + " - " + offsetText}</p></span>
                    </span>
                    <span
                        className="w-full flex flex-row justify-evenly bg-black/10 shadow-inner rounded-2xl shadow-gray-200 mt-6 "> {/*Latest files view - always 5> files - to-do: file fetching based on project id*/}
                        <div className="flex flex-col justify-center items-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-darkgray">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> verzia3.docx </p>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-darkgray">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> graf.png </p>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-darkgray">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> prezen...pptx </p>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-darkgray">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> verzia2.docx </p>
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         className="size-16 text-darkgray">
                        <path
                            d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
                    </svg>
                    <p className="text-darkgray"> dotaznik.xlsx </p>
                </div>
            </span>
                </CardContent>
                <CardFooter>
                    <span className="w-full flex flex-row items-center justify-center">
                        {(authLx > 1) && (<><Button
                            className="bg-ngray w-full text-darkgray rounded-lg font-normal text-lg py-6 px-5 mt-4 mr-4 hover:bg-gray-100 transition-colors">Zmeniť tému</Button>
                            <Button
                                className="bg-ngray w-full text-darkgray rounded-lg font-normal text-lg py-6 px-5 mt-4 mr-4 hover:bg-gray-100 transition-colors">Zobraziť žiadosti</Button></>)}
                        {(authLx < 2) && (<Button
                            className="bg-ngray w-full text-darkgray rounded-lg font-normal text-lg py-6 px-5 mt-4 mr-4 hover:bg-gray-100 transition-colors">Požiadať o zmenu témy</Button>)}
                        <Button
                            className="bg-ngray w-full text-darkgray rounded-lg font-normal text-lg py-6 px-5 mt-4 mr-4 hover:bg-gray-100 transition-colors">Nahrať nový súbor</Button>
                        {(authLx > 1) && (<Button
                            className="bg-red-400 w-full text-white rounded-lg font-normal text-lg py-6 px-5 mt-4 mr-4 hover:bg-red-500 transition-colors">Odstrániť</Button>)}
                    </span>
                </CardFooter>
            </Card>
        </div>)
}


interface ListProps {
    data: any,
    authLx: number
}

function getAssigned(assigned: any[]) {
    let out: any[] = []
    assigned.map((el) => {
        out.push(el.name)
    })
    return out
}
export function ProjectList_Simple ({ data, authLx } : ListProps){
    const projects = data.projects
    return (
        <>
            {
                projects.map((el: any, i: number) => (
                    <PLDElement name={el.topic} assigned={getAssigned(el.assigned)} type={el.type.name} completed={el.completed} authLx={authLx} key={"proj"+i} />
                ))
            }
        </>
    )
}

export function ProjectList_Extended ({ data, authLx } : ListProps){
    const projects = data.projects
    if (!data.projects) {
        return (<div className="w-fit h-fit flex flex-col items-start justify-start text-textgray font-medium text-lg ml-16 mt-6">
            No projects available. </div>)
    }
    return (
        <>
            {
                projects.map((el: any, i: number) => (
                    <PLEElement name={el.topic} assigned={getAssigned(el.assigned)} type={el.type.name} completed={el.completed} authLx={authLx} nearestName={el.altTimeline.schema[0].name} nearestOffset={el.altTimeline.schema[0].offset} startDate={el.altTimeline.properties.startDate} key={"proj"+i} />
                ))
            }
        </>
    )
}