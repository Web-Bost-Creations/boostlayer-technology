"use client";

import { ConvexError } from "convex/values";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useState } from "react";
import { useConvexReady } from "@/components/convex-client-provider";
import { api } from "../../../convex/_generated/api";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/25";

type SignInResult = {
  recognized: boolean;
  fullName: string | null;
  companyName: string | null;
  email: string;
};

function errorMessage(error: unknown) {
  if (error instanceof ConvexError && typeof error.data === "string") {
    return error.data;
  }
  return "We couldn't check that email just now. Try again in a moment.";
}

export function SignInForm() {
  const ready = useConvexReady();
  if (!ready) {
    return <SignInFormLocal />;
  }
  return <SignInFormConnected />;
}

function SignInFormLocal() {
  const [email, setEmail] = useState<string | null>(null);
  if (email) {
    return (
      <SignInResultView
        result={{
          recognized: false,
          fullName: null,
          companyName: null,
          email,
        }}
        onReset={() => setEmail(null)}
      />
    );
  }
  return (
    <SignInFields
      pending={false}
      error={null}
      onSubmit={(emailAddress) => setEmail(emailAddress)}
    />
  );
}

function SignInFormConnected() {
  const record = useMutation(api.signIns.record);
  const [result, setResult] = useState<SignInResult | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (result) {
    return <SignInResultView result={result} onReset={() => setResult(null)} />;
  }

  return (
    <SignInFields
      pending={pending}
      error={error}
      onSubmit={async (email) => {
        setPending(true);
        setError(null);
        try {
          const saved = await record({ email });
          setResult({ ...saved, email });
        } catch (caught) {
          setError(errorMessage(caught));
        } finally {
          setPending(false);
        }
      }}
    />
  );
}

function SignInResultView({
  result,
  onReset,
}: {
  result: SignInResult;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[360px] flex-col justify-center gap-3 rounded-2xl border border-white/[0.08] bg-[#111] p-8">
      <p className="text-sm font-medium text-[var(--accent)]">
        {result.recognized ? "On file" : "No account yet"}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-white">
        {result.recognized
          ? `${result.fullName} is on file${result.companyName ? ` at ${result.companyName}` : ""}.`
          : `Invoice doesn't have a sign-in for ${result.email}.`}
      </h2>
      <p className="text-[var(--muted)]">
        {result.recognized
          ? "Password sign-in opens with the Invoice account. We saved this visit on the company record."
          : "Start on a plan, or ask for a walkthrough and we'll set the account up with you."}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/pricing"
          className="inline-flex items-center rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-foreground)]"
        >
          See pricing
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white"
        >
          Try another email
        </button>
      </div>
    </div>
  );
}

function SignInFields({
  pending,
  error,
  onSubmit,
}: {
  pending: boolean;
  error: string | null;
  onSubmit: (email: string) => void;
}) {
  return (
    <form
      className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#111] p-6"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit(String(data.get("email") ?? ""));
      }}
    >
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
          autoComplete="current-password"
          placeholder="••••••••"
          className={fieldClass}
        />
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-[var(--accent)] py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
      >
        {pending ? "Checking..." : "Sign in"}
      </button>
      <p className="text-sm text-zinc-500">
        New to Invoice?{" "}
        <Link href="/contact" className="text-[var(--accent)] hover:underline">
          Request a walkthrough
        </Link>
        .
      </p>
    </form>
  );
}
