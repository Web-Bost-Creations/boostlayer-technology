import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountDashboard } from "@/components/account/account-dashboard.client";

export const metadata: Metadata = {
  title: "Account",
  description: "Your Invoice plan, usage, billing, and settings.",
};

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <AccountDashboard />
    </Suspense>
  );
}
