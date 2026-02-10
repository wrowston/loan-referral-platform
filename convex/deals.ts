import { anyApi, mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";
import { generateDealNumber } from "./lib/dealNumber";
import { requireAdmin, requireRole } from "./lib/permissions";

const dealStatus = v.union(
  v.literal("submitted"),
  v.literal("in_review"),
  v.literal("accepted"),
  v.literal("in_progress"),
  v.literal("closing"),
  v.literal("closed"),
  v.literal("declined"),
);

export const submit = mutationGeneric({
  args: {
    partnerId: v.id("partners"),
    borrowerFirstName: v.string(),
    borrowerLastName: v.string(),
    borrowerEmail: v.string(),
    borrowerPhone: v.string(),
    propertyType: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    zip: v.string(),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    loanAmountCents: v.number(),
    transactionType: v.string(),
    notes: v.optional(v.string()),
    attachments: v.array(v.object({ storageId: v.id("_storage"), name: v.string() })),
  },
  handler: async (ctx, args) => {
    const user = await requireRole(ctx as never, ["partner", "admin"]);
    const now = Date.now();

    let borrower = await ctx.db
      .query("borrowers")
      .withIndex("by_email", (q) => q.eq("email", args.borrowerEmail.toLowerCase()))
      .unique();

    if (!borrower) {
      const borrowerId = await ctx.db.insert("borrowers", {
        firstName: args.borrowerFirstName,
        lastName: args.borrowerLastName,
        email: args.borrowerEmail.toLowerCase(),
        phone: args.borrowerPhone,
        inviteSent: false,
        createdAt: now,
        updatedAt: now,
      });
      borrower = await ctx.db.get(borrowerId);
    }

    if (!borrower) {
      throw new Error("Unable to create borrower");
    }

    const totalDeals = (await ctx.db.query("deals").collect()).length + 1;
    const dealNumber = generateDealNumber(totalDeals);

    const dealId = await ctx.db.insert("deals", {
      partnerId: args.partnerId,
      borrowerId: borrower._id,
      dealNumber,
      propertyType: args.propertyType,
      address: args.address,
      city: args.city,
      state: args.state,
      zip: args.zip,
      lat: args.lat,
      lng: args.lng,
      loanAmountCents: args.loanAmountCents,
      transactionType: args.transactionType,
      status: "submitted",
      notes: args.notes,
      attachments: args.attachments,
      createdBy: user._id as never,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.patch(args.partnerId, {
      totalDeals: (await ctx.db.get(args.partnerId))!.totalDeals + 1,
      updatedAt: now,
    });

    await ctx.db.insert("statusHistory", {
      dealId,
      fromStatus: undefined,
      toStatus: "submitted",
      changedBy: user._id as never,
      createdAt: now,
    });

    await ctx.scheduler.runAfter(0, anyApi.actions.createBorrowerAccount, {
      borrowerId: borrower._id,
    });

    return dealId;
  },
});

export const getByPartner = queryGeneric({
  args: { partnerId: v.id("partners") },
  handler: async (ctx, { partnerId }) => {
    await requireRole(ctx as never, ["partner", "admin"]);
    return ctx.db
      .query("deals")
      .withIndex("by_partnerId", (q) => q.eq("partnerId", partnerId))
      .collect();
  },
});

export const getDeal = queryGeneric({
  args: { dealId: v.id("deals") },
  handler: async (ctx, { dealId }) => {
    await requireRole(ctx as never, ["partner", "borrower", "admin"]);
    const deal = await ctx.db.get(dealId);
    if (!deal) return null;
    const borrower = await ctx.db.get(deal.borrowerId);
    const partner = await ctx.db.get(deal.partnerId);
    const lender = deal.lenderId ? await ctx.db.get(deal.lenderId) : null;
    return { deal, borrower, partner, lender };
  },
});

export const getAll = queryGeneric({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx as never);
    return ctx.db.query("deals").collect();
  },
});

export const getPipeline = queryGeneric({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx as never);
    return ctx.db.query("deals").collect();
  },
});

export const assignLender = mutationGeneric({
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

export const updateStatus = mutationGeneric({
  args: {
    dealId: v.id("deals"),
    toStatus: dealStatus,
    reason: v.optional(v.string()),
  },
  handler: async (ctx, { dealId, toStatus, reason }) => {
    const user = await requireAdmin(ctx as never);
    const deal = await ctx.db.get(dealId);
    if (!deal) throw new Error("Deal not found");

    const now = Date.now();
    const fromStatus = deal.status;

    await ctx.db.patch(dealId, {
      status: toStatus,
      declineReason: toStatus === "declined" ? reason : undefined,
      updatedAt: now,
    });

    await ctx.db.insert("statusHistory", {
      dealId,
      fromStatus,
      toStatus,
      changedBy: user._id as never,
      createdAt: now,
    });

    if (toStatus === "closed") {
      const existing = await ctx.db
        .query("commissions")
        .withIndex("by_dealId", (q) => q.eq("dealId", dealId))
        .unique();
      if (!existing) {
        await ctx.db.insert("commissions", {
          dealId,
          partnerId: deal.partnerId,
          amountCents: 0,
          status: "pending",
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    await ctx.scheduler.runAfter(0, anyApi.actions.sendEmail, {
      trigger: "status_changed",
      dealId,
    });

    return { ok: true };
  },
});
