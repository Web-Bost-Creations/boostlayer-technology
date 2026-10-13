"use client";

import { ConvexError } from "convex/values";
import { useMutation, useQuery } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useConvexReady } from "@/components/convex-client-provider";
import { OpenInvoiceButton } from "@/components/account/open-invoice-button.client";
import { invoicePlans } from "@/components/landing/invoice-plans";
import { clearSession, readSession } from "@/lib/session";
import { api } from "../../../convex/_generated/api";

type Overview = NonNullable<FunctionReturnType<typeof api.accountSettings.overview>>;
type PlanId = "starter" | "growth" | "business";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "plan", label: "Plan" },
  { id: "usage", label: "Usage" },
  { id: "billing", label: "Billing" },
  { id: "settings", label: "Settings" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const planOrder: PlanId[] = ["starter", "growth", "business"];
const planNames: Record<PlanId, string> = {
  starter: "Starter",
  growth: "Growth",
  business: "Business",
};
const planPrices: Record<PlanId, string> = {
  starter: "Free",
  growth: "CAD $39 a month",
  business: "CAD $99 a month",
};

const provinces = [
  ["AB", "Alberta"],
  ["BC", "British Columbia"],
  ["MB", "Manitoba"],
  ["NB", "New Brunswick"],
  ["NL", "Newfoundland and Labrador"],
  ["NS", "Nova Scotia"],
  ["NT", "Northwest Territories"],
  ["NU", "Nunavut"],
  ["ON", "Ontario"],
  ["PE", "Prince Edward Island"],
  ["QC", "Quebec"],
  ["SK", "Saskatchewan"],
  ["YT", "Yukon"],
] as const;

type ProvinceCode = (typeof provinces)[number][0];

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/25";
const primaryButton =
  "inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter] duration-200 hover:brightness-110 disabled:opacity-60";
const secondaryButton =
  "inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30 disabled:opacity-60";
const card = "rounded-2xl border border-white/[0.06] bg-[#111] p-6";

const money = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });
const day = new Intl.DateTimeFormat("en-CA", { dateStyle: "medium" });
const utcDay = new Intl.DateTimeFormat("en-CA", { dateStyle: "medium", timeZone: "UTC" });

function errorMessage(error: unknown, fallback: string) {
  if (error instanceof ConvexError && typeof error.data === "string") return error.data;
  return fallback;
}

async function postJson<T>(url: string, body: Record<string, unknown>) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(data.error ?? "Something went wrong. Try again.");
  return data;
}

function isTab(value: string | null): value is TabId {
  return tabs.some((tab) => tab.id === value);
}

type InvoiceUsage =
  | { state: "loading" }
  | { state: "error"; message: string }
  | { state: "ready"; opened: boolean; monthStart: number; invoicesThisMonth: number; clients: number };

/** Invoice and client counts come from the Invoice app, where they are created. */
function useInvoiceUsage(token: string, enabled: boolean): InvoiceUsage {
  const [usage, setUsage] = useState<InvoiceUsage>({ state: "loading" });

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    postJson<Omit<Extract<InvoiceUsage, { state: "ready" }>, "state">>("/api/account/usage", { token })
      .then((data) => {
        if (active) setUsage({ state: "ready", ...data });
      })
      .catch((caught: unknown) => {
        if (active) {
          setUsage({
            state: "error",
            message: caught instanceof Error ? caught.message : "Usage didn't load.",
          });
        }
      });
    return () => {
      active = false;
    };
  }, [token, enabled]);

  return enabled ? usage : { state: "ready", opened: false, monthStart: 0, invoicesThisMonth: 0, clients: 0 };
}

function countLabel(usage: InvoiceUsage, value: (ready: Extract<InvoiceUsage, { state: "ready" }>) => number) {
  if (usage.state === "loading") return "…";
  if (usage.state === "error") return "—";
  return String(value(usage));
}

export function AccountDashboard() {
  const ready = useConvexReady();
  if (!ready) {
    return <Notice title="Your account needs the Invoice database." />;
  }
  return <AccountConnected />;
}

