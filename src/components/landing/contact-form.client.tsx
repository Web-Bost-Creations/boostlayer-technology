"use client";

import { useState } from "react";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/25";

export function ContactForm() {
  const [sent, setSent] = useState<{ name: string; email: string } | null>(
    null,
  );

  if (sent) {
    return (
      <div className="flex min-h-[420px] flex-col justify-center gap-3 rounded-2xl border border-[var(--accent)]/25 bg-[#111] p-8">
        <p className="text-sm font-medium text-[var(--accent)]">
          Request received
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-white">
          We&apos;ll reply within one business day.
        </h3>
        <p className="text-[var(--muted)]">
          Thanks {sent.name}. We&apos;ll write to {sent.email} about getting
          Invoice set up for your business.
        </p>
        <button
          type="button"
          onClick={() => setSent(null)}
          className="mt-4 inline-flex w-fit items-center rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:border-[var(--accent)]/35 hover:bg-[var(--accent-muted)]"
        >
          Send another note
        </button>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#111] p-6"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = String(data.get("name") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();
        setSent({ name, email });
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
        <select
          name="need"
          required
          className={fieldClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select a starting point
          </option>
          <option>Send invoices</option>
          <option>Recurring billing</option>
          <option>Replace a spreadsheet</option>
          <option>Bilingual invoices</option>
          <option>Not sure yet</option>
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
      <button
        type="submit"
        className="rounded-lg bg-[var(--accent)] py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99]"
      >
        Request a walkthrough
      </button>
      <p className="text-center text-xs text-zinc-500">
        We typically respond within 1 business day. No spam, ever.
      </p>
    </form>
  );
}
