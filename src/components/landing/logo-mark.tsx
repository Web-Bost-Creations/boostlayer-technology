export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={
        compact
          ? "flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[0_0_16px_var(--accent-glow)]"
          : "flex size-9 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] ring-1 ring-[var(--accent)]/50 shadow-[0_0_20px_var(--accent-glow)] transition-[box-shadow,transform,filter] duration-300 hover:shadow-[0_0_28px_var(--accent-glow)] hover:brightness-105"
      }
    >
      <svg
        width={compact ? 15 : 18}
        height={compact ? 15 : 18}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
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
