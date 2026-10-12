import type { Metadata } from "next";
import { ProsePage } from "@/components/landing/prose-page";

export const metadata: Metadata = {
  title: "Security",
  description: "Where Invoice runs, and what the preview on this site contains.",
};

export default function SecurityPage() {
  return (
    <ProsePage eyebrow="Legal" title="Security">
      <p>
        Invoice runs on Canadian infrastructure. Your client list stays in the
        country.
      </p>
      <p>
        The preview on this site uses sample data. Keep real client names,
        amounts, and tax numbers out of it.
      </p>
    </ProsePage>
  );
}
