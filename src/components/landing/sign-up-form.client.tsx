"use client";

import { ConvexError } from "convex/values";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useConvexReady } from "@/components/convex-client-provider";
import { saveSession } from "@/lib/session";
import { api } from "../../../convex/_generated/api";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/25";

const plans = {
  starter: { name: "Starter", price: "CAD $0" },
  growth: { name: "Growth", price: "CAD $39/month" },
  business: { name: "Business", price: "CAD $99/month" },
} as const;

export type SignupPlan = keyof typeof plans;

function errorMessage(error: unknown) {
  if (error instanceof ConvexError && typeof error.data === "string") {
    return error.data;
  }
  return "We couldn't create that account just now. Try again in a moment.";
}

export function SignUpForm({ plan }: { plan: SignupPlan }) {
  const ready = useConvexReady();
  if (!ready) {
    return (
      <SignUpNotice plan={plan} message="Account signup needs the Invoice database." />
    );
  }
  return <SignUpConnected plan={plan} />;
}

function SignUpNotice({ plan, message }: { plan: SignupPlan; message: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
      <p className="text-sm font-medium text-[var(--accent)]">{plans[plan].name}</p>
      <p className="mt-3 text-sm text-red-300">{message}</p>
    </div>
  );
}

function SignUpConnected({ plan }: { plan: SignupPlan }) {
  const router = useRouter();
  const signUp = useMutation(api.accounts.signUp);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#111] p-6"
      onSubmit={async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = String(data.get("password") ?? "");
        const confirm = String(data.get("confirm") ?? "");
        if (password !== confirm) {
          setError("Those passwords don't match.");
          return;
        }
        setPending(true);
        setError(null);
        try {
          const session = await signUp({
            fullName: String(data.get("fullName") ?? ""),
            companyName: String(data.get("companyName") ?? ""),
            email: String(data.get("email") ?? ""),
            password,
            plan,
          });
          saveSession(session.token);
          router.push(`/checkout?plan=${session.plan}`);
        } catch (caught) {
          setError(errorMessage(caught));
          setPending(false);
        }
      }}
    >
      <div>
        <p className="text-sm font-medium text-[var(--accent)]">{plans[plan].name}</p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {plans[plan].price}. After this account, you confirm the plan and get an Invoice key.
        </p>
      </div>
      <div>
        <label htmlFor="fullName" className="text-sm text-zinc-300">
          Your name
        </label>
        <input id="fullName" name="fullName" required autoComplete="name" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="companyName" className="text-sm text-zinc-300">
          Company
        </label>
        <input
          id="companyName"
          name="companyName"
          required
          autoComplete="organization"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm text-zinc-300">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@company.ca"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm text-zinc-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="confirm" className="text-sm text-zinc-300">
          Confirm password
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={fieldClass}
        />
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-[var(--accent)] py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
      >
        {pending ? "Creating account..." : "Create account"}
      </button>
      <p className="text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-[var(--accent)] hover:underline">
          Sign in
        </Link>
        .
      </p>
    </form>
  );
}
