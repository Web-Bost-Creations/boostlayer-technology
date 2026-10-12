import type { ReactNode } from "react";

export const INVOICE_NAV = [
  { id: "overview" as const, label: "Overview" },
  { id: "invoices" as const, label: "Invoices" },
  { id: "clients" as const, label: "Clients" },
  { id: "payments" as const, label: "Payments" },
  { id: "taxes" as const, label: "Taxes" },
  { id: "reports" as const, label: "Reports" },
] as const;

export type InvoiceNavId = (typeof INVOICE_NAV)[number]["id"];

export const INVOICE_URLS: Record<InvoiceNavId, string> = {
  overview: "invoice.boostlayer.com/overview",
  invoices: "invoice.boostlayer.com/invoices",
  clients: "invoice.boostlayer.com/clients",
  payments: "invoice.boostlayer.com/payments",
  taxes: "invoice.boostlayer.com/taxes",
  reports: "invoice.boostlayer.com/reports",
};

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

export function InvoiceBrandLockup() {
  return (
    <div className="mb-5 flex items-center gap-2 px-1">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] ring-1 ring-[var(--accent)]/40 shadow-[0_0_20px_var(--accent-glow)]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M14 3v5h5M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="min-w-0 text-sm font-semibold tracking-tight text-white">
        Invoice
      </span>
    </div>
  );
}

