import { NextResponse } from "next/server";

/** After signing out here, passes through the Invoice app so its session ends too. It returns to /sign-in. */
export async function GET(request: Request) {
  const appUrl = process.env.INVOICE_APP_URL?.trim().replace(/\/+$/, "");
  return NextResponse.redirect(appUrl ? `${appUrl}/logout` : new URL("/sign-in", request.url));
}
