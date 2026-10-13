import type { Metadata } from "next";
import { MidCta, Pricing } from "@/components/landing/home-page";

export const metadata: Metadata = {
  title: "Invoice pricing",
  description:
    "Pricing for Invoice, Boostlayer's billing product. Plans in Canadian dollars. Start free, then move to Growth or Business when you send more invoices.",
};

export default function InvoicePricingPage() {
  return (
    <>
      <Pricing />
      <MidCta />
    </>
  );
}
