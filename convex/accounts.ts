import { ConvexError, v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";
import { invoicePlan, invoicePlans, type InvoicePlanId } from "./lib/plans";
import { hashPassword, randomHex, sameSecret, sha256Hex } from "./lib/secret";
import { cleanEmail, cleanName, slugify } from "./lib/text";
import { productPlan } from "./validators";

const MINUTE = 60 * 1000;
const SESSION_MS = 30 * 24 * 60 * 60 * 1000;

export function cleanPassword(value: string) {
  if (value.length < 8 || value.length > 200) {
    throw new ConvexError("Use a password of at least 8 characters.");
  }
  return value;
}

export function requireFulfillment(secret: string) {
  const expected = process.env.CHECKOUT_FULFILLMENT_SECRET;
  if (!expected || !sameSecret(secret, expected)) {
    throw new ConvexError("This request could not be confirmed.");
  }
}

async function openSession(ctx: MutationCtx, accountId: Id<"accounts">, now: number) {
  const token = randomHex(32);
  await ctx.db.insert("sessions", {
    tokenHash: await sha256Hex(token),
    accountId,
    createdAt: now,
    expiresAt: now + SESSION_MS,
  });
  return token;
}

export async function sessionForToken(ctx: QueryCtx, token: string) {
  const tokenHash = await sha256Hex(token);
  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q) => q.eq("tokenHash", tokenHash))
    .unique();
  if (!session || session.expiresAt < Date.now()) return null;
  return session;
}

export async function accountForToken(ctx: QueryCtx, token: string) {
  const session = await sessionForToken(ctx, token);
  if (!session) return null;
  return await ctx.db.get(session.accountId);
}

export const signUp = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    companyName: v.string(),
    password: v.string(),
    plan: productPlan,
  },
  handler: async (ctx, args) => {
    const email = cleanEmail(args.email);
    const fullName = cleanName(args.fullName, "name");
    const companyName = cleanName(args.companyName, "company");
    const password = cleanPassword(args.password);
    const plan = invoicePlan(args.plan);
    const now = Date.now();

    const burst = await ctx.db
      .query("accounts")
      .withIndex("by_created", (q) => q.gte("createdAt", now - MINUTE))
      .take(20);
    if (burst.length >= 20) {
      throw new ConvexError("Invoice is busy creating accounts. Try again shortly.");
    }

    const existingAccount = await ctx.db
      .query("accounts")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
    if (existingAccount) {
      throw new ConvexError("An account already exists for this email. Sign in.");
    }

    const existingPerson = await ctx.db
      .query("people")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    let customerId = existingPerson?.customerId;
    if (!customerId) {
      const slug = slugify(companyName);
      const existingCustomer = await ctx.db
        .query("customers")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .unique();
      customerId =
        existingCustomer?._id ??
        (await ctx.db.insert("customers", {
          slug,
          name: companyName,
          email,
          country: "CA",
          plan: "none",
          status: "lead",
          createdAt: now,
          updatedAt: now,
        }));
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

    const passwordRecord = await hashPassword(password);
    const accountId = await ctx.db.insert("accounts", {
      email,
      passwordHash: passwordRecord.hash,
      passwordSalt: passwordRecord.salt,
      personId,
      customerId,
      pendingPlan: plan,
      createdAt: now,
    });

    await ctx.db.insert("activity", {
      customerId,
      personId,
      kind: "account_created",
      createdAt: now,
    });

    return {
      token: await openSession(ctx, accountId, now),
      plan,
    };
  },
});

export const signIn = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const email = cleanEmail(args.email);
    const password = cleanPassword(args.password);
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

    const account = await ctx.db
      .query("accounts")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
    const person = account
      ? await ctx.db.get(account.personId)
      : await ctx.db
          .query("people")
          .withIndex("by_email", (q) => q.eq("email", email))
          .unique();

    await ctx.db.insert("signIns", {
      email,
      customerId: account?.customerId ?? person?.customerId,
      personId: account?.personId ?? person?._id,
      recognized: account !== null,
      createdAt: now,
    });

    if (!account) {
      throw new ConvexError("No account for that email yet. Create one from pricing.");
    }

    const passwordRecord = await hashPassword(password, account.passwordSalt);
    if (!sameSecret(passwordRecord.hash, account.passwordHash)) {
      throw new ConvexError("That password doesn't match this account.");
    }

    await ctx.db.patch(account.customerId, { updatedAt: now });
    await ctx.db.insert("activity", {
      customerId: account.customerId,
      personId: account.personId,
      kind: "sign_in",
      createdAt: now,
    });

    const license = await ctx.db
      .query("licenseKeys")
      .withIndex("by_account", (q) => q.eq("accountId", account._id))
      .unique();

    return {
      token: await openSession(ctx, account._id, now),
      plan: license?.plan ?? account.pendingPlan,
      hasLicense: license !== null,
    };
  },
});

