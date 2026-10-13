import type { Metadata } from "next";
import Link from "next/link";
import { SignUpForm, type SignupPlan } from "@/components/landing/sign-up-form.client";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create an Invoice account, then confirm a plan and open the software.",
};

function selectedPlan(value: string | undefined): SignupPlan {
  if (value === "growth" || value === "business") return value;
  return "starter";
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  const chosen = selectedPlan(plan);

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-[var(--accent)]">Invoice</p>
          <h1 className="mt-2 max-w-md text-4xl font-semibold tracking-tight text-white">
            Create your Invoice account.
          </h1>
          <p className="mt-4 max-w-md text-[var(--muted)]">
            Email and a password open the account. The next step confirms the
            plan, attaches your key, and opens Invoice for that tier.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Back to pricing
          </Link>
        </div>
        <SignUpForm plan={chosen} />
      </div>
    </section>
  );
}
