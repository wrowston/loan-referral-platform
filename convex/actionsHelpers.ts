import { queryGeneric } from "convex/server";
import { v } from "convex/values";

export const getBorrowerForAction = queryGeneric({
  args: { borrowerId: v.id("borrowers") },
  handler: async (ctx, { borrowerId }) => {
    return ctx.db.get(borrowerId);
  },
});

export const getDealForAction = queryGeneric({
  args: { dealId: v.id("deals") },
  handler: async (ctx, { dealId }) => {
    const deal = await ctx.db.get(dealId);
    if (!deal) return null;
    const partner = await ctx.db.get(deal.partnerId);
    const borrower = await ctx.db.get(deal.borrowerId);
    return { deal, partner, borrower };
  },
});
