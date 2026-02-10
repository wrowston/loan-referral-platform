import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

export const create = mutationGeneric({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return ctx.db.insert("borrowers", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email.toLowerCase(),
      phone: args.phone,
      inviteSent: false,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getByEmail = queryGeneric({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return ctx.db
      .query("borrowers")
      .withIndex("by_email", (q) => q.eq("email", email.toLowerCase()))
      .unique();
  },
});

export const linkClerkId = mutationGeneric({
  args: {
    borrowerId: v.id("borrowers"),
    clerkId: v.string(),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { borrowerId, clerkId, userId }) => {
    await ctx.db.patch(borrowerId, {
      clerkId,
      userId,
      inviteSent: true,
      updatedAt: Date.now(),
    });
    return { ok: true };
  },
});
