"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./logo-mark";

const products = [
  { name: "Invoice", status: "Live", href: "/invoice" },
  { name: "Payments", status: "Coming Q1", href: "/payments" },
  { name: "Inventory", status: "Planned", href: "/inventory" },
  { name: "Payroll", status: "Future", href: "/payroll" },
] as const;

const links = [
  ["Platform", "/platform"],
  ["Pricing", "/pricing"],
  ["Docs / Journal", "/docs"],
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const productsActive = products.some((product) => product.href === pathname);

  useEffect(() => {
    setMenuOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (!productsRef.current?.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProductsOpen(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function closeAll() {
    setMenuOpen(false);
    setProductsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <LogoMark compact />
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">
            Boostlayer
          </span>
        </Link>
        <nav className="hidden items-center justify-center gap-7 text-sm font-medium lg:flex">
            <div ref={productsRef} className="relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-white ${
                  productsOpen || productsActive ? "text-white" : "text-zinc-400"
                }`}
                aria-expanded={productsOpen}
                aria-controls="products-menu"
                onClick={() => setProductsOpen((open) => !open)}
              >
                Products
                <Chevron open={productsOpen} />
              </button>
              {productsOpen ? (
                <div
                  id="products-menu"
                  className="absolute left-0 top-full z-50 mt-3 w-64 rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
                >
                  {products.map((product) => (
                    <Link
                      key={product.name}
                      href={product.href}
                      onClick={closeAll}
                      className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-white/[0.05] hover:text-white ${
                        pathname === product.href ? "text-white" : "text-zinc-300"
                      }`}
                    >
                      <span className="font-medium">{product.name}</span>
                      <span
                        className={
                          product.status === "Live"
                            ? "rounded-full bg-[var(--accent-muted)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent)]"
                            : "text-[11px] font-medium text-zinc-500"
                        }
                      >
                        {product.status}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className={`transition-colors duration-200 hover:text-white ${
                  pathname === href ? "text-white" : "text-zinc-400"
                }`}
              >
                {label}
              </Link>
            ))}
        </nav>
        <div className="flex shrink-0 items-center justify-end gap-2.5">
          <Link
            href="/sign-in"
            className={`hidden h-9 items-center rounded-full border bg-white/[0.04] px-4 text-sm font-medium text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.08] sm:inline-flex ${
              pathname === "/sign-in" ? "border-white/30" : "border-white/15"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-9 items-center rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_22px_var(--accent-glow)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Get Started
          </Link>
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-full border border-white/15 px-3.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 hover:text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/[0.06] px-4 py-3 lg:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            <p className="px-2 pt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Products
            </p>
            {products.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                onClick={closeAll}
                className={`flex items-center justify-between rounded-lg px-2 py-2.5 text-sm transition-colors hover:bg-white/[0.04] hover:text-white ${
                  pathname === product.href ? "text-white" : "text-zinc-300"
                }`}
              >
                <span>{product.name}</span>
                <span
                  className={
                    product.status === "Live"
                      ? "text-xs text-[var(--accent)]"
                      : "text-xs text-zinc-500"
                  }
                >
                  {product.status}
                </span>
              </Link>
            ))}
            <div className="my-2 border-t border-white/[0.06]" />
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={closeAll}
                className={`rounded-lg px-2 py-2.5 text-sm transition-colors hover:bg-white/[0.04] hover:text-white ${
                  pathname === href ? "text-white" : "text-zinc-300"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/sign-in"
              onClick={closeAll}
              className="mt-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2.5 text-center text-sm font-medium text-white sm:hidden"
            >
              Sign In
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
