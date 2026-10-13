/** Asks the server for a one-time launch link, then leaves for the Invoice app. */
export async function openInvoice(token: string) {
  const response = await fetch("/api/invoice/launch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!response.ok || !data.url) {
    throw new Error(data.error ?? "Invoice didn't open. Try again.");
  }
  window.location.assign(data.url);
}
