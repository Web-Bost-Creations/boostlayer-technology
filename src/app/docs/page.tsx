import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs / Journal",
  description:
    "Notes on Invoice: Canadian tax, bilingual PDFs, Interac, and what Boostlayer is building next.",
};

const guides = [
  {
    id: "tax",
    title: "Canadian tax on the invoice",
    body: "GST, HST, PST, and QST are lines on the invoice for the place of supply. You review them before the PDF goes out. They are part of the bill, not a note in the footer.",
  },
  {
    id: "language",
    title: "English or French, per client",
    body: "The language lives on the client record. The next invoice uses it, so a Québec clinic can receive French and an Ontario client can receive English from the same account.",
  },
  {
    id: "interac",
    title: "Interac with the bill",
    body: "An Interac e-Transfer request can go out with the invoice. When the money clears, you mark it against that invoice so the balance matches what you sent.",
  },
];

const journal = [
  {
    date: "October 2026",
    title: "Invoice is live",
    body: "The billing layer is the first Boostlayer product you can use. Create the bill, apply the tax, send it, and see when it is paid.",
  },
  {
    date: "October 2026",
    title: "Payments is next",
    body: "Payments is aimed at Q1. A payment will point at the invoice that caused it, on the same clients and balances Invoice already keeps.",
  },
];

export default function DocsPage() {
  return (
    <div className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-[var(--accent)]">Docs / Journal</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
          How Invoice works, and what we&apos;re building next.
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Short notes for people billing in Canada. The live product is{" "}
          <Link href="/invoice" className="text-[var(--accent)] hover:underline">
            Invoice
          </Link>
          . The rest of the platform is on the{" "}
          <Link href="/platform" className="text-[var(--accent)] hover:underline">
            roadmap
          </Link>
          .
        </p>

        <div className="mt-14 space-y-10">
          {guides.map((guide) => (
            <article key={guide.id} id={guide.id} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                {guide.title}
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">{guide.body}</p>
            </article>
          ))}
        </div>

        <div id="journal" className="mt-20 scroll-mt-24 border-t border-white/[0.06] pt-14">
          <p className="text-sm font-medium tracking-wide text-[#e3a45c]">Journal</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            From Boostlayer
          </h2>
          <div className="mt-8 space-y-6">
            {journal.map((entry) => (
              <article
                key={entry.title}
                className="rounded-2xl border border-white/[0.06] bg-[#111] p-6"
              >
                <p className="font-mono text-xs text-zinc-500">{entry.date}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{entry.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--muted)]">{entry.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
