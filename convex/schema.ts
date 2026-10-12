import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  activityKind,
  customerStatus,
  invoiceStatus,
  language,
  leadStatus,
  need,
  plan,
} from "./validators";

export default defineSchema({
  customers: defineTable({
    slug: v.string(),
    name: v.string(),
    email: v.string(),
    country: v.string(),
    province: v.optional(v.string()),
    plan,
    status: customerStatus,
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_email", ["email"])
    .index("by_status_and_created", ["status", "createdAt"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["status"],
    }),

  people: defineTable({
    customerId: v.id("customers"),
    fullName: v.string(),
    email: v.string(),
    role: v.union(v.literal("owner"), v.literal("member")),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_customer", ["customerId"]),

  leads: defineTable({
    customerId: v.id("customers"),
    personId: v.id("people"),
    fullName: v.string(),
    email: v.string(),
    companyName: v.string(),
    need,
    message: v.string(),
    status: leadStatus,
    createdAt: v.number(),
  })
    .index("by_customer_and_created", ["customerId", "createdAt"])
    .index("by_email_and_created", ["email", "createdAt"])
    .index("by_status_and_created", ["status", "createdAt"]),

  signIns: defineTable({
    email: v.string(),
    customerId: v.optional(v.id("customers")),
    personId: v.optional(v.id("people")),
    recognized: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_email_and_created", ["email", "createdAt"])
    .index("by_customer_and_created", ["customerId", "createdAt"]),

  clients: defineTable({
    customerId: v.id("customers"),
    name: v.string(),
    email: v.string(),
    province: v.optional(v.string()),
    language,
    createdAt: v.number(),
  })
    .index("by_customer_and_created", ["customerId", "createdAt"])
    .index("by_customer_and_email", ["customerId", "email"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["customerId"],
    }),

  invoices: defineTable({
    customerId: v.id("customers"),
    clientId: v.id("clients"),
    number: v.string(),
    status: invoiceStatus,
    currency: v.literal("CAD"),
    subtotalCents: v.number(),
    taxCents: v.number(),
    totalCents: v.number(),
    issuedAt: v.optional(v.number()),
    dueAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_customer_and_created", ["customerId", "createdAt"])
    .index("by_customer_and_status", ["customerId", "status"])
    .index("by_client_and_created", ["clientId", "createdAt"])
    .index("by_customer_and_number", ["customerId", "number"]),

  invoiceLines: defineTable({
    invoiceId: v.id("invoices"),
    customerId: v.id("customers"),
    description: v.string(),
    quantity: v.number(),
    unitAmountCents: v.number(),
    position: v.number(),
  }).index("by_invoice_and_position", ["invoiceId", "position"]),

  activity: defineTable({
    customerId: v.id("customers"),
    personId: v.optional(v.id("people")),
    kind: activityKind,
    leadId: v.optional(v.id("leads")),
    clientId: v.optional(v.id("clients")),
    invoiceId: v.optional(v.id("invoices")),
    createdAt: v.number(),
  }).index("by_customer_and_created", ["customerId", "createdAt"]),
});
