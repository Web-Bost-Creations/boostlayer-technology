import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import { api } from "../../convex/_generated/api";
import { getStripe } from "./stripe-server";

export async function billingContext(request: Request) {
  const stripe = getStripe();
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const fulfillmentSecret = process.env.CHECKOUT_FULFILLMENT_SECRET;
  if (!convexUrl || !fulfillmentSecret) {
    return {
      error: NextResponse.json({ error: "Billing is not connected yet." }, { status: 503 }),
    } as const;
  }

  const body = (await request.json()) as Record<string, unknown>;
  const token = typeof body.token === "string" ? body.token.trim() : "";
  if (!token) {
    return {
      error: NextResponse.json({ error: "Sign in again." }, { status: 401 }),
    } as const;
  }

  const convex = new ConvexHttpClient(convexUrl);
  const billing = await convex.query(api.billing.forToken, {
    fulfillmentSecret,
    token,
  });
  if (!billing) {
    return {
      error: NextResponse.json({ error: "Sign in again." }, { status: 401 }),
    } as const;
  }

  return { stripe, convex, fulfillmentSecret, billing, body } as const;
}
