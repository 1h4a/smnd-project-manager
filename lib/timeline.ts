/*
    timeline.ts provides standard tooling for manipulating the timeline JSON resource
    present within the database schema.
    Unlike a Prisma model, a JSON object does not have format constraints, which makes it
    optimal for storing timelines (which cannot have a strictly defined size or fields)
    and allows for this part of the system to be highly dynamic.
    This tooling serves as the schema for manipulating and writing this JSON data to
    avoid format errors.
    Database JSON objects should not be manipulated in any other method other than the
    tooling in this file.
 */

import {prisma} from "@/prisma"

// Schema

/* const timeline = {
    schema: [
        {
            offset: Number,
            name: String,
            isCompleted: Boolean,
            completionOffset: Number,
            submissions: Array<String>
        }
    ],
    properties: {
        adheres: Number,
        startDate: String
    }
}*/

// Test data - [!] Should not be modified

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

// Functions

export async function initTimeline(projectId: string) {
    // Initiates edited project timeline for the specific project
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        }
    })

    if (!project?.stdTimeline) {
        throw new Error("timeline.init(pid): Timeline editing for the given PID is already initialized.")
    }
    if (project == null) {
        throw new Error("timeline.init(pid): The specified PID could not be found.")
    }

    const stdTimeline = await prisma.projectType.findUnique({
        where: {
            id: project.projectTypeId,
        }
    })

    await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            stdTimeline: false,
            altTimeline: stdTimeline?.timeline!,
        }
    })
}

export async function setStartDate(projectId: string, date: Date) {
    let tl = _timeline

    const project = await prisma.project.findUnique ({
        where: {
            id: projectId,
        }
    })

    tl = project?.altTimeline as any
    tl.properties.startDate = (date.toJSON()).toString()

    await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            altTimeline: tl
        }
    })
}

export async function getStartDate(projectId: string) {
    let tl = _timeline

    const project = await prisma.project.findUnique ({
        where: {
            id: projectId,
        }
    })

    tl = project?.altTimeline as any
    return tl.properties.startDate
}


export async function getTimeline(projectId: string) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        }
    })

    if (project == null) {
        throw new Error("timeline.getTimeline(pid): The specified PID could not be found.")
    }

    if (project?.stdTimeline) {
        return JSON.parse("")
    }
    else {
        return project.altTimeline
    }
}

export function verifyTimeline(input: any) { // Please only pass JSON
    return input != JSON.parse("");

}

export async function setOffset(projectId: string, elementId: number, value: number) {
    let tl = _timeline

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        }
    })

    if (project == null) {
        throw new Error("timeline.setOffset(pid): The specified PID could not be found.")
    }

    tl = project?.altTimeline as any
    tl.schema[elementId].offset = value

    await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            altTimeline: tl
        }
    })
}

export async function getOffset(projectId: string, elementId: number) {
    let tl = _timeline

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        }
    })

    if (project == null) {
        throw new Error("timeline.getOffset(pid): The specified PID could not be found.")
    }

    tl = project?.altTimeline as any

    return tl.schema[elementId].offset
}

export async function setName(projectId: string, elementId: number, value: string) {
    let tl = _timeline

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        }
    })

    if (project == null) {
        throw new Error("timeline.setName(pid): The specified PID could not be found.")
    }

    tl = project?.altTimeline as any
    tl.schema[elementId].name = value

    await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            altTimeline: tl
        }
    })
}

export async function getName(projectId: string, elementId: number) {
    let tl = _timeline

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        }
    })

    if (project == null) {
        throw new Error("timeline.getName(pid): The specified PID could not be found.")
    }

    tl = project?.altTimeline as any

    return tl.schema[elementId].name
}

export async function setCompletion(projectId: string, elementId: number, value: boolean) {
    let tl = _timeline

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        }
    })

    if (project == null) {
        throw new Error("timeline.updateOffset(pid): The specified PID could not be found.")
    }

    tl = project?.altTimeline as any
    tl.schema[elementId].isCompleted = value

    if (value) {
        //tl.schema[elementId].completionOffset = await getCurrentOffset(projectId)
    }
    else {
        tl.schema[elementId].completionOffset = 0
    }

    await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            altTimeline: tl
        }
    })
}

export async function getCompletion(projectId: string, elementId: number) {
    let tl = _timeline

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        }
    })

    if (project == null) {
        throw new Error("timeline.updateOffset(pid): The specified PID could not be found.")
    }

    tl = project?.altTimeline as any

    return { isCompleted: tl.schema[elementId].isCompleted, offset: tl.schema[elementId].completionOffset }
}

export async function addSubmission (projectId: string, elementId: number, subId: string) {
    let tl = _timeline

    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    })

    tl = project?.altTimeline as any

    let submissions: String[] = tl.schema[elementId].submissions
    submissions.push(subId)
    tl.schema[elementId].submissions = submissions as any

    await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            altTimeline: tl,
        }
    })
}

export async function removeSubmission (projectId: string, elementId: number, subId: number) {
    let tl = _timeline

    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    })

    tl = project?.altTimeline as any

    let submissions: String[] = tl.schema[elementId].submissions
    submissions.splice(subId, 1)
    tl.schema[elementId].submissions = submissions as any

    await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            altTimeline: tl,
        }
    })
}

export async function getSubmissions(projectId: string, elementId: number) {
    let tl = _timeline

    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    })

    tl = project?.altTimeline as any

    return tl.schema[elementId].submissions
}