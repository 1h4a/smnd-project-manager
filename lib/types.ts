export type UserRole = "guest" | "student" | "teacher" | "admin"

export type ProjectType = "RP" | "PP" | "SOC"

export type FileType = "document" | "spreadsheet" | "presentation" | "image" | "other"

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
}

export interface Project {
    id: string
    title: string
    type: ProjectType
    studentId: string[]
    teacherId: string[]
    description: string
    createdAt: Date
    updatedAt: Date
    submissionDeadline: Date
    files: File[]
}

export interface Deadline {
    id: string
    projectId: string
    title: string
    dueDate: Date
    completed: boolean
    messages: DeadlineMessage[]
    submissions: FileSubmission[]
}

export interface File {
    id: string
    name: string
    projectId: string
    uploadDate: Date
    url: string
    fileType: FileType
}

export interface DeadlineMessage {
    id: string
    deadlineId: string
    message: string
    createdAt: Date
}

export interface FileSubmission {
    id: string
    deadlineId: string
    fileName: string
    fileUrl: string
    submittedAt: Date
    submittedBy: string
}
