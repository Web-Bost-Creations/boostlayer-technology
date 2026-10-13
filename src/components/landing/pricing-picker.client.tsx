"use client";

import Link from "next/link";
import { useState } from "react";
import { invoicePlans } from "./invoice-plans";

const products = [
  {
    id: "invoice",
    name: "Invoice",
    status: "Live",
    href: "/invoice",
    lede: "Billing, tax, and a record of what you're owed.",
    priced: true,
  },
  {
    id: "payments",
    name: "Payments",
    status: "Coming Q1",
    href: "/payments",
    lede: "Money in and out, tied to the invoice that caused it.",
    priced: false,
  },
  {
    id: "inventory",
    name: "Inventory",
    status: "Planned",
    href: "/inventory",
    lede: "Stock that moves when a bill goes out.",
    priced: false,
  },
  {
    id: "payroll",
    name: "Payroll",
    status: "Future",
    href: "/payroll",
    lede: "Pay runs on the same books as the revenue you billed.",
    priced: false,
  },
] as const;

function statusClass(status: string) {
  if (status === "Live") return "text-[var(--accent)]";
  if (status === "Coming Q1") return "text-[#e3a45c]";
  return "text-zinc-500";
}

export function PricingPicker() {
  const [selectedId, setSelectedId] = useState<(typeof products)[number]["id"]>(
    "invoice",
  );
  const selected = products.find((product) => product.id === selectedId) ?? products[0];

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium text-[var(--accent)]">Pricing</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Pick a product.{" "}
          <span className="text-[var(--accent)]">See its tiers.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          Prices are in Canadian dollars and belong to one product. Invoice is
          the product you can buy today.
        </p>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="order-2 min-w-0 flex-1 lg:order-1" aria-live="polite">
            <p className="text-sm font-medium text-[var(--accent)]">{selected.name}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              {selected.priced
                ? "Pricing for Invoice."
                : `Pricing for ${selected.name} isn't set yet.`}
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">{selected.lede}</p>

            {selected.priced ? (
              <div className="mt-8 grid gap-4 xl:grid-cols-3">
                {invoicePlans.map((plan) => (
                  <article
                    key={plan.name}
                    className={`relative flex flex-col rounded-2xl border p-6 transition-[border-color,box-shadow] duration-200 ${
                      plan.popular
                        ? "border-[var(--accent)]/45 bg-[#0d1512] shadow-[0_0_0_1px_rgba(0,240,164,0.35),0_0_48px_rgba(0,240,164,0.12)]"
                        : "border-white/[0.06] bg-[#111]"
                    }`}
                  >
                    {plan.popular ? (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)] px-3 py-0.5 text-xs font-semibold text-[var(--accent-foreground)] shadow-[0_0_16px_var(--accent-glow)]">
                        Most chosen
                      </span>
                    ) : null}
                    <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                    <p className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-semibold text-white">{plan.price}</span>
                      <span className="text-[var(--muted)]">{plan.period}</span>
                    </p>
                    <p className="mt-2 text-sm text-[var(--muted)]">{plan.desc}</p>
                    <ul className="mt-6 flex flex-1 flex-col gap-2 text-sm text-white/90">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span className="text-[var(--accent)]">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={plan.href}
                      className={`mt-8 inline-flex w-full items-center justify-center rounded-lg py-3 text-sm font-semibold transition-[filter,colors] duration-200 ${
                        plan.popular
                          ? "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] hover:brightness-110"
                          : "border border-white/15 bg-transparent text-white hover:border-[var(--accent)]/35 hover:bg-[var(--accent-muted)]"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-white/[0.06] bg-[#111] p-6">
                <p className={`text-sm font-medium ${statusClass(selected.status)}`}>
                  {selected.status}
                </p>
                <p className="mt-3 max-w-xl text-white/90">
                  {selected.name} will get its own tiers when it launches. Invoice
                  is the product with prices today.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={selected.href}
                    className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30"
                  >
                    See {selected.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedId("invoice")}
                    className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter] duration-200 hover:brightness-110"
                  >
                    View Invoice tiers
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="order-1 w-full shrink-0 lg:sticky lg:top-24 lg:order-2 lg:w-64">
            <p className="px-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Products
            </p>
            <div className="mt-3 rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-1.5">
              {products.map((product) => {
                const active = product.id === selected.id;
                return (
                  <button
                    key={product.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedId(product.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      active
                        ? "bg-white/[0.06] text-white"
                        : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span className="font-medium">{product.name}</span>
                    <span className={`text-[11px] font-medium ${statusClass(product.status)}`}>
                      {product.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
