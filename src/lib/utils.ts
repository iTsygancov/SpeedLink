import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAlphanumericKeysArray() {
  const keysArray = [];

  // Generate lowercase alphabetic keys
  for (let i = 65; i <= 90; i++) {
    keysArray.push(String.fromCharCode(i));
  }

  // Generate numeric keys
  for (let i = 48; i <= 57; i++) {
    keysArray.push(String.fromCharCode(i));
  }

  return keysArray;
}
