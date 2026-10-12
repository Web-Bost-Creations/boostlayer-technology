import type { Metadata } from "next";
import { MidCta, Pricing } from "@/components/landing/home-page";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Invoice pricing in Canadian dollars. Start free, then move to Growth or Business when you send more invoices.",
};

export default function PricingPage() {
  return (
    <>
      <Pricing />
      <MidCta />
    </>
  );
}
