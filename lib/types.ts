﻿export type Role = "STUDENT" | "TEACHER" | "ADMIN"

export type AccessType = "PRIVATE" | "PUBLIC"

export const roleOrder: Role[] = ["STUDENT", "TEACHER", "ADMIN"]

export function getPermissionLevel(input: Role) {
    return roleOrder.indexOf(input) + 1
}