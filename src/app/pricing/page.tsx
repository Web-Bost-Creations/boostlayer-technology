import type { Metadata } from "next";
import { PricingPicker } from "@/components/landing/pricing-picker.client";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pick a Boostlayer product and see its pricing. Invoice plans are in Canadian dollars. Payments, Inventory, and Payroll publish their tiers when they launch.",
};

export default function PricingPage() {
  return <PricingPicker />;
}
