import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/permissions";

export const addNote = mutationGeneric({
  args: { dealId: v.id("deals"), content: v.string() },
  handler: async (ctx, { dealId, content }) => {
    const admin = await requireAdmin(ctx as never);
    const noteId = await ctx.db.insert("internalNotes", {
      dealId,
      authorId: admin._id as never,
      content,
      createdAt: Date.now(),
    });
    return noteId;
  },
});

export const getNotesByDeal = queryGeneric({
  args: { dealId: v.id("deals") },
  handler: async (ctx, { dealId }) => {
    await requireAdmin(ctx as never);
    return ctx.db
      .query("internalNotes")
      .withIndex("by_dealId", (q) => q.eq("dealId", dealId))
      .collect();
  },
});
