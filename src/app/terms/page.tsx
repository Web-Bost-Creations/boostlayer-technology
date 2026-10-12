import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/landing/prose-page";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for the Boostlayer site and Invoice plans.",
};

export default function TermsPage() {
  return (
    <ProsePage eyebrow="Legal" title="Terms">
      <p>
        This site describes Invoice and the Boostlayer platform. Plan prices are
        in Canadian dollars and listed on the{" "}
        <Link href="/pricing" className="text-[var(--accent)] hover:underline">
          pricing page
        </Link>
        .
      </p>
      <p>
        The Invoice preview uses sample data. Using it does not create an
        account, send a bill, or collect a payment.
      </p>
      <p>
        Questions about a plan go through the{" "}
        <Link href="/contact" className="text-[var(--accent)] hover:underline">
          contact page
        </Link>
        .
      </p>
    </ProsePage>
  );
}