function AccountConnected() {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    setToken(readSession());
  }, []);

  const overview = useQuery(api.accountSettings.overview, token ? { token } : "skip");

  if (token === undefined || (token !== null && overview === undefined)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-zinc-500">
        Loading your account…
      </div>
    );
  }

  if (token === null || !overview) {
    return (
      <Notice title="Sign in to see your account.">
        <Link href="/sign-in" className={`${primaryButton} mt-6`}>
          Sign in
        </Link>
      </Notice>
    );
  }

  return <AccountLayout token={token} overview={overview} />;
}

function AccountLayout({ token, overview }: { token: string; overview: Overview }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requested = searchParams.get("tab");
  const tab: TabId = isTab(requested) ? requested : "overview";
  const usage = useInvoiceUsage(token, Boolean(overview.key));

  function selectTab(next: TabId) {
    router.replace(next === "overview" ? pathname : `${pathname}?tab=${next}`, { scroll: false });
  }

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium text-[var(--accent)]">Account</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {overview.companyName || "Your company"}
            </h1>
            <p className="mt-2 text-[var(--muted)]">
              {overview.fullName ? `${overview.fullName} · ` : ""}
              {overview.email}
            </p>
          </div>
          {overview.key ? (
            <OpenInvoiceButton token={token} className={primaryButton} />
          ) : (
            <Link href="/pricing" className={primaryButton}>
              Choose a plan
            </Link>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start">
          <nav className="flex shrink-0 gap-1 overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-1.5 lg:sticky lg:top-24 lg:w-56 lg:flex-col">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={tab === item.id ? "page" : undefined}
                onClick={() => selectTab(item.id)}
                className={`whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  tab === item.id
                    ? "bg-white/[0.06] text-white"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="min-w-0 flex-1">
            {tab === "overview" ? (
              <OverviewTab token={token} overview={overview} usage={usage} onSelect={selectTab} />
            ) : null}
            {tab === "plan" ? <PlanTab token={token} overview={overview} /> : null}
            {tab === "usage" ? <UsageTab overview={overview} usage={usage} /> : null}
            {tab === "billing" ? <BillingTab token={token} overview={overview} /> : null}
            {tab === "settings" ? <SettingsTab token={token} overview={overview} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewTab({
  token,
  overview,
  usage,
  onSelect,
}: {
  token: string;
  overview: Overview;
  usage: InvoiceUsage;
  onSelect: (tab: TabId) => void;
}) {
  const [copied, setCopied] = useState(false);
  const plan = overview.plan;

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className={card}>
          <p className="text-sm text-zinc-400">Plan</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {plan ? `Invoice ${planNames[plan]}` : "No plan yet"}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {plan ? planPrices[plan] : "Pick a plan to get your Invoice key."}
          </p>
          <button type="button" onClick={() => onSelect("plan")} className={`${secondaryButton} mt-5`}>
            {plan ? "Change plan" : "See plans"}
          </button>
        </div>
        <div className={card}>
          <p className="text-sm text-zinc-400">Invoices this month</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {countLabel(usage, (ready) => ready.invoicesThisMonth)}
            <span className="text-base font-normal text-[var(--muted)]">
              {overview.usage.invoicesPerMonth === null
                ? " · unlimited"
                : ` of ${overview.usage.invoicesPerMonth}`}
            </span>
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {countLabel(usage, (ready) => ready.clients)} clients · {overview.usage.teamMembers} on the team
          </p>
          <button type="button" onClick={() => onSelect("usage")} className={`${secondaryButton} mt-5`}>
            See usage
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--accent)]/30 bg-[#0d1512] p-6">
        <p className="text-sm text-zinc-400">Invoicing panel</p>
        {overview.key ? (
          <>
            <p className="mt-2 text-white">
              Your key opens Invoice on the {planNames[overview.plan ?? "starter"]} plan.
            </p>
            <p className="mt-4 break-all font-mono text-sm text-white/90">{overview.key}</p>
            <div className="mt-5 flex flex-wrap items-start gap-3">
              <OpenInvoiceButton token={token} className={primaryButton} />
              <button
                type="button"
                className={secondaryButton}
                onClick={async () => {
                  await navigator.clipboard.writeText(overview.key ?? "");
                  setCopied(true);
                }}
              >
                {copied ? "Copied" : "Copy key"}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 text-white">Choose a plan and your key appears here.</p>
            <Link href="/pricing" className={`${primaryButton} mt-5`}>
              Choose a plan
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function PlanTab({ token, overview }: { token: string; overview: Overview }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState<PlanId | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const currentRank = overview.plan ? planOrder.indexOf(overview.plan) : -1;

  async function changeTo(plan: PlanId) {
    setPending(true);
    setError(null);
    setDone(null);
    try {
      const result = await postJson<{ checkoutPath?: string; plan?: PlanId }>(
        "/api/account/plan",
        { token, plan },
      );
      if (result.checkoutPath) {
        router.push(result.checkoutPath);
        return;
      }
      setDone(`You're on ${planNames[plan]} now. Invoice uses the new plan the next time you open it.`);
      setConfirming(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The plan didn't change.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-4">
      {done ? (
        <p className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-muted)] px-4 py-3 text-sm text-white">
          {done}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}
      <div className="grid gap-4 xl:grid-cols-3">
        {planOrder.map((id, index) => {
          const plan = invoicePlans[index];
          const current = overview.plan === id;
          const direction = index > currentRank ? "Upgrade" : "Downgrade";
          return (
            <article
              key={id}
              className={`flex flex-col rounded-2xl border p-6 ${
                current
                  ? "border-[var(--accent)]/45 bg-[#0d1512]"
                  : "border-white/[0.06] bg-[#111]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                {current ? (
                  <span className="rounded-full bg-[var(--accent-muted)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent)]">
                    Current
                  </span>
                ) : null}
              </div>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-white">{plan.price}</span>
                <span className="text-[var(--muted)]">{plan.period}</span>
              </p>
              <ul className="mt-5 flex flex-1 flex-col gap-2 text-sm text-white/90">
                {plan.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-[var(--accent)]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              {current ? (
                <p className="mt-6 text-sm text-zinc-500">This is your plan.</p>
              ) : confirming === id ? (
                <div className="mt-6 grid gap-2">
                  <p className="text-sm text-white/80">
                    {id === "starter"
                      ? "Your card subscription ends now. Unused time is credited to your Stripe balance."
                      : overview.hasSubscription
                        ? `Your card is charged the prorated difference today, then ${plan.price}${plan.period}.`
                        : `You'll pay ${plan.price}${plan.period} by card on the next page.`}
                  </p>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => changeTo(id)}
                    className={primaryButton}
                  >
                    {pending ? "Changing..." : `Confirm ${direction.toLowerCase()}`}
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => setConfirming(null)}
                    className={secondaryButton}
                  >
                    Keep {overview.plan ? planNames[overview.plan] : "current plan"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setConfirming(id);
                    setError(null);
                    setDone(null);
                  }}
                  className={`${index > currentRank ? primaryButton : secondaryButton} mt-6`}
                >
                  {overview.plan ? `${direction} to ${plan.name}` : `Choose ${plan.name}`}
                </button>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Meter({
  label,
  used,
  limit,
  cap,
  note,
}: {
  label: string;
  used: number | null;
  limit: number | null;
  cap: number;
  note: string;
}) {
  const shown = used === null ? "…" : used > cap ? `${cap}+` : String(used);
  const percent = limit && used !== null ? Math.min(100, Math.round((used / limit) * 100)) : null;
  return (
    <div className={card}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm text-zinc-400">{label}</p>
        <p className="text-sm text-white">
          {shown}
          <span className="text-[var(--muted)]">{limit === null ? " · no limit" : ` of ${limit}`}</span>
        </p>
      </div>
      {percent !== null ? (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className={`h-full rounded-full ${percent >= 100 ? "bg-[#e3a45c]" : "bg-[var(--accent)]"}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      ) : null}
      <p className="mt-3 text-sm text-[var(--muted)]">{note}</p>
    </div>
  );
}

function UsageTab({ overview, usage: counts }: { overview: Overview; usage: InvoiceUsage }) {
  const { usage } = overview;
  const ready = counts.state === "ready" ? counts : null;
  const atLimit =
    ready !== null && usage.invoicesPerMonth !== null && ready.invoicesThisMonth >= usage.invoicesPerMonth;
  return (
    <div className="grid gap-4">
      {counts.state === "error" ? (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {counts.message}
        </p>
      ) : (
        <p className="text-sm text-[var(--muted)]">
          {ready && ready.monthStart ? `Since ${utcDay.format(ready.monthStart)}. ` : ""}
          Counts reset on the first of each month.
        </p>
      )}
      <Meter
        label="Invoices this month"
        used={ready?.invoicesThisMonth ?? null}
        limit={usage.invoicesPerMonth}
        cap={usage.countCap}
        note={
          atLimit
            ? "You've used every invoice on Starter this month. Growth removes the limit."
            : ready && !ready.opened
              ? "Counting starts the first time you open Invoice."
              : "Every invoice you create in Invoice counts here."
        }
      />
      <Meter
        label="Clients"
        used={ready?.clients ?? null}
        limit={null}
        cap={usage.countCap}
        note="Clients saved in Invoice, on every plan."
      />
      <Meter
        label="Team members"
        used={usage.teamMembers}
        limit={usage.teamLimit}
        cap={usage.countCap}
        note={
          usage.teamLimit === null
            ? "Business includes multiple team members."
            : "Business adds more people to the same books."
        }
      />
    </div>
  );
}

type BillingSummary = {
  card: { brand: string; last4: string; expMonth: number; expYear: number } | null;
  renewsAt: number | null;
  amountCents: number | null;
};

function BillingTab({ token, overview }: { token: string; overview: Overview }) {
  const [summary, setSummary] = useState<BillingSummary | null>(null);
  const [loading, setLoading] = useState(overview.hasCard);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!overview.hasCard) return;
    let active = true;
    postJson<BillingSummary>("/api/account/billing", { token })
      .then((data) => {
        if (active) setSummary(data);
      })
      .catch((caught: unknown) => {
        if (active) setError(caught instanceof Error ? caught.message : "Billing didn't load.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [token, overview.hasCard]);

  async function openPortal() {
    setOpening(true);
    setError(null);
    try {
      const { url } = await postJson<{ url: string }>("/api/account/portal", { token });
      window.location.href = url;
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Stripe didn't open.");
      setOpening(false);
    }
  }

  return (
    <div className="grid gap-4">
      {error ? (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}
      <div className={card}>
        <p className="text-sm text-zinc-400">Payment method</p>
        {!overview.hasCard ? (
          <>
            <p className="mt-2 text-white">No card on file.</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              A card is added when you move to Growth or Business.
            </p>
          </>
        ) : loading ? (
          <p className="mt-2 text-[var(--muted)]">Loading card...</p>
        ) : summary?.card ? (
          <>
            <p className="mt-2 text-lg text-white">
              <span className="capitalize">{summary.card.brand}</span> ending in {summary.card.last4}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Expires {String(summary.card.expMonth).padStart(2, "0")}/{summary.card.expYear}
            </p>
          </>
        ) : (
          <p className="mt-2 text-white">Card details are kept with Stripe.</p>
        )}
        {overview.hasSubscription && summary?.renewsAt ? (
          <p className="mt-4 text-sm text-white/80">
            Next charge {summary.amountCents !== null ? money.format(summary.amountCents / 100) : ""} on{" "}
            {day.format(summary.renewsAt)}.
          </p>
        ) : null}
        {overview.hasCard ? (
          <button
            type="button"
            disabled={opening}
            onClick={openPortal}
            className={`${primaryButton} mt-5`}
          >
            {opening ? "Opening Stripe..." : "Update payment method"}
          </button>
        ) : null}
        {overview.hasCard ? (
          <p className="mt-3 text-sm text-zinc-500">
            Opens Stripe&apos;s secure billing page for cards, billing address, and receipts.
          </p>
        ) : null}
      </div>

      <div className={card}>
        <p className="text-sm text-zinc-400">Billing history</p>
        {overview.purchases.length === 0 ? (
          <p className="mt-2 text-[var(--muted)]">Nothing billed yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-white/[0.06]">
            {overview.purchases.map((purchase) => (
              <li key={purchase.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <div>
                  <p className="text-white">
                    Invoice {planNames[purchase.plan]}
                    <span className="text-[var(--muted)]">
                      {" "}
                      ·{" "}
                      {purchase.reason === "upgrade"
                        ? "Upgrade"
                        : purchase.reason === "downgrade"
                          ? "Downgrade"
                          : "Started"}
                    </span>
                  </p>
                  <p className="text-zinc-500">{day.format(purchase.createdAt)}</p>
                </div>
                <p className="text-white">
                  {purchase.amountCents === 0
                    ? "Free"
                    : `${money.format(purchase.amountCents / 100)}/month`}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SettingsTab({ token, overview }: { token: string; overview: Overview }) {
  const updateProfile = useMutation(api.accountSettings.updateProfile);
  const changePassword = useMutation(api.accountSettings.changePassword);
  const signOut = useMutation(api.accountSettings.signOut);
  const [profileState, setProfileState] = useState<{ pending: boolean; message: string | null; error: boolean }>({
    pending: false,
    message: null,
    error: false,
  });
  const [passwordState, setPasswordState] = useState<{ pending: boolean; message: string | null; error: boolean }>({
    pending: false,
    message: null,
    error: false,
  });

  return (
    <div className="grid gap-4">
      <form
        className={`${card} grid gap-4`}
        onSubmit={async (event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const provinceValue = String(data.get("province") ?? "");
          setProfileState({ pending: true, message: null, error: false });
          try {
            await updateProfile({
              token,
              fullName: String(data.get("fullName") ?? ""),
              companyName: String(data.get("companyName") ?? ""),
              province: provinceValue ? (provinceValue as ProvinceCode) : undefined,
            });
            setProfileState({ pending: false, message: "Saved.", error: false });
          } catch (caught) {
            setProfileState({
              pending: false,
              message: errorMessage(caught, "Your settings didn't save."),
              error: true,
            });
          }
        }}
      >
        <h2 className="text-lg font-semibold text-white">Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="text-sm text-zinc-300">
              Your name
            </label>
            <input
              id="fullName"
              name="fullName"
              required
              defaultValue={overview.fullName}
              autoComplete="name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="companyName" className="text-sm text-zinc-300">
              Company
            </label>
            <input
              id="companyName"
              name="companyName"
              required
              defaultValue={overview.companyName}
              autoComplete="organization"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="province" className="text-sm text-zinc-300">
              Province or territory
            </label>
            <select
              id="province"
              name="province"
              defaultValue={overview.province ?? ""}
              className={fieldClass}
            >
              <option value="">Not set</option>
              {provinces.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-sm text-zinc-300">Work email</p>
            <p className="mt-1.5 rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2.5 text-white/70">
              {overview.email}
            </p>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Your province sets the GST, HST, PST, or QST Invoice applies. To change your sign-in email,{" "}
          <Link href="/contact" className="text-[var(--accent)] hover:underline">
            contact us
          </Link>
          .
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={profileState.pending} className={primaryButton}>
            {profileState.pending ? "Saving..." : "Save profile"}
          </button>
          {profileState.message ? (
            <p className={`text-sm ${profileState.error ? "text-red-300" : "text-[var(--accent)]"}`}>
              {profileState.message}
            </p>
          ) : null}
        </div>
      </form>

      <form
        className={`${card} grid gap-4`}
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          const newPassword = String(data.get("newPassword") ?? "");
          if (newPassword !== String(data.get("confirmPassword") ?? "")) {
            setPasswordState({ pending: false, message: "Those passwords don't match.", error: true });
            return;
          }
          setPasswordState({ pending: true, message: null, error: false });
          try {
            await changePassword({
              token,
              currentPassword: String(data.get("currentPassword") ?? ""),
              newPassword,
            });
            form.reset();
            setPasswordState({ pending: false, message: "Password changed.", error: false });
          } catch (caught) {
            setPasswordState({
              pending: false,
              message: errorMessage(caught, "Your password didn't change."),
              error: true,
            });
          }
        }}
      >
        <h2 className="text-lg font-semibold text-white">Password</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="currentPassword" className="text-sm text-zinc-300">
              Current password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              autoComplete="current-password"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="text-sm text-zinc-300">
              New password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm text-zinc-300">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className={fieldClass}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={passwordState.pending} className={primaryButton}>
            {passwordState.pending ? "Changing..." : "Change password"}
          </button>
          {passwordState.message ? (
            <p className={`text-sm ${passwordState.error ? "text-red-300" : "text-[var(--accent)]"}`}>
              {passwordState.message}
            </p>
          ) : null}
        </div>
      </form>

      <div className={`${card} flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <h2 className="text-lg font-semibold text-white">Sign out</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Ends this session and Invoice on this browser.</p>
        </div>
        <button
          type="button"
          className={secondaryButton}
          onClick={async () => {
            await signOut({ token }).catch(() => null);
            clearSession();
            window.location.assign("/api/invoice/sign-out");
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

function Notice({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
        {children}
      </div>
    </section>
  );
}
