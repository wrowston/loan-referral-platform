import { internalMutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

export const upsertFromClerk = internalMutationGeneric({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        email: args.email,
        name: args.name,
        updatedAt: now,
      });
      return existing._id;
    }

    return ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      role: "partner",
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Called by the organizationMembership webhook to sync the user's org role
 * to our database.
 */
export const updateRole = internalMutationGeneric({
  args: {
    clerkId: v.string(),
    role: v.optional(v.union(v.literal("partner"), v.literal("borrower"), v.literal("admin"))),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (user) {
      await ctx.db.patch(user._id, {
        role: args.role ?? "partner",
        updatedAt: Date.now(),
      });
    }
  },
});

export const deleteFromClerk = internalMutationGeneric({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();
    if (user) {
      await ctx.db.delete(user._id);
    }
    return { ok: true };
  },
});

export const getCurrentUser = queryGeneric({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) return null;
    return ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject!))
      .unique();
  },
});
