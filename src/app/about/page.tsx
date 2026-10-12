import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/landing/prose-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Boostlayer Technology Inc. builds tightly integrated business software for Canadian companies.",
};

export default function AboutPage() {
  return (
    <ProsePage eyebrow="Company" title="Boostlayer Technology Inc.">
      <p>
        We build software for Canadian businesses. The first product is Invoice,
        the billing layer. Payments, inventory, and payroll are the tools that
        follow, on the same clients, tax, and balances.
      </p>
      <p>
        The company is built in Canada. Invoice is hosted in Canada. Plans are
        priced in Canadian dollars.
      </p>
      <p>
        Read the{" "}
        <Link href="/platform" className="text-[var(--accent)] hover:underline">
          platform roadmap
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="text-[var(--accent)] hover:underline">
          tell us how you invoice today
        </Link>
        .
      </p>
    </ProsePage>
  );
}
