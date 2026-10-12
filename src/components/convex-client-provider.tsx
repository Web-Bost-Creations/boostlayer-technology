"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { createContext, useContext, type ReactNode } from "react";

const ConvexReadyContext = createContext(false);

export function useConvexReady() {
  return useContext(ConvexReadyContext);
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    return (
      <ConvexReadyContext.Provider value={false}>
        {children}
      </ConvexReadyContext.Provider>
    );
  }

  return (
    <ConvexReadyContext.Provider value={true}>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </ConvexReadyContext.Provider>
  );
}
