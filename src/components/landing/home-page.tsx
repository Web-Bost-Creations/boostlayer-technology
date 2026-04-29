import { HeroDashboardMock } from "./dashboard-mock";
import { InteractiveDemoMock } from "./interactive-demo.client";
import { Reveal } from "./reveal-on-scroll.client";

function LogoMark() {
  return (
    <span className="flex size-9 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] ring-1 ring-[var(--accent)]/50 shadow-[0_0_20px_var(--accent-glow)] transition-[box-shadow,transform,filter] duration-300 hover:shadow-[0_0_28px_var(--accent-glow)] hover:brightness-105">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Nav() {
  const links = [
    ["Product", "#product"],
    ["Features", "#features"],
    ["Live Demo", "#demo"],
    ["Pricing", "#pricing"],
    ["Contact", "#contact"],
  ] as const;
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <LogoMark />
          <span className="font-semibold tracking-tight text-white">
            Boostlayer
          </span>
          <span className="hidden rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs text-[var(--muted)] sm:inline">
            Technology
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={
                label === "Live Demo"
                  ? "font-medium text-[var(--accent)] underline decoration-[var(--accent)] underline-offset-[10px] transition-colors hover:brightness-110"
                  : "text-zinc-400 transition-colors duration-200 hover:text-white"
              }
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-sm text-zinc-400 transition-colors duration-200 hover:text-white sm:inline"
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}

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
        <a
          href="#product"
          className="pill-idle mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-gradient-to-b from-[var(--accent-muted)] to-white/[0.02] px-3 py-1.5 text-sm text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-200 hover:border-[var(--accent)]/45 hover:text-white"
        >
          <span className="size-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)] ring-1 ring-[var(--accent)]/40" />
          Introducing Swift E-Roll — Payroll, Reimagined
          <span aria-hidden>→</span>
        </a>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
          The infrastructure that{" "}
          <span className="text-[var(--accent)]">powers payroll</span> for
          modern teams.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
          Boostlayer Technology builds the tools businesses rely on to pay
          their people — faster, smarter, and without the headache. Swift
          E-Roll is the proof.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_32px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Start for free
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
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent)]/35 bg-zinc-900/50 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-[var(--accent)]/55 hover:bg-[var(--accent-muted)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
            Try the demo
          </a>
        </div>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
          {[
            "No credit card required",
            "CRA-compliant",
            "Direct deposit ready",
            "SOC 2 Type II",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="text-[var(--accent)]">✓</span>
              {t}
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
  "Acuity Corp",
  "Meridian HR",
  "NorthWave Inc",
  "Vertex Studios",
  "Clearfield Co",
  "Luminary Group",
  "Apex Talent",
  "Solaris Tech",
];

function Logos() {
  return (
    <Reveal>
      <section className="border-y border-white/[0.06] bg-zinc-950/40 py-12">
        <p className="mb-8 text-center text-sm text-zinc-500">
          Trusted by forward-thinking companies
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
    title: "Employee Management",
    body: "Onboard employees in minutes. Track roles, compensation, and employment status in a unified view.",
    tag: null,
  },
  {
    title: "Automated Payroll",
    body: "Run payroll with a single click. Automatic tax deductions, CPP, EI, and e-transfer disbursements.",
    tag: "Core",
  },
  {
    title: "Invoice & Billing",
    body: "Generate professional invoices and track billing cycles without leaving the platform.",
    tag: null,
  },
  {
    title: "Real-time Reports",
    body: "YTD summaries, pay period breakdowns, and CRA-compliant T4 exports — always up to date.",
    tag: null,
  },
  {
    title: "Smart Notifications",
    body: "Never miss a pay date. Automated reminders for upcoming payroll runs and pending approvals.",
    tag: null,
  },
  {
    title: "Bank-grade Security",
    body: "256-bit encryption, SOC 2 Type II certified, and full audit trails for every transaction.",
    tag: null,
  },
];

function Product() {
  return (
    <Reveal>
      <section id="product" className="scroll-mt-24 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-[var(--accent)]">The Product</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Swift E-Roll — payroll that{" "}
            <span className="text-[var(--accent)]">actually works.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            Built on top of Boostlayer&apos;s infrastructure. Real-time payroll
            processing, direct e-transfers, and CRA-ready filings in one
            seamless platform.
          </p>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productFeatures.map((f) => (
              <article
                key={f.title}
                className="relative rounded-2xl border border-white/[0.06] bg-[#111] p-6 transition-[border-color,background-color,transform] duration-200 hover:border-[var(--accent)]/25 hover:bg-[#131313]"
              >
                {f.tag && (
                  <span className="absolute right-4 top-4 rounded-md border border-[var(--accent)]/35 bg-[var(--accent-muted)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                    {f.tag}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {f.body}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="#features"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-opacity hover:opacity-90"
            >
              Explore all features
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

const whyBullets = [
  "CRA-compliant payroll filings",
  "Onboarding in under 10 minutes",
  "99.98% uptime SLA",
];

const whyCards = [
  {
    title: "Instant e-Transfers",
    body: "Funds hit employee accounts within minutes of payroll approval — not days. Canada's fastest payroll disbursement.",
  },
  {
    title: "Multi-province compliance",
    body: "Automatic deduction calculations across all Canadian provinces and territories. We stay updated so you don't have to.",
  },
  {
    title: "Recurring pay schedules",
    body: "Set weekly, bi-weekly, or monthly pay cycles. Payroll runs itself on schedule — you just review and approve.",
  },
  {
    title: "Role-based access",
    body: "Grant granular permissions to HR teams, accountants, and managers. Full audit trails on every action.",
  },
  {
    title: "API-first architecture",
    body: "Connect Swift E-Roll to your HRIS, accounting software, or custom tools via our REST API and webhooks.",
  },
  {
    title: "Dedicated support",
    body: "Real humans available via chat and phone. Average response time under 2 minutes — no bots, no queues.",
  },
];

function Why() {
  return (
    <Reveal>
      <section id="features" className="scroll-mt-24 px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">
              Why Swift E-Roll
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Everything you need.{" "}
              <span className="text-[var(--accent)]">Nothing you don&apos;t.</span>
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              We stripped out the bloat that makes traditional payroll software
              painful. What&apos;s left is fast, reliable, and built for the way
              modern teams actually work.
            </p>
            <ul className="mt-8 space-y-3">
              {whyBullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-white">
                  <span className="text-[var(--accent)]">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {whyCards.map((c) => (
              <article
                key={c.title}
                className="rounded-2xl border border-white/[0.06] bg-[#111] p-5 transition-[border-color,background-color] duration-200 hover:border-[var(--accent)]/22 hover:bg-[#131313]"
              >
                <h3 className="font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function Demo() {
  return (
    <Reveal>
      <section id="demo" className="scroll-mt-24 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium tracking-wide text-[#e3a45c]">
            Interactive Demo
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Click around.{" "}
            <span className="text-[var(--accent)]">See it live.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            Explore a working preview of the Swift E-Roll dashboard — no sign-up
            needed.
          </p>
          <div className="mt-12 flex justify-center">
            <InteractiveDemoMock />
          </div>
          <p className="mt-6 text-center text-sm text-zinc-500">
            Click the sidebar tabs to explore · All data is illustrative
          </p>
        </div>
      </section>
    </Reveal>
  );
}

const steps = [
  {
    n: "01",
    title: "Create your account",
    body: "Sign up in under 2 minutes. Enter your company details and connect your bank account for disbursements.",
  },
  {
    n: "02",
    title: "Add your team",
    body: "Import employees via CSV or add them manually. Set their compensation, pay schedule, and tax information.",
  },
  {
    n: "03",
    title: "Run your first payroll",
    body: "Review hours and adjustments, then hit Run Payroll. Swift E-Roll handles deductions, filings, and transfers automatically.",
  },
  {
    n: "04",
    title: "Stay compliant, effortlessly",
    body: "T4s, ROEs, and remittances are generated and filed on your behalf. You focus on running your business.",
  },
];

function HowItWorks() {
  return (
    <Reveal>
      <section className="border-t border-white/[0.06] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-[var(--accent)]">How It Works</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            From zero to paid{" "}
            <span className="text-[var(--accent)]">in four steps.</span>
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n}>
                <span className="font-mono text-sm text-[var(--accent)]">
                  {s.n}
                </span>
                <h3 className="mt-2 font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {s.body}
                </p>
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
      "We switched from a legacy payroll provider that charged us $800/month. Swift E-Roll does everything they did — and more — for a fraction of the cost.",
    name: "Sarah M.",
    role: "Head of Operations · Meridian HR",
    initials: "SM",
  },
  {
    quote:
      "The e-transfer speed is unreal. Our employees get paid within minutes of payroll running. The team absolutely loves it.",
    name: "James T.",
    role: "Founder & CEO · Vertex Studios",
    initials: "JT",
  },
  {
    quote:
      "CRA compliance used to keep me up at night. Swift E-Roll handles everything automatically. The T4s just... appear. Game changer.",
    name: "Priya K.",
    role: "Controller · Clearfield Co",
    initials: "PK",
  },
  {
    quote:
      "Boostlayer built something genuinely different here. It feels like software from the future — clean, fast, and completely reliable.",
    name: "Marcus L.",
    role: "VP Finance · NorthWave Inc",
    initials: "ML",
  },
];

function Testimonials() {
  return (
    <Reveal>
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-[var(--accent)]">
            What people say
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Real teams.{" "}
            <span className="text-[var(--accent)]">Real results.</span>
          </h2>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {quotes.map((q) => (
              <blockquote
                key={q.initials}
                className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 transition-[border-color,transform] duration-200 hover:border-[var(--accent)]/25 hover:bg-[#121212]"
              >
                <p className="text-[var(--muted)]">&ldquo;{q.quote}&rdquo;</p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-[var(--accent-muted)] text-sm font-medium text-[var(--accent)] ring-1 ring-[var(--accent)]/30">
                    {q.initials}
                  </span>
                  <div>
                    <cite className="not-italic font-medium text-white">
                      {q.name}
                    </cite>
                    <p className="text-sm text-[var(--muted)]">{q.role}</p>
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
    price: "CAD $49",
    period: "/month",
    desc: "Perfect for small teams getting started with modern payroll.",
    features: [
      "Up to 10 employees",
      "Automated CRA deductions",
      "Direct e-transfers",
      "T4 generation",
      "Email support",
      "SLA guarantee",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    name: "Growth",
    price: "CAD $129",
    period: "/month",
    desc: "For scaling teams that need more power and flexibility.",
    features: [
      "Up to 50 employees",
      "All Starter features",
      "Multi-province payroll",
      "ROE filing automation",
      "API access",
      "Priority support",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Tailored solutions for large organizations with complex needs.",
    features: [
      "Unlimited employees",
      "All Growth features",
      "Dedicated account manager",
      "Custom integrations",
      "SSO & advanced security",
      "Mobile app",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

function Pricing() {
  return (
    <Reveal>
      <section id="pricing" className="scroll-mt-24 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-[var(--accent)]">Pricing</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Transparent pricing.{" "}
            <span className="text-[var(--accent)]">No surprises.</span>
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {plans.map((p) => (
              <article
                key={p.name}
                className={`relative flex flex-col rounded-2xl border p-6 transition-[border-color,transform,box-shadow] duration-200 ${
                  p.popular
                    ? "border-[var(--accent)]/45 bg-[#0d1512] shadow-[0_0_0_1px_rgba(0,240,164,0.35),0_0_48px_rgba(0,240,164,0.12)] hover:border-[var(--accent)]/65"
                    : "border-white/[0.06] bg-[#111] hover:border-[var(--accent)]/22"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)] px-3 py-0.5 text-xs font-semibold text-[var(--accent-foreground)] shadow-[0_0_16px_var(--accent-glow)]">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-white">
                    {p.price}
                  </span>
                  <span className="text-[var(--muted)]">{p.period}</span>
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">{p.desc}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-2 text-sm text-white/90">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-[var(--accent)]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.name === "Enterprise" ? "#contact" : "#pricing"}
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-lg py-3 text-sm font-semibold transition-[filter,colors] duration-200 ${
                    p.popular
                      ? "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] hover:brightness-110"
                      : "border border-white/15 bg-transparent text-white hover:border-[var(--accent)]/35 hover:bg-[var(--accent-muted)]"
                  }`}
                >
                  {p.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function MidCta() {
  return (
    <Reveal>
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent-muted)] to-zinc-950/90 px-8 py-16 text-center ring-1 ring-[var(--accent)]/10 transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)]/35 hover:shadow-[0_0_48px_rgba(0,240,164,0.08)]">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to modernize{" "}
            <span className="text-[var(--accent)]">your payroll?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">
            Join hundreds of Canadian companies using Swift E-Roll to pay their
            teams faster and with complete confidence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#pricing"
              className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_24px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              Start your free trial
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-[var(--accent)]/35 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-[var(--accent)]/55 hover:bg-[var(--accent-muted)]"
            >
              Talk to sales
            </a>
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            14-day free trial · No credit card required · Cancel anytime
          </p>
        </div>
      </section>
    </Reveal>
  );
}

function Contact() {
  return (
    <Reveal>
      <section id="contact" className="scroll-mt-24 px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">Get in Touch</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Request a demo.{" "}
              <span className="text-[var(--accent)]">We&apos;ll reach out fast.</span>
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Tell us a bit about your team and we&apos;ll show you exactly how
              Swift E-Roll can streamline your payroll.
            </p>
          </div>
          <form
            className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#111] p-6"
            action="#"
          >
            <label className="block">
              <span className="text-sm text-[var(--muted)]">Full Name</span>
              <input
                name="name"
                placeholder="Jane Smith"
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/25"
              />
            </label>
            <label className="block">
              <span className="text-sm text-[var(--muted)]">Work Email</span>
              <input
                type="email"
                name="email"
                placeholder="jane@company.com"
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/25"
              />
            </label>
            <label className="block">
              <span className="text-sm text-[var(--muted)]">Company Size</span>
              <select
                name="size"
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white outline-none transition-colors duration-200 focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/25"
                defaultValue=""
              >
                <option value="" disabled>
                  Select range
                </option>
                <option>1–10 employees</option>
                <option>11–50 employees</option>
                <option>51–200 employees</option>
                <option>201–500 employees</option>
                <option>500+ employees</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-[var(--muted)]">Message</span>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your current payroll setup and what you're looking to improve..."
                className="mt-1.5 w-full resize-y rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/25"
              />
            </label>
            <button
              type="submit"
              className="rounded-lg bg-[var(--accent)] py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99]"
            >
              Send request
            </button>
            <p className="text-center text-xs text-zinc-500">
              We typically respond within 1 business day. No spam, ever.
            </p>
          </form>
        </div>
      </section>
    </Reveal>
  );
}

function Footer() {
  const cols = [
    {
      title: "Product",
      links: [
        ["Swift E-Roll", "#product"],
        ["Features", "#features"],
        ["Pricing", "#pricing"],
        ["Changelog", "#"],
        ["Roadmap", "#"],
      ],
    },
    {
      title: "Company",
      links: [
        ["About Boostlayer", "#"],
        ["Blog", "#"],
        ["Careers", "#"],
        ["Press Kit", "#"],
        ["Contact", "#contact"],
      ],
    },
    {
      title: "Legal",
      links: [
        ["Privacy Policy", "#"],
        ["Terms of Service", "#"],
        ["Security", "#"],
        ["Cookie Policy", "#"],
      ],
    },
    {
      title: "Developers",
      links: [
        ["API Reference", "#"],
        ["Webhooks", "#"],
        ["Status Page", "#"],
        ["SDKs", "#"],
      ],
    },
  ];
  return (
    <footer className="border-t border-white/[0.06] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/[0.06] pb-10">
          <div className="flex items-center gap-2">
            <LogoMark />
            <span className="font-semibold text-white">Boostlayer</span>
          </div>
          <div className="flex gap-4 text-zinc-500">
            <a
              href="#"
              className="transition-colors hover:text-[var(--accent)]"
              aria-label="X"
            >
              𝕏
            </a>
            <a
              href="#"
              className="transition-colors hover:text-[var(--accent)]"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="#"
              className="transition-colors hover:text-[var(--accent)]"
              aria-label="GitHub"
            >
              gh
            </a>
          </div>
        </div>
        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-semibold text-white">{c.title}</p>
              <ul className="mt-4 space-y-2">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[var(--muted)] transition-colors duration-200 hover:text-[var(--accent)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-md text-sm text-[var(--muted)]">
          Building the infrastructure that powers payroll for modern Canadian
          businesses.
        </p>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-8 text-sm text-[var(--muted)] sm:flex-row sm:justify-between">
          <span>© 2026 Boostlayer Technology Inc. All rights reserved.</span>
          <span>Built by Boostlayer Technology</span>
        </div>
      </div>
    </footer>
  );
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Product />
        <Why />
        <Demo />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <MidCta />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
