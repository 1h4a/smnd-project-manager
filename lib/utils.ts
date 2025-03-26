import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCaps(input: string) {
  const noFirst = input.substring(1, input.length).toLowerCase()
  const first = input.substring(0, 1)
  return first + noFirst
}