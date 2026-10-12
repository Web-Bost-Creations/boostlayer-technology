import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { internalQuery, mutation } from "./_generated/server";
import { cleanEmail, cleanMessage, cleanName, slugify } from "./lib/text";
import { leadStatus, need } from "./validators";

const TEN_MINUTES = 10 * 60 * 1000;

export const submit = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    companyName: v.string(),
    need,
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const email = cleanEmail(args.email);
    const fullName = cleanName(args.fullName, "name");
    const companyName = cleanName(args.companyName, "company");
    const message = cleanMessage(args.message);
    const now = Date.now();

    const recent = await ctx.db
      .query("leads")
      .withIndex("by_email_and_created", (q) =>
        q.eq("email", email).gte("createdAt", now - TEN_MINUTES),
      )
      .take(3);
    if (recent.length >= 3) {
      throw new ConvexError(
        "We already have a few notes from this email. We'll reply shortly.",
      );
    }

    const existingPerson = await ctx.db
      .query("people")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    let customerId = existingPerson?.customerId;
    if (customerId) {
      const customer = await ctx.db.get(customerId);
      if (!customer) {
        throw new ConvexError("We couldn't attach this note to the company.");
      }
      await ctx.db.patch(customerId, { updatedAt: now });
    } else {
      const slug = slugify(companyName);
      const existingCustomer = await ctx.db
        .query("customers")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .unique();
      if (existingCustomer) {
        customerId = existingCustomer._id;
        await ctx.db.patch(customerId, { updatedAt: now });
      } else {
        customerId = await ctx.db.insert("customers", {
          slug,
          name: companyName,
          email,
          country: "CA",
          plan: "none",
          status: "lead",
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    const personId =
      existingPerson?._id ??
      (await ctx.db.insert("people", {
        customerId,
        fullName,
        email,
        role: "owner",
        createdAt: now,
      }));

    if (!existingPerson) {
      const siblings = await ctx.db
        .query("people")
        .withIndex("by_customer", (q) => q.eq("customerId", customerId))
        .take(2);
      if (siblings.length > 1) {
        await ctx.db.patch(personId, { role: "member" });
      }
    }

    const leadId = await ctx.db.insert("leads", {
      customerId,
      personId,
      fullName,
      email,
      companyName,
      need: args.need,
      message,
      status: "new",
      createdAt: now,
    });

    await ctx.db.insert("activity", {
      customerId,
      personId,
      kind: "lead_submitted",
      leadId,
      createdAt: now,
    });

    return { leadId, customerId };
  },
});

export const list = internalQuery({
  args: {
    paginationOpts: paginationOptsValidator,
    status: v.optional(leadStatus),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("leads")
        .withIndex("by_status_and_created", (q) => q.eq("status", args.status!))
        .order("desc")
        .paginate(args.paginationOpts);
    }
    return await ctx.db
      .query("leads")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
