import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";
import { requireAdmin, requireRole } from "./lib/permissions";

export const create = mutationGeneric({
  args: {
    userId: v.id("users"),
    clerkId: v.optional(v.string()),
    company: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return ctx.db.insert("partners", {
      userId: args.userId,
      clerkId: args.clerkId,
      company: args.company,
      phone: args.phone,
      tier: "bronze",
      isActive: true,
      totalDeals: 0,
      totalCommissionCents: 0,
      pendingCommissionCents: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getByClerkId = queryGeneric({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return ctx.db
      .query("partners")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();
  },
});

export const updateProfile = mutationGeneric({
  args: {
    partnerId: v.id("partners"),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireRole(ctx as never, ["partner", "admin"]);
    await ctx.db.patch(args.partnerId, {
      company: args.company,
      phone: args.phone,
      updatedAt: Date.now(),
    });
    return { ok: true };
  },
});

export const getMetrics = queryGeneric({
  args: { partnerId: v.id("partners") },
  handler: async (ctx, { partnerId }) => {
    const partner = await ctx.db.get(partnerId);
    if (!partner) return null;
    const deals = await ctx.db
      .query("deals")
      .withIndex("by_partnerId", (q) => q.eq("partnerId", partnerId))
      .collect();
    return { ...partner, dealCount: deals.length };
  },
});

export const getAll = queryGeneric({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx as never);
    return ctx.db.query("partners").collect();
  },
});

export const updateTier = mutationGeneric({
  args: {
    partnerId: v.id("partners"),
    tier: v.union(v.literal("bronze"), v.literal("silver"), v.literal("gold"), v.literal("platinum")),
  },
  handler: async (ctx, { partnerId, tier }) => {
    await requireAdmin(ctx as never);
    await ctx.db.patch(partnerId, { tier, updatedAt: Date.now() });
    return { ok: true };
  },
});

export const toggleActive = mutationGeneric({
  args: { partnerId: v.id("partners"), isActive: v.boolean() },
  handler: async (ctx, { partnerId, isActive }) => {
    await requireAdmin(ctx as never);
    await ctx.db.patch(partnerId, { isActive, updatedAt: Date.now() });
    return { ok: true };
  },
});
