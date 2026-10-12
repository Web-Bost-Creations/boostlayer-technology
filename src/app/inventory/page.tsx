import type { Metadata } from "next";
import { RoadmapProduct } from "@/components/landing/roadmap-product";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "Inventory is planned on Boostlayer. Stock that moves when a bill goes out, on the same record as Invoice.",
};

export default function InventoryPage() {
  return (
    <RoadmapProduct
      name="Inventory"
      status="Planned"
      lede="Stock that moves when a bill goes out."
      body="Inventory will sit on the same infrastructure as Invoice. A line on a bill will be able to draw from the stock you keep, so what you sold and what you have left stay on one record."
      points={[
        "Quantities that follow the invoice",
        "The same clients and tax Invoice already stores",
        "A stock count that matches what you billed",
      ]}
    />
  );
}
