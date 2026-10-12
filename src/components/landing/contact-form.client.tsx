"use client";

import { ConvexError } from "convex/values";
import { useMutation } from "convex/react";
import { useState } from "react";
import { useConvexReady } from "@/components/convex-client-provider";
import { api } from "../../../convex/_generated/api";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/25";

const needs = [
  "Send invoices",
  "Recurring billing",
  "Replace a spreadsheet",
  "Bilingual invoices",
  "Not sure yet",
] as const;

type Need = (typeof needs)[number];

function isNeed(value: string): value is Need {
  return needs.some((need) => need === value);
}

function errorMessage(error: unknown) {
  if (error instanceof ConvexError && typeof error.data === "string") {
    return error.data;
  }
  return "We couldn't save that just now. Try again in a moment.";
}

export function ContactForm() {
  const ready = useConvexReady();
  if (!ready) {
    return <ContactFormLocal />;
  }
  return <ContactFormConnected />;
}

function ContactFormLocal() {
  const [sent, setSent] = useState<{ name: string; email: string } | null>(
    null,
  );

  if (sent) {
    return <Received name={sent.name} email={sent.email} onReset={() => setSent(null)} />;
  }

  return (
    <ContactFields
      pending={false}
      error={null}
      onSubmit={(fields) => setSent({ name: fields.fullName, email: fields.email })}
    />
  );
}

function ContactFormConnected() {
  const submit = useMutation(api.leads.submit);
  const [sent, setSent] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) {
    return <Received name={sent.name} email={sent.email} onReset={() => setSent(null)} />;
  }

  return (
    <ContactFields
      pending={pending}
      error={error}
      onSubmit={async (fields) => {
        setPending(true);
        setError(null);
        try {
          await submit(fields);
          setSent({ name: fields.fullName, email: fields.email });
        } catch (caught) {
          setError(errorMessage(caught));
        } finally {
          setPending(false);
        }
      }}
    />
  );
}

function Received({
  name,
  email,
  onReset,
}: {
  name: string;
  email: string;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[420px] flex-col justify-center gap-3 rounded-2xl border border-[var(--accent)]/25 bg-[#111] p-8">
      <p className="text-sm font-medium text-[var(--accent)]">Request received</p>
      <h3 className="text-2xl font-semibold tracking-tight text-white">
        We&apos;ll reply within one business day.
      </h3>
      <p className="text-[var(--muted)]">
        Thanks {name}. We&apos;ll write to {email} about getting Invoice set up
        for your business.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 inline-flex w-fit items-center rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:border-[var(--accent)]/35 hover:bg-[var(--accent-muted)]"
      >
        Send another note
      </button>
    </div>
  );
}

function ContactFields({
  pending,
  error,
  onSubmit,
}: {
  pending: boolean;
  error: string | null;
  onSubmit: (fields: {
    fullName: string;
    email: string;
    companyName: string;
    need: Need;
    message: string;
  }) => void;
}) {
  return (
    <form
      className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#111] p-6"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const need = String(data.get("need") ?? "");
        if (!isNeed(need)) {
          return;
        }
        onSubmit({
          fullName: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          companyName: String(data.get("company") ?? ""),
          need,
          message: String(data.get("message") ?? ""),
        });
      }}
    >
      <label className="block">
        <span className="text-sm text-[var(--muted)]">Full Name</span>
        <input
          name="name"
          required
          placeholder="Jane Smith"
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className="text-sm text-[var(--muted)]">Work Email</span>
        <input
          type="email"
          name="email"
          required
          placeholder="jane@company.ca"
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className="text-sm text-[var(--muted)]">Company</span>
        <input
          name="company"
          required
          placeholder="Harbour & Co"
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className="text-sm text-[var(--muted)]">What do you need?</span>
        <select name="need" required className={fieldClass} defaultValue="">
          <option value="" disabled>
            Select a starting point
          </option>
          {needs.map((need) => (
            <option key={need}>{need}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm text-[var(--muted)]">Message</span>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Tell us how you invoice today, and what you want Invoice to handle..."
          className={`${fieldClass} resize-y`}
        />
      </label>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[var(--accent)] py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
      >
        {pending ? "Sending..." : "Request a walkthrough"}
      </button>
      <p className="text-center text-xs text-zinc-500">
        We typically respond within 1 business day. No spam, ever.
      </p>
    </form>
  );
}
