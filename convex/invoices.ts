import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { internalMutation, internalQuery } from "./_generated/server";
import { assertCents, cleanName } from "./lib/text";
import { invoiceStatus } from "./validators";

const line = v.object({
  description: v.string(),
  quantity: v.number(),
  unitAmountCents: v.number(),
});

export const record = internalMutation({
  args: {
    customerId: v.id("customers"),
    clientId: v.id("clients"),
    number: v.string(),
    status: invoiceStatus,
    lines: v.array(line),
    taxCents: v.number(),
    issuedAt: v.optional(v.number()),
    dueAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const customer = await ctx.db.get(args.customerId);
    if (!customer) {
      throw new ConvexError("That customer is not on file.");
    }
    const client = await ctx.db.get(args.clientId);
    if (!client || client.customerId !== args.customerId) {
      throw new ConvexError("That client is not on this customer's books.");
    }
    const number = args.number.trim();
    if (number.length < 1 || number.length > 40) {
      throw new ConvexError("Invoice numbers stay under 40 characters.");
    }
    if (args.lines.length < 1 || args.lines.length > 100) {
      throw new ConvexError("An invoice needs between 1 and 100 lines.");
    }
    assertCents(args.taxCents, "Tax");

    const duplicate = await ctx.db
      .query("invoices")
      .withIndex("by_customer_and_number", (q) =>
        q.eq("customerId", args.customerId).eq("number", number),
      )
      .unique();
    if (duplicate) {
      throw new ConvexError("That invoice number is already on file.");
    }

    let subtotalCents = 0;
    const prepared = args.lines.map((item, position) => {
      const description = cleanName(item.description, "line description");
      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 1_000_000) {
        throw new ConvexError("Quantity needs to be a whole number.");
      }
      assertCents(item.unitAmountCents, "Unit amount");
      subtotalCents += item.quantity * item.unitAmountCents;
      return { description, quantity: item.quantity, unitAmountCents: item.unitAmountCents, position };
    });
    assertCents(subtotalCents, "Subtotal");
    const totalCents = subtotalCents + args.taxCents;
    assertCents(totalCents, "Total");

    const now = Date.now();
    const invoiceId = await ctx.db.insert("invoices", {
      customerId: args.customerId,
      clientId: args.clientId,
      number,
      status: args.status,
      currency: "CAD",
      subtotalCents,
      taxCents: args.taxCents,
      totalCents,
      issuedAt: args.issuedAt,
      dueAt: args.dueAt,
      createdAt: now,
    });

    for (const item of prepared) {
      await ctx.db.insert("invoiceLines", {
        invoiceId,
        customerId: args.customerId,
        description: item.description,
        quantity: item.quantity,
        unitAmountCents: item.unitAmountCents,
        position: item.position,
      });
    }

    await ctx.db.insert("activity", {
      customerId: args.customerId,
      kind: "invoice_recorded",
      clientId: args.clientId,
      invoiceId,
      createdAt: now,
    });
    await ctx.db.patch(args.customerId, { updatedAt: now });
    return invoiceId;
  },
});

export const listByCustomer = internalQuery({
  args: {
    customerId: v.id("customers"),
    paginationOpts: paginationOptsValidator,
    status: v.optional(invoiceStatus),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("invoices")
        .withIndex("by_customer_and_status", (q) =>
          q.eq("customerId", args.customerId).eq("status", args.status!),
        )
        .order("desc")
        .paginate(args.paginationOpts);
    }
    return await ctx.db
      .query("invoices")
      .withIndex("by_customer_and_created", (q) =>
        q.eq("customerId", args.customerId),
      )
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const linesForInvoice = internalQuery({
  args: { invoiceId: v.id("invoices") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("invoiceLines")
      .withIndex("by_invoice_and_position", (q) =>
        q.eq("invoiceId", args.invoiceId),
      )
      .take(100);
  },
});
