import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { internalQuery, mutation } from "./_generated/server";
import { cleanEmail } from "./lib/text";

const MINUTE = 60 * 1000;

export const record = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const email = cleanEmail(args.email);
    const now = Date.now();

    const recent = await ctx.db
      .query("signIns")
      .withIndex("by_email_and_created", (q) =>
        q.eq("email", email).gte("createdAt", now - MINUTE),
      )
      .take(5);
    if (recent.length >= 5) {
      throw new ConvexError("Too many sign-in attempts. Try again shortly.");
    }

    const person = await ctx.db
      .query("people")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    await ctx.db.insert("signIns", {
      email,
      customerId: person?.customerId,
      personId: person?._id,
      recognized: person !== null,
      createdAt: now,
    });

    if (person) {
      await ctx.db.patch(person.customerId, { updatedAt: now });
      await ctx.db.insert("activity", {
        customerId: person.customerId,
        personId: person._id,
        kind: "sign_in",
        createdAt: now,
      });
      const customer = await ctx.db.get(person.customerId);
      return {
        recognized: true as const,
        fullName: person.fullName,
        companyName: customer?.name ?? null,
      };
    }

    return {
      recognized: false as const,
      fullName: null,
      companyName: null,
    };
  },
});

export const list = internalQuery({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("signIns")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
