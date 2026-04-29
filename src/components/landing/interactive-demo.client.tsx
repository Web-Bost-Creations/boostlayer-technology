"use client";

import { useState } from "react";
import {
  SWIFT_NAV,
  SwiftBrandLockup,
  SwiftDashboardHomeView,
  SwiftPlaceholderPanel,
  SwiftSidebarNav,
  type SwiftNavId,
  SwiftUserFooter,
  SwiftWindowShell,
} from "./swift-eroll-dashboard-shared";

function tabTitle(id: SwiftNavId): string {
  const row = SWIFT_NAV.find((n) => n.id === id);
  return row?.label ?? id;
}

export function InteractiveDemoMock() {
  const [active, setActive] = useState<SwiftNavId>("dashboard");

  return (
    <SwiftWindowShell url="app.swift-eroll.com/dashboard">
      <div className="flex min-h-[420px]">
        <aside className="flex w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#0c0c0c] p-3">
          <SwiftBrandLockup />
          <SwiftSidebarNav
            active={active}
            interactive
            onSelect={setActive}
          />
          <SwiftUserFooter />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6">
          {active === "dashboard" ? (
            <div key="dashboard" className="tab-panel-animate">
              <SwiftDashboardHomeView />
            </div>
          ) : (
            <div key={active} className="tab-panel-animate flex flex-1">
              <SwiftPlaceholderPanel title={tabTitle(active)} />
            </div>
          )}
        </div>
      </div>
    </SwiftWindowShell>
  );
}
