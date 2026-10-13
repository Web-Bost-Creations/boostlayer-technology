import { NextResponse } from "next/server";
import { api } from "../../../../../convex/_generated/api";
import { billingContext } from "@/lib/account-server";
import { checkoutPlans, paidPlan } from "@/lib/checkout-plans";
import { syncInvoicePlan } from "@/lib/invoice-app";

function idOf(value: string | { id: string } | null) {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

export async function POST(request: Request) {
  const context = await billingContext(request);
  if ("error" in context) return context.error;
  const { stripe, convex, fulfillmentSecret, billing, body } = context;

  if (!stripe) {
    return NextResponse.json({ error: "Card payments are not connected yet." }, { status: 503 });
  }

  const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  if (!sessionId) {
    return NextResponse.json({ error: "The payment session is missing." }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const plan = paidPlan(session.metadata?.plan);
  if (
    !plan ||
    session.metadata?.accountId !== billing.accountId ||
    session.currency !== "cad" ||
    session.amount_total !== checkoutPlans[plan].amountCents
  ) {
    return NextResponse.json(
      { error: "This payment doesn't match the plan on the account." },
      { status: 400 },
    );
  }

  if (session.status !== "complete" || session.payment_status !== "paid") {
    return NextResponse.json({ error: "The card payment has not cleared yet." }, { status: 402 });
  }

  const stripeCustomerId = idOf(session.customer);
  const stripeSubscriptionId = idOf(session.subscription);
  if (!stripeCustomerId || !stripeSubscriptionId) {
    return NextResponse.json(
      { error: "Stripe didn't return the subscription for this payment." },
      { status: 502 },
    );
  }

  const granted = await convex.mutation(api.accounts.grantPaid, {
    fulfillmentSecret,
    accountId: billing.accountId,
    plan,
    stripeSessionId: session.id,
    stripeCustomerId,
    stripeSubscriptionId,
    amountCents: session.amount_total,
  });

  await syncInvoicePlan(billing.accountId, granted.plan);
  return NextResponse.json({ plan: granted.plan });
}
