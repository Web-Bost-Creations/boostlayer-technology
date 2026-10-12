import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { internalMutation, internalQuery } from "./_generated/server";
import { cleanEmail, cleanName } from "./lib/text";
import { language } from "./validators";

export const add = internalMutation({
  args: {
    customerId: v.id("customers"),
    name: v.string(),
    email: v.string(),
    province: v.optional(v.string()),
    language,
  },
  handler: async (ctx, args) => {
    const customer = await ctx.db.get(args.customerId);
    if (!customer) {
      throw new ConvexError("That customer is not on file.");
    }
    const email = cleanEmail(args.email);
    const name = cleanName(args.name, "client name");
    const existing = await ctx.db
      .query("clients")
      .withIndex("by_customer_and_email", (q) =>
        q.eq("customerId", args.customerId).eq("email", email),
      )
      .unique();
    if (existing) {
      return existing._id;
    }
    const now = Date.now();
    const clientId = await ctx.db.insert("clients", {
      customerId: args.customerId,
      name,
      email,
      province: args.province?.trim() || undefined,
      language: args.language,
      createdAt: now,
    });
    await ctx.db.insert("activity", {
      customerId: args.customerId,
      kind: "client_added",
      clientId,
      createdAt: now,
    });
    await ctx.db.patch(args.customerId, { updatedAt: now });
    return clientId;
  },
});

export const listByCustomer = internalQuery({
  args: {
    customerId: v.id("customers"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("clients")
      .withIndex("by_customer_and_created", (q) =>
        q.eq("customerId", args.customerId),
      )
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
