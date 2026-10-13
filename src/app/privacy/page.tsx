import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/landing/prose-page";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Boostlayer handles information on this site and in Invoice.",
};

export default function PrivacyPage() {
  return (
    <ProsePage eyebrow="Legal" title="Privacy">
      <p>
        The contact form saves your name, work email, company, what you need,
        and message so we can reply and keep a record of your business.
      </p>
      <p>
        An Invoice account saves your name, work email, company, and a hash of
        your password. The password itself is not stored. Growth and Business
        are charged by Stripe on the account page before Invoice opens. We
        store the plan, the amount in Canadian dollars, the Stripe payment id,
        and the Invoice key. We do not store the card number.
      </p>
      <p>
        Customer, client, and invoice records live in the Boostlayer database,
        tied to the company they belong to.
      </p>
      <p id="pipeda" className="scroll-mt-24">
        Under PIPEDA we collect only what we need to reply to you and to run
        Invoice. To ask about your information, use the{" "}
        <Link href="/contact" className="text-[var(--accent)] hover:underline">
          contact page
        </Link>
        .
      </p>
    </ProsePage>
  );
}
