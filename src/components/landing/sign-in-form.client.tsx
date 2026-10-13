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

function errorMessage(error: unknown) {
  if (error instanceof ConvexError && typeof error.data === "string") {
    return error.data;
  }
  return "We couldn't sign you in just now. Try again in a moment.";
}

export function SignInForm() {
  const ready = useConvexReady();
  if (!ready) {
    return <SignInNotice message="Sign-in needs the Invoice database." />;
  }
  return <SignInConnected />;
}

function SignInNotice({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
      <p className="text-sm text-red-300">{message}</p>
    </div>
  );
}

function SignInConnected() {
  const router = useRouter();
  const signIn = useMutation(api.accounts.signIn);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#111] p-6"
      onSubmit={async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setPending(true);
        setError(null);
        try {
          const session = await signIn({
            email: String(data.get("email") ?? ""),
            password: String(data.get("password") ?? ""),
          });
          saveSession(session.token);
          router.push(session.hasLicense ? "/account" : `/checkout?plan=${session.plan}`);
        } catch (caught) {
          setError(errorMessage(caught));
          setPending(false);
        }
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
          minLength={8}
          autoComplete="current-password"
          className={fieldClass}
        />
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-[var(--accent)] py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-sm text-zinc-500">
        New to Invoice?{" "}
        <Link href="/pricing" className="text-[var(--accent)] hover:underline">
          Choose a plan
        </Link>
        .
      </p>
    </form>
  );
}
