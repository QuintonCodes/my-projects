import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(amount);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function highlightText(text: string, query: string): string {
  if (!query || !text) return text;

  // Escape special characters in the query
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Create a regular expression with the escaped query
  const regex = new RegExp(`(${escapedQuery})`, "gi");

  // Replace matches with highlighted version
  return text.replace(
    regex,
    '<mark class="bg-amber-200 rounded-sm px-0.5">$1</mark>'
  );
}
