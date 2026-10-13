import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { billingContext } from "@/lib/account-server";

function cardFrom(method: string | Stripe.PaymentMethod | null | undefined) {
  if (!method || typeof method === "string" || !method.card) return null;
  return {
    brand: method.card.brand,
    last4: method.card.last4,
    expMonth: method.card.exp_month,
    expYear: method.card.exp_year,
  };
}

export async function POST(request: Request) {
  const context = await billingContext(request);
  if ("error" in context) return context.error;
  const { stripe, billing } = context;

  if (!stripe || !billing.stripeCustomerId) {
    return NextResponse.json({ card: null, renewsAt: null, amountCents: null });
  }

  let card: ReturnType<typeof cardFrom> = null;
  let renewsAt: number | null = null;
  let amountCents: number | null = null;

  if (billing.stripeSubscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(billing.stripeSubscriptionId, {
      expand: ["default_payment_method"],
    });
    card = cardFrom(subscription.default_payment_method);
    const item = subscription.items.data[0];
    renewsAt = item?.current_period_end ? item.current_period_end * 1000 : null;
    amountCents = item?.price.unit_amount ?? null;
  }

  if (!card) {
    const customer = await stripe.customers.retrieve(billing.stripeCustomerId, {
      expand: ["invoice_settings.default_payment_method"],
    });
    if (!customer.deleted) {
      card = cardFrom(customer.invoice_settings?.default_payment_method);
    }
  }

  return NextResponse.json({ card, renewsAt, amountCents });
}
