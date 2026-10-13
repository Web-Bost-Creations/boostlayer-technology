import { ConvexError } from "convex/values";

export const invoicePlans = {
  starter: {
    amountCents: 0,
    rank: 0,
    invoicesPerMonth: 5,
    teamMembers: 1,
  },
  growth: {
    amountCents: 3900,
    rank: 1,
    invoicesPerMonth: null,
    teamMembers: 1,
  },
  business: {
    amountCents: 9900,
    rank: 2,
    invoicesPerMonth: null,
    teamMembers: null,
  },
} as const;

export type InvoicePlanId = keyof typeof invoicePlans;

export function invoicePlan(plan: string): InvoicePlanId {
  if (plan === "starter" || plan === "growth" || plan === "business") {
    return plan;
  }
  throw new ConvexError("Choose Starter, Growth, or Business.");
}
