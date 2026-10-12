import type { Metadata } from "next";
import { RoadmapProduct } from "@/components/landing/roadmap-product";

export const metadata: Metadata = {
  title: "Payroll",
  description:
    "Payroll is a future Boostlayer tool. Pay runs on the same books as the revenue you billed.",
};

export default function PayrollPage() {
  return (
    <RoadmapProduct
      name="Payroll"
      status="Future"
      lede="Pay runs on the same books as the revenue you billed."
      body="Payroll comes after billing and payments share one set of books. A pay run will sit beside the invoices that brought the revenue in, with the same business record Invoice already uses."
      points={[
        "Pay runs next to the revenue you billed",
        "One business record for clients, tax, and balances",
        "Built for companies already on Invoice",
      ]}
    />
  );
}
