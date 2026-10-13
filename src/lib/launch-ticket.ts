const TICKET_MS = 60 * 1000;
const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array) {
  return Buffer.from(bytes).toString("base64url");
}

export type LaunchClaims = {
  accountId: string;
  licenseKey: string;
  plan: "starter" | "growth" | "business";
  email: string;
  fullName: string;
  companyName: string;
  province?: string;
  country: string;
};

/**
 * Signs a one-time, 60-second ticket that the Invoice app's /launch route exchanges for a session.
 * Format: `base64url(json).base64url(hmac-sha256)`, matching blt-invoices' `readToken`.
 */
export async function signLaunchTicket(claims: LaunchClaims, secret: string) {
  const payload = {
    kind: "launch",
    ticketId: crypto.randomUUID(),
    expiresAt: Date.now() + TICKET_MS,
    ...claims,
  };
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return `${body}.${toBase64Url(new Uint8Array(signature))}`;
}
