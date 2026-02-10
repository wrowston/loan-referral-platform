import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";
import { requireAdmin, requireRole } from "./lib/permissions";

export const create = mutationGeneric({
  args: {
    dealId: v.id("deals"),
    partnerId: v.id("partners"),
    amountCents: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx as never);
    const now = Date.now();
    return ctx.db.insert("commissions", {
      ...args,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getAll = queryGeneric({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx as never);
    return ctx.db.query("commissions").collect();
  },
});

export const getByPartner = queryGeneric({
  args: { partnerId: v.id("partners") },
  handler: async (ctx, { partnerId }) => {
    await requireRole(ctx as never, ["partner", "admin"]);
    return ctx.db
      .query("commissions")
      .withIndex("by_partnerId", (q) => q.eq("partnerId", partnerId))
      .collect();
  },
});

export const updateStatus = mutationGeneric({
  args: {
    commissionId: v.id("commissions"),
    status: v.union(v.literal("pending"), v.literal("earned"), v.literal("paid")),
    amountCents: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx as never);
    const commission = await ctx.db.get(args.commissionId);
    if (!commission) throw new Error("Commission not found");

    const amountCents = args.amountCents ?? commission.amountCents;
    await ctx.db.patch(args.commissionId, {
      status: args.status,
      amountCents,
      updatedAt: Date.now(),
    });

    const partner = await ctx.db.get(commission.partnerId);
    if (partner) {
      const all = await ctx.db
        .query("commissions")
        .withIndex("by_partnerId", (q) => q.eq("partnerId", partner._id))
        .collect();
      const totalCommissionCents = all
        .filter((item) => item.status === "paid" || item.status === "earned")
        .reduce((sum, item) => sum + item.amountCents, 0);
      const pendingCommissionCents = all
        .filter((item) => item.status === "pending")
        .reduce((sum, item) => sum + item.amountCents, 0);

      await ctx.db.patch(partner._id, {
        totalCommissionCents,
        pendingCommissionCents,
        updatedAt: Date.now(),
      });
    }

    return { ok: true };
  },
});
