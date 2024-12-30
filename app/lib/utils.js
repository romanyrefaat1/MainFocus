import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
