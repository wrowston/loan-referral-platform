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
    const orgId = process.env.CLERK_ORGANIZATION_ID;
    if (!secretKey) {
      throw new Error("CLERK_SECRET_KEY is required");
    }
    if (!orgId) {
      throw new Error("CLERK_ORGANIZATION_ID is required");
    }

    const clerk = createClerkClient({ secretKey });

    // Create the Clerk user
    const created = await clerk.users.createUser({
      emailAddress: [borrower.email],
      firstName: borrower.firstName,
      lastName: borrower.lastName,
      skipPasswordChecks: true,
      skipPasswordRequirement: true,
    });

    // Add the user to the organization with borrower role
    await clerk.organizations.createOrganizationMembership({
      organizationId: orgId,
      userId: created.id,
      role: "org:borrower",
    });

    await ctx.runMutation(anyApi.borrowers.linkClerkId, {
      borrowerId,
      clerkId: created.id,
    });

    return { ok: true, clerkId: created.id };
  },
});
