import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { accountForToken, issuePlan, requireFulfillment } from "./accounts";
import { invoicePlan, invoicePlans } from "./lib/plans";
import { productPlan } from "./validators";

export const forToken = query({
  args: {
    fulfillmentSecret: v.string(),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    requireFulfillment(args.fulfillmentSecret);
    const account = await accountForToken(ctx, args.token);
    if (!account) return null;
    const license = await ctx.db
      .query("licenseKeys")
      .withIndex("by_account", (q) => q.eq("accountId", account._id))
      .unique();
    return {
      accountId: account._id,
      email: account.email,
      plan: license?.plan ?? null,
      stripeCustomerId: account.stripeCustomerId ?? null,
      stripeSubscriptionId: account.stripeSubscriptionId ?? null,
    };
  },
});

/** What the Invoice app needs to open this account's workspace. */
export const launchProfile = query({
  args: {
    fulfillmentSecret: v.string(),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    requireFulfillment(args.fulfillmentSecret);
    const account = await accountForToken(ctx, args.token);
    if (!account) return null;
    const license = await ctx.db
      .query("licenseKeys")
      .withIndex("by_account", (q) => q.eq("accountId", account._id))
      .unique();
    const person = await ctx.db.get(account.personId);
    const customer = await ctx.db.get(account.customerId);
    return {
      accountId: account._id,
      email: account.email,
      fullName: person?.fullName ?? "",
      companyName: customer?.name ?? "",
      province: customer?.province ?? null,
      country: customer?.country ?? "CA",
      license: license ? { key: license.key, plan: license.plan } : null,
      stripeSubscriptionId: account.stripeSubscriptionId ?? null,
    };
  },
});

export const changePaidPlan = mutation({
  args: {
    fulfillmentSecret: v.string(),
    accountId: v.id("accounts"),
    stripeSubscriptionId: v.string(),
    plan: productPlan,
  },
  handler: async (ctx, args) => {
    requireFulfillment(args.fulfillmentSecret);
    const plan = invoicePlan(args.plan);
    if (invoicePlans[plan].amountCents === 0) {
      throw new ConvexError("Use the Starter downgrade to leave a paid plan.");
    }
    const account = await ctx.db.get(args.accountId);
    if (!account || account.stripeSubscriptionId !== args.stripeSubscriptionId) {
      throw new ConvexError("That subscription isn't on this account.");
    }
    const license = await ctx.db
      .query("licenseKeys")
      .withIndex("by_account", (q) => q.eq("accountId", account._id))
      .unique();
    const fromRank = license ? invoicePlans[license.plan].rank : 0;
    const reason = invoicePlans[plan].rank > fromRank ? "upgrade" : "downgrade";
    return await issuePlan(ctx, account, plan, reason);
  },
});

export const moveToStarter = mutation({
  args: {
    fulfillmentSecret: v.string(),
    accountId: v.id("accounts"),
  },
  handler: async (ctx, args) => {
    requireFulfillment(args.fulfillmentSecret);
    const account = await ctx.db.get(args.accountId);
    if (!account) {
      throw new ConvexError("That account is no longer on file.");
    }
    await ctx.db.patch(account._id, { stripeSubscriptionId: undefined });
    return await issuePlan(ctx, account, "starter", "downgrade");
  },
});
