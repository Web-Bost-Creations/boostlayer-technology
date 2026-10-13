import Stripe from "stripe";
import { checkoutPlans, type PaidPlan } from "./checkout-plans";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes("REPLACE_ME")) return null;
  return new Stripe(key);
}

export async function priceFor(stripe: Stripe, plan: PaidPlan) {
  const lookupKey = `invoice_${plan}_monthly_cad`;
  const existing = await stripe.prices.list({
    lookup_keys: [lookupKey],
    active: true,
    limit: 1,
  });
  if (existing.data[0]) return existing.data[0].id;

  const offer = checkoutPlans[plan];
  const price = await stripe.prices.create({
    currency: "cad",
    unit_amount: offer.amountCents,
    recurring: { interval: "month" },
    lookup_key: lookupKey,
    product_data: { name: `Invoice ${offer.name}` },
  });
  return price.id;
}

export async function portalConfiguration(stripe: Stripe) {
  const configurations = await stripe.billingPortal.configurations.list({
    active: true,
    limit: 100,
  });
  const existing = configurations.data.find(
    (configuration) => configuration.metadata?.app === "boostlayer-account",
  );
  if (existing) return existing.id;

  const created = await stripe.billingPortal.configurations.create({
    metadata: { app: "boostlayer-account" },
    features: {
      payment_method_update: { enabled: true },
      invoice_history: { enabled: true },
      customer_update: { enabled: true, allowed_updates: ["address", "tax_id"] },
      subscription_cancel: { enabled: false },
      subscription_update: { enabled: false },
    },
  });
  return created.id;
}
