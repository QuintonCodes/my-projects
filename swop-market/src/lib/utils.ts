import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCondition(condition: string) {
  switch (condition) {
    case "new":
      return "New";
    case "used_new":
      return "Used - New";
    case "used_good":
      return "Used - Good";
    case "used_fair":
      return "Used - Fair";
    case "for_parts":
      return "For Parts or Not Working";
    default:
      // Fallback: Capitalize and replace underscores with spaces
      return condition
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
  }
}

export function formatDeliveryOption(option: string) {
  switch (option) {
    case "pickup":
      return "Pickup";
    case "courier":
      return "Courier";
    case "local_delivery":
      return "Local Delivery";
    case "meet_in_person":
      return "Meet in Person";
    default:
      // Fallback: Capitalize and replace underscores with spaces
      return option
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
  }
}

export function formatStatus(status: string) {
  switch (status) {
    case "active":
      return "Active";
    case "sold":
      return "Sold";
    case "draft":
      return "Draft";
    default:
      break;
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "sold":
      return "bg-blue-500";
    case "draft":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
}

export function getConditionColor(condition: string) {
  switch (condition) {
    case "new":
      return "bg-green-600";
    case "used_new":
      return "bg-teal-700";
    case "used_good":
      return "bg-amber-500";
    case "used_fair":
      return "bg-orange-500";
    default:
      return "bg-red-500";
  }
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
