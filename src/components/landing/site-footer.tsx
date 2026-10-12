import Link from "next/link";
import { LogoMark } from "./logo-mark";

const cols = [
  {
    title: "Product",
    links: [
      ["Invoice", "/invoice"],
      ["Payments", "/payments"],
      ["Inventory", "/inventory"],
      ["Payroll", "/payroll"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Platform", "/platform"],
      ["About", "/about"],
      ["Journal", "/docs#journal"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Docs",
    links: [
      ["Docs / Journal", "/docs"],
      ["Canadian tax", "/docs#tax"],
      ["Bilingual PDFs", "/docs#language"],
      ["Interac", "/docs#interac"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Security", "/security"],
      ["PIPEDA", "/privacy#pipeda"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/[0.06] pb-10">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="font-semibold text-white">Boostlayer</span>
          </Link>
          <div className="flex gap-4 text-zinc-500">
            <a href="#" className="transition-colors hover:text-[var(--accent)]" aria-label="X">
              𝕏
            </a>
            <a href="#" className="transition-colors hover:text-[var(--accent)]" aria-label="LinkedIn">
              in
            </a>
            <a href="#" className="transition-colors hover:text-[var(--accent)]" aria-label="GitHub">
              gh
            </a>
          </div>
        </div>
        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {cols.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-white">{column.title}</p>
              <ul className="mt-4 space-y-2">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--muted)] transition-colors duration-200 hover:text-[var(--accent)]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-md text-sm text-[var(--muted)]">
          Tightly integrated business infrastructure for Canadian companies.
          Invoice is live. More is coming.
        </p>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-8 text-sm text-[var(--muted)] sm:flex-row sm:justify-between">
          <span>© 2026 Boostlayer Technology Inc. All rights reserved.</span>
          <span>Built in Canada</span>
        </div>
      </div>
    </footer>
  );
}
