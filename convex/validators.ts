import { v } from "convex/values";

export const plan = v.union(
  v.literal("none"),
  v.literal("starter"),
  v.literal("growth"),
  v.literal("business"),
);

export const customerStatus = v.union(
  v.literal("lead"),
  v.literal("active"),
  v.literal("paused"),
);

export const need = v.union(
  v.literal("Send invoices"),
  v.literal("Recurring billing"),
  v.literal("Replace a spreadsheet"),
  v.literal("Bilingual invoices"),
  v.literal("Not sure yet"),
);

export const leadStatus = v.union(
  v.literal("new"),
  v.literal("replied"),
  v.literal("closed"),
);

export const invoiceStatus = v.union(
  v.literal("draft"),
  v.literal("sent"),
  v.literal("paid"),
  v.literal("overdue"),
);

export const language = v.union(v.literal("en"), v.literal("fr"));

export const activityKind = v.union(
  v.literal("lead_submitted"),
  v.literal("sign_in"),
  v.literal("client_added"),
  v.literal("invoice_recorded"),
);
