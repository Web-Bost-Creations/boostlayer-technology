import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { accountForToken, cleanPassword, sessionForToken } from "./accounts";
import { invoicePlans } from "./lib/plans";
import { hashPassword, sameSecret } from "./lib/secret";
import { cleanName } from "./lib/text";
import { province } from "./validators";

const COUNT_CAP = 1000;

export const overview = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const account = await accountForToken(ctx, args.token);
    if (!account) return null;

    const person = await ctx.db.get(account.personId);
    const customer = await ctx.db.get(account.customerId);
    const license = await ctx.db
      .query("licenseKeys")
      .withIndex("by_account", (q) => q.eq("accountId", account._id))
      .unique();

    const team = await ctx.db
      .query("people")
      .withIndex("by_customer", (q) => q.eq("customerId", account.customerId))
      .take(COUNT_CAP + 1);
    const purchases = await ctx.db
      .query("purchases")
      .withIndex("by_account", (q) => q.eq("accountId", account._id))
      .order("desc")
      .take(12);

    const limits = license ? invoicePlans[license.plan] : null;

    return {
      email: account.email,
      fullName: person?.fullName ?? "",
      companyName: customer?.name ?? "",
      province: customer?.province ?? null,
      pendingPlan: account.pendingPlan,
      plan: license?.plan ?? null,
      key: license?.key ?? null,
      hasCard: Boolean(account.stripeCustomerId),
      hasSubscription: Boolean(account.stripeSubscriptionId),
      usage: {
        countCap: COUNT_CAP,
        invoicesPerMonth: limits?.invoicesPerMonth ?? null,
        teamMembers: team.length,
        teamLimit: limits?.teamMembers ?? null,
      },
      purchases: purchases.map((purchase) => ({
        id: purchase._id,
        plan: purchase.plan,
        amountCents: purchase.amountCents,
        reason: purchase.reason ?? "checkout",
        paidByCard: Boolean(purchase.stripeSessionId),
        createdAt: purchase.createdAt,
      })),
    };
  },
});

export const updateProfile = mutation({
  args: {
    token: v.string(),
    fullName: v.string(),
    companyName: v.string(),
    province: v.optional(province),
  },
  handler: async (ctx, args) => {
    const account = await accountForToken(ctx, args.token);
    if (!account) {
      throw new ConvexError("Sign in again to change your settings.");
    }
    const fullName = cleanName(args.fullName, "name");
    const companyName = cleanName(args.companyName, "company");
    const now = Date.now();
    await ctx.db.patch(account.personId, { fullName });
    await ctx.db.patch(account.customerId, {
      name: companyName,
      province: args.province,
      updatedAt: now,
    });
    return null;
  },
});

export const changePassword = mutation({
  args: {
    token: v.string(),
    currentPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    const account = await accountForToken(ctx, args.token);
    if (!account) {
      throw new ConvexError("Sign in again to change your password.");
    }
    const current = await hashPassword(args.currentPassword, account.passwordSalt);
    if (!sameSecret(current.hash, account.passwordHash)) {
      throw new ConvexError("Your current password doesn't match.");
    }
    const next = await hashPassword(cleanPassword(args.newPassword));
    await ctx.db.patch(account._id, {
      passwordHash: next.hash,
      passwordSalt: next.salt,
    });
    return null;
  },
});

export const signOut = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await sessionForToken(ctx, args.token);
    if (session) await ctx.db.delete(session._id);
    return null;
  },
});
