import { Category } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategoryNameById(id: string, categories: Category[]) {
  const name = categories.find((category) => category.id === id)?.name;
  return name;
}
