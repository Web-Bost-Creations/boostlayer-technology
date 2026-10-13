"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ConvexError } from "convex/values";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useConvexReady } from "@/components/convex-client-provider";
import { openInvoice } from "@/lib/open-invoice";
import { readSession } from "@/lib/session";
import { api } from "../../../convex/_generated/api";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise =
  publishableKey && !publishableKey.includes("REPLACE_ME")
    ? loadStripe(publishableKey)
    : null;

const offers = {
  starter: {
    name: "Starter",
    price: "CAD $0",
    detail: "5 invoices a month, GST/HST, and PDF invoices.",
    action: "Confirm and open Invoice",
  },
  growth: {
    name: "Growth",
    price: "CAD $39/month",
    detail: "Unlimited invoices, Interac requests, reminders, and bilingual PDFs.",
    action: "Confirm and open Invoice",
  },
  business: {
    name: "Business",
    price: "CAD $99/month",
    detail: "Growth, plus a team, deposits, tax summaries, and bookkeeper export.",
    action: "Confirm and open Invoice",
  },
} as const;

type CheckoutPlan = keyof typeof offers;

function chosenPlan(value: string | null): CheckoutPlan {
  if (value === "growth" || value === "business" || value === "starter") return value;
  return "starter";
}

function errorMessage(error: unknown) {
  if (error instanceof ConvexError && typeof error.data === "string") {
    return error.data;
  }
  return "We couldn't confirm that plan just now. Try again in a moment.";
}

export function CheckoutForm() {
  const ready = useConvexReady();
  const searchParams = useSearchParams();
  const plan = chosenPlan(searchParams.get("plan"));
  if (!ready) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
        <p className="text-sm text-red-300">Paying for a plan needs the Invoice database.</p>
      </div>
    );
  }
  return <CheckoutConnected plan={plan} />;
}

function CheckoutConnected({ plan }: { plan: CheckoutPlan }) {
  const router = useRouter();
  const purchase = useMutation(api.accounts.purchase);
  const offer = offers[plan];
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setToken(readSession());
  }, []);

  if (token === undefined) {
    return <div className="min-h-[280px] rounded-2xl border border-white/[0.06] bg-[#111]" />;
  }

  if (!token) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
        <h2 className="text-2xl font-semibold text-white">Create an account first.</h2>
        <p className="mt-3 text-[var(--muted)]">
          The {offer.name} plan is confirmed after the account exists.
        </p>
        <Link
          href={`/sign-up?plan=${plan}`}
          className="mt-6 inline-flex rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)]"
        >
          Create account
        </Link>
      </div>
    );
  }

  if (plan !== "starter") {
    return <CardPayment key={plan} token={token} plan={plan} />;
  }

  return (
    <form
      className="rounded-2xl border border-white/[0.06] bg-[#111] p-6"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        setError(null);
        try {
          await purchase({ token, plan });
        } catch (caught) {
          setError(errorMessage(caught));
          setPending(false);
          return;
        }
        await openInvoice(token).catch(() => router.push("/account"));
      }}
    >
      <p className="text-sm font-medium text-[var(--accent)]">Invoice · {offer.name}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">{offer.price}</h2>
      <p className="mt-3 text-[var(--muted)]">{offer.detail}</p>
      <p className="mt-4 text-sm text-white/80">
        Starter is free. Confirming it attaches an Invoice key and opens the software.
      </p>
      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-lg bg-[var(--accent)] py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
      >
        {pending ? "Opening Invoice..." : offer.action}
      </button>
    </form>
  );
}

function CardPayment({ token, plan }: { token: string; plan: "growth" | "business" }) {
  const router = useRouter();
  const offer = offers[plan];
  const tokenRef = useRef(token);
  const sessionRef = useRef<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [opening, setOpening] = useState(false);
  tokenRef.current = token;

  const fetchClientSecret = useRef(async () => {
    const response = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: tokenRef.current, plan }),
    });
    const data = (await response.json()) as { clientSecret?: string; sessionId?: string; error?: string };
    if (!response.ok || !data.clientSecret || !data.sessionId) {
      const message = data.error ?? "Card payments are not connected yet.";
      setError(message);
      throw new Error(message);
    }
    sessionRef.current = data.sessionId;
    return data.clientSecret;
  }).current;

  const onComplete = useRef(() => {
    void (async () => {
      const sessionId = sessionRef.current;
      if (!sessionId) {
        setError("The payment session is missing.");
        return;
      }
      setOpening(true);
      setError(null);
      const response = await fetch("/api/checkout/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenRef.current, sessionId }),
      });
      const data = (await response.json()) as { plan?: string; error?: string };
      if (!response.ok || !data.plan) {
        setOpening(false);
        setError(data.error ?? "The card payment has not cleared yet.");
        return;
      }
      await openInvoice(tokenRef.current).catch(() => router.push("/account"));
    })();
  }).current;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
      <p className="text-sm font-medium text-[var(--accent)]">Invoice · {offer.name}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">{offer.price}</h2>
      <p className="mt-3 text-sm text-white/80">
        Pay on this page. Invoice opens after the card charge clears.
      </p>
      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      {opening ? <p className="mt-4 text-sm text-[var(--muted)]">Opening Invoice...</p> : null}
      {stripePromise ? (
        <div className="mt-6 overflow-hidden rounded-xl">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret, onComplete }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      ) : (
        <p className="mt-6 text-sm text-red-300">
          Add the Stripe publishable key before a card can be charged here.
        </p>
      )}
    </div>
  );
}
