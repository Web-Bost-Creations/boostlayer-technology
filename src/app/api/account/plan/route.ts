import { NextResponse } from "next/server";
import { api } from "../../../../../convex/_generated/api";
import { billingContext } from "@/lib/account-server";
import { paidPlan } from "@/lib/checkout-plans";
import { syncInvoicePlan } from "@/lib/invoice-app";
import { priceFor } from "@/lib/stripe-server";

export async function POST(request: Request) {
  const context = await billingContext(request);
  if ("error" in context) return context.error;
  const { stripe, convex, fulfillmentSecret, billing, body } = context;

  const target = body.plan;
  if (target !== "starter" && target !== "growth" && target !== "business") {
    return NextResponse.json({ error: "Choose Starter, Growth, or Business." }, { status: 400 });
  }
  if (target === billing.plan) {
    return NextResponse.json({ error: "You're already on that plan." }, { status: 400 });
  }

  if (target === "starter") {
    if (billing.stripeSubscriptionId) {
      if (!stripe) {
        return NextResponse.json(
          { error: "Card payments are not connected yet." },
          { status: 503 },
        );
      }
      await stripe.subscriptions.cancel(billing.stripeSubscriptionId, {
        prorate: true,
        invoice_now: true,
      });
    }
    const result = await convex.mutation(api.billing.moveToStarter, {
      fulfillmentSecret,
      accountId: billing.accountId,
    });
    await syncInvoicePlan(billing.accountId, result.plan);
    return NextResponse.json({ plan: result.plan });
  }

  const plan = paidPlan(target);
  if (!plan) {
    return NextResponse.json({ error: "Choose Growth or Business." }, { status: 400 });
  }

  if (!billing.stripeSubscriptionId) {
    return NextResponse.json({ checkoutPath: `/checkout?plan=${plan}` });
  }

  if (!stripe) {
    return NextResponse.json({ error: "Card payments are not connected yet." }, { status: 503 });
  }

  const subscription = await stripe.subscriptions.retrieve(billing.stripeSubscriptionId);
  const item = subscription.items.data[0];
  if (!item) {
    return NextResponse.json(
      { error: "This subscription has no plan attached." },
      { status: 409 },
    );
  }

  try {
    await stripe.subscriptions.update(subscription.id, {
      items: [{ id: item.id, price: await priceFor(stripe, plan) }],
      proration_behavior: "always_invoice",
      payment_behavior: "error_if_incomplete",
      metadata: { accountId: billing.accountId, plan },
    });
  } catch (caught) {
    const message =
      caught instanceof Error ? caught.message : "The card on file was declined.";
    return NextResponse.json(
      { error: `The plan change wasn't charged: ${message}` },
      { status: 402 },
    );
  }

  const result = await convex.mutation(api.billing.changePaidPlan, {
    fulfillmentSecret,
    accountId: billing.accountId,
    stripeSubscriptionId: subscription.id,
    plan,
  });
  await syncInvoicePlan(billing.accountId, result.plan);
  return NextResponse.json({ plan: result.plan });
}
