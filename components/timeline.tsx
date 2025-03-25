import { prisma } from "@/prisma"

import { _timeline } from "@/lib/timeline"
import React from "react";

export function getCurrentOffset(date: string) {
    let date1 = new Date();

    let date2 = new Date(date)

    let diff = Math.abs(date1.getTime() - date2.getTime());

    return Math.ceil(diff / (1000 * 3600 * 24));
}

interface ElementProps {
    offset: number,
    name: string,
    assigned: any[]
}

interface TimelineProps {
    user: any,
    error: boolean
}

const TLElement = ({ offset, name, assigned }: ElementProps) => {
    let offsetText: string
    if (offset<0) {
        offsetText = Math.abs(offset) + " days ago"
    }
    else if (offset==0) {
        offsetText = "Today"
    }
    else {
        offsetText = "In " + offset + " days"
    }

    let assignedNames: string[] = []

    assigned.map((el) => (
        assignedNames.push(el.name)
    ))

    return (
        <div
            className="flex-none flex flex-col w-fit min-w-8 bg-white h-full rounded-3xl shadow-2xl outline-1 outline-ngray text-2xl text-left ml-8 py-8 justify-start items-start">
            <div className="flex flex-col items-start px-10">
                <p> {offsetText} </p>
                <p className="font-medium text-3xl pt-8"> {name} </p>
                <p className="pt-8 text-textgray"> {assignedNames.join(', ')} </p>
            </div>
        </div>
    );
}

export async function fetchTimeline(uid: string) {
    try {const user = await prisma.user.findUnique({
            where: {
                id: uid
            },
            select: {
                project: {
                    select: {
                        assigned: {
                            select: {
                                name: true
                            }
                        },
                        altTimeline: true
                    }
                }
            }
        }) as any
        return { user: user, error: false }
    }
    catch (error) {
        console.error('Database error: ', error)
        return { user: {}, error: true }
    }

}

export function Timeline({ user, error } : TimelineProps) {
    const assigned = user.project.assigned
    let timeline = _timeline
    timeline = user.project.altTimeline as any

    const startDate = timeline.properties.startDate
    const schema = timeline.schema

    if (error) {
        return (
            <>
                <div className="w-fit h-fit flex flex-col items-start justify-start text-textgray font-medium text-lg ml-16 mt-6">
                    No projects available.
                    <p className="text-regulargray font-normal">Endpoint error. Contact administrator.</p>
                </div>
            </>
        )
    }

    if (schema.length == 0) {
        return (
            <>
                <div className="w-fit h-fit flex flex-col items-start justify-start text-textgray font-medium text-lg ml-16 mt-6">
                    No projects available.
                </div>
            </>
        )
    }

    return (
        <div className="flex flex-row p-4 items-start justify-start">
            {
                schema.map((element, i) => (
                    <TLElement
                        offset={element.offset - (getCurrentOffset(startDate))}
                        name={element.name}
                        assigned={assigned as any}
                        key={"tl_el" + i}
                    />
                ))
            }
        </div>
    )
}