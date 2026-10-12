import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { internalQuery } from "./_generated/server";
import { customerStatus } from "./validators";

export const list = internalQuery({
  args: {
    paginationOpts: paginationOptsValidator,
    status: v.optional(customerStatus),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("customers")
        .withIndex("by_status_and_created", (q) => q.eq("status", args.status!))
        .order("desc")
        .paginate(args.paginationOpts);
    }
    return await ctx.db
      .query("customers")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const timeline = internalQuery({
  args: {
    customerId: v.id("customers"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("activity")
      .withIndex("by_customer_and_created", (q) =>
        q.eq("customerId", args.customerId),
      )
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
