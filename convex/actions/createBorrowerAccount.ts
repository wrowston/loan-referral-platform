"use node";

import { createClerkClient } from "@clerk/backend";
import { actionGeneric, anyApi } from "convex/server";
import { v } from "convex/values";

export const createBorrowerAccount = actionGeneric({
  args: { borrowerId: v.id("borrowers") },
  handler: async (ctx, { borrowerId }) => {
    const borrower = await ctx.runQuery(anyApi.actionsHelpers.getBorrowerForAction, { borrowerId });
    if (!borrower || borrower.clerkId) {
      return { ok: true };
    }

    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey) {
      throw new Error("CLERK_SECRET_KEY is required");
    }

    const clerk = createClerkClient({ secretKey });
    const created = await clerk.users.createUser({
      emailAddress: [borrower.email],
      firstName: borrower.firstName,
      lastName: borrower.lastName,
      publicMetadata: { role: "borrower" },
      skipPasswordChecks: true,
      skipPasswordRequirement: true,
    });

    await ctx.runMutation(anyApi.borrowers.linkClerkId, {
      borrowerId,
      clerkId: created.id,
    });

    return { ok: true, clerkId: created.id };
  },
});
