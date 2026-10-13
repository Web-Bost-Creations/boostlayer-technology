const TIMEOUT_MS = 5000;

function connection() {
  const url = process.env.INVOICE_APP_URL?.trim().replace(/\/+$/, "");
  const secret = process.env.SYNC_SECRET;
  return url && secret ? { url, secret } : null;
}

async function call(path: string, init: RequestInit = {}) {
  const app = connection();
  if (!app) throw new Error("Invoice isn't connected yet.");
  const response = await fetch(`${app.url}${path}`, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${app.secret}`, "Content-Type": "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Invoice answered ${response.status}.`);
  return response.json() as Promise<unknown>;
}

/**
 * Tells the Invoice app about a plan change so it applies right away.
 * Never throws: the plan is already saved here, and the next Open Invoice re-sends it.
 */
export async function syncInvoicePlan(accountId: string, plan: "starter" | "growth" | "business") {
  try {
    await call("/api/license/sync", { method: "POST", body: JSON.stringify({ accountId, plan }) });
  } catch (error) {
    console.error("Invoice plan sync failed:", error instanceof Error ? error.message : error);
  }
}

export type InvoiceUsage = {
  opened: boolean;
  monthStart: number;
  invoicesThisMonth: number;
  clients: number;
};

export async function fetchInvoiceUsage(accountId: string) {
  return (await call(`/api/usage?accountId=${encodeURIComponent(accountId)}`)) as InvoiceUsage;
}
