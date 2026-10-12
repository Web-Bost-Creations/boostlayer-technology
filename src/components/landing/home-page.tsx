import Link from "next/link";
import { ContactForm } from "./contact-form.client";
import { HeroDashboardMock } from "./dashboard-mock";
import { InteractiveDemoMock } from "./interactive-demo.client";
import { Reveal } from "./reveal-on-scroll.client";

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[620px] w-[min(100%,820px)] -translate-x-1/2 rounded-full"
        style={{
          background: [
            "radial-gradient(ellipse 80% 52% at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 55%)",
            "radial-gradient(ellipse 55% 42% at 50% -5%, rgba(0,240,164,0.22) 0%, transparent 52%)",
          ].join(", "),
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center hero-animate-group">
        <Link
          href="/platform"
          className="pill-idle mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-gradient-to-b from-[var(--accent-muted)] to-white/[0.02] px-3 py-1.5 text-sm text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-200 hover:border-[var(--accent)]/45 hover:text-white"
        >
          <span className="size-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)] ring-1 ring-[var(--accent)]/40" />
          Invoice is live · More is coming
          <span aria-hidden>→</span>
        </Link>
        <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
          The <span className="text-[var(--accent)]">billing layer</span> for
          modern Canadian business.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
          We build tightly integrated business infrastructure. Invoice is live.
          More is coming.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/pricing"
            className="group inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_32px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Start invoicing
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="/invoice#preview"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent)]/35 bg-zinc-900/50 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-[var(--accent)]/55 hover:bg-[var(--accent-muted)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
            Try Invoice
          </Link>
        </div>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
          {[
            "GST, HST, PST & QST",
            "Interac e-Transfer",
            "Bilingual invoices",
            "Hosted in Canada",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="text-[var(--accent)]">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-16 flex w-full justify-center">
          <HeroDashboardMock />
        </div>
      </div>
    </section>
  );
}

const logos = [
  "Harbour & Co",
  "Northline Logistics",
  "Prairie Grain",
  "Maple & Main",
  "Laurentian Health",
  "Ridgeline Energy",
  "Civic Ledger",
  "Atlantic Cold Storage",
];

function Logos() {
  return (
    <Reveal>
      <section className="border-y border-white/[0.06] bg-zinc-950/40 py-12">
        <p className="mb-8 text-center text-sm text-zinc-500">
          Built for businesses that bill in Canada
        </p>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4">
          {logos.map((name) => (
            <span
              key={name}
              className="text-sm font-medium tracking-tight text-zinc-600 transition-colors duration-200 hover:text-[var(--accent)]"
            >
              {name}
            </span>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

const productFeatures = [
  {
    title: "Invoices and estimates",
    body: "Send a numbered invoice or a quote. Turn an accepted estimate into an invoice without retyping it.",
    tag: "Core",
  },
  {
    title: "Canadian tax",
    body: "GST, HST, PST, and QST land on the invoice for the place of supply. You review the lines before it goes out.",
    tag: null,
  },
  {
    title: "Clients",
    body: "Keep the billing address, tax treatment, and language on the client so the next invoice starts finished.",
    tag: null,
  },
  {
    title: "Get paid",
    body: "Attach an Interac e-Transfer request or a card link. Mark a cheque or transfer when it clears.",
    tag: null,
  },
  {
    title: "Recurring billing",
    body: "Retainers and monthly services go out on a schedule. You approve the run, or let it send.",
    tag: null,
  },
  {
    title: "What you're owed",
    body: "Outstanding, overdue, and collected — in CAD — without a second spreadsheet.",
    tag: null,
  },
];

export function Product() {
  return (
    <Reveal>
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-[var(--accent)]">Live now</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Invoice is the billing layer{" "}
            <span className="text-[var(--accent)]">you can use today.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            Create the bill, apply the tax, send it, and see when it is paid.
            Clients, tax, and balances stay on Boostlayer, ready for the tools
            that follow.
          </p>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productFeatures.map((feature) => (
              <article
                key={feature.title}
                className="relative rounded-2xl border border-white/[0.06] bg-[#111] p-6 transition-[border-color,background-color,transform] duration-200 hover:border-[var(--accent)]/25 hover:bg-[#131313]"
              >
                {feature.tag ? (
                  <span className="absolute right-4 top-4 rounded-md border border-[var(--accent)]/35 bg-[var(--accent-muted)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                    {feature.tag}
                  </span>
                ) : null}
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/platform"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-opacity hover:opacity-90"
            >
              See what&apos;s next
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

const roadmap = [
  {
    name: "Invoice",
    status: "Live",
    body: "Billing, tax, and a record of what you're owed.",
    href: "/invoice",
    live: true,
  },
  {
    name: "Payments",
    status: "Coming Q1",
    body: "Money in and out, tied to the invoice that caused it.",
    href: "/payments",
    live: false,
  },
  {
    name: "Inventory",
    status: "Planned",
    body: "Stock that moves when a bill goes out.",
    href: "/inventory",
    live: false,
  },
  {
    name: "Payroll",
    status: "Future",
    body: "Pay runs on the same books as the revenue you billed.",
    href: "/payroll",
    live: false,
  },
] as const;

export function Roadmap({ page = false }: { page?: boolean }) {
  const Title = page ? "h1" : "h2";

  return (
    <Reveal>
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium tracking-wide text-[#e3a45c]">
            Next up
          </p>
          <Title className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            One infrastructure.{" "}
            <span className="text-[var(--accent)]">More tools on it.</span>
          </Title>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            Boostlayer is a technology company building an ecosystem of
            business tools. Invoice is the billing layer that is live.
            Payments, inventory, and payroll will share the same clients, tax,
            and balances.
          </p>
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roadmap.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex h-full flex-col rounded-2xl border p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 ${
                    item.live
                      ? "border-[var(--accent)]/35 bg-[#0d1512] hover:border-[var(--accent)]/55"
                      : "border-white/[0.06] bg-[#111] hover:border-white/15"
                  }`}
                >
                  <p
                    className={`font-mono text-xs ${
                      item.live
                        ? "text-[var(--accent)]"
                        : item.status === "Coming Q1"
                          ? "text-[#e3a45c]"
                          : "text-zinc-500"
                    }`}
                  >
                    {item.status}
                  </p>
                  <h3 className="mt-3 font-semibold text-white">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.body}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Reveal>
  );
}

const featureBullets = [
  "Tax lines your client recognizes",
  "English or French on the PDF",
  "A balance that matches what you sent",
];

const featureCards = [
  {
    title: "Built for Canadian tax",
    body: "GST, HST, PST, and QST are part of the invoice, not a note you add in the footer.",
  },
  {
    title: "One language per client",
    body: "Send the PDF in English or French from the language on the client record.",
  },
  {
    title: "Interac with the invoice",
    body: "The request goes out with the bill, so payment has a place to land.",
  },
  {
    title: "Reminders that stay polite",
    body: "Overdue invoices get a follow-up on a schedule you set. You can still send one yourself.",
  },
  {
    title: "Your numbers, exportable",
    body: "Collected, outstanding, and tax summaries download when your bookkeeper asks.",
  },
  {
    title: "Hosted in Canada",
    body: "Invoice runs on Canadian infrastructure. Your client list stays in the country.",
  },
];

export function Features() {
  return (
    <Reveal>
      <section id="features" className="scroll-mt-24 px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">Features</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              An invoice your client{" "}
              <span className="text-[var(--accent)]">can pay.</span>
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Invoice keeps the tax, the status, and the payment on one record —
              the same record the rest of the platform will use.
            </p>
            <ul className="mt-8 space-y-3">
              {featureBullets.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white">
                  <span className="text-[var(--accent)]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-white/[0.06] bg-[#111] p-5 transition-[border-color,background-color] duration-200 hover:border-[var(--accent)]/22 hover:bg-[#131313]"
              >
                <h3 className="font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export function Demo() {
  return (
    <Reveal>
      <section id="preview" className="scroll-mt-24 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium tracking-wide text-[#e3a45c]">
            Invoice
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Click around.{" "}
            <span className="text-[var(--accent)]">Send nothing.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            A working preview of Invoice — open bills, clients, tax, and what
            has been paid. No account required.
          </p>
          <div className="mt-12 flex justify-center">
            <InteractiveDemoMock />
          </div>
          <p className="mt-6 text-center text-sm text-zinc-500">
            Click the sidebar to move through Invoice · Sample data
          </p>
        </div>
      </section>
    </Reveal>
  );
}

const steps = [
  {
    n: "01",
    title: "Add your business",
    body: "Your legal name, address, and tax numbers go on every invoice you send.",
  },
  {
    n: "02",
    title: "Add a client",
    body: "Billing address, province, and whether the PDF should be English or French.",
  },
  {
    n: "03",
    title: "Send the invoice",
    body: "Line items, the tax for that client, and a PDF with a way to pay.",
  },
  {
    n: "04",
    title: "Watch it clear",
    body: "Interac, card, or a payment you mark yourself. The balance updates when it does.",
  },
];

export function HowItWorks() {
  return (
    <Reveal>
      <section id="process" className="scroll-mt-24 border-t border-white/[0.06] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-[var(--accent)]">How it works</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            From a blank account to{" "}
            <span className="text-[var(--accent)]">an invoice out.</span>
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.n}>
                <span className="font-mono text-sm text-[var(--accent)]">{step.n}</span>
                <h3 className="mt-2 font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

const quotes = [
  {
    quote:
      "We were invoicing from a Word file. Invoice put GST on the right line, and the client stopped emailing to ask where to pay.",
    name: "Amira Hassan",
    role: "Owner · Harbour & Co, Vancouver",
    initials: "AH",
  },
  {
    quote:
      "French invoices for the Québec clinics, English for Ontario. Same product, the language on the client.",
    name: "Étienne Roy",
    role: "Operations · Laurentian Health, Montréal",
    initials: "ÉR",
  },
  {
    quote:
      "I can see what is overdue without opening the spreadsheet we used to keep beside the invoices.",
    name: "Danielle Okonkwo",
    role: "Finance · Prairie Grain, Saskatoon",
    initials: "DO",
  },
  {
    quote:
      "The Interac request goes out with the invoice. We get paid in days instead of after a second email.",
    name: "Chris MacLeod",
    role: "Operations · Ridgeline Energy, Calgary",
    initials: "CM",
  },
];

export function Testimonials() {
  return (
    <Reveal>
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-[var(--accent)]">From the field</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Bills sent.{" "}
            <span className="text-[var(--accent)]">Payments matched.</span>
          </h2>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {quotes.map((quote) => (
              <blockquote
                key={quote.initials}
                className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 transition-[border-color,transform] duration-200 hover:border-[var(--accent)]/25 hover:bg-[#121212]"
              >
                <p className="text-[var(--muted)]">&ldquo;{quote.quote}&rdquo;</p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-[var(--accent-muted)] text-sm font-medium text-[var(--accent)] ring-1 ring-[var(--accent)]/30">
                    {quote.initials}
                  </span>
                  <div>
                    <cite className="not-italic font-medium text-white">{quote.name}</cite>
                    <p className="text-sm text-[var(--muted)]">{quote.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

const plans = [
  {
    name: "Starter",
    price: "CAD $0",
    period: "",
    desc: "For a business sending its first invoices out of a template.",
    features: [
      "5 invoices a month",
      "GST / HST on each invoice",
      "PDF invoices",
      "Client list",
      "Payment status",
      "Email support",
    ],
    cta: "Create a free account",
    href: "/sign-in",
    popular: false,
  },
  {
    name: "Growth",
    price: "CAD $39",
    period: "/month",
    desc: "For a company that bills every week and wants to get paid from the invoice.",
    features: [
      "Unlimited invoices",
      "Recurring invoices",
      "Interac e-Transfer requests",
      "Overdue reminders",
      "English and French PDFs",
      "Estimates",
    ],
    cta: "Start Growth",
    href: "/contact",
    popular: true,
  },
  {
    name: "Business",
    price: "CAD $99",
    period: "/month",
    desc: "For a team that needs more than one person on the books.",
    features: [
      "Everything in Growth",
      "Multiple team members",
      "Deposits and partial payments",
      "Tax summaries by province",
      "Bookkeeper export",
      "Priority support",
    ],
    cta: "Talk to us",
    href: "/contact",
    popular: false,
  },
];

export function Pricing() {
  return (
    <Reveal>
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-[var(--accent)]">Pricing</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Simple pricing.{" "}
            <span className="text-[var(--accent)]">In Canadian dollars.</span>
          </h1>
          <p className="mt-4 text-[var(--muted)]">
            Start free. Move up when you are sending more than a handful of
            invoices a month.
          </p>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 transition-[border-color,transform,box-shadow] duration-200 ${
                  plan.popular
                    ? "border-[var(--accent)]/45 bg-[#0d1512] shadow-[0_0_0_1px_rgba(0,240,164,0.35),0_0_48px_rgba(0,240,164,0.12)] hover:border-[var(--accent)]/65"
                    : "border-white/[0.06] bg-[#111] hover:border-[var(--accent)]/22"
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
        </div>
      </section>
    </Reveal>
  );
}

export function MidCta() {
  return (
    <Reveal>
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent-muted)] to-zinc-950/90 px-8 py-16 text-center ring-1 ring-[var(--accent)]/10 transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)]/35 hover:shadow-[0_0_48px_rgba(0,240,164,0.08)]">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to send an invoice{" "}
            <span className="text-[var(--accent)]">that gets paid?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">
            Invoice is live. Payments, inventory, and payroll are next, on the
            same infrastructure.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/pricing"
              className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_24px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              Start free
            </Link>
            <Link
              href="/platform"
              className="rounded-lg border border-[var(--accent)]/35 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-[var(--accent)]/55 hover:bg-[var(--accent-muted)]"
            >
              See the roadmap
            </Link>
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Free to start · Priced in CAD · Hosted in Canada
          </p>
        </div>
      </section>
    </Reveal>
  );
}

export function Contact() {
  return (
    <Reveal>
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">Contact</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Tell us how you{" "}
              <span className="text-[var(--accent)]">invoice today.</span>
            </h1>
            <p className="mt-4 text-[var(--muted)]">
              A few details are enough. We&apos;ll reply with a walkthrough of
              Invoice and whether it fits the way you bill.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white">
              {[
                "Built for businesses across Canada",
                "English and French invoices",
                "Reply within one business day",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-[var(--accent)]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </Reveal>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Logos />
      <Roadmap />
      <MidCta />
    </>
  );
}
