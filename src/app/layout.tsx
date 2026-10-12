import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { Footer } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav.client";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Boostlayer Technology — Software for Canadian Businesses",
    template: "%s — Boostlayer",
  },
  description:
    "Boostlayer Technology builds tightly integrated business infrastructure for Canadian companies. Invoice, the billing layer, is live. More is coming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black text-white antialiased">
        <ConvexClientProvider>
          <SiteNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
