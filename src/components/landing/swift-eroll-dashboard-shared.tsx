import type { ReactNode } from "react";

/** Single source of truth for nav — matches in-app structure */
export const SWIFT_NAV = [
  { id: "dashboard" as const, label: "Dashboard" },
  { id: "employees" as const, label: "Employees" },
  { id: "payroll" as const, label: "Payroll" },
  { id: "payments" as const, label: "Payments" },
  { id: "invoices" as const, label: "Invoices" },
  { id: "reports" as const, label: "Reports" },
] as const;

export type SwiftNavId = (typeof SWIFT_NAV)[number]["id"];

export function TrafficLights() {
  return (
    <span className="flex gap-1.5">
      <span className="size-3 rounded-full bg-[#ff5f57]" />
      <span className="size-3 rounded-full bg-[#febc2e]" />
      <span className="size-3 rounded-full bg-[#28c840]" />
    </span>
  );
}

export function BrowserUrlBar({ url }: { url: string }) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-md border border-white/[0.06] bg-black/40 px-3 py-1.5 font-mono text-[11px] text-[var(--muted)]">
      {url}
    </div>
  );
}

export function SwiftBrandLockup() {
  return (
    <div className="mb-5 flex items-center gap-2 px-1">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-[var(--accent-foreground)] ring-1 ring-[var(--accent)]/40 shadow-[0_0_20px_var(--accent-glow)]">
        $
      </span>
      <span className="min-w-0 text-sm font-semibold tracking-tight text-white">
        Swift E-Roll
      </span>
    </div>
  );
}

