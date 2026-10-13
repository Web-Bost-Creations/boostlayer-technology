import { NextResponse } from "next/server";
import { billingContext } from "@/lib/account-server";
import { paidPlan } from "@/lib/checkout-plans";
import { priceFor } from "@/lib/stripe-server";

export async function POST(request: Request) {
  const context = await billingContext(request);
  if ("error" in context) return context.error;
  const { stripe, billing, body } = context;

  if (!stripe) {
    return NextResponse.json({ error: "Card payments are not connected yet." }, { status: 503 });
  }

  const plan = paidPlan(body.plan);
  if (!plan) {
    return NextResponse.json({ error: "Choose Growth or Business." }, { status: 400 });
  }
  if (billing.stripeSubscriptionId) {
    return NextResponse.json(
      { error: "This account already pays by card. Change plans from your account page." },
      { status: 409 },
    );
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    mode: "subscription",
    redirect_on_completion: "never",
    ...(billing.stripeCustomerId
      ? { customer: billing.stripeCustomerId }
      : { customer_email: billing.email }),
    client_reference_id: billing.accountId,
    metadata: { accountId: billing.accountId, plan },
    subscription_data: { metadata: { accountId: billing.accountId, plan } },
    line_items: [{ price: await priceFor(stripe, plan), quantity: 1 }],
  });

  if (!session.client_secret) {
    return NextResponse.json({ error: "Stripe did not start the payment." }, { status: 502 });
  }

  return NextResponse.json({
    clientSecret: session.client_secret,
    sessionId: session.id,
  });
}