export async function issuePlan(
  ctx: MutationCtx,
  account: {
    _id: Id<"accounts">;
    customerId: Id<"customers">;
    personId: Id<"people">;
  },
  plan: InvoicePlanId,
  reason: "checkout" | "upgrade" | "downgrade",
  stripeSessionId?: string,
) {
  const offer = invoicePlans[plan];
  const now = Date.now();
  const existing = await ctx.db
    .query("licenseKeys")
    .withIndex("by_account", (q) => q.eq("accountId", account._id))
    .unique();

  if (!stripeSessionId && existing && existing.plan === plan) {
    return { plan };
  }

  await ctx.db.insert("purchases", {
    accountId: account._id,
    customerId: account.customerId,
    product: "invoice" as const,
    plan,
    amountCents: offer.amountCents,
    currency: "CAD" as const,
    ...(stripeSessionId ? { stripeSessionId } : {}),
    reason,
    createdAt: now,
  });

  const key = existing?.key ?? `bl_inv_${randomHex(16)}`;
  if (existing) {
    await ctx.db.patch(existing._id, { plan });
  } else {
    await ctx.db.insert("licenseKeys", {
      accountId: account._id,
      customerId: account.customerId,
      product: "invoice",
      plan,
      key,
      createdAt: now,
    });
  }

  await ctx.db.patch(account.customerId, {
    plan,
    status: "active",
    updatedAt: now,
  });
  await ctx.db.patch(account._id, { pendingPlan: plan });
  await ctx.db.insert("activity", {
    customerId: account.customerId,
    personId: account.personId,
    kind: "plan_purchased",
    createdAt: now,
  });

  return { plan };
}

export const purchase = mutation({
  args: {
    token: v.string(),
    plan: productPlan,
  },
  handler: async (ctx, args) => {
    const account = await accountForToken(ctx, args.token);
    if (!account) {
      throw new ConvexError("Sign in again before paying for a plan.");
    }

    const plan = invoicePlan(args.plan);
    if (invoicePlans[plan].amountCents > 0) {
      throw new ConvexError(
        "Pay by card on this page. Invoice opens after the payment clears.",
      );
    }
    if (account.stripeSubscriptionId) {
      throw new ConvexError("Change plans from your account page.");
    }
    return await issuePlan(ctx, account, plan, "checkout");
  },
});

export const grantPaid = mutation({
  args: {
    fulfillmentSecret: v.string(),
    accountId: v.id("accounts"),
    plan: productPlan,
    stripeSessionId: v.string(),
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
    amountCents: v.number(),
  },
  handler: async (ctx, args) => {
    requireFulfillment(args.fulfillmentSecret);

    const plan = invoicePlan(args.plan);
    const offer = invoicePlans[plan];
    if (args.amountCents !== offer.amountCents) {
      throw new ConvexError("The payment amount doesn't match this plan.");
    }

    const account = await ctx.db.get(args.accountId);
    if (!account) {
      throw new ConvexError("That account is no longer on file.");
    }

    const duplicate = await ctx.db
      .query("purchases")
      .withIndex("by_stripe", (q) => q.eq("stripeSessionId", args.stripeSessionId))
      .unique();
    if (duplicate) {
      if (duplicate.accountId !== account._id) {
        throw new ConvexError("This payment belongs to a different account.");
      }
      const license = await ctx.db
        .query("licenseKeys")
        .withIndex("by_account", (q) => q.eq("accountId", account._id))
        .unique();
      if (!license) {
        throw new ConvexError("The payment is recorded, but the Invoice key is missing.");
      }
      return { plan: license.plan };
    }

    await ctx.db.patch(account._id, {
      stripeCustomerId: args.stripeCustomerId,
      stripeSubscriptionId: args.stripeSubscriptionId,
    });
    return await issuePlan(ctx, account, plan, "checkout", args.stripeSessionId);
  },
});

export const current = query({
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

    return {
      accountId: account._id,
      email: account.email,
      fullName: person?.fullName ?? "",
      companyName: customer?.name ?? "",
      pendingPlan: account.pendingPlan,
      plan: license?.plan ?? null,
      key: license?.key ?? null,
    };
  },
});
