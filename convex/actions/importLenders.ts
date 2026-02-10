"use node";

import { actionGeneric, anyApi } from "convex/server";
import { v } from "convex/values";

const lenderRow = v.object({
  name: v.string(),
  contactName: v.optional(v.string()),
  contactEmail: v.optional(v.string()),
  contactPhone: v.optional(v.string()),
  loanTypes: v.array(v.string()),
  propertyTypes: v.array(v.string()),
  states: v.array(v.string()),
  minLoanAmountCents: v.optional(v.number()),
  maxLoanAmountCents: v.optional(v.number()),
});

export const importLenders = actionGeneric({
  args: { rows: v.array(lenderRow) },
  handler: async (ctx, { rows }) => {
    const batchSize = 100;
    let imported = 0;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      for (const row of batch) {
        await ctx.runMutation(anyApi.lenders.create, row);
        imported += 1;
      }
    }
    return { imported };
  },
});
