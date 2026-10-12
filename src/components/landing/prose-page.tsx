import type { ReactNode } from "react";

export function ProsePage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="text-sm font-medium text-[var(--accent)]">{eyebrow}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
        {title}
      </h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-[var(--muted)]">
        {children}
      </div>
    </article>
  );
}
