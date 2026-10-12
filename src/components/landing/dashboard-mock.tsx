import {
  INVOICE_URLS,
  InvoiceBrandLockup,
  InvoiceOverview,
  InvoiceSidebarNav,
  InvoiceUserFooter,
  InvoiceWindowShell,
} from "./invoice-dashboard-shared";

export function HeroDashboardMock() {
  return (
    <InvoiceWindowShell url={INVOICE_URLS.overview} glow>
      <div className="flex min-h-[420px]">
        <aside className="flex w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#0c0c0c] p-3">
          <InvoiceBrandLockup />
          <InvoiceSidebarNav active="overview" />
          <InvoiceUserFooter />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-5 bg-black p-5 sm:p-6">
          <InvoiceOverview showGetStartedStrip />
        </div>
      </div>
    </InvoiceWindowShell>
  );
}
