import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import { api } from "../../../../../convex/_generated/api";
import { paidPlan } from "@/lib/checkout-plans";
import { signLaunchTicket } from "@/lib/launch-ticket";
import { getStripe } from "@/lib/stripe-server";

/** Stripe keeps retrying a past_due card, so access continues until the subscription ends. */
const openSubscription = new Set(["active", "trialing", "past_due"]);

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const fulfillmentSecret = process.env.CHECKOUT_FULFILLMENT_SECRET;
  const launchSecret = process.env.LAUNCH_SECRET;
  const appUrl = process.env.INVOICE_APP_URL?.trim().replace(/\/+$/, "");
  if (!convexUrl || !fulfillmentSecret || !launchSecret || !appUrl) {
    return fail("Invoice isn't connected yet.", 503);
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const token = typeof body.token === "string" ? body.token.trim() : "";
  if (!token) return fail("Sign in again.", 401);

  const convex = new ConvexHttpClient(convexUrl);
  const profile = await convex.query(api.billing.launchProfile, { fulfillmentSecret, token });
  if (!profile) return fail("Sign in again.", 401);
  if (!profile.license) return fail("Choose a plan before opening Invoice.", 403);

  if (paidPlan(profile.license.plan)) {
    if (!profile.stripeSubscriptionId) {
      return fail("This plan has no active subscription. Choose a plan again.", 402);
    }
    const stripe = getStripe();
    if (!stripe) return fail("Card payments are not connected yet.", 503);
    let status: string;
    try {
      status = (await stripe.subscriptions.retrieve(profile.stripeSubscriptionId)).status;
    } catch {
      return fail("Your subscription couldn't be checked. Try again shortly.", 502);
    }
    if (!openSubscription.has(status)) {
      return fail("Your subscription isn't active. Update your card from the Billing tab.", 402);
    }
  }

  const ticket = await signLaunchTicket(
    {
      accountId: profile.accountId,
      licenseKey: profile.license.key,
      plan: profile.license.plan,
      email: profile.email,
      fullName: profile.fullName,
      companyName: profile.companyName,
      province: profile.province ?? undefined,
      country: profile.country,
    },
    launchSecret,
  );
  return NextResponse.json(
    { url: `${appUrl}/launch?ticket=${encodeURIComponent(ticket)}` },
    { headers: { "Cache-Control": "no-store" } },
  );
}
