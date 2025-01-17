import {clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date,type="dd-mm-yyyy") {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');  // Ensure two digits for day
  const month = String(d.getMonth() + 1).padStart(2, '0');  // getMonth() returns 0-11, so add 1
  const year = d.getFullYear();
  if (type === "dd-mm-yyyy") return `${day}-${month}-${year}`;
  else if (type === "yyyy-mm-dd") return `${year}-${month}-${day}`;
  return `${day}-${month}-${year}`;
}