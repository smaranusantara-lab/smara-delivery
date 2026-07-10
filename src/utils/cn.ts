import { clsx, type ClassValue } from "clsx";

/**
 * Merges class names conditionally. Thin wrapper around clsx so every
 * component has one consistent way to compose Tailwind classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
