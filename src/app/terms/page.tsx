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
        This site describes Invoice and the Boostlayer platform. Invoice plan
        prices are in Canadian dollars and listed on the{" "}
        <Link href="/pricing" className="text-[var(--accent)] hover:underline">
          pricing page
        </Link>
        .
      </p>
      <p>
        Creating an account and confirming a plan attaches an Invoice key for
        that tier. Growth and Business open Invoice only after the card payment
        clears. The Invoice preview uses sample data. Using the preview does
        not create an account.
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
