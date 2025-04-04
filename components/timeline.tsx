import { prisma } from "@/prisma"
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
    assigned: any[],
    topic: string
}

interface TimelineProps {
    user: any,
    error: boolean
}

export const _timeline = {
    schema: [
        {
            offset: 14, // The offset from the project start date, in days. An offset of 14 means that this particular deadline is due 14 days from the start.
            name: "Deadline Name 1", // The name of the deadline displayed
            isCompleted: false, // Whether the deadline is completed
            completionOffset: 0, // Offset of the deadline completion from the project start date. Whether it was on time is not stored inside the object.
            submissions: [] // UIDs of submissions
        },
        {
            offset: 28, // The offset from the project start date, in days. An offset of 14 means that this particular deadline is due 14 days from the start.
            name: "Deadline Name 2", // The name of the deadline displayed
            isCompleted: false, // Whether the deadline is completed
            completionOffset: 0, // Offset of the deadline completion from the project start date. Whether it was on time is not stored inside the object.
            submissions: [] // UIDs of submissions
        },
        {
            offset: 42, // The offset from the project start date, in days. An offset of 14 means that this particular deadline is due 14 days from the start.
            name: "Deadline Name 3", // The name of the deadline displayed
            isCompleted: false, // Whether the deadline is completed
            completionOffset: 0, // Offset of the deadline completion from the project start date. Whether it was on time is not stored inside the object.
            submissions: [] // UIDs of submissions
        },
        {
            offset: 56, // The offset from the project start date, in days. An offset of 14 means that this particular deadline is due 14 days from the start.
            name: "Deadline Name 4", // The name of the deadline displayed
            isCompleted: false, // Whether the deadline is completed
            completionOffset: 0, // Offset of the deadline completion from the project start date. Whether it was on time is not stored inside the object.
            submissions: [] // UIDs of submissions
        },
        {
            offset: 70, // The offset from the project start date, in days. An offset of 14 means that this particular deadline is due 14 days from the start.
            name: "Deadline Name 5", // The name of the deadline displayed
            isCompleted: false, // Whether the deadline is completed
            completionOffset: 0, // Offset of the deadline completion from the project start date. Whether it was on time is not stored inside the object.
            submissions: [] // UIDs of submissions
        },
        {
            offset: 84, // The offset from the project start date, in days. An offset of 14 means that this particular deadline is due 14 days from the start.
            name: "Deadline Name 6", // The name of the deadline displayed
            isCompleted: false, // Whether the deadline is completed
            completionOffset: 0, // Offset of the deadline completion from the project start date. Whether it was on time is not stored inside the object.
            submissions: [] // UIDs of submissions
        },
    ],
    properties: {
        adheres: 0, // Defines which standard timeline the timeline adheres to. Uses ProjectType.id
        startDate: "2025-03-19T00:00:00" // Always server timezone
    }
}

const TLElement = ({ offset, name, assigned, topic }: ElementProps) => {
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
            className="flex-none flex flex-col w-fit min-w-8 bg-white h-full rounded-3xl drop-shadow-xl outline-1 outline-ngray text-2xl text-left ml-8 py-8 justify-start items-start">
            <div className="flex flex-col items-start px-10">
                <p> {offsetText} </p>
                <p className="font-medium text-3xl pt-8"> {name} </p>
                <p className="text-textgray pt-8"> {topic} </p>
                <p className="text-textgray"> {assignedNames.join(', ')} </p>
            </div>
        </div>
    );
}

export async function fetchTimeline(uid: string) {
    if (uid == null) {
        return { user: null, error: false }
    }
    try {const user = await prisma.user.findUnique({
            where: {
                id: uid
            },
            select: {
                projects: {
                    select: {
                        topic: true,
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
        return { user: null, error: true }
    }

}

interface UseSchema {
    topic: string,
    name: string,
    assigned: any[],
    offset: number,
    startDate: string
}

export function Timeline({ user, error } : TimelineProps) {
    // { topic: "", name: "", assigned: "", offset: "" }
    let combinedSchema: UseSchema[] = []
    if (!user) {
        return (
            <>
                <div className="w-fit h-fit flex flex-col items-start justify-start text-textgray font-medium text-lg ml-16 mt-6">
                    No projects available.
                    {error ? <p className="text-regulargray font-normal">Endpoint error. Contact administrator.</p> : <></>}
                </div>
            </>
        )
    } else {
        user.projects.map((el: any) => {
            const assigned = el.assigned
            const topic = el.topic
            let timeline = _timeline
            timeline = el.altTimeline as any
            const startDate = timeline.properties.startDate
            const schema = timeline.schema
            schema.map((el, i) => {
                combinedSchema.push({ topic: topic, name: el.name, assigned: assigned, offset: el.offset, startDate: startDate })
            })
        })

        if (combinedSchema.length == 0) {
            return (
                        <>
                            <div className="w-fit h-fit flex flex-col items-start justify-start text-textgray font-medium text-lg ml-16 mt-6">
                                No projects available.
                            </div>
                        </>
            )
        }

        const sortedSchema = combinedSchema.sort((a,b) => a.offset-b.offset)
                return (
                    <div className="flex flex-row px-4 items-start justify-start">
                        {
                            sortedSchema.map((element, i) => (
                                <TLElement
                                    offset={element.offset - (getCurrentOffset(element.startDate))}
                                    name={element.name}
                                    assigned={element.assigned as any}
                                    topic={element.topic}
                                    key={"tl_el" + i}
                                />
                            ))
                        }
                    </div>
                )
    }
}