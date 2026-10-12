import { ConvexError } from "convex/values";

export function cleanEmail(value: string) {
  const email = value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    throw new ConvexError("Enter a work email we can reply to.");
  }
  return email;
}

export function cleanName(value: string, label: string) {
  const name = value.trim().replace(/\s+/g, " ");
  if (name.length < 1 || name.length > 120) {
    throw new ConvexError(`Enter a ${label} we can keep on the record.`);
  }
  return name;
}

export function cleanMessage(value: string) {
  const message = value.trim();
  if (message.length < 1 || message.length > 4000) {
    throw new ConvexError("Keep the message under 4,000 characters.");
  }
  return message;
}

export function slugify(name: string) {
  const slug = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || "customer";
}

export function assertCents(value: number, label: string) {
  if (!Number.isInteger(value) || value < 0 || value > 100_000_000_00) {
    throw new ConvexError(`${label} needs to be a whole number of cents.`);
  }
}