function IconOverview({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 5a1 1 0 011-1h4a1 1 0 011v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconInvoices({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M8 13h8M8 17h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconClients({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPayments({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function IconTaxes({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v18M17 7H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconReports({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19V5M10 19V9M16 19v-6M4 15h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function navIcon(id: InvoiceNavId) {
  switch (id) {
    case "overview":
      return IconOverview;
    case "invoices":
      return IconInvoices;
    case "clients":
      return IconClients;
    case "payments":
      return IconPayments;
    case "taxes":
      return IconTaxes;
    case "reports":
      return IconReports;
    default:
      return IconOverview;
  }
}

export function InvoiceSidebarNav({
  active,
  interactive,
  onSelect,
}: {
  active: InvoiceNavId;
  interactive?: boolean;
  onSelect?: (id: InvoiceNavId) => void;
}) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Invoice">
      {INVOICE_NAV.map(({ id, label }) => {
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
              aria-current={isActive ? "page" : undefined}
              className={rowClass}
            >
              <span className={iconClass}>
                <Icon className="shrink-0" />
              </span>
              <span className="min-w-0 flex-1 truncate font-medium">{label}</span>
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

export function InvoiceUserFooter() {
  return (
    <div className="mt-auto border-t border-white/[0.06] pt-3">
      <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-2 py-2 ring-1 ring-white/[0.06]">
        <span className="flex size-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white shadow-[0_0_12px_rgba(16,185,129,0.35)]">
          M
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">Maya Chen</p>
          <p className="text-xs text-[var(--muted)]">Harbour & Co</p>
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

const METRIC_CARDS = [
  {
    label: "Outstanding",
    value: "$18,420",
    sub: "4 invoices open",
    iconWrap: "bg-emerald-950/90 ring-1 ring-emerald-500/25",
    iconClass: "text-[#4ade80]",
    Icon: IconInvoices,
  },
  {
    label: "Overdue",
    value: "$2,160",
    sub: "1 past due",
    iconWrap: "bg-amber-950/90 ring-1 ring-amber-500/20",
    iconClass: "text-amber-400",
    Icon: IconTaxes,
  },
  {
    label: "Paid this month",
    value: "$31,900",
    sub: "CAD collected",
    iconWrap: "bg-blue-950/90 ring-1 ring-blue-500/25",
    iconClass: "text-blue-400",
    Icon: IconPayments,
  },
  {
    label: "Drafts",
    value: "3",
    sub: "Ready to send",
    iconWrap: "bg-purple-950/90 ring-1 ring-purple-500/25",
    iconClass: "text-purple-400",
    Icon: IconReports,
  },
] as const;

export function InvoiceMetricGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {METRIC_CARDS.map(({ label, value, sub, iconWrap, iconClass, Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-white/[0.06] bg-[#141414] p-4 transition-colors duration-200 hover:border-white/[0.1]"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs text-[var(--muted)]">{label}</p>
            <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${iconWrap}`}>
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

const CHART_HEIGHTS = [28, 34, 30, 48, 42, 56, 50, 62, 58, 74, 68, 80] as const;

export function InvoiceCollectedChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#141414] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-white">Collected</p>
        <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent-foreground)]">
          2026
        </span>
      </div>
      <div className="mt-4 flex h-36 items-end justify-between gap-0.5 sm:gap-1">
        {months.map((month, index) => {
          const height = CHART_HEIGHTS[index] ?? 20;
          const isCurrent = index === 9;
          return (
            <div
              key={month}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
            >
              <div className="flex h-[120px] w-full max-w-[14px] items-end justify-center overflow-hidden rounded-sm sm:max-w-[18px]">
                <div
                  className={`chart-bar-inner w-full rounded-[3px] ${
                    isCurrent ? "bg-[var(--accent)]" : "bg-white/12"
                  }`}
                  style={{
                    height: `${height}px`,
                    animationDelay: `${60 + index * 40}ms`,
                  }}
                />
              </div>
              <span
                className={`text-[10px] font-medium sm:text-[11px] ${
                  isCurrent ? "text-[var(--accent)]" : "text-zinc-500"
                }`}
              >
                {month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PanelHeader({
  kicker,
  title,
  detail,
}: {
  kicker: string;
  title: string;
  detail: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{kicker}</p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">{detail}</p>
    </div>
  );
}

export function InvoiceOverview({
  showGetStartedStrip,
}: {
  showGetStartedStrip?: boolean;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PanelHeader
          kicker="Overview"
          title="Good morning, Maya"
          detail="Harbour & Co · October 2026"
        />
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
        >
          New invoice
          <ArrowRightIcon />
        </button>
      </div>
      <InvoiceMetricGrid />
      <InvoiceCollectedChart />
      {showGetStartedStrip ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-[#141414] px-5 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <p className="font-semibold text-white">Send your first invoice</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Add a client, apply GST or HST, and send a PDF they can pay.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[var(--accent)] bg-transparent px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(0,240,164,0.12)] transition-[background-color,border-color,box-shadow] duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
          >
            Create invoice
            <ArrowRightIcon />
          </button>
        </div>
      ) : null}
    </div>
  );
}

const invoices = [
  { number: "INV-1042", client: "Northline Logistics", amount: "$4,800", status: "Sent" },
  { number: "INV-1041", client: "Prairie Grain", amount: "$12,450", status: "Paid" },
  { number: "INV-1038", client: "Laurentian Health", amount: "$2,160", status: "Overdue" },
  { number: "INV-1034", client: "Ridgeline Energy", amount: "$8,900", status: "Draft" },
] as const;

function statusClass(status: string) {
  if (status === "Overdue") return "border-[#e3a45c]/40 bg-[#e3a45c]/10 text-[#e3a45c]";
  if (status === "Draft") return "border-white/10 bg-white/[0.04] text-zinc-300";
  if (status === "Paid") return "border-[var(--accent)]/35 bg-[var(--accent-muted)] text-[var(--accent)]";
  return "border-blue-400/30 bg-blue-400/10 text-blue-300";
}

export function InvoicesPanel() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHeader
        kicker="Invoices"
        title="What is out, and what is paid"
        detail="Every invoice shows tax, status, and the amount in CAD."
      />
      <ul className="flex flex-col gap-2">
        {invoices.map((invoice) => (
          <li
            key={invoice.number}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#141414] px-4 py-3"
          >
            <div>
              <p className="font-medium text-white">{invoice.number}</p>
              <p className="text-xs text-[var(--muted)]">{invoice.client}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-medium tabular-nums text-white">{invoice.amount}</p>
              <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${statusClass(invoice.status)}`}>
                {invoice.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const clients = [
  { name: "Northline Logistics", place: "Halifax, NS", open: "$4,800 open" },
  { name: "Prairie Grain", place: "Saskatoon, SK", open: "Paid up" },
  { name: "Laurentian Health", place: "Montréal, QC", open: "$2,160 overdue" },
  { name: "Ridgeline Energy", place: "Calgary, AB", open: "Draft ready" },
] as const;

export function ClientsPanel() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHeader
        kicker="Clients"
        title="Who you bill"
        detail="Address, tax treatment, and language live on the client."
      />
      <ul className="grid gap-2 sm:grid-cols-2">
        {clients.map((client) => (
          <li key={client.name} className="rounded-xl border border-white/[0.06] bg-[#141414] p-4">
            <p className="font-medium text-white">{client.name}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{client.place}</p>
            <p className="mt-3 text-xs text-[var(--accent)]">{client.open}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const payments = [
  { when: "Today", title: "Interac from Prairie Grain", note: "INV-1041 · $12,450" },
  { when: "Mon", title: "Card payment, Maple & Main", note: "INV-1036 · $1,280" },
  { when: "Fri", title: "Reminder sent, Laurentian Health", note: "INV-1038 · 6 days overdue" },
  { when: "Queued", title: "Interac request, Northline", note: "Goes out with INV-1042" },
] as const;

export function PaymentsPanel() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHeader
        kicker="Payments"
        title="How money comes in"
        detail="Interac, card, or a marked payment — tied back to the invoice."
      />
      <ol className="flex flex-col gap-2">
        {payments.map((item) => (
          <li
            key={item.title}
            className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-[#141414] px-4 py-3"
          >
            <span className="w-14 shrink-0 pt-0.5 font-mono text-xs text-[var(--accent)]">
              {item.when}
            </span>
            <div>
              <p className="font-medium text-white">{item.title}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{item.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

const taxes = [
  { name: "GST", rate: "5%", note: "Federal, on taxable supplies" },
  { name: "HST", rate: "13–15%", note: "Participating provinces" },
  { name: "PST", rate: "Province", note: "Where HST does not apply" },
  { name: "QST", rate: "9.975%", note: "Québec, with GST" },
] as const;

export function TaxesPanel() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHeader
        kicker="Taxes"
        title="The line your client expects"
        detail="Invoice applies the tax for the place of supply. You review it before send."
      />
      <ul className="grid gap-2 sm:grid-cols-2">
        {taxes.map((tax) => (
          <li key={tax.name} className="rounded-xl border border-white/[0.06] bg-[#141414] p-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-medium text-white">{tax.name}</p>
              <p className="text-sm text-[var(--accent)]">{tax.rate}</p>
            </div>
            <p className="mt-2 text-xs text-[var(--muted)]">{tax.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const reports = [
  { value: "$184k", label: "Invoiced year to date, in Canadian dollars" },
  { value: "11 days", label: "Average time from send to payment this quarter" },
  { value: "EN / FR", label: "Invoice PDFs in the language on the client record" },
] as const;

export function ReportsPanel() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHeader
        kicker="Reports"
        title="What the books can see"
        detail="Collected, outstanding, and tax — without a second spreadsheet."
      />
      <ul className="grid gap-3 sm:grid-cols-3">
        {reports.map((item) => (
          <li key={item.value} className="rounded-xl border border-white/[0.06] bg-[#141414] p-4">
            <p className="text-2xl font-semibold tracking-tight text-[var(--accent)]">{item.value}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InvoicePanel({ id }: { id: InvoiceNavId }) {
  switch (id) {
    case "invoices":
      return <InvoicesPanel />;
    case "clients":
      return <ClientsPanel />;
    case "payments":
      return <PaymentsPanel />;
    case "taxes":
      return <TaxesPanel />;
    case "reports":
      return <ReportsPanel />;
    default:
      return <InvoiceOverview />;
  }
}

export function InvoiceWindowShell({
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
