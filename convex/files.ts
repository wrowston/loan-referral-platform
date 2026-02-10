import { mutationGeneric } from "convex/server";

export const generateUploadUrl = mutationGeneric({
  args: {},
  handler: async (ctx) => {
    const uploadUrl = await ctx.storage.generateUploadUrl();
    return { uploadUrl };
  },
});
