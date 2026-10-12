import Link from "next/link";

export function RoadmapProduct({
  name,
  status,
  lede,
  body,
  points,
}: {
  name: string;
  status: string;
  lede: string;
  body: string;
  points: string[];
}) {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs text-[#e3a45c]">{status}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {name}
        </h1>
        <p className="mt-4 text-xl text-zinc-300">{lede}</p>
        <p className="mt-6 text-base leading-relaxed text-[var(--muted)]">{body}</p>
        <ul className="mt-10 space-y-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-white">
              <span className="mt-0.5 text-[var(--accent)]">✓</span>
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/invoice"
            className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110"
          >
            See Invoice
          </Link>
          <Link
            href="/platform"
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30"
          >
            The platform
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
