import { type ClassValue, clsx } from "clsx"
import { usePathname, useSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const colors = [
  "bg-green-300",
  "bg-sky-300",
  "bg-rose-200",
  "bg-purple-200",
  "bg-violet-200",
  "bg-lime-200"
]

export const getUsername = () => {
  return usePathname().split('/')[2];
}

export const getUid = () => {
  return useSearchParams().get('uid');
}