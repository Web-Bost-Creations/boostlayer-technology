import type { Metadata } from "next";
import { Contact } from "@/components/landing/home-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Boostlayer how you invoice today. We'll reply with a walkthrough of Invoice.",
};

export default function ContactPage() {
  return <Contact />;
}
