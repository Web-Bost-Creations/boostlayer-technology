import {
  SwiftBrandLockup,
  SwiftDashboardHomeView,
  SwiftSidebarNav,
  SwiftUserFooter,
  SwiftWindowShell,
} from "./swift-eroll-dashboard-shared";

export function HeroDashboardMock() {
  return (
    <SwiftWindowShell
      url="swift-eroll.boostlayer.com/dashboard"
      glow
    >
      <div className="flex min-h-[420px]">
        <aside className="flex w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#0c0c0c] p-3">
          <SwiftBrandLockup />
          <SwiftSidebarNav active="dashboard" />
          <SwiftUserFooter />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-5 bg-black p-5 sm:p-6">
          <SwiftDashboardHomeView showGetStartedStrip />
        </div>
      </div>
    </SwiftWindowShell>
  );
}
