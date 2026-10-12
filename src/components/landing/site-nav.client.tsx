"use client";

import { useState } from "react";
import { LogoMark } from "./logo-mark";

const links = [
  ["Product", "#product"],
  ["Features", "#features"],
  ["Invoice", "#demo"],
  ["Pricing", "#pricing"],
  ["Contact", "#contact"],
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

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
                label === "Invoice"
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
            href="#demo"
            className="hidden text-sm text-zinc-400 transition-colors duration-200 hover:text-white sm:inline"
          >
            Open Invoice
          </a>
          <a
            href="#pricing"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Get started
          </a>
          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-[var(--accent)]/35 hover:text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/[0.06] px-4 py-3 md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
