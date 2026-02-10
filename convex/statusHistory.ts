import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

export const recordChange = mutationGeneric({
  args: {
    dealId: v.id("deals"),
    fromStatus: v.optional(
      v.union(
        v.literal("submitted"),
        v.literal("in_review"),
        v.literal("accepted"),
        v.literal("in_progress"),
        v.literal("closing"),
        v.literal("closed"),
        v.literal("declined"),
      ),
    ),
    toStatus: v.union(
      v.literal("submitted"),
      v.literal("in_review"),
      v.literal("accepted"),
      v.literal("in_progress"),
      v.literal("closing"),
      v.literal("closed"),
      v.literal("declined"),
    ),
    changedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("statusHistory", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getByDeal = queryGeneric({
  args: { dealId: v.id("deals") },
  handler: async (ctx, { dealId }) => {
    return ctx.db
      .query("statusHistory")
      .withIndex("by_dealId", (q) => q.eq("dealId", dealId))
      .collect();
  },
});
