import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/permissions";

export const create = mutationGeneric({
  args: {
    name: v.string(),
    contactName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    loanTypes: v.array(v.string()),
    propertyTypes: v.array(v.string()),
    states: v.array(v.string()),
    minLoanAmountCents: v.optional(v.number()),
    maxLoanAmountCents: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx as never);
    const now = Date.now();
    return ctx.db.insert("lenders", {
      ...args,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getAll = queryGeneric({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx as never);
    return ctx.db.query("lenders").collect();
  },
});

export const search = queryGeneric({
  args: { searchText: v.optional(v.string()) },
  handler: async (ctx, { searchText }) => {
    await requireAdmin(ctx as never);
    const lenders = await ctx.db.query("lenders").collect();
    if (!searchText) return lenders;
    const query = searchText.toLowerCase();
    return lenders.filter((l) => l.name.toLowerCase().includes(query));
  },
});

export const update = mutationGeneric({
  args: {
    lenderId: v.id("lenders"),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, { lenderId, isActive }) => {
    await requireAdmin(ctx as never);
    await ctx.db.patch(lenderId, { isActive, updatedAt: Date.now() });
    return { ok: true };
  },
});

export const assignToDeal = mutationGeneric({
  args: {
    dealId: v.id("deals"),
    lenderId: v.id("lenders"),
  },
  handler: async (ctx, { dealId, lenderId }) => {
    await requireAdmin(ctx as never);
    await ctx.db.patch(dealId, { lenderId, updatedAt: Date.now() });
    return { ok: true };
  },
});
