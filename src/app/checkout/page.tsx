import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/landing/checkout-form.client";

export const metadata: Metadata = {
  title: "Confirm your plan",
  description: "Confirm an Invoice plan, get a key, and open the software for that tier.",
};

export default function CheckoutPage() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-[var(--accent)]">Invoice</p>
          <h1 className="mt-2 max-w-md text-4xl font-semibold tracking-tight text-white">
            Confirm the plan. Get your key.
          </h1>
          <p className="mt-4 max-w-md text-[var(--muted)]">
            Growth and Business are charged on this page. Invoice opens only
            after the card payment clears, with the key attached to the account.
          </p>
        </div>
        <Suspense
          fallback={<div className="min-h-[280px] rounded-2xl border border-white/[0.06] bg-[#111]" />}
        >
          <CheckoutForm />
        </Suspense>
      </div>
    </section>
  );
}
