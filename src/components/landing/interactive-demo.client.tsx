"use client";

import { useState } from "react";
import {
  INVOICE_URLS,
  InvoiceBrandLockup,
  InvoiceOverview,
  InvoicePanel,
  InvoiceSidebarNav,
  type InvoiceNavId,
  InvoiceUserFooter,
  InvoiceWindowShell,
} from "./invoice-dashboard-shared";

export function InteractiveDemoMock() {
  const [active, setActive] = useState<InvoiceNavId>("overview");

  return (
    <InvoiceWindowShell url={INVOICE_URLS[active]}>
      <div className="flex min-h-[420px]">
        <aside className="flex w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#0c0c0c] p-3">
          <InvoiceBrandLockup />
          <InvoiceSidebarNav active={active} interactive onSelect={setActive} />
          <InvoiceUserFooter />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-5 bg-black p-5 sm:p-6">
          {active === "overview" ? (
            <div key="overview" className="tab-panel-animate">
              <InvoiceOverview />
            </div>
          ) : (
            <div key={active} className="tab-panel-animate flex flex-1">
              <InvoicePanel id={active} />
            </div>
          )}
        </div>
      </div>
    </InvoiceWindowShell>
  );
}
