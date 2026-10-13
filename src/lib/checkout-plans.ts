export const checkoutPlans = {
  growth: { name: "Growth", amountCents: 3900 },
  business: { name: "Business", amountCents: 9900 },
} as const;

export type PaidPlan = keyof typeof checkoutPlans;

export function paidPlan(value: unknown): PaidPlan | null {
  if (value === "growth" || value === "business") return value;
  return null;
}
