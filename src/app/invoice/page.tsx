import type { Metadata } from "next";
import {
  Demo,
  Features,
  HowItWorks,
  MidCta,
  Product,
  Testimonials,
} from "@/components/landing/home-page";

export const metadata: Metadata = {
  title: "Invoice",
  description:
    "Invoice is the billing layer for Canadian businesses. Tax, clients, and a record of what you're owed.",
};

export default function InvoicePage() {
  return (
    <>
      <Product />
      <Features />
      <Demo />
      <HowItWorks />
      <Testimonials />
      <MidCta />
    </>
  );
}
