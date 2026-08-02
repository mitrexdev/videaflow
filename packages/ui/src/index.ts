import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes without conflicts — shadcn-style util. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
