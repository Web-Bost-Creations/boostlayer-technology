import { NextResponse } from "next/server";
import { billingContext } from "@/lib/account-server";
import { fetchInvoiceUsage } from "@/lib/invoice-app";

export async function POST(request: Request) {
  const context = await billingContext(request);
  if ("error" in context) return context.error;

  try {
    return NextResponse.json(await fetchInvoiceUsage(context.billing.accountId), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Usage from Invoice didn't load. Try again shortly." }, { status: 502 });
  }
}
