import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/permissions";

const resourceType = v.union(
  v.literal("document"),
  v.literal("video"),
  v.literal("link"),
  v.literal("guide"),
);

export const create = mutationGeneric({
  args: {
    title: v.string(),
    category: v.string(),
    type: resourceType,
    url: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    isPublished: v.boolean(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx as never);
    const now = Date.now();
    return ctx.db.insert("resources", { ...args, createdAt: now, updatedAt: now });
  },
});

export const update = mutationGeneric({
  args: {
    resourceId: v.id("resources"),
    title: v.optional(v.string()),
    category: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, { resourceId, ...patch }) => {
    await requireAdmin(ctx as never);
    await ctx.db.patch(resourceId, { ...patch, updatedAt: Date.now() });
    return { ok: true };
  },
});

export const remove = mutationGeneric({
  args: { resourceId: v.id("resources") },
  handler: async (ctx, { resourceId }) => {
    await requireAdmin(ctx as never);
    await ctx.db.delete(resourceId);
    return { ok: true };
  },
});

export const getPublished = queryGeneric({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, { category }) => {
    const list = await ctx.db.query("resources").collect();
    return list.filter((r) => r.isPublished && (!category || r.category === category));
  },
});

export const getByCategory = queryGeneric({
  args: { category: v.string() },
  handler: async (ctx, { category }) => {
    const list = await ctx.db.query("resources").collect();
    return list.filter((r) => r.category === category && r.isPublished);
  },
});
