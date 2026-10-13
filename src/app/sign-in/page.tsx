import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/components/landing/sign-in-form.client";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Invoice, the billing layer from Boostlayer.",
};

export default function SignInPage() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-[var(--accent)]">Invoice</p>
          <h1 className="mt-2 max-w-md text-4xl font-semibold tracking-tight text-white">
            Sign in to Invoice.
          </h1>
          <p className="mt-4 max-w-md text-[var(--muted)]">
            The billing layer for your Canadian business. New here? Choose a plan,
            create an account, and Invoice opens on the link for that tier.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/invoice/pricing"
              className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)]"
            >
              See pricing
            </Link>
            <Link
              href="/invoice#preview"
              className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white"
            >
              Try the preview
            </Link>
          </div>
        </div>
        <SignInForm />
      </div>
    </section>
  );
}
