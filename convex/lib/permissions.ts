import { ConvexError } from "convex/values";

type MinimalCtx = {
  auth: {
    getUserIdentity: () => Promise<{ subject?: string } | null>;
  };
  db: {
    query: (table: string) => {
      withIndex: (name: string, cb: (q: { eq: (field: string, value: string) => unknown }) => unknown) => {
        unique: () => Promise<{ _id: string; role?: string; clerkId?: string } | null>;
      };
    };
  };
};

export async function requireAuth(ctx: MinimalCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.subject) {
    throw new ConvexError("Unauthorized");
  }
  return identity;
}

export async function requireRole(
  ctx: MinimalCtx,
  allowedRoles: Array<"partner" | "borrower" | "admin">,
) {
  const identity = await requireAuth(ctx);
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject!))
    .unique();

  if (!user) {
    throw new ConvexError("User record not found");
  }

  if (!user.role || !allowedRoles.includes(user.role as "partner" | "borrower" | "admin")) {
    throw new ConvexError("Forbidden");
  }

  return user;
}

export async function requireAdmin(ctx: MinimalCtx) {
  return requireRole(ctx, ["admin"]);
}
