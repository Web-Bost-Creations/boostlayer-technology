import type { Metadata } from "next";
import { RoadmapProduct } from "@/components/landing/roadmap-product";

export const metadata: Metadata = {
  title: "Payments",
  description:
    "Payments is the next Boostlayer tool. Money in and out, tied to the invoice that caused it. Coming Q1.",
};

export default function PaymentsPage() {
  return (
    <RoadmapProduct
      name="Payments"
      status="Coming Q1"
      lede="Money in and out, tied to the invoice that caused it."
      body="Payments is the next layer on Boostlayer. A payment will point at the invoice it settles, in CAD, whether it arrived by Interac, card, or a transfer you mark yourself. The same clients and balances Invoice already keeps."
      points={[
        "Match a payment to the invoice that caused it",
        "See what is still open after the money lands",
        "Share the client list Invoice already uses",
      ]}
    />
  );
}
