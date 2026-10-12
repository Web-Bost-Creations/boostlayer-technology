import type { Metadata } from "next";
import { Roadmap } from "@/components/landing/home-page";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Boostlayer is a technology company building an ecosystem of business tools. Invoice is live. Payments, inventory, and payroll follow.",
};

export default function PlatformPage() {
  return <Roadmap page />;
}
