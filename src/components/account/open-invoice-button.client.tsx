"use client";

import { useEffect, useState } from "react";
import { openInvoice } from "@/lib/open-invoice";

export function OpenInvoiceButton({ token, className }: { token: string; className: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const restored = (event: PageTransitionEvent) => {
      if (event.persisted) setPending(false);
    };
    window.addEventListener("pageshow", restored);
    return () => window.removeEventListener("pageshow", restored);
  }, []);

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        disabled={pending}
        className={className}
        onClick={async () => {
          setPending(true);
          setError(null);
          try {
            await openInvoice(token);
          } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Invoice didn't open. Try again.");
            setPending(false);
          }
        }}
      >
        {pending ? "Opening Invoice..." : "Open Invoice"}
      </button>
      {error ? <p className="max-w-xs text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