function IconDashboard({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 5a1 1 0 011-1h4a1 1 0 011v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconEmployees({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPayroll({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M2 10h20M8 15h.01M12 15h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPayments({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M6 10h.01M12 10h4M6 14h12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconInvoices({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6M8 13h8M8 17h8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconReports({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 19V5M10 19V9M16 19v-6M4 15h12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function navIcon(id: SwiftNavId) {
  switch (id) {
    case "dashboard":
      return IconDashboard;
    case "employees":
      return IconEmployees;
    case "payroll":
      return IconPayroll;
    case "payments":
      return IconPayments;
    case "invoices":
      return IconInvoices;
    case "reports":
      return IconReports;
    default:
      return IconDashboard;
  }
}

export function SwiftSidebarNav({
  active,
  interactive,
  onSelect,
}: {
  active: SwiftNavId;
  interactive?: boolean;
  onSelect?: (id: SwiftNavId) => void;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {SWIFT_NAV.map(({ id, label }) => {
        const isActive = id === active;
        const Icon = navIcon(id);
        const rowClass = `flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm transition-colors duration-200 ${
          isActive
            ? "bg-emerald-950/55 text-white ring-1 ring-[var(--accent)]/20"
            : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
        }`;
        const iconClass = isActive ? "text-[var(--accent)]" : "text-zinc-500";

        if (interactive && onSelect) {
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={rowClass}
            >
              <span className={iconClass}>
                <Icon className="shrink-0" />
              </span>
              <span className="min-w-0 flex-1 truncate font-medium">
                {label}
              </span>
            </button>
          );
        }

        return (
          <div key={id} className={rowClass}>
            <span className={iconClass}>
              <Icon className="shrink-0" />
            </span>
            <span className="min-w-0 flex-1 truncate font-medium">{label}</span>
          </div>
        );
      })}
    </nav>
  );
}

export function SwiftUserFooter() {
  return (
    <div className="mt-auto border-t border-white/[0.06] pt-3">
      <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-2 py-2 ring-1 ring-white/[0.06]">
        <span className="flex size-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white shadow-[0_0_12px_rgba(16,185,129,0.35)]">
          A
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">Alex Johnson</p>
          <p className="text-xs text-[var(--muted)]">Admin</p>
        </div>
      </div>
    </div>
  );
}

export function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const METRIC_ICONS = {
  employees: IconEmployees,
  dollar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  ),
  bolt: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 2L3 14h7l-1 8 11-12h-7l1-8z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  ),
  trend: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M23 6l-9.5 9.5-5-5L1 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 6h6v6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  ),
} as const;

export const SWIFT_METRIC_CARDS = [
  {
    label: "Active Employees",
    value: "5",
    sub: "+1 this month",
    iconWrap: "bg-emerald-950/90 ring-1 ring-emerald-500/25",
    iconClass: "text-[#4ade80]",
    Icon: METRIC_ICONS.employees,
  },
  {
    label: "Next Payroll",
    value: "$52,460",
    sub: "Apr 30 payout",
    iconWrap: "bg-blue-950/90 ring-1 ring-blue-500/25",
    iconClass: "text-blue-400",
    Icon: METRIC_ICONS.dollar,
  },
  {
    label: "E-Transfers",
    value: "3",
    sub: "In transit",
    iconWrap: "bg-amber-950/90 ring-1 ring-amber-500/20",
    iconClass: "text-amber-400",
    Icon: METRIC_ICONS.bolt,
  },
  {
    label: "YTD Total",
    value: "$156K",
    sub: "As of today",
    iconWrap: "bg-purple-950/90 ring-1 ring-purple-500/25",
    iconClass: "text-purple-400",
    Icon: METRIC_ICONS.trend,
  },
] as const;

export function SwiftMetricGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {SWIFT_METRIC_CARDS.map(({ label, value, sub, iconWrap, iconClass, Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-white/[0.06] bg-[#141414] p-4 transition-colors duration-200 hover:border-white/[0.1]"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs text-[var(--muted)]">{label}</p>
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${iconWrap}`}
            >
              <span className={iconClass}>
                <Icon />
              </span>
            </span>
          </div>
          <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight text-white">
            {value}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">{sub}</p>
        </div>
      ))}
    </div>
  );
}

const CHART_HEIGHTS = [
  22, 26, 30, 78, 44, 38, 34, 36, 40, 32, 28, 24,
] as const;

export function SwiftPayrollSpendChart() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ] as const;
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#141414] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-white">Payroll Spend</p>
        <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent-foreground)]">
          2026
        </span>
      </div>
      <div className="mt-4 flex h-36 items-end justify-between gap-0.5 sm:gap-1">
        {months.map((m, i) => {
          const h = CHART_HEIGHTS[i] ?? 20;
          const isApr = i === 3;
          return (
            <div
              key={m}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
            >
              <div className="flex h-[120px] w-full max-w-[14px] items-end justify-center overflow-hidden rounded-sm sm:max-w-[18px]">
                <div
                  className={`chart-bar-inner w-full rounded-[3px] ${
                    isApr ? "bg-[var(--accent)]" : "bg-white/12"
                  }`}
                  style={{
                    height: `${h}px`,
                    animationDelay: `${60 + i * 40}ms`,
                  }}
                />
              </div>
              <span
                className={`text-[10px] font-medium sm:text-[11px] ${
                  isApr ? "text-[var(--accent)]" : "text-zinc-500"
                }`}
              >
                {m}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Primary dashboard view — same in hero preview and interactive demo */
export function SwiftDashboardHomeView({
  showGetStartedStrip,
}: {
  showGetStartedStrip?: boolean;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Dashboard
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
            Good morning, Alex 👋
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Pay Period: Apr 16 – Apr 30, 2026
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
        >
          Run Payroll
          <ArrowRightIcon />
        </button>
      </div>
      <SwiftMetricGrid />
      <SwiftPayrollSpendChart />
      {showGetStartedStrip ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-[#141414] px-5 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <p className="font-semibold text-white">Get Started</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Add your first employee to start processing payroll.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[var(--accent)] bg-transparent px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(0,240,164,0.12)] transition-[background-color,border-color,box-shadow] duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
          >
            Add Employee
            <ArrowRightIcon />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function SwiftWindowShell({
  url,
  glow,
  children,
}: {
  url: string;
  glow?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative w-full max-w-5xl">
      {glow ? (
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-60 blur-3xl"
          style={{
            background: [
              "radial-gradient(ellipse 65% 48% at 50% 15%, rgba(0,240,164,0.18) 0%, transparent 55%)",
              "radial-gradient(ellipse 80% 45% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 50%)",
            ].join(", "),
          }}
        />
      ) : null}
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.65)] transition-[box-shadow,border-color] duration-300 hover:border-[var(--accent)]/20 hover:shadow-[0_28px_96px_rgba(0,0,0,0.75),0_0_60px_rgba(0,240,164,0.06)]">
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#111] px-4 py-2.5">
          <TrafficLights />
          <BrowserUrlBar url={url} />
        </div>
        {children}
      </div>
    </div>
  );
}

export function SwiftPlaceholderPanel({ title }: { title: string }) {
  return (
    <div className="tab-panel-animate flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-white/12 bg-[#141414]/50 p-12 text-center">
      <p className="text-lg font-medium text-white">{title}</p>
      <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
        Preview content for this section. In the full product, your data and
        workflows appear here.
      </p>
    </div>
  );
}
