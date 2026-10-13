import { NextResponse } from "next/server";
import { billingContext } from "@/lib/account-server";
import { portalConfiguration } from "@/lib/stripe-server";

export async function POST(request: Request) {
  const context = await billingContext(request);
  if ("error" in context) return context.error;
  const { stripe, billing } = context;

  if (!stripe) {
    return NextResponse.json({ error: "Card payments are not connected yet." }, { status: 503 });
  }
  if (!billing.stripeCustomerId) {
    return NextResponse.json(
      { error: "There's no card on file yet. Choose Growth or Business to add one." },
      { status: 400 },
    );
  }

  const origin = new URL(request.url).origin;
  const session = await stripe.billingPortal.sessions.create({
    customer: billing.stripeCustomerId,
    configuration: await portalConfiguration(stripe),
    return_url: `${origin}/account?tab=billing`,
  });
  return NextResponse.json({ url: session.url });
}
